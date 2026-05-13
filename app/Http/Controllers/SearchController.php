<?php

namespace App\Http\Controllers;

use App\Http\Requests\AutocompleteRequest;
use App\Models\Hotel;
use App\Models\Destination;
use App\Services\AutocompleteService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function __construct(private readonly AutocompleteService $autocomplete)
    {
    }

    /**
     * Autocomplete endpoint for destination + hotel search suggestions.
     *
     * Heavy lifting lives in {@see AutocompleteService}; this method just
     * validates input, delegates, and adds an HTTP cache header so the
     * browser can short-circuit repeat keystrokes entirely.
     */
    public function autocomplete(AutocompleteRequest $request): JsonResponse
    {
        $suggestions = $this->autocomplete->suggest($request->searchTerm());

        return response()->json($suggestions)
            ->header('Cache-Control', sprintf(
                'public, max-age=%d, stale-while-revalidate=300',
                (int) config('search.browser_cache_ttl', 60)
            ));
    }

    /**
     * Empty-state suggestions: popular destinations.
     * Cached daily; safe to hit on every focus.
     */
    public function popular(): JsonResponse
    {
        return response()->json($this->autocomplete->popular())
            ->header('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600');
    }

    /**
     * Resolve a search term to DB conditions via config alias map or
     * direct 2-letter country_code lookup. Used by {@see executeSearch()}.
     */
    private function resolveAlias(string $term): ?array
    {
        $lower = strtolower(trim($term));
        $aliases = config('search.aliases', []);

        if (isset($aliases[$lower])) {
            return $aliases[$lower];
        }

        if (strlen($lower) === 2) {
            $upper = strtoupper($lower);
            $exists = Destination::where('country_code', $upper)
                ->where('is_active', true)
                ->exists();
            if ($exists) {
                return ['country_code' => $upper];
            }
        }

        return null;
    }

    public function search(Request $request): Response
    {
        $request->validate([
            'destination' => 'nullable|string|max:255',
            'checkIn' => 'nullable|date',
            'checkOut' => 'nullable|date|after_or_equal:checkIn',
            'poolVibe' => 'nullable|string|in:family,quiet,party,luxury,adults',
            'guests' => 'nullable|integer|min:1|max:50',
            'page' => 'nullable|integer|min:1',
        ]);

        $destination = $request->input('destination');
        $checkIn = $request->input('checkIn');
        $checkOut = $request->input('checkOut');
        $poolVibe = $request->input('poolVibe');
        $guests = $request->input('guests', 2);

        // Generate cache key based on search parameters
        $page = $request->input('page', 1);
        $cacheKey = 'search:' . md5(json_encode([
            'destination' => $destination,
            'poolVibe' => $poolVibe,
            'guests' => $guests,
            'page' => $page,
        ]));

        // Cache search results for 30 minutes (hotel data doesn't change frequently)
        $localHotels = Cache::remember($cacheKey, now()->addMinutes(30), function () use ($destination, $poolVibe) {
            return $this->executeSearch($destination, $poolVibe);
        });

        $localHotels->withQueryString();

        // Amadeus API integration disabled - only showing local database results
        $amadeusHotels = [];
        $amadeusError = null;

        return Inertia::render('Search/Results', [
            'searchParams' => [
                'destination' => $destination,
                'checkIn' => $checkIn,
                'checkOut' => $checkOut,
                'poolVibe' => $poolVibe,
                'guests' => $guests,
            ],
            'localHotels' => $localHotels,
            'amadeusHotels' => $amadeusHotels,
            'amadeusError' => $amadeusError,
            'hasResults' => $localHotels->total() > 0 || count($amadeusHotels) > 0,
        ]);
    }

    /**
     * Execute the hotel search query.
     */
    protected function executeSearch(?string $destination, ?string $poolVibe)
    {
        // Use table prefix to avoid ambiguity after join with users table
        $query = Hotel::query()->where('hotels.is_active', true);

        // Search by destination name or city
        if ($destination) {
            $escaped = str_replace(['%', '_'], ['\%', '\_'], $destination);

            // Check for aliases (e.g. "Canary Islands" → region=Canarias, "Spain" → country=España)
            $alias = $this->resolveAlias($destination);

            $query->where(function ($q) use ($escaped, $alias) {
                $q->whereHas('destination', function ($destQuery) use ($escaped, $alias) {
                    // Use FULLTEXT search for natural language matching (much faster than LIKE)
                    $destQuery->whereRaw(
                        'MATCH(name, country, region) AGAINST(? IN BOOLEAN MODE)',
                        [$escaped . '*']
                    )
                    ->orWhere('country_code', 'LIKE', "{$escaped}%");

                    if ($alias) {
                        $field = array_key_first($alias);
                        $destQuery->orWhere($field, $alias[$field]);
                    }
                })
                // FULLTEXT on hotels name+address
                ->orWhereRaw(
                    'MATCH(hotels.name, hotels.address) AGAINST(? IN BOOLEAN MODE)',
                    [$escaped . '*']
                );
            });
        }

        // Apply pool vibe filters
        if ($poolVibe) {
            $query->whereHas('poolCriteria', function ($q) use ($poolVibe) {
                switch ($poolVibe) {
                    case 'family':
                        $q->where(function ($sub) {
                            $sub->where('has_kids_pool', true)
                                ->orWhere('has_waterslide', true)
                                ->orWhere('atmosphere', 'family');
                        });
                        break;
                    case 'quiet':
                        $q->where(function ($sub) {
                            $sub->where('atmosphere', 'quiet')
                                ->orWhere('atmosphere', 'relaxed')
                                ->orWhere('is_adults_only', true);
                        });
                        break;
                    case 'party':
                        $q->where(function ($sub) {
                            $sub->where('atmosphere', 'lively')
                                ->orWhere('atmosphere', 'party')
                                ->orWhere('has_pool_bar', true);
                        });
                        break;
                    case 'luxury':
                        $q->where(function ($sub) {
                            $sub->where('has_infinity_pool', true)
                                ->orWhere('has_rooftop_pool', true)
                                ->orWhere('has_luxury_cabanas', true);
                        });
                        break;
                    case 'adults':
                        $q->where('is_adults_only', true);
                        break;
                }
            });
        }

        // Get hotels with scores and pool criteria
        // Priority Placement: Premium hotels appear first (based on owner's subscription)
        // Eager load owner.activeSubscription to avoid N+1 on isPremium()
        $localHotels = $query->with(['destination', 'poolCriteria', 'owner.activeSubscription'])
            ->withExists(['claims as has_pending_claim' => function ($query) {
                $query->where('status', 'pending');
            }])
            ->leftJoin('subscriptions', function ($join) {
                $join->on('hotels.owned_by', '=', 'subscriptions.user_id')
                     ->where('subscriptions.status', '=', 'active')
                     ->where(function ($query) {
                         $query->whereNull('subscriptions.ends_at')
                               ->orWhere('subscriptions.ends_at', '>', now());
                     });
            })
            ->select('hotels.*')
            ->orderByRaw("
                CASE 
                    WHEN subscriptions.tier = 'premium' THEN 0 
                    ELSE 1 
                END ASC
            ")
            ->orderByDesc('hotels.overall_score')
            ->paginate(10);

        // Add is_premium flag to each hotel
        return $localHotels->through(function ($hotel) {
            $hotel->is_premium = $hotel->isPremium();
            return $hotel;
        });
    }
}

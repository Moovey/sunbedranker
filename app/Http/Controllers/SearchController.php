<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Destination;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    /**
     * Common English name aliases for countries/regions/islands
     * that don't appear literally in the DB.
     * Maps lowercase user input → [field => DB value].
     */
    private const SEARCH_ALIASES = [
        // Canary Islands
        'canary islands'     => ['region' => 'Canarias'],
        'the canary islands' => ['region' => 'Canarias'],
        'canaries'           => ['region' => 'Canarias'],
        'islas canarias'     => ['region' => 'Canarias'],
        'tenerife'           => ['region' => 'Canarias'],
        'gran canaria'       => ['region' => 'Canarias'],
        'lanzarote'          => ['region' => 'Canarias'],
        'fuerteventura'      => ['region' => 'Canarias'],
        'la palma'           => ['region' => 'Canarias'],
        'la gomera'          => ['region' => 'Canarias'],
        // Spain
        'spain'              => ['country' => 'España'],
        'espana'             => ['country' => 'España'],
        'spanish'            => ['country' => 'España'],
        // Balearic Islands
        'balearic islands'   => ['region' => 'Illes Balears'],
        'balearics'          => ['region' => 'Illes Balears'],
        'mallorca'           => ['region' => 'Illes Balears'],
        'majorca'            => ['region' => 'Illes Balears'],
        'ibiza'              => ['region' => 'Illes Balears'],
        'menorca'            => ['region' => 'Illes Balears'],
        // Greece
        'greece'             => ['country_code' => 'GR'],
        'greek islands'      => ['country_code' => 'GR'],
        'hellas'             => ['country_code' => 'GR'],
        // Italy
        'italy'              => ['country_code' => 'IT'],
        'italia'             => ['country_code' => 'IT'],
        // Portugal
        'portugal'           => ['country_code' => 'PT'],
        'algarve'            => ['region' => 'Algarve'],
        // France
        'france'             => ['country_code' => 'FR'],
        'french riviera'     => ['region' => 'Provence-Alpes-Côte d\'Azur'],
        'cote d azur'        => ['region' => 'Provence-Alpes-Côte d\'Azur'],
        // Turkey
        'turkey'             => ['country_code' => 'TR'],
        'türkiye'            => ['country_code' => 'TR'],
        'turkiye'            => ['country_code' => 'TR'],
        // Croatia
        'croatia'            => ['country_code' => 'HR'],
        // Thailand
        'thailand'           => ['country_code' => 'TH'],
        // Mexico
        'mexico'             => ['country_code' => 'MX'],
        // Caribbean
        'dominican republic' => ['country_code' => 'DO'],
        // Egypt
        'egypt'              => ['country_code' => 'EG'],
        // Morocco
        'morocco'            => ['country_code' => 'MA'],
        // UAE
        'dubai'              => ['country_code' => 'AE'],
        'uae'                => ['country_code' => 'AE'],
        // Indonesia
        'bali'               => ['region' => 'Bali'],
        'indonesia'          => ['country_code' => 'ID'],
    ];

    /**
     * Resolve a search term to DB conditions via alias or country_code lookup.
     * Returns [field => value] or null.
     */
    private function resolveAlias(string $term): ?array
    {
        $lower = strtolower(trim($term));

        // 1. Check hardcoded aliases
        if (isset(self::SEARCH_ALIASES[$lower])) {
            return self::SEARCH_ALIASES[$lower];
        }

        // 2. Check if it matches a 2-letter country code directly
        if (strlen($lower) === 2) {
            $upper = strtoupper($lower);
            $exists = Destination::where('country_code', $upper)->where('is_active', true)->exists();
            if ($exists) {
                return ['country_code' => $upper];
            }
        }

        return null;
    }

    /**
     * Autocomplete endpoint for destination search suggestions.
     */
    public function autocomplete(Request $request): JsonResponse
    {
        $request->validate([
            'q' => 'required|string|min:1|max:255',
        ]);

        $query = trim($request->input('q'));
        $cacheKey = 'search:autocomplete:' . md5(strtolower($query));

        $suggestions = Cache::remember($cacheKey, now()->addMinutes(30), function () use ($query) {
            $escaped = str_replace(['%', '_'], ['\%', '\_'], $query);

            $suggestions = [];

            // Check alias resolution (e.g. "Spain" → country=España, "Canary Islands" → region=Canarias)
            $alias = $this->resolveAlias($query);
            if ($alias) {
                $field = array_key_first($alias);
                $value = $alias[$field];

                $hotelCount = Hotel::where('is_active', true)
                    ->whereHas('destination', fn ($q) => $q->where($field, $value))
                    ->count();

                if ($hotelCount > 0) {
                    // Find a nice label for the suggestion
                    $sampleDest = Destination::where($field, $value)->where('is_active', true)->first();
                    $sublabel = match ($field) {
                        'region' => ($sampleDest->country ?? '') . ' · Region',
                        'country' => 'Country',
                        'country_code' => ($sampleDest->country ?? '') . ' · Country',
                        default => '',
                    };
                    $label = $field === 'country_code' ? ($sampleDest->country ?? $value) : $value;

                    $suggestions[] = [
                        'type' => 'region',
                        'label' => $label,
                        'sublabel' => $sublabel,
                        'value' => $label,
                        'hotel_count' => $hotelCount,
                    ];
                }
            }

            // Search destinations by name, country, region, and country_code
            $destinations = Destination::where('is_active', true)
                ->where(function ($q) use ($escaped) {
                    $q->where('name', 'LIKE', "%{$escaped}%")
                      ->orWhere('country', 'LIKE', "%{$escaped}%")
                      ->orWhere('region', 'LIKE', "%{$escaped}%")
                      ->orWhere('country_code', 'LIKE', "{$escaped}%");
                })
                ->withCount(['hotels' => fn ($q) => $q->where('is_active', true)])
                ->orderByDesc('hotels_count')
                ->limit(10)
                ->get();

            // Group by region if multiple destinations share the same region
            $regionGroups = [];
            foreach ($destinations as $dest) {
                if ($dest->region) {
                    $regionGroups[$dest->region][] = $dest;
                }
            }

            // Group by country if multiple destinations share the same country
            $countryGroups = [];
            foreach ($destinations as $dest) {
                if ($dest->country) {
                    $countryGroups[$dest->country][] = $dest;
                }
            }

            // Add country suggestion if multiple destinations share a country
            foreach ($countryGroups as $country => $dests) {
                if (count($dests) > 1 && !$alias) {
                    $totalHotels = array_sum(array_map(fn ($d) => $d->hotels_count, $dests));
                    $suggestions[] = [
                        'type' => 'region',
                        'label' => $country,
                        'sublabel' => count($dests) . ' destinations · Country',
                        'value' => $country,
                        'hotel_count' => $totalHotels,
                    ];
                }
            }

            // Add region suggestion if multiple destinations share a region (and different from country)
            foreach ($regionGroups as $region => $dests) {
                if (count($dests) > 1 && !$alias) {
                    $totalHotels = array_sum(array_map(fn ($d) => $d->hotels_count, $dests));
                    $alreadyHasCountry = isset($countryGroups[$dests[0]->country]) && count($countryGroups[$dests[0]->country]) > 1;
                    $suggestions[] = [
                        'type' => 'region',
                        'label' => $region,
                        'sublabel' => $dests[0]->country . ' · ' . count($dests) . ' areas',
                        'value' => $region,
                        'hotel_count' => $totalHotels,
                    ];
                }
            }

            // Add individual destinations
            foreach ($destinations as $dest) {
                $suggestions[] = [
                    'type' => 'destination',
                    'label' => $dest->name,
                    'sublabel' => implode(', ', array_filter([$dest->region, $dest->country])),
                    'value' => $dest->name,
                    'hotel_count' => $dest->hotels_count,
                ];
            }

            return $suggestions;
        });

        return response()->json($suggestions);
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

        // Cache search results for 10 minutes (hotel data doesn't change frequently)
        $localHotels = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($destination, $poolVibe) {
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
                    $destQuery->where('name', 'LIKE', "%{$escaped}%")
                            ->orWhere('country', 'LIKE', "%{$escaped}%")
                            ->orWhere('region', 'LIKE', "%{$escaped}%")
                            ->orWhere('country_code', 'LIKE', "{$escaped}%");

                    if ($alias) {
                        $field = array_key_first($alias);
                        $destQuery->orWhere($field, $alias[$field]);
                    }
                })
                ->orWhere('hotels.name', 'LIKE', "%{$escaped}%")
                ->orWhere('hotels.address', 'LIKE', "%{$escaped}%");
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
        $localHotels = $query->with(['destination', 'poolCriteria', 'owner'])
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

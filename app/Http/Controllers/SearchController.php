<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Destination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{

    public function search(Request $request): Response
    {
        $destination = $request->input('destination');
        $checkIn = $request->input('checkIn');
        $checkOut = $request->input('checkOut');
        $poolVibe = $request->input('poolVibe');
        $guests = $request->input('guests', 2);

        // Generate cache key based on search parameters
        $cacheKey = 'search:' . md5(json_encode([
            'destination' => $destination,
            'poolVibe' => $poolVibe,
            'guests' => $guests,
        ]));

        // Cache search results for 10 minutes (hotel data doesn't change frequently)
        $localHotels = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($destination, $poolVibe) {
            return $this->executeSearch($destination, $poolVibe);
        });

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
            'hasResults' => $localHotels->count() > 0 || count($amadeusHotels) > 0,
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
            $query->where(function ($q) use ($destination) {
                $q->whereHas('destination', function ($destQuery) use ($destination) {
                    $destQuery->where('name', 'LIKE', "%{$destination}%")
                            ->orWhere('country', 'LIKE', "%{$destination}%")
                            ->orWhere('region', 'LIKE', "%{$destination}%");
                })
                ->orWhere('hotels.name', 'LIKE', "%{$destination}%")
                ->orWhere('hotels.address', 'LIKE', "%{$destination}%");
            });
        }

        // Apply pool vibe filters
        if ($poolVibe) {
            $query->whereHas('poolCriteria', function ($q) use ($poolVibe) {
                switch ($poolVibe) {
                    case 'family':
                        $q->where('has_kids_pool', true)
                          ->orWhere('has_waterslide', true);
                        break;
                    case 'quiet':
                        $q->where('atmosphere', 'quiet')
                          ->orWhere('is_adults_only', true);
                        break;
                    case 'party':
                        $q->where('atmosphere', 'lively')
                          ->orWhere('atmosphere', 'party')
                          ->orWhere('has_pool_bar', true);
                        break;
                    case 'luxury':
                        $q->where('has_infinity_pool', true)
                          ->orWhere('has_rooftop_pool', true);
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
            ->limit(20)
            ->get();

        // Add is_premium flag to each hotel
        return $localHotels->map(function ($hotel) {
            $hotel->is_premium = $hotel->isPremium();
            return $hotel;
        });
    }
}

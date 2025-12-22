<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Destination;
use App\Services\AmadeusService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class SearchController extends Controller
{
    public function __construct(
        private AmadeusService $amadeusService
    ) {}

    public function search(Request $request): Response
    {
        $destination = $request->input('destination');
        $checkIn = $request->input('checkIn');
        $checkOut = $request->input('checkOut');
        $poolVibe = $request->input('poolVibe');
        $guests = $request->input('guests', 2);

        // Step 1: Search for hotels in our database first
        $query = Hotel::query()->where('is_active', true);

        // Search by destination name or city
        if ($destination) {
            $query->where(function ($q) use ($destination) {
                $q->whereHas('destination', function ($destQuery) use ($destination) {
                    $destQuery->where('name', 'LIKE', "%{$destination}%")
                            ->orWhere('country', 'LIKE', "%{$destination}%")
                            ->orWhere('region', 'LIKE', "%{$destination}%");
                })
                ->orWhere('name', 'LIKE', "%{$destination}%")
                ->orWhere('address', 'LIKE', "%{$destination}%");
            });
        }

        // Apply pool vibe filters
        if ($poolVibe) {
            $query->whereHas('poolCriteria', function ($q) use ($poolVibe) {
                switch ($poolVibe) {
                    case 'family':
                        $q->where('has_kids_pool', true)
                          ->orWhere('has_water_slides', true);
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
        $localHotels = $query->with(['destination', 'poolCriteria'])
            ->orderByDesc('overall_score')
            ->limit(20)
            ->get();

        // Step 2: Try to fetch from Amadeus API if we have dates
        $amadeusHotels = [];
        $amadeusError = null;
        
        if ($checkIn && $checkOut && $destination) {
            try {
                // Try to find destination coordinates or IATA code
                $dest = Destination::where('name', 'LIKE', "%{$destination}%")
                    ->orWhere('country', 'LIKE', "%{$destination}%")
                    ->orWhere('region', 'LIKE', "%{$destination}%")
                    ->first();

                if ($dest) {
                    if ($dest->latitude && $dest->longitude) {
                        // Search by coordinates
                        $amadeusResults = $this->amadeusService->searchHotelsByGeocode(
                            $dest->latitude,
                            $dest->longitude,
                            20
                        );

                        if (!empty($amadeusResults)) {
                            // Get hotel IDs for offers
                            $hotelIds = array_slice(
                                array_column($amadeusResults, 'hotelId'),
                                0,
                                10 // Limit to 10 for performance
                            );

                            // Get offers with prices
                            $offers = $this->amadeusService->getHotelOffers(
                                $hotelIds,
                                $checkIn,
                                $checkOut,
                                (int) $guests
                            );

                            $amadeusHotels = $offers;
                        }
                    }
                }
            } catch (\Exception $e) {
                Log::error('Amadeus search failed', [
                    'destination' => $destination,
                    'error' => $e->getMessage()
                ]);
                $amadeusError = 'Unable to fetch live prices at the moment. Showing our rated hotels.';
            }
        }

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
}

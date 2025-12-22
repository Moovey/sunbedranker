<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Destination;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class SearchController extends Controller
{

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

        // Amadeus API integration disabled - only showing local database results
        // To enable live hotel prices, configure AMADEUS_API_KEY and AMADEUS_API_SECRET environment variables
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
}

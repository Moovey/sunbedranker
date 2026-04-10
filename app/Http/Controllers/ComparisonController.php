<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Services\AgodaService;
use App\Services\PoolEstimationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use Inertia\Response;

class ComparisonController extends Controller
{
    public function index(Request $request): Response
    {
        $hotelIds = $request->get('hotels', []);
        
        if (is_string($hotelIds)) {
            $hotelIds = explode(',', $hotelIds);
        }

        // Separate local DB IDs from Agoda virtual IDs
        $localIds = [];
        $agodaIds = [];

        foreach ($hotelIds as $id) {
            $id = trim($id);
            if (str_starts_with($id, 'agoda_')) {
                $numericId = (int) str_replace('agoda_', '', $id);
                if ($numericId > 0) {
                    $agodaIds[] = $numericId;
                }
            } elseif (is_numeric($id)) {
                $localIds[] = (int) $id;
            }
        }

        // Limit total to 4 hotels
        $totalRequested = count($localIds) + count($agodaIds);
        if ($totalRequested > 4) {
            $agodaIds = array_slice($agodaIds, 0, max(0, 4 - count($localIds)));
        }

        // Fetch local hotels from DB
        $hotels = [];
        if (!empty($localIds)) {
            $localHotels = Hotel::whereIn('id', $localIds)
                ->where('is_active', true)
                ->with(['destination', 'poolCriteria'])
                ->get()
                ->toArray();
            $hotels = array_merge($hotels, $localHotels);
        }

        // Fetch Agoda hotels
        if (!empty($agodaIds)) {
            $agodaHotels = $this->fetchAgodaHotelsForComparison($agodaIds);
            $hotels = array_merge($hotels, $agodaHotels);
        }

        return Inertia::render('Hotels/Compare', [
            'hotels' => $hotels,
        ]);
    }

    private function fetchAgodaHotelsForComparison(array $agodaHotelIds): array
    {
        $agodaService = app(AgodaService::class);
        $estimationService = app(PoolEstimationService::class);

        if (!$agodaService->isConfigured()) {
            return [];
        }

        $cacheKey = 'agoda:compare:' . implode('_', $agodaHotelIds);

        return Cache::remember($cacheKey, 21600, function () use ($agodaService, $estimationService, $agodaHotelIds) {
            $checkIn = now()->addDay()->format('Y-m-d');
            $checkOut = now()->addDays(2)->format('Y-m-d');

            $results = $agodaService->searchByHotelIds($agodaHotelIds, $checkIn, $checkOut);

            if (empty($results) || empty($results['results'])) {
                return [];
            }

            $virtualHotels = [];
            foreach ($results['results'] as $agodaHotel) {
                $virtualHotels[] = $estimationService->buildVirtualHotel($agodaHotel, 'Agoda');
            }

            return $virtualHotels;
        });
    }

    public function add(Request $request, Hotel $hotel)
    {
        // Rate limiting: 10 additions per minute per session
        $key = 'comparison-add:' . $request->session()->getId();
        if (RateLimiter::tooManyAttempts($key, 10)) {
            return response()->json([
                'success' => false,
                'message' => 'Too many requests. Please slow down.',
            ], 429);
        }
        RateLimiter::hit($key, 60);

        $currentHotels = session()->get('comparison_hotels', []);
        
        if (!in_array($hotel->id, $currentHotels) && count($currentHotels) < 4) {
            $currentHotels[] = $hotel->id;
            session()->put('comparison_hotels', $currentHotels);
        }

        return response()->json([
            'success' => true,
            'count' => count($currentHotels),
            'hotels' => $currentHotels,
        ]);
    }

    public function remove(Request $request, Hotel $hotel)
    {
        $currentHotels = session()->get('comparison_hotels', []);
        
        $currentHotels = array_values(array_diff($currentHotels, [$hotel->id]));
        session()->put('comparison_hotels', $currentHotels);

        return response()->json([
            'success' => true,
            'count' => count($currentHotels),
            'hotels' => $currentHotels,
        ]);
    }

    public function clear(Request $request)
    {
        session()->forget('comparison_hotels');

        return response()->json([
            'success' => true,
            'count' => 0,
            'hotels' => [],
        ]);
    }
}

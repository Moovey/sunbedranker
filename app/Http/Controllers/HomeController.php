<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Hotel;
use App\Http\Controllers\BlogController;
use App\Services\AgodaService;
use App\Services\PoolEstimationService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Helper function to add is_premium flag to hotels
        $addPremiumFlag = function ($hotels) {
            return $hotels->map(function ($hotel) {
                $hotel->is_premium = $hotel->isPremium();
                return $hotel;
            });
        };

        // Cache featured destinations (5 minutes)
        $featuredDestinations = Cache::remember('home:featured-destinations', 300, function () {
            return Destination::where('is_featured', true)
                ->where('is_active', true)
                ->with(['activeHotels' => function ($query) {
                    $query->topRated()->limit(3);
                }])
                ->get();
        });

        // Cache top rated hotels (5 minutes)
        $topRatedHotels = Cache::remember('home:top-rated', 300, function () {
            return Hotel::active()
                ->topRated()
                ->with(['destination', 'poolCriteria', 'owner.activeSubscription', 'badges' => fn($q) => $q->where('is_active', true)->orderBy('priority', 'desc')])
                ->withExists(['claims as has_pending_claim' => fn($q) => $q->where('status', 'pending')])
                ->limit(8)
                ->get();
        });
        $topRatedHotels = $addPremiumFlag($topRatedHotels);

        // Cache family friendly hotels (5 minutes)
        $familyFriendlyHotels = Cache::remember('home:family-friendly', 300, function () {
            return Hotel::active()
                ->forFamilies()
                ->with(['destination', 'poolCriteria', 'owner.activeSubscription', 'badges' => fn($q) => $q->where('is_active', true)->orderBy('priority', 'desc')])
                ->withExists(['claims as has_pending_claim' => fn($q) => $q->where('status', 'pending')])
                ->limit(4)
                ->get();
        });
        $familyFriendlyHotels = $addPremiumFlag($familyFriendlyHotels);

        // Cache quiet sun hotels (5 minutes)
        $quietSunHotels = Cache::remember('home:quiet-sun', 300, function () {
            return Hotel::active()
                ->quietSun()
                ->with(['destination', 'poolCriteria', 'owner.activeSubscription', 'badges' => fn($q) => $q->where('is_active', true)->orderBy('priority', 'desc')])
                ->withExists(['claims as has_pending_claim' => fn($q) => $q->where('status', 'pending')])
                ->limit(4)
                ->get();
        });
        $quietSunHotels = $addPremiumFlag($quietSunHotels);

        // Cache party hotels (5 minutes)
        $partyHotels = Cache::remember('home:party', 300, function () {
            return Hotel::active()
                ->partyPools()
                ->with(['destination', 'poolCriteria', 'owner.activeSubscription', 'badges' => fn($q) => $q->where('is_active', true)->orderBy('priority', 'desc')])
                ->withExists(['claims as has_pending_claim' => fn($q) => $q->where('status', 'pending')])
                ->limit(4)
                ->get();
        });
        $partyHotels = $addPremiumFlag($partyHotels);

        // Get latest blog posts (already cached in BlogController)
        $latestPosts = BlogController::getLatestPosts(3);

        // Fetch Agoda hotels for featured destinations
        $agodaHotels = $this->fetchAgodaHotels($featuredDestinations);

        return Inertia::render('Home', [
            'featuredDestinations' => $featuredDestinations,
            'topRatedHotels' => $topRatedHotels,
            'familyFriendlyHotels' => $familyFriendlyHotels,
            'quietSunHotels' => $quietSunHotels,
            'partyHotels' => $partyHotels,
            'latestPosts' => $latestPosts,
            'agodaHotels' => $agodaHotels,
        ]);
    }

    /**
     * Fetch Agoda hotels for featured destinations that have an agoda_city_id.
     */
    /** @param  \Illuminate\Support\Collection|\Illuminate\Database\Eloquent\Collection  $featuredDestinations */
    private function fetchAgodaHotels($featuredDestinations): array
    {
        $agodaService = app(AgodaService::class);
        if (!$agodaService->isConfigured()) {
            return [];
        }

        $poolEstimation = app(PoolEstimationService::class);
        $allVirtualHotels = [];
        $checkIn = now()->addDay()->format('Y-m-d');
        $checkOut = now()->addDays(2)->format('Y-m-d');

        foreach ($featuredDestinations as $destination) {
            if (!$destination->agoda_city_id) {
                continue;
            }

            try {
                $cacheKey = "agoda:home:destination:{$destination->id}";
                $results = Cache::remember($cacheKey, 21600, function () use ($agodaService, $destination, $checkIn, $checkOut) {
                    return $agodaService->searchByCity(
                        $destination->agoda_city_id,
                        $checkIn,
                        $checkOut,
                        2, 0, 'USD', 'en-us', 4
                    );
                });

                if (!$results || empty($results['results'])) {
                    continue;
                }

                // Filter out hotels already in our DB
                $existingAgodaIds = Hotel::whereIn('agoda_hotel_id',
                    collect($results['results'])->pluck('hotelId')->filter()
                )->pluck('agoda_hotel_id')->toArray();

                foreach ($results['results'] as $agodaHotel) {
                    $hotelId = $agodaHotel['hotelId'] ?? 0;
                    if (in_array($hotelId, $existingAgodaIds)) {
                        continue;
                    }
                    $allVirtualHotels[] = $poolEstimation->buildVirtualHotel($agodaHotel, $destination->name);
                }
            } catch (\Exception $e) {
                Log::warning('Failed to fetch Agoda hotels for homepage', [
                    'destination' => $destination->name,
                    'error' => $e->getMessage(),
                ]);
            }

            if (count($allVirtualHotels) >= 8) {
                break;
            }
        }

        return array_slice($allVirtualHotels, 0, 4);
    }

    /**
     * Clear all homepage caches.
     */
    public static function clearHomeCache(): void
    {
        Cache::forget('home:featured-destinations');
        Cache::forget('home:top-rated');
        Cache::forget('home:family-friendly');
        Cache::forget('home:quiet-sun');
        Cache::forget('home:party');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Hotel;
use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Cache;
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
                ->with(['destination', 'poolCriteria', 'owner', 'badges' => fn($q) => $q->where('is_active', true)->orderBy('priority', 'desc')])
                ->limit(8)
                ->get();
        });
        $topRatedHotels = $addPremiumFlag($topRatedHotels);

        // Cache family friendly hotels (5 minutes)
        $familyFriendlyHotels = Cache::remember('home:family-friendly', 300, function () {
            return Hotel::active()
                ->forFamilies()
                ->with(['destination', 'poolCriteria', 'owner', 'badges' => fn($q) => $q->where('is_active', true)->orderBy('priority', 'desc')])
                ->limit(6)
                ->get();
        });
        $familyFriendlyHotels = $addPremiumFlag($familyFriendlyHotels);

        // Cache quiet sun hotels (5 minutes)
        $quietSunHotels = Cache::remember('home:quiet-sun', 300, function () {
            return Hotel::active()
                ->quietSun()
                ->with(['destination', 'poolCriteria', 'owner', 'badges' => fn($q) => $q->where('is_active', true)->orderBy('priority', 'desc')])
                ->limit(6)
                ->get();
        });
        $quietSunHotels = $addPremiumFlag($quietSunHotels);

        // Cache party hotels (5 minutes)
        $partyHotels = Cache::remember('home:party', 300, function () {
            return Hotel::active()
                ->partyPools()
                ->with(['destination', 'poolCriteria', 'owner', 'badges' => fn($q) => $q->where('is_active', true)->orderBy('priority', 'desc')])
                ->limit(6)
                ->get();
        });
        $partyHotels = $addPremiumFlag($partyHotels);

        // Get latest blog posts (already cached in BlogController)
        $latestPosts = BlogController::getLatestPosts(3);

        return Inertia::render('Home', [
            'featuredDestinations' => $featuredDestinations,
            'topRatedHotels' => $topRatedHotels,
            'familyFriendlyHotels' => $familyFriendlyHotels,
            'quietSunHotels' => $quietSunHotels,
            'partyHotels' => $partyHotels,
            'latestPosts' => $latestPosts,
        ]);
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

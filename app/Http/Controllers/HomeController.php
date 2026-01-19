<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Hotel;
use App\Http\Controllers\BlogController;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $featuredDestinations = Destination::where('is_featured', true)
            ->where('is_active', true)
            ->with(['activeHotels' => function ($query) {
                $query->topRated()->limit(3);
            }])
            ->get();

        // Helper function to add is_premium flag to hotels
        $addPremiumFlag = function ($hotels) {
            return $hotels->map(function ($hotel) {
                $hotel->is_premium = $hotel->isPremium();
                return $hotel;
            });
        };

        $topRatedHotels = Hotel::active()
            ->topRated()
            ->with(['destination', 'poolCriteria', 'owner'])
            ->limit(8)
            ->get();
        $topRatedHotels = $addPremiumFlag($topRatedHotels);

        $familyFriendlyHotels = Hotel::active()
            ->forFamilies()
            ->with(['destination', 'poolCriteria', 'owner'])
            ->limit(6)
            ->get();
        $familyFriendlyHotels = $addPremiumFlag($familyFriendlyHotels);

        $quietSunHotels = Hotel::active()
            ->quietSun()
            ->with(['destination', 'poolCriteria', 'owner'])
            ->limit(6)
            ->get();
        $quietSunHotels = $addPremiumFlag($quietSunHotels);

        $partyHotels = Hotel::active()
            ->partyPools()
            ->with(['destination', 'poolCriteria', 'owner'])
            ->limit(6)
            ->get();
        $partyHotels = $addPremiumFlag($partyHotels);

        // Get latest blog posts
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
}

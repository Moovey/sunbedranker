<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Hotel;
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

        $topRatedHotels = Hotel::active()
            ->topRated()
            ->with(['destination', 'poolCriteria'])
            ->limit(8)
            ->get();

        $familyFriendlyHotels = Hotel::active()
            ->forFamilies()
            ->with(['destination', 'poolCriteria'])
            ->limit(6)
            ->get();

        $quietSunHotels = Hotel::active()
            ->quietSun()
            ->with(['destination', 'poolCriteria'])
            ->limit(6)
            ->get();

        return Inertia::render('Home', [
            'featuredDestinations' => $featuredDestinations,
            'topRatedHotels' => $topRatedHotels,
            'familyFriendlyHotels' => $familyFriendlyHotels,
            'quietSunHotels' => $quietSunHotels,
        ]);
    }
}

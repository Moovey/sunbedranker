<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class DestinationController extends Controller
{
    public function index(): Response
    {
        // Cache destinations grouped by country (10 minutes)
        $destinations = Cache::remember('destinations:index', 600, function () {
            return Destination::where('is_active', true)
                ->withCount('activeHotels')
                ->orderBy('name')
                ->get()
                ->groupBy('country');
        });

        return Inertia::render('Destinations/Index', [
            'destinations' => $destinations,
        ]);
    }

    public function show(Request $request, Destination $destination): Response
    {
        // Use table prefix to avoid ambiguity after join with users table
        $query = Hotel::where('hotels.destination_id', $destination->id)
            ->where('hotels.is_active', true)
            ->with(['poolCriteria', 'owner', 'badges' => function ($q) {
                $q->where('is_active', true)->orderBy('priority', 'desc');
            }]);

        // Apply filters
        if ($request->has('pool_type')) {
            $poolType = $request->pool_type;
            $query->whereHas('poolCriteria', function ($q) use ($poolType) {
                if ($poolType === 'infinity') {
                    $q->where('has_infinity_pool', true);
                } elseif ($poolType === 'rooftop') {
                    $q->where('has_rooftop_pool', true);
                } elseif ($poolType === 'heated') {
                    $q->where('has_heated_pool', true);
                } elseif ($poolType === 'kids') {
                    $q->where('has_kids_pool', true);
                }
            });
        }

        if ($request->has('atmosphere')) {
            $query->whereHas('poolCriteria', function ($q) use ($request) {
                $q->where('atmosphere', $request->atmosphere);
            });
        }

        if ($request->has('sunbed_ratio')) {
            $minRatio = $request->sunbed_ratio;
            $query->whereHas('poolCriteria', function ($q) use ($minRatio) {
                $q->where('sunbed_to_guest_ratio', '>=', $minRatio);
            });
        }

        if ($request->has('adults_only')) {
            $query->whereHas('poolCriteria', function ($q) {
                $q->where('is_adults_only', true);
            });
        }

        // Priority Placement: Premium hotels appear first, then sort by selected criteria
        // A hotel is premium if its OWNER (hotelier) has a premium subscription
        $query->leftJoin('subscriptions', function ($join) {
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
            ");

        // Secondary sorting based on user selection
        $sortBy = $request->get('sort', 'score');
        
        switch ($sortBy) {
            case 'score':
                $query->orderByDesc('overall_score');
                break;
            case 'family':
                $query->orderByDesc('family_score');
                break;
            case 'quiet':
                $query->orderByDesc('quiet_score');
                break;
            case 'party':
                $query->orderByDesc('party_score');
                break;
            case 'name':
                $query->orderBy('name');
                break;
        }

        // Add is_premium attribute to each hotel for frontend display
        $hotels = $query->paginate(12)->withQueryString();
        
        // Transform hotels to include is_premium flag
        $hotels->getCollection()->transform(function ($hotel) {
            $hotel->is_premium = $hotel->isPremium();
            return $hotel;
        });

        return Inertia::render('Destinations/Show', [
            'destination' => $destination,
            'hotels' => $hotels,
            'filters' => $request->only(['pool_type', 'atmosphere', 'sunbed_ratio', 'adults_only', 'sort']),
        ]);
    }
}

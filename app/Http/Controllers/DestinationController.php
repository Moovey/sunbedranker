<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DestinationController extends Controller
{
    public function index(): Response
    {
        $destinations = Destination::where('is_active', true)
            ->withCount('activeHotels')
            ->orderBy('name')
            ->get()
            ->groupBy('country');

        return Inertia::render('Destinations/Index', [
            'destinations' => $destinations,
        ]);
    }

    public function show(Request $request, Destination $destination): Response
    {
        $query = Hotel::where('destination_id', $destination->id)
            ->where('is_active', true)
            ->with(['poolCriteria']);

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

        // Sorting
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

        $hotels = $query->paginate(12)->withQueryString();

        return Inertia::render('Destinations/Show', [
            'destination' => $destination,
            'hotels' => $hotels,
            'filters' => $request->only(['pool_type', 'atmosphere', 'sunbed_ratio', 'adults_only', 'sort']),
        ]);
    }
}

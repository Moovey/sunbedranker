<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
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

        $hotels = Hotel::whereIn('id', $hotelIds)
            ->where('is_active', true)
            ->with(['destination', 'poolCriteria'])
            ->get();

        return Inertia::render('Hotels/Compare', [
            'hotels' => $hotels,
        ]);
    }

    public function add(Request $request, Hotel $hotel)
    {
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

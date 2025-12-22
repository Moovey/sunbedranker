<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\Destination;
use App\Models\PoolCriteria;
use App\Services\HotelScoringService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class HotelManagementController extends Controller
{
    public function __construct(
        protected HotelScoringService $scoringService
    ) {}

    public function index(Request $request): Response
    {
        $query = Hotel::with('destination');

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('destination_id')) {
            $query->where('destination_id', $request->destination_id);
        }

        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        /** @var \Illuminate\Pagination\LengthAwarePaginator $hotels */
        $hotels = $query->latest()->paginate(20)->withQueryString();

        $destinations = Destination::orderBy('name')->get();

        return Inertia::render('Admin/Hotels/Index', [
            'hotels' => $hotels,
            'destinations' => $destinations,
            'filters' => $request->only(['search', 'destination_id', 'status']),
        ]);
    }

    public function create(): Response
    {
        $destinations = Destination::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('Admin/Hotels/Create', [
            'destinations' => $destinations,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'destination_id' => 'required|exists:destinations,id',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'star_rating' => 'nullable|integer|min:1|max:5',
            'total_rooms' => 'nullable|integer|min:1',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'website' => 'nullable|url',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['is_active'] = true;

        $hotel = Hotel::create($validated);

        // Create empty pool criteria
        PoolCriteria::create([
            'hotel_id' => $hotel->id,
        ]);

        return redirect()->route('admin.hotels.edit', $hotel)
            ->with('success', 'Hotel created successfully.');
    }

    public function edit(Hotel $hotel): Response
    {
        $hotel->load(['destination', 'poolCriteria']);

        $destinations = Destination::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('Admin/Hotels/Edit', [
            'hotel' => $hotel,
            'destinations' => $destinations,
        ]);
    }

    public function update(Request $request, Hotel $hotel): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'destination_id' => 'required|exists:destinations,id',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'star_rating' => 'nullable|integer|min:1|max:5',
            'total_rooms' => 'nullable|integer|min:1',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'website' => 'nullable|url',
            'booking_affiliate_url' => 'nullable|url',
            'expedia_affiliate_url' => 'nullable|url',
            'direct_booking_url' => 'nullable|url',
            'is_active' => 'boolean',
            'is_verified' => 'boolean',
            'is_featured' => 'boolean',
            'subscription_tier' => 'in:free,enhanced,premium',
        ]);

        if ($hotel->name !== $validated['name']) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $hotel->update($validated);

        return back()->with('success', 'Hotel updated successfully.');
    }

    public function updatePoolCriteria(Request $request, Hotel $hotel): RedirectResponse
    {
        $validated = $request->validate([
            'total_sunbeds' => 'nullable|integer|min:0',
            'total_guests' => 'nullable|integer|min:0',
            'sunbed_quality' => 'nullable|in:basic,standard,premium',
            'number_of_pools' => 'nullable|integer|min:1',
            'pool_types' => 'nullable|string',
            'total_pool_area_sqm' => 'nullable|numeric|min:0',
            'has_infinity_pool' => 'boolean',
            'has_rooftop_pool' => 'boolean',
            'has_heated_pool' => 'boolean',
            'has_kids_pool' => 'boolean',
            'has_lazy_river' => 'boolean',
            'has_pool_bar' => 'boolean',
            'sun_exposure' => 'nullable|in:all_day,morning,afternoon,limited',
            'has_shade_areas' => 'boolean',
            'atmosphere' => 'nullable|in:quiet,lively,family,party,mixed',
            'is_adults_only' => 'boolean',
            'has_music' => 'boolean',
            'music_volume' => 'nullable|in:none,low,medium,loud',
            'allows_food_drinks' => 'boolean',
            'cleanliness_score' => 'nullable|integer|min:1|max:5',
            'maintenance_score' => 'nullable|integer|min:1|max:5',
            'water_quality' => 'nullable|in:excellent,good,average,poor',
            'has_lifeguard' => 'boolean',
            'wheelchair_accessible' => 'boolean',
            'has_changing_facilities' => 'boolean',
            'has_pool_toys' => 'boolean',
            'has_kids_activities' => 'boolean',
        ]);

        $poolCriteria = $hotel->poolCriteria;

        if (!$poolCriteria) {
            $poolCriteria = new PoolCriteria(['hotel_id' => $hotel->id]);
        }

        $poolCriteria->fill($validated);
        $poolCriteria->is_verified = true;
        $poolCriteria->verified_by = $request->user()->id;
        $poolCriteria->verified_at = now();
        $poolCriteria->save();

        // Recalculate scores
        $this->scoringService->calculateAndUpdateScores($hotel);

        return back()->with('success', 'Pool criteria updated and scores recalculated.');
    }

    public function destroy(Hotel $hotel): RedirectResponse
    {
        $hotel->delete();

        return redirect()->route('admin.hotels.index')
            ->with('success', 'Hotel deleted successfully.');
    }

    public function recalculateScore(Hotel $hotel): RedirectResponse
    {
        $this->scoringService->calculateAndUpdateScores($hotel);

        return back()->with('success', 'Score recalculated successfully.');
    }

    public function recalculateAllScores(): RedirectResponse
    {
        $this->scoringService->recalculateAllScores();

        return back()->with('success', 'All hotel scores recalculated successfully.');
    }
}

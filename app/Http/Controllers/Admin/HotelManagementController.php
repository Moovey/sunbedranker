<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\Destination;
use App\Models\PoolCriteria;
use App\Models\Badge;
use App\Services\HotelScoringService;
use App\Services\AmadeusService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;

class HotelManagementController extends Controller
{
    public function __construct(
        protected HotelScoringService $scoringService,
        protected AmadeusService $amadeusService
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

        $hotels = $query->latest()->paginate(20)->appends($request->query());

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
            'affiliate_provider' => 'nullable|string|max:255',
            'affiliate_tracking_code' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'is_verified' => 'boolean',
            'is_featured' => 'boolean',
            'subscription_tier' => 'in:free,enhanced,premium',
            // Pool & Features
            'pool_overview' => 'nullable|array',
            'pool_details' => 'nullable|array',
            'sun_exposure' => 'nullable|string',
            'number_of_pools' => 'nullable|integer|min:0',
            'shade_options' => 'nullable|array',
            'special_features' => 'nullable|array',
            'atmosphere_vibe' => 'nullable|array',
            'family_features' => 'nullable|array',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['is_active'] = $validated['is_active'] ?? true;

        // Extract pool criteria data
        $poolCriteriaData = [
            'pool_overview' => $validated['pool_overview'] ?? [],
            'pool_details' => $validated['pool_details'] ?? [],
            'sun_exposure' => $validated['sun_exposure'] ?? null,
            'number_of_pools' => $validated['number_of_pools'] ?? null,
            'shade_options' => $validated['shade_options'] ?? [],
            'special_features_list' => $validated['special_features'] ?? [],
            'atmosphere_vibe' => $validated['atmosphere_vibe'] ?? [],
            'family_features' => $validated['family_features'] ?? [],
        ];

        // Remove pool criteria fields from hotel data
        unset($validated['pool_overview'], $validated['pool_details'], $validated['sun_exposure'], 
              $validated['number_of_pools'], $validated['shade_options'], $validated['special_features'],
              $validated['atmosphere_vibe'], $validated['family_features']);

        $hotel = Hotel::create($validated);

        // Create pool criteria with the extracted data
        PoolCriteria::create(array_merge(['hotel_id' => $hotel->id], $poolCriteriaData));

        return redirect()->route('admin.hotels.edit', $hotel)
            ->with('success', 'Hotel created successfully.');
    }

    public function edit(Hotel $hotel): Response
    {
        $hotel->load(['destination', 'poolCriteria', 'badges']);

        $destinations = Destination::where('is_active', true)->orderBy('name')->get();
        $badges = Badge::where('is_active', true)->orderBy('priority', 'desc')->get();

        return Inertia::render('Admin/Hotels/Edit', [
            'hotel' => $hotel,
            'destinations' => $destinations,
            'badges' => $badges,
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
            'affiliate_provider' => 'nullable|string|max:255',
            'affiliate_tracking_code' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'is_verified' => 'boolean',
            'is_featured' => 'boolean',
            'subscription_tier' => 'in:free,enhanced,premium',
            'subscription_expires_at' => 'nullable|date',
            'override_name' => 'boolean',
            'override_images' => 'boolean',
            'override_description' => 'boolean',
            // Pool & Features
            'pool_overview' => 'nullable|array',
            'pool_details' => 'nullable|array',
            'sun_exposure' => 'nullable|string',
            'number_of_pools' => 'nullable|integer|min:0',
            'shade_options' => 'nullable|array',
            'special_features' => 'nullable|array',
            'atmosphere_vibe' => 'nullable|array',
            'family_features' => 'nullable|array',
        ]);

        // Extract pool criteria data if present
        $poolCriteriaData = [];
        if (isset($validated['pool_overview']) || isset($validated['pool_details']) || 
            isset($validated['sun_exposure']) || isset($validated['number_of_pools']) ||
            isset($validated['shade_options']) || isset($validated['special_features']) ||
            isset($validated['atmosphere_vibe']) || isset($validated['family_features'])) {
            
            $poolCriteriaData = [
                'pool_overview' => $validated['pool_overview'] ?? [],
                'pool_details' => $validated['pool_details'] ?? [],
                'sun_exposure' => $validated['sun_exposure'] ?? null,
                'number_of_pools' => $validated['number_of_pools'] ?? null,
                'shade_options' => $validated['shade_options'] ?? [],
                'special_features_list' => $validated['special_features'] ?? [],
                'atmosphere_vibe' => $validated['atmosphere_vibe'] ?? [],
                'family_features' => $validated['family_features'] ?? [],
            ];

            // Remove pool criteria fields from hotel data
            unset($validated['pool_overview'], $validated['pool_details'], $validated['sun_exposure'], 
                  $validated['number_of_pools'], $validated['shade_options'], $validated['special_features'],
                  $validated['atmosphere_vibe'], $validated['family_features']);
        }

        if ($hotel->name !== $validated['name']) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $hotel->update($validated);

        // Update or create pool criteria if data was provided
        if (!empty($poolCriteriaData)) {
            $hotel->poolCriteria()->updateOrCreate(
                ['hotel_id' => $hotel->id],
                $poolCriteriaData
            );
        }

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

    /**
     * Upload and set main image for hotel
     */
    public function uploadMainImage(Request $request, Hotel $hotel): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB max
        ]);

        try {
            // Delete old image if exists
            if ($hotel->main_image && Storage::disk('public')->exists($hotel->main_image)) {
                Storage::disk('public')->delete($hotel->main_image);
            }

            // Store new image
            $path = $request->file('image')->store('hotels/main', 'public');
            
            $hotel->update(['main_image' => $path]);

            return response()->json([
                'success' => true,
                'image_url' => Storage::url($path),
                'message' => 'Main image uploaded successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Upload additional images for hotel gallery
     */
    public function uploadGalleryImages(Request $request, Hotel $hotel): JsonResponse
    {
        $request->validate([
            'images' => 'required|array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        try {
            $existingImages = $hotel->images ?? [];
            $newImages = [];

            foreach ($request->file('images') as $image) {
                $path = $image->store('hotels/gallery', 'public');
                $newImages[] = $path;
            }

            $allImages = array_merge($existingImages, $newImages);
            $hotel->update(['images' => $allImages]);

            return response()->json([
                'success' => true,
                'images' => array_map(fn($path) => Storage::url($path), $allImages),
                'message' => count($newImages) . ' image(s) uploaded successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload images: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a gallery image
     */
    public function deleteGalleryImage(Request $request, Hotel $hotel): JsonResponse
    {
        $request->validate([
            'image_path' => 'required|string',
        ]);

        try {
            $images = $hotel->images ?? [];
            $imageToDelete = $request->image_path;

            // Remove from array
            $images = array_filter($images, fn($img) => $img !== $imageToDelete);
            
            // Delete file
            if (Storage::disk('public')->exists($imageToDelete)) {
                Storage::disk('public')->delete($imageToDelete);
            }

            $hotel->update(['images' => array_values($images)]);

            return response()->json([
                'success' => true,
                'message' => 'Image deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Search and import hotel data from Amadeus API
     */
    public function searchAmadeus(Request $request): JsonResponse
    {
        $request->validate([
            'query' => 'required|string|min:3',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        try {
            // Search by geocode if coordinates provided, otherwise search by city
            if ($request->latitude && $request->longitude) {
                $results = $this->amadeusService->searchHotelsByGeocode(
                    $request->latitude,
                    $request->longitude,
                    $request->radius ?? 20
                );
            } else {
                $results = $this->amadeusService->searchHotelsByCity(
                    $request->input('query'),
                    ['radius' => $request->radius ?? 50]
                );
            }

            // Parse results
            $hotels = array_map(function($hotel) {
                return $this->amadeusService->parseHotelData($hotel);
            }, $results);

            return response()->json([
                'success' => true,
                'hotels' => $hotels,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to search hotels: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Import hotel data from Amadeus
     */
    public function importFromAmadeus(Request $request, Hotel $hotel): RedirectResponse
    {
        $request->validate([
            'amadeus_id' => 'required|string',
        ]);

        try {
            $hotelData = $this->amadeusService->getHotelDetails($request->amadeus_id);

            if ($hotelData) {
                $hotel->update([
                    'external_api_id' => $request->amadeus_id,
                    'external_api_source' => 'amadeus',
                    'external_data' => $hotelData,
                    'name' => $hotelData['name'] ?? $hotel->name,
                    'description' => $hotelData['description'] ?? $hotel->description,
                    'address' => $hotelData['address'] ?? $hotel->address,
                    'latitude' => $hotelData['latitude'] ?? $hotel->latitude,
                    'longitude' => $hotelData['longitude'] ?? $hotel->longitude,
                    'phone' => $hotelData['phone'] ?? $hotel->phone,
                    'email' => $hotelData['email'] ?? $hotel->email,
                    'star_rating' => $hotelData['rating'] ?? $hotel->star_rating,
                ]);

                return back()->with('success', 'Hotel data imported from Amadeus successfully.');
            }

            return back()->with('error', 'Failed to fetch hotel data from Amadeus.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to import: ' . $e->getMessage());
        }
    }

    /**
     * Manage hotel badges
     */
    public function updateBadges(Request $request, Hotel $hotel): RedirectResponse
    {
        $request->validate([
            'badge_ids' => 'nullable|array',
            'badge_ids.*' => 'exists:badges,id',
        ]);

        $hotel->badges()->sync($request->badge_ids ?? []);

        return back()->with('success', 'Hotel badges updated successfully.');
    }

    /**
     * Auto-assign badges based on criteria
     */
    public function autoAssignBadges(Hotel $hotel): RedirectResponse
    {
        $badges = Badge::where('is_active', true)->get();
        $assignedBadges = [];

        foreach ($badges as $badge) {
            if ($this->evaluateBadgeCriteria($hotel, $badge)) {
                $assignedBadges[] = $badge->id;
            }
        }

        $hotel->badges()->sync($assignedBadges);

        return back()->with('success', count($assignedBadges) . ' badge(s) automatically assigned based on criteria.');
    }

    /**
     * Evaluate if hotel meets badge criteria
     */
    private function evaluateBadgeCriteria(Hotel $hotel, Badge $badge): bool
    {
        $poolCriteria = $hotel->poolCriteria;
        if (!$poolCriteria || !$badge->criteria) {
            return false;
        }

        foreach ($badge->criteria as $field => $condition) {
            if (!$this->checkCondition($poolCriteria->$field ?? null, $condition)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check individual condition
     */
    private function checkCondition($value, $condition): bool
    {
        if ($value === null) {
            return false;
        }

        // Parse condition like ">0.5", ">=80", "=true"
        if (preg_match('/^([><=!]+)(.+)$/', $condition, $matches)) {
            $operator = $matches[1];
            $threshold = $matches[2];

            return match($operator) {
                '>' => $value > $threshold,
                '>=' => $value >= $threshold,
                '<' => $value < $threshold,
                '<=' => $value <= $threshold,
                '=', '==' => $value == $threshold,
                '!=' => $value != $threshold,
                default => false,
            };
        }

        return false;
    }

    /**
     * Update subscription tier
     */
    public function updateSubscription(Request $request, Hotel $hotel): RedirectResponse
    {
        $request->validate([
            'subscription_tier' => 'required|in:free,enhanced,premium',
            'subscription_expires_at' => 'nullable|date|after:today',
        ]);

        $hotel->update([
            'subscription_tier' => $request->subscription_tier,
            'subscription_expires_at' => $request->subscription_expires_at,
        ]);

        return back()->with('success', 'Subscription updated successfully.');
    }
}

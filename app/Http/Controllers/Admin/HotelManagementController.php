<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FilterHotelsRequest;
use App\Http\Requests\Admin\StoreHotelRequest;
use App\Http\Requests\Admin\UpdateHotelRequest;
use App\Models\Hotel;
use App\Models\Destination;
use App\Models\PoolCriteria;
use App\Models\Badge;
use App\Services\HotelScoringService;
use App\Services\AmadeusService;
use App\Jobs\ProcessHotelImages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Builder;

class HotelManagementController extends Controller
{
    /**
     * Cache keys for hotel management
     */
    public const CACHE_KEY_DESTINATIONS = 'admin.hotels.destinations';
    private const DESTINATIONS_TTL_MINUTES = 10;

    public function __construct(
        protected HotelScoringService $scoringService,
        protected AmadeusService $amadeusService
    ) {}

    /**
     * Display a listing of hotels with filtering.
     */
    public function index(FilterHotelsRequest $request): Response
    {
        $hotels = $this->buildFilteredHotelQuery($request)
            ->latest()
            ->paginate($request->perPage())
            ->appends($request->query());

        return Inertia::render('Admin/Hotels/Index', [
            'hotels' => $hotels,
            'destinations' => $this->getActiveDestinations(),
            'filters' => $request->filters(),
        ]);
    }

    /**
     * Build filtered query for hotels.
     */
    private function buildFilteredHotelQuery(FilterHotelsRequest $request): Builder
    {
        return Hotel::with('destination')
            ->when($request->searchTerm(), fn (Builder $q, string $search) => 
                $q->where('name', 'like', "%{$search}%")
            )
            ->when($request->destinationId(), fn (Builder $q, int $destinationId) => 
                $q->where('destination_id', $destinationId)
            )
            ->when($request->status(), fn (Builder $q, string $status) => 
                $q->where('is_active', $status === 'active')
            );
    }

    /**
     * Get active destinations for dropdown (cached).
     */
    private function getActiveDestinations()
    {
        return Cache::remember(
            self::CACHE_KEY_DESTINATIONS,
            now()->addMinutes(self::DESTINATIONS_TTL_MINUTES),
            fn () => Destination::orderBy('name')->get()
        );
    }

    /**
     * Clear destinations cache.
     */
    public static function clearDestinationsCache(): void
    {
        Cache::forget(self::CACHE_KEY_DESTINATIONS);
    }

    public function create(): Response
    {
        $destinations = Destination::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('Admin/Hotels/Create', [
            'destinations' => $destinations,
        ]);
    }

    /**
     * Store a newly created hotel.
     */
    public function store(Request $request): RedirectResponse|Response
    {
        // Manual validation to ensure errors are properly returned for Inertia
        $rules = [
            // Basic Information
            'name' => 'required|string|max:255',
            'destination_id' => 'required|exists:destinations,id',
            'description' => 'nullable|string|max:5000',
            'star_rating' => 'required|integer|min:1|max:5',
            'total_rooms' => 'required|integer|min:1',
            
            // Contact & Location
            'address' => 'required|string|max:500',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:500',
            
            // Images
            'main_image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
            'gallery_images' => 'nullable|array|max:10',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
            
            // Affiliate Links
            'booking_affiliate_url' => 'nullable|url|max:500',
            'expedia_affiliate_url' => 'nullable|url|max:500',
            'direct_booking_url' => 'nullable|url|max:500',
            'affiliate_provider' => 'nullable|string|max:255',
            'affiliate_tracking_code' => 'nullable|string|max:255',
            
            // Settings
            'is_active' => 'boolean',
            'is_verified' => 'boolean',
            'is_featured' => 'boolean',
            'subscription_tier' => 'nullable|in:free,enhanced,premium',
            
            // Pool Criteria - Required
            'sunbed_count' => 'required|integer|min:1',
            'sun_exposure' => 'required|in:all_day,afternoon_only,morning_only,partial_shade,mostly_shaded',
            'pool_size_category' => 'required|in:small,medium,large,very_large',
            
            // Pool Criteria - Optional
            'sunbed_types' => 'nullable|array',
            'sunny_areas' => 'nullable|array',
            'pool_size_sqm' => 'nullable|numeric|min:0',
            'number_of_pools' => 'nullable|integer|min:1',
            'pool_types' => 'nullable|array',
            'towel_reservation_policy' => 'nullable|in:enforced,tolerated,free_for_all',
            'towel_service_cost' => 'nullable|in:included,extra_cost,deposit_required',
            'pool_opening_hours' => 'nullable|string|max:100',
            'has_pool_bar' => 'boolean',
            'has_waiter_service' => 'boolean',
            'shade_options' => 'nullable|array',
            'bar_distance' => 'nullable|in:poolside,close,moderate,far',
            'toilet_distance' => 'nullable|in:adjacent,close,moderate,far',
            'atmosphere' => 'nullable|in:quiet,relaxed,family,lively,party',
            'music_level' => 'nullable|in:none,soft,moderate,loud',
            'has_entertainment' => 'boolean',
            'entertainment_types' => 'nullable|array',
            'cleanliness_rating' => 'nullable|numeric|min:1|max:10',
            'sunbed_condition_rating' => 'nullable|numeric|min:1|max:10',
            'tiling_condition_rating' => 'nullable|numeric|min:1|max:10',
            'has_lifeguard' => 'boolean',
            'lifeguard_hours' => 'nullable|string|max:100',
            'has_kids_pool' => 'boolean',
            'kids_pool_depth_m' => 'nullable|numeric|min:0',
            'has_splash_park' => 'boolean',
            'has_waterslide' => 'boolean',
            'has_accessibility_ramp' => 'boolean',
            'has_pool_hoist' => 'boolean',
            'has_step_free_access' => 'boolean',
            'has_elevator_to_rooftop' => 'boolean',
            'has_luxury_cabanas' => 'boolean',
            'has_cabana_service' => 'boolean',
            'has_heated_pool' => 'boolean',
            'has_jacuzzi' => 'boolean',
            'has_adult_sun_terrace' => 'boolean',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            // Instead of redirecting, render the page directly with errors as props
            // This bypasses any session issues in production
            $destinations = Destination::where('is_active', true)->orderBy('name')->get();
            
            return Inertia::render('Admin/Hotels/Create', [
                'destinations' => $destinations,
                'errors' => $validator->errors()->toArray(),
                'oldInput' => $request->except(['main_image', 'gallery_images']),
            ]);
        }

        $validated = $validator->validated();
        
        try {
            // Generate slug
            $validated['slug'] = Str::slug($validated['name']);
            $validated['is_active'] = $validated['is_active'] ?? true;

            // Handle image uploads
            $validated = $this->handleImageUploads($request, $validated);
            
            // Extract uploaded paths for background processing
            $uploadedPaths = $validated['_uploaded_paths'] ?? ['main' => null, 'gallery' => []];
            unset($validated['_uploaded_paths']);

            // Separate pool criteria from hotel data
            $poolCriteriaData = $this->extractPoolCriteriaData($validated);

            // Calculate sunbed to guest ratio
            if (!empty($poolCriteriaData['sunbed_count']) && !empty($validated['total_rooms'])) {
                $poolCriteriaData['sunbed_to_guest_ratio'] = round(
                    $poolCriteriaData['sunbed_count'] / $validated['total_rooms'],
                    2
                );
            }

            // Remove gallery_images key from hotel data
            unset($validated['gallery_images']);

            // Create hotel
            $hotel = Hotel::create($validated);

            // Create pool criteria and calculate scores
            if (!empty($poolCriteriaData)) {
                PoolCriteria::create(array_merge(['hotel_id' => $hotel->id], $poolCriteriaData));
                $this->scoringService->calculateAndUpdateScores($hotel->fresh());
            }

            // Dispatch image processing job for background optimization
            $this->dispatchImageProcessingJob($hotel, $uploadedPaths);

            return redirect()->route('admin.hotels.index')
                ->with('success', 'Hotel created successfully with pool criteria scores calculated.');

        } catch (\Throwable $e) {
            Log::error('Hotel creation failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => Auth::id(),
            ]);

            // Render the page directly with errors - bypasses session issues in production
            $destinations = Destination::where('is_active', true)->orderBy('name')->get();
            
            return Inertia::render('Admin/Hotels/Create', [
                'destinations' => $destinations,
                'errors' => ['error' => 'Failed to create hotel: ' . $e->getMessage()],
                'oldInput' => $request->except(['main_image', 'gallery_images']),
            ]);
        }
    }

    /**
     * Handle image uploads for hotel creation/update.
     * Returns array with validated data and uploaded paths for processing.
     */
    private function handleImageUploads(Request $request, array $validated): array
    {
        $disk = config('filesystems.public_uploads', 'public');
        $uploadedPaths = ['main' => null, 'gallery' => []];
        
        if ($request->hasFile('main_image')) {
            $validated['main_image'] = $request->file('main_image')->store('hotels/main', $disk);
            $uploadedPaths['main'] = $validated['main_image'];
        }

        if ($request->hasFile('gallery_images')) {
            $galleryPaths = [];
            foreach ($request->file('gallery_images') as $image) {
                $galleryPaths[] = $image->store('hotels/gallery', $disk);
            }
            $validated['images'] = $galleryPaths;
            $uploadedPaths['gallery'] = $galleryPaths;
        }

        $validated['_uploaded_paths'] = $uploadedPaths;
        return $validated;
    }

    /**
     * Extract pool criteria fields from validated data.
     */
    private function extractPoolCriteriaData(array &$validated): array
    {
        $poolCriteriaFields = [
            'sunbed_count', 'sunbed_types', 'sun_exposure', 'sunny_areas', 
            'pool_size_category', 'pool_size_sqm', 'towel_reservation_policy', 
            'towel_service_cost', 'pool_opening_hours', 'number_of_pools', 
            'pool_types', 'has_pool_bar', 'has_waiter_service', 'shade_options',
            'bar_distance', 'toilet_distance', 'atmosphere', 'music_level', 
            'has_entertainment', 'entertainment_types', 'cleanliness_rating', 
            'sunbed_condition_rating', 'tiling_condition_rating',
            'has_accessibility_ramp', 'has_pool_hoist', 'has_step_free_access', 
            'has_elevator_to_rooftop', 'has_kids_pool', 'kids_pool_depth_m', 
            'has_splash_park', 'has_waterslide', 'has_lifeguard', 'lifeguard_hours',
            'has_luxury_cabanas', 'has_cabana_service', 'has_heated_pool', 
            'has_jacuzzi', 'has_adult_sun_terrace'
        ];

        $poolCriteriaData = [];
        foreach ($poolCriteriaFields as $field) {
            if (array_key_exists($field, $validated)) {
                $poolCriteriaData[$field] = $validated[$field];
                unset($validated[$field]);
            }
        }

        return $poolCriteriaData;
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

    public function update(Request $request, Hotel $hotel): RedirectResponse|Response
    {
        // Manual validation to ensure errors are properly returned for Inertia in production
        $rules = [
            // Method spoofing for multipart forms
            '_method' => 'nullable|string',
            
            // Basic Information
            'name' => 'required|string|max:255',
            'destination_id' => 'required|exists:destinations,id',
            'description' => 'nullable|string|max:5000',
            'star_rating' => 'required|integer|min:1|max:5',
            'total_rooms' => 'required|integer|min:1',
            
            // Contact & Location
            'address' => 'required|string|max:500',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:500',
            
            // Images (optional for update)
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'gallery_images' => 'nullable|array|max:10',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
            
            // Affiliate Links
            'booking_affiliate_url' => 'nullable|url|max:500',
            'expedia_affiliate_url' => 'nullable|url|max:500',
            'direct_booking_url' => 'nullable|url|max:500',
            'affiliate_provider' => 'nullable|string|max:255',
            'affiliate_tracking_code' => 'nullable|string|max:255',
            
            // Settings
            'is_active' => 'boolean',
            'is_verified' => 'boolean',
            'is_featured' => 'boolean',
            'subscription_tier' => 'nullable|in:free,enhanced,premium',
            'subscription_expires_at' => 'nullable|date',
            'override_name' => 'boolean',
            'override_images' => 'boolean',
            'override_description' => 'boolean',
            
            // Pool Criteria - Required
            'sunbed_count' => 'required|integer|min:1',
            'sun_exposure' => 'required|in:all_day,afternoon_only,morning_only,partial_shade,mostly_shaded',
            'pool_size_category' => 'required|in:small,medium,large,very_large',
            
            // Pool Criteria - Optional
            'sunbed_types' => 'nullable|array',
            'sunny_areas' => 'nullable|array',
            'pool_size_sqm' => 'nullable|numeric|min:0',
            'number_of_pools' => 'nullable|integer|min:1',
            'pool_types' => 'nullable|array',
            'towel_reservation_policy' => 'nullable|in:enforced,tolerated,free_for_all',
            'towel_service_cost' => 'nullable|in:included,extra_cost,deposit_required',
            'pool_opening_hours' => 'nullable|string|max:100',
            'has_pool_bar' => 'boolean',
            'has_waiter_service' => 'boolean',
            'shade_options' => 'nullable|array',
            'bar_distance' => 'nullable|in:poolside,close,moderate,far',
            'toilet_distance' => 'nullable|in:adjacent,close,moderate,far',
            'atmosphere' => 'nullable|in:quiet,relaxed,family,lively,party',
            'music_level' => 'nullable|in:none,low,moderate,loud,dj',
            'has_entertainment' => 'boolean',
            'entertainment_types' => 'nullable|array',
            'cleanliness_rating' => 'nullable|integer|min:1|max:5',
            'sunbed_condition_rating' => 'nullable|integer|min:1|max:5',
            'tiling_condition_rating' => 'nullable|integer|min:1|max:5',
            'has_accessibility_ramp' => 'boolean',
            'has_pool_hoist' => 'boolean',
            'has_step_free_access' => 'boolean',
            'has_elevator_to_rooftop' => 'boolean',
            'has_kids_pool' => 'boolean',
            'kids_pool_depth_m' => 'nullable|numeric|min:0|max:2',
            'has_splash_park' => 'boolean',
            'has_waterslide' => 'boolean',
            'has_lifeguard' => 'boolean',
            'lifeguard_hours' => 'nullable|string|max:100',
            'has_luxury_cabanas' => 'boolean',
            'has_cabana_service' => 'boolean',
            'has_heated_pool' => 'boolean',
            'has_jacuzzi' => 'boolean',
            'has_adult_sun_terrace' => 'boolean',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            // Render the page directly with errors as props - bypasses session issues in production
            $hotel->load('poolCriteria', 'badges', 'destination');
            $destinations = Destination::where('is_active', true)->orderBy('name')->get();
            $badges = Badge::orderBy('name')->get();
            
            return Inertia::render('Admin/Hotels/Edit', [
                'hotel' => $hotel,
                'destinations' => $destinations,
                'badges' => $badges,
                'errors' => $validator->errors()->toArray(),
                'oldInput' => $request->except(['main_image', 'gallery_images', '_method']),
            ]);
        }

        $validated = $validator->validated();

        try {
            // Handle slug update if name changed
            if ($hotel->name !== $validated['name']) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            // Handle image uploads
            $validated = $this->handleImageUploadsForUpdate($request, $validated, $hotel);
            
            // Extract uploaded paths for background processing
            $uploadedPaths = $validated['_uploaded_paths'] ?? ['main' => null, 'gallery' => []];
            unset($validated['_uploaded_paths']);

            // Extract pool criteria from validated data
            $poolCriteriaData = $this->extractPoolCriteriaData($validated);

            // Update hotel
            $hotel->update($validated);

            // Update or create pool criteria
            if (!empty($poolCriteriaData)) {
                // Calculate sunbed-to-guest ratio
                if (isset($poolCriteriaData['sunbed_count']) && $hotel->total_rooms) {
                    $poolCriteriaData['sunbed_to_guest_ratio'] = round(
                        $poolCriteriaData['sunbed_count'] / ($hotel->total_rooms * 2),
                        2
                    );
                }

                $hotel->poolCriteria()->updateOrCreate(
                    ['hotel_id' => $hotel->id],
                    $poolCriteriaData
                );

                // Recalculate scores
                $this->scoringService->calculateAndUpdateScores($hotel->fresh());
            }

            // Dispatch image processing job for background optimization
            $this->dispatchImageProcessingJob($hotel, $uploadedPaths);

            return redirect()->route('admin.hotels.edit', $hotel->id)->with('success', 'Hotel updated successfully!');

        } catch (\Throwable $e) {
            Log::error('Hotel update failed', [
                'hotel_id' => $hotel->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => Auth::id(),
            ]);

            // Render the edit page with error
            $hotel->load('poolCriteria', 'badges', 'destination');
            $destinations = Destination::where('is_active', true)->orderBy('name')->get();
            $badges = Badge::orderBy('name')->get();
            
            return Inertia::render('Admin/Hotels/Edit', [
                'hotel' => $hotel,
                'destinations' => $destinations,
                'badges' => $badges,
                'errors' => ['error' => 'Failed to update hotel: ' . $e->getMessage()],
                'oldInput' => $request->except(['main_image', 'gallery_images', '_method']),
            ]);
        }
    }

    /**
     * Handle image uploads for hotel update.
     * Returns array with validated data and uploaded paths for processing.
     */
    private function handleImageUploadsForUpdate(Request $request, array $validated, Hotel $hotel): array
    {
        $disk = config('filesystems.public_uploads', 'public');
        $uploadedPaths = ['main' => null, 'gallery' => []];
        
        if ($request->hasFile('main_image')) {
            // Delete old image if exists and it's a local storage path (not a URL)
            if ($hotel->main_image && !filter_var($hotel->main_image, FILTER_VALIDATE_URL)) {
                Storage::disk($disk)->delete($hotel->main_image);
            }
            $validated['main_image'] = $request->file('main_image')->store('hotels/main', $disk);
            $uploadedPaths['main'] = $validated['main_image'];
        } else {
            // Remove from validated to preserve existing image
            unset($validated['main_image']);
        }

        if ($request->hasFile('gallery_images')) {
            $galleryPaths = [];
            foreach ($request->file('gallery_images') as $image) {
                $galleryPaths[] = $image->store('hotels/gallery', $disk);
            }
            $currentGallery = $hotel->images ?? [];
            $validated['images'] = array_merge($currentGallery, $galleryPaths);
            $uploadedPaths['gallery'] = $galleryPaths;
        }

        // Remove gallery_images key from hotel data (it's not a model field)
        unset($validated['gallery_images']);

        $validated['_uploaded_paths'] = $uploadedPaths;
        return $validated;
    }

    /**
     * Dispatch image processing job for background optimization.
     */
    private function dispatchImageProcessingJob(Hotel $hotel, array $uploadedPaths): void
    {
        $imagesToProcess = [];

        // Add main image if uploaded
        if (!empty($uploadedPaths['main'])) {
            $imagesToProcess[] = $uploadedPaths['main'];
        }

        // Add gallery images if uploaded
        if (!empty($uploadedPaths['gallery'])) {
            $imagesToProcess = array_merge($imagesToProcess, $uploadedPaths['gallery']);
        }

        // Dispatch job if there are images to process
        if (!empty($imagesToProcess)) {
            ProcessHotelImages::dispatch($hotel, $imagesToProcess);
        }
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

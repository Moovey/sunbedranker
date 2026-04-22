<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FilterHotelsRequest;
use App\Http\Requests\Admin\StoreHotelRequest;
use App\Http\Requests\Admin\UpdateHotelRequest;
use App\Models\AgodaHotel;
use App\Models\Hotel;
use App\Models\Destination;
use App\Models\PoolCriteria;
use App\Models\Badge;
use App\Services\HotelScoringService;
use App\Services\DestinationLookupService;
use App\Services\AgodaService;
use App\Services\PoolEstimationService;
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
        protected DestinationLookupService $destinationLookupService
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
        return Hotel::with(['destination', 'claims' => fn ($q) => $q->latest()->limit(1), 'claims.user', 'owner'])
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
            'destination_id' => 'nullable|exists:destinations,id',
            'city_name' => 'nullable|string|max:255',
            'country_code' => 'nullable|string|size:2',
            'description' => 'nullable|string|max:5000',
            'top_tip' => 'nullable|string|max:2000',
            'review_intelligence' => 'nullable|string|max:5000',
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
            'main_image' => 'required|image|mimes:jpeg,png,jpg,webp',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp',
            
            // Affiliate Links
            'booking_affiliate_url' => 'nullable|url|max:500',
            'expedia_affiliate_url' => 'nullable|url|max:500',
            'agoda_hotel_id' => 'nullable|integer',
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

        // Convert empty strings to null for nullable select fields (FormData sends '' for unset dropdowns)
            $data = array_map(fn ($value) => $value === '' ? null : $value, $request->all());
            $data = $this->normalizeLegacyPoolEnumValues($data);

        $validator = Validator::make($data, $rules);

        // Custom validation: must have either destination_id or (city_name + country_code)
        $validator->after(function ($validator) use ($request) {
            if (!$request->filled('destination_id') && !($request->filled('city_name') && $request->filled('country_code'))) {
                $validator->errors()->add('destination_id', 'Please select an existing destination or search for a city.');
            }
        });

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
            $t = microtime(true);

            // Resolve destination: find existing or create from API
            $validated = $this->resolveDestination($validated);
            Log::debug('Hotel store timing: resolveDestination', ['ms' => round((microtime(true) - $t) * 1000)]);

            // Generate slug
            $validated['slug'] = Str::slug($validated['name']);
            $validated['is_active'] = $validated['is_active'] ?? true;

            // Handle image uploads
            $t2 = microtime(true);
            $validated = $this->handleImageUploads($request, $validated);
            Log::debug('Hotel store timing: handleImageUploads', ['ms' => round((microtime(true) - $t2) * 1000)]);
            
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
            $t3 = microtime(true);
            $hotel = Hotel::create($validated);
            Log::debug('Hotel store timing: Hotel::create', ['ms' => round((microtime(true) - $t3) * 1000)]);

            // Create pool criteria and calculate scores
            if (!empty($poolCriteriaData)) {
                $t4 = microtime(true);
                PoolCriteria::create(array_merge(['hotel_id' => $hotel->id], $poolCriteriaData));
                $this->scoringService->calculateAndUpdateScores($hotel->fresh());
                Log::debug('Hotel store timing: poolCriteria+scoring', ['ms' => round((microtime(true) - $t4) * 1000)]);
            }

            // Dispatch image processing job for background optimization
            $this->dispatchImageProcessingJob($hotel, $uploadedPaths);

            Log::debug('Hotel store timing: TOTAL', ['ms' => round((microtime(true) - $t) * 1000)]);

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
                'errors' => ['error' => 'Failed to create hotel. Please try again.'],
                'oldInput' => $request->except(['main_image', 'gallery_images']),
            ]);
        }
    }

    /**
     * Handle image uploads for hotel creation/update.
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

    /**
     * Resolve destination from validated data.
     * If destination_id is provided, keeps it. Otherwise uses city_name + country_code
     * to find or create a destination via the CountryStateCity API.
     */
    private function resolveDestination(array $validated): array
    {
        $cityName = $validated['city_name'] ?? null;
        $countryCode = $validated['country_code'] ?? null;
        $destinationId = $validated['destination_id'] ?? null;

        // Clean up city-specific fields from validated data (they're not hotel columns)
        unset($validated['city_name'], $validated['country_code']);

        // If an existing destination was explicitly selected, use it
        if (!empty($destinationId)) {
            return $validated;
        }

        // Otherwise, find or create from city_name + country_code
        if (!empty($cityName) && !empty($countryCode)) {
            $destination = $this->destinationLookupService->findOrCreateDestination($cityName, $countryCode);
            $validated['destination_id'] = $destination->id;
        }

        return $validated;
    }

    /**
     * Normalize legacy enum values so older/imported records can still be edited.
     */
    private function normalizeLegacyPoolEnumValues(array $data): array
    {
        $sunExposureMap = [
            'mostly_sunny' => 'all_day',
            'morning' => 'morning_only',
            'afternoon' => 'afternoon_only',
            'limited' => 'partial_shade',
        ];

        $poolSizeMap = [
            'olympic' => 'very_large',
        ];

        $atmosphereMap = [
            'mixed' => 'relaxed',
        ];

        $musicLevelMap = [
            'soft' => 'low',
        ];

        if (isset($data['sun_exposure']) && isset($sunExposureMap[$data['sun_exposure']])) {
            $data['sun_exposure'] = $sunExposureMap[$data['sun_exposure']];
        }

        if (isset($data['pool_size_category']) && isset($poolSizeMap[$data['pool_size_category']])) {
            $data['pool_size_category'] = $poolSizeMap[$data['pool_size_category']];
        }

        if (isset($data['atmosphere']) && isset($atmosphereMap[$data['atmosphere']])) {
            $data['atmosphere'] = $atmosphereMap[$data['atmosphere']];
        }

        if (isset($data['music_level']) && isset($musicLevelMap[$data['music_level']])) {
            $data['music_level'] = $musicLevelMap[$data['music_level']];
        }

        if (isset($data['pool_types']) && is_array($data['pool_types'])) {
            $data['pool_types'] = array_values(array_unique(array_map(
                fn ($type) => $type === 'adults_only' ? 'adult_only' : $type,
                $data['pool_types']
            )));
        }

        $arrayFieldMaps = [
            'sunny_areas' => [
                'terrace' => 'sun_terrace',
            ],
            'sunbed_types' => [
                'bali_beds' => 'balinese_beds',
            ],
            'shade_options' => [
                'natural_trees' => 'trees',
            ],
            'entertainment_types' => [
                'aqua_gym' => 'aqua_aerobics',
                'games' => 'pool_games',
            ],
        ];

        foreach ($arrayFieldMaps as $field => $map) {
            if (isset($data[$field]) && is_array($data[$field])) {
                $data[$field] = array_values(array_unique(array_map(
                    fn ($value) => $map[$value] ?? $value,
                    $data[$field]
                )));
            }
        }

        return $data;
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
        // Manual validation to ensure errors are properly returned for Inertia in production
        $rules = [
            // Method spoofing for multipart forms
            '_method' => 'nullable|string',
            
            // Basic Information
            'name' => 'required|string|max:255',
            'destination_id' => 'nullable|exists:destinations,id',
            'city_name' => 'nullable|string|max:255',
            'country_code' => 'nullable|string|size:2',
            'description' => 'nullable|string|max:5000',
            'top_tip' => 'nullable|string|max:2000',
            'review_intelligence' => 'nullable|string|max:5000',
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
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,webp',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp',
            
            // Affiliate Links
            'booking_affiliate_url' => 'nullable|url|max:500',
            'expedia_affiliate_url' => 'nullable|url|max:500',
            'agoda_hotel_id' => 'nullable|integer',
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

        // Convert empty strings to null for nullable select fields (FormData sends '' for unset dropdowns)
            $data = array_map(fn ($value) => $value === '' ? null : $value, $request->all());
            $data = $this->normalizeLegacyPoolEnumValues($data);

        $validator = Validator::make($data, $rules);

        // Custom validation: must have either destination_id or (city_name + country_code)
        $validator->after(function ($validator) use ($request, $hotel) {
            if (!$request->filled('destination_id') && !($request->filled('city_name') && $request->filled('country_code'))) {
                // Allow keeping current destination if neither field changed
                if (!$hotel->destination_id) {
                    $validator->errors()->add('destination_id', 'Please select an existing destination or search for a city.');
                }
            }
        });

        if ($validator->fails()) {
            return redirect()->route('admin.hotels.edit', $hotel->id)
                ->withErrors($validator)
                ->withInput($request->except(['main_image', 'gallery_images', '_method']));
        }

        $validated = $validator->validated();

        try {
            // Resolve destination: find existing or create from API (keep current if no change)
            if (!empty($validated['city_name']) && !empty($validated['country_code'])) {
                $validated = $this->resolveDestination($validated);
            } elseif (empty($validated['destination_id'])) {
                // Keep current destination
                $validated['destination_id'] = $hotel->destination_id;
            }

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

            return redirect()->route('admin.hotels.edit', $hotel->id)
                ->withErrors(['error' => 'Failed to update hotel. Please try again.'])
                ->withInput($request->except(['main_image', 'gallery_images', '_method']));
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

        AgodaHotel::where('promoted_hotel_id', $hotel->id)
            ->update(['promoted_hotel_id' => null]);

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
        \App\Jobs\RecalculateHotelScores::dispatch(null, Auth::id());

        return back()->with('success', 'Score recalculation has been queued and will complete shortly.');
    }

    /**
     * Upload and set main image for hotel
     */
    public function uploadMainImage(Request $request, Hotel $hotel): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp',
        ]);

        try {
            /** @var \Illuminate\Filesystem\FilesystemAdapter $storage */
            $storage = Storage::disk(config('filesystems.public_uploads', 'public'));

            // Delete old image if exists
            if ($hotel->main_image && $storage->exists($hotel->main_image)) {
                $storage->delete($hotel->main_image);
            }

            // Store new image
            $path = $request->file('image')->store('hotels/main', config('filesystems.public_uploads', 'public'));
            
            $hotel->update(['main_image' => $path]);

            return response()->json([
                'success' => true,
                'image_url' => $storage->url($path),
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
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp',
        ]);

        try {
            /** @var \Illuminate\Filesystem\FilesystemAdapter $storage */
            $storage = Storage::disk(config('filesystems.public_uploads', 'public'));
            $existingImages = $hotel->images ?? [];
            $newImages = [];

            foreach ($request->file('images') as $image) {
                $path = $image->store('hotels/gallery', config('filesystems.public_uploads', 'public'));
                $newImages[] = $path;
            }

            $allImages = array_merge($existingImages, $newImages);
            $hotel->update(['images' => $allImages]);

            return response()->json([
                'success' => true,
                'images' => array_map(fn($path) => $storage->url($path), $allImages),
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

            // Validate the image belongs to this hotel (prevent path traversal)
            if (!in_array($imageToDelete, $images, true)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Image not found in this hotel.',
                ], 403);
            }

            // Remove from array
            $images = array_filter($images, fn($img) => $img !== $imageToDelete);
            
            // Delete file
            $disk = config('filesystems.public_uploads', 'public');
            if (Storage::disk($disk)->exists($imageToDelete)) {
                Storage::disk($disk)->delete($imageToDelete);
            }

            $hotel->update(['images' => array_values($images)]);

            return response()->json([
                'success' => true,
                'message' => 'Image deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image.',
            ], 500);
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

        $oldTier = $hotel->subscription_tier;

        $hotel->update([
            'subscription_tier' => $request->subscription_tier,
            'subscription_expires_at' => $request->subscription_expires_at,
        ]);

        Log::info('Hotel subscription tier updated by admin', [
            'hotel_id' => $hotel->id,
            'hotel_name' => $hotel->name,
            'old_tier' => $oldTier,
            'new_tier' => $request->subscription_tier,
            'expires_at' => $request->subscription_expires_at,
            'admin_id' => Auth::id(),
        ]);

        return back()->with('success', 'Subscription updated successfully.');
    }

    /**
     * Search Agoda hotels by destination city ID and optional name filter.
     * Returns JSON results for the import modal search.
     */
    public function searchAgodaHotels(Request $request): JsonResponse
    {
        $request->validate([
            'destination_id' => 'required|exists:destinations,id',
            'search' => 'nullable|string|max:255',
        ]);

        $destination = Destination::findOrFail($request->destination_id);

        if (!$destination->agoda_city_id) {
            return response()->json([
                'error' => 'This destination does not have an Agoda City ID configured.',
                'results' => [],
            ]);
        }

        $agodaService = app(AgodaService::class);

        if (!$agodaService->isConfigured()) {
            return response()->json(['error' => 'Agoda API is not configured.', 'results' => []]);
        }

        $checkIn = now()->addDays(7)->format('Y-m-d');
        $checkOut = now()->addDays(8)->format('Y-m-d');

        try {
            $cacheKey = 'agoda:search:' . $destination->agoda_city_id;
            $response = Cache::remember($cacheKey, now()->addMinutes(5), function () use ($agodaService, $destination, $checkIn, $checkOut) {
                return $agodaService->searchByCity(
                    (int) $destination->agoda_city_id,
                    $checkIn,
                    $checkOut,
                    maxResults: 50
                );
            });

            if (!$response || empty($response['results'])) {
                return response()->json(['results' => []]);
            }

            $results = collect($response['results']);

            // Filter by name if search term provided
            $search = trim($request->search ?? '');
            if ($search !== '') {
                $results = $results->filter(function ($hotel) use ($search) {
                    $name = $hotel['hotelName'] ?? $hotel['name'] ?? '';
                    return stripos($name, $search) !== false;
                });
            }

            // Check which ones are already imported
            $existingAgodaIds = Hotel::whereIn('agoda_hotel_id', $results->pluck('hotelId')->filter())
                ->pluck('agoda_hotel_id')
                ->map(fn ($id) => (int) $id)
                ->toArray();

            $mapped = $results->values()->map(function ($hotel) use ($existingAgodaIds) {
                $hotelId = (int) ($hotel['hotelId'] ?? 0);
                return [
                    'hotel_id' => $hotelId,
                    'name' => $hotel['hotelName'] ?? $hotel['name'] ?? 'Unknown',
                    'star_rating' => $hotel['starRating'] ?? 0,
                    'image' => $hotel['imageURL'] ?? $hotel['imageUrl'] ?? null,
                    'review_score' => $hotel['reviewScore'] ?? null,
                    'price' => $hotel['dailyRate'] ?? null,
                    'currency' => $hotel['currency'] ?? 'USD',
                    'already_imported' => in_array($hotelId, $existingAgodaIds),
                ];
            });

            return response()->json(['results' => $mapped]);

        } catch (\Throwable $e) {
            Log::error('Agoda search failed', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'Search failed: ' . $e->getMessage(), 'results' => []]);
        }
    }

    /**
     * Import a hotel from Agoda by hotel ID.
     * Fetches details from Agoda API, creates Hotel + estimated PoolCriteria, calculates scores.
     */
    public function importFromAgoda(Request $request): RedirectResponse|JsonResponse
    {
        $request->validate([
            'agoda_hotel_id' => 'required|integer|min:1',
            'destination_id' => 'nullable|exists:destinations,id',
        ]);

        $agodaHotelId = (int) $request->agoda_hotel_id;

        // Check if already imported (including soft-deleted)
        $existing = Hotel::withTrashed()->where('agoda_hotel_id', $agodaHotelId)->first();
        if ($existing && !$existing->trashed()) {
            return back()->withErrors([
                'agoda_hotel_id' => "This Agoda hotel (ID: {$agodaHotelId}) has already been imported as \"{$existing->name}\".",
            ]);
        }

        // If previously deleted, force-delete the old record so we can re-import fresh
        if ($existing && $existing->trashed()) {
            $existing->forceDelete();
        }

        $agodaService = app(AgodaService::class);

        if (!$agodaService->isConfigured()) {
            return back()->withErrors(['agoda_hotel_id' => 'Agoda API is not configured.']);
        }

        // Fetch hotel data from Agoda API
        $checkIn = now()->addDays(7)->format('Y-m-d');
        $checkOut = now()->addDays(8)->format('Y-m-d');

        try {
            $response = $agodaService->searchByHotelIds([$agodaHotelId], $checkIn, $checkOut);

            if (!$response || empty($response['results'])) {
                return back()->withErrors([
                    'agoda_hotel_id' => "No hotel found on Agoda with ID: {$agodaHotelId}. Please check the ID and try again.",
                ]);
            }

            $agodaHotel = $response['results'][0];

            // Auto-detect destination from hotel coordinates, or use manually selected one
            $destination = $this->resolveImportDestination($request->destination_id, $agodaHotel);
            if (!$destination) {
                return back()->withErrors([
                    'destination_id' => 'Could not auto-detect destination (hotel may lack coordinates). Please select one manually.',
                ])->withInput();
            }

            $starRating = (int) round($agodaHotel['starRating'] ?? 3);
            $starRating = max(1, min(5, $starRating));

            // Create the hotel record
            $hotelName = $agodaHotel['hotelName'] ?? $agodaHotel['name'] ?? 'Imported Agoda Hotel';
            $hotel = Hotel::create([
                'name' => $hotelName,
                'slug' => Str::slug($hotelName) . '-' . $agodaHotelId,
                'destination_id' => $destination->id,
                'star_rating' => $starRating,
                'total_rooms' => $this->estimateTotalRooms($starRating),
                'address' => $agodaHotel['address'] ?? $destination->name,
                'latitude' => $agodaHotel['latitude'] ?? null,
                'longitude' => $agodaHotel['longitude'] ?? null,
                'main_image' => $agodaHotel['imageURL'] ?? $agodaHotel['imageUrl'] ?? null,
                'agoda_hotel_id' => $agodaHotelId,
                'booking_affiliate_url' => $agodaHotel['landingURL'] ?? $agodaHotel['landingUrl'] ?? null,
                'is_active' => true,
                'is_verified' => false,
                'external_api_id' => (string) $agodaHotelId,
                'external_api_source' => 'agoda',
            ]);

            // Create estimated pool criteria
            $estimationService = app(PoolEstimationService::class);
            $estimatedCriteria = $estimationService->estimate((float) $starRating);

            $criteriaData = [
                'hotel_id' => $hotel->id,
                // Core metrics
                'sunbed_count' => $estimatedCriteria->sunbed_count,
                'sunbed_to_guest_ratio' => $estimatedCriteria->sunbed_to_guest_ratio,
                'sunbed_types' => $estimatedCriteria->sunbed_types,
                'sun_exposure' => $estimatedCriteria->sun_exposure,
                'sunny_areas' => $estimatedCriteria->sunny_areas,
                // Pool details
                'pool_size_category' => $estimatedCriteria->pool_size_category,
                'pool_size_sqm' => $estimatedCriteria->pool_size_sqm,
                'number_of_pools' => $estimatedCriteria->number_of_pools,
                'pool_types' => $estimatedCriteria->pool_types,
                // Atmosphere & entertainment
                'atmosphere' => $estimatedCriteria->atmosphere,
                'music_level' => $estimatedCriteria->music_level,
                'has_entertainment' => $estimatedCriteria->has_entertainment ?? false,
                'entertainment_types' => $estimatedCriteria->entertainment_types,
                // Service & facilities
                'has_pool_bar' => $estimatedCriteria->has_pool_bar ?? false,
                'has_waiter_service' => $estimatedCriteria->has_waiter_service ?? false,
                'shade_options' => $estimatedCriteria->shade_options,
                'bar_distance' => $estimatedCriteria->bar_distance,
                'toilet_distance' => $estimatedCriteria->toilet_distance,
                'towel_reservation_policy' => $estimatedCriteria->towel_reservation_policy,
                'towel_service_cost' => $estimatedCriteria->towel_service_cost,
                'pool_opening_hours' => $estimatedCriteria->pool_opening_hours,
                // Pool type flags
                'has_infinity_pool' => $estimatedCriteria->has_infinity_pool ?? false,
                'has_rooftop_pool' => $estimatedCriteria->has_rooftop_pool ?? false,
                'is_adults_only' => $estimatedCriteria->is_adults_only ?? false,
                // Kids features
                'has_kids_pool' => $estimatedCriteria->has_kids_pool ?? false,
                'kids_pool_depth_m' => $estimatedCriteria->kids_pool_depth_m,
                'has_splash_park' => $estimatedCriteria->has_splash_park ?? false,
                'has_waterslide' => $estimatedCriteria->has_waterslide ?? false,
                'has_lifeguard' => $estimatedCriteria->has_lifeguard ?? false,
                'lifeguard_hours' => $estimatedCriteria->lifeguard_hours,
                // Luxury extras
                'has_luxury_cabanas' => $estimatedCriteria->has_luxury_cabanas ?? false,
                'has_cabana_service' => $estimatedCriteria->has_cabana_service ?? false,
                'has_heated_pool' => $estimatedCriteria->has_heated_pool ?? false,
                'has_jacuzzi' => $estimatedCriteria->has_jacuzzi ?? false,
                'has_adult_sun_terrace' => $estimatedCriteria->has_adult_sun_terrace ?? false,
                // Condition ratings
                'cleanliness_rating' => $estimatedCriteria->cleanliness_rating,
                'sunbed_condition_rating' => $estimatedCriteria->sunbed_condition_rating,
                'tiling_condition_rating' => $estimatedCriteria->tiling_condition_rating,
                // Accessibility
                'has_accessibility_ramp' => $estimatedCriteria->has_accessibility_ramp ?? false,
                'has_pool_hoist' => $estimatedCriteria->has_pool_hoist ?? false,
                'has_step_free_access' => $estimatedCriteria->has_step_free_access ?? false,
                'has_elevator_to_rooftop' => $estimatedCriteria->has_elevator_to_rooftop ?? false,
            ];

            PoolCriteria::create($criteriaData);

            // Calculate and save scores
            $this->scoringService->calculateAndUpdateScores($hotel->fresh());

            Log::info('Hotel imported from Agoda', [
                'hotel_id' => $hotel->id,
                'agoda_hotel_id' => $agodaHotelId,
                'name' => $hotel->name,
                'user_id' => Auth::id(),
            ]);

            return redirect()->route('admin.hotels.edit', $hotel->id)
                ->with('success', "Hotel \"{$hotel->name}\" imported from Agoda successfully! You can now edit the details and refine the pool criteria.");

        } catch (\Throwable $e) {
            Log::error('Agoda import failed', [
                'agoda_hotel_id' => $agodaHotelId,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->withErrors([
                'agoda_hotel_id' => 'Failed to import hotel: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Estimate total rooms based on star rating for imported hotels.
     */
    private function estimateTotalRooms(int $starRating): int
    {
        return match (true) {
            $starRating >= 5 => 200,
            $starRating >= 4 => 150,
            $starRating >= 3 => 100,
            default => 60,
        };
    }

    /**
     * Estimate sunbed count based on star rating for imported hotels.
     */
    private function estimateSunbedCount(int $starRating): int
    {
        return match (true) {
            $starRating >= 5 => 150,
            $starRating >= 4 => 100,
            $starRating >= 3 => 50,
            default => 25,
        };
    }

    /**
     * Resolve destination: use manually selected one, auto-detect from coordinates,
     * or create a new one via reverse geocoding.
     */
    private function resolveImportDestination(?string $destinationId, array $agodaHotel): ?Destination
    {
        // If admin manually selected a destination, use it
        if ($destinationId) {
            return Destination::find($destinationId);
        }

        $lat = $agodaHotel['latitude'] ?? null;
        $lng = $agodaHotel['longitude'] ?? null;

        if (!$lat || !$lng) {
            return null;
        }

        // Find the nearest existing destination using Haversine formula (within 5km)
        $destination = Destination::whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->where('is_active', true)
            ->selectRaw('*, (
                6371 * acos(
                    cos(radians(?)) * cos(radians(latitude)) *
                    cos(radians(longitude) - radians(?)) +
                    sin(radians(?)) * sin(radians(latitude))
                )
            ) AS distance_km', [$lat, $lng, $lat])
            ->having('distance_km', '<', 5)
            ->orderBy('distance_km')
            ->first();

        if ($destination) {
            return $destination;
        }

        // No nearby destination found — reverse geocode and create one
        return $this->createDestinationFromCoordinates($lat, $lng);
    }

    /**
     * Reverse geocode coordinates using OpenStreetMap Nominatim (free, no API key)
     * and create a new Destination.
     */
    private function createDestinationFromCoordinates(float $lat, float $lng): ?Destination
    {
        try {
            $response = \Illuminate\Support\Facades\Http::withHeaders([
                'User-Agent' => 'SunbedRanker/1.0',
            ])->timeout(10)->get('https://nominatim.openstreetmap.org/reverse', [
                'lat' => $lat,
                'lon' => $lng,
                'format' => 'json',
                'zoom' => 10,
                'addressdetails' => 1,
            ]);

            if (!$response->successful()) {
                Log::warning('Nominatim reverse geocode failed', ['status' => $response->status()]);
                return null;
            }

            $data = $response->json();
            $address = $data['address'] ?? [];

            // Determine city name: try city, town, municipality, county, state
            $cityName = $address['city']
                ?? $address['town']
                ?? $address['municipality']
                ?? $address['county']
                ?? $address['state']
                ?? null;

            $country = $address['country'] ?? null;
            $countryCode = isset($address['country_code']) ? strtoupper($address['country_code']) : null;
            $region = $address['state'] ?? $address['region'] ?? null;

            if (!$cityName || !$countryCode) {
                Log::warning('Nominatim: insufficient address data for destination', ['data' => $data]);
                return null;
            }

            // Check if this destination already exists (case-insensitive match)
            $existing = Destination::where('country_code', $countryCode)
                ->whereRaw('LOWER(name) = ?', [mb_strtolower($cityName)])
                ->first();

            if ($existing) {
                return $existing;
            }

            // Generate unique slug
            $baseSlug = Str::slug($cityName);
            $slug = $baseSlug;
            $counter = 1;
            while (Destination::where('slug', $slug)->exists()) {
                $slug = "{$baseSlug}-{$countryCode}-" . ($counter > 1 ? $counter : '');
                $slug = rtrim($slug, '-');
                $counter++;
            }

            $destination = Destination::create([
                'name' => $cityName,
                'slug' => $slug,
                'country' => $country,
                'country_code' => $countryCode,
                'region' => $region,
                'latitude' => $lat,
                'longitude' => $lng,
                'is_active' => true,
                'is_auto_created' => true,
            ]);

            Log::info('Destination auto-created from Agoda import via reverse geocoding', [
                'destination_id' => $destination->id,
                'name' => $cityName,
                'country' => $country,
            ]);

            // Clear destinations cache
            Cache::forget(self::CACHE_KEY_DESTINATIONS);

            return $destination;

        } catch (\Throwable $e) {
            Log::error('Reverse geocoding failed during Agoda import', [
                'lat' => $lat,
                'lng' => $lng,
                'error' => $e->getMessage(),
            ]);
            return null;
        }
    }
}

<?php

namespace App\Http\Controllers\Hotelier;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Services\HotelScoringService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HotelManagementController extends Controller
{
    /**
     * Display the hotel management form.
     */
    public function edit(Hotel $hotel)
    {
        $this->authorizeOwnership($hotel);
        $this->checkSubscriptionTier();

        $hotel->load(['destination', 'poolCriteria', 'badges']);
        
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $subscription = [
            'tier' => $user->subscription_tier ?? 'free',
            'hasEnhanced' => $user->hasAtLeastEnhancedTier(),
            'hasPremium' => $user->hasPremiumTier(),
        ];

        return Inertia::render('Hotelier/Claims/ManageHotel', [
            'hotel' => $hotel,
            'subscription' => $subscription,
        ]);
    }

    /**
     * Update the hotel's pool criteria, descriptions, and images.
     */
    public function update(Request $request, Hotel $hotel)
    {
        $this->authorizeOwnership($hotel);
        $this->checkSubscriptionTier();
        $this->sanitizeNumericFields($request);

        $validated = $request->validate($this->getValidationRules());

        $this->handleImageUploads($request, $hotel);
        $this->updateHotelDescriptions($hotel, $validated);
        $this->updateEnhancedFeatures($hotel, $validated);
        $this->updatePoolCriteria($hotel, $validated);
        $this->recalculateScores($hotel);

        return redirect()->back()->with('success', 'Hotel updated successfully!');
    }

    /**
     * Upload a single image to the hotel.
     */
    public function uploadImage(Request $request, Hotel $hotel)
    {
        $this->authorizeOwnership($hotel);
        $this->checkSubscriptionTier();

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
            'type' => 'required|in:main,gallery',
        ]);

        $disk = config('filesystems.public_disk', 'public');
        $path = $request->file('image')->store('hotels', $disk);

        if ($request->type === 'main') {
            $this->deleteOldMainImage($hotel, $disk);
            $hotel->update(['main_image' => $path]);
        } else {
            $images = $hotel->images ?? [];
            $images[] = $path;
            $hotel->update(['images' => $images]);
        }

        return redirect()->back()->with('success', 'Image uploaded successfully!');
    }

    /**
     * Delete a gallery image from the hotel.
     */
    public function deleteImage(Request $request, Hotel $hotel, $image)
    {
        $this->authorizeOwnership($hotel);
        $this->checkSubscriptionTier();

        $images = $hotel->images ?? [];
        $imageToDelete = urldecode($image);

        if (in_array($imageToDelete, $images)) {
            Storage::disk('public')->delete($imageToDelete);
            $images = array_values(array_filter($images, fn($img) => $img !== $imageToDelete));
            $hotel->update(['images' => $images]);

            return redirect()->back()->with('success', 'Image deleted successfully!');
        }

        return redirect()->back()->with('error', 'Image not found.');
    }

    // =========================================================================
    // Private Helper Methods
    // =========================================================================

    /**
     * Check if user has required subscription tier to edit hotels.
     */
    private function checkSubscriptionTier(): void
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->canEditHotels()) {
            abort(403, 'Upgrade to Enhanced or Premium subscription to edit hotel profiles.');
        }
    }

    /**
     * Verify the current user owns the hotel.
     */
    private function authorizeOwnership(Hotel $hotel): void
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($hotel->owned_by !== $user->id) {
            abort(403, 'You do not have permission to manage this hotel.');
        }
    }

    /**
     * Convert empty strings to null for numeric/rating fields.
     */
    private function sanitizeNumericFields(Request $request): void
    {
        // Note: Required fields (sun_exposure, pool_size_category, number_of_pools, 
        // towel_reservation_policy, atmosphere) are NOT sanitized to preserve validation
        $fieldsToSanitize = [
            'cleanliness_rating', 'sunbed_condition_rating', 'tiling_condition_rating',
            'towel_service_cost', 'bar_distance', 'toilet_distance',
            'music_level', 'pool_size_sqm', 'kids_pool_depth_m',
        ];

        $sanitized = [];
        foreach ($fieldsToSanitize as $field) {
            $sanitized[$field] = $request->$field ?: null;
        }

        $request->merge($sanitized);
    }

    /**
     * Get validation rules for hotelier-editable fields.
     */
    private function getValidationRules(): array
    {
        return [
            // Images
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',

            // Descriptions
            'pool_description' => 'nullable|string|max:5000',
            'amenities_description' => 'nullable|string|max:5000',
            'house_rules' => 'nullable|string|max:5000',
            'towel_policy' => 'nullable|string|max:2000',
            'faqs' => 'nullable|array',
            'faqs.*.question' => 'nullable|string|max:500',
            'faqs.*.answer' => 'nullable|string|max:2000',

            // Pool Criteria - Basic (Required)
            'sunbed_count' => 'required|integer|min:1|max:1000',
            'sunbed_types' => 'nullable|array',
            'sun_exposure' => 'required|in:all_day,afternoon_only,morning_only,partial_shade,mostly_shaded,full_sun,mostly_sunny',
            'sunny_areas' => 'nullable|array',
            'pool_size_category' => 'required|in:small,medium,large,very_large,extra_large',
            'pool_size_sqm' => 'nullable|numeric|min:1|max:100000',
            'number_of_pools' => 'required|integer|min:1|max:50',
            'pool_types' => 'nullable|array',

            // Pool Criteria - Policies (Required)
            'towel_reservation_policy' => 'required|in:enforced,tolerated,free_for_all,not_allowed,allowed,time_limited,premium_only',
            'towel_service_cost' => 'nullable|in:included,extra_cost,deposit_required,free,deposit,paid',
            'pool_opening_hours' => 'nullable|string|max:100',

            // Pool Criteria - Facilities
            'has_pool_bar' => 'boolean',
            'has_waiter_service' => 'boolean',
            'shade_options' => 'nullable|array',
            'bar_distance' => 'nullable|in:poolside,close,moderate,far,under_50m,50_100m,over_100m',
            'toilet_distance' => 'nullable|in:adjacent,close,moderate,far,poolside,under_50m,50_100m,over_100m',

            // Pool Criteria - Atmosphere (Required)
            'atmosphere' => 'required|in:quiet,relaxed,family,lively,party,quiet_relaxing,family_friendly,social_lively',
            'music_level' => 'nullable|in:none,low,moderate,loud,dj,background',
            'has_entertainment' => 'boolean',
            'entertainment_types' => 'nullable|array',

            // Pool Criteria - Ratings & Accessibility
            'cleanliness_rating' => 'nullable|sometimes|integer|min:1|max:5',
            'sunbed_condition_rating' => 'nullable|sometimes|integer|min:1|max:5',
            'tiling_condition_rating' => 'nullable|sometimes|integer|min:1|max:5',
            'has_accessibility_ramp' => 'boolean',
            'has_pool_hoist' => 'boolean',
            'has_step_free_access' => 'boolean',
            'has_elevator_to_rooftop' => 'boolean',

            // Pool Criteria - Kids Features
            'has_kids_pool' => 'boolean',
            'kids_pool_depth_m' => 'nullable|numeric|min:0',
            'has_splash_park' => 'boolean',
            'has_waterslide' => 'boolean',
            'has_lifeguard' => 'boolean',
            'lifeguard_hours' => 'nullable|string|max:100',

            // Pool Criteria - Premium Features
            'has_luxury_cabanas' => 'boolean',
            'has_cabana_service' => 'boolean',
            'has_heated_pool' => 'boolean',
            'has_jacuzzi' => 'boolean',
            'has_adult_sun_terrace' => 'boolean',
            
            // Enhanced Subscription Features
            'promotional_banner' => 'nullable|string|max:255',
            'special_offer' => 'nullable|string|max:1000',
            'special_offer_expires_at' => 'nullable|date|after_or_equal:today',
            'video_url' => 'nullable|url|max:500',
            'video_360_url' => 'nullable|url|max:500',
            'direct_booking_url' => 'nullable|url|max:500',
            'show_verified_badge' => 'boolean',
        ];
    }

    /**
     * Handle main and gallery image uploads.
     */
    private function handleImageUploads(Request $request, Hotel $hotel): void
    {
        $disk = config('filesystems.public_disk', 'public');

        // Main image
        if ($request->hasFile('main_image')) {
            $this->deleteOldMainImage($hotel, $disk);
            $path = $request->file('main_image')->store('hotels', $disk);
            $hotel->update(['main_image' => $path]);
        }

        // Gallery images
        if ($request->hasFile('gallery_images')) {
            $galleryImages = $hotel->images ?? [];
            foreach ($request->file('gallery_images') as $image) {
                $galleryImages[] = $image->store('hotels', $disk);
            }
            $hotel->update(['images' => $galleryImages]);
        }
    }

    /**
     * Delete the old main image if it exists.
     */
    private function deleteOldMainImage(Hotel $hotel, string $disk): void
    {
        if ($hotel->main_image && !str_starts_with($hotel->main_image, 'http')) {
            Storage::disk($disk)->delete($hotel->main_image);
        }
    }

    /**
     * Update hotel description fields.
     */
    private function updateHotelDescriptions(Hotel $hotel, array $validated): void
    {
        $hotel->update([
            'pool_description' => $validated['pool_description'] ?? null,
            'amenities_description' => $validated['amenities_description'] ?? null,
            'house_rules' => $validated['house_rules'] ?? null,
            'towel_policy' => $validated['towel_policy'] ?? null,
            'faqs' => $validated['faqs'] ?? null,
        ]);
    }

    /**
     * Update enhanced subscription features (only for Enhanced+ tier users).
     */
    private function updateEnhancedFeatures(Hotel $hotel, array $validated): void
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        // Only allow updates if user has at least Enhanced subscription
        if (!$user->hasAtLeastEnhancedTier()) {
            return;
        }

        $hotel->update([
            'promotional_banner' => $validated['promotional_banner'] ?: null,
            'special_offer' => $validated['special_offer'] ?: null,
            'special_offer_expires_at' => !empty($validated['special_offer_expires_at']) ? $validated['special_offer_expires_at'] : null,
            'video_url' => $validated['video_url'] ?: null,
            'video_360_url' => $validated['video_360_url'] ?: null,
            'direct_booking_url' => $validated['direct_booking_url'] ?: null,
            'show_verified_badge' => $validated['show_verified_badge'] ?? false,
        ]);
    }

    /**
     * Update or create pool criteria.
     */
    private function updatePoolCriteria(Hotel $hotel, array $validated): void
    {
        $poolData = [
            // Basic
            'sunbed_count' => $validated['sunbed_count'] ?? null,
            'sunbed_types' => $validated['sunbed_types'] ?? [],
            'sun_exposure' => $validated['sun_exposure'] ?? null,
            'sunny_areas' => $validated['sunny_areas'] ?? [],
            'pool_size_sqm' => $validated['pool_size_sqm'] ?? null,
            'pool_size_category' => $validated['pool_size_category'] ?? null,
            'number_of_pools' => $validated['number_of_pools'] ?? 1,
            'pool_types' => $validated['pool_types'] ?? [],

            // Policies
            'towel_reservation_policy' => $validated['towel_reservation_policy'] ?? null,
            'towel_service_cost' => $validated['towel_service_cost'] ?? null,
            'pool_opening_hours' => $validated['pool_opening_hours'] ?? null,

            // Facilities
            'shade_options' => $validated['shade_options'] ?? [],
            'has_pool_bar' => $validated['has_pool_bar'] ?? false,
            'has_waiter_service' => $validated['has_waiter_service'] ?? false,
            'bar_distance' => $validated['bar_distance'] ?? null,
            'toilet_distance' => $validated['toilet_distance'] ?? null,

            // Atmosphere
            'atmosphere' => $validated['atmosphere'] ?? null,
            'music_level' => $validated['music_level'] ?? null,
            'has_entertainment' => $validated['has_entertainment'] ?? false,
            'entertainment_types' => $validated['entertainment_types'] ?? [],

            // Ratings
            'cleanliness_rating' => $validated['cleanliness_rating'] ?? null,
            'sunbed_condition_rating' => $validated['sunbed_condition_rating'] ?? null,
            'tiling_condition_rating' => $validated['tiling_condition_rating'] ?? null,

            // Accessibility
            'has_accessibility_ramp' => $validated['has_accessibility_ramp'] ?? false,
            'has_pool_hoist' => $validated['has_pool_hoist'] ?? false,
            'has_step_free_access' => $validated['has_step_free_access'] ?? false,
            'has_elevator_to_rooftop' => $validated['has_elevator_to_rooftop'] ?? false,

            // Kids Features
            'has_kids_pool' => $validated['has_kids_pool'] ?? false,
            'kids_pool_depth_m' => $validated['kids_pool_depth_m'] ?? null,
            'has_splash_park' => $validated['has_splash_park'] ?? false,
            'has_waterslide' => $validated['has_waterslide'] ?? false,
            'has_lifeguard' => $validated['has_lifeguard'] ?? false,
            'lifeguard_hours' => $validated['lifeguard_hours'] ?? null,

            // Premium Features
            'has_luxury_cabanas' => $validated['has_luxury_cabanas'] ?? false,
            'has_cabana_service' => $validated['has_cabana_service'] ?? false,
            'has_heated_pool' => $validated['has_heated_pool'] ?? false,
            'has_jacuzzi' => $validated['has_jacuzzi'] ?? false,
            'has_adult_sun_terrace' => $validated['has_adult_sun_terrace'] ?? false,
        ];

        $hotel->poolCriteria()->updateOrCreate(
            ['hotel_id' => $hotel->id],
            $poolData
        );
    }

    /**
     * Recalculate hotel scores after update.
     */
    private function recalculateScores(Hotel $hotel): void
    {
        $scoringService = new HotelScoringService();
        $scoringService->calculateAndUpdateScores($hotel);
    }
}

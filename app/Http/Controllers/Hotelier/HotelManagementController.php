<?php

namespace App\Http\Controllers\Hotelier;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\Destination;
use App\Models\Badge;
use App\Services\HotelScoringService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HotelManagementController extends Controller
{
    public function edit(Hotel $hotel)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Verify ownership
        if ($hotel->owned_by !== $user->id) {
            abort(403, 'You do not have permission to manage this hotel.');
        }

        // Load relationships
        $hotel->load(['destination', 'poolCriteria', 'badges']);

        // Get all destinations for dropdown
        $destinations = Destination::select('id', 'name')->orderBy('name')->get();

        // Get all badges
        $badges = Badge::all();

        return Inertia::render('Hotelier/ManageHotel', [
            'hotel' => $hotel,
            'destinations' => $destinations,
            'badges' => $badges,
        ]);
    }

    public function update(Request $request, Hotel $hotel)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Verify ownership
        if ($hotel->owned_by !== $user->id) {
            abort(403, 'You do not have permission to manage this hotel.');
        }

        // Convert empty strings to null for rating fields and numeric fields
        $request->merge([
            'cleanliness_rating' => $request->cleanliness_rating ?: null,
            'sunbed_condition_rating' => $request->sunbed_condition_rating ?: null,
            'tiling_condition_rating' => $request->tiling_condition_rating ?: null,
            'sun_exposure' => $request->sun_exposure ?: null,
            'pool_size_category' => $request->pool_size_category ?: null,
            'towel_reservation_policy' => $request->towel_reservation_policy ?: null,
            'towel_service_cost' => $request->towel_service_cost ?: null,
            'bar_distance' => $request->bar_distance ?: null,
            'toilet_distance' => $request->toilet_distance ?: null,
            'atmosphere' => $request->atmosphere ?: null,
            'music_level' => $request->music_level ?: null,
            'sunbed_count' => $request->sunbed_count ?: null,
            'pool_size_sqm' => $request->pool_size_sqm ?: null,
            'number_of_pools' => $request->number_of_pools ?: null,
            'kids_pool_depth_m' => $request->kids_pool_depth_m ?: null,
        ]);

        $validated = $request->validate([
            // Basic Info
            'name' => 'required|string|max:255',
            'destination_id' => 'required|exists:destinations,id',
            'description' => 'required|string',
            'star_rating' => 'required|integer|min:1|max:5',
            'total_rooms' => 'nullable|integer|min:1',

            // Contact & Location
            'address' => 'required|string|max:500',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'website' => 'nullable|url|max:255',

            // Affiliate Links
            'booking_affiliate_url' => 'nullable|url|max:500',
            'expedia_affiliate_url' => 'nullable|url|max:500',
            'direct_booking_url' => 'nullable|url|max:500',
            'affiliate_provider' => 'nullable|string|max:100',
            'affiliate_tracking_code' => 'nullable|string|max:255',

            // Settings
            'is_active' => 'boolean',
            'override_name' => 'boolean',
            'override_images' => 'boolean',
            'override_description' => 'boolean',

            // Pool Criteria - 1. Sunbed Availability & Ratio
            'sunbed_count' => 'required|integer|min:1|max:1000',
            'sunbed_types' => 'nullable|array',
            
            // Pool Criteria - 2. Sun Exposure Hours
            'sun_exposure' => 'nullable|in:all_day,afternoon_only,morning_only,partial_shade,mostly_shaded',
            'sunny_areas' => 'nullable|array',
            
            // Pool Criteria - 3. Pool Size & Area
            'pool_size_category' => 'nullable|in:small,medium,large,very_large',
            'pool_size_sqm' => 'nullable|numeric|min:1|max:100000',
            
            // Pool Criteria - 4. Towel & Reservation Policy
            'towel_reservation_policy' => 'nullable|in:enforced,tolerated,free_for_all',
            'towel_service_cost' => 'nullable|in:included,extra_cost,deposit_required',
            'pool_opening_hours' => 'nullable|string|max:100',
            
            // Pool Criteria - 5. Pool Types & Variety
            'number_of_pools' => 'nullable|integer|min:1|max:50',
            'pool_types' => 'nullable|array',
            
            // Pool Criteria - 6. Facilities & Amenities
            'has_pool_bar' => 'boolean',
            'has_waiter_service' => 'boolean',
            'shade_options' => 'nullable|array',
            'bar_distance' => 'nullable|in:poolside,close,moderate,far',
            'toilet_distance' => 'nullable|in:adjacent,close,moderate,far',
            
            // Pool Criteria - 7. Atmosphere & Vibe
            'atmosphere' => 'nullable|in:quiet,relaxed,family,lively,party',
            'music_level' => 'nullable|in:none,low,moderate,loud,dj',
            'has_entertainment' => 'boolean',
            'entertainment_types' => 'nullable|array',
            
            // Pool Criteria - 8. Cleanliness & Maintenance
            'cleanliness_rating' => 'nullable|sometimes|integer|min:1|max:5',
            'sunbed_condition_rating' => 'nullable|sometimes|integer|min:1|max:5',
            'tiling_condition_rating' => 'nullable|sometimes|integer|min:1|max:5',
            'has_accessibility_ramp' => 'boolean',
            'has_pool_hoist' => 'boolean',
            'has_step_free_access' => 'boolean',
            'has_elevator_to_rooftop' => 'boolean',
            'has_kids_pool' => 'boolean',
            'kids_pool_depth_m' => 'nullable|numeric|min:0',
            'has_splash_park' => 'boolean',
            'has_waterslide' => 'boolean',
            'has_lifeguard' => 'boolean',
            'lifeguard_hours' => 'nullable|string|max:100',
            'has_luxury_cabanas' => 'boolean',
            'has_cabana_service' => 'boolean',
            'has_heated_pool' => 'boolean',
            'has_jacuzzi' => 'boolean',
            'has_adult_sun_terrace' => 'boolean',
        ], [
            // Custom error messages for pool scoring validations
            'sunbed_count.required' => 'Total sunbeds available is required for pool scoring.',
            'sunbed_count.min' => 'Total sunbeds must be at least 1.',
            'sunbed_count.max' => 'Sunbed count cannot exceed 1,000.',
            'pool_size_sqm.min' => 'Pool size must be at least 1 square meter.',
            'pool_size_sqm.max' => 'Pool size cannot exceed 100,000 square meters.',
            'number_of_pools.min' => 'Number of pools must be at least 1.',
            'number_of_pools.max' => 'Number of pools cannot exceed 50.',
            'kids_pool_depth_m.min' => 'Kids pool depth must be at least 0.1 meters.',
            'kids_pool_depth_m.max' => 'Kids pool depth cannot exceed 5 meters.',
            'pool_opening_hours.max' => 'Pool opening hours cannot exceed 100 characters.',
            'lifeguard_hours.max' => 'Lifeguard hours cannot exceed 100 characters.',
        ]);

        // Update hotel basic fields
        $hotel->update([
            'name' => $validated['name'],
            'destination_id' => $validated['destination_id'],
            'description' => $validated['description'] ?? null,
            'star_rating' => $validated['star_rating'] ?? null,
            'total_rooms' => $validated['total_rooms'] ?? null,
            'address' => $validated['address'] ?? null,
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null,
            'website' => $validated['website'] ?? null,
            'booking_affiliate_url' => $validated['booking_affiliate_url'] ?? null,
            'expedia_affiliate_url' => $validated['expedia_affiliate_url'] ?? null,
            'direct_booking_url' => $validated['direct_booking_url'] ?? null,
            'affiliate_provider' => $validated['affiliate_provider'] ?? null,
            'affiliate_tracking_code' => $validated['affiliate_tracking_code'] ?? null,
            'is_active' => $validated['is_active'] ?? false,
            'override_name' => $validated['override_name'] ?? false,
            'override_images' => $validated['override_images'] ?? false,
            'override_description' => $validated['override_description'] ?? false,
        ]);

        // Update or create pool criteria
        $poolData = [
            'sunbed_count' => $validated['sunbed_count'] ?? null,
            'sun_exposure' => $validated['sun_exposure'] ?? null,
            'sunny_areas' => $validated['sunny_areas'] ?? [],
            'pool_size_sqm' => $validated['pool_size_sqm'] ?? null,
            'pool_size_category' => $validated['pool_size_category'] ?? null,
            'number_of_pools' => $validated['number_of_pools'] ?? 1,
            'pool_types' => $validated['pool_types'] ?? [],
            'towel_reservation_policy' => $validated['towel_reservation_policy'] ?? null,
            'towel_service_cost' => $validated['towel_service_cost'] ?? null,
            'pool_opening_hours' => $validated['pool_opening_hours'] ?? null,
            'sunbed_types' => $validated['sunbed_types'] ?? [],
            'shade_options' => $validated['shade_options'] ?? [],
            'has_pool_bar' => $validated['has_pool_bar'] ?? false,
            'has_waiter_service' => $validated['has_waiter_service'] ?? false,
            'bar_distance' => $validated['bar_distance'] ?? null,
            'toilet_distance' => $validated['toilet_distance'] ?? null,
            'atmosphere' => $validated['atmosphere'] ?? null,
            'music_level' => $validated['music_level'] ?? null,
            'has_entertainment' => $validated['has_entertainment'] ?? false,
            'entertainment_types' => $validated['entertainment_types'] ?? [],
            'cleanliness_rating' => $validated['cleanliness_rating'] ?? null,
            'sunbed_condition_rating' => $validated['sunbed_condition_rating'] ?? null,
            'tiling_condition_rating' => $validated['tiling_condition_rating'] ?? null,
            'has_accessibility_ramp' => $validated['has_accessibility_ramp'] ?? false,
            'has_pool_hoist' => $validated['has_pool_hoist'] ?? false,
            'has_step_free_access' => $validated['has_step_free_access'] ?? false,
            'has_elevator_to_rooftop' => $validated['has_elevator_to_rooftop'] ?? false,
            'has_kids_pool' => $validated['has_kids_pool'] ?? false,
            'kids_pool_depth_m' => $validated['kids_pool_depth_m'] ?? null,
            'has_splash_park' => $validated['has_splash_park'] ?? false,
            'has_waterslide' => $validated['has_waterslide'] ?? false,
            'has_lifeguard' => $validated['has_lifeguard'] ?? false,
            'lifeguard_hours' => $validated['lifeguard_hours'] ?? null,
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

        // Recalculate scores
        $scoringService = new HotelScoringService();
        $scoringService->calculateAndUpdateScores($hotel);

        return redirect()->back()->with('success', 'Hotel updated successfully with Pool & Sun Score recalculated!');
    }

    public function uploadImage(Request $request, Hotel $hotel)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Verify ownership
        if ($hotel->owned_by !== $user->id) {
            abort(403, 'You do not have permission to manage this hotel.');
        }

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120', // 5MB max
            'type' => 'required|in:main,gallery',
        ]);

        $image = $request->file('image');
        $path = $image->store('hotels', 'public');

        if ($request->type === 'main') {
            // Delete old main image if exists
            if ($hotel->main_image) {
                Storage::disk('public')->delete($hotel->main_image);
            }
            $hotel->update(['main_image' => $path]);
        } else {
            // Add to gallery
            $images = $hotel->images ?? [];
            $images[] = $path;
            $hotel->update(['images' => $images]);
        }

        return redirect()->back()->with('success', 'Image uploaded successfully!');
    }

    public function deleteImage(Request $request, Hotel $hotel, $image)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Verify ownership
        if ($hotel->owned_by !== $user->id) {
            abort(403, 'You do not have permission to manage this hotel.');
        }

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
}

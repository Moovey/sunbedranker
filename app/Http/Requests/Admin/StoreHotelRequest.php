<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreHotelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Convert empty strings to null for nullable numeric fields
        $this->merge([
            'latitude' => $this->latitude === '' ? null : $this->latitude,
            'longitude' => $this->longitude === '' ? null : $this->longitude,
            'cleanliness_rating' => $this->cleanliness_rating ?: null,
            'sunbed_condition_rating' => $this->sunbed_condition_rating ?: null,
            'tiling_condition_rating' => $this->tiling_condition_rating ?: null,
            'pool_size_sqm' => $this->pool_size_sqm === '' ? null : $this->pool_size_sqm,
            'kids_pool_depth_m' => $this->kids_pool_depth_m === '' ? null : $this->kids_pool_depth_m,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            // Basic Information
            'name' => 'required|string|max:255',
            'destination_id' => 'required|exists:destinations,id',
            'description' => 'nullable|string|max:5000',
            'star_rating' => 'nullable|integer|min:1|max:5',
            'total_rooms' => 'nullable|integer|min:1',
            
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
            
            // Facilities
            'has_pool_bar' => 'boolean',
            'has_waiter_service' => 'boolean',
            'shade_options' => 'nullable|array',
            'bar_distance' => 'nullable|in:poolside,close,moderate,far',
            'toilet_distance' => 'nullable|in:adjacent,close,moderate,far',
            
            // Atmosphere
            'atmosphere' => 'nullable|in:quiet,relaxed,family,lively,party',
            'music_level' => 'nullable|in:none,low,moderate,loud,dj',
            'has_entertainment' => 'boolean',
            'entertainment_types' => 'nullable|array',
            
            // Maintenance Ratings
            'cleanliness_rating' => 'nullable|integer|min:1|max:5',
            'sunbed_condition_rating' => 'nullable|integer|min:1|max:5',
            'tiling_condition_rating' => 'nullable|integer|min:1|max:5',
            
            // Accessibility
            'has_accessibility_ramp' => 'boolean',
            'has_pool_hoist' => 'boolean',
            'has_step_free_access' => 'boolean',
            'has_elevator_to_rooftop' => 'boolean',
            
            // Family Features
            'has_kids_pool' => 'boolean',
            'kids_pool_depth_m' => 'nullable|numeric|min:0|max:2',
            'has_splash_park' => 'boolean',
            'has_waterslide' => 'boolean',
            'has_lifeguard' => 'boolean',
            'lifeguard_hours' => 'nullable|string|max:100',
            
            // Luxury Features
            'has_luxury_cabanas' => 'boolean',
            'has_cabana_service' => 'boolean',
            'has_heated_pool' => 'boolean',
            'has_jacuzzi' => 'boolean',
            'has_adult_sun_terrace' => 'boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            // Basic Information
            'name.required' => 'Please enter the hotel name.',
            'name.max' => 'Hotel name cannot exceed 255 characters.',
            'destination_id.required' => 'Please select a destination.',
            'destination_id.exists' => 'The selected destination is invalid.',
            'description.max' => 'Description cannot exceed 5000 characters.',
            'star_rating.min' => 'Star rating must be at least 1.',
            'star_rating.max' => 'Star rating cannot exceed 5.',
            'total_rooms.min' => 'Total rooms must be at least 1.',
            
            // Contact & Location
            'address.required' => 'Please enter the hotel address.',
            'address.max' => 'Address cannot exceed 500 characters.',
            'latitude.between' => 'Latitude must be between -90 and 90.',
            'longitude.between' => 'Longitude must be between -180 and 180.',
            'email.email' => 'Please enter a valid email address.',
            'website.url' => 'Please enter a valid website URL (include https://).',
            
            // Images
            'main_image.required' => 'Please upload a main image for the hotel.',
            'main_image.image' => 'The main image must be a valid image file.',
            'main_image.mimes' => 'Main image must be a JPEG, PNG, JPG, or WebP file.',
            'main_image.max' => 'Main image size cannot exceed 5MB.',
            'gallery_images.max' => 'You can upload a maximum of 10 gallery images.',
            'gallery_images.*.image' => 'All gallery files must be valid images.',
            'gallery_images.*.mimes' => 'Gallery images must be JPEG, PNG, JPG, or WebP files.',
            'gallery_images.*.max' => 'Each gallery image cannot exceed 5MB.',
            
            // Affiliate Links
            'booking_affiliate_url.url' => 'Please enter a valid Booking.com URL.',
            'expedia_affiliate_url.url' => 'Please enter a valid Expedia URL.',
            'direct_booking_url.url' => 'Please enter a valid direct booking URL.',
            
            // Pool Criteria - Required
            'sunbed_count.required' => 'Please enter the number of sunbeds.',
            'sunbed_count.min' => 'Sunbed count must be at least 1.',
            'sun_exposure.required' => 'Please select a sun exposure option.',
            'sun_exposure.in' => 'Please select a valid sun exposure option.',
            'pool_size_category.required' => 'Please select a pool size category.',
            'pool_size_category.in' => 'Please select a valid pool size category.',
            
            // Pool Criteria - Optional
            'pool_size_sqm.min' => 'Pool size must be a positive number.',
            'number_of_pools.min' => 'Number of pools must be at least 1.',
            'kids_pool_depth_m.max' => 'Kids pool depth cannot exceed 2 meters.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'destination_id' => 'destination',
            'star_rating' => 'star rating',
            'total_rooms' => 'total rooms',
            'main_image' => 'main image',
            'gallery_images' => 'gallery images',
            'booking_affiliate_url' => 'Booking.com URL',
            'expedia_affiliate_url' => 'Expedia URL',
            'direct_booking_url' => 'direct booking URL',
            'sunbed_count' => 'sunbed count',
            'sun_exposure' => 'sun exposure',
            'pool_size_category' => 'pool size category',
            'pool_size_sqm' => 'pool size (sqm)',
            'number_of_pools' => 'number of pools',
            'kids_pool_depth_m' => 'kids pool depth',
        ];
    }
}

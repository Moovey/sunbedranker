<?php

namespace App\Services;

use App\Models\AgodaHotel;
use App\Models\Destination;
use App\Models\Hotel;
use App\Models\PoolCriteria;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

/**
 * Promotes Agoda directory entries into curated Hotel records.
 *
 * Used by both the single-promote endpoint (admin clicks "Promote" on one
 * hotel) and the BulkPromoteAgodaHotels job (admin promotes all hotels in
 * a country / by filter).
 */
class AgodaPromotionService
{
    public function __construct(
        protected PoolEstimationService $poolEstimation,
        protected HotelScoringService $scoring,
    ) {}

    /**
     * Promote a single AgodaHotel. Returns one of:
     *   ['status' => 'created'|'restored'|'relinked'|'skipped',
     *    'hotel'  => Hotel|null,
     *    'message'=> string]
     */
    public function promote(AgodaHotel $agodaHotel): array
    {
        // Already promoted?
        if ($agodaHotel->isPromoted()) {
            $linkedHotel = Hotel::withTrashed()->find($agodaHotel->promoted_hotel_id);

            if (!$linkedHotel || $linkedHotel->trashed()) {
                $agodaHotel->update(['promoted_hotel_id' => null]);
                $agodaHotel->refresh();
            } else {
                return [
                    'status'  => 'skipped',
                    'hotel'   => $linkedHotel,
                    'message' => 'Already promoted.',
                ];
            }
        }

        // Existing curated hotel for the same agoda_hotel_id?
        $existing = Hotel::withTrashed()->where('agoda_hotel_id', $agodaHotel->agoda_hotel_id)->first();
        if ($existing) {
            $status = 'relinked';
            if ($existing->trashed()) {
                $existing->restore();
                $status = 'restored';
            }

            $agodaHotel->update(['promoted_hotel_id' => $existing->id]);

            return [
                'status'  => $status,
                'hotel'   => $existing,
                'message' => "Linked to existing curated hotel \"{$existing->name}\".",
            ];
        }

        $destination = $this->resolveDestination($agodaHotel);

        $starRating = max(1, min(5, (int) round($agodaHotel->star_rating ?? 3)));
        $hotelName  = $agodaHotel->hotel_name;
        $slug       = $this->makeUniqueSlug($hotelName, $agodaHotel->agoda_hotel_id);

        $hotel = Hotel::create([
            'name' => $hotelName,
            'slug' => $slug,
            'destination_id' => $destination->id,
            'star_rating' => $starRating,
            'total_rooms' => $agodaHotel->numberrooms ?: $this->estimateTotalRooms($starRating),
            'address' => implode(', ', array_filter([$agodaHotel->addressline1, $agodaHotel->city, $agodaHotel->country])),
            'latitude' => $agodaHotel->latitude,
            'longitude' => $agodaHotel->longitude,
            'main_image' => $this->upgradeAgodaImageUrl($agodaHotel->photo1),
            'images' => array_values(array_filter(array_map(
                fn ($url) => $this->upgradeAgodaImageUrl($url),
                [$agodaHotel->photo2, $agodaHotel->photo3, $agodaHotel->photo4, $agodaHotel->photo5]
            ))),
            'description' => $agodaHotel->overview,
            'agoda_hotel_id' => $agodaHotel->agoda_hotel_id,
            'booking_affiliate_url' => $agodaHotel->affiliate_url,
            'is_active' => true,
            'is_verified' => false,
            'external_api_id' => (string) $agodaHotel->agoda_hotel_id,
            'external_api_source' => 'agoda',
        ]);

        // Estimated pool criteria + scores
        $estimated = $this->poolEstimation->estimate((float) $starRating);
        PoolCriteria::create(array_merge(
            ['hotel_id' => $hotel->id],
            $this->buildPoolCriteriaFromEstimate($estimated)
        ));
        $this->scoring->calculateAndUpdateScores($hotel->fresh());

        $agodaHotel->update(['promoted_hotel_id' => $hotel->id]);

        Cache::forget('agoda_directory_promoted');

        return [
            'status'  => 'created',
            'hotel'   => $hotel,
            'message' => "Hotel \"{$hotel->name}\" promoted.",
        ];
    }

    protected function resolveDestination(AgodaHotel $agodaHotel): Destination
    {
        $destination = null;

        if ($agodaHotel->city_id) {
            $destination = Destination::where('agoda_city_id', $agodaHotel->city_id)->first();
        }

        if (!$destination && $agodaHotel->city && $agodaHotel->countryisocode) {
            $destination = Destination::where('country_code', $agodaHotel->countryisocode)
                ->whereRaw('LOWER(name) = ?', [strtolower(trim($agodaHotel->city))])
                ->first();
        }

        if ($destination) {
            return $destination;
        }

        $cityName    = $agodaHotel->city ?: 'Unknown';
        $countryName = $agodaHotel->country ?: 'Unknown';
        $countryCode = $agodaHotel->countryisocode ?: 'XX';

        $slug = Str::slug($cityName . ' ' . $countryCode);
        if (Destination::where('slug', $slug)->exists()) {
            $slug .= '-' . ($agodaHotel->city_id ?: Str::random(4));
        }

        return Destination::create([
            'name' => $cityName,
            'slug' => $slug,
            'country' => $countryName,
            'country_code' => $countryCode,
            'latitude' => $agodaHotel->latitude,
            'longitude' => $agodaHotel->longitude,
            'is_active' => true,
            'is_auto_created' => true,
            'agoda_city_id' => $agodaHotel->city_id,
        ]);
    }

    protected function makeUniqueSlug(string $name, int|string $agodaId): string
    {
        $slug = Str::slug($name) . '-' . $agodaId;
        $count = Hotel::where('slug', $slug)->count();
        if ($count > 0) {
            $slug .= '-' . ($count + 1);
        }
        return $slug;
    }

    protected function estimateTotalRooms(int $starRating): int
    {
        return match ($starRating) {
            5 => 200,
            4 => 150,
            3 => 100,
            default => 80,
        };
    }

    protected function upgradeAgodaImageUrl(?string $url): ?string
    {
        if (!$url) {
            return null;
        }
        $url = preg_replace('/\bs=\d+x\b/', 's=1024x', $url);
        $url = str_replace('http://', 'https://', $url);
        return $url;
    }

    protected function buildPoolCriteriaFromEstimate(object $estimated): array
    {
        return [
            'sunbed_count' => $estimated->sunbed_count,
            'sunbed_to_guest_ratio' => $estimated->sunbed_to_guest_ratio,
            'sunbed_types' => $estimated->sunbed_types,
            'sun_exposure' => $estimated->sun_exposure,
            'sunny_areas' => $estimated->sunny_areas,
            'pool_size_category' => $estimated->pool_size_category,
            'pool_size_sqm' => $estimated->pool_size_sqm,
            'number_of_pools' => $estimated->number_of_pools,
            'pool_types' => $estimated->pool_types,
            'atmosphere' => $estimated->atmosphere,
            'music_level' => $estimated->music_level,
            'has_entertainment' => $estimated->has_entertainment ?? false,
            'entertainment_types' => $estimated->entertainment_types,
            'has_pool_bar' => $estimated->has_pool_bar ?? false,
            'has_waiter_service' => $estimated->has_waiter_service ?? false,
            'shade_options' => $estimated->shade_options,
            'bar_distance' => $estimated->bar_distance,
            'toilet_distance' => $estimated->toilet_distance,
            'towel_reservation_policy' => $estimated->towel_reservation_policy,
            'towel_service_cost' => $estimated->towel_service_cost,
            'pool_opening_hours' => $estimated->pool_opening_hours,
            'has_infinity_pool' => $estimated->has_infinity_pool ?? false,
            'has_rooftop_pool' => $estimated->has_rooftop_pool ?? false,
            'is_adults_only' => $estimated->is_adults_only ?? false,
            'has_kids_pool' => $estimated->has_kids_pool ?? false,
            'kids_pool_depth_m' => $estimated->kids_pool_depth_m,
            'has_splash_park' => $estimated->has_splash_park ?? false,
            'has_waterslide' => $estimated->has_waterslide ?? false,
            'has_lifeguard' => $estimated->has_lifeguard ?? false,
            'lifeguard_hours' => $estimated->lifeguard_hours,
            'has_luxury_cabanas' => $estimated->has_luxury_cabanas ?? false,
            'has_cabana_service' => $estimated->has_cabana_service ?? false,
            'has_heated_pool' => $estimated->has_heated_pool ?? false,
            'has_jacuzzi' => $estimated->has_jacuzzi ?? false,
            'has_adult_sun_terrace' => $estimated->has_adult_sun_terrace ?? false,
            'cleanliness_rating' => $estimated->cleanliness_rating,
            'sunbed_condition_rating' => $estimated->sunbed_condition_rating,
            'tiling_condition_rating' => $estimated->tiling_condition_rating,
            'has_accessibility_ramp' => $estimated->has_accessibility_ramp ?? false,
            'has_pool_hoist' => $estimated->has_pool_hoist ?? false,
            'has_step_free_access' => $estimated->has_step_free_access ?? false,
            'has_elevator_to_rooftop' => $estimated->has_elevator_to_rooftop ?? false,
        ];
    }
}

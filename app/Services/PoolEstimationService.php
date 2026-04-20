<?php

namespace App\Services;

use App\Models\PoolCriteria;

class PoolEstimationService
{
    /**
     * Estimate pool criteria based on hotel star rating.
     * Returns a PoolCriteria model (not persisted) with estimated values.
     */
    public function estimate(float $starRating): PoolCriteria
    {
        $criteria = new PoolCriteria();

        if ($starRating >= 4.5) {
            $this->applyLuxuryEstimate($criteria);
        } elseif ($starRating >= 3.5) {
            $this->applyUpscaleEstimate($criteria);
        } elseif ($starRating >= 2.5) {
            $this->applyMidRangeEstimate($criteria);
        } else {
            $this->applyBudgetEstimate($criteria);
        }

        return $criteria;
    }

    /**
     * Build a virtual hotel array from an Agoda API result.
     * Matches the shape expected by frontend Hotel components.
     */
    public function buildVirtualHotel(array $agodaHotel, string $destinationName): array
    {
        $starRating = (float) ($agodaHotel['starRating'] ?? 3);
        $criteria = $this->estimate($starRating);

        $scoringService = app(HotelScoringService::class);
        $scores = $scoringService->computeScores($criteria);

        $hotelId = $agodaHotel['hotelId'] ?? $agodaHotel['propertyId'] ?? 0;
        $hotelName = $agodaHotel['hotelName'] ?? $agodaHotel['name'] ?? 'Unknown Hotel';

        return [
            'id' => "agoda_{$hotelId}",
            'agoda_hotel_id' => $hotelId,
            'name' => $hotelName,
            'slug' => "agoda-{$hotelId}",
            'address' => $agodaHotel['address'] ?? null,
            'star_rating' => $starRating,
            'overall_score' => $scores['overall_score'],
            'family_score' => $scores['family_friendly'],
            'quiet_score' => $scores['peace_quiet'],
            'party_score' => $scores['party_vibe'],
            'main_image_url' => preg_replace('/^http:/', 'https:', $agodaHotel['imageURL'] ?? $agodaHotel['imageUrl'] ?? $agodaHotel['image'] ?? ''),
            'destination' => ['name' => $destinationName],
            'pool_criteria' => $this->criteriaToArray($criteria),
            'landing_url' => $agodaHotel['landingURL'] ?? $agodaHotel['landingUrl'] ?? null,
            'price' => $agodaHotel['dailyRate'] ?? $agodaHotel['price'] ?? null,
            'crossed_out_price' => $agodaHotel['crossedOutRate'] ?? null,
            'currency' => $agodaHotel['currency'] ?? 'USD',
            'review_score' => $agodaHotel['reviewScore'] ?? null,
            'review_count' => $agodaHotel['reviewCount'] ?? null,
            'is_agoda' => true,
            'is_estimated' => true,
            'is_premium' => false,
            'is_active' => true,
            'owned_by' => null,
            'has_pending_claim' => false,
            'badges' => [],
            'owner' => null,
        ];
    }

    private function criteriaToArray(PoolCriteria $criteria): array
    {
        return [
            'sunbed_to_guest_ratio' => $criteria->sunbed_to_guest_ratio,
            'sun_exposure' => $criteria->sun_exposure,
            'pool_size_category' => $criteria->pool_size_category,
            'number_of_pools' => $criteria->number_of_pools,
            'atmosphere' => $criteria->atmosphere,
            'has_infinity_pool' => $criteria->has_infinity_pool ?? false,
            'has_kids_pool' => $criteria->has_kids_pool ?? false,
            'has_rooftop_pool' => $criteria->has_rooftop_pool ?? false,
            'is_adults_only' => $criteria->is_adults_only ?? false,
            'has_pool_bar' => $criteria->has_pool_bar ?? false,
            'has_waterslide' => $criteria->has_waterslide ?? false,
        ];
    }

    private function applyLuxuryEstimate(PoolCriteria $c): void
    {
        // 5-star resort: large pools, excellent facilities, high service
        $c->sunbed_count = rand(120, 200);
        $c->sunbed_to_guest_ratio = round(rand(75, 95) / 100, 2);
        $c->sun_exposure = $this->pick(['all_day', 'all_day', 'mostly_sunny']);
        $c->sunny_areas = $this->pickMultiple(['main_pool', 'rooftop', 'sun_terrace', 'garden', 'beach_deck'], 3, 5);
        $c->pool_size_category = $this->pick(['large', 'large', 'olympic']);
        $c->pool_size_sqm = rand(250, 600);
        $c->number_of_pools = rand(2, 4);
        $c->pool_types = $this->buildPoolTypes($c->number_of_pools, true);
        $c->atmosphere = $this->pick(['relaxed', 'quiet', 'quiet', 'relaxed']);
        $c->music_level = $this->pick(['low', 'none', 'low']);
        $c->has_entertainment = (bool) rand(0, 1);
        $c->entertainment_types = $c->has_entertainment ? $this->pickMultiple(['live_music', 'dj', 'pool_games', 'aqua_aerobics'], 1, 2) : [];

        $c->has_infinity_pool = (bool) rand(0, 1);
        $c->has_rooftop_pool = !$c->has_infinity_pool && (bool) rand(0, 1);
        // ~20% of luxury hotels are adults-only boutique resorts
        $c->is_adults_only = rand(1, 5) === 1;
        $c->has_kids_pool = !$c->is_adults_only;
        $c->kids_pool_depth_m = $c->has_kids_pool ? round(rand(30, 60) / 100, 2) : null;
        $c->has_pool_bar = true;
        $c->has_waiter_service = true;
        $c->has_heated_pool = (bool) rand(0, 1);
        $c->has_jacuzzi = true;
        $c->has_luxury_cabanas = true;
        $c->has_cabana_service = true;
        $c->has_lifeguard = true;
        $c->lifeguard_hours = $this->pick(['08:00-20:00', '09:00-19:00', '08:00-21:00']);
        $c->has_waterslide = !$c->is_adults_only && (bool) rand(0, 1);
        $c->has_splash_park = $c->has_waterslide && (bool) rand(0, 1);
        $c->has_adult_sun_terrace = true;
        // is_adults_only already set above

        $c->sunbed_types = $this->pickMultiple(['cushioned', 'balinese_beds', 'cabanas', 'double_loungers'], 2, 3);
        $c->shade_options = $this->pickMultiple(['umbrellas', 'pergolas', 'palm_trees', 'cabanas'], 2, 4);
        $c->towel_reservation_policy = $this->pick(['free_for_all', 'tolerated', 'free_for_all']);
        $c->towel_service_cost = 'included';
        $c->pool_opening_hours = $this->pick(['07:00-21:00', '08:00-20:00', '07:00-22:00']);
        $c->bar_distance = $this->pick(['poolside', 'close', 'poolside']);
        $c->toilet_distance = $this->pick(['close', 'adjacent', 'close']);

        $c->cleanliness_rating = round(rand(40, 50) / 10, 1);
        $c->sunbed_condition_rating = round(rand(40, 50) / 10, 1);
        $c->tiling_condition_rating = round(rand(40, 50) / 10, 1);

        $c->has_accessibility_ramp = true;
        $c->has_pool_hoist = (bool) rand(0, 1);
        $c->has_step_free_access = true;
        $c->has_elevator_to_rooftop = $c->has_rooftop_pool;
    }

    private function applyUpscaleEstimate(PoolCriteria $c): void
    {
        // 4-star hotel: good pools, solid facilities
        $c->sunbed_count = rand(60, 120);
        $c->sunbed_to_guest_ratio = round(rand(50, 70) / 100, 2);
        $c->sun_exposure = $this->pick(['all_day', 'mostly_sunny', 'all_day']);
        $c->sunny_areas = $this->pickMultiple(['main_pool', 'sun_terrace', 'garden'], 2, 3);
        $c->pool_size_category = $this->pick(['medium', 'large', 'medium']);
        $c->pool_size_sqm = rand(120, 300);
        $c->number_of_pools = rand(1, 3);
        $c->pool_types = $this->buildPoolTypes($c->number_of_pools, false);
        $c->atmosphere = $this->pick(['relaxed', 'family', 'quiet', 'relaxed']);
        $c->music_level = $this->pick(['low', 'moderate', 'low']);
        $c->has_entertainment = (bool) rand(0, 1);
        $c->entertainment_types = $c->has_entertainment ? $this->pickMultiple(['pool_games', 'aqua_aerobics', 'live_music'], 1, 2) : [];

        $c->has_infinity_pool = (bool) rand(0, 1);
        $c->has_rooftop_pool = !$c->has_infinity_pool && (bool) rand(0, 1);
        // ~15% of upscale hotels are adults-only
        $c->is_adults_only = rand(1, 7) === 1;
        $c->has_kids_pool = !$c->is_adults_only && (bool) rand(0, 1);
        $c->kids_pool_depth_m = $c->has_kids_pool ? round(rand(30, 50) / 100, 2) : null;
        $c->has_pool_bar = (bool) rand(0, 1);
        $c->has_waiter_service = $c->has_pool_bar && (bool) rand(0, 1);
        $c->has_heated_pool = (bool) rand(0, 1);
        $c->has_jacuzzi = (bool) rand(0, 1);
        $c->has_luxury_cabanas = (bool) rand(0, 1);
        $c->has_cabana_service = $c->has_luxury_cabanas;
        $c->has_lifeguard = (bool) rand(0, 1);
        $c->lifeguard_hours = $c->has_lifeguard ? $this->pick(['09:00-18:00', '10:00-18:00', '09:00-19:00']) : null;
        $c->has_waterslide = !$c->is_adults_only && (bool) rand(0, 1);
        $c->has_splash_park = false;
        $c->has_adult_sun_terrace = (bool) rand(0, 1);

        $c->sunbed_types = $this->pickMultiple(['cushioned', 'plastic_with_cushion', 'wooden'], 1, 2);
        $c->shade_options = $this->pickMultiple(['umbrellas', 'trees', 'pergolas'], 2, 3);
        $c->towel_reservation_policy = $this->pick(['free_for_all', 'tolerated', 'enforced']);
        $c->towel_service_cost = $this->pick(['included', 'included', 'deposit_required']);
        $c->pool_opening_hours = $this->pick(['08:00-20:00', '09:00-20:00', '08:00-19:00']);
        $c->bar_distance = $this->pick(['poolside', 'close', 'moderate']);
        $c->toilet_distance = $this->pick(['close', 'moderate', 'close']);

        $c->cleanliness_rating = round(rand(35, 45) / 10, 1);
        $c->sunbed_condition_rating = round(rand(30, 45) / 10, 1);
        $c->tiling_condition_rating = round(rand(35, 45) / 10, 1);

        $c->has_accessibility_ramp = (bool) rand(0, 1);
        $c->has_pool_hoist = false;
        $c->has_step_free_access = $c->has_accessibility_ramp;
        $c->has_elevator_to_rooftop = $c->has_rooftop_pool && (bool) rand(0, 1);
    }

    private function applyMidRangeEstimate(PoolCriteria $c): void
    {
        // 3-star hotel: basic pool, limited extras
        $c->sunbed_count = rand(30, 60);
        $c->sunbed_to_guest_ratio = round(rand(30, 50) / 100, 2);
        $c->sun_exposure = $this->pick(['mostly_sunny', 'afternoon_only', 'all_day']);
        $c->sunny_areas = $this->pickMultiple(['main_pool', 'garden'], 1, 2);
        $c->pool_size_category = $this->pick(['medium', 'small', 'medium']);
        $c->pool_size_sqm = rand(50, 150);
        $c->number_of_pools = rand(1, 2);
        $c->pool_types = $c->number_of_pools > 1 ? ['main', 'kids'] : ['main'];
        $c->atmosphere = $this->pick(['family', 'lively', 'relaxed', 'quiet']);
        $c->music_level = $this->pick(['moderate', 'low', 'moderate']);
        $c->has_entertainment = (bool) rand(0, 1);
        $c->entertainment_types = $c->has_entertainment ? ['pool_games'] : [];

        $c->has_infinity_pool = false;
        $c->has_rooftop_pool = false;
        // ~10% of mid-range hotels are adults-only
        $c->is_adults_only = rand(1, 10) === 1;
        $c->has_kids_pool = !$c->is_adults_only && $c->number_of_pools > 1;
        $c->kids_pool_depth_m = $c->has_kids_pool ? round(rand(25, 45) / 100, 2) : null;
        $c->has_pool_bar = (bool) rand(0, 1);
        $c->has_waiter_service = false;
        $c->has_heated_pool = false;
        $c->has_jacuzzi = (bool) rand(0, 1);
        $c->has_luxury_cabanas = false;
        $c->has_cabana_service = false;
        $c->has_lifeguard = (bool) rand(0, 1);
        $c->lifeguard_hours = $c->has_lifeguard ? $this->pick(['10:00-17:00', '10:00-18:00']) : null;
        $c->has_waterslide = false;
        $c->has_splash_park = false;
        $c->has_adult_sun_terrace = false;

        $c->sunbed_types = $this->pickMultiple(['plastic', 'plastic_with_cushion'], 1, 1);
        $c->shade_options = $this->pickMultiple(['umbrellas', 'trees'], 1, 2);
        $c->towel_reservation_policy = $this->pick(['tolerated', 'enforced', 'free_for_all']);
        $c->towel_service_cost = $this->pick(['deposit_required', 'deposit_required', 'included']);
        $c->pool_opening_hours = $this->pick(['09:00-19:00', '09:00-20:00', '10:00-19:00']);
        $c->bar_distance = $this->pick(['close', 'moderate', 'far']);
        $c->toilet_distance = $this->pick(['close', 'moderate']);

        $c->cleanliness_rating = round(rand(25, 38) / 10, 1);
        $c->sunbed_condition_rating = round(rand(25, 35) / 10, 1);
        $c->tiling_condition_rating = round(rand(25, 38) / 10, 1);

        $c->has_accessibility_ramp = (bool) rand(0, 1);
        $c->has_pool_hoist = false;
        $c->has_step_free_access = false;
        $c->has_elevator_to_rooftop = false;
    }

    private function applyBudgetEstimate(PoolCriteria $c): void
    {
        // 1-2 star hotel: basic or small pool, minimal facilities
        $c->sunbed_count = rand(10, 30);
        $c->sunbed_to_guest_ratio = round(rand(15, 35) / 100, 2);
        $c->sun_exposure = $this->pick(['partial_shade', 'afternoon_only', 'mostly_sunny']);
        $c->sunny_areas = ['main_pool'];
        $c->pool_size_category = $this->pick(['small', 'small', 'medium']);
        $c->pool_size_sqm = rand(20, 60);
        $c->number_of_pools = 1;
        $c->pool_types = ['main'];
        $c->atmosphere = $this->pick(['family', 'lively', 'family', 'quiet']);
        $c->music_level = $this->pick(['moderate', 'loud', 'moderate']);
        $c->has_entertainment = false;
        $c->entertainment_types = [];

        $c->has_infinity_pool = false;
        $c->has_rooftop_pool = false;
        // ~8% of budget hotels are adults-only (small boutique hostels)
        $c->is_adults_only = rand(1, 12) === 1;
        $c->has_kids_pool = false;
        $c->kids_pool_depth_m = null;
        $c->has_pool_bar = false;
        $c->has_waiter_service = false;
        $c->has_heated_pool = false;
        $c->has_jacuzzi = false;
        $c->has_luxury_cabanas = false;
        $c->has_cabana_service = false;
        $c->has_lifeguard = false;
        $c->lifeguard_hours = null;
        $c->has_waterslide = false;
        $c->has_splash_park = false;
        $c->has_adult_sun_terrace = false;

        $c->sunbed_types = ['plastic'];
        $c->shade_options = $this->pick([['umbrellas'], ['umbrellas', 'trees'], ['umbrellas']]);
        $c->towel_reservation_policy = $this->pick(['free_for_all', 'enforced', 'free_for_all']);
        $c->towel_service_cost = $this->pick(['extra_cost', 'extra_cost', 'deposit_required']);
        $c->pool_opening_hours = $this->pick(['09:00-19:00', '10:00-18:00', '09:00-18:00']);
        $c->bar_distance = $this->pick(['moderate', 'far', 'moderate']);
        $c->toilet_distance = $this->pick(['moderate', 'far']);

        $c->cleanliness_rating = round(rand(20, 30) / 10, 1);
        $c->sunbed_condition_rating = round(rand(18, 28) / 10, 1);
        $c->tiling_condition_rating = round(rand(20, 30) / 10, 1);

        $c->has_accessibility_ramp = false;
        $c->has_pool_hoist = false;
        $c->has_step_free_access = false;
        $c->has_elevator_to_rooftop = false;
    }

    /**
     * Pick a random item from an array.
     */
    private function pick(array $items): mixed
    {
        return $items[array_rand($items)];
    }

    /**
     * Pick a random subset from an array.
     */
    private function pickMultiple(array $items, int $min, int $max): array
    {
        $count = min(rand($min, $max), count($items));
        $keys = array_rand($items, $count);
        if (!is_array($keys)) $keys = [$keys];
        return array_values(array_intersect_key($items, array_flip($keys)));
    }

    /**
     * Build realistic pool type arrays based on count.
     */
    private function buildPoolTypes(int $count, bool $luxury): array
    {
        $types = ['main'];
        $extras = $luxury
            ? ['infinity', 'kids', 'rooftop', 'indoor', 'adults_only']
            : ['kids', 'indoor', 'plunge'];

        shuffle($extras);
        for ($i = 1; $i < $count && !empty($extras); $i++) {
            $types[] = array_shift($extras);
        }

        return $types;
    }
}

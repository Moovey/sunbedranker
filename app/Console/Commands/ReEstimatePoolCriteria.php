<?php

namespace App\Console\Commands;

use App\Models\Hotel;
use App\Models\PoolCriteria;
use App\Services\HotelScoringService;
use App\Services\PoolEstimationService;
use Illuminate\Console\Command;

class ReEstimatePoolCriteria extends Command
{
    protected $signature = 'hotels:re-estimate {--force : Skip confirmation}';
    protected $description = 'Re-run pool estimation on all hotels that have estimated (non-verified) pool criteria';

    public function handle(): int
    {
        $hotels = Hotel::with('poolCriteria')->whereHas('poolCriteria')->get();

        $this->info("Found {$hotels->count()} hotels with pool criteria.");

        if (!$this->option('force') && !$this->confirm('This will overwrite existing estimated pool criteria. Continue?')) {
            return 0;
        }

        $estimationService = app(PoolEstimationService::class);
        $scoringService = app(HotelScoringService::class);
        $updated = 0;

        foreach ($hotels as $hotel) {
            $starRating = (float) ($hotel->star_rating ?? 3);
            $estimated = $estimationService->estimate($starRating);

            $hotel->poolCriteria->update([
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
            ]);

            $scoringService->calculateAndUpdateScores($hotel->fresh());
            $updated++;
        }

        $this->info("Re-estimated pool criteria for {$updated} hotels.");

        // Show distribution summary
        $atmospheres = PoolCriteria::select('atmosphere')
            ->selectRaw('COUNT(*) as count')
            ->groupBy('atmosphere')
            ->pluck('count', 'atmosphere');
        $this->table(['Atmosphere', 'Count'], $atmospheres->map(fn($c, $a) => [$a, $c])->values());

        $adultsOnly = PoolCriteria::where('is_adults_only', true)->count();
        $this->info("Adults-only hotels: {$adultsOnly}");

        return 0;
    }
}

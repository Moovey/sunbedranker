<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pool_criteria', function (Blueprint $table) {
            // Add missing columns that the form is using
            $table->integer('sunbed_count')->nullable()->after('hotel_id');
            $table->json('sunbed_types')->nullable()->after('sunbed_quality');
            $table->json('sunny_areas')->nullable()->after('sun_exposure');
            $table->string('pool_size_category')->nullable()->after('total_pool_area_sqm');
            $table->decimal('pool_size_sqm', 8, 2)->nullable()->after('pool_size_category');
            $table->string('towel_reservation_policy')->nullable()->after('has_towel_reservation_policy');
            $table->string('towel_service_cost')->nullable()->after('towel_reservation_policy');
            $table->string('pool_opening_hours')->nullable()->after('towel_service_cost');
            $table->json('shade_options')->nullable()->after('has_shade_areas');
            $table->string('bar_distance')->nullable()->after('has_pool_bar');
            $table->string('toilet_distance')->nullable()->after('bar_distance');
            $table->string('music_level')->nullable()->after('music_volume');
            $table->boolean('has_entertainment')->default(false)->after('music_level');
            $table->json('entertainment_types')->nullable()->after('has_entertainment');
            $table->integer('cleanliness_rating')->nullable()->after('cleanliness_score');
            $table->integer('sunbed_condition_rating')->nullable()->after('cleanliness_rating');
            $table->integer('tiling_condition_rating')->nullable()->after('sunbed_condition_rating');
            $table->boolean('has_accessibility_ramp')->default(false)->after('wheelchair_accessible');
            $table->boolean('has_pool_hoist')->default(false)->after('has_accessibility_ramp');
            $table->boolean('has_step_free_access')->default(false)->after('has_pool_hoist');
            $table->boolean('has_elevator_to_rooftop')->default(false)->after('has_step_free_access');
            $table->boolean('has_waiter_service')->default(false)->after('has_pool_bar');
            $table->decimal('kids_pool_depth_m', 4, 2)->nullable()->after('has_kids_pool');
            $table->boolean('has_splash_park')->default(false)->after('kids_pool_depth_m');
            $table->boolean('has_waterslide')->default(false)->after('has_splash_park');
            $table->string('lifeguard_hours')->nullable()->after('has_lifeguard');
            $table->boolean('has_luxury_cabanas')->default(false)->after('lifeguard_hours');
            $table->boolean('has_cabana_service')->default(false)->after('has_luxury_cabanas');
            $table->boolean('has_jacuzzi')->default(false)->after('has_heated_pool');
            $table->boolean('has_adult_sun_terrace')->default(false)->after('has_jacuzzi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pool_criteria', function (Blueprint $table) {
            $table->dropColumn([
                'sunbed_count',
                'sunbed_types',
                'sunny_areas',
                'pool_size_category',
                'pool_size_sqm',
                'towel_reservation_policy',
                'towel_service_cost',
                'pool_opening_hours',
                'shade_options',
                'bar_distance',
                'toilet_distance',
                'music_level',
                'has_entertainment',
                'entertainment_types',
                'cleanliness_rating',
                'sunbed_condition_rating',
                'tiling_condition_rating',
                'has_accessibility_ramp',
                'has_pool_hoist',
                'has_step_free_access',
                'has_elevator_to_rooftop',
                'has_waiter_service',
                'kids_pool_depth_m',
                'has_splash_park',
                'has_waterslide',
                'lifeguard_hours',
                'has_luxury_cabanas',
                'has_cabana_service',
                'has_jacuzzi',
                'has_adult_sun_terrace',
            ]);
        });
    }
};

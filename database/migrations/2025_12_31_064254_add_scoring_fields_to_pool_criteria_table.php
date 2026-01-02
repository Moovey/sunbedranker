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
            // Add fields that don't exist in the original table
            // We'll use Schema::hasColumn to avoid duplicates
            
            if (!Schema::hasColumn('pool_criteria', 'sunbed_count')) {
                $table->integer('sunbed_count')->nullable();
            }
            
            if (!Schema::hasColumn('pool_criteria', 'sunbed_types')) {
                $table->json('sunbed_types')->nullable()->comment('standard,cushioned,cabanas,bali_beds');
            }
            
            if (!Schema::hasColumn('pool_criteria', 'pool_size_category')) {
                $table->enum('pool_size_category', ['small', 'medium', 'large', 'very_large'])->nullable();
            }
            
            if (!Schema::hasColumn('pool_criteria', 'has_waiter_service')) {
                $table->boolean('has_waiter_service')->default(false);
            }
            
            if (!Schema::hasColumn('pool_criteria', 'shade_options')) {
                $table->json('shade_options')->nullable()->comment('umbrellas,trees,canopies,pergolas');
            }
            
            if (!Schema::hasColumn('pool_criteria', 'cleanliness_rating')) {
                $table->integer('cleanliness_rating')->nullable()->comment('1-5');
            }
            
            if (!Schema::hasColumn('pool_criteria', 'sunbed_condition_rating')) {
                $table->integer('sunbed_condition_rating')->nullable()->comment('1-5');
            }
            
            if (!Schema::hasColumn('pool_criteria', 'tiling_condition_rating')) {
                $table->integer('tiling_condition_rating')->nullable()->comment('1-5');
            }
            
            if (!Schema::hasColumn('pool_criteria', 'has_accessibility_ramp')) {
                $table->boolean('has_accessibility_ramp')->default(false);
            }
            
            if (!Schema::hasColumn('pool_criteria', 'has_pool_hoist')) {
                $table->boolean('has_pool_hoist')->default(false);
            }
            
            if (!Schema::hasColumn('pool_criteria', 'has_step_free_access')) {
                $table->boolean('has_step_free_access')->default(false);
            }
            
            if (!Schema::hasColumn('pool_criteria', 'has_elevator_to_rooftop')) {
                $table->boolean('has_elevator_to_rooftop')->default(false);
            }
            
            if (!Schema::hasColumn('pool_criteria', 'has_splash_park')) {
                $table->boolean('has_splash_park')->default(false);
            }
            
            if (!Schema::hasColumn('pool_criteria', 'has_waterslide')) {
                $table->boolean('has_waterslide')->default(false);
            }
            
            if (!Schema::hasColumn('pool_criteria', 'has_luxury_cabanas')) {
                $table->boolean('has_luxury_cabanas')->default(false);
            }
            
            if (!Schema::hasColumn('pool_criteria', 'has_cabana_service')) {
                $table->boolean('has_cabana_service')->default(false);
            }
            
            if (!Schema::hasColumn('pool_criteria', 'has_jacuzzi')) {
                $table->boolean('has_jacuzzi')->default(false);
            }
            
            if (!Schema::hasColumn('pool_criteria', 'has_adult_sun_terrace')) {
                $table->boolean('has_adult_sun_terrace')->default(false);
            }
            
            if (!Schema::hasColumn('pool_criteria', 'music_level')) {
                $table->enum('music_level', ['none', 'low', 'moderate', 'loud', 'dj'])->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pool_criteria', function (Blueprint $table) {
            $columns = [
                'sunbed_count', 'sunbed_types', 'pool_size_category', 'has_waiter_service',
                'sunbed_condition_rating', 'tiling_condition_rating', 'has_accessibility_ramp',
                'has_pool_hoist', 'has_step_free_access', 'has_elevator_to_rooftop',
                'has_splash_park', 'has_waterslide', 'has_luxury_cabanas', 'has_cabana_service',
                'has_jacuzzi', 'has_adult_sun_terrace', 'music_level'
            ];
            
            foreach ($columns as $column) {
                if (Schema::hasColumn('pool_criteria', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};

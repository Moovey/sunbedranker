<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pool_criteria', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained()->cascadeOnDelete();
            
            // ============================================
            // 1. SUNBED-TO-GUEST RATIO
            // ============================================
            $table->integer('sunbed_count')->nullable()->comment('Total sunbeds available');
            $table->decimal('sunbed_to_guest_ratio', 4, 2)->nullable()->comment('Auto-calculated: sunbed_count / (total_rooms * 2)');
            
            // ============================================
            // 2. SUN EXPOSURE & ORIENTATION
            // ============================================
            $table->string('sun_exposure')->nullable()->comment('all_day|afternoon_only|morning_only|partial_shade|mostly_shaded');
            $table->json('sunny_areas')->nullable()->comment('Array: main_pool, kids_pool, quiet_area, rooftop, adult_pool, terrace');
            
            // ============================================
            // 3. POOL AREA SIZE & VARIETY
            // ============================================
            $table->decimal('pool_size_sqm', 8, 2)->nullable()->comment('Main pool size in square meters');
            $table->string('pool_size_category')->nullable()->comment('small|medium|large|very_large');
            $table->integer('number_of_pools')->default(1);
            $table->json('pool_types')->nullable()->comment('Array: infinity, kids, adult_only, indoor, rooftop, lagoon, heated, olympic');
            
            // Pool type boolean flags (derived from pool_types for quick filtering)
            $table->boolean('has_infinity_pool')->default(false);
            $table->boolean('has_rooftop_pool')->default(false);
            $table->boolean('has_heated_pool')->default(false);
            $table->boolean('has_kids_pool')->default(false);
            
            // ============================================
            // 4. TOWEL & RESERVATION POLICY
            // ============================================
            $table->string('towel_reservation_policy')->nullable()->comment('enforced|tolerated|free_for_all');
            $table->string('towel_service_cost')->nullable()->comment('included|extra_cost|deposit_required');
            $table->string('pool_opening_hours')->nullable()->comment('e.g. 07:00-22:00');
            
            // ============================================
            // 5. POOL FACILITIES & COMFORT
            // ============================================
            $table->json('sunbed_types')->nullable()->comment('Array: plastic, cushioned, cabanas, bali_beds');
            $table->json('shade_options')->nullable()->comment('Array: umbrellas, pergolas, cabanas, natural_trees');
            $table->boolean('has_pool_bar')->default(false);
            $table->boolean('has_waiter_service')->default(false);
            $table->string('bar_distance')->nullable()->comment('poolside|close|moderate|far');
            $table->string('toilet_distance')->nullable()->comment('adjacent|close|moderate|far');
            
            // ============================================
            // 6. NOISE & ATMOSPHERE
            // ============================================
            $table->string('atmosphere')->nullable()->comment('quiet|relaxed|family|lively|party');
            $table->string('music_level')->nullable()->comment('none|low|moderate|loud|dj');
            $table->boolean('has_entertainment')->default(false);
            $table->json('entertainment_types')->nullable()->comment('Array: aqua_gym, games, animation_team, live_music');
            $table->boolean('is_adults_only')->default(false);
            
            // ============================================
            // 7. CLEANLINESS & MAINTENANCE (0-5 ratings)
            // ============================================
            $table->decimal('cleanliness_rating', 3, 1)->nullable()->comment('0-5: Pool cleanliness');
            $table->decimal('sunbed_condition_rating', 3, 1)->nullable()->comment('0-5: Sunbed condition');
            $table->decimal('tiling_condition_rating', 3, 1)->nullable()->comment('0-5: Tiling/grounds condition');
            
            // ============================================
            // 8. ACCESSIBILITY FEATURES
            // ============================================
            $table->boolean('has_accessibility_ramp')->default(false);
            $table->boolean('has_pool_hoist')->default(false);
            $table->boolean('has_step_free_access')->default(false);
            $table->boolean('has_elevator_to_rooftop')->default(false);
            
            // ============================================
            // 9. KIDS & FAMILY FACILITIES
            // ============================================
            // has_kids_pool already defined above
            $table->decimal('kids_pool_depth_m', 3, 2)->nullable()->comment('Depth in meters, max 2m');
            $table->boolean('has_splash_park')->default(false);
            $table->boolean('has_waterslide')->default(false);
            $table->boolean('has_lifeguard')->default(false);
            $table->string('lifeguard_hours')->nullable()->comment('e.g. 09:00-18:00');
            
            // ============================================
            // 10. EXTRAS & LUXURY TOUCHES
            // ============================================
            $table->boolean('has_luxury_cabanas')->default(false);
            $table->boolean('has_cabana_service')->default(false);
            // has_heated_pool already defined above
            $table->boolean('has_jacuzzi')->default(false);
            $table->boolean('has_adult_sun_terrace')->default(false);
            
            // ============================================
            // DATA SOURCE & VERIFICATION
            // ============================================
            $table->enum('data_source', ['admin', 'hotelier', 'user', 'verified'])->default('admin');
            $table->boolean('is_verified')->default(false);
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users');
            
            $table->timestamps();

            // Indexes for common queries
            $table->index('hotel_id');
            $table->index('sunbed_to_guest_ratio');
            $table->index('sun_exposure');
            $table->index('atmosphere');
            $table->index('is_adults_only');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pool_criteria');
    }
};

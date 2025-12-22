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
            
            // Sunbed & Capacity
            $table->integer('total_sunbeds')->nullable();
            $table->integer('total_guests')->nullable();
            $table->decimal('sunbed_to_guest_ratio', 4, 2)->nullable()->comment('Calculated: sunbeds/guests');
            $table->boolean('has_towel_reservation_policy')->default(false);
            $table->string('sunbed_quality')->nullable()->comment('basic|standard|premium');
            
            // Pool Details
            $table->integer('number_of_pools')->default(1);
            $table->string('pool_types')->nullable()->comment('main,kids,rooftop,infinity,heated');
            $table->decimal('total_pool_area_sqm', 8, 2)->nullable();
            $table->boolean('has_infinity_pool')->default(false);
            $table->boolean('has_rooftop_pool')->default(false);
            $table->boolean('has_heated_pool')->default(false);
            $table->boolean('has_kids_pool')->default(false);
            $table->boolean('has_lazy_river')->default(false);
            $table->boolean('has_pool_bar')->default(false);
            
            // Sun Exposure
            $table->string('sun_exposure')->nullable()->comment('all_day|morning|afternoon|limited');
            $table->boolean('has_shade_areas')->default(false);
            $table->time('sun_from')->nullable();
            $table->time('sun_until')->nullable();
            
            // Atmosphere & Rules
            $table->string('atmosphere')->nullable()->comment('quiet|lively|family|party|mixed');
            $table->boolean('is_adults_only')->default(false);
            $table->boolean('has_music')->default(false);
            $table->string('music_volume')->nullable()->comment('none|low|medium|loud');
            $table->boolean('allows_food_drinks')->default(true);
            
            // Quality & Maintenance
            $table->integer('cleanliness_score')->nullable()->comment('1-5');
            $table->integer('maintenance_score')->nullable()->comment('1-5');
            $table->string('water_quality')->nullable()->comment('excellent|good|average|poor');
            
            // Accessibility & Family
            $table->boolean('has_lifeguard')->default(false);
            $table->boolean('wheelchair_accessible')->default(false);
            $table->boolean('has_changing_facilities')->default(false);
            $table->boolean('has_pool_toys')->default(false);
            $table->boolean('has_kids_activities')->default(false);
            
            // Additional Info
            $table->text('special_features')->nullable();
            $table->text('restrictions')->nullable();
            $table->time('opening_time')->nullable();
            $table->time('closing_time')->nullable();
            $table->string('seasonal_availability')->nullable();
            
            // Data Source & Quality
            $table->enum('data_source', ['admin', 'hotelier', 'user', 'verified'])->default('admin');
            $table->boolean('is_verified')->default(false);
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users');
            
            $table->timestamps();

            $table->index('hotel_id');
            $table->index('sunbed_to_guest_ratio');
            $table->index('atmosphere');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pool_criteria');
    }
};

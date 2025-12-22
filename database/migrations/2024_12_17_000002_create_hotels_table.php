<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destination_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('address')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->integer('star_rating')->nullable();
            $table->integer('total_rooms')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            
            // External API data
            $table->string('external_api_id')->nullable();
            $table->string('external_api_source')->nullable();
            $table->json('external_data')->nullable();
            
            // Images
            $table->string('main_image')->nullable();
            $table->json('images')->nullable();
            
            // Affiliate & Booking
            $table->string('booking_affiliate_url')->nullable();
            $table->string('expedia_affiliate_url')->nullable();
            $table->string('direct_booking_url')->nullable();
            
            // Status & Featured
            $table->boolean('is_active')->default(true);
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->enum('subscription_tier', ['free', 'enhanced', 'premium'])->default('free');
            $table->timestamp('subscription_expires_at')->nullable();
            
            // Scores (cached)
            $table->decimal('overall_score', 3, 1)->nullable();
            $table->decimal('family_score', 3, 1)->nullable();
            $table->decimal('quiet_score', 3, 1)->nullable();
            $table->decimal('party_score', 3, 1)->nullable();
            
            // Stats
            $table->integer('view_count')->default(0);
            $table->integer('click_count')->default(0);
            $table->decimal('average_rating', 2, 1)->nullable();
            $table->integer('review_count')->default(0);
            
            $table->timestamps();
            $table->softDeletes();

            $table->index('slug');
            $table->index('destination_id');
            $table->index(['is_active', 'overall_score']);
            $table->index('subscription_tier');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};

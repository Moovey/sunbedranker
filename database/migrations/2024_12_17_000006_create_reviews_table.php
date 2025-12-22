<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title')->nullable();
            $table->text('content');
            
            // Ratings (1-5)
            $table->integer('overall_rating');
            $table->integer('sunbed_rating')->nullable();
            $table->integer('pool_rating')->nullable();
            $table->integer('cleanliness_rating')->nullable();
            $table->integer('atmosphere_rating')->nullable();
            
            // Visit Info
            $table->date('visit_date')->nullable();
            $table->string('travel_type')->nullable()->comment('family|couple|solo|friends');
            
            // Moderation
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->boolean('is_verified_stay')->default(false);
            $table->foreignId('moderated_by')->nullable()->constrained('users');
            $table->timestamp('moderated_at')->nullable();
            
            // Engagement
            $table->integer('helpful_count')->default(0);
            $table->integer('not_helpful_count')->default(0);
            
            $table->timestamps();
            $table->softDeletes();

            $table->index('hotel_id');
            $table->index(['status', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};

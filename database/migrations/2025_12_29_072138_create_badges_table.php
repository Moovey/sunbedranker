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
        Schema::create('badges', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->string('color')->default('#3B82F6'); // Tailwind blue-500
            $table->json('criteria'); // Stores the rules: {"sunbed_ratio": ">0.5", "sun_exposure": ">80"}
            $table->integer('priority')->default(0); // Higher priority badges show first
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
        
        // Pivot table for hotel badges
        Schema::create('badge_hotel', function (Blueprint $table) {
            $table->foreignId('badge_id')->constrained()->onDelete('cascade');
            $table->foreignId('hotel_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->primary(['badge_id', 'hotel_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('badge_hotel');
        Schema::dropIfExists('badges');
    }
};

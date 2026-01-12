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
        Schema::table('hotels', function (Blueprint $table) {
            // Promotional banners & special offers
            $table->string('promotional_banner')->nullable();
            $table->text('special_offer')->nullable();
            $table->date('special_offer_expires_at')->nullable();
            
            // Videos and 360° content
            $table->string('video_url')->nullable();
            $table->string('video_360_url')->nullable();
            
            // Verified by Hotel badge toggle
            $table->boolean('show_verified_badge')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn([
                'promotional_banner',
                'special_offer',
                'special_offer_expires_at',
                'video_url',
                'video_360_url',
                'show_verified_badge',
            ]);
        });
    }
};

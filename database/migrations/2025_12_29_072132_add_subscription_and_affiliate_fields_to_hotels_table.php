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
            // Affiliate tracking (additional to existing fields)
            $table->string('affiliate_provider')->nullable()->after('direct_booking_url'); // e.g., 'booking.com', 'expedia'
            $table->string('affiliate_tracking_code')->nullable()->after('affiliate_provider');
            $table->decimal('affiliate_revenue', 10, 2)->default(0)->after('click_count');
            
            // Override flags
            $table->boolean('override_name')->default(false)->after('name');
            $table->boolean('override_images')->default(false)->after('images');
            $table->boolean('override_description')->default(false)->after('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn([
                'affiliate_provider',
                'affiliate_tracking_code',
                'affiliate_revenue',
                'override_name',
                'override_images',
                'override_description'
            ]);
        });
    }
};

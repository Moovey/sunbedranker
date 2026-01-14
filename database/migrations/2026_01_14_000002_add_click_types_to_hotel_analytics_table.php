<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hotel_analytics', function (Blueprint $table) {
            $table->integer('affiliate_clicks')->default(0)->after('clicks');
            $table->integer('direct_clicks')->default(0)->after('affiliate_clicks');
        });

        // Also add to hotels table for all-time tracking
        Schema::table('hotels', function (Blueprint $table) {
            $table->integer('affiliate_click_count')->default(0)->after('click_count');
            $table->integer('direct_click_count')->default(0)->after('affiliate_click_count');
        });
    }

    public function down(): void
    {
        Schema::table('hotel_analytics', function (Blueprint $table) {
            $table->dropColumn(['affiliate_clicks', 'direct_clicks']);
        });

        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn(['affiliate_click_count', 'direct_click_count']);
        });
    }
};

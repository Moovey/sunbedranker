<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Add FULLTEXT index on hotels name and address for fast search
        Schema::table('hotels', function (Blueprint $table) {
            $table->fullText(['name', 'address'], 'hotels_name_address_fulltext');
        });

        // Add FULLTEXT index on destinations name, country, and region for fast search
        Schema::table('destinations', function (Blueprint $table) {
            $table->fullText(['name', 'country', 'region'], 'destinations_name_country_region_fulltext');
        });

        // Add index on subscriptions for the premium join
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->index(['user_id', 'status', 'ends_at'], 'subscriptions_user_status_ends_idx');
        });
    }

    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropFullText('hotels_name_address_fulltext');
        });

        Schema::table('destinations', function (Blueprint $table) {
            $table->dropFullText('destinations_name_country_region_fulltext');
        });

        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropIndex('subscriptions_user_status_ends_idx');
        });
    }
};

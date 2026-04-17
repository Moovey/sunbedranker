<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('agoda_hotels', function (Blueprint $table) {
            // Composite index for the default listing: ORDER BY hotel_name with common filters
            $table->index(['countryisocode', 'star_rating', 'accommodation_type', 'hotel_name'], 'idx_directory_browse');

            // Composite index for country filter + sort
            $table->index(['countryisocode', 'hotel_name'], 'idx_country_name');

            // Composite index for star_rating filter + sort
            $table->index(['star_rating', 'hotel_name'], 'idx_star_name');

            // Composite index for accommodation_type filter + sort
            $table->index(['accommodation_type', 'hotel_name'], 'idx_type_name');

            // Index for hotel_name sort (default unfiltered listing)
            $table->index('hotel_name', 'idx_hotel_name');
        });
    }

    public function down(): void
    {
        Schema::table('agoda_hotels', function (Blueprint $table) {
            $table->dropIndex('idx_directory_browse');
            $table->dropIndex('idx_country_name');
            $table->dropIndex('idx_star_name');
            $table->dropIndex('idx_type_name');
            $table->dropIndex('idx_hotel_name');
        });
    }
};

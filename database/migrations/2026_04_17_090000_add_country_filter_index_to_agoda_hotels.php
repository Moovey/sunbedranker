<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('agoda_hotels', function (Blueprint $table) {
            // Covering index for DISTINCT country queries (filter dropdown)
            $table->index(['countryisocode', 'country'], 'idx_country_filter');
        });
    }

    public function down(): void
    {
        Schema::table('agoda_hotels', function (Blueprint $table) {
            $table->dropIndex('idx_country_filter');
        });
    }
};

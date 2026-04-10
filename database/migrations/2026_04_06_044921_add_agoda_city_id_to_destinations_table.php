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
        if (!Schema::hasColumn('destinations', 'agoda_city_id')) {
            Schema::table('destinations', function (Blueprint $table) {
                $table->unsignedInteger('agoda_city_id')->nullable()->after('is_auto_created');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('destinations', function (Blueprint $table) {
            $table->dropColumn('agoda_city_id');
        });
    }
};

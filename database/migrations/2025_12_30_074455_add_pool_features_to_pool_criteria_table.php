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
        Schema::table('pool_criteria', function (Blueprint $table) {
            $table->json('pool_overview')->nullable()->after('is_verified');
            $table->json('pool_details')->nullable()->after('pool_overview');
            $table->json('shade_options')->nullable()->after('pool_details');
            $table->json('special_features_list')->nullable()->after('shade_options');
            $table->json('atmosphere_vibe')->nullable()->after('special_features_list');
            $table->json('family_features')->nullable()->after('atmosphere_vibe');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pool_criteria', function (Blueprint $table) {
            $table->dropColumn([
                'pool_overview',
                'pool_details',
                'shade_options',
                'special_features_list',
                'atmosphere_vibe',
                'family_features'
            ]);
        });
    }
};

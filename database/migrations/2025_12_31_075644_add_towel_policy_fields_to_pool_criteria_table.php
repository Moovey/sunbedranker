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
            $table->string('towel_reservation_policy')->nullable()->after('pool_types');
            $table->string('towel_service_cost')->nullable()->after('towel_reservation_policy');
            $table->string('pool_opening_hours')->nullable()->after('towel_service_cost');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pool_criteria', function (Blueprint $table) {
            $table->dropColumn(['towel_reservation_policy', 'towel_service_cost', 'pool_opening_hours']);
        });
    }
};

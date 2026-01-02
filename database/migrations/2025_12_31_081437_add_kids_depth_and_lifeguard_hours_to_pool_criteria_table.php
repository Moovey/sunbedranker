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
            $table->decimal('kids_pool_depth_m', 4, 2)->nullable()->after('has_kids_pool');
            $table->string('lifeguard_hours')->nullable()->after('has_lifeguard');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pool_criteria', function (Blueprint $table) {
            $table->dropColumn(['kids_pool_depth_m', 'lifeguard_hours']);
        });
    }
};

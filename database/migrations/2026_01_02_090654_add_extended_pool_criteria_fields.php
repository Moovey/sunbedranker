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
            // Add pool_size_sqm (alternative to total_pool_area_sqm)
            $table->decimal('pool_size_sqm', 8, 2)->nullable()->after('total_pool_area_sqm');
            
            // Add pool_size_category
            $table->string('pool_size_category')->nullable()->after('pool_size_sqm');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pool_criteria', function (Blueprint $table) {
            $table->dropColumn(['pool_size_sqm', 'pool_size_category']);
        });
    }
};

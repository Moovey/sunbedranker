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
        Schema::table('scoring_weights', function (Blueprint $table) {
            $table->boolean('is_visible')->default(true)->after('is_active')
                ->comment('Whether this metric is visible on hotel pages');
            $table->boolean('is_public')->default(true)->after('is_visible')
                ->comment('Whether this metric is shown in public rankings');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('scoring_weights', function (Blueprint $table) {
            $table->dropColumn(['is_visible', 'is_public']);
        });
    }
};

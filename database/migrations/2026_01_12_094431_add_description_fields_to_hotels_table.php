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
        Schema::table('hotels', function (Blueprint $table) {
            // Hotelier-editable description fields
            $table->text('pool_description')->nullable()->after('description');
            $table->text('amenities_description')->nullable()->after('pool_description');
            $table->text('house_rules')->nullable()->after('amenities_description');
            $table->text('towel_policy')->nullable()->after('house_rules');
            $table->json('faqs')->nullable()->after('towel_policy');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn([
                'pool_description',
                'amenities_description', 
                'house_rules',
                'towel_policy',
                'faqs',
            ]);
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->text('ai_description')->nullable()->after('description');
            $table->string('ai_meta_title', 255)->nullable()->after('ai_description');
            $table->string('ai_meta_description', 320)->nullable()->after('ai_meta_title');
            // [{title, body}, ...]
            $table->json('ai_h2_sections')->nullable()->after('ai_meta_description');
            // Hotel ids in same destination chosen for internal linking.
            $table->json('ai_related_hotel_ids')->nullable()->after('ai_h2_sections');
            $table->timestamp('ai_generated_at')->nullable()->after('ai_related_hotel_ids');
            $table->string('ai_model_used', 60)->nullable()->after('ai_generated_at');
        });

        Schema::table('destinations', function (Blueprint $table) {
            $table->text('ai_description')->nullable()->after('description');
            $table->string('ai_meta_title', 255)->nullable()->after('ai_description');
            $table->string('ai_meta_description', 320)->nullable()->after('ai_meta_title');
            $table->json('ai_h2_sections')->nullable()->after('ai_meta_description');
            $table->timestamp('ai_generated_at')->nullable()->after('ai_h2_sections');
            $table->string('ai_model_used', 60)->nullable()->after('ai_generated_at');
        });
    }

    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn([
                'ai_description', 'ai_meta_title', 'ai_meta_description',
                'ai_h2_sections', 'ai_related_hotel_ids',
                'ai_generated_at', 'ai_model_used',
            ]);
        });

        Schema::table('destinations', function (Blueprint $table) {
            $table->dropColumn([
                'ai_description', 'ai_meta_title', 'ai_meta_description',
                'ai_h2_sections', 'ai_generated_at', 'ai_model_used',
            ]);
        });
    }
};

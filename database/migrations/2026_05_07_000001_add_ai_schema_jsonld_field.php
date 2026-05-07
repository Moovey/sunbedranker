<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->json('ai_schema_jsonld')->nullable()->after('ai_h2_sections');
        });

        Schema::table('destinations', function (Blueprint $table) {
            $table->json('ai_schema_jsonld')->nullable()->after('ai_h2_sections');
        });
    }

    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn('ai_schema_jsonld');
        });

        Schema::table('destinations', function (Blueprint $table) {
            $table->dropColumn('ai_schema_jsonld');
        });
    }
};

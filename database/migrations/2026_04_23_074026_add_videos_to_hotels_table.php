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
            // JSON array of video entries. Each entry is a string that is
            // either an external URL (YouTube, TikTok, Vimeo, ...) or a
            // storage path on the public_uploads disk (e.g. "hotels/videos/xyz.mp4").
            $table->json('videos')->nullable()->after('video_360_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn('videos');
        });
    }
};

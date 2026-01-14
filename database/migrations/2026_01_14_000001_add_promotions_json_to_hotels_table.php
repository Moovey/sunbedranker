<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * Adds a `promotions` JSON column to support multiple active promotions
     * for Premium plan subscribers.
     */
    public function up(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->json('promotions')->nullable()->after('show_verified_badge');
        });

        // Migrate existing single promotion data to the new JSON array format
        DB::table('hotels')
            ->whereNotNull('promotional_banner')
            ->orWhereNotNull('special_offer')
            ->orderBy('id')
            ->chunk(100, function ($hotels) {
                foreach ($hotels as $hotel) {
                    if ($hotel->promotional_banner || $hotel->special_offer) {
                        $promotions = [[
                            'promotional_banner' => $hotel->promotional_banner,
                            'special_offer' => $hotel->special_offer,
                            'special_offer_expires_at' => $hotel->special_offer_expires_at,
                        ]];
                        
                        DB::table('hotels')
                            ->where('id', $hotel->id)
                            ->update(['promotions' => json_encode($promotions)]);
                    }
                }
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Migrate the first promotion back to the single fields before dropping
        DB::table('hotels')
            ->whereNotNull('promotions')
            ->orderBy('id')
            ->chunk(100, function ($hotels) {
                foreach ($hotels as $hotel) {
                    $promotions = json_decode($hotel->promotions, true);
                    if (!empty($promotions[0])) {
                        DB::table('hotels')
                            ->where('id', $hotel->id)
                            ->update([
                                'promotional_banner' => $promotions[0]['promotional_banner'] ?? null,
                                'special_offer' => $promotions[0]['special_offer'] ?? null,
                                'special_offer_expires_at' => $promotions[0]['special_offer_expires_at'] ?? null,
                            ]);
                    }
                }
            });

        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn('promotions');
        });
    }
};

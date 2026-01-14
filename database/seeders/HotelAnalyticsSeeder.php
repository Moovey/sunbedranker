<?php

namespace Database\Seeders;

use App\Models\Hotel;
use App\Models\HotelAnalytic;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class HotelAnalyticsSeeder extends Seeder
{
    /**
     * Seed sample analytics data for all hotels.
     */
    public function run(): void
    {
        $hotels = Hotel::all();

        foreach ($hotels as $hotel) {
            $this->seedAnalyticsForHotel($hotel);
        }

        $this->command->info('Hotel analytics data seeded successfully!');
    }

    /**
     * Generate 30 days of sample analytics for a hotel.
     */
    private function seedAnalyticsForHotel(Hotel $hotel): void
    {
        $totalViews = 0;
        $totalClicks = 0;
        $totalAffiliateClicks = 0;
        $totalDirectClicks = 0;

        // Generate data for the last 30 days
        for ($i = 29; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->toDateString();
            
            // Random views between 5-50 per day (more realistic)
            $views = rand(5, 50);
            
            // Clicks are typically 5-15% of views
            $clicks = (int) ($views * (rand(5, 15) / 100));
            
            // Split clicks between affiliate and direct (70/30 ratio typically)
            $affiliateClicks = (int) ($clicks * 0.7);
            $directClicks = $clicks - $affiliateClicks;

            HotelAnalytic::updateOrCreate(
                [
                    'hotel_id' => $hotel->id,
                    'date' => $date,
                ],
                [
                    'views' => $views,
                    'clicks' => $clicks,
                    'affiliate_clicks' => $affiliateClicks,
                    'direct_clicks' => $directClicks,
                    'comparisons' => rand(0, 5),
                ]
            );

            $totalViews += $views;
            $totalClicks += $clicks;
            $totalAffiliateClicks += $affiliateClicks;
            $totalDirectClicks += $directClicks;
        }

        // Update hotel totals
        $hotel->update([
            'view_count' => $totalViews,
            'click_count' => $totalClicks,
            'affiliate_click_count' => $totalAffiliateClicks,
            'direct_click_count' => $totalDirectClicks,
        ]);
    }
}

<?php

namespace App\Observers;

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Hotelier\HotelierDashboardController;
use App\Http\Controllers\Hotelier\HotelManagementController;
use App\Models\Hotel;

class HotelObserver
{
    /**
     * Handle the Hotel "created" event.
     */
    public function created(Hotel $hotel): void
    {
        AdminDashboardController::clearHotelCaches();
        HomeController::clearHomeCache();
    }

    /**
     * Handle the Hotel "updated" event.
     */
    public function updated(Hotel $hotel): void
    {
        // Clear hotelier analytics cache if analytics-related fields changed
        $analyticsFields = ['view_count', 'click_count', 'affiliate_click_count', 'direct_click_count'];
        if ($hotel->wasChanged($analyticsFields)) {
            HotelManagementController::clearAnalyticsCache($hotel->id);
        }

        // Clear hotelier dashboard cache if score changed
        if ($hotel->wasChanged(['overall_score', 'family_score', 'quiet_score', 'party_score'])) {
            HotelierDashboardController::clearCacheForHotel($hotel->id);
            HomeController::clearHomeCache(); // Scores affect homepage rankings
        }

        // Only clear admin cache if relevant fields changed
        $relevantFields = [
            'is_active',
            'subscription_tier',
            'click_count',
            'affiliate_revenue',
            'destination_id',
        ];

        if ($hotel->wasChanged($relevantFields)) {
            AdminDashboardController::clearHotelCaches();
            HomeController::clearHomeCache();
        }
    }

    /**
     * Handle the Hotel "deleted" event.
     */
    public function deleted(Hotel $hotel): void
    {
        AdminDashboardController::clearHotelCaches();
        HotelManagementController::clearAnalyticsCache($hotel->id);
        HomeController::clearHomeCache();
    }

    /**
     * Handle the Hotel "restored" event.
     */
    public function restored(Hotel $hotel): void
    {
        AdminDashboardController::clearHotelCaches();
        HomeController::clearHomeCache();
    }

    /**
     * Handle the Hotel "force deleted" event.
     */
    public function forceDeleted(Hotel $hotel): void
    {
        AdminDashboardController::clearHotelCaches();
        HomeController::clearHomeCache();
    }
}

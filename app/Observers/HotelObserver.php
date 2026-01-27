<?php

namespace App\Observers;

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Models\Hotel;

class HotelObserver
{
    /**
     * Handle the Hotel "created" event.
     */
    public function created(Hotel $hotel): void
    {
        AdminDashboardController::clearHotelCaches();
    }

    /**
     * Handle the Hotel "updated" event.
     */
    public function updated(Hotel $hotel): void
    {
        // Only clear cache if relevant fields changed
        $relevantFields = [
            'is_active',
            'subscription_tier',
            'click_count',
            'affiliate_revenue',
            'destination_id',
        ];

        if ($hotel->wasChanged($relevantFields)) {
            AdminDashboardController::clearHotelCaches();
        }
    }

    /**
     * Handle the Hotel "deleted" event.
     */
    public function deleted(Hotel $hotel): void
    {
        AdminDashboardController::clearHotelCaches();
    }

    /**
     * Handle the Hotel "restored" event.
     */
    public function restored(Hotel $hotel): void
    {
        AdminDashboardController::clearHotelCaches();
    }

    /**
     * Handle the Hotel "force deleted" event.
     */
    public function forceDeleted(Hotel $hotel): void
    {
        AdminDashboardController::clearHotelCaches();
    }
}

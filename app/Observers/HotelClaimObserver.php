<?php

namespace App\Observers;

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Hotelier\HotelierDashboardController;
use App\Models\HotelClaim;

class HotelClaimObserver
{
    /**
     * Handle the HotelClaim "created" event.
     */
    public function created(HotelClaim $claim): void
    {
        AdminDashboardController::clearClaimCaches();
        HotelierDashboardController::clearCacheForUser($claim->user_id);
    }

    /**
     * Handle the HotelClaim "updated" event.
     */
    public function updated(HotelClaim $claim): void
    {
        // Clear hotelier cache when claim status changes
        HotelierDashboardController::clearCacheForUser($claim->user_id);
        
        // Only clear admin cache if status changed (affects pending/approved counts)
        if ($claim->wasChanged('status')) {
            AdminDashboardController::clearClaimCaches();
        }
    }

    /**
     * Handle the HotelClaim "deleted" event.
     */
    public function deleted(HotelClaim $claim): void
    {
        AdminDashboardController::clearClaimCaches();
        HotelierDashboardController::clearCacheForUser($claim->user_id);
    }
}

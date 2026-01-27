<?php

namespace App\Observers;

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Hotelier\HotelierDashboardController;
use App\Models\Review;

class ReviewObserver
{
    /**
     * Handle the Review "created" event.
     */
    public function created(Review $review): void
    {
        AdminDashboardController::clearReviewCaches();
        HotelierDashboardController::clearCacheForHotel($review->hotel_id);
    }

    /**
     * Handle the Review "updated" event.
     */
    public function updated(Review $review): void
    {
        // Only clear cache if status changed (affects pending count)
        if ($review->wasChanged('status')) {
            AdminDashboardController::clearReviewCaches();
        }
        HotelierDashboardController::clearCacheForHotel($review->hotel_id);
    }

    /**
     * Handle the Review "deleted" event.
     */
    public function deleted(Review $review): void
    {
        AdminDashboardController::clearReviewCaches();
        HotelierDashboardController::clearCacheForHotel($review->hotel_id);
    }

    /**
     * Handle the Review "restored" event.
     */
    public function restored(Review $review): void
    {
        AdminDashboardController::clearReviewCaches();
        HotelierDashboardController::clearCacheForHotel($review->hotel_id);
    }

    /**
     * Handle the Review "force deleted" event.
     */
    public function forceDeleted(Review $review): void
    {
        AdminDashboardController::clearReviewCaches();
    }
}

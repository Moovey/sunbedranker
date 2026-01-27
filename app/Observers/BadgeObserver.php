<?php

namespace App\Observers;

use App\Http\Controllers\Admin\ScoringSettingsController;
use App\Models\Badge;

class BadgeObserver
{
    /**
     * Handle the Badge "created" event.
     */
    public function created(Badge $badge): void
    {
        ScoringSettingsController::clearStatsCache();
    }

    /**
     * Handle the Badge "updated" event.
     */
    public function updated(Badge $badge): void
    {
        ScoringSettingsController::clearStatsCache();
    }

    /**
     * Handle the Badge "deleted" event.
     */
    public function deleted(Badge $badge): void
    {
        ScoringSettingsController::clearStatsCache();
    }
}

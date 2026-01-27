<?php

namespace App\Observers;

use App\Http\Controllers\Admin\ScoringSettingsController;
use App\Models\ScoringWeight;

class ScoringWeightObserver
{
    /**
     * Handle the ScoringWeight "created" event.
     */
    public function created(ScoringWeight $scoringWeight): void
    {
        ScoringSettingsController::clearStatsCache();
    }

    /**
     * Handle the ScoringWeight "updated" event.
     */
    public function updated(ScoringWeight $scoringWeight): void
    {
        ScoringSettingsController::clearStatsCache();
    }

    /**
     * Handle the ScoringWeight "deleted" event.
     */
    public function deleted(ScoringWeight $scoringWeight): void
    {
        ScoringSettingsController::clearStatsCache();
    }
}

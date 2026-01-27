<?php

namespace App\Observers;

use App\Http\Controllers\Admin\ContentManagementController;
use App\Models\Post;

class PostObserver
{
    /**
     * Handle the Post "created" event.
     */
    public function created(Post $post): void
    {
        ContentManagementController::clearStatsCache();
    }

    /**
     * Handle the Post "updated" event.
     */
    public function updated(Post $post): void
    {
        // Only clear cache if status changed (affects published/draft counts)
        if ($post->wasChanged('status')) {
            ContentManagementController::clearStatsCache();
        }
    }

    /**
     * Handle the Post "deleted" event.
     */
    public function deleted(Post $post): void
    {
        ContentManagementController::clearStatsCache();
    }

    /**
     * Handle the Post "restored" event.
     */
    public function restored(Post $post): void
    {
        ContentManagementController::clearStatsCache();
    }

    /**
     * Handle the Post "force deleted" event.
     */
    public function forceDeleted(Post $post): void
    {
        ContentManagementController::clearStatsCache();
    }
}

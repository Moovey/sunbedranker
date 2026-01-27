<?php

namespace App\Observers;

use App\Http\Controllers\Admin\ContentManagementController;
use App\Models\Post;
use Illuminate\Support\Facades\Cache;

class PostObserver
{
    /**
     * Clear blog-related caches.
     */
    private function clearBlogCaches(): void
    {
        Cache::forget('blog:categories');
        Cache::forget('blog:tags');
        Cache::forget('blog:featured');
        Cache::forget('blog:latest:3');
        Cache::forget('blog:latest:5');
        Cache::forget('blog:latest:6');
    }

    /**
     * Handle the Post "created" event.
     */
    public function created(Post $post): void
    {
        ContentManagementController::clearStatsCache();
        $this->clearBlogCaches();
    }

    /**
     * Handle the Post "updated" event.
     */
    public function updated(Post $post): void
    {
        // Clear caches if status, category, or publish date changed
        if ($post->wasChanged(['status', 'category_id', 'published_at'])) {
            ContentManagementController::clearStatsCache();
            $this->clearBlogCaches();
        }
    }

    /**
     * Handle the Post "deleted" event.
     */
    public function deleted(Post $post): void
    {
        ContentManagementController::clearStatsCache();
        $this->clearBlogCaches();
    }

    /**
     * Handle the Post "restored" event.
     */
    public function restored(Post $post): void
    {
        ContentManagementController::clearStatsCache();
        $this->clearBlogCaches();
    }

    /**
     * Handle the Post "force deleted" event.
     */
    public function forceDeleted(Post $post): void
    {
        ContentManagementController::clearStatsCache();
        $this->clearBlogCaches();
    }
}

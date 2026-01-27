<?php

namespace App\Providers;

use App\Events\ClaimApproved;
use App\Events\ClaimRejected;
use App\Events\SubscriptionUpdated;
use App\Events\TemporaryAccessGranted;
use App\Listeners\SendClaimApprovedNotification;
use App\Listeners\SendClaimRejectedNotification;
use App\Listeners\SendSubscriptionUpdatedNotification;
use App\Listeners\SendTemporaryAccessGrantedNotification;
use App\Models\Hotel;
use App\Models\HotelClaim;
use App\Models\Post;
use App\Models\Review;
use App\Observers\HotelObserver;
use App\Observers\HotelClaimObserver;
use App\Observers\PostObserver;
use App\Observers\ReviewObserver;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Register model observers for cache invalidation
        Hotel::observe(HotelObserver::class);
        HotelClaim::observe(HotelClaimObserver::class);
        Post::observe(PostObserver::class);
        Review::observe(ReviewObserver::class);

        // Register event listeners
        $this->registerEventListeners();

        // Configure rate limiters
        $this->configureRateLimiting();
    }

    /**
     * Register event listeners for the application.
     */
    protected function registerEventListeners(): void
    {
        Event::listen(ClaimApproved::class, SendClaimApprovedNotification::class);
        Event::listen(ClaimRejected::class, SendClaimRejectedNotification::class);
        Event::listen(SubscriptionUpdated::class, SendSubscriptionUpdatedNotification::class);
        Event::listen(TemporaryAccessGranted::class, SendTemporaryAccessGrantedNotification::class);
    }

    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        // Admin dashboard rate limiter - generous but protective
        // 60 requests per minute per user (allows normal admin usage)
        RateLimiter::for('admin', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        // Admin actions rate limiter - stricter for write operations
        // 30 requests per minute per user
        RateLimiter::for('admin-actions', function (Request $request) {
            return Limit::perMinute(30)->by($request->user()?->id ?: $request->ip());
        });

        // Bulk operations rate limiter - very strict
        // 5 requests per minute (e.g., recalculate all scores)
        RateLimiter::for('admin-bulk', function (Request $request) {
            return Limit::perMinute(5)->by($request->user()?->id ?: $request->ip());
        });
    }
}

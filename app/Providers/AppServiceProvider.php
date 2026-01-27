<?php

namespace App\Providers;

use App\Models\Hotel;
use App\Models\HotelClaim;
use App\Models\Review;
use App\Observers\HotelObserver;
use App\Observers\HotelClaimObserver;
use App\Observers\ReviewObserver;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
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
        Review::observe(ReviewObserver::class);

        // Configure rate limiters
        $this->configureRateLimiting();
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

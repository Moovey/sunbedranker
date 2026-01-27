<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\Destination;
use App\Models\HotelClaim;
use App\Models\Review;
use App\Models\User;
use App\Models\Post;
use App\Models\AffiliateCampaign;
use App\Models\Subscription;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    /**
     * Cache keys for admin dashboard
     */
    public const CACHE_KEY_STATS = 'admin.dashboard.stats';
    public const CACHE_KEY_MONTHLY = 'admin.dashboard.monthly';
    public const CACHE_KEY_TOP_HOTELS = 'admin.dashboard.top_hotels';
    public const CACHE_KEY_RECENT_HOTELS = 'admin.dashboard.recent_hotels';
    public const CACHE_KEY_PENDING_CLAIMS = 'admin.dashboard.pending_claims';
    public const CACHE_KEY_PENDING_REVIEWS = 'admin.dashboard.pending_reviews';

    /**
     * Cache TTL in minutes
     */
    private const STATS_TTL_MINUTES = 10;
    private const MONTHLY_TTL_MINUTES = 60;
    private const LISTS_TTL_MINUTES = 5;

    public function index(): Response
    {
        $stats = $this->getCachedStats();
        $monthlyPerformance = $this->getCachedMonthlyPerformance();
        $topPerformingHotels = $this->getCachedTopPerformingHotels();
        $recentHotels = $this->getCachedRecentHotels();
        $pendingClaims = $this->getCachedPendingClaims();
        $pendingReviews = $this->getCachedPendingReviews();

        // Quick action links with counts
        $quickActions = [
            ['label' => 'Approve Claims', 'count' => $stats['pending_claims'], 'url' => '/admin/claims'],
            ['label' => 'Review Content', 'count' => $stats['pending_reviews'], 'url' => '/admin/reviews'],
            ['label' => 'Manage Hotels', 'count' => $stats['total_hotels'], 'url' => '/admin/hotels'],
            ['label' => 'Content Library', 'count' => $stats['total_posts'], 'url' => '/admin/content'],
            ['label' => 'Scoring Settings', 'count' => 0, 'url' => '/admin/scoring'],
            ['label' => 'Badge Rules', 'count' => 0, 'url' => '/admin/badges'],
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'topPerformingHotels' => $topPerformingHotels,
            'recentHotels' => $recentHotels,
            'pendingClaims' => $pendingClaims,
            'pendingReviews' => $pendingReviews,
            'quickActions' => $quickActions,
            'monthlyPerformance' => $monthlyPerformance,
        ]);
    }

    /**
     * Get cached dashboard stats (10 min TTL)
     */
    private function getCachedStats(): array
    {
        return Cache::remember(self::CACHE_KEY_STATS, now()->addMinutes(self::STATS_TTL_MINUTES), function () {
            return [
                // Core stats
                'total_hotels' => Hotel::count(),
                'active_hotels' => Hotel::where('is_active', true)->count(),
                'claimed_hotels' => HotelClaim::where('status', 'approved')->distinct('hotel_id')->count(),
                'total_destinations' => Destination::count(),
                
                // Subscription stats
                'free_tier' => Hotel::where('subscription_tier', 'free')->count(),
                'enhanced_tier' => Hotel::where('subscription_tier', 'enhanced')->count(),
                'premium_tier' => Hotel::where('subscription_tier', 'premium')->count(),
                'active_subscriptions' => Subscription::where('status', Subscription::STATUS_ACTIVE)
                    ->where(function($q) {
                        $q->whereNull('ends_at')
                          ->orWhere('ends_at', '>=', now());
                    })->count(),
                
                // Claims & Reviews
                'pending_claims' => HotelClaim::where('status', 'pending')->count(),
                'approved_claims' => HotelClaim::where('status', 'approved')->count(),
                'pending_reviews' => Review::where('status', 'pending')->count(),
                
                // Users
                'total_users' => User::count(),
                'hoteliers' => User::where('role', 'hotelier')->count(),
                'admins' => User::where('role', 'admin')->count(),
                
                // Content
                'total_posts' => Post::count(),
                'published_posts' => Post::where('status', 'published')->count(),
                
                // Affiliate & Revenue
                'total_clicks' => Hotel::sum('click_count'),
                'total_revenue' => Hotel::sum('affiliate_revenue'),
                'active_campaigns' => AffiliateCampaign::where('status', 'active')->count(),
                
                // This month stats
                'clicks_this_month' => DB::table('hotel_analytics')
                    ->where('date', '>=', now()->startOfMonth())
                    ->sum('clicks'),
                'views_this_month' => DB::table('hotel_analytics')
                    ->where('date', '>=', now()->startOfMonth())
                    ->sum('views'),
            ];
        });
    }

    /**
     * Get cached monthly performance data (1 hour TTL)
     */
    private function getCachedMonthlyPerformance(): array
    {
        return Cache::remember(self::CACHE_KEY_MONTHLY, now()->addMinutes(self::MONTHLY_TTL_MINUTES), function () {
            $currentYear = now()->year;
            $availableYears = range($currentYear, $currentYear - 4);
            
            $monthlyPerformance = [];
            foreach ($availableYears as $year) {
                $yearData = [];
                for ($month = 1; $month <= 12; $month++) {
                    $startOfMonth = now()->setYear($year)->setMonth($month)->startOfMonth();
                    $endOfMonth = now()->setYear($year)->setMonth($month)->endOfMonth();
                    
                    $monthData = DB::table('hotel_analytics')
                        ->whereBetween('date', [$startOfMonth, $endOfMonth])
                        ->selectRaw('COALESCE(SUM(clicks), 0) as clicks, COALESCE(SUM(views), 0) as views')
                        ->first();
                    
                    $yearData[] = [
                        'month' => $startOfMonth->format('M'),
                        'clicks' => (int) ($monthData->clicks ?? 0),
                        'views' => (int) ($monthData->views ?? 0),
                    ];
                }
                $monthlyPerformance[$year] = $yearData;
            }
            
            return $monthlyPerformance;
        });
    }

    /**
     * Get cached top performing hotels (5 min TTL)
     */
    private function getCachedTopPerformingHotels()
    {
        return Cache::remember(self::CACHE_KEY_TOP_HOTELS, now()->addMinutes(self::LISTS_TTL_MINUTES), function () {
            return Hotel::with('destination')
                ->where('click_count', '>', 0)
                ->orderByDesc('click_count')
                ->limit(5)
                ->get(['id', 'name', 'slug', 'destination_id', 'click_count', 'affiliate_revenue', 'main_image']);
        });
    }

    /**
     * Get cached recent hotels (5 min TTL)
     */
    private function getCachedRecentHotels()
    {
        return Cache::remember(self::CACHE_KEY_RECENT_HOTELS, now()->addMinutes(self::LISTS_TTL_MINUTES), function () {
            return Hotel::with('destination')
                ->latest()
                ->limit(5)
                ->get(['id', 'name', 'slug', 'destination_id', 'is_active', 'subscription_tier', 'created_at']);
        });
    }

    /**
     * Get cached pending claims (5 min TTL)
     */
    private function getCachedPendingClaims()
    {
        return Cache::remember(self::CACHE_KEY_PENDING_CLAIMS, now()->addMinutes(self::LISTS_TTL_MINUTES), function () {
            return HotelClaim::with(['hotel', 'user'])
                ->where('status', 'pending')
                ->latest()
                ->limit(5)
                ->get();
        });
    }

    /**
     * Get cached pending reviews (5 min TTL)
     */
    private function getCachedPendingReviews()
    {
        return Cache::remember(self::CACHE_KEY_PENDING_REVIEWS, now()->addMinutes(self::LISTS_TTL_MINUTES), function () {
            return Review::with(['hotel', 'user'])
                ->where('status', 'pending')
                ->latest()
                ->limit(5)
                ->get();
        });
    }

    /**
     * Clear all dashboard caches (can be called from observers)
     */
    public static function clearAllCaches(): void
    {
        Cache::forget(self::CACHE_KEY_STATS);
        Cache::forget(self::CACHE_KEY_MONTHLY);
        Cache::forget(self::CACHE_KEY_TOP_HOTELS);
        Cache::forget(self::CACHE_KEY_RECENT_HOTELS);
        Cache::forget(self::CACHE_KEY_PENDING_CLAIMS);
        Cache::forget(self::CACHE_KEY_PENDING_REVIEWS);
    }

    /**
     * Clear stats cache only
     */
    public static function clearStatsCache(): void
    {
        Cache::forget(self::CACHE_KEY_STATS);
    }

    /**
     * Clear hotel-related caches
     */
    public static function clearHotelCaches(): void
    {
        Cache::forget(self::CACHE_KEY_STATS);
        Cache::forget(self::CACHE_KEY_TOP_HOTELS);
        Cache::forget(self::CACHE_KEY_RECENT_HOTELS);
    }

    /**
     * Clear claim-related caches
     */
    public static function clearClaimCaches(): void
    {
        Cache::forget(self::CACHE_KEY_STATS);
        Cache::forget(self::CACHE_KEY_PENDING_CLAIMS);
    }

    /**
     * Clear review-related caches
     */
    public static function clearReviewCaches(): void
    {
        Cache::forget(self::CACHE_KEY_STATS);
        Cache::forget(self::CACHE_KEY_PENDING_REVIEWS);
    }
}

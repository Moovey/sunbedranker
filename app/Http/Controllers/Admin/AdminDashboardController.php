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
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
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

        // Top performing hotels (by clicks and revenue)
        $topPerformingHotels = Hotel::with('destination')
            ->where('click_count', '>', 0)
            ->orderByDesc('click_count')
            ->limit(5)
            ->get(['id', 'name', 'slug', 'destination_id', 'click_count', 'affiliate_revenue', 'main_image']);

        // Recent hotels
        $recentHotels = Hotel::with('destination')
            ->latest()
            ->limit(5)
            ->get(['id', 'name', 'slug', 'destination_id', 'is_active', 'subscription_tier', 'created_at']);

        // Pending claims
        $pendingClaims = HotelClaim::with(['hotel', 'user'])
            ->where('status', 'pending')
            ->latest()
            ->limit(5)
            ->get();

        // Pending reviews
        $pendingReviews = Review::with(['hotel', 'user'])
            ->where('status', 'pending')
            ->latest()
            ->limit(5)
            ->get();

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
        ]);
    }
}

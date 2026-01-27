<?php

namespace App\Http\Controllers\Hotelier;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\HotelClaim;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class HotelierDashboardController extends Controller
{
    /**
     * Cache TTL in seconds
     */
    private const CACHE_TTL = 300; // 5 minutes

    public function index(Request $request)
    {
        $user = $request->user();
        $userId = $user->id;
        
        // Cache key unique to this hotelier
        $cacheKey = "hotelier.dashboard.{$userId}";
        
        // Get cached dashboard data
        $dashboardData = Cache::remember($cacheKey, self::CACHE_TTL, function () use ($userId) {
            // Get approved hotel claims for this hotelier
            $approvedClaimIds = HotelClaim::where('user_id', $userId)
                ->where('status', 'approved')
                ->pluck('hotel_id');
            
            // Get hotels owned by this hotelier
            $hotels = Hotel::whereIn('id', $approvedClaimIds)
                ->with(['destination', 'reviews'])
                ->get()
                ->map(function ($hotel) {
                    return [
                        'id' => $hotel->id,
                        'name' => $hotel->name,
                        'destination' => $hotel->destination->name,
                        'score' => $hotel->overall_score,
                        'total_reviews' => $hotel->reviews->count(),
                        'average_rating' => $hotel->reviews->avg('rating'),
                        'slug' => $hotel->slug,
                    ];
                });

            // Get pending claim if any
            $pendingClaim = HotelClaim::where('user_id', $userId)
                ->where('status', 'pending')
                ->with('hotel')
                ->first();

            // Get recent reviews for user's hotels
            $recentReviews = Review::whereIn('hotel_id', $approvedClaimIds)
                ->with(['hotel', 'user'])
                ->latest()
                ->take(5)
                ->get();

            return [
                'hotels' => $hotels,
                'pendingClaim' => $pendingClaim,
                'recentReviews' => $recentReviews,
                'stats' => [
                    'total_hotels' => $hotels->count(),
                    'total_reviews' => $recentReviews->count(),
                    'average_score' => $hotels->avg('score') ?? 0,
                ],
            ];
        });

        return Inertia::render('Hotelier/Dashboard', [
            'hotels' => $dashboardData['hotels'],
            'pendingClaim' => $dashboardData['pendingClaim'],
            'recentReviews' => $dashboardData['recentReviews'],
            'stats' => $dashboardData['stats'],
            'subscription' => [
                'tier' => $user->subscription_tier ?? 'free',
                'tierName' => $user->getSubscriptionTierName(),
                'canClaimHotels' => $user->canClaimHotels(),
                'canEditHotels' => $user->canEditHotels(),
                'expiresAt' => $user->subscription_expires_at?->format('M d, Y'),
                'isActive' => $user->hasActiveSubscription(),
            ],
        ]);
    }

    /**
     * Clear cache for a specific hotelier
     */
    public static function clearCacheForUser(int $userId): void
    {
        Cache::forget("hotelier.dashboard.{$userId}");
    }

    /**
     * Clear cache for hotelier who owns a specific hotel
     */
    public static function clearCacheForHotel(int $hotelId): void
    {
        $claim = HotelClaim::where('hotel_id', $hotelId)
            ->where('status', 'approved')
            ->first();
        
        if ($claim) {
            self::clearCacheForUser($claim->user_id);
        }
    }
}

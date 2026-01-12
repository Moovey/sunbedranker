<?php

namespace App\Http\Controllers\Hotelier;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\HotelClaim;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotelierDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get approved hotel claims for this hotelier
        $approvedClaimIds = HotelClaim::where('user_id', $user->id)
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
        $pendingClaim = HotelClaim::where('user_id', $user->id)
            ->where('status', 'pending')
            ->with('hotel')
            ->first();

        // Get recent reviews for user's hotels
        $recentReviews = Review::whereIn('hotel_id', $approvedClaimIds)
            ->with(['hotel', 'user'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Hotelier/Dashboard', [
            'hotels' => $hotels,
            'pendingClaim' => $pendingClaim,
            'recentReviews' => $recentReviews,
            'stats' => [
                'total_hotels' => $hotels->count(),
                'total_reviews' => $recentReviews->count(),
                'average_score' => $hotels->avg('score') ?? 0,
            ],
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
}

<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class HotelController extends Controller
{
    public function show(Hotel $hotel): Response
    {
        // Only increment view count for users with 'user' role (not hoteliers or admins)
        $user = Auth::user();
        if (!$user || $user->role === 'user') {
            // Rate-limited view increment (1 per IP per hotel per 5 minutes)
            $viewKey = 'hotel-view:' . $hotel->id . ':' . request()->ip();
            if (!RateLimiter::tooManyAttempts($viewKey, 1)) {
                $hotel->incrementViews();
                RateLimiter::hit($viewKey, 300); // 5 minute cooldown
            }
        }

        $hotel->load([
            'destination',
            'poolCriteria',
            'approvedReviews' => function ($query) {
                $query->latest()->limit(10);
            },
            'approvedReviews.user',
        ]);

        // Cache similar hotels per destination (5 minutes)
        $similarHotels = Cache::remember(
            "hotel:similar:{$hotel->destination_id}:{$hotel->id}",
            300,
            function () use ($hotel) {
                return Hotel::where('destination_id', $hotel->destination_id)
                    ->where('id', '!=', $hotel->id)
                    ->where('is_active', true)
                    ->with(['poolCriteria'])
                    ->orderByDesc('overall_score')
                    ->limit(4)
                    ->get();
            }
        );

        return Inertia::render('Hotels/Show', [
            'hotel' => $hotel,
            'similarHotels' => $similarHotels,
        ]);
    }

    public function trackClick(Request $request, Hotel $hotel): RedirectResponse
    {
        $affiliateType = $request->get('type', 'booking');
        
        // Only track clicks for users with 'user' role
        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        $shouldTrack = $user && $user->isUser();
        
        if ($shouldTrack) {
            // Rate-limited click tracking (3 clicks per IP per hotel per hour)
            // Prevents click fraud
            $clickKey = 'hotel-click:' . $hotel->id . ':' . $request->ip();
            if (!RateLimiter::tooManyAttempts($clickKey, 3)) {
                // Determine if this is a direct booking or affiliate click
                $clickType = $affiliateType === 'direct' ? 'direct' : 'affiliate';
                $hotel->incrementClicks($clickType);
                RateLimiter::hit($clickKey, 3600); // 1 hour cooldown
            }
        }
        
        $url = match($affiliateType) {
            'expedia' => $hotel->expedia_affiliate_url,
            'direct' => $hotel->direct_booking_url,
            default => $hotel->booking_affiliate_url,
        };

        return redirect()->away($url ?? $hotel->website ?? '/');
    }
}

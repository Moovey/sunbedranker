<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            $hotel->incrementViews();
        }

        $hotel->load([
            'destination',
            'poolCriteria',
            'approvedReviews' => function ($query) {
                $query->latest()->limit(10);
            },
            'approvedReviews.user',
        ]);

        // Get similar hotels
        $similarHotels = Hotel::where('destination_id', $hotel->destination_id)
            ->where('id', '!=', $hotel->id)
            ->where('is_active', true)
            ->with(['poolCriteria'])
            ->orderByDesc('overall_score')
            ->limit(4)
            ->get();

        return Inertia::render('Hotels/Show', [
            'hotel' => $hotel,
            'similarHotels' => $similarHotels,
        ]);
    }

    public function trackClick(Request $request, Hotel $hotel): RedirectResponse
    {
        $affiliateType = $request->get('type', 'booking');
        
        // Only track clicks for users with 'user' role
        $user = auth()->user();
        $shouldTrack = $user && $user->isUser();
        
        if ($shouldTrack) {
            // Determine if this is a direct booking or affiliate click
            $clickType = $affiliateType === 'direct' ? 'direct' : 'affiliate';
            $hotel->incrementClicks($clickType);
        }
        
        $url = match($affiliateType) {
            'expedia' => $hotel->expedia_affiliate_url,
            'direct' => $hotel->direct_booking_url,
            default => $hotel->booking_affiliate_url,
        };

        return redirect()->away($url ?? $hotel->website ?? '/');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class HotelController extends Controller
{
    public function show(Hotel $hotel): Response
    {
        // Increment view count
        $hotel->incrementViews();

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
        $hotel->incrementClicks();

        $affiliateType = $request->get('type', 'booking');
        
        $url = match($affiliateType) {
            'expedia' => $hotel->expedia_affiliate_url,
            'direct' => $hotel->direct_booking_url,
            default => $hotel->booking_affiliate_url,
        };

        return redirect()->away($url ?? $hotel->website ?? '/');
    }
}

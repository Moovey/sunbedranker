<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\Destination;
use App\Models\HotelClaim;
use App\Models\Review;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'total_hotels' => Hotel::count(),
            'active_hotels' => Hotel::where('is_active', true)->count(),
            'total_destinations' => Destination::count(),
            'pending_claims' => HotelClaim::where('status', 'pending')->count(),
            'pending_reviews' => Review::where('status', 'pending')->count(),
            'total_users' => User::count(),
            'hoteliers' => User::where('role', 'hotelier')->count(),
        ];

        $recentHotels = Hotel::with('destination')
            ->latest()
            ->limit(5)
            ->get();

        $pendingClaims = HotelClaim::with(['hotel', 'user'])
            ->where('status', 'pending')
            ->latest()
            ->limit(5)
            ->get();

        $pendingReviews = Review::with(['hotel', 'user'])
            ->where('status', 'pending')
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentHotels' => $recentHotels,
            'pendingClaims' => $pendingClaims,
            'pendingReviews' => $pendingReviews,
        ]);
    }
}

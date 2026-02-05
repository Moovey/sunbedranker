<?php

namespace App\Http\Controllers\Admin;

use App\Events\ClaimApproved;
use App\Events\ClaimRejected;
use App\Events\SubscriptionUpdated;
use App\Events\TemporaryAccessGranted;
use App\Http\Controllers\Controller;
use App\Models\HotelClaim;
use App\Models\User;
use App\Models\Hotel;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ClaimManagementController extends Controller
{
    /**
     * Cache keys for claim management stats
     */
    public const CACHE_KEY_STATS = 'admin.claims.stats';
    private const STATS_TTL_MINUTES = 10;

    public function index(Request $request): Response
    {
        $tab = $request->get('tab', 'claims');
        $status = $request->get('status', 'pending');
        $search = $request->get('search', '');
        $tier = $request->get('tier', 'all');

        // Claims data - only show claims where email has been verified
        $claims = HotelClaim::with(['hotel.destination', 'user', 'reviewer'])
            ->whereNotNull('email_verified_at') // Only show email-verified claims to admin
            ->when($status !== 'all', function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when($search, function ($query) use ($search) {
                $query->whereHas('hotel', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })->orWhereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10);

        // Hoteliers with their subscriptions, hotels, and performance data
        $hoteliersQuery = User::where('role', 'hotelier')
            ->with(['activeSubscription', 'subscriptions' => function ($query) {
                $query->latest()->limit(5);
            }])
            ->withCount(['subscriptions']);

        if ($search) {
            $hoteliersQuery->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($tier !== 'all') {
            $hoteliersQuery->whereHas('activeSubscription', function ($query) use ($tier) {
                $query->where('tier', $tier);
            });
            
            // Include free tier users (those without active subscription)
            if ($tier === 'free') {
                $hoteliersQuery->orWhere(function ($query) {
                    $query->where('role', 'hotelier')
                          ->whereDoesntHave('activeSubscription');
                });
            }
        }

        $hoteliers = $hoteliersQuery->latest()->paginate(10);

        // Add hotel stats for each hotelier
        $hoteliers->getCollection()->transform(function ($hotelier) {
            $hotels = Hotel::where('owned_by', $hotelier->id)->get();
            $hotelier->hotels_count = $hotels->count();
            $hotelier->total_views = $hotels->sum('view_count');
            $hotelier->total_clicks = $hotels->sum('click_count');
            $hotelier->total_affiliate_clicks = $hotels->sum('affiliate_click_count');
            $hotelier->total_revenue = $hotels->sum('affiliate_revenue');
            $hotelier->hotels = $hotels->take(3); // Get first 3 hotels for preview
            return $hotelier;
        });

        // Subscriptions overview
        $subscriptions = Subscription::with(['user'])
            ->when($tier !== 'all', function ($query) use ($tier) {
                $query->where('tier', $tier);
            })
            ->when($search, function ($query) use ($search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10);

        // Get cached stats
        $stats = $this->getCachedStats();

        return Inertia::render('Admin/Claims/Index', [
            'claims' => $claims,
            'hoteliers' => $hoteliers,
            'subscriptions' => $subscriptions,
            'filters' => [
                'tab' => $tab,
                'status' => $status,
                'search' => $search,
                'tier' => $tier,
            ],
            'stats' => $stats,
        ]);
    }

    /**
     * Show detailed claim for review
     */
    public function show(HotelClaim $claim): Response
    {
        $claim->load([
            'hotel.destination',
            'hotel.poolCriteria',
            'user',
            'reviewer'
        ]);

        // Get user's claim history
        $userClaimHistory = HotelClaim::with('hotel')
            ->where('user_id', $claim->user_id)
            ->where('id', '!=', $claim->id)
            ->latest()
            ->get();

        // Get hotel's claim history
        $hotelClaimHistory = HotelClaim::with('user')
            ->where('hotel_id', $claim->hotel_id)
            ->where('id', '!=', $claim->id)
            ->latest()
            ->get();

        return Inertia::render('Admin/Claims/Show', [
            'claim' => $claim,
            'userClaimHistory' => $userClaimHistory,
            'hotelClaimHistory' => $hotelClaimHistory,
        ]);
    }

    public function approve(Request $request, HotelClaim $claim): RedirectResponse
    {
        if ($claim->status !== 'pending') {
            return back()->withErrors(['message' => 'Only pending claims can be approved.']);
        }

        // Check if hotel already has an owner
        if ($claim->hotel->hasOwner()) {
            return back()->withErrors(['message' => 'This hotel already has an approved owner.']);
        }

        DB::beginTransaction();
        try {
            $claim->approve($request->user());

            DB::commit();

            // Dispatch event for notification and audit logging
            ClaimApproved::dispatch($claim, $request->user());

            // Clear cached stats
            self::clearStatsCache();

            return redirect()->route('admin.claims.index')
                ->with('success', 'Claim approved successfully! Hotel ownership has been assigned.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to approve claim: ' . $e->getMessage()]);
        }
    }

    public function reject(Request $request, HotelClaim $claim): RedirectResponse
    {
        $validated = $request->validate([
            'admin_notes' => 'required|string|max:1000',
        ]);

        if ($claim->status !== 'pending') {
            return back()->withErrors(['message' => 'Only pending claims can be rejected.']);
        }

        DB::beginTransaction();
        try {
            $claim->reject($request->user(), $validated['admin_notes']);

            DB::commit();

            // Dispatch event for notification and audit logging
            ClaimRejected::dispatch($claim, $request->user(), $validated['admin_notes']);

            // Clear cached stats
            self::clearStatsCache();

            return redirect()->route('admin.claims.index')
                ->with('success', 'Claim rejected successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to reject claim: ' . $e->getMessage()]);
        }
    }

    /**
     * Update hotelier subscription manually
     */
    public function updateSubscription(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'tier' => 'required|in:free,enhanced,premium',
            'period_months' => 'required|integer|min:1|max:24',
            'reason' => 'nullable|string|max:500',
        ]);

        DB::beginTransaction();
        try {
            // Cancel any existing active subscription
            $user->subscriptions()->where('status', Subscription::STATUS_ACTIVE)->update([
                'status' => Subscription::STATUS_CANCELLED,
            ]);

            $subscription = null;
            if ($validated['tier'] !== 'free') {
                // Create new subscription
                $subscription = Subscription::create([
                    'user_id' => $user->id,
                    'tier' => $validated['tier'],
                    'period_months' => $validated['period_months'],
                    'monthly_price' => 0, // Manual upgrade - no charge
                    'total_amount' => 0,
                    'starts_at' => now(),
                    'ends_at' => now()->addMonths($validated['period_months']),
                    'status' => Subscription::STATUS_ACTIVE,
                    'payment_method' => 'manual_admin',
                    'transaction_id' => 'ADMIN-' . now()->format('YmdHis') . '-' . $user->id,
                ]);
            }

            DB::commit();

            // Dispatch event for notification and audit logging
            SubscriptionUpdated::dispatch(
                $user,
                $subscription,
                $validated['tier'],
                $validated['period_months'],
                $request->user(),
                $validated['reason'] ?? null
            );

            // Clear cached stats
            self::clearStatsCache();

            return back()->with('success', "Subscription updated to {$validated['tier']} for {$validated['period_months']} months.");

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to update subscription: ' . $e->getMessage()]);
        }
    }

    /**
     * Grant temporary access to a hotelier
     */
    public function grantTemporaryAccess(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'tier' => 'required|in:enhanced,premium',
            'days' => 'required|integer|min:1|max:90',
            'reason' => 'nullable|string|max:500',
        ]);

        DB::beginTransaction();
        try {
            // Create temporary subscription
            $subscription = Subscription::create([
                'user_id' => $user->id,
                'tier' => $validated['tier'],
                'period_months' => 0,
                'monthly_price' => 0,
                'total_amount' => 0,
                'starts_at' => now(),
                'ends_at' => now()->addDays($validated['days']),
                'status' => Subscription::STATUS_ACTIVE,
                'payment_method' => 'temporary_access',
                'transaction_id' => 'TEMP-' . now()->format('YmdHis') . '-' . $user->id,
            ]);

            DB::commit();

            // Dispatch event for notification and audit logging
            TemporaryAccessGranted::dispatch(
                $user,
                $subscription,
                $validated['tier'],
                $validated['days'],
                $request->user(),
                $validated['reason'] ?? null
            );

            // Clear cached stats
            self::clearStatsCache();

            return back()->with('success', "Granted {$validated['days']} days of {$validated['tier']} access.");

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to grant access: ' . $e->getMessage()]);
        }
    }

    /**
     * Cancel a subscription
     */
    public function cancelSubscription(Request $request, Subscription $subscription): RedirectResponse
    {
        $validated = $request->validate([
            'reason' => 'nullable|string|max:500',
        ]);

        $subscription->update([
            'status' => Subscription::STATUS_CANCELLED,
        ]);

        // Clear cached stats
        self::clearStatsCache();

        return back()->with('success', 'Subscription cancelled successfully.');
    }

    /**
     * Get hotelier performance details
     */
    public function hotelierPerformance(User $user): Response
    {
        $user->load(['activeSubscription', 'subscriptions']);
        
        $hotels = Hotel::where('owned_by', $user->id)
            ->with(['destination', 'analytics' => function ($query) {
                $query->where('date', '>=', now()->subDays(30));
            }])
            ->get();

        // Calculate performance metrics
        $performance = [
            'total_views' => $hotels->sum('view_count'),
            'total_clicks' => $hotels->sum('click_count'),
            'total_affiliate_clicks' => $hotels->sum('affiliate_click_count'),
            'total_revenue' => $hotels->sum('affiliate_revenue'),
            'average_score' => $hotels->avg('overall_score'),
        ];

        // 30-day analytics
        $dailyStats = [];
        foreach ($hotels as $hotel) {
            foreach ($hotel->analytics as $analytic) {
                $date = $analytic->date->format('Y-m-d');
                if (!isset($dailyStats[$date])) {
                    $dailyStats[$date] = ['views' => 0, 'clicks' => 0];
                }
                $dailyStats[$date]['views'] += $analytic->views;
                $dailyStats[$date]['clicks'] += $analytic->clicks;
            }
        }

        // Claims history
        $claims = HotelClaim::with('hotel')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('Admin/Claims/HotelierPerformance', [
            'hotelier' => $user,
            'hotels' => $hotels,
            'performance' => $performance,
            'dailyStats' => $dailyStats,
            'claims' => $claims,
        ]);
    }

    /**
     * Get cached stats (10 min TTL)
     */
    private function getCachedStats(): array
    {
        return Cache::remember(self::CACHE_KEY_STATS, now()->addMinutes(self::STATS_TTL_MINUTES), function () {
            return [
                // Claims stats - only count email-verified claims
                'pending_claims' => HotelClaim::where('status', 'pending')->whereNotNull('email_verified_at')->count(),
                'approved_claims' => HotelClaim::where('status', 'approved')->whereNotNull('email_verified_at')->count(),
                'rejected_claims' => HotelClaim::where('status', 'rejected')->whereNotNull('email_verified_at')->count(),
                
                // Hotelier stats
                'total_hoteliers' => User::where('role', 'hotelier')->count(),
                'active_hoteliers' => User::where('role', 'hotelier')
                    ->whereHas('activeSubscription')
                    ->count(),
                
                // Subscription stats
                'free_tier' => User::where('role', 'hotelier')
                    ->whereDoesntHave('activeSubscription')
                    ->count(),
                'enhanced_tier' => Subscription::active()->where('tier', 'enhanced')->count(),
                'premium_tier' => Subscription::active()->where('tier', 'premium')->count(),
                
                // Revenue stats
                'total_revenue' => Subscription::where('status', 'active')->sum('total_amount'),
                'monthly_revenue' => Subscription::where('status', 'active')
                    ->where('starts_at', '>=', now()->startOfMonth())
                    ->sum('total_amount'),
                
                // Engagement stats
                'total_hotel_views' => Hotel::whereNotNull('owned_by')->sum('view_count'),
                'total_hotel_clicks' => Hotel::whereNotNull('owned_by')->sum('click_count'),
            ];
        });
    }

    /**
     * Clear stats cache
     */
    public static function clearStatsCache(): void
    {
        Cache::forget(self::CACHE_KEY_STATS);
        
        // Also clear dashboard stats since they overlap
        Cache::forget(AdminDashboardController::CACHE_KEY_STATS);
    }
}

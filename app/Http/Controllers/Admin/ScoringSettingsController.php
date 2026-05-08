<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Requests\Admin\Scoring\BadgeRequest;
use App\Http\Requests\Admin\Scoring\PreviewBadgeRequest;
use App\Http\Requests\Admin\Scoring\UpdateScoringOrderRequest;
use App\Http\Requests\Admin\Scoring\UpdateScoringVisibilityRequest;
use App\Http\Requests\Admin\Scoring\UpdateScoringWeightsRequest;
use App\Jobs\ApplyBadgesToHotels;
use App\Jobs\RecalculateHotelScores;
use App\Models\Badge;
use App\Models\ScoringWeight;
use App\Services\BadgeCriteriaService;
use App\Services\HotelScoringService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ScoringSettingsController extends Controller
{
    public function __construct(
        protected HotelScoringService $scoringService,
        protected BadgeCriteriaService $badgeCriteria,
    ) {
    }

    /**
     * Display the scoring settings page
     */
    public function index()
    {
        $weights = ScoringWeight::orderBy('order')->get();
        $badges = Badge::orderBy('priority', 'desc')->orderBy('name')->get();
        
        // Get cached stats (10 minutes TTL)
        $stats = Cache::remember('admin.scoring.stats', 600, function () use ($weights, $badges) {
            return [
                'total_metrics' => $weights->count(),
                'active_metrics' => $weights->where('is_active', true)->count(),
                'visible_metrics' => $weights->where('is_visible', true)->count(),
                'total_badges' => $badges->count(),
                'active_badges' => $badges->where('is_active', true)->count(),
                'hotels_with_badges' => DB::table('badge_hotel')->distinct('hotel_id')->count(),
            ];
        });

        // Get job progress status
        $jobProgress = [
            'recalculation' => Cache::get('scoring.recalculation.progress'),
            'badges' => Cache::get('scoring.badges.progress'),
        ];

        // Available criteria for badge rules - matching hotel show page sections
        $availableCriteria = [
            // ============================================
            // HOTEL SCORES (from Hotel model)
            // ============================================
            ['key' => 'overall_score', 'label' => 'Overall Score (0-100)', 'type' => 'number', 'group' => 'Hotel Scores'],
            ['key' => 'family_score', 'label' => 'Family Score (0-100)', 'type' => 'number', 'group' => 'Hotel Scores'],
            ['key' => 'quiet_score', 'label' => 'Quiet Score (0-100)', 'type' => 'number', 'group' => 'Hotel Scores'],
            ['key' => 'party_score', 'label' => 'Party Score (0-100)', 'type' => 'number', 'group' => 'Hotel Scores'],
            
            // ============================================
            // 1. SUNBED AVAILABILITY (SunbedAvailabilitySection)
            // ============================================
            ['key' => 'sunbed_count', 'label' => 'Total Sunbeds', 'type' => 'number', 'group' => 'Sunbed Availability'],
            ['key' => 'sunbed_to_guest_ratio', 'label' => 'Sunbed Ratio (per guest)', 'type' => 'decimal', 'group' => 'Sunbed Availability'],
            
            // ============================================
            // 3. POOL SIZE & VARIETY (PoolSizeSection)
            // ============================================
            ['key' => 'pool_size_sqm', 'label' => 'Main Pool Size (m²)', 'type' => 'number', 'group' => 'Pool Size & Variety'],
            ['key' => 'number_of_pools', 'label' => 'Number of Pools', 'type' => 'number', 'group' => 'Pool Size & Variety'],
            ['key' => 'has_infinity_pool', 'label' => 'Has Infinity Pool', 'type' => 'boolean', 'group' => 'Pool Size & Variety'],
            ['key' => 'has_rooftop_pool', 'label' => 'Has Rooftop Pool', 'type' => 'boolean', 'group' => 'Pool Size & Variety'],
            
            // ============================================
            // 5. POOL FACILITIES & COMFORT (FacilitiesSection)
            // ============================================
            ['key' => 'has_pool_bar', 'label' => 'Has Pool Bar', 'type' => 'boolean', 'group' => 'Pool Facilities'],
            ['key' => 'has_waiter_service', 'label' => 'Has Waiter Service', 'type' => 'boolean', 'group' => 'Pool Facilities'],
            
            // ============================================
            // 7. CLEANLINESS & MAINTENANCE (CleanlinessSection)
            // ============================================
            ['key' => 'cleanliness_rating', 'label' => 'Cleanliness Rating (1-5 stars)', 'type' => 'number', 'group' => 'Cleanliness'],
            ['key' => 'sunbed_condition_rating', 'label' => 'Sunbed Condition Rating (1-5 stars)', 'type' => 'number', 'group' => 'Cleanliness'],
            ['key' => 'tiling_condition_rating', 'label' => 'Tiling Condition Rating (1-5 stars)', 'type' => 'number', 'group' => 'Cleanliness'],
            
            // ============================================
            // 8. ACCESSIBILITY FEATURES (AccessibilitySection)
            // ============================================
            ['key' => 'has_accessibility_ramp', 'label' => 'Has Accessibility Ramp', 'type' => 'boolean', 'group' => 'Accessibility'],
            ['key' => 'has_pool_hoist', 'label' => 'Has Pool Hoist', 'type' => 'boolean', 'group' => 'Accessibility'],
            ['key' => 'has_step_free_access', 'label' => 'Has Step-Free Access', 'type' => 'boolean', 'group' => 'Accessibility'],
            ['key' => 'has_elevator_to_rooftop', 'label' => 'Has Elevator to Rooftop', 'type' => 'boolean', 'group' => 'Accessibility'],
            
            // ============================================
            // 9. KIDS & FAMILY FEATURES (KidsFeaturesSection)
            // ============================================
            ['key' => 'has_kids_pool', 'label' => 'Has Kids Pool', 'type' => 'boolean', 'group' => 'Kids & Family'],
            ['key' => 'has_splash_park', 'label' => 'Has Splash Park', 'type' => 'boolean', 'group' => 'Kids & Family'],
            ['key' => 'has_waterslide', 'label' => 'Has Water Slides', 'type' => 'boolean', 'group' => 'Kids & Family'],
            ['key' => 'has_lifeguard', 'label' => 'Has Lifeguard on Duty', 'type' => 'boolean', 'group' => 'Kids & Family'],
            
            // ============================================
            // 10. LUXURY & PREMIUM FEATURES (LuxuryFeaturesSection)
            // ============================================
            ['key' => 'has_luxury_cabanas', 'label' => 'Has Luxury Cabanas', 'type' => 'boolean', 'group' => 'Luxury Features'],
            ['key' => 'has_cabana_service', 'label' => 'Has Cabana Service', 'type' => 'boolean', 'group' => 'Luxury Features'],
            ['key' => 'has_heated_pool', 'label' => 'Has Heated Pool', 'type' => 'boolean', 'group' => 'Luxury Features'],
            ['key' => 'has_jacuzzi', 'label' => 'Has Jacuzzi', 'type' => 'boolean', 'group' => 'Luxury Features'],
            ['key' => 'has_adult_sun_terrace', 'label' => 'Has Adult Sun Terrace', 'type' => 'boolean', 'group' => 'Luxury Features'],
            
            // ============================================
            // ADDITIONAL POOL FLAGS
            // ============================================
            ['key' => 'is_adults_only', 'label' => 'Adults Only Pool', 'type' => 'boolean', 'group' => 'Other'],
            ['key' => 'has_entertainment', 'label' => 'Has Entertainment Activities', 'type' => 'boolean', 'group' => 'Other'],
        ];

        return Inertia::render('Admin/Scoring/Index', [
            'weights' => $weights,
            'badges' => $badges,
            'stats' => $stats,
            'availableCriteria' => $availableCriteria,
            'jobProgress' => $jobProgress,
        ]);
    }

    /**
     * Update metric weights
     */
    public function updateWeights(UpdateScoringWeightsRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            foreach ($validated['weights'] as $weightData) {
                ScoringWeight::where('id', $weightData['id'])->update([
                    'weight' => $weightData['weight'],
                    'family_weight' => $weightData['family_weight'],
                    'quiet_weight' => $weightData['quiet_weight'],
                    'party_weight' => $weightData['party_weight'],
                ]);
            }

            DB::commit();
            
            // Clear cached weights in the scoring service
            $this->scoringService->clearWeightsCache();
            
            // Clear stats cache
            self::clearStatsCache();
            HandleInertiaRequests::forgetPublicMetricsCache();

            return back()->with('success', 'Scoring weights updated successfully! Click "Recalculate All Scores" to apply changes to hotels.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to update weights: ' . $e->getMessage()]);
        }
    }

    /**
     * Update metric visibility settings
     */
    public function updateVisibility(UpdateScoringVisibilityRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            foreach ($validated['metrics'] as $metricData) {
                ScoringWeight::where('id', $metricData['id'])->update([
                    'is_active' => $metricData['is_active'],
                    'is_visible' => $metricData['is_visible'],
                    'is_public' => $metricData['is_public'],
                ]);
            }

            DB::commit();

            // Active/visible flags affect the cached stats panel.
            self::clearStatsCache();
            $this->scoringService->clearWeightsCache();
            HandleInertiaRequests::forgetPublicMetricsCache();

            return back()->with('success', 'Visibility settings updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to update visibility: ' . $e->getMessage()]);
        }
    }

    /**
     * Update metric order
     */
    public function updateOrder(UpdateScoringOrderRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            foreach ($validated['order'] as $index => $id) {
                ScoringWeight::where('id', $id)->update(['order' => $index + 1]);
            }

            DB::commit();

            return back()->with('success', 'Metric order updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to update order: ' . $e->getMessage()]);
        }
    }

    /**
     * Store a new badge
     */
    public function storeBadge(BadgeRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::transaction(function () use ($validated) {
                Badge::create([
                    'name' => $validated['name'],
                    'slug' => Str::slug($validated['name']),
                    'description' => $validated['description'] ?? null,
                    'icon' => $validated['icon'] ?? null,
                    'color' => $validated['color'],
                    'criteria' => $validated['criteria'],
                    'priority' => $validated['priority'],
                    'is_active' => $validated['is_active'] ?? true,
                ]);
            });

            self::clearStatsCache();

            return back()->with('success', 'Badge created successfully!');
        } catch (\Throwable $e) {
            return back()->withErrors(['message' => 'Failed to create badge: ' . $e->getMessage()]);
        }
    }

    /**
     * Update an existing badge
     */
    public function updateBadge(BadgeRequest $request, Badge $badge)
    {
        $validated = $request->validated();

        try {
            DB::transaction(function () use ($validated, $badge) {
                $badge->update([
                    'name' => $validated['name'],
                    'slug' => Str::slug($validated['name']),
                    'description' => $validated['description'] ?? null,
                    'icon' => $validated['icon'] ?? null,
                    'color' => $validated['color'],
                    'criteria' => $validated['criteria'],
                    'priority' => $validated['priority'],
                    'is_active' => $validated['is_active'] ?? true,
                ]);
            });

            self::clearStatsCache();

            return back()->with('success', 'Badge updated successfully!');
        } catch (\Throwable $e) {
            return back()->withErrors(['message' => 'Failed to update badge: ' . $e->getMessage()]);
        }
    }

    /**
     * Delete a badge
     */
    public function destroyBadge(Badge $badge)
    {
        try {
            DB::transaction(function () use ($badge) {
                $badge->hotels()->detach();
                $badge->delete();
            });

            self::clearStatsCache();

            return back()->with('success', 'Badge deleted successfully!');
        } catch (\Throwable $e) {
            return back()->withErrors(['message' => 'Failed to delete badge: ' . $e->getMessage()]);
        }
    }

    /**
     * Toggle badge active status
     */
    public function toggleBadge(Badge $badge)
    {
        try {
            $badge->update(['is_active' => ! $badge->is_active]);
            self::clearStatsCache();

            return back()->with('success', 'Badge status updated!');
        } catch (\Throwable $e) {
            return back()->withErrors(['message' => 'Failed to toggle badge: ' . $e->getMessage()]);
        }
    }

    /**
     * Preview which hotels would receive a badge.
     *
     * Returns the full match count plus the first 10 hotels for display.
     */
    public function previewBadge(PreviewBadgeRequest $request)
    {
        $validated = $request->validated();

        $matching = $this->badgeCriteria->matchingHotels($validated['criteria']);

        return response()->json([
            'count'   => $matching->count(),
            'preview_limit' => 10,
            'hotels'  => $matching->take(10)->map(fn ($h) => [
                'id'            => $h->id,
                'name'          => $h->name,
                'overall_score' => $h->overall_score,
            ])->values(),
        ]);
    }

    /**
     * Apply badge to all matching hotels (queued)
     */
    public function applyBadgeToHotels(Badge $badge)
    {
        $userId = request()->user()?->id;
        
        // Rate limit check
        $key = 'admin-scoring-bulk:' . $userId;
        if (RateLimiter::tooManyAttempts($key, 1)) {
            $seconds = RateLimiter::availableIn($key);
            return back()->withErrors([
                'message' => "Please wait {$seconds} seconds before starting another bulk operation."
            ]);
        }
        RateLimiter::hit($key, 60);

        try {
            // Dispatch the job
            ApplyBadgesToHotels::dispatch($badge->id, $userId);

            return back()->with('success', "Badge assignment job queued! Check progress on this page.");
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Failed to queue badge job: ' . $e->getMessage()]);
        }
    }

    /**
     * Apply all active badges to all hotels (queued)
     */
    public function applyAllBadges()
    {
        $userId = request()->user()?->id;
        
        // Rate limit check
        $key = 'admin-scoring-bulk:' . $userId;
        if (RateLimiter::tooManyAttempts($key, 1)) {
            $seconds = RateLimiter::availableIn($key);
            return back()->withErrors([
                'message' => "Please wait {$seconds} seconds before starting another bulk operation."
            ]);
        }
        RateLimiter::hit($key, 60);

        try {
            // Dispatch the job for all badges
            ApplyBadgesToHotels::dispatch(null, $userId);

            return back()->with('success', "Badge assignment job queued for all active badges! Check progress on this page.");
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Failed to queue badges job: ' . $e->getMessage()]);
        }
    }

    /**
     * Recalculate all hotel scores (queued)
     */
    public function recalculateAllScores()
    {
        $userId = request()->user()?->id;
        
        // Rate limit check
        $key = 'admin-scoring-bulk:' . $userId;
        if (RateLimiter::tooManyAttempts($key, 1)) {
            $seconds = RateLimiter::availableIn($key);
            return back()->withErrors([
                'message' => "Please wait {$seconds} seconds before starting another bulk operation."
            ]);
        }
        RateLimiter::hit($key, 60);

        try {
            // Dispatch the job
            RecalculateHotelScores::dispatch(null, $userId);

            return back()->with('success', "Score recalculation job queued! Check progress on this page.");
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Failed to queue recalculation job: ' . $e->getMessage()]);
        }
    }

    /**
     * Get job progress status (for AJAX polling)
     */
    public function getJobProgress()
    {
        return response()->json([
            'recalculation' => Cache::get('scoring.recalculation.progress'),
            'badges' => Cache::get('scoring.badges.progress'),
        ]);
    }

    /**
     * Clear the stats cache (called by observers)
     */
    public static function clearStatsCache(): void
    {
        Cache::forget('admin.scoring.stats');
    }

}

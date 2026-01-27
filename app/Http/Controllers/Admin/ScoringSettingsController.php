<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\ApplyBadgesToHotels;
use App\Jobs\RecalculateHotelScores;
use App\Models\Badge;
use App\Models\Hotel;
use App\Models\ScoringWeight;
use App\Services\HotelScoringService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ScoringSettingsController extends Controller
{
    protected HotelScoringService $scoringService;

    public function __construct(HotelScoringService $scoringService)
    {
        $this->scoringService = $scoringService;
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

        // Available criteria for badge rules
        $availableCriteria = [
            ['key' => 'sunbed_ratio', 'label' => 'Sunbed to Guest Ratio', 'type' => 'number'],
            ['key' => 'sun_exposure_score', 'label' => 'Sun Exposure Score', 'type' => 'number'],
            ['key' => 'pool_size_sqm', 'label' => 'Pool Size (sqm)', 'type' => 'number'],
            ['key' => 'number_of_pools', 'label' => 'Number of Pools', 'type' => 'number'],
            ['key' => 'cleanliness_score', 'label' => 'Cleanliness Score', 'type' => 'number'],
            ['key' => 'atmosphere_score', 'label' => 'Atmosphere Score', 'type' => 'number'],
            ['key' => 'accessibility_score', 'label' => 'Accessibility Score', 'type' => 'number'],
            ['key' => 'family_score', 'label' => 'Family Score', 'type' => 'number'],
            ['key' => 'luxury_score', 'label' => 'Luxury Score', 'type' => 'number'],
            ['key' => 'overall_score', 'label' => 'Overall Score', 'type' => 'number'],
            ['key' => 'has_infinity_pool', 'label' => 'Has Infinity Pool', 'type' => 'boolean'],
            ['key' => 'has_heated_pool', 'label' => 'Has Heated Pool', 'type' => 'boolean'],
            ['key' => 'has_kids_pool', 'label' => 'Has Kids Pool', 'type' => 'boolean'],
            ['key' => 'has_swim_up_bar', 'label' => 'Has Swim-Up Bar', 'type' => 'boolean'],
            ['key' => 'has_private_cabanas', 'label' => 'Has Private Cabanas', 'type' => 'boolean'],
            ['key' => 'has_lifeguard', 'label' => 'Has Lifeguard', 'type' => 'boolean'],
            ['key' => 'towels_included', 'label' => 'Towels Included', 'type' => 'boolean'],
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
    public function updateWeights(Request $request)
    {
        $validated = $request->validate([
            'weights' => 'required|array',
            'weights.*.id' => 'required|exists:scoring_weights,id',
            'weights.*.weight' => 'required|numeric|min:0|max:5',
            'weights.*.family_weight' => 'required|numeric|min:0|max:5',
            'weights.*.quiet_weight' => 'required|numeric|min:0|max:5',
            'weights.*.party_weight' => 'required|numeric|min:0|max:5',
        ]);

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

            return back()->with('success', 'Scoring weights updated successfully! Click "Recalculate All Scores" to apply changes to hotels.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to update weights: ' . $e->getMessage()]);
        }
    }

    /**
     * Update metric visibility settings
     */
    public function updateVisibility(Request $request)
    {
        $validated = $request->validate([
            'metrics' => 'required|array',
            'metrics.*.id' => 'required|exists:scoring_weights,id',
            'metrics.*.is_active' => 'required|boolean',
            'metrics.*.is_visible' => 'required|boolean',
            'metrics.*.is_public' => 'required|boolean',
        ]);

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

            return back()->with('success', 'Visibility settings updated successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to update visibility: ' . $e->getMessage()]);
        }
    }

    /**
     * Update metric order
     */
    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'order' => 'required|array',
            'order.*' => 'required|exists:scoring_weights,id',
        ]);

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
    public function storeBadge(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'icon' => 'nullable|string|max:50',
            'color' => 'required|string|max:20',
            'criteria' => 'required|array|min:1',
            'criteria.*.field' => 'required|string',
            'criteria.*.operator' => 'required|in:>,>=,<,<=,==,!=',
            'criteria.*.value' => 'required',
            'priority' => 'required|integer|min:0|max:100',
            'is_active' => 'boolean',
        ]);

        try {
            $badge = Badge::create([
                'name' => $validated['name'],
                'slug' => Str::slug($validated['name']),
                'description' => $validated['description'],
                'icon' => $validated['icon'],
                'color' => $validated['color'],
                'criteria' => $validated['criteria'],
                'priority' => $validated['priority'],
                'is_active' => $validated['is_active'] ?? true,
            ]);

            return back()->with('success', 'Badge created successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Failed to create badge: ' . $e->getMessage()]);
        }
    }

    /**
     * Update an existing badge
     */
    public function updateBadge(Request $request, Badge $badge)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'icon' => 'nullable|string|max:50',
            'color' => 'required|string|max:20',
            'criteria' => 'required|array|min:1',
            'criteria.*.field' => 'required|string',
            'criteria.*.operator' => 'required|in:>,>=,<,<=,==,!=',
            'criteria.*.value' => 'required',
            'priority' => 'required|integer|min:0|max:100',
            'is_active' => 'boolean',
        ]);

        try {
            $badge->update([
                'name' => $validated['name'],
                'slug' => Str::slug($validated['name']),
                'description' => $validated['description'],
                'icon' => $validated['icon'],
                'color' => $validated['color'],
                'criteria' => $validated['criteria'],
                'priority' => $validated['priority'],
                'is_active' => $validated['is_active'] ?? true,
            ]);

            return back()->with('success', 'Badge updated successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Failed to update badge: ' . $e->getMessage()]);
        }
    }

    /**
     * Delete a badge
     */
    public function destroyBadge(Badge $badge)
    {
        try {
            // Detach from all hotels first
            $badge->hotels()->detach();
            $badge->delete();

            return back()->with('success', 'Badge deleted successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Failed to delete badge: ' . $e->getMessage()]);
        }
    }

    /**
     * Toggle badge active status
     */
    public function toggleBadge(Badge $badge)
    {
        try {
            $badge->update(['is_active' => !$badge->is_active]);

            return back()->with('success', 'Badge status updated!');
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Failed to toggle badge: ' . $e->getMessage()]);
        }
    }

    /**
     * Preview which hotels would receive a badge
     */
    public function previewBadge(Request $request)
    {
        $validated = $request->validate([
            'criteria' => 'required|array|min:1',
            'criteria.*.field' => 'required|string',
            'criteria.*.operator' => 'required|in:>,>=,<,<=,==,!=',
            'criteria.*.value' => 'required',
        ]);

        $matchingHotels = $this->getHotelsMatchingCriteria($validated['criteria']);

        return response()->json([
            'count' => $matchingHotels->count(),
            'hotels' => $matchingHotels->take(10)->map(fn($h) => [
                'id' => $h->id,
                'name' => $h->name,
                'overall_score' => $h->overall_score,
            ]),
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

    /**
     * Get hotels matching criteria
     */
    protected function getHotelsMatchingCriteria(array $criteria)
    {
        $query = Hotel::with('poolCriteria');

        foreach ($criteria as $criterion) {
            $field = $criterion['field'];
            $operator = $criterion['operator'];
            $value = $criterion['value'];

            // Handle boolean fields
            if (in_array($field, ['has_infinity_pool', 'has_heated_pool', 'has_kids_pool', 'has_swim_up_bar', 'has_private_cabanas', 'has_lifeguard', 'towels_included'])) {
                $query->whereHas('poolCriteria', function ($q) use ($field, $value) {
                    $q->where($field, filter_var($value, FILTER_VALIDATE_BOOLEAN));
                });
            }
            // Handle hotel-level scores
            elseif (in_array($field, ['overall_score', 'family_score', 'quiet_score', 'party_score'])) {
                $query->where($field, $operator, $value);
            }
            // Handle pool criteria fields
            else {
                $query->whereHas('poolCriteria', function ($q) use ($field, $operator, $value) {
                    $q->where($field, $operator, $value);
                });
            }
        }

        return $query->get();
    }
}

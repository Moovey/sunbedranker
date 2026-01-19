<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use App\Models\Hotel;
use App\Models\ScoringWeight;
use App\Services\HotelScoringService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        
        // Get stats
        $stats = [
            'total_metrics' => $weights->count(),
            'active_metrics' => $weights->where('is_active', true)->count(),
            'visible_metrics' => $weights->where('is_visible', true)->count(),
            'total_badges' => $badges->count(),
            'active_badges' => $badges->where('is_active', true)->count(),
            'hotels_with_badges' => DB::table('badge_hotel')->distinct('hotel_id')->count(),
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
     * Apply badge to all matching hotels
     */
    public function applyBadgeToHotels(Badge $badge)
    {
        try {
            $matchingHotels = $this->getHotelsMatchingCriteria($badge->criteria);
            
            // Sync hotels - this will add new ones and remove non-matching ones
            $badge->hotels()->sync($matchingHotels->pluck('id'));

            return back()->with('success', "Badge applied to {$matchingHotels->count()} hotels!");
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Failed to apply badge: ' . $e->getMessage()]);
        }
    }

    /**
     * Apply all active badges to all hotels
     */
    public function applyAllBadges()
    {
        try {
            $badges = Badge::where('is_active', true)->get();
            $totalAssignments = 0;

            foreach ($badges as $badge) {
                $matchingHotels = $this->getHotelsMatchingCriteria($badge->criteria);
                $badge->hotels()->sync($matchingHotels->pluck('id'));
                $totalAssignments += $matchingHotels->count();
            }

            return back()->with('success', "All badges applied! Total assignments: {$totalAssignments}");
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Failed to apply badges: ' . $e->getMessage()]);
        }
    }

    /**
     * Recalculate all hotel scores
     */
    public function recalculateAllScores()
    {
        try {
            $hotels = Hotel::with('poolCriteria')->get();
            $count = 0;

            foreach ($hotels as $hotel) {
                if ($hotel->poolCriteria) {
                    $this->scoringService->calculateAndUpdateScores($hotel);
                    $count++;
                }
            }

            return back()->with('success', "Recalculated scores for {$count} hotels!");
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Failed to recalculate scores: ' . $e->getMessage()]);
        }
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

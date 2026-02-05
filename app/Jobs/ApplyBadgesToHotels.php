<?php

namespace App\Jobs;

use App\Models\Badge;
use App\Models\Hotel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ApplyBadgesToHotels implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The number of seconds the job can run before timing out.
     */
    public int $timeout = 300; // 5 minutes

    /**
     * Specific badge ID to apply (null = all active badges)
     */
    protected ?int $badgeId;

    /**
     * User ID who initiated the job
     */
    protected ?int $initiatedBy;

    /**
     * Create a new job instance.
     */
    public function __construct(?int $badgeId = null, ?int $initiatedBy = null)
    {
        $this->badgeId = $badgeId;
        $this->initiatedBy = $initiatedBy;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $cacheKey = 'scoring.badges.progress';

        // Get badges to process
        if ($this->badgeId) {
            $badges = Badge::where('id', $this->badgeId)->where('is_active', true)->get();
        } else {
            $badges = Badge::where('is_active', true)->get();
        }

        $totalBadges = $badges->count();
        $totalAssignments = 0;
        $processedBadges = 0;

        Log::info('ApplyBadgesToHotels: Starting job', [
            'badge_count' => $totalBadges,
            'specific_badge' => $this->badgeId,
            'initiated_by' => $this->initiatedBy,
        ]);

        // Initialize progress
        Cache::put($cacheKey, [
            'status' => 'processing',
            'total_badges' => $totalBadges,
            'processed_badges' => 0,
            'total_assignments' => 0,
            'started_at' => now()->toIso8601String(),
        ], 3600);

        foreach ($badges as $badge) {
            try {
                $matchingHotels = $this->getHotelsMatchingCriteria($badge->criteria);
                $badge->hotels()->sync($matchingHotels->pluck('id'));
                
                $totalAssignments += $matchingHotels->count();
                $processedBadges++;

                // Update progress
                Cache::put($cacheKey, [
                    'status' => 'processing',
                    'total_badges' => $totalBadges,
                    'processed_badges' => $processedBadges,
                    'total_assignments' => $totalAssignments,
                    'current_badge' => $badge->name,
                    'started_at' => Cache::get($cacheKey)['started_at'] ?? now()->toIso8601String(),
                ], 3600);

            } catch (\Exception $e) {
                Log::error('ApplyBadgesToHotels: Failed to process badge', [
                    'badge_id' => $badge->id,
                    'badge_name' => $badge->name,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        // Final status
        Cache::put($cacheKey, [
            'status' => 'completed',
            'total_badges' => $totalBadges,
            'processed_badges' => $processedBadges,
            'total_assignments' => $totalAssignments,
            'started_at' => Cache::get($cacheKey)['started_at'] ?? now()->toIso8601String(),
            'completed_at' => now()->toIso8601String(),
        ], 3600);

        // Clear related caches
        Cache::forget('admin.scoring.stats');

        Log::info('ApplyBadgesToHotels: Completed', [
            'badges_processed' => $processedBadges,
            'total_assignments' => $totalAssignments,
        ]);
    }

    /**
     * Get hotels matching criteria
     */
    protected function getHotelsMatchingCriteria(array $criteria)
    {
        $query = Hotel::with('poolCriteria');

        // Boolean fields in pool_criteria
        $booleanFields = [
            'has_infinity_pool', 'has_rooftop_pool', 'has_pool_bar', 'has_waiter_service',
            'has_accessibility_ramp', 'has_pool_hoist', 'has_step_free_access', 'has_elevator_to_rooftop',
            'has_kids_pool', 'has_splash_park', 'has_waterslide', 'has_lifeguard',
            'has_luxury_cabanas', 'has_cabana_service', 'has_heated_pool', 'has_jacuzzi',
            'has_adult_sun_terrace', 'is_adults_only', 'has_entertainment'
        ];
        
        // Number fields in pool_criteria
        $poolCriteriaNumberFields = [
            'sunbed_count', 'sunbed_to_guest_ratio', 'pool_size_sqm', 'number_of_pools',
            'cleanliness_rating', 'sunbed_condition_rating', 'tiling_condition_rating'
        ];
        
        // Hotel-level score fields
        $hotelScoreFields = ['overall_score', 'family_score', 'quiet_score', 'party_score'];

        foreach ($criteria as $criterion) {
            $field = $criterion['field'];
            $operator = $criterion['operator'];
            $value = $criterion['value'];

            // Handle boolean fields in pool_criteria
            if (in_array($field, $booleanFields)) {
                $query->whereHas('poolCriteria', function ($q) use ($field, $value) {
                    $q->where($field, filter_var($value, FILTER_VALIDATE_BOOLEAN));
                });
            }
            // Handle hotel-level scores
            elseif (in_array($field, $hotelScoreFields)) {
                $query->where($field, $operator, $value);
            }
            // Handle pool criteria number fields
            elseif (in_array($field, $poolCriteriaNumberFields)) {
                $query->whereHas('poolCriteria', function ($q) use ($field, $operator, $value) {
                    $q->where($field, $operator, $value);
                });
            }
            // Default: try pool_criteria table
            else {
                $query->whereHas('poolCriteria', function ($q) use ($field, $operator, $value) {
                    $q->where($field, $operator, $value);
                });
            }
        }

        return $query->get();
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Cache::put('scoring.badges.progress', [
            'status' => 'failed',
            'error' => $exception->getMessage(),
            'failed_at' => now()->toIso8601String(),
        ], 3600);

        Log::error('ApplyBadgesToHotels: Job failed', [
            'error' => $exception->getMessage(),
        ]);
    }
}

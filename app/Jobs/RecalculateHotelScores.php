<?php

namespace App\Jobs;

use App\Models\Hotel;
use App\Services\HotelScoringService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class RecalculateHotelScores implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The number of seconds the job can run before timing out.
     */
    public int $timeout = 600; // 10 minutes

    /**
     * Optional hotel IDs to recalculate (null = all hotels)
     */
    protected ?array $hotelIds;

    /**
     * User ID who initiated the job (for notifications)
     */
    protected ?int $initiatedBy;

    /**
     * Create a new job instance.
     */
    public function __construct(?array $hotelIds = null, ?int $initiatedBy = null)
    {
        $this->hotelIds = $hotelIds;
        $this->initiatedBy = $initiatedBy;
    }

    /**
     * Execute the job.
     */
    public function handle(HotelScoringService $scoringService): void
    {
        $cacheKey = 'scoring.recalculation.progress';
        
        // Get hotels to process
        $query = Hotel::with('poolCriteria');
        
        if ($this->hotelIds) {
            $query->whereIn('id', $this->hotelIds);
        }
        
        $hotels = $query->get();
        $total = $hotels->count();
        $processed = 0;
        $errors = 0;

        Log::info('RecalculateHotelScores: Starting job', [
            'total_hotels' => $total,
            'specific_ids' => $this->hotelIds ? count($this->hotelIds) : 'all',
            'initiated_by' => $this->initiatedBy,
        ]);

        // Initialize progress
        Cache::put($cacheKey, [
            'status' => 'processing',
            'total' => $total,
            'processed' => 0,
            'errors' => 0,
            'started_at' => now()->toIso8601String(),
        ], 3600); // 1 hour TTL

        foreach ($hotels as $hotel) {
            try {
                if ($hotel->poolCriteria) {
                    $scoringService->calculateAndUpdateScores($hotel);
                }
                $processed++;
            } catch (\Exception $e) {
                $errors++;
                Log::error('RecalculateHotelScores: Failed to process hotel', [
                    'hotel_id' => $hotel->id,
                    'hotel_name' => $hotel->name,
                    'error' => $e->getMessage(),
                ]);
            }

            // Update progress every 10 hotels
            if ($processed % 10 === 0 || $processed === $total) {
                Cache::put($cacheKey, [
                    'status' => 'processing',
                    'total' => $total,
                    'processed' => $processed,
                    'errors' => $errors,
                    'started_at' => Cache::get($cacheKey)['started_at'] ?? now()->toIso8601String(),
                ], 3600);
            }
        }

        // Final status
        Cache::put($cacheKey, [
            'status' => 'completed',
            'total' => $total,
            'processed' => $processed,
            'errors' => $errors,
            'started_at' => Cache::get($cacheKey)['started_at'] ?? now()->toIso8601String(),
            'completed_at' => now()->toIso8601String(),
        ], 3600);

        // Clear related caches
        Cache::forget('admin.scoring.stats');

        Log::info('RecalculateHotelScores: Completed', [
            'processed' => $processed,
            'errors' => $errors,
        ]);
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Cache::put('scoring.recalculation.progress', [
            'status' => 'failed',
            'error' => $exception->getMessage(),
            'failed_at' => now()->toIso8601String(),
        ], 3600);

        Log::error('RecalculateHotelScores: Job failed', [
            'error' => $exception->getMessage(),
        ]);
    }
}

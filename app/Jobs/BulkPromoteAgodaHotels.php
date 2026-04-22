<?php

namespace App\Jobs;

use App\Models\AgodaHotel;
use App\Services\AgodaPromotionService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Bulk-promote Agoda directory entries into curated hotels.
 *
 * Filters supported:
 *  - country (countryisocode, required to avoid accidentally promoting EVERYTHING)
 *  - star_rating
 *  - accommodation_type
 *  - limit (hard cap on how many to promote, default 500, max 5000)
 *
 * Progress is written to cache key `agoda_directory_bulk_promote` so the UI
 * can poll it like the CSV-import progress.
 */
class BulkPromoteAgodaHotels implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 3600; // 1 hour
    public int $tries = 1;

    public const PROGRESS_KEY = 'agoda_directory_bulk_promote';

    /** @param array<string,mixed> $filters */
    public function __construct(public array $filters)
    {
    }

    public function handle(AgodaPromotionService $service): void
    {
        $filters = $this->filters;
        $limit   = max(1, min(5000, (int) ($filters['limit'] ?? 500)));

        $query = $this->buildQuery($filters)->limit($limit);

        $total = (clone $query)->count();

        if ($total === 0) {
            $this->updateProgress('completed', 0, 0, 0, 0, 'No hotels matched the filters.');
            return;
        }

        $this->updateProgress('running', 0, $total, 0, 0, "Promoting {$total} hotels...");

        $created = 0;
        $skipped = 0;
        $failed  = 0;
        $processed = 0;

        // chunkById is safe with the limit because we re-query inside chunks
        // using the same filters but track a progress counter externally.
        try {
            $query->orderBy('id')->chunkById(50, function ($hotels) use ($service, &$created, &$skipped, &$failed, &$processed, $total, $limit) {
                foreach ($hotels as $agodaHotel) {
                    if ($processed >= $limit) {
                        return false;
                    }

                    try {
                        $result = $service->promote($agodaHotel);
                        match ($result['status']) {
                            'created', 'restored', 'relinked' => $created++,
                            default => $skipped++,
                        };
                    } catch (Throwable $e) {
                        $failed++;
                        Log::warning('Bulk promote: hotel failed', [
                            'agoda_hotel_id' => $agodaHotel->agoda_hotel_id,
                            'error' => $e->getMessage(),
                        ]);
                    }

                    $processed++;

                    // Update progress every 10 hotels to keep cache writes reasonable
                    if ($processed % 10 === 0 || $processed === $total) {
                        $this->updateProgress(
                            'running', $processed, $total, $created, $failed,
                            "Promoted {$created} of {$processed} processed..."
                        );
                    }
                }
            });
        } catch (Throwable $e) {
            Log::error('Bulk promote: aborted', ['error' => $e->getMessage()]);
            $this->updateProgress('failed', $processed, $total, $created, $failed, 'Aborted: ' . $e->getMessage());
            return;
        }

        Cache::forget('agoda_directory_promoted');
        Cache::forget('admin.stats.total_hotels');

        $this->updateProgress(
            'completed', $processed, $total, $created, $failed,
            "Done. Created/linked: {$created}. Skipped: {$skipped}. Failed: {$failed}."
        );
    }

    public function failed(Throwable $e): void
    {
        $this->updateProgress('failed', 0, 0, 0, 0, 'Job failed: ' . $e->getMessage());
    }

    /** @param array<string,mixed> $filters */
    protected function buildQuery(array $filters)
    {
        // country is REQUIRED at the controller level; double-check here as defense.
        $query = AgodaHotel::query()
            ->whereNull('promoted_hotel_id')
            ->where('countryisocode', $filters['country']);

        if (!empty($filters['star_rating'])) {
            $query->where('star_rating', $filters['star_rating']);
        }
        if (!empty($filters['accommodation_type'])) {
            $query->where('accommodation_type', $filters['accommodation_type']);
        }

        return $query;
    }

    protected function updateProgress(
        string $status,
        int $processed,
        int $total,
        int $created,
        int $failed,
        string $message,
    ): void {
        Cache::put(self::PROGRESS_KEY, [
            'status'    => $status,
            'processed' => $processed,
            'total'     => $total,
            'created'   => $created,
            'failed'    => $failed,
            'message'   => $message,
            'updated_at'=> now()->toIso8601String(),
        ], now()->addHours(2));
    }
}

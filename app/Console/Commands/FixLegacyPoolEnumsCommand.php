<?php

namespace App\Console\Commands;

use App\Models\Hotel;
use App\Models\PoolCriteria;
use App\Services\HotelScoringService;
use Illuminate\Console\Command;

class FixLegacyPoolEnumsCommand extends Command
{
    protected $signature = 'hotels:fix-legacy-pool-enums
                            {--dry-run : Show impacted records without writing changes}
                            {--force : Skip confirmation prompt}
                            {--chunk=500 : Number of rows to process per chunk}
                            {--skip-recalculate-scores : Do not recalculate hotel scores after updates}';

    protected $description = 'One-time fix for legacy pool criteria enum values that fail current validation';

    private const ENUM_MAPS = [
        'sun_exposure' => [
            'mostly_sunny' => 'all_day',
            'morning' => 'morning_only',
            'afternoon' => 'afternoon_only',
            'limited' => 'partial_shade',
        ],
        'pool_size_category' => [
            'olympic' => 'very_large',
        ],
        'atmosphere' => [
            'mixed' => 'relaxed',
        ],
        'music_level' => [
            'soft' => 'low',
        ],
    ];

    private const ARRAY_MAPS = [
        'pool_types' => [
            'adults_only' => 'adult_only',
        ],
        'sunny_areas' => [
            'terrace' => 'sun_terrace',
        ],
        'sunbed_types' => [
            'bali_beds' => 'balinese_beds',
        ],
        'shade_options' => [
            'natural_trees' => 'trees',
        ],
        'entertainment_types' => [
            'aqua_gym' => 'aqua_aerobics',
            'games' => 'pool_games',
        ],
    ];

    public function handle(): int
    {
        $chunkSize = max(1, (int) $this->option('chunk'));
        $dryRun = (bool) $this->option('dry-run');

        $query = $this->buildLegacyQuery();
        $total = (clone $query)->count();

        if ($total === 0) {
            $this->info('No legacy enum values found. Nothing to fix.');
            return Command::SUCCESS;
        }

        $this->warn("Found {$total} pool_criteria rows with legacy enum values.");

        if ($dryRun) {
            $this->showDryRunPreview($query);
            return Command::SUCCESS;
        }

        if (!$this->option('force') && !$this->confirm('Apply enum normalization now?')) {
            $this->info('Cancelled.');
            return Command::SUCCESS;
        }

        $updatedRows = 0;
        $updatedHotels = [];

        $query->orderBy('id')->chunkById($chunkSize, function ($rows) use (&$updatedRows, &$updatedHotels) {
            foreach ($rows as $row) {
                $updates = $this->buildUpdates($row);

                if (empty($updates)) {
                    continue;
                }

                $row->update($updates);
                $updatedRows++;
                $updatedHotels[$row->hotel_id] = true;
            }
        });

        $this->info("Updated {$updatedRows} pool_criteria row(s).");
        $this->info('Updated hotel count: ' . count($updatedHotels));

        if (!$this->option('skip-recalculate-scores') && !empty($updatedHotels)) {
            $scoringService = app(HotelScoringService::class);
            $hotelIds = array_keys($updatedHotels);

            Hotel::whereIn('id', $hotelIds)
                ->chunkById($chunkSize, function ($hotels) use ($scoringService) {
                    foreach ($hotels as $hotel) {
                        $scoringService->calculateAndUpdateScores($hotel);
                    }
                });

            $this->info('Recalculated scores for updated hotels.');
        }

        $this->info('Done.');

        return Command::SUCCESS;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function buildLegacyQuery()
    {
        $query = PoolCriteria::query();

        return $query->where(function ($q) {
            foreach (self::ENUM_MAPS as $field => $map) {
                $q->orWhereIn($field, array_keys($map));
            }

            foreach (self::ARRAY_MAPS as $field => $map) {
                foreach (array_keys($map) as $legacyValue) {
                    $q->orWhereJsonContains($field, $legacyValue);
                }
            }
        });
    }

    private function buildUpdates(PoolCriteria $row): array
    {
        $updates = [];

        foreach (self::ENUM_MAPS as $field => $map) {
            $current = $row->{$field};
            if ($current !== null && isset($map[$current])) {
                $updates[$field] = $map[$current];
            }
        }

        foreach (self::ARRAY_MAPS as $field => $map) {
            $currentValues = $row->{$field};
            if (!is_array($currentValues)) {
                continue;
            }

            $normalized = array_values(array_unique(array_map(
                fn ($value) => $map[$value] ?? $value,
                $currentValues
            )));

            if ($normalized !== $currentValues) {
                $updates[$field] = $normalized;
            }
        }

        return $updates;
    }

    /**
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     */
    private function showDryRunPreview($query): void
    {
        $rows = (clone $query)
            ->select([
                'id',
                'hotel_id',
                'sun_exposure',
                'pool_size_category',
                'atmosphere',
                'music_level',
                'pool_types',
                'sunny_areas',
                'sunbed_types',
                'shade_options',
                'entertainment_types',
            ])
            ->orderBy('id')
            ->limit(25)
            ->get();

        $this->table(
            [
                'id',
                'hotel_id',
                'sun_exposure',
                'pool_size_category',
                'atmosphere',
                'music_level',
                'pool_types',
                'sunny_areas',
                'sunbed_types',
                'shade_options',
                'entertainment_types',
            ],
            $rows->map(function ($row) {
                return [
                    $row->id,
                    $row->hotel_id,
                    $row->sun_exposure,
                    $row->pool_size_category,
                    $row->atmosphere,
                    $row->music_level,
                    json_encode($row->pool_types),
                    json_encode($row->sunny_areas),
                    json_encode($row->sunbed_types),
                    json_encode($row->shade_options),
                    json_encode($row->entertainment_types),
                ];
            })->toArray()
        );

        $this->line('Dry run only. No changes were written.');
    }
}

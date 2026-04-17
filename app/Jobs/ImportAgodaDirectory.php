<?php

namespace App\Jobs;

use App\Models\AgodaHotel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use League\Csv\Reader;

class ImportAgodaDirectory implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 3600;
    public int $tries = 1;

    protected string $filePath;
    protected string $disk;

    public function __construct(string $filePath, string $disk = 'local')
    {
        $this->filePath = $filePath;
        $this->disk = $disk;
    }

    public function handle(): void
    {
        $this->updateProgress('running', 0, 0, 'Starting import...');

        $fullPath = $this->disk === 'raw'
            ? $this->filePath
            : Storage::disk($this->disk)->path($this->filePath);

        if (!file_exists($fullPath)) {
            $this->updateProgress('failed', 0, 0, 'File not found: ' . $this->filePath);
            Log::error('AgodaDirectory import: file not found', ['path' => $fullPath]);
            return;
        }

        try {
            $csv = Reader::from($fullPath);
            $csv->setHeaderOffset(0);

            $header = $csv->getHeader();
            $header = array_map(fn ($h) => strtolower(trim($h)), $header);

            $totalRecords = $csv->count();
            $this->updateProgress('running', 0, $totalRecords, "Processing {$totalRecords} hotels...");

            $batch = [];
            $processed = 0;
            $batchSize = 500;

            foreach ($csv->getRecords($header) as $record) {
                $agodaId = (int) ($record['hotel_id'] ?? 0);
                if ($agodaId <= 0) {
                    $processed++;
                    continue;
                }

                $batch[] = [
                    'agoda_hotel_id'        => $agodaId,
                    'chain_id'              => $this->clampedUnsignedInt($record['chain_id'] ?? null),
                    'chain_name'            => $this->nullableString($record['chain_name'] ?? null, 150),
                    'brand_id'              => $this->clampedUnsignedInt($record['brand_id'] ?? null),
                    'brand_name'            => $this->nullableString($record['brand_name'] ?? null, 150),
                    'hotel_name'            => mb_substr(trim($record['hotel_name'] ?? 'Unknown'), 0, 300),
                    'hotel_formerly_name'   => $this->nullableString($record['hotel_formerly_name'] ?? null, 300),
                    'hotel_translated_name' => $this->nullableString($record['hotel_translated_name'] ?? null, 300),
                    'addressline1'          => $this->nullableString($record['addressline1'] ?? null, 500),
                    'addressline2'          => $this->nullableString($record['addressline2'] ?? null, 500),
                    'zipcode'               => $this->nullableString($record['zipcode'] ?? null, 20),
                    'city'                  => $this->nullableString($record['city'] ?? null, 150),
                    'state'                 => $this->nullableString($record['state'] ?? null, 150),
                    'country'               => $this->nullableString($record['country'] ?? null, 100),
                    'countryisocode'        => $this->nullableString($record['countryisocode'] ?? null, 5),
                    'star_rating'           => $this->clampedCoordinate($record['star_rating'] ?? null, 0, 5),
                    'longitude'             => $this->clampedCoordinate($record['longitude'] ?? null, -180, 180),
                    'latitude'              => $this->clampedCoordinate($record['latitude'] ?? null, -90, 90),
                    'url'                   => $this->nullableString($record['url'] ?? null, 65535),
                    'checkin'               => $this->nullableString($record['checkin'] ?? null, 20),
                    'checkout'              => $this->nullableString($record['checkout'] ?? null, 20),
                    'numberrooms'           => $this->clampedSmallInt($record['numberrooms'] ?? null),
                    'numberfloors'          => $this->clampedSmallInt($record['numberfloors'] ?? null),
                    'yearopened'            => $this->clampedSmallInt($record['yearopened'] ?? null),
                    'yearrenovated'         => $this->clampedSmallInt($record['yearrenovated'] ?? null),
                    'photo1'                => $this->nullableString($record['photo1'] ?? null, 65535),
                    'photo2'                => $this->nullableString($record['photo2'] ?? null, 65535),
                    'photo3'                => $this->nullableString($record['photo3'] ?? null, 65535),
                    'photo4'                => $this->nullableString($record['photo4'] ?? null, 65535),
                    'photo5'                => $this->nullableString($record['photo5'] ?? null, 65535),
                    'overview'              => $this->nullableString($record['overview'] ?? null, 65535),
                    'rates_from'            => $this->nullableDecimal($record['rates_from'] ?? null),
                    'continent_id'          => $this->clampedTinyInt($record['continent_id'] ?? null),
                    'continent_name'        => $this->nullableString($record['continent_name'] ?? null, 50),
                    'city_id'               => $this->clampedUnsignedInt($record['city_id'] ?? null),
                    'country_id'            => $this->clampedUnsignedInt($record['country_id'] ?? null),
                    'number_of_reviews'     => max(0, (int) ($record['number_of_reviews'] ?? 0)),
                    'rating_average'        => $this->nullableDecimal($record['rating_average'] ?? null),
                    'rates_currency'        => $this->nullableString($record['rates_currency'] ?? null, 10),
                    'rates_from_exclusive'  => $this->nullableDecimal($record['rates_from_exclusive'] ?? null),
                    'accommodation_type'    => $this->nullableString($record['accommodation_type'] ?? null, 100),
                    'created_at'            => now(),
                    'updated_at'            => now(),
                ];

                if (count($batch) >= $batchSize) {
                    $this->insertBatch($batch, $processed, $totalRecords);
                    $processed += count($batch);
                    $batch = [];
                    $this->updateProgress('running', $processed, $totalRecords, "Processed {$processed} / {$totalRecords}...");
                }
            }

            // Insert remaining
            if (!empty($batch)) {
                $this->insertBatch($batch, $processed, $totalRecords);
                $processed += count($batch);
            }

            $this->updateProgress('completed', $processed, $totalRecords, "Import complete. {$processed} hotels processed.");
            Log::info('AgodaDirectory import complete', ['total' => $processed]);

        } catch (\Throwable $e) {
            $this->updateProgress('failed', 0, 0, 'Import failed: ' . $e->getMessage());
            Log::error('AgodaDirectory import failed', [
                'error' => $e->getMessage(),
                'file' => $this->filePath,
            ]);
            throw $e;
        }
    }

    protected function insertBatch(array &$batch, int &$processed, int $totalRecords): void
    {
        try {
        // Use upsert to handle duplicates (re-imports update existing rows)
        AgodaHotel::upsert(
            $batch,
            ['agoda_hotel_id'],
            [
                'chain_id', 'chain_name', 'brand_id', 'brand_name',
                'hotel_name', 'hotel_formerly_name', 'hotel_translated_name',
                'addressline1', 'addressline2', 'zipcode', 'city', 'state', 'country',
                'countryisocode', 'star_rating', 'longitude', 'latitude', 'url',
                'checkin', 'checkout', 'numberrooms', 'numberfloors',
                'yearopened', 'yearrenovated',
                'photo1', 'photo2', 'photo3', 'photo4', 'photo5',
                'overview', 'rates_from', 'continent_id', 'continent_name',
                'city_id', 'country_id', 'number_of_reviews', 'rating_average',
                'rates_currency', 'rates_from_exclusive', 'accommodation_type',
                'updated_at',
            ]
        );
        } catch (\Throwable $e) {
            Log::warning('AgodaDirectory batch failed, inserting individually', [
                'error' => $e->getMessage(),
                'batch_size' => count($batch),
            ]);
            // Fallback: insert one by one to skip bad rows
            foreach ($batch as $row) {
                try {
                    AgodaHotel::upsert([$row], ['agoda_hotel_id'], [
                        'chain_id', 'chain_name', 'brand_id', 'brand_name',
                        'hotel_name', 'hotel_formerly_name', 'hotel_translated_name',
                        'addressline1', 'addressline2', 'zipcode', 'city', 'state', 'country',
                        'countryisocode', 'star_rating', 'longitude', 'latitude', 'url',
                        'checkin', 'checkout', 'numberrooms', 'numberfloors',
                        'yearopened', 'yearrenovated',
                        'photo1', 'photo2', 'photo3', 'photo4', 'photo5',
                        'overview', 'rates_from', 'continent_id', 'continent_name',
                        'city_id', 'country_id', 'number_of_reviews', 'rating_average',
                        'rates_currency', 'rates_from_exclusive', 'accommodation_type',
                        'updated_at',
                    ]);
                } catch (\Throwable $rowErr) {
                    Log::debug('AgodaDirectory row skipped', [
                        'hotel_id' => $row['agoda_hotel_id'] ?? 'unknown',
                        'error' => $rowErr->getMessage(),
                    ]);
                }
            }
        }
    }

    protected function updateProgress(string $status, int $processed, int $total, string $message): void
    {
        Cache::put('agoda_directory_import', [
            'status' => $status,
            'processed' => $processed,
            'total' => $total,
            'message' => $message,
            'updated_at' => now()->toIso8601String(),
        ], now()->addHours(2));
    }

    protected function nullableInt($value): ?int
    {
        if ($value === null || $value === '' || $value === '0' || $value === 0) {
            return null;
        }
        $int = (int) $value;
        return $int > 0 ? $int : null;
    }

    protected function clampedSmallInt($value): ?int
    {
        $int = $this->nullableInt($value);
        return ($int !== null && $int <= 65535) ? $int : null;
    }

    protected function clampedTinyInt($value): ?int
    {
        $int = $this->nullableInt($value);
        return ($int !== null && $int <= 255) ? $int : null;
    }

    protected function clampedUnsignedInt($value): ?int
    {
        $int = $this->nullableInt($value);
        return ($int !== null && $int <= 4294967295) ? $int : null;
    }

    protected function nullableString($value, int $maxLen = 255): ?string
    {
        if ($value === null || trim($value) === '') {
            return null;
        }
        return mb_substr(trim($value), 0, $maxLen);
    }

    protected function nullableDecimal($value): ?float
    {
        if ($value === null || $value === '' || !is_numeric($value)) {
            return null;
        }
        return (float) $value;
    }

    protected function clampedCoordinate($value, float $min, float $max): ?float
    {
        $float = $this->nullableDecimal($value);
        if ($float === null) return null;
        return ($float >= $min && $float <= $max) ? $float : null;
    }
}

<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class DownloadAgodaFromR2 implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 600; // 10 minutes for download
    public int $tries = 3;
    public int $backoff = 30;

    protected string $r2Path;

    public function __construct(string $r2Path)
    {
        $this->r2Path = $r2Path;
    }

    public function handle(): void
    {
        $dest = storage_path('app/agoda-import.csv');

        Cache::put('agoda_directory_import', [
            'status' => 'running',
            'processed' => 0,
            'total' => 0,
            'message' => 'Downloading from R2 storage...',
            'updated_at' => now()->toIso8601String(),
        ], now()->addHours(4));

        Log::info('AgodaDirectory: downloading from R2', ['path' => $this->r2Path]);

        $stream = Storage::disk('s3')->readStream($this->r2Path);
        if (!$stream) {
            Cache::put('agoda_directory_import', [
                'status' => 'failed',
                'processed' => 0,
                'total' => 0,
                'message' => 'Failed to open R2 stream: ' . $this->r2Path,
                'updated_at' => now()->toIso8601String(),
            ], now()->addHours(2));
            return;
        }

        $fp = fopen($dest, 'w');
        $downloadedBytes = 0;
        $chunkSize = 8 * 1024 * 1024;
        $lastUpdate = time();

        while (!feof($stream)) {
            $chunk = fread($stream, $chunkSize);
            if ($chunk === false) break;
            fwrite($fp, $chunk);
            $downloadedBytes += strlen($chunk);

            if (time() - $lastUpdate >= 5) {
                $dlMB = round($downloadedBytes / 1024 / 1024);
                Cache::put('agoda_directory_import', [
                    'status' => 'running',
                    'processed' => 0,
                    'total' => 0,
                    'message' => "Downloading from R2... {$dlMB} MB",
                    'updated_at' => now()->toIso8601String(),
                ], now()->addHours(4));
                $lastUpdate = time();
            }
        }

        fclose($fp);
        fclose($stream);

        $sizeMB = round(filesize($dest) / 1024 / 1024, 1);
        Log::info("AgodaDirectory: downloaded {$sizeMB} MB from R2");

        // Now dispatch the first chunk import job
        Cache::put('agoda_directory_import', [
            'status' => 'running',
            'processed' => 0,
            'total' => 0,
            'message' => "Downloaded {$sizeMB} MB. Starting import...",
            'updated_at' => now()->toIso8601String(),
        ], now()->addHours(4));

        ImportAgodaChunk::dispatch($dest, 0);
    }
}

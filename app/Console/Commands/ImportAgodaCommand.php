<?php

namespace App\Console\Commands;

use App\Jobs\ImportAgodaDirectory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class ImportAgodaCommand extends Command
{
    protected $signature = 'agoda:import {path : Path to CSV (absolute, URL, or R2 key)} {--sync : Run synchronously instead of queuing} {--url : Download from URL first} {--r2 : Read from R2/S3 storage}';
    protected $description = 'Import hotels from an Agoda CSV file into the directory';

    public function handle(): int
    {
        $path = $this->argument('path');

        if ($this->option('r2')) {
            $path = $this->downloadFromR2($path);
            if (!$path) {
                return 1;
            }
        } elseif ($this->option('url')) {
            $path = $this->downloadFromUrl($path);
            if (!$path) {
                return 1;
            }
        }

        if (!file_exists($path)) {
            $this->error("File not found: {$path}");
            return 1;
        }

        $sizeMB = round(filesize($path) / 1024 / 1024, 1);
        $this->info("Found file: {$path} ({$sizeMB} MB)");

        Cache::put('agoda_directory_import', [
            'status' => 'queued',
            'processed' => 0,
            'total' => 0,
            'message' => 'Queued for processing...',
            'updated_at' => now()->toIso8601String(),
        ], now()->addHours(2));

        if ($this->option('sync')) {
            $this->info('Running import synchronously (this will take a while)...');
            $job = new ImportAgodaDirectory($path, 'raw');
            $job->handle();
            $this->info('Import finished!');
        } else {
            ImportAgodaDirectory::dispatch($path, 'raw');
            $this->info('Job dispatched! Run `php artisan queue:work --timeout=3600` to process.');
        }

        return 0;
    }

    private function downloadFromR2(string $key): ?string
    {
        $this->info("Reading from R2 storage: {$key}");

        if (!Storage::disk('s3')->exists($key)) {
            $this->error("File not found in R2: {$key}");
            return null;
        }

        $sizeMB = round(Storage::disk('s3')->size($key) / 1024 / 1024, 1);
        $this->info("Found file in R2 ({$sizeMB} MB), streaming to local temp file...");

        $dest = storage_path('app/agoda-import.csv');
        $stream = Storage::disk('s3')->readStream($key);

        if (!$stream) {
            $this->error("Failed to open R2 stream for: {$key}");
            return null;
        }

        $fp = fopen($dest, 'w');
        stream_copy_to_stream($stream, $fp);
        fclose($fp);
        fclose($stream);

        $localSize = round(filesize($dest) / 1024 / 1024, 1);
        $this->info("Downloaded {$localSize} MB to {$dest}");

        return $dest;
    }

    private function downloadFromUrl(string $url): ?string
    {
        // Convert Google Drive share links to direct download
        if (str_contains($url, 'drive.google.com')) {
            $fileId = null;
            if (preg_match('/\/d\/([a-zA-Z0-9_-]+)/', $url, $m)) {
                $fileId = $m[1];
            } elseif (preg_match('/[?&]id=([a-zA-Z0-9_-]+)/', $url, $m)) {
                $fileId = $m[1];
            }
            if ($fileId) {
                // For large files, Google requires confirm=t parameter and cookie handling
                $url = "https://drive.usercontent.google.com/download?id={$fileId}&export=download&confirm=t";
                $this->info("Converted to direct download URL for file ID: {$fileId}");
            }
        }

        $dest = storage_path('app/agoda-import.csv');
        $this->info("Downloading from URL...");
        $this->info("Saving to: {$dest}");

        try {
            // Use curl for reliable large file downloads with redirect following
            $ch = curl_init($url);
            $fp = fopen($dest, 'w');
            curl_setopt_array($ch, [
                CURLOPT_FILE => $fp,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 3600,
                CURLOPT_CONNECTTIMEOUT => 30,
                CURLOPT_USERAGENT => 'Mozilla/5.0',
                CURLOPT_COOKIEFILE => '', // enable cookie engine
            ]);

            $this->info("Downloading (this may take a while for large files)...");
            $result = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $error = curl_error($ch);
            unset($ch);
            fclose($fp);

            if (!$result || $httpCode >= 400) {
                $this->error("Download failed with HTTP {$httpCode}: {$error}");
                return null;
            }

            $sizeMB = round(filesize($dest) / 1024 / 1024, 1);
            $this->info("Downloaded {$sizeMB} MB");

            if ($sizeMB < 1) {
                $this->error("File too small ({$sizeMB} MB) — download may have failed. Check that the Google Drive link is set to 'Anyone with the link'.");
                return null;
            }

            return $dest;
        } catch (\Exception $e) {
            $this->error("Download failed: {$e->getMessage()}");
            return null;
        }
    }
}

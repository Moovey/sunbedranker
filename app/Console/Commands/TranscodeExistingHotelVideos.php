<?php

namespace App\Console\Commands;

use App\Jobs\TranscodeHotelVideo;
use App\Models\Hotel;
use Illuminate\Console\Command;

/**
 * Backfills existing hotel videos through the new transcoding pipeline so older
 * uploads (e.g. iPhone HEVC clips) become playable on Android / desktop browsers.
 *
 * The job itself probes each file first and skips files that are already
 * H.264 / AAC inside MP4, so this command is safe to re-run.
 */
class TranscodeExistingHotelVideos extends Command
{
    protected $signature = 'videos:transcode-existing
        {--hotel= : Limit to a single hotel ID}
        {--sync : Run inline instead of dispatching to the queue}';

    protected $description = 'Queue transcoding for every existing hotel video (safe to re-run; already-compatible files are skipped).';

    public function handle(): int
    {
        $disk = config('filesystems.public_uploads', 'public');

        $query = Hotel::query()
            ->where(function ($q) {
                $q->whereNotNull('video_url')->orWhereNotNull('videos');
            });

        if ($id = $this->option('hotel')) {
            $query->where('id', $id);
        }

        $sync = (bool) $this->option('sync');
        $count = 0;

        $query->chunkById(200, function ($hotels) use ($disk, $sync, &$count) {
            foreach ($hotels as $hotel) {
                foreach ($this->collectPaths($hotel) as $path) {
                    if ($sync) {
                        (new TranscodeHotelVideo($path, $disk))->handle();
                    } else {
                        TranscodeHotelVideo::dispatch($path, $disk);
                    }
                    $this->line(" - hotel #{$hotel->id}: {$path}");
                    $count++;
                }
            }
        });

        $this->info($sync
            ? "Transcoded {$count} video(s) inline."
            : "Dispatched {$count} transcode job(s). Make sure `php artisan queue:work` is running.");

        return self::SUCCESS;
    }

    /**
     * Pull the storage-relative paths (not URLs) from both the legacy
     * `video_url` column and the `videos` JSON column.
     */
    private function collectPaths(Hotel $hotel): array
    {
        $paths = [];

        $legacy = $hotel->getRawOriginal('video_url');
        if ($legacy && $this->isStoragePath($legacy)) {
            $paths[] = ltrim($legacy, '/');
        }

        foreach ((array) $hotel->videos as $entry) {
            $raw = is_array($entry) ? ($entry['url'] ?? $entry['path'] ?? null) : $entry;
            if ($raw && $this->isStoragePath($raw)) {
                $paths[] = ltrim($raw, '/');
            }
        }

        return array_values(array_unique(array_filter($paths)));
    }

    /**
     * We only want to transcode files we actually own on disk — skip external
     * URLs (YouTube, Vimeo, third-party CDNs, etc.).
     */
    private function isStoragePath(string $value): bool
    {
        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
            return false;
        }
        return str_contains($value, 'hotels/videos/');
    }
}

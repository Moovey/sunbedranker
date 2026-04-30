<?php

namespace App\Services;

use App\Jobs\TranscodeHotelVideo;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Stores an uploaded hotel video on the configured disk and queues a background
 * job that transcodes it to a universally-playable H.264/AAC MP4.
 *
 * Why: phones (especially iPhones) often record video as HEVC/H.265 which
 * Android Chrome and most desktop browsers cannot play. We store the original
 * immediately so the upload request stays fast, then a queued worker rewrites
 * the file in-place to H.264 + AAC + faststart so it plays everywhere.
 *
 * If the queue worker isn't running or ffmpeg isn't installed, the original
 * file is still served — this service degrades gracefully.
 */
class HotelVideoUploader
{
    /**
     * Store an uploaded video on the given disk and dispatch the transcode job.
     *
     * The path is always written with a `.mp4` extension so that, after
     * transcoding overwrites it, no DB updates or cache invalidations are
     * required. Any container is acceptable here; ffmpeg will normalise it.
     *
     * @return string Storage path (e.g. "hotels/videos/1735812345_ab12cd.mp4")
     */
    public static function store(UploadedFile $file, string $disk): string
    {
        $name = time() . '_' . Str::random(10) . '.mp4';
        $path = 'hotels/videos/' . $name;

        // Stream the upload straight to disk under our normalised path.
        // The original codec/container may not be web-safe yet — that's what
        // the queued job is for.
        Storage::disk($disk)->putFileAs(
            'hotels/videos',
            $file,
            $name,
            ['ContentType' => 'video/mp4']
        );

        TranscodeHotelVideo::dispatch($path, $disk);

        return $path;
    }
}

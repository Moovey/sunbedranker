<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\ExecutableFinder;
use Symfony\Component\Process\Process;

/**
 * Re-encodes an uploaded hotel video to H.264 (video) + AAC (audio) inside an
 * MP4 container with the moov atom at the front (`+faststart`) so that:
 *
 *  - Android Chrome / desktop Chrome / Firefox can decode it (they reject HEVC).
 *  - Playback can begin before the whole file is downloaded.
 *  - The Content-Type stays `video/mp4` everywhere.
 *
 * If the file is already H.264+AAC in MP4 we skip the encode and exit fast.
 * If ffmpeg / ffprobe binaries are missing, we log a warning and exit so the
 * original file (which may only play in Safari / iOS) is still served — this
 * job never breaks the upload flow.
 */
class TranscodeHotelVideo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 2;
    public int $backoff = 30;
    public int $timeout = 1800; // 30 minutes — large mobile videos can be slow.

    public function __construct(
        public string $path,
        public string $disk
    ) {}

    public function handle(): void
    {
        $finder = new ExecutableFinder();
        $ffmpeg = config('services.ffmpeg.ffmpeg_path') ?: $finder->find('ffmpeg');
        $ffprobe = config('services.ffmpeg.ffprobe_path') ?: $finder->find('ffprobe');

        if (!$ffmpeg || !$ffprobe) {
            Log::warning('TranscodeHotelVideo skipped: ffmpeg/ffprobe not found.', [
                'path' => $this->path,
            ]);
            return;
        }

        $storage = Storage::disk($this->disk);
        if (!$storage->exists($this->path)) {
            Log::warning('TranscodeHotelVideo: source missing.', ['path' => $this->path]);
            return;
        }

        // Pull the source down to a local temp file. R2 / S3 cannot be read
        // by ffmpeg directly without presigned URLs — copying is simpler and
        // works the same for local "public" disk.
        $tmpDir = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR);
        $tmpInput = $tmpDir . DIRECTORY_SEPARATOR . 'sbr_in_' . uniqid('', true);
        $tmpOutput = $tmpDir . DIRECTORY_SEPARATOR . 'sbr_out_' . uniqid('', true) . '.mp4';

        try {
            $stream = $storage->readStream($this->path);
            if (!is_resource($stream)) {
                Log::warning('TranscodeHotelVideo: cannot open source stream.', ['path' => $this->path]);
                return;
            }
            $local = fopen($tmpInput, 'wb');
            stream_copy_to_stream($stream, $local);
            fclose($local);
            if (is_resource($stream)) {
                fclose($stream);
            }

            // 1. Probe the file. If it's already web-safe, skip the re-encode.
            if ($this->isAlreadyWebSafe($ffprobe, $tmpInput)) {
                Log::info('TranscodeHotelVideo: already H.264/AAC MP4, skipping re-encode.', [
                    'path' => $this->path,
                ]);
                return;
            }

            // 2. Transcode to H.264 + AAC + faststart.
            $process = new Process([
                $ffmpeg,
                '-y',                            // overwrite output
                '-i', $tmpInput,
                '-map_metadata', '-1',           // strip EXIF / GPS
                '-c:v', 'libx264',
                '-preset', 'medium',
                '-crf', '23',                    // visually transparent default
                '-pix_fmt', 'yuv420p',           // max compatibility
                '-vf', 'scale=trunc(min(iw\,1920)/2)*2:trunc(min(ih\,1080)/2)*2', // cap 1080p, even dims
                '-c:a', 'aac',
                '-b:a', '128k',
                '-ac', '2',
                '-movflags', '+faststart',
                $tmpOutput,
            ]);
            $process->setTimeout($this->timeout);
            $process->run();

            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }

            // 3. Replace the original on disk with the transcoded file.
            $put = fopen($tmpOutput, 'rb');
            $storage->put($this->path, $put, [
                'visibility'  => 'public',
                'ContentType' => 'video/mp4',
            ]);
            if (is_resource($put)) {
                fclose($put);
            }

            Log::info('TranscodeHotelVideo: success.', ['path' => $this->path]);
        } finally {
            @unlink($tmpInput);
            @unlink($tmpOutput);
        }
    }

    /**
     * Returns true when the file is already an H.264 video + AAC audio MP4 —
     * i.e. nothing to gain by re-encoding.
     */
    private function isAlreadyWebSafe(string $ffprobe, string $file): bool
    {
        $probe = new Process([
            $ffprobe,
            '-v', 'error',
            '-show_entries', 'stream=codec_type,codec_name:format=format_name',
            '-of', 'json',
            $file,
        ]);
        $probe->setTimeout(60);
        $probe->run();

        if (!$probe->isSuccessful()) {
            return false;
        }

        $data = json_decode($probe->getOutput(), true);
        if (!is_array($data)) {
            return false;
        }

        $formats = $data['format']['format_name'] ?? '';
        if (!str_contains($formats, 'mp4')) {
            return false;
        }

        $videoOk = false;
        $audioOk = true; // many phone clips have no audio track — that's fine
        $hasAudio = false;
        foreach (($data['streams'] ?? []) as $stream) {
            if (($stream['codec_type'] ?? null) === 'video') {
                $videoOk = ($stream['codec_name'] ?? '') === 'h264';
            }
            if (($stream['codec_type'] ?? null) === 'audio') {
                $hasAudio = true;
                $audioOk = ($stream['codec_name'] ?? '') === 'aac';
            }
        }

        return $videoOk && (!$hasAudio || $audioOk);
    }
}

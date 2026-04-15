<?php

namespace App\Jobs;

use App\Models\Hotel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProcessHotelImages implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The number of seconds to wait before retrying the job.
     */
    public int $backoff = 60;

    /**
     * Image processing settings
     */
    private const MAX_WIDTH = 1920;
    private const MAX_HEIGHT = 1080;
    private const THUMBNAIL_WIDTH = 400;
    private const THUMBNAIL_HEIGHT = 300;
    private const QUALITY = 85;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Hotel $hotel,
        public array $imagePaths,
        public string $imageType = 'gallery' // 'main' or 'gallery'
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $disk = config('filesystems.public_uploads', 'public');

        if (!class_exists(\Intervention\Image\ImageManager::class)) {
            Log::info('ProcessHotelImages: Intervention Image not installed, skipping optimization', [
                'hotel_id' => $this->hotel->id,
            ]);
            return;
        }

        $manager = new \Intervention\Image\ImageManager(
            new \Intervention\Image\Drivers\Gd\Driver()
        );

        foreach ($this->imagePaths as $imagePath) {
            try {
                $this->processImage($manager, $disk, $imagePath);
            } catch (\Exception $e) {
                Log::error('ProcessHotelImages: Failed to process image', [
                    'hotel_id' => $this->hotel->id,
                    'image_path' => $imagePath,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        Log::info('ProcessHotelImages: Completed processing images', [
            'hotel_id' => $this->hotel->id,
            'image_count' => count($this->imagePaths),
            'type' => $this->imageType,
        ]);
    }

    /**
     * Process a single image - optimize and create thumbnail.
     * Works with both local and remote (S3/R2) storage.
     */
    private function processImage(object $manager, string $disk, string $imagePath): void
    {
        $storage = Storage::disk($disk);

        if (!$storage->exists($imagePath)) {
            Log::warning('ProcessHotelImages: Image file not found', [
                'path' => $imagePath,
                'disk' => $disk,
            ]);
            return;
        }

        // Download to temp file (works for both local and remote disks)
        $tempFile = tempnam(sys_get_temp_dir(), 'hotel_img_');
        file_put_contents($tempFile, $storage->get($imagePath));

        try {
            $originalSize = filesize($tempFile);

            // Load and optimize the image
            $image = $manager->read($tempFile);
            $image->scaleDown(width: self::MAX_WIDTH, height: self::MAX_HEIGHT);
            $image->toJpeg(quality: self::QUALITY)->save($tempFile);

            // Upload optimized image back to storage
            $storage->put($imagePath, file_get_contents($tempFile), 'public');

            // Create thumbnail
            $this->createThumbnail($manager, $storage, $imagePath, $tempFile);

            // Log optimization results
            $newSize = filesize($tempFile);
            $savings = $originalSize - $newSize;
            $savingsPercent = $originalSize > 0 ? round(($savings / $originalSize) * 100, 1) : 0;

            Log::info('ProcessHotelImages: Image optimized', [
                'hotel_id' => $this->hotel->id,
                'path' => $imagePath,
                'original_size' => $this->formatBytes($originalSize),
                'new_size' => $this->formatBytes($newSize),
                'savings' => $this->formatBytes($savings) . " ({$savingsPercent}%)",
            ]);
        } finally {
            @unlink($tempFile);
        }
    }

    /**
     * Create a thumbnail version of the image.
     */
    private function createThumbnail(object $manager, $storage, string $imagePath, string $tempFile): void
    {
        $pathInfo = pathinfo($imagePath);
        $thumbnailPath = $pathInfo['dirname'] . '/thumbnails/' . $pathInfo['filename'] . '_thumb.jpg';

        $tempThumb = tempnam(sys_get_temp_dir(), 'hotel_thumb_');
        try {
            $thumbnail = $manager->read($tempFile);
            $thumbnail->cover(self::THUMBNAIL_WIDTH, self::THUMBNAIL_HEIGHT);
            $thumbnail->toJpeg(quality: self::QUALITY)->save($tempThumb);

            // Upload thumbnail to storage
            $storage->put($thumbnailPath, file_get_contents($tempThumb), 'public');
        } finally {
            @unlink($tempThumb);
        }
    }

    /**
     * Format bytes to human readable format.
     */
    private function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= (1 << (10 * $pow));

        return round($bytes, 2) . ' ' . $units[$pow];
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('ProcessHotelImages: Job failed', [
            'hotel_id' => $this->hotel->id,
            'image_paths' => $this->imagePaths,
            'error' => $exception->getMessage(),
        ]);
    }
}

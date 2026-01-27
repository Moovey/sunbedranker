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

        // Check if Intervention Image is available
        if (!class_exists(\Intervention\Image\ImageManager::class)) {
            Log::info('ProcessHotelImages: Intervention Image not installed, skipping optimization', [
                'hotel_id' => $this->hotel->id,
                'tip' => 'Run: composer require intervention/image',
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
     */
    private function processImage(object $manager, string $disk, string $imagePath): void
    {
        $fullPath = Storage::disk($disk)->path($imagePath);

        if (!file_exists($fullPath)) {
            Log::warning('ProcessHotelImages: Image file not found', [
                'path' => $imagePath,
            ]);
            return;
        }

        // Get original file size for logging
        $originalSize = filesize($fullPath);

        // Load and optimize the image
        $image = $manager->read($fullPath);

        // Resize if larger than max dimensions (maintaining aspect ratio)
        $image->scaleDown(width: self::MAX_WIDTH, height: self::MAX_HEIGHT);

        // Save optimized image (overwrites original)
        $image->toJpeg(quality: self::QUALITY)->save($fullPath);

        // Create thumbnail
        $this->createThumbnail($manager, $disk, $imagePath, $fullPath);

        // Log optimization results
        $newSize = filesize($fullPath);
        $savings = $originalSize - $newSize;
        $savingsPercent = $originalSize > 0 ? round(($savings / $originalSize) * 100, 1) : 0;

        Log::info('ProcessHotelImages: Image optimized', [
            'hotel_id' => $this->hotel->id,
            'path' => $imagePath,
            'original_size' => $this->formatBytes($originalSize),
            'new_size' => $this->formatBytes($newSize),
            'savings' => $this->formatBytes($savings) . " ({$savingsPercent}%)",
        ]);
    }

    /**
     * Create a thumbnail version of the image.
     */
    private function createThumbnail(object $manager, string $disk, string $imagePath, string $fullPath): void
    {
        // Generate thumbnail path
        $pathInfo = pathinfo($imagePath);
        $thumbnailPath = $pathInfo['dirname'] . '/thumbnails/' . $pathInfo['filename'] . '_thumb.jpg';
        $thumbnailFullPath = Storage::disk($disk)->path($thumbnailPath);

        // Ensure thumbnail directory exists
        $thumbnailDir = dirname($thumbnailFullPath);
        if (!is_dir($thumbnailDir)) {
            mkdir($thumbnailDir, 0755, true);
        }

        // Create and save thumbnail
        $thumbnail = $manager->read($fullPath);
        $thumbnail->cover(self::THUMBNAIL_WIDTH, self::THUMBNAIL_HEIGHT);
        $thumbnail->toJpeg(quality: self::QUALITY)->save($thumbnailFullPath);
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

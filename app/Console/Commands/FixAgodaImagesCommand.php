<?php

namespace App\Console\Commands;

use App\Models\Hotel;
use Illuminate\Console\Command;

class FixAgodaImagesCommand extends Command
{
    protected $signature = 'agoda:fix-images';
    protected $description = 'Upgrade Agoda hotel images from 312px thumbnails to 1024px and HTTP to HTTPS';

    public function handle(): int
    {
        $hotels = Hotel::whereNotNull('agoda_hotel_id')->get();

        $count = 0;

        foreach ($hotels as $hotel) {
            $updated = false;

            if ($hotel->main_image && str_contains($hotel->main_image, 'agoda.net')) {
                $hotel->main_image = $this->upgradeUrl($hotel->main_image);
                $updated = true;
            }

            if ($hotel->images) {
                $newImages = array_map(function ($url) {
                    return str_contains($url, 'agoda.net') ? $this->upgradeUrl($url) : $url;
                }, $hotel->images);

                if ($newImages !== $hotel->images) {
                    $hotel->images = $newImages;
                    $updated = true;
                }
            }

            if ($updated) {
                $hotel->save();
                $count++;
            }
        }

        $this->info("Fixed images for {$count} hotels.");

        return 0;
    }

    protected function upgradeUrl(string $url): string
    {
        $url = preg_replace('/\bs=\d+x\b/', 's=1024x', $url);
        $url = str_replace('http://', 'https://', $url);

        return $url;
    }
}

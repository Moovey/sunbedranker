<?php

namespace Database\Seeders;

use App\Models\Hotel;
use Illuminate\Database\Seeder;

class UpdateHotelImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Unsplash pool and resort images
        $poolImages = [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80', // Luxury pool
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80', // Hotel pool
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80', // Infinity pool
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80', // Resort pool
            'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80', // Pool chairs
            'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80', // Rooftop pool
            'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80', // Beach resort pool
            'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80', // Hotel pool deck
            'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1200&q=80', // Pool with palms
            'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=1200&q=80', // Luxury resort
        ];

        $galleryImages = [
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', // Pool view
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', // Pool aerial
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', // Pool side
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', // Infinity view
            'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80', // Sunbeds
            'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', // City pool
            'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80', // Pool deck
        ];

        $hotels = Hotel::all();

        foreach ($hotels as $index => $hotel) {
            // Assign a main image
            $mainImageIndex = $index % count($poolImages);
            
            // Create a gallery of 4-6 images
            $numGalleryImages = rand(4, 6);
            $hotelGallery = [];
            
            for ($i = 0; $i < $numGalleryImages; $i++) {
                $imageIndex = ($index + $i) % count($galleryImages);
                $hotelGallery[] = $galleryImages[$imageIndex];
            }

            $hotel->update([
                'main_image' => $poolImages[$mainImageIndex],
                'images' => $hotelGallery,
            ]);

            $this->command->info("Updated images for: {$hotel->name}");
        }

        $this->command->info('All hotel images updated successfully!');
    }
}

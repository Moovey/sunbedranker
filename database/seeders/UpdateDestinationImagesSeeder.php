<?php

namespace Database\Seeders;

use App\Models\Destination;
use Illuminate\Database\Seeder;

class UpdateDestinationImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Unsplash destination/beach/resort images
        $destinationImages = [
            'Tenerife' => 'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=1200&q=80', // Tenerife beach
            'Ibiza' => 'https://images.unsplash.com/photo-1565530952921-0b15a11c9fcd?w=1200&q=80', // Ibiza coast
            'Mykonos' => 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=80', // Mykonos
            'Dubai' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80', // Dubai skyline
            'Bali' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80', // Bali beach
            'Miami' => 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=1200&q=80', // Miami beach
            'Marbella' => 'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=1200&q=80', // Marbella
            'Cancun' => 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&q=80', // Cancun
            'Santorini' => 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80', // Santorini
            'Maldives' => 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80', // Maldives
        ];

        // Default beautiful destination images
        $defaultImages = [
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80', // Tropical beach
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Mountain lake
            'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&q=80', // Beach resort
            'https://images.unsplash.com/photo-1540202404-d0c7fe46a087?w=1200&q=80', // Coastal town
        ];

        $destinations = Destination::all();

        foreach ($destinations as $destination) {
            // Try to find a matching image, or use a default
            $image = null;
            
            foreach ($destinationImages as $name => $url) {
                if (stripos($destination->name, $name) !== false) {
                    $image = $url;
                    break;
                }
            }
            
            // If no match found, use a default
            if (!$image) {
                $image = $defaultImages[array_rand($defaultImages)];
            }

            $destination->update(['image' => $image]);

            $this->command->info("Updated image for: {$destination->name}");
        }

        $this->command->info('All destination images updated successfully!');
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Destination;
use App\Models\Hotel;
use App\Models\PoolCriteria;

class SampleHotelsSeeder extends Seeder
{
    public function run(): void
    {
        // Create more destinations
        $destinations = [
            [
                'name' => 'Ibiza',
                'slug' => 'ibiza',
                'country' => 'Spain',
                'country_code' => 'ES',
                'region' => 'Balearic Islands',
                'description' => 'Party capital with stunning beaches and pools',
                'is_featured' => true,
            ],
            [
                'name' => 'Mykonos',
                'slug' => 'mykonos',
                'country' => 'Greece',
                'country_code' => 'GR',
                'region' => 'Cyclades',
                'description' => 'Luxury Greek island with beautiful pools',
                'is_featured' => true,
            ],
            [
                'name' => 'Dubai',
                'slug' => 'dubai',
                'country' => 'United Arab Emirates',
                'country_code' => 'AE',
                'region' => 'Dubai',
                'description' => 'World-class luxury hotels with incredible pools',
                'is_featured' => true,
            ],
            [
                'name' => 'Bali',
                'slug' => 'bali',
                'country' => 'Indonesia',
                'country_code' => 'ID',
                'region' => 'Bali',
                'description' => 'Tropical paradise with infinity pools',
                'is_featured' => true,
            ],
            [
                'name' => 'Miami',
                'slug' => 'miami',
                'country' => 'United States',
                'country_code' => 'US',
                'region' => 'Florida',
                'description' => 'Beach city with vibrant pool scenes',
                'is_featured' => false,
            ],
        ];

        foreach ($destinations as $destData) {
            Destination::firstOrCreate(
                ['slug' => $destData['slug']],
                $destData
            );
        }

        // Sample hotels for each destination
        $hotels = [
            // Ibiza
            [
                'destination' => 'ibiza',
                'name' => 'Hard Rock Hotel Ibiza',
                'slug' => 'hard-rock-hotel-ibiza',
                'address' => 'Carretera Playa D\'en Bossa, Ibiza',
                'star_rating' => 5,
                'overall_score' => 8.5,
                'family_score' => 7.0,
                'quiet_score' => 4.0,
                'is_featured' => true,
                'poolCriteria' => [
                    'number_of_pools' => 3,
                    'sunbed_to_guest_ratio' => 0.8,
                    'has_infinity_pool' => true,
                    'has_rooftop_pool' => true,
                    'has_pool_bar' => true,
                    'atmosphere' => 'lively',
                    'is_adults_only' => false,
                ],
            ],
            // Mykonos
            [
                'destination' => 'mykonos',
                'name' => 'Cavo Tagoo Mykonos',
                'slug' => 'cavo-tagoo-mykonos',
                'address' => 'Mykonos Town, Mykonos',
                'star_rating' => 5,
                'overall_score' => 9.2,
                'family_score' => 5.0,
                'quiet_score' => 9.0,
                'is_featured' => true,
                'poolCriteria' => [
                    'number_of_pools' => 2,
                    'sunbed_to_guest_ratio' => 1.2,
                    'has_infinity_pool' => true,
                    'has_rooftop_pool' => false,
                    'has_pool_bar' => true,
                    'atmosphere' => 'quiet',
                    'is_adults_only' => true,
                ],
            ],
            // Dubai
            [
                'destination' => 'dubai',
                'name' => 'Burj Al Arab Jumeirah',
                'slug' => 'burj-al-arab-jumeirah',
                'address' => 'Jumeirah Beach Road, Dubai',
                'star_rating' => 5,
                'overall_score' => 9.8,
                'family_score' => 8.5,
                'quiet_score' => 8.0,
                'is_featured' => true,
                'poolCriteria' => [
                    'number_of_pools' => 4,
                    'sunbed_to_guest_ratio' => 1.5,
                    'has_infinity_pool' => true,
                    'has_rooftop_pool' => true,
                    'has_pool_bar' => true,
                    'has_kids_pool' => true,
                    'atmosphere' => 'quiet',
                    'is_adults_only' => false,
                ],
            ],
            [
                'destination' => 'dubai',
                'name' => 'Atlantis The Palm',
                'slug' => 'atlantis-the-palm',
                'address' => 'Crescent Road, The Palm, Dubai',
                'star_rating' => 5,
                'overall_score' => 8.9,
                'family_score' => 9.5,
                'quiet_score' => 5.0,
                'is_featured' => true,
                'poolCriteria' => [
                    'number_of_pools' => 6,
                    'sunbed_to_guest_ratio' => 1.0,
                    'has_infinity_pool' => false,
                    'has_kids_pool' => true,
                    'has_pool_bar' => true,
                    'atmosphere' => 'lively',
                    'is_adults_only' => false,
                ],
            ],
            // Bali
            [
                'destination' => 'bali',
                'name' => 'Four Seasons Resort Bali at Jimbaran Bay',
                'slug' => 'four-seasons-bali-jimbaran',
                'address' => 'Jimbaran, Bali',
                'star_rating' => 5,
                'overall_score' => 9.5,
                'family_score' => 8.0,
                'quiet_score' => 9.5,
                'is_featured' => true,
                'poolCriteria' => [
                    'number_of_pools' => 3,
                    'sunbed_to_guest_ratio' => 1.3,
                    'has_infinity_pool' => true,
                    'has_rooftop_pool' => false,
                    'has_pool_bar' => true,
                    'has_kids_pool' => true,
                    'atmosphere' => 'quiet',
                    'is_adults_only' => false,
                ],
            ],
            // Miami
            [
                'destination' => 'miami',
                'name' => 'Fontainebleau Miami Beach',
                'slug' => 'fontainebleau-miami-beach',
                'address' => 'Collins Avenue, Miami Beach',
                'star_rating' => 5,
                'overall_score' => 8.7,
                'family_score' => 7.5,
                'quiet_score' => 6.0,
                'is_featured' => true,
                'poolCriteria' => [
                    'number_of_pools' => 5,
                    'sunbed_to_guest_ratio' => 0.9,
                    'has_infinity_pool' => true,
                    'has_rooftop_pool' => true,
                    'has_pool_bar' => true,
                    'has_kids_pool' => true,
                    'atmosphere' => 'lively',
                    'is_adults_only' => false,
                ],
            ],
        ];

        foreach ($hotels as $hotelData) {
            $destination = Destination::where('slug', $hotelData['destination'])->first();
            
            if (!$destination) {
                continue;
            }

            $poolCriteria = $hotelData['poolCriteria'];
            unset($hotelData['poolCriteria'], $hotelData['destination']);

            $hotel = Hotel::firstOrCreate(
                ['slug' => $hotelData['slug']],
                array_merge($hotelData, [
                    'destination_id' => $destination->id,
                    'is_active' => true,
                ])
            );

            // Create pool criteria
            PoolCriteria::updateOrCreate(
                ['hotel_id' => $hotel->id],
                $poolCriteria
            );

            $this->command->info("Created: {$hotel->name}");
        }

        // Update hotel counts
        Destination::all()->each(function ($destination) {
            $destination->update([
                'hotel_count' => $destination->hotels()->count()
            ]);
        });

        $this->command->info('Sample hotels seeded successfully!');
    }
}

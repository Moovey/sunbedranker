<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Destination;
use App\Models\Hotel;
use App\Models\PoolCriteria;
use App\Models\ScoringWeight;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Only seed in non-production environments with Faker
        if (app()->environment('production')) {
            // In production, only create essential data without Faker
            $this->seedProductionData();
            return;
        }

        // Development/Local seeding with Faker
        $this->seedDevelopmentData();
    }

    /**
     * Seed essential production data (no Faker required)
     */
    private function seedProductionData(): void
    {
        // Create admin user if it doesn't exist
        if (!User::where('email', 'admin@sunbedranker.com')->exists()) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@sunbedranker.com',
                'password' => bcrypt(env('ADMIN_PASSWORD', 'Admin@123456')),
                'email_verified_at' => now(),
                'role' => 'admin',
            ]);
        }

        // Create a test user
        if (!User::where('email', 'user@sunbedranker.com')->exists()) {
            User::create([
                'name' => 'Test User',
                'email' => 'user@sunbedranker.com',
                'password' => bcrypt('User@123456'),
                'email_verified_at' => now(),
                'role' => 'user',
            ]);
        }

        // Create scoring weights
        $this->createScoringWeights();

        // Add popular destinations
        $destinations = $this->createDestinations();

        // Add sample hotels for each destination
        $this->createSampleHotels($destinations);
    }

    /**
     * Seed development data with Faker
     */
    private function seedDevelopmentData(): void
    {
        // Test User
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role' => 'user',
        ]);

        // Admin User
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ]);

        // Additional random users
        User::factory(10)->create();

        // Scoring weights
        $this->createScoringWeights();

        // Create destinations and hotels
        $this->call([
            DemoDataSeeder::class,
        ]);
    }

    /**
     * Create scoring weights
     */
    private function createScoringWeights(): void
    {
        // Scoring weights are already created by the migration
        // No need to create them again
    }

    /**
     * Create sample destinations
     */
    private function createDestinations(): array
    {
        $destinationsData = [
            [
                'name' => 'Dubai',
                'slug' => 'dubai',
                'country' => 'United Arab Emirates',
                'country_code' => 'AE',
                'region' => 'Middle East',
                'latitude' => 25.2048,
                'longitude' => 55.2708,
                'description' => 'Luxury destination with world-class hotels and stunning pools',
                'image' => '/images/destinations/dubai.jpg',
                'is_featured' => true,
                'is_active' => true,
                'hotel_count' => 1,
            ],
            [
                'name' => 'Maldives',
                'slug' => 'maldives',
                'country' => 'Maldives',
                'country_code' => 'MV',
                'region' => 'South Asia',
                'latitude' => 3.2028,
                'longitude' => 73.2207,
                'description' => 'Tropical paradise with overwater villas and infinity pools',
                'image' => '/images/destinations/maldives.jpg',
                'is_featured' => true,
                'is_active' => true,
                'hotel_count' => 1,
            ],
            [
                'name' => 'Bali',
                'slug' => 'bali',
                'country' => 'Indonesia',
                'country_code' => 'ID',
                'region' => 'Southeast Asia',
                'latitude' => -8.3405,
                'longitude' => 115.0920,
                'description' => 'Island paradise with beautiful resort pools and beaches',
                'image' => '/images/destinations/bali.jpg',
                'is_featured' => true,
                'is_active' => true,
                'hotel_count' => 1,
            ],
            [
                'name' => 'Santorini',
                'slug' => 'santorini',
                'country' => 'Greece',
                'country_code' => 'GR',
                'region' => 'Europe',
                'latitude' => 36.3932,
                'longitude' => 25.4615,
                'description' => 'Greek island with iconic infinity pools overlooking the caldera',
                'image' => '/images/destinations/santorini.jpg',
                'is_featured' => true,
                'is_active' => true,
                'hotel_count' => 1,
            ],
            [
                'name' => 'Cancun',
                'slug' => 'cancun',
                'country' => 'Mexico',
                'country_code' => 'MX',
                'region' => 'North America',
                'latitude' => 21.1619,
                'longitude' => -86.8515,
                'description' => 'Caribbean beach resort with amazing pool complexes',
                'image' => '/images/destinations/cancun.jpg',
                'is_featured' => true,
                'is_active' => true,
                'hotel_count' => 1,
            ],
        ];

        $destinations = [];
        foreach ($destinationsData as $destData) {
            $destinations[] = Destination::firstOrCreate(
                ['slug' => $destData['slug']],
                $destData
            );
        }

        return $destinations;
    }

    /**
     * Create sample hotels for destinations
     */
    private function createSampleHotels(array $destinations): void
    {
        $hotelsData = [
            // Dubai Hotels
            [
                'destination_id' => $destinations[0]->id ?? 1,
                'name' => 'Atlantis The Palm',
                'slug' => 'atlantis-the-palm',
                'address' => 'Crescent Road, The Palm Jumeirah, Dubai',
                'description' => 'Iconic resort featuring a massive pool complex with water slides, beaches, and aquarium access.',
                'star_rating' => 5,
                'overall_score' => 92.0,
                'family_score' => 95.0,
                'quiet_score' => 75.0,
                'party_score' => 88.0,
                'main_image' => '/images/hotels/atlantis-palm.jpg',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => true,
                'pool_criteria' => [
                    'pool_size_sqm' => 5000,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => true,
                    'has_water_slides' => true,
                    'has_lazy_river' => true,
                    'has_pool_bar' => true,
                    'atmosphere' => 'lively',
                    'is_adults_only' => false,
                ],
            ],
            // Maldives Hotels
            [
                'destination_id' => $destinations[1]->id ?? 2,
                'name' => 'Soneva Jani',
                'slug' => 'soneva-jani',
                'address' => 'Medhufaru Island, Noonu Atoll, Maldives',
                'description' => 'Luxurious overwater villas with private pools and stunning ocean views.',
                'star_rating' => 5,
                'overall_score' => 98.0,
                'family_score' => 70.0,
                'quiet_score' => 99.0,
                'party_score' => 60.0,
                'main_image' => '/images/hotels/soneva-jani.jpg',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => true,
                'pool_criteria' => [
                    'pool_size_sqm' => 100,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => false,
                    'has_water_slides' => false,
                    'has_lazy_river' => false,
                    'has_pool_bar' => true,
                    'atmosphere' => 'quiet',
                    'is_adults_only' => true,
                ],
            ],
            // Bali Hotels
            [
                'destination_id' => $destinations[2]->id ?? 3,
                'name' => 'AYANA Resort and Spa',
                'slug' => 'ayana-resort-bali',
                'address' => 'Jalan Karang Mas Sejahtera, Jimbaran, Bali',
                'description' => 'Clifftop resort with multiple pools including a stunning ocean-view infinity pool.',
                'star_rating' => 5,
                'overall_score' => 90.0,
                'family_score' => 88.0,
                'quiet_score' => 82.0,
                'party_score' => 85.0,
                'main_image' => '/images/hotels/ayana-bali.jpg',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => true,
                'pool_criteria' => [
                    'pool_size_sqm' => 1500,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => true,
                    'has_water_slides' => false,
                    'has_lazy_river' => false,
                    'has_pool_bar' => true,
                    'atmosphere' => 'lively',
                    'is_adults_only' => false,
                ],
            ],
            // Santorini Hotels
            [
                'destination_id' => $destinations[3]->id ?? 4,
                'name' => 'Grace Hotel Santorini',
                'slug' => 'grace-hotel-santorini',
                'address' => 'Imerovigli, Santorini, Greece',
                'description' => 'Boutique hotel with infinity pool overlooking the caldera and Aegean Sea.',
                'star_rating' => 5,
                'overall_score' => 94.0,
                'family_score' => 65.0,
                'quiet_score' => 98.0,
                'party_score' => 70.0,
                'main_image' => '/images/hotels/grace-santorini.jpg',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => true,
                'pool_criteria' => [
                    'pool_size_sqm' => 200,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => false,
                    'has_water_slides' => false,
                    'has_lazy_river' => false,
                    'has_pool_bar' => true,
                    'atmosphere' => 'quiet',
                    'is_adults_only' => true,
                ],
            ],
            // Cancun Hotels
            [
                'destination_id' => $destinations[4]->id ?? 5,
                'name' => 'Moon Palace Cancun',
                'slug' => 'moon-palace-cancun',
                'address' => 'Carretera Cancun-Chetumal Km 340, Cancun, Mexico',
                'description' => 'All-inclusive resort with extensive pool areas, water park, and beach access.',
                'star_rating' => 5,
                'overall_score' => 88.0,
                'family_score' => 96.0,
                'quiet_score' => 68.0,
                'party_score' => 92.0,
                'main_image' => '/images/hotels/moon-palace.jpg',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => true,
                'pool_criteria' => [
                    'pool_size_sqm' => 3500,
                    'has_infinity_pool' => false,
                    'has_kids_pool' => true,
                    'has_water_slides' => true,
                    'has_lazy_river' => true,
                    'has_pool_bar' => true,
                    'atmosphere' => 'lively',
                    'is_adults_only' => false,
                ],
            ],
        ];

        foreach ($hotelsData as $hotelData) {
            $poolCriteria = $hotelData['pool_criteria'];
            unset($hotelData['pool_criteria']);

            $hotel = Hotel::firstOrCreate(
                ['slug' => $hotelData['slug']],
                $hotelData
            );

            // Create pool criteria
            PoolCriteria::updateOrCreate(
                ['hotel_id' => $hotel->id],
                $poolCriteria
            );
        }
    }
}

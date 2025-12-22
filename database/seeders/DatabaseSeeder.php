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
        // Test User (only if doesn't exist)
        if (!User::where('email', 'test@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'role' => 'user',
            ]);
        }

        // Admin User (only if doesn't exist)
        if (!User::where('email', 'admin@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'role' => 'admin',
            ]);
        }

        // Additional random users
        if (User::count() < 15) {
            User::factory(10)->create();
        }

        // Scoring weights (already created by migration, skip)
        $this->createScoringWeights();

        // Create sample destinations and hotels with images
        $destinations = $this->createDestinations();
        $this->createSampleHotels($destinations);

        // Also seed demo data if you want more variety
        // $this->call([DemoDataSeeder::class]);
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
                'image' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
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
                'image' => 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
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
                'image' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
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
                'image' => 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80',
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
                'image' => 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&q=80',
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
            // Dubai Hotels (3 hotels)
            [
                'destination_id' => $destinations[0]->id ?? 1,
                'name' => 'Atlantis The Palm',
                'slug' => 'atlantis-the-palm-dubai',
                'address' => 'Crescent Road, The Palm Jumeirah, Dubai',
                'description' => 'Iconic resort featuring a massive pool complex with water slides, beaches, and aquarium access.',
                'star_rating' => 5,
                'overall_score' => 92.0,
                'family_score' => 95.0,
                'quiet_score' => 75.0,
                'party_score' => 88.0,
                'main_image' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => true,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 5000,
                    'number_of_pools' => 5,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => true,
                    'has_lazy_river' => true,
                    'has_pool_bar' => true,
                    'has_lifeguard' => true,
                    'atmosphere' => 'lively',
                    'is_adults_only' => false,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => true,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],
            [
                'destination_id' => $destinations[0]->id ?? 1,
                'name' => 'Burj Al Arab Jumeirah',
                'slug' => 'burj-al-arab-jumeirah',
                'address' => 'Jumeirah Street, Dubai',
                'description' => 'World\'s most luxurious hotel with exclusive pool terrace and private beach.',
                'star_rating' => 5,
                'overall_score' => 96.0,
                'family_score' => 80.0,
                'quiet_score' => 95.0,
                'party_score' => 75.0,
                'main_image' => 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => false,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 800,
                    'number_of_pools' => 2,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => false,
                    'has_lazy_river' => false,
                    'has_pool_bar' => true,
                    'has_lifeguard' => true,
                    'atmosphere' => 'quiet',
                    'is_adults_only' => true,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => true,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],
            [
                'destination_id' => $destinations[0]->id ?? 1,
                'name' => 'JW Marriott Marquis Dubai',
                'slug' => 'jw-marriott-marquis-dubai',
                'address' => 'Business Bay, Dubai',
                'description' => 'Stunning rooftop pool with panoramic city views and multiple dining options.',
                'star_rating' => 5,
                'overall_score' => 89.0,
                'family_score' => 88.0,
                'quiet_score' => 85.0,
                'party_score' => 82.0,
                'main_image' => 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => false,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 1200,
                    'number_of_pools' => 2,
                    'has_infinity_pool' => false,
                    'has_rooftop_pool' => true,
                    'has_kids_pool' => true,
                    'has_lazy_river' => false,
                    'has_pool_bar' => true,
                    'has_lifeguard' => true,
                    'atmosphere' => 'lively',
                    'is_adults_only' => false,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => true,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],

            // Maldives Hotels (3 hotels)
            [
                'destination_id' => $destinations[1]->id ?? 2,
                'name' => 'Soneva Jani',
                'slug' => 'soneva-jani-maldives',
                'address' => 'Medhufaru Island, Noonu Atoll, Maldives',
                'description' => 'Luxurious overwater villas with private pools and stunning ocean views.',
                'star_rating' => 5,
                'overall_score' => 98.0,
                'family_score' => 70.0,
                'quiet_score' => 99.0,
                'party_score' => 60.0,
                'main_image' => 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => true,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 100,
                    'number_of_pools' => 1,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => false,
                    'has_pool_bar' => true,
                    'has_lifeguard' => false,
                    'atmosphere' => 'quiet',
                    'is_adults_only' => true,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => true,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],
            [
                'destination_id' => $destinations[1]->id ?? 2,
                'name' => 'Conrad Maldives Rangali Island',
                'slug' => 'conrad-maldives-rangali',
                'address' => 'Rangali Island, Alif Dhaal Atoll, Maldives',
                'description' => 'Two islands connected by bridge, featuring underwater restaurant and spectacular pools.',
                'star_rating' => 5,
                'overall_score' => 94.0,
                'family_score' => 85.0,
                'quiet_score' => 92.0,
                'party_score' => 70.0,
                'main_image' => 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => false,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 2000,
                    'number_of_pools' => 3,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => true,
                    'has_lazy_river' => false,
                    'has_pool_bar' => true,
                    'has_lifeguard' => true,
                    'atmosphere' => 'quiet',
                    'is_adults_only' => false,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => true,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],
            [
                'destination_id' => $destinations[1]->id ?? 2,
                'name' => 'Anantara Kihavah Maldives',
                'slug' => 'anantara-kihavah-maldives',
                'address' => 'Kihavah Huravalhi Island, Baa Atoll, Maldives',
                'description' => 'Luxury overwater and beach villas with private pools and UNESCO Biosphere Reserve location.',
                'star_rating' => 5,
                'overall_score' => 95.0,
                'family_score' => 75.0,
                'quiet_score' => 97.0,
                'party_score' => 65.0,
                'main_image' => 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => false,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 150,
                    'number_of_pools' => 2,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => false,
                    'has_lazy_river' => false,
                    'has_pool_bar' => true,
                    'has_lifeguard' => false,
                    'atmosphere' => 'quiet',
                    'is_adults_only' => false,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => true,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],

            // Bali Hotels (3 hotels)
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
                'main_image' => 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => true,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 1500,
                    'number_of_pools' => 3,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => true,
                    'has_pool_bar' => true,
                    'has_lifeguard' => true,
                    'atmosphere' => 'lively',
                    'is_adults_only' => false,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => true,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 4,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],
            [
                'destination_id' => $destinations[2]->id ?? 3,
                'name' => 'The Mulia Bali',
                'slug' => 'the-mulia-bali',
                'address' => 'Jalan Raya Nusa Dua Selatan, Nusa Dua, Bali',
                'description' => 'Beachfront luxury resort with lagoon pools, aquatic playground, and world-class spa.',
                'star_rating' => 5,
                'overall_score' => 93.0,
                'family_score' => 92.0,
                'quiet_score' => 80.0,
                'party_score' => 78.0,
                'main_image' => 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => false,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 2500,
                    'number_of_pools' => 4,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => true,
                    'has_lazy_river' => true,
                    'has_pool_bar' => true,
                    'has_lifeguard' => true,
                    'atmosphere' => 'lively',
                    'is_adults_only' => false,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => true,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],
            [
                'destination_id' => $destinations[2]->id ?? 3,
                'name' => 'Hanging Gardens of Bali',
                'slug' => 'hanging-gardens-bali',
                'address' => 'Desa Buahan, Payangan, Ubud, Bali',
                'description' => 'Iconic jungle resort with world-famous split-level infinity pool overlooking rainforest.',
                'star_rating' => 5,
                'overall_score' => 91.0,
                'family_score' => 65.0,
                'quiet_score' => 96.0,
                'party_score' => 60.0,
                'main_image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => false,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 300,
                    'number_of_pools' => 1,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => false,
                    'has_lazy_river' => false,
                    'has_pool_bar' => false,
                    'has_lifeguard' => false,
                    'atmosphere' => 'quiet',
                    'is_adults_only' => false,
                    'sun_exposure' => 'afternoon',
                    'has_shade_areas' => true,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],

            // Santorini Hotels (3 hotels)
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
                'main_image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => true,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 200,
                    'number_of_pools' => 1,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => false,
                    'has_pool_bar' => true,
                    'has_lifeguard' => false,
                    'atmosphere' => 'quiet',
                    'is_adults_only' => true,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => false,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],
            [
                'destination_id' => $destinations[3]->id ?? 4,
                'name' => 'Katikies Hotel Santorini',
                'slug' => 'katikies-hotel-santorini',
                'address' => 'Oia, Santorini, Greece',
                'description' => 'Luxury cave-style suites with private plunge pools and spectacular sunset views.',
                'star_rating' => 5,
                'overall_score' => 96.0,
                'family_score' => 60.0,
                'quiet_score' => 99.0,
                'party_score' => 65.0,
                'main_image' => 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => false,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 150,
                    'number_of_pools' => 2,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => false,
                    'has_lazy_river' => false,
                    'has_pool_bar' => true,
                    'has_lifeguard' => false,
                    'atmosphere' => 'quiet',
                    'is_adults_only' => true,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => false,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],
            [
                'destination_id' => $destinations[3]->id ?? 4,
                'name' => 'Canaves Oia Suites',
                'slug' => 'canaves-oia-suites',
                'address' => 'Oia, Santorini, Greece',
                'description' => 'Elegant cliffside suites with heated infinity pools and iconic white architecture.',
                'star_rating' => 5,
                'overall_score' => 93.0,
                'family_score' => 70.0,
                'quiet_score' => 95.0,
                'party_score' => 72.0,
                'main_image' => 'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => false,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 180,
                    'number_of_pools' => 2,
                    'has_infinity_pool' => true,
                    'has_heated_pool' => true,
                    'has_kids_pool' => false,
                    'has_pool_bar' => true,
                    'has_lifeguard' => false,
                    'atmosphere' => 'quiet',
                    'is_adults_only' => false,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => true,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],

            // Cancun Hotels (3 hotels)
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
                'main_image' => 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => true,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 3500,
                    'number_of_pools' => 6,
                    'has_infinity_pool' => false,
                    'has_kids_pool' => true,
                    'has_lazy_river' => true,
                    'has_pool_bar' => true,
                    'has_lifeguard' => true,
                    'atmosphere' => 'lively',
                    'is_adults_only' => false,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => true,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],
            [
                'destination_id' => $destinations[4]->id ?? 5,
                'name' => 'Live Aqua Beach Resort Cancun',
                'slug' => 'live-aqua-cancun',
                'address' => 'Blvd. Kukulcan Km 12.5, Zona Hotelera, Cancun, Mexico',
                'description' => 'Adults-only luxury resort with rooftop pool, swim-up bars, and beachfront location.',
                'star_rating' => 5,
                'overall_score' => 91.0,
                'family_score' => 0.0,
                'quiet_score' => 85.0,
                'party_score' => 95.0,
                'main_image' => 'https://images.unsplash.com/photo-1565530952921-0b15a11c9fcd?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => false,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 1800,
                    'number_of_pools' => 3,
                    'has_infinity_pool' => true,
                    'has_rooftop_pool' => true,
                    'has_kids_pool' => false,
                    'has_lazy_river' => false,
                    'has_pool_bar' => true,
                    'has_lifeguard' => true,
                    'atmosphere' => 'party',
                    'is_adults_only' => true,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => true,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
                ],
            ],
            [
                'destination_id' => $destinations[4]->id ?? 5,
                'name' => 'Hyatt Zilara Cancun',
                'slug' => 'hyatt-zilara-cancun',
                'address' => 'Blvd. Kukulcan Km 11.5, Zona Hotelera, Cancun, Mexico',
                'description' => 'All-inclusive adults-only resort with infinity pools, swim-up suites, and vibrant atmosphere.',
                'star_rating' => 5,
                'overall_score' => 89.0,
                'family_score' => 0.0,
                'quiet_score' => 75.0,
                'party_score' => 94.0,
                'main_image' => 'https://images.unsplash.com/photo-1596178060810-7d4d6e66a3c3?w=1200&q=80',
                'is_active' => true,
                'is_verified' => true,
                'is_featured' => false,
                'pool_criteria' => [
                    'total_pool_area_sqm' => 2200,
                    'number_of_pools' => 4,
                    'has_infinity_pool' => true,
                    'has_kids_pool' => false,
                    'has_lazy_river' => false,
                    'has_pool_bar' => true,
                    'has_lifeguard' => true,
                    'atmosphere' => 'party',
                    'is_adults_only' => true,
                    'sun_exposure' => 'all_day',
                    'has_shade_areas' => true,
                    'cleanliness_score' => 5,
                    'maintenance_score' => 5,
                    'water_quality' => 'excellent',
                    'is_verified' => true,
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

        // Update hotel counts for each destination
        foreach ($destinations as $destination) {
            $hotelCount = Hotel::where('destination_id', $destination->id)->count();
            $destination->update(['hotel_count' => $hotelCount]);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Destination;
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
        // Create users
        $this->createUsers();

        // Create destinations
        $this->createDestinations();

        // Call SampleHotelsSeeder for hotels and pool criteria
        $this->call([SampleHotelsSeeder::class]);
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

        // Hotelier User (only if doesn't exist)
        if (!User::where('email', 'hotelier@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Hotelier User',
                'email' => 'hotelier@example.com',
                'role' => 'hotelier',
            ]);
        }

        // Additional random users
        if (User::count() < 15) {
            User::factory(10)->create();
        }

        // Create destinations
        $this->createDestinations();

        // Call SampleHotelsSeeder for hotels and pool criteria
        $this->call([SampleHotelsSeeder::class]);
    }

    /**
     * Create default users
     */
    private function createUsers(): void
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

        // Create hotelier user
        if (!User::where('email', 'hotelier@sunbedranker.com')->exists()) {
            User::create([
                'name' => 'Hotelier User',
                'email' => 'hotelier@sunbedranker.com',
                'password' => bcrypt('Hotelier@123456'),
                'email_verified_at' => now(),
                'role' => 'hotelier',
            ]);
        }
    }

    /**
     * Create sample destinations
     */
    private function createDestinations(): void
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
            ],
            [
                'name' => 'Ibiza',
                'slug' => 'ibiza',
                'country' => 'Spain',
                'country_code' => 'ES',
                'region' => 'Balearic Islands',
                'latitude' => 38.9067,
                'longitude' => 1.4206,
                'description' => 'Party capital with stunning beaches and pools',
                'image' => 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=80',
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Mykonos',
                'slug' => 'mykonos',
                'country' => 'Greece',
                'country_code' => 'GR',
                'region' => 'Cyclades',
                'latitude' => 37.4467,
                'longitude' => 25.3289,
                'description' => 'Luxury Greek island with beautiful pools',
                'image' => 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=80',
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Miami',
                'slug' => 'miami',
                'country' => 'United States',
                'country_code' => 'US',
                'region' => 'Florida',
                'latitude' => 25.7617,
                'longitude' => -80.1918,
                'description' => 'Beach city with vibrant pool scenes',
                'image' => 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1200&q=80',
                'is_featured' => false,
                'is_active' => true,
            ],
        ];

        foreach ($destinationsData as $destData) {
            Destination::firstOrCreate(
                ['slug' => $destData['slug']],
                $destData
            );
        }
    }
}


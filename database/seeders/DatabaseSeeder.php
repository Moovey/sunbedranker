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
        $this->createUsers();
        $this->createDestinations();
        $this->call([SampleHotelsSeeder::class]);
    }

    /**
     * Create default users
     */
    private function createUsers(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => env('ADMIN_EMAIL', 'admin@sunbedranker.com'),
                'password' => bcrypt(env('ADMIN_PASSWORD')),
                'role' => 'admin',
            ],
            [
                'name' => 'Test User',
                'email' => env('TEST_USER_EMAIL', 'user@sunbedranker.com'),
                'password' => bcrypt(env('TEST_USER_PASSWORD')),
                'role' => 'user',
            ],
            [
                'name' => 'Hotelier User',
                'email' => env('HOTELIER_EMAIL', 'hotelier@sunbedranker.com'),
                'password' => bcrypt(env('HOTELIER_PASSWORD')),
                'role' => 'hotelier',
            ],
        ];

        foreach ($users as $userData) {
            User::firstOrCreate(
                ['email' => $userData['email']],
                array_merge($userData, ['email_verified_at' => now()])
            );
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
            [
                'name' => 'Tenerife',
                'slug' => 'tenerife',
                'country' => 'Spain',
                'country_code' => 'ES',
                'region' => 'Canary Islands',
                'latitude' => 28.2916,
                'longitude' => -16.6291,
                'description' => 'The largest Canary Island with year-round sunshine, famous resort pools, and the classic sunbed scramble',
                'image' => 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=1200&q=80',
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Gran Canaria',
                'slug' => 'gran-canaria',
                'country' => 'Spain',
                'country_code' => 'ES',
                'region' => 'Canary Islands',
                'latitude' => 27.9202,
                'longitude' => -15.5474,
                'description' => 'Diverse island with huge resort complexes, bustling pool areas, and legendary sunbed competition',
                'image' => 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&q=80',
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Lanzarote',
                'slug' => 'lanzarote',
                'country' => 'Spain',
                'country_code' => 'ES',
                'region' => 'Canary Islands',
                'latitude' => 29.0469,
                'longitude' => -13.5899,
                'description' => 'Volcanic island with stunning resort pools and a more relaxed sunbed scene',
                'image' => 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1200&q=80',
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Fuerteventura',
                'slug' => 'fuerteventura',
                'country' => 'Spain',
                'country_code' => 'ES',
                'region' => 'Canary Islands',
                'latitude' => 28.3587,
                'longitude' => -14.0537,
                'description' => 'Wind-swept paradise with sprawling resort pools and endless sunshine',
                'image' => 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=80',
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


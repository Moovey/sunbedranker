<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Destination;
use App\Models\Hotel;
use App\Models\PoolCriteria;
use App\Services\HotelScoringService;
use Illuminate\Support\Str;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@sunbedranker.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create Test Users
        User::create([
            'name' => 'John Doe',
            'email' => 'user@example.com',
            'password' => bcrypt('password'),
            'role' => 'user',
            'email_verified_at' => now(),
        ]);

        $hotelier = User::create([
            'name' => 'Hotel Manager',
            'email' => 'hotelier@example.com',
            'password' => bcrypt('password'),
            'role' => 'hotelier',
            'email_verified_at' => now(),
        ]);

        // Create Destinations
        $tenerife = Destination::create([
            'name' => 'Tenerife',
            'slug' => 'tenerife',
            'country' => 'Spain',
            'country_code' => 'ES',
            'region' => 'Canary Islands',
            'description' => 'Year-round sunshine and world-class pool hotels in the Canary Islands.',
            'is_featured' => true,
            'is_active' => true,
        ]);

        $marbella = Destination::create([
            'name' => 'Marbella',
            'slug' => 'marbella',
            'country' => 'Spain',
            'country_code' => 'ES',
            'region' => 'Costa del Sol',
            'description' => 'Luxury beach resorts with stunning pools on the Costa del Sol.',
            'is_featured' => true,
            'is_active' => true,
        ]);

        $algarve = Destination::create([
            'name' => 'Algarve',
            'slug' => 'algarve',
            'country' => 'Portugal',
            'country_code' => 'PT',
            'region' => 'Southern Portugal',
            'description' => 'Beautiful coastline with family-friendly hotels and excellent pools.',
            'is_featured' => true,
            'is_active' => true,
        ]);

        // Create Hotels with Pool Criteria

        // Hotel 1 - Luxury Resort with Excellent Sunbed Ratio
        $hotel1 = Hotel::create([
            'destination_id' => $tenerife->id,
            'name' => 'Royal Sun Palace',
            'slug' => 'royal-sun-palace',
            'description' => 'Five-star luxury resort with multiple pools, infinity pool, and excellent sunbed availability.',
            'address' => 'Avenida del Sol 123, Costa Adeje, Tenerife',
            'star_rating' => 5,
            'total_rooms' => 400,
            'phone' => '+34 922 123 456',
            'email' => 'info@royalsunpalace.com',
            'website' => 'https://royalsunpalace.com',
            'booking_affiliate_url' => 'https://booking.com/hotel/royal-sun-palace',
            'is_active' => true,
            'is_verified' => true,
            'is_featured' => true,
            'subscription_tier' => 'premium',
        ]);

        PoolCriteria::create([
            'hotel_id' => $hotel1->id,
            'total_sunbeds' => 500,
            'total_guests' => 800,
            'sunbed_quality' => 'premium',
            'number_of_pools' => 4,
            'pool_types' => 'main,infinity,rooftop,kids',
            'total_pool_area_sqm' => 2500,
            'has_infinity_pool' => true,
            'has_rooftop_pool' => true,
            'has_heated_pool' => true,
            'has_kids_pool' => true,
            'has_pool_bar' => true,
            'sun_exposure' => 'all_day',
            'has_shade_areas' => true,
            'atmosphere' => 'lively',
            'has_music' => true,
            'music_volume' => 'medium',
            'allows_food_drinks' => true,
            'cleanliness_score' => 5,
            'maintenance_score' => 5,
            'water_quality' => 'excellent',
            'has_lifeguard' => true,
            'wheelchair_accessible' => true,
            'has_changing_facilities' => true,
            'has_pool_toys' => true,
            'has_kids_activities' => true,
            'is_verified' => true,
            'verified_by' => $admin->id,
            'verified_at' => now(),
        ]);

        // Hotel 2 - Adults Only Quiet Resort
        $hotel2 = Hotel::create([
            'destination_id' => $marbella->id,
            'name' => 'Serene Retreat Adults Only',
            'slug' => 'serene-retreat-adults-only',
            'description' => 'Peaceful adults-only resort perfect for quiet sun and relaxation.',
            'address' => 'Calle Tranquila 45, Marbella',
            'star_rating' => 4,
            'total_rooms' => 200,
            'phone' => '+34 952 234 567',
            'email' => 'info@sereneretreat.com',
            'website' => 'https://sereneretreat.com',
            'booking_affiliate_url' => 'https://booking.com/hotel/serene-retreat',
            'is_active' => true,
            'is_verified' => true,
            'subscription_tier' => 'enhanced',
        ]);

        PoolCriteria::create([
            'hotel_id' => $hotel2->id,
            'total_sunbeds' => 250,
            'total_guests' => 400,
            'sunbed_quality' => 'premium',
            'number_of_pools' => 2,
            'pool_types' => 'main,infinity',
            'total_pool_area_sqm' => 1200,
            'has_infinity_pool' => true,
            'has_heated_pool' => true,
            'sun_exposure' => 'all_day',
            'has_shade_areas' => true,
            'atmosphere' => 'quiet',
            'is_adults_only' => true,
            'has_music' => false,
            'music_volume' => 'none',
            'allows_food_drinks' => true,
            'cleanliness_score' => 5,
            'maintenance_score' => 5,
            'water_quality' => 'excellent',
            'has_lifeguard' => true,
            'wheelchair_accessible' => true,
            'has_changing_facilities' => true,
            'is_verified' => true,
            'verified_by' => $admin->id,
            'verified_at' => now(),
        ]);

        // Hotel 3 - Family-Friendly Resort
        $hotel3 = Hotel::create([
            'destination_id' => $algarve->id,
            'name' => 'Sunshine Family Resort',
            'slug' => 'sunshine-family-resort',
            'description' => 'Perfect family hotel with kids pools, water slides, and activities.',
            'address' => 'Rua das Familias 78, Albufeira, Algarve',
            'star_rating' => 4,
            'total_rooms' => 350,
            'phone' => '+351 289 345 678',
            'email' => 'info@sunshinefamily.com',
            'website' => 'https://sunshinefamily.com',
            'booking_affiliate_url' => 'https://booking.com/hotel/sunshine-family',
            'is_active' => true,
            'is_verified' => true,
            'is_featured' => true,
            'subscription_tier' => 'enhanced',
        ]);

        PoolCriteria::create([
            'hotel_id' => $hotel3->id,
            'total_sunbeds' => 300,
            'total_guests' => 700,
            'sunbed_quality' => 'standard',
            'number_of_pools' => 3,
            'pool_types' => 'main,kids,lazy_river',
            'total_pool_area_sqm' => 1800,
            'has_kids_pool' => true,
            'has_lazy_river' => true,
            'has_pool_bar' => true,
            'sun_exposure' => 'all_day',
            'has_shade_areas' => true,
            'atmosphere' => 'family',
            'has_music' => true,
            'music_volume' => 'low',
            'allows_food_drinks' => true,
            'cleanliness_score' => 4,
            'maintenance_score' => 4,
            'water_quality' => 'good',
            'has_lifeguard' => true,
            'wheelchair_accessible' => true,
            'has_changing_facilities' => true,
            'has_pool_toys' => true,
            'has_kids_activities' => true,
            'is_verified' => true,
            'verified_by' => $admin->id,
            'verified_at' => now(),
        ]);

        // Hotel 4 - Budget Hotel with Limited Sunbeds
        $hotel4 = Hotel::create([
            'destination_id' => $tenerife->id,
            'name' => 'Budget Beach Hotel',
            'slug' => 'budget-beach-hotel',
            'description' => 'Affordable hotel with basic pool facilities.',
            'address' => 'Calle Economico 22, Los Cristianos, Tenerife',
            'star_rating' => 3,
            'total_rooms' => 200,
            'phone' => '+34 922 456 789',
            'email' => 'info@budgetbeach.com',
            'is_active' => true,
            'subscription_tier' => 'free',
        ]);

        PoolCriteria::create([
            'hotel_id' => $hotel4->id,
            'total_sunbeds' => 80,
            'total_guests' => 400,
            'sunbed_quality' => 'basic',
            'number_of_pools' => 1,
            'sun_exposure' => 'afternoon',
            'has_shade_areas' => false,
            'atmosphere' => 'mixed',
            'has_music' => true,
            'music_volume' => 'loud',
            'allows_food_drinks' => true,
            'cleanliness_score' => 3,
            'maintenance_score' => 3,
            'water_quality' => 'average',
            'has_lifeguard' => false,
            'has_changing_facilities' => true,
            'is_verified' => true,
            'verified_by' => $admin->id,
            'verified_at' => now(),
        ]);

        // Hotel 5 - Party Resort
        $hotel5 = Hotel::create([
            'destination_id' => $marbella->id,
            'name' => 'Fiesta Beach Club',
            'slug' => 'fiesta-beach-club',
            'description' => 'Lively party hotel with DJ sessions and pool parties.',
            'address' => 'Puerto Banus, Marbella',
            'star_rating' => 4,
            'total_rooms' => 250,
            'phone' => '+34 952 567 890',
            'email' => 'info@fiestabeach.com',
            'website' => 'https://fiestabeach.com',
            'is_active' => true,
            'subscription_tier' => 'enhanced',
        ]);

        PoolCriteria::create([
            'hotel_id' => $hotel5->id,
            'total_sunbeds' => 200,
            'total_guests' => 500,
            'sunbed_quality' => 'standard',
            'number_of_pools' => 2,
            'pool_types' => 'main,rooftop',
            'has_rooftop_pool' => true,
            'has_pool_bar' => true,
            'sun_exposure' => 'all_day',
            'atmosphere' => 'party',
            'has_music' => true,
            'music_volume' => 'loud',
            'allows_food_drinks' => true,
            'cleanliness_score' => 4,
            'maintenance_score' => 4,
            'water_quality' => 'good',
            'has_lifeguard' => true,
            'has_changing_facilities' => true,
            'is_verified' => true,
            'verified_by' => $admin->id,
            'verified_at' => now(),
        ]);

        // Calculate scores for all hotels
        $scoringService = app(HotelScoringService::class);
        foreach (Hotel::all() as $hotel) {
            $scoringService->calculateAndUpdateScores($hotel);
        }

        // Update destination hotel counts
        foreach (Destination::all() as $destination) {
            $destination->updateHotelCount();
        }

        $this->command->info('✅ Demo data created successfully!');
        $this->command->info('');
        $this->command->info('📧 Admin: admin@sunbedranker.com / password');
        $this->command->info('📧 User: user@example.com / password');
        $this->command->info('📧 Hotelier: hotelier@example.com / password');
    }
}

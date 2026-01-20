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

        // Sample hotels for each destination with complete details
        $hotels = [
            // Ibiza
            [
                'destination' => 'ibiza',
                // Basic Info
                'name' => 'Hard Rock Hotel Ibiza',
                'slug' => 'hard-rock-hotel-ibiza',
                'description' => 'Hard Rock Hotel Ibiza is a legendary 5-star resort located on the stunning Playa d\'en Bossa. Known for its rock and roll vibe, world-class pools, and vibrant atmosphere, this hotel offers an unforgettable experience with exceptional sunbed facilities, multiple pools, and top-tier amenities for music lovers and sun seekers alike.',
                'main_image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
                'star_rating' => 5,
                'total_rooms' => 493,
                // Contact & Location
                'address' => 'Carretera Playa D\'en Bossa, s/n, 07817 Sant Jordi de Ses Salines, Ibiza, Spain',
                'latitude' => 38.8851,
                'longitude' => 1.4082,
                'phone' => '+34 971 396 868',
                'email' => 'reservations@hrhibiza.com',
                'website' => 'https://www.hardrockhotelibiza.com',
                // Affiliate Links
                'booking_affiliate_url' => 'https://www.booking.com/hotel/es/hard-rock-ibiza.html?aid=123456',
                'expedia_affiliate_url' => 'https://www.expedia.com/Ibiza-Hotels-Hard-Rock-Hotel-Ibiza.h12345.Hotel-Information?affcid=123456',
                'affiliate_provider' => 'booking',
                'affiliate_tracking_code' => 'HRI-2024-SUNBED',
                // Scores
                'overall_score' => 8.5,
                'family_score' => 7.0,
                'quiet_score' => 4.0,
                'party_score' => 9.5,
                'is_featured' => true,
                // Pool Criteria - Complete
                'poolCriteria' => [
                    // Required fields
                    'sunbed_count' => 450,
                    'sun_exposure' => 'all_day',
                    'pool_size_category' => 'large',
                    // Optional fields
                    'pool_size_sqm' => 1200.00,
                    'number_of_pools' => 3,
                    'pool_types' => ['infinity', 'rooftop', 'kids'],
                    'sunbed_types' => ['cushioned', 'cabanas', 'bali_beds'],
                    'sunny_areas' => ['main_pool', 'rooftop', 'terrace'],
                    'towel_reservation_policy' => 'enforced',
                    'towel_service_cost' => 'included',
                    'pool_opening_hours' => '07:00-22:00',
                    'shade_options' => ['umbrellas', 'cabanas', 'natural_trees'],
                    'bar_distance' => 'poolside',
                    'toilet_distance' => 'close',
                    'atmosphere' => 'lively',
                    'music_level' => 'loud',
                    'entertainment_types' => ['aqua_gym', 'live_music', 'games'],
                    'cleanliness_rating' => 5,
                    'sunbed_condition_rating' => 5,
                    'tiling_condition_rating' => 4,
                    'lifeguard_hours' => '09:00-19:00',
                    'kids_pool_depth_m' => 0.50,
                    // Boolean flags
                    'has_pool_bar' => true,
                    'has_waiter_service' => true,
                    'has_entertainment' => true,
                    'has_accessibility_ramp' => true,
                    'has_pool_hoist' => false,
                    'has_step_free_access' => true,
                    'has_elevator_to_rooftop' => true,
                    'has_kids_pool' => true,
                    'has_splash_park' => false,
                    'has_waterslide' => false,
                    'has_lifeguard' => true,
                    'has_luxury_cabanas' => true,
                    'has_cabana_service' => true,
                    'has_heated_pool' => false,
                    'has_jacuzzi' => true,
                    'has_adult_sun_terrace' => true,
                    // Pool type flags for badges
                    'has_infinity_pool' => true,
                    'has_rooftop_pool' => true,
                    'is_adults_only' => false,
                ],
            ],
            // Mykonos
            [
                'destination' => 'mykonos',
                // Basic Info
                'name' => 'Cavo Tagoo Mykonos',
                'slug' => 'cavo-tagoo-mykonos',
                'description' => 'Cavo Tagoo Mykonos is an iconic 5-star luxury hotel perched on the cliffs above Mykonos Town. Famous for its stunning infinity pool carved into the rock and breathtaking Aegean Sea views, this adults-oriented retreat offers an exclusive pool experience with premium sunbeds, exceptional service, and a serene atmosphere perfect for couples seeking tranquility.',
                'main_image' => 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
                'star_rating' => 5,
                'total_rooms' => 83,
                // Contact & Location
                'address' => 'Mykonos Town, 84600, Mykonos, Greece',
                'latitude' => 37.4467,
                'longitude' => 25.3289,
                'phone' => '+30 22890 20100',
                'email' => 'info@cavotagoo.gr',
                'website' => 'https://www.cavotagoo.gr',
                // Affiliate Links
                'booking_affiliate_url' => 'https://www.booking.com/hotel/gr/cavo-tagoo.html?aid=123456',
                'expedia_affiliate_url' => 'https://www.expedia.com/Mykonos-Hotels-Cavo-Tagoo.h54321.Hotel-Information?affcid=123456',
                'affiliate_provider' => 'booking',
                'affiliate_tracking_code' => 'CTM-2024-SUNBED',
                // Scores
                'overall_score' => 9.2,
                'family_score' => 5.0,
                'quiet_score' => 9.0,
                'party_score' => 6.0,
                'is_featured' => true,
                // Pool Criteria - Complete
                'poolCriteria' => [
                    // Required fields
                    'sunbed_count' => 120,
                    'sun_exposure' => 'all_day',
                    'pool_size_category' => 'medium',
                    // Optional fields
                    'pool_size_sqm' => 450.00,
                    'number_of_pools' => 2,
                    'pool_types' => ['infinity', 'indoor'],
                    'sunbed_types' => ['cushioned', 'bali_beds'],
                    'sunny_areas' => ['main_pool', 'terrace'],
                    'towel_reservation_policy' => 'enforced',
                    'towel_service_cost' => 'included',
                    'pool_opening_hours' => '08:00-20:00',
                    'shade_options' => ['umbrellas', 'pergolas'],
                    'bar_distance' => 'poolside',
                    'toilet_distance' => 'adjacent',
                    'atmosphere' => 'quiet',
                    'music_level' => 'low',
                    'entertainment_types' => [],
                    'cleanliness_rating' => 5,
                    'sunbed_condition_rating' => 5,
                    'tiling_condition_rating' => 5,
                    'lifeguard_hours' => null,
                    'kids_pool_depth_m' => null,
                    // Boolean flags
                    'has_pool_bar' => true,
                    'has_waiter_service' => true,
                    'has_entertainment' => false,
                    'has_accessibility_ramp' => true,
                    'has_pool_hoist' => false,
                    'has_step_free_access' => false,
                    'has_elevator_to_rooftop' => false,
                    'has_kids_pool' => false,
                    'has_splash_park' => false,
                    'has_waterslide' => false,
                    'has_lifeguard' => false,
                    'has_luxury_cabanas' => true,
                    'has_cabana_service' => true,
                    'has_heated_pool' => true,
                    'has_jacuzzi' => true,
                    'has_adult_sun_terrace' => true,
                    // Pool type flags for badges
                    'has_infinity_pool' => true,
                    'has_rooftop_pool' => false,
                    'is_adults_only' => true,
                ],
            ],
            // Dubai - Burj Al Arab
            [
                'destination' => 'dubai',
                // Basic Info
                'name' => 'Burj Al Arab Jumeirah',
                'slug' => 'burj-al-arab-jumeirah',
                'description' => 'The iconic Burj Al Arab Jumeirah stands as the world\'s most luxurious hotel, offering unparalleled 5-star service in Dubai. With its distinctive sail-shaped silhouette, this all-suite hotel features exceptional pool facilities including an infinity-edge terrace pool, private beach cabanas, and world-class sunbed experiences with butler service.',
                'main_image' => 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
                'star_rating' => 5,
                'total_rooms' => 202,
                // Contact & Location
                'address' => 'Jumeirah Beach Road, Jumeirah 3, Dubai, United Arab Emirates',
                'latitude' => 25.1412,
                'longitude' => 55.1853,
                'phone' => '+971 4 301 7777',
                'email' => 'BAJreservations@jumeirah.com',
                'website' => 'https://www.jumeirah.com/burj-al-arab',
                // Affiliate Links
                'booking_affiliate_url' => 'https://www.booking.com/hotel/ae/burj-al-arab.html?aid=123456',
                'expedia_affiliate_url' => 'https://www.expedia.com/Dubai-Hotels-Burj-Al-Arab-Jumeirah.h98765.Hotel-Information?affcid=123456',
                'affiliate_provider' => 'expedia',
                'affiliate_tracking_code' => 'BAA-2024-SUNBED',
                // Scores
                'overall_score' => 9.8,
                'family_score' => 8.5,
                'quiet_score' => 8.0,
                'party_score' => 5.0,
                'is_featured' => true,
                // Pool Criteria - Complete
                'poolCriteria' => [
                    // Required fields
                    'sunbed_count' => 300,
                    'sun_exposure' => 'all_day',
                    'pool_size_category' => 'large',
                    // Optional fields
                    'pool_size_sqm' => 2000.00,
                    'number_of_pools' => 4,
                    'pool_types' => ['infinity', 'indoor', 'kids', 'heated'],
                    'sunbed_types' => ['cushioned', 'cabanas', 'bali_beds'],
                    'sunny_areas' => ['main_pool', 'quiet_area', 'terrace', 'rooftop'],
                    'towel_reservation_policy' => 'enforced',
                    'towel_service_cost' => 'included',
                    'pool_opening_hours' => '06:00-22:00',
                    'shade_options' => ['umbrellas', 'cabanas', 'pergolas'],
                    'bar_distance' => 'poolside',
                    'toilet_distance' => 'adjacent',
                    'atmosphere' => 'quiet',
                    'music_level' => 'low',
                    'entertainment_types' => ['aqua_gym'],
                    'cleanliness_rating' => 5,
                    'sunbed_condition_rating' => 5,
                    'tiling_condition_rating' => 5,
                    'lifeguard_hours' => '06:00-20:00',
                    'kids_pool_depth_m' => 0.40,
                    // Boolean flags
                    'has_pool_bar' => true,
                    'has_waiter_service' => true,
                    'has_entertainment' => true,
                    'has_accessibility_ramp' => true,
                    'has_pool_hoist' => true,
                    'has_step_free_access' => true,
                    'has_elevator_to_rooftop' => true,
                    'has_kids_pool' => true,
                    'has_splash_park' => true,
                    'has_waterslide' => false,
                    'has_lifeguard' => true,
                    'has_luxury_cabanas' => true,
                    'has_cabana_service' => true,
                    'has_heated_pool' => true,
                    'has_jacuzzi' => true,
                    'has_adult_sun_terrace' => true,
                    // Pool type flags for badges
                    'has_infinity_pool' => true,
                    'has_rooftop_pool' => false,
                    'is_adults_only' => false,
                ],
            ],
            // Dubai - Atlantis
            [
                'destination' => 'dubai',
                // Basic Info
                'name' => 'Atlantis The Palm',
                'slug' => 'atlantis-the-palm',
                'description' => 'Atlantis The Palm is Dubai\'s iconic ocean-themed destination resort on the crescent of Palm Jumeirah. This 5-star resort is a family paradise featuring Aquaventure Waterpark, multiple pools, pristine beaches, and extensive sunbed facilities. With underwater suites, marine attractions, and exceptional pool experiences, it\'s perfect for families seeking adventure.',
                'main_image' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
                'star_rating' => 5,
                'total_rooms' => 1548,
                // Contact & Location
                'address' => 'Crescent Road, The Palm, Dubai, United Arab Emirates',
                'latitude' => 25.1304,
                'longitude' => 55.1171,
                'phone' => '+971 4 426 2000',
                'email' => 'reservations@atlantisthepalm.com',
                'website' => 'https://www.atlantis.com/dubai',
                // Affiliate Links
                'booking_affiliate_url' => 'https://www.booking.com/hotel/ae/atlantis-the-palm.html?aid=123456',
                'expedia_affiliate_url' => 'https://www.expedia.com/Dubai-Hotels-Atlantis-The-Palm.h11111.Hotel-Information?affcid=123456',
                'affiliate_provider' => 'booking',
                'affiliate_tracking_code' => 'ATP-2024-SUNBED',
                // Scores
                'overall_score' => 8.9,
                'family_score' => 9.5,
                'quiet_score' => 5.0,
                'party_score' => 7.5,
                'is_featured' => true,
                // Pool Criteria - Complete
                'poolCriteria' => [
                    // Required fields
                    'sunbed_count' => 800,
                    'sun_exposure' => 'all_day',
                    'pool_size_category' => 'large',
                    // Optional fields
                    'pool_size_sqm' => 5000.00,
                    'number_of_pools' => 6,
                    'pool_types' => ['kids', 'lagoon', 'heated'],
                    'sunbed_types' => ['plastic', 'cushioned', 'cabanas'],
                    'sunny_areas' => ['main_pool', 'quiet_area', 'kids_pool'],
                    'towel_reservation_policy' => 'tolerated',
                    'towel_service_cost' => 'included',
                    'pool_opening_hours' => '07:00-21:00',
                    'shade_options' => ['umbrellas', 'cabanas', 'natural_trees'],
                    'bar_distance' => 'poolside',
                    'toilet_distance' => 'close',
                    'atmosphere' => 'lively',
                    'music_level' => 'moderate',
                    'entertainment_types' => ['aqua_gym', 'games', 'animation_team'],
                    'cleanliness_rating' => 4,
                    'sunbed_condition_rating' => 4,
                    'tiling_condition_rating' => 4,
                    'lifeguard_hours' => '07:00-21:00',
                    'kids_pool_depth_m' => 0.30,
                    // Boolean flags
                    'has_pool_bar' => true,
                    'has_waiter_service' => true,
                    'has_entertainment' => true,
                    'has_accessibility_ramp' => true,
                    'has_pool_hoist' => true,
                    'has_step_free_access' => true,
                    'has_elevator_to_rooftop' => false,
                    'has_kids_pool' => true,
                    'has_splash_park' => true,
                    'has_waterslide' => true,
                    'has_lifeguard' => true,
                    'has_luxury_cabanas' => true,
                    'has_cabana_service' => true,
                    'has_heated_pool' => false,
                    'has_jacuzzi' => true,
                    'has_adult_sun_terrace' => false,
                    // Pool type flags for badges
                    'has_infinity_pool' => false,
                    'has_rooftop_pool' => false,
                    'is_adults_only' => false,
                ],
            ],
            // Bali
            [
                'destination' => 'bali',
                // Basic Info
                'name' => 'Four Seasons Resort Bali at Jimbaran Bay',
                'slug' => 'four-seasons-bali-jimbaran',
                'description' => 'Four Seasons Resort Bali at Jimbaran Bay is an exquisite 5-star tropical retreat set within traditional Balinese village architecture. Featuring stunning infinity pools overlooking Jimbaran Bay, this resort offers an unparalleled pool experience with premium sunbeds, private plunge pools in villas, and world-class service in a serene, tranquil setting.',
                'main_image' => 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
                'star_rating' => 5,
                'total_rooms' => 147,
                // Contact & Location
                'address' => 'Jimbaran Bay, Jimbaran 80361, Bali, Indonesia',
                'latitude' => -8.7636,
                'longitude' => 115.1661,
                'phone' => '+62 361 701 010',
                'email' => 'reservations.bali@fourseasons.com',
                'website' => 'https://www.fourseasons.com/jimbaranbay',
                // Affiliate Links
                'booking_affiliate_url' => 'https://www.booking.com/hotel/id/four-seasons-resort-bali-at-jimbaran-bay.html?aid=123456',
                'expedia_affiliate_url' => 'https://www.expedia.com/Bali-Hotels-Four-Seasons-Jimbaran.h22222.Hotel-Information?affcid=123456',
                'affiliate_provider' => 'booking',
                'affiliate_tracking_code' => 'FSB-2024-SUNBED',
                // Scores
                'overall_score' => 9.5,
                'family_score' => 8.0,
                'quiet_score' => 9.5,
                'party_score' => 3.0,
                'is_featured' => true,
                // Pool Criteria - Complete
                'poolCriteria' => [
                    // Required fields
                    'sunbed_count' => 180,
                    'sun_exposure' => 'all_day',
                    'pool_size_category' => 'medium',
                    // Optional fields
                    'pool_size_sqm' => 600.00,
                    'number_of_pools' => 3,
                    'pool_types' => ['infinity', 'kids', 'heated'],
                    'sunbed_types' => ['cushioned', 'bali_beds', 'cabanas'],
                    'sunny_areas' => ['main_pool', 'quiet_area', 'terrace', 'adult_pool'],
                    'towel_reservation_policy' => 'enforced',
                    'towel_service_cost' => 'included',
                    'pool_opening_hours' => '06:00-21:00',
                    'shade_options' => ['umbrellas', 'pergolas', 'natural_trees'],
                    'bar_distance' => 'poolside',
                    'toilet_distance' => 'adjacent',
                    'atmosphere' => 'quiet',
                    'music_level' => 'low',
                    'entertainment_types' => ['aqua_gym'],
                    'cleanliness_rating' => 5,
                    'sunbed_condition_rating' => 5,
                    'tiling_condition_rating' => 5,
                    'lifeguard_hours' => '08:00-18:00',
                    'kids_pool_depth_m' => 0.60,
                    // Boolean flags
                    'has_pool_bar' => true,
                    'has_waiter_service' => true,
                    'has_entertainment' => true,
                    'has_accessibility_ramp' => true,
                    'has_pool_hoist' => false,
                    'has_step_free_access' => true,
                    'has_elevator_to_rooftop' => false,
                    'has_kids_pool' => true,
                    'has_splash_park' => false,
                    'has_waterslide' => false,
                    'has_lifeguard' => true,
                    'has_luxury_cabanas' => true,
                    'has_cabana_service' => true,
                    'has_heated_pool' => false,
                    'has_jacuzzi' => true,
                    'has_adult_sun_terrace' => true,
                    // Pool type flags for badges
                    'has_infinity_pool' => true,
                    'has_rooftop_pool' => false,
                    'is_adults_only' => false,
                ],
            ],
            // Miami
            [
                'destination' => 'miami',
                // Basic Info
                'name' => 'Fontainebleau Miami Beach',
                'slug' => 'fontainebleau-miami-beach',
                'description' => 'Fontainebleau Miami Beach is an iconic 5-star luxury resort that has defined Miami Beach glamour since 1954. This legendary hotel features multiple spectacular pools, including the famous bow-tie pool and adults-only Arkadia pool, with extensive sunbed facilities, VIP cabanas, and a vibrant pool scene that embodies the energy of Miami.',
                'main_image' => 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
                'star_rating' => 5,
                'total_rooms' => 1504,
                // Contact & Location
                'address' => '4441 Collins Avenue, Miami Beach, FL 33140, United States',
                'latitude' => 25.8388,
                'longitude' => -80.1203,
                'phone' => '+1 305 538 2000',
                'email' => 'reservations@fontainebleau.com',
                'website' => 'https://www.fontainebleau.com',
                // Affiliate Links
                'booking_affiliate_url' => 'https://www.booking.com/hotel/us/fontainebleau-miami-beach.html?aid=123456',
                'expedia_affiliate_url' => 'https://www.expedia.com/Miami-Hotels-Fontainebleau-Miami-Beach.h33333.Hotel-Information?affcid=123456',
                'affiliate_provider' => 'expedia',
                'affiliate_tracking_code' => 'FMB-2024-SUNBED',
                // Scores
                'overall_score' => 8.7,
                'family_score' => 7.5,
                'quiet_score' => 6.0,
                'party_score' => 9.0,
                'is_featured' => true,
                // Pool Criteria - Complete
                'poolCriteria' => [
                    // Required fields
                    'sunbed_count' => 600,
                    'sun_exposure' => 'all_day',
                    'pool_size_category' => 'large',
                    // Optional fields
                    'pool_size_sqm' => 3500.00,
                    'number_of_pools' => 5,
                    'pool_types' => ['infinity', 'kids', 'adult_only', 'rooftop'],
                    'sunbed_types' => ['plastic', 'cushioned', 'cabanas', 'bali_beds'],
                    'sunny_areas' => ['main_pool', 'quiet_area', 'rooftop', 'terrace'],
                    'towel_reservation_policy' => 'tolerated',
                    'towel_service_cost' => 'included',
                    'pool_opening_hours' => '07:00-22:00',
                    'shade_options' => ['umbrellas', 'cabanas', 'natural_trees'],
                    'bar_distance' => 'poolside',
                    'toilet_distance' => 'close',
                    'atmosphere' => 'lively',
                    'music_level' => 'loud',
                    'entertainment_types' => ['aqua_gym', 'games', 'live_music'],
                    'cleanliness_rating' => 4,
                    'sunbed_condition_rating' => 4,
                    'tiling_condition_rating' => 4,
                    'lifeguard_hours' => '08:00-20:00',
                    'kids_pool_depth_m' => 0.45,
                    // Boolean flags
                    'has_pool_bar' => true,
                    'has_waiter_service' => true,
                    'has_entertainment' => true,
                    'has_accessibility_ramp' => true,
                    'has_pool_hoist' => true,
                    'has_step_free_access' => true,
                    'has_elevator_to_rooftop' => true,
                    'has_kids_pool' => true,
                    'has_splash_park' => true,
                    'has_waterslide' => false,
                    'has_lifeguard' => true,
                    'has_luxury_cabanas' => true,
                    'has_cabana_service' => true,
                    'has_heated_pool' => true,
                    'has_jacuzzi' => true,
                    'has_adult_sun_terrace' => true,
                    // Pool type flags for badges
                    'has_infinity_pool' => true,
                    'has_rooftop_pool' => true,
                    'is_adults_only' => false,
                ],
            ],
            // Additional hotels to showcase variety
            // Ibiza - Budget friendly option
            [
                'destination' => 'ibiza',
                // Basic Info
                'name' => 'Ocean Beach Ibiza',
                'slug' => 'ocean-beach-ibiza',
                'description' => 'Ocean Beach Ibiza is a vibrant 4-star beach club hotel known for its famous pool parties and energetic atmosphere. Located on the stunning San Antonio Bay, this hotel offers an exciting pool experience with DJ entertainment, beach access, and a lively social scene perfect for party-goers and young travelers.',
                'main_image' => 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
                'star_rating' => 4,
                'total_rooms' => 175,
                // Contact & Location
                'address' => 'Carrer de ses Variades, 16, 07820 Sant Antoni de Portmany, Ibiza, Spain',
                'latitude' => 38.9803,
                'longitude' => 1.2990,
                'phone' => '+34 971 803 935',
                'email' => 'info@oceanbeachibiza.com',
                'website' => 'https://www.oceanbeachibiza.com',
                // Affiliate Links
                'booking_affiliate_url' => 'https://www.booking.com/hotel/es/ocean-beach-ibiza.html?aid=123456',
                'expedia_affiliate_url' => 'https://www.expedia.com/Ibiza-Hotels-Ocean-Beach-Ibiza.h44444.Hotel-Information?affcid=123456',
                'affiliate_provider' => 'booking',
                'affiliate_tracking_code' => 'OBI-2024-SUNBED',
                // Scores
                'overall_score' => 7.8,
                'family_score' => 3.0,
                'quiet_score' => 2.0,
                'party_score' => 10.0,
                'is_featured' => false,
                // Pool Criteria - Complete
                'poolCriteria' => [
                    // Required fields
                    'sunbed_count' => 250,
                    'sun_exposure' => 'all_day',
                    'pool_size_category' => 'medium',
                    // Optional fields
                    'pool_size_sqm' => 400.00,
                    'number_of_pools' => 1,
                    'pool_types' => ['lagoon'],
                    'sunbed_types' => ['plastic', 'cushioned'],
                    'sunny_areas' => ['main_pool', 'quiet_area'],
                    'towel_reservation_policy' => 'free_for_all',
                    'towel_service_cost' => 'extra_cost',
                    'pool_opening_hours' => '10:00-02:00',
                    'shade_options' => ['umbrellas'],
                    'bar_distance' => 'poolside',
                    'toilet_distance' => 'close',
                    'atmosphere' => 'party',
                    'music_level' => 'dj',
                    'entertainment_types' => ['aqua_gym', 'games', 'live_music'],
                    'cleanliness_rating' => 3,
                    'sunbed_condition_rating' => 3,
                    'tiling_condition_rating' => 3,
                    'lifeguard_hours' => '10:00-18:00',
                    'kids_pool_depth_m' => null,
                    // Boolean flags
                    'has_pool_bar' => true,
                    'has_waiter_service' => true,
                    'has_entertainment' => true,
                    'has_accessibility_ramp' => false,
                    'has_pool_hoist' => false,
                    'has_step_free_access' => false,
                    'has_elevator_to_rooftop' => false,
                    'has_kids_pool' => false,
                    'has_splash_park' => false,
                    'has_waterslide' => false,
                    'has_lifeguard' => true,
                    'has_luxury_cabanas' => false,
                    'has_cabana_service' => false,
                    'has_heated_pool' => false,
                    'has_jacuzzi' => false,
                    'has_adult_sun_terrace' => true,
                    // Pool type flags for badges
                    'has_infinity_pool' => false,
                    'has_rooftop_pool' => false,
                    'is_adults_only' => true,
                ],
            ],
            // Bali - Boutique option
            [
                'destination' => 'bali',
                // Basic Info
                'name' => 'COMO Uma Ubud',
                'slug' => 'como-uma-ubud',
                'description' => 'COMO Uma Ubud is an intimate 5-star boutique resort nestled in the cultural heart of Bali. Set amidst tropical forest and overlooking the Tjampuhan Valley, this serene retreat offers a stunning infinity pool, yoga pavilion, and holistic wellness programs. Perfect for travelers seeking tranquility, mindfulness, and an authentic Balinese experience.',
                'main_image' => 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
                'star_rating' => 5,
                'total_rooms' => 46,
                // Contact & Location
                'address' => 'Jalan Raya Sanggingan, Banjar Lungsiakan, Ubud 80571, Bali, Indonesia',
                'latitude' => -8.4950,
                'longitude' => 115.2554,
                'phone' => '+62 361 972 448',
                'email' => 'res.uma.ubud@comohotels.com',
                'website' => 'https://www.comohotels.com/uma-ubud',
                // Affiliate Links
                'booking_affiliate_url' => 'https://www.booking.com/hotel/id/como-uma-ubud.html?aid=123456',
                'expedia_affiliate_url' => 'https://www.expedia.com/Bali-Hotels-COMO-Uma-Ubud.h55555.Hotel-Information?affcid=123456',
                'affiliate_provider' => 'booking',
                'affiliate_tracking_code' => 'CUU-2024-SUNBED',
                // Scores
                'overall_score' => 9.0,
                'family_score' => 6.0,
                'quiet_score' => 10.0,
                'party_score' => 1.0,
                'is_featured' => false,
                // Pool Criteria - Complete
                'poolCriteria' => [
                    // Required fields
                    'sunbed_count' => 40,
                    'sun_exposure' => 'partial_shade',
                    'pool_size_category' => 'small',
                    // Optional fields
                    'pool_size_sqm' => 150.00,
                    'number_of_pools' => 1,
                    'pool_types' => ['infinity'],
                    'sunbed_types' => ['cushioned', 'bali_beds'],
                    'sunny_areas' => ['main_pool', 'terrace'],
                    'towel_reservation_policy' => 'enforced',
                    'towel_service_cost' => 'included',
                    'pool_opening_hours' => '07:00-19:00',
                    'shade_options' => ['umbrellas', 'pergolas', 'natural_trees'],
                    'bar_distance' => 'close',
                    'toilet_distance' => 'adjacent',
                    'atmosphere' => 'quiet',
                    'music_level' => 'none',
                    'entertainment_types' => [],
                    'cleanliness_rating' => 5,
                    'sunbed_condition_rating' => 5,
                    'tiling_condition_rating' => 5,
                    'lifeguard_hours' => null,
                    'kids_pool_depth_m' => null,
                    // Boolean flags
                    'has_pool_bar' => false,
                    'has_waiter_service' => true,
                    'has_entertainment' => false,
                    'has_accessibility_ramp' => false,
                    'has_pool_hoist' => false,
                    'has_step_free_access' => false,
                    'has_elevator_to_rooftop' => false,
                    'has_kids_pool' => false,
                    'has_splash_park' => false,
                    'has_waterslide' => false,
                    'has_lifeguard' => false,
                    'has_luxury_cabanas' => false,
                    'has_cabana_service' => false,
                    'has_heated_pool' => false,
                    'has_jacuzzi' => false,
                    'has_adult_sun_terrace' => true,
                    // Pool type flags for badges
                    'has_infinity_pool' => true,
                    'has_rooftop_pool' => false,
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




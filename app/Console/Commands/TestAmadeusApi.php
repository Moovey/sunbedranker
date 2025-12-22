<?php

namespace App\Console\Commands;

use App\Services\AmadeusService;
use Illuminate\Console\Command;

class TestAmadeusApi extends Command
{
    protected $signature = 'amadeus:test';
    protected $description = 'Test Amadeus API connection';

    public function handle(AmadeusService $amadeus): int
    {
        $this->info('🧪 Testing Amadeus API...');
        $this->newLine();
        
        try {
            // Step 1: Test authentication
            $this->info('Step 1: Testing authentication...');
            $token = $amadeus->getAccessToken();
            $this->info("✅ Got access token: " . substr($token, 0, 20) . "...");
            $this->newLine();
            
            // Step 2: Search hotels by city code
            $this->info('Step 2: Searching hotels in Paris (PAR)...');
            $hotels = $amadeus->searchHotelsByCity('PAR', ['radius' => 5]);
            
            if (!empty($hotels)) {
                $this->info("✅ Found " . count($hotels) . " hotels in Paris!");
                $this->newLine();
                
                // Show first 5 hotels
                $this->table(
                    ['Hotel ID', 'Name', 'City'],
                    collect($hotels)->take(5)->map(function ($hotel) use ($amadeus) {
                        $parsed = $amadeus->parseHotelData($hotel);
                        return [
                            $parsed['amadeus_id'],
                            substr($parsed['name'], 0, 40),
                            $parsed['address']['city'] ?? 'N/A',
                        ];
                    })->toArray()
                );
                
                $this->newLine();
                $this->info('✅ Amadeus API is working correctly!');
                $this->newLine();
                $this->info('📝 Next steps:');
                $this->line('  1. Add IATA codes or coordinates to your destinations');
                $this->line('  2. Run: php artisan hotels:import-amadeus {destination}');
                return self::SUCCESS;
            }
            
            // Try with coordinates instead
            $this->warn('⚠️  No hotels found with city code.');
            $this->info('Step 3: Trying with coordinates (Paris)...');
            $this->newLine();
            
            $hotels = $amadeus->searchHotelsByGeocode(48.8566, 2.3522, 5);
            
            if (!empty($hotels)) {
                $this->info("✅ Found " . count($hotels) . " hotels!");
                
                // Show first 3 hotels
                $this->table(
                    ['Hotel ID', 'Name'],
                    collect($hotels)->take(3)->map(function ($hotel) use ($amadeus) {
                        $parsed = $amadeus->parseHotelData($hotel);
                        return [
                            $parsed['amadeus_id'],
                            substr($parsed['name'], 0, 50),
                        ];
                    })->toArray()
                );
                
                return self::SUCCESS;
            }
            
            $this->error('❌ No hotels found with either method.');
            $this->error('Please check:');
            $this->line('  1. Your API credentials are correct in .env');
            $this->line('  2. You have API quota remaining');
            $this->line('  3. Try using production URL: AMADEUS_BASE_URL=https://api.amadeus.com');
            
            return self::FAILURE;
            
        } catch (\Exception $e) {
            $this->error('❌ Error: ' . $e->getMessage());
            $this->newLine();
            $this->error('Stack trace:');
            $this->line($e->getTraceAsString());
            return self::FAILURE;
        }
    }
}

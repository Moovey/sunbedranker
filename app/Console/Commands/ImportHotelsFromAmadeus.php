<?php

namespace App\Console\Commands;

use App\Models\Destination;
use App\Models\Hotel;
use App\Services\AmadeusService;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class ImportHotelsFromAmadeus extends Command
{
    protected $signature = 'hotels:import-amadeus 
                            {destination? : The destination slug to import hotels for}
                            {--all : Import for all destinations}';

    protected $description = 'Import hotel data from Amadeus API';

    private AmadeusService $amadeusService;

    public function __construct(AmadeusService $amadeusService)
    {
        parent::__construct();
        $this->amadeusService = $amadeusService;
    }

    public function handle(): int
    {
        $this->info('🚀 Starting Amadeus hotel import...');

        if ($this->option('all')) {
            $destinations = Destination::where('is_active', true)->get();
        } elseif ($destinationSlug = $this->argument('destination')) {
            $destinations = Destination::where('slug', $destinationSlug)->get();
        } else {
            $this->error('Please specify a destination or use --all flag');
            return self::FAILURE;
        }

        if ($destinations->isEmpty()) {
            $this->error('No destinations found');
            return self::FAILURE;
        }

        foreach ($destinations as $destination) {
            $this->importHotelsForDestination($destination);
        }

        $this->info('✅ Import completed!');
        return self::SUCCESS;
    }

    private function importHotelsForDestination(Destination $destination): void
    {
        $this->info("📍 Importing hotels for: {$destination->name}");

        // Get hotels from Amadeus
        $hotels = [];
        
        if ($destination->latitude && $destination->longitude) {
            $this->line("  Searching by coordinates...");
            $hotels = $this->amadeusService->searchHotelsByGeocode(
                $destination->latitude,
                $destination->longitude,
                30 // 30km radius
            );
        } elseif ($destination->iata_code) {
            $this->line("  Searching by IATA code: {$destination->iata_code}");
            $hotels = $this->amadeusService->searchHotelsByCity($destination->iata_code);
        }

        if (empty($hotels)) {
            $this->warn("  ⚠️  No hotels found");
            return;
        }

        $this->line("  Found " . count($hotels) . " hotels");
        $imported = 0;
        $skipped = 0;

        $bar = $this->output->createProgressBar(count($hotels));
        $bar->start();

        foreach ($hotels as $hotelData) {
            $parsedData = $this->amadeusService->parseHotelData($hotelData);
            
            // Check if hotel already exists
            $existing = Hotel::where('amadeus_id', $parsedData['amadeus_id'])
                ->orWhere(function ($query) use ($parsedData) {
                    $query->where('name', $parsedData['name'])
                        ->where('destination_id', $parsedData['destination_id'] ?? null);
                })
                ->first();

            if ($existing) {
                $skipped++;
                $bar->advance();
                continue;
            }

            // Create new hotel
            Hotel::create([
                'destination_id' => $destination->id,
                'amadeus_id' => $parsedData['amadeus_id'],
                'name' => $parsedData['name'],
                'slug' => Str::slug($parsedData['name'] . '-' . $destination->slug),
                'address' => $parsedData['full_address'],
                'latitude' => $parsedData['coordinates']['latitude'],
                'longitude' => $parsedData['coordinates']['longitude'],
                'is_active' => true,
                'subscription_tier' => 'free',
            ]);

            $imported++;
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        $this->info("  ✅ Imported: {$imported} | Skipped: {$skipped}");
    }
}

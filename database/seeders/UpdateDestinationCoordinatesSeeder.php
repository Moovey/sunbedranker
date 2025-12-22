<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Destination;

class UpdateDestinationCoordinatesSeeder extends Seeder
{
    public function run(): void
    {
        $coordinates = [
            'tenerife' => ['latitude' => 28.2916, 'longitude' => -16.6291],
            'marbella' => ['latitude' => 36.5095, 'longitude' => -4.8826],
            'algarve' => ['latitude' => 37.0179, 'longitude' => -7.9304],
            'ibiza' => ['latitude' => 38.9067, 'longitude' => 1.4206],
            'mykonos' => ['latitude' => 37.4467, 'longitude' => 25.3289],
            'dubai' => ['latitude' => 25.2048, 'longitude' => 55.2708],
            'bali' => ['latitude' => -8.3405, 'longitude' => 115.0920],
            'miami' => ['latitude' => 25.7617, 'longitude' => -80.1918],
        ];

        foreach ($coordinates as $slug => $coords) {
            Destination::where('slug', $slug)->update($coords);
            $this->command->info("Updated coordinates for: {$slug}");
        }

        $this->command->info('Destination coordinates updated successfully!');
    }
}

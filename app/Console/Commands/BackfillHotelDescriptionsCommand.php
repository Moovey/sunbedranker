<?php

namespace App\Console\Commands;

use App\Models\Hotel;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class BackfillHotelDescriptionsCommand extends Command
{
    protected $signature = 'hotels:backfill-descriptions';
    protected $description = 'Backfill descriptions from agoda_hotels overview for promoted hotels missing descriptions';

    public function handle()
    {
        $hotels = Hotel::whereNotNull('agoda_hotel_id')
            ->where(function ($q) {
                $q->whereNull('description')->orWhere('description', '');
            })
            ->get();

        if ($hotels->isEmpty()) {
            $this->info('All promoted hotels already have descriptions.');
            return 0;
        }

        $this->info("Found {$hotels->count()} promoted hotels without descriptions.");

        $updated = 0;
        foreach ($hotels as $hotel) {
            $overview = DB::table('agoda_hotels')
                ->where('agoda_hotel_id', $hotel->agoda_hotel_id)
                ->value('overview');

            if ($overview) {
                $hotel->update(['description' => $overview]);
                $this->line("  ✓ {$hotel->name}");
                $updated++;
            } else {
                $this->warn("  ✗ {$hotel->name} — no overview in agoda_hotels");
            }
        }

        $this->info("Updated {$updated} hotel descriptions.");
        return 0;
    }
}

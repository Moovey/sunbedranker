<?php

namespace App\Console\Commands;

use App\Jobs\GenerateDestinationAiContent;
use App\Jobs\GenerateHotelAiContent;
use App\Models\Destination;
use App\Models\Hotel;
use Illuminate\Console\Command;

/**
 * Backfill AI SEO content for already-promoted hotels and their destinations.
 *
 * Examples:
 *   php artisan ai:backfill                       # all active hotels missing AI content
 *   php artisan ai:backfill --limit=10            # cap how many to dispatch
 *   php artisan ai:backfill --hotel=123           # one specific hotel
 *   php artisan ai:backfill --destination=45      # one destination only
 *   php artisan ai:backfill --force               # regenerate even if AI content exists
 *   php artisan ai:backfill --destinations-only   # skip hotels, regenerate destinations
 */
class BackfillAiContent extends Command
{
    protected $signature = 'ai:backfill
        {--limit=0 : Max number of hotels to dispatch (0 = no cap)}
        {--hotel= : Only this hotel id}
        {--destination= : Only this destination id}
        {--force : Regenerate even when AI content already exists}
        {--destinations-only : Only regenerate destinations, skip hotels}
        {--hotels-only : Only regenerate hotels, skip destinations}';

    protected $description = 'Queue AI SEO content generation for promoted hotels and destinations.';

    public function handle(): int
    {
        $force = (bool) $this->option('force');
        $limit = (int) $this->option('limit');

        if (!$this->option('destinations-only')) {
            $this->dispatchHotels($force, $limit);
        }

        if (!$this->option('hotels-only')) {
            $this->dispatchDestinations($force);
        }

        $this->info('All AI content jobs dispatched. Run "php artisan queue:work" to process them.');

        return self::SUCCESS;
    }

    protected function dispatchHotels(bool $force, int $limit): void
    {
        $query = Hotel::query()->where('is_active', true);

        if ($id = $this->option('hotel')) {
            $query->where('id', $id);
        } elseif (!$force) {
            $query->whereNull('ai_generated_at');
        }

        if ($limit > 0) {
            $query->limit($limit);
        }

        $count = (clone $query)->count();
        if ($count === 0) {
            $this->line('No hotels need AI content.');
            return;
        }

        $this->info("Dispatching {$count} hotel AI jobs...");
        $bar = $this->output->createProgressBar($count);

        $query->select('id')->orderBy('id')->chunkById(200, function ($hotels) use ($bar) {
            foreach ($hotels as $hotel) {
                GenerateHotelAiContent::dispatch($hotel->id);
                $bar->advance();
            }
        });

        $bar->finish();
        $this->newLine();
    }

    protected function dispatchDestinations(bool $force): void
    {
        $query = Destination::query()
            ->where('is_active', true)
            ->whereHas('activeHotels');

        if ($id = $this->option('destination')) {
            $query->where('id', $id);
        } elseif (!$force) {
            $query->whereNull('ai_generated_at');
        }

        $count = (clone $query)->count();
        if ($count === 0) {
            $this->line('No destinations need AI content.');
            return;
        }

        $this->info("Dispatching {$count} destination AI jobs...");
        $bar = $this->output->createProgressBar($count);

        $query->select('id')->orderBy('id')->chunkById(200, function ($destinations) use ($bar) {
            foreach ($destinations as $destination) {
                GenerateDestinationAiContent::dispatch($destination->id);
                $bar->advance();
            }
        });

        $bar->finish();
        $this->newLine();
    }
}

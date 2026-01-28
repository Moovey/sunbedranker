<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ProductionOptimize extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'production:optimize 
                            {--clear : Clear all caches before optimizing}
                            {--skip-migrate : Skip running migrations}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Optimize the application for production deployment';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('🚀 Starting production optimization...');
        $this->newLine();

        // Step 1: Clear caches if requested
        if ($this->option('clear')) {
            $this->warn('Clearing all caches...');
            $this->callArtisan('cache:clear');
            $this->callArtisan('config:clear');
            $this->callArtisan('route:clear');
            $this->callArtisan('view:clear');
            $this->callArtisan('event:clear');
            $this->info('✓ All caches cleared');
            $this->newLine();
        }

        // Step 2: Run migrations
        if (!$this->option('skip-migrate')) {
            $this->warn('Running database migrations...');
            $this->callArtisan('migrate', ['--force' => true]);
            $this->info('✓ Migrations completed');
            $this->newLine();
        }

        // Step 3: Build production caches
        $this->warn('Building production caches...');
        
        $this->callArtisan('config:cache');
        $this->info('  ✓ Configuration cached');
        
        $this->callArtisan('route:cache');
        $this->info('  ✓ Routes cached');
        
        $this->callArtisan('view:cache');
        $this->info('  ✓ Views cached');
        
        $this->callArtisan('event:cache');
        $this->info('  ✓ Events cached');
        
        $this->newLine();

        // Step 4: Restart queue workers
        $this->warn('Restarting queue workers...');
        $this->callArtisan('queue:restart');
        $this->info('✓ Queue restart signal sent');
        $this->newLine();

        // Step 5: Verify health
        $this->warn('Verifying application health...');
        
        $checks = [
            'Database' => $this->checkDatabase(),
            'Cache' => $this->checkCache(),
            'Storage' => $this->checkStorage(),
        ];

        foreach ($checks as $name => $status) {
            $icon = $status ? '✓' : '✗';
            $color = $status ? 'info' : 'error';
            $this->$color("  {$icon} {$name}: " . ($status ? 'OK' : 'FAILED'));
        }

        $this->newLine();

        // Summary
        $allHealthy = !in_array(false, $checks, true);
        
        if ($allHealthy) {
            $this->info('═══════════════════════════════════════════');
            $this->info('✅ Production optimization complete!');
            $this->info('═══════════════════════════════════════════');
            $this->newLine();
            
            $this->table(
                ['Setting', 'Value'],
                [
                    ['Environment', config('app.env')],
                    ['Debug Mode', config('app.debug') ? 'ON ⚠️' : 'OFF ✓'],
                    ['Cache Driver', config('cache.default')],
                    ['Session Driver', config('session.driver')],
                    ['Queue Driver', config('queue.default')],
                ]
            );

            if (config('app.debug')) {
                $this->newLine();
                $this->error('⚠️  WARNING: Debug mode is ON. Set APP_DEBUG=false for production!');
            }

            return Command::SUCCESS;
        } else {
            $this->error('❌ Optimization completed with errors. Check the failed items above.');
            return Command::FAILURE;
        }
    }

    /**
     * Run an artisan command silently.
     */
    protected function callArtisan(string $command, array $params = []): void
    {
        Artisan::call($command, $params);
    }

    /**
     * Check if database connection works.
     */
    protected function checkDatabase(): bool
    {
        try {
            DB::connection()->getPdo();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Check if cache is working.
     */
    protected function checkCache(): bool
    {
        try {
            Cache::put('health-check', 'ok', 60);
            return Cache::get('health-check') === 'ok';
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Check if storage is writable.
     */
    protected function checkStorage(): bool
    {
        $paths = [
            storage_path('logs'),
            storage_path('framework/cache'),
            storage_path('framework/sessions'),
            storage_path('framework/views'),
        ];

        foreach ($paths as $path) {
            if (!is_writable($path)) {
                return false;
            }
        }

        return true;
    }
}

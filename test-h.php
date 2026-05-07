<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$hotel = App\Models\Hotel::where('name', 'like', '%1714%')
    ->orWhere('name', 'like', '%Hotel Boutique%')
    ->first();

if (!$hotel) {
    echo "Hotel not found by name. Listing recent hotels:\n";
    foreach (App\Models\Hotel::orderByDesc('id')->limit(5)->get() as $h) {
        echo "  ID {$h->id}: {$h->name}\n";
    }
    exit;
}

echo "Found hotel ID {$hotel->id}: {$hotel->name}\n";
App\Jobs\GenerateHotelAiContent::dispatchSync($hotel->id);

$hotel->refresh();
echo "ai_meta_title: " . ($hotel->ai_meta_title ?: 'NULL') . "\n";
echo "ai_description: " . substr((string)$hotel->ai_description, 0, 150) . "\n";
echo "ai_generated_at: " . ($hotel->ai_generated_at ?: 'NULL') . "\n";

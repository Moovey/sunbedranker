<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=== DESTINATIONS ===\n\n";
$destinations = App\Models\Destination::all(['name', 'image']);
foreach($destinations as $d) {
    echo $d->name . ":\n";
    echo "  Image: " . ($d->image ?? 'NULL') . "\n\n";
}

echo "\n=== HOTELS ===\n\n";
$hotels = App\Models\Hotel::all(['name', 'main_image']);
foreach($hotels as $h) {
    echo $h->name . ":\n";
    echo "  Image: " . ($h->main_image ?? 'NULL') . "\n\n";
}

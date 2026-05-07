<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "Model in config: " . config('services.gemini.model') . "\n";
echo "Key set: " . (config('services.gemini.api_key') ? 'YES (' . strlen(config('services.gemini.api_key')) . ' chars)' : 'NO') . "\n\n";

$gemini = app(App\Services\GeminiService::class);
echo "Service model: " . $gemini->model() . "\n";

$result = $gemini->generateJson('Reply with JSON.', 'Return {"ok":true}');
echo "Result: ";
var_dump($result);

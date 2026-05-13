<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Autocomplete suggestion limits
    |--------------------------------------------------------------------------
    */
    'limits' => [
        'destinations' => 10,
        'hotels'       => 5,
        'total'        => 12,
        'popular'      => 6,
    ],

    /*
    |--------------------------------------------------------------------------
    | Cache TTL for autocomplete results (seconds)
    |--------------------------------------------------------------------------
    */
    'cache_ttl'         => 1800,   // 30 min — invalidated by version bump
    'popular_cache_ttl' => 86400,  // 24h
    'browser_cache_ttl' => 60,     // Cache-Control max-age

    /*
    |--------------------------------------------------------------------------
    | Relevance ranking weights (higher = appears first)
    |--------------------------------------------------------------------------
    */
    'weights' => [
        'exact_match'   => 100,
        'alias'         => 95,
        'prefix_match'  => 80,
        'contains_name' => 60,
        'contains_meta' => 40,
        'fuzzy_max'     => 35, // capped via levenshtein
        'type_bonus'    => [
            'hotel'       => 5,
            'region'      => 3,
            'destination' => 1,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Common English/local name aliases for countries/regions/islands
    | that don't appear literally in the DB.
    | Maps lowercase user input → [field => DB value].
    |--------------------------------------------------------------------------
    */
    'aliases' => [
        // Canary Islands
        'canary islands'     => ['region' => 'Canarias'],
        'the canary islands' => ['region' => 'Canarias'],
        'canaries'           => ['region' => 'Canarias'],
        'islas canarias'     => ['region' => 'Canarias'],
        'tenerife'           => ['region' => 'Canarias'],
        'gran canaria'       => ['region' => 'Canarias'],
        'lanzarote'          => ['region' => 'Canarias'],
        'fuerteventura'      => ['region' => 'Canarias'],
        'la palma'           => ['region' => 'Canarias'],
        'la gomera'          => ['region' => 'Canarias'],
        // Spain
        'spain'              => ['country' => 'España'],
        'espana'             => ['country' => 'España'],
        'spanish'            => ['country' => 'España'],
        // Balearic Islands
        'balearic islands'   => ['region' => 'Illes Balears'],
        'balearics'          => ['region' => 'Illes Balears'],
        'mallorca'           => ['region' => 'Illes Balears'],
        'majorca'            => ['region' => 'Illes Balears'],
        'ibiza'              => ['region' => 'Illes Balears'],
        'menorca'            => ['region' => 'Illes Balears'],
        // Greece
        'greece'             => ['country_code' => 'GR'],
        'greek islands'      => ['country_code' => 'GR'],
        'hellas'             => ['country_code' => 'GR'],
        // Italy
        'italy'              => ['country_code' => 'IT'],
        'italia'             => ['country_code' => 'IT'],
        // Portugal
        'portugal'           => ['country_code' => 'PT'],
        'algarve'            => ['region' => 'Algarve'],
        // France
        'france'             => ['country_code' => 'FR'],
        'french riviera'     => ['region' => 'Provence-Alpes-Côte d\'Azur'],
        'cote d azur'        => ['region' => 'Provence-Alpes-Côte d\'Azur'],
        // Turkey
        'turkey'             => ['country_code' => 'TR'],
        'türkiye'            => ['country_code' => 'TR'],
        'turkiye'            => ['country_code' => 'TR'],
        // Croatia
        'croatia'            => ['country_code' => 'HR'],
        // Thailand
        'thailand'           => ['country_code' => 'TH'],
        // Mexico
        'mexico'             => ['country_code' => 'MX'],
        // Caribbean
        'dominican republic' => ['country_code' => 'DO'],
        // Egypt
        'egypt'              => ['country_code' => 'EG'],
        // Morocco
        'morocco'            => ['country_code' => 'MA'],
        // UAE
        'dubai'              => ['country_code' => 'AE'],
        'uae'                => ['country_code' => 'AE'],
        // Indonesia
        'bali'               => ['region' => 'Bali'],
        'indonesia'          => ['country_code' => 'ID'],
    ],

];

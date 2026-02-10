<?php

namespace App\Services;

use App\Models\Destination;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class DestinationLookupService
{
    private string $apiKey;
    private string $baseUrl;

    /** Cache country cities for 24 hours */
    private const CITIES_CACHE_TTL = 86400;

    /** Cache countries list for 7 days */
    private const COUNTRIES_CACHE_TTL = 604800;

    public function __construct()
    {
        $this->apiKey = config('services.countrystatecity.key') ?? '';
        $this->baseUrl = config('services.countrystatecity.base_url') ?? 'https://api.countrystatecity.in/v1';
    }

    /**
     * Search cities by name across a specific country.
     * Returns matching cities from the API (cached per country).
     *
     * @return array<int, array{name: string, latitude: string|null, longitude: string|null, state_name: string|null}>
     */
    public function searchCities(string $countryCode, string $query): array
    {
        $countryCode = strtoupper(trim($countryCode));
        $query = trim($query);

        if (strlen($countryCode) !== 2 || strlen($query) < 2) {
            return [];
        }

        $cities = $this->getCitiesForCountry($countryCode);

        if (empty($cities)) {
            return [];
        }

        // Filter cities matching the query (case-insensitive, starts-with preferred)
        $queryLower = mb_strtolower($query);
        $results = [];

        foreach ($cities as $city) {
            $cityNameLower = mb_strtolower($city['name']);
            
            if (str_starts_with($cityNameLower, $queryLower)) {
                $city['_priority'] = 1; // starts with = higher priority
                $results[] = $city;
            } elseif (str_contains($cityNameLower, $queryLower)) {
                $city['_priority'] = 2; // contains = lower priority
                $results[] = $city;
            }
        }

        // Sort: starts-with first, then alphabetically
        usort($results, function ($a, $b) {
            if ($a['_priority'] !== $b['_priority']) {
                return $a['_priority'] <=> $b['_priority'];
            }
            return strcmp($a['name'], $b['name']);
        });

        // Return max 20 results, strip priority key
        return array_map(
            fn($city) => [
                'name' => $city['name'],
                'latitude' => $city['latitude'] ?? null,
                'longitude' => $city['longitude'] ?? null,
                'state_name' => $city['state_name'] ?? null,
            ],
            array_slice($results, 0, 20)
        );
    }

    /**
     * Find or create a destination by city name + country code.
     * This is the core "lazy seeding" method.
     */
    public function findOrCreateDestination(string $cityName, string $countryCode): Destination
    {
        $countryCode = strtoupper(trim($countryCode));
        $cityName = trim($cityName);

        // 1. Check if destination already exists in DB
        $existing = Destination::where('country_code', $countryCode)
            ->whereRaw('LOWER(name) = ?', [mb_strtolower($cityName)])
            ->first();

        if ($existing) {
            return $existing;
        }

        // 2. Fetch from API to get coordinates
        $cityData = $this->findCityInApi($cityName, $countryCode);

        if (!$cityData) {
            throw new \RuntimeException(
                "City \"{$cityName}\" not found in country \"{$countryCode}\". Please check the city name and country code."
            );
        }

        // 3. Get country name
        $countryName = $this->getCountryName($countryCode);

        // 4. Generate unique slug
        $baseSlug = Str::slug($cityName);
        $slug = $baseSlug;
        $counter = 1;
        while (Destination::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$countryCode}-" . ($counter > 1 ? $counter : '');
            $slug = rtrim($slug, '-');
            $counter++;
        }

        // 5. Create destination with minimal data
        $destination = Destination::create([
            'name' => $cityData['name'], // Use API's canonical name casing
            'slug' => $slug,
            'country' => $countryName,
            'country_code' => $countryCode,
            'latitude' => $cityData['latitude'] ?? null,
            'longitude' => $cityData['longitude'] ?? null,
            'is_active' => true,
            'is_auto_created' => true,
        ]);

        Log::info('Destination auto-created via CountryStateCity API', [
            'destination_id' => $destination->id,
            'name' => $destination->name,
            'country_code' => $countryCode,
        ]);

        // Clear destinations cache so new entry appears
        Cache::forget('admin.hotels.destinations');

        return $destination;
    }

    /**
     * Get all countries from the API (cached).
     *
     * @return array<int, array{name: string, iso2: string}>
     */
    public function getCountries(): array
    {
        return Cache::remember('csc:countries', self::COUNTRIES_CACHE_TTL, function () {
            try {
                $response = Http::withHeaders([
                    'X-CSCAPI-KEY' => $this->apiKey,
                ])->timeout(10)->get("{$this->baseUrl}/countries");

                if (!$response->successful()) {
                    Log::warning('CountryStateCity API: failed to fetch countries', [
                        'status' => $response->status(),
                    ]);
                    return [];
                }

                return collect($response->json())
                    ->map(fn($c) => [
                        'name' => $c['name'],
                        'iso2' => $c['iso2'],
                    ])
                    ->sortBy('name')
                    ->values()
                    ->toArray();
            } catch (\Throwable $e) {
                Log::error('CountryStateCity API: countries request failed', [
                    'error' => $e->getMessage(),
                ]);
                return [];
            }
        });
    }

    /**
     * Get all cities for a country (cached per country for 24h).
     */
    private function getCitiesForCountry(string $countryCode): array
    {
        $cacheKey = "csc:cities:{$countryCode}";

        return Cache::remember($cacheKey, self::CITIES_CACHE_TTL, function () use ($countryCode) {
            try {
                $response = Http::withHeaders([
                    'X-CSCAPI-KEY' => $this->apiKey,
                ])->timeout(30)->get("{$this->baseUrl}/countries/{$countryCode}/cities");

                if (!$response->successful()) {
                    Log::warning('CountryStateCity API: failed to fetch cities', [
                        'country_code' => $countryCode,
                        'status' => $response->status(),
                    ]);
                    return [];
                }

                return $response->json() ?? [];
            } catch (\Throwable $e) {
                Log::error('CountryStateCity API: cities request failed', [
                    'country_code' => $countryCode,
                    'error' => $e->getMessage(),
                ]);
                return [];
            }
        });
    }

    /**
     * Find a specific city by name in a country's city list.
     */
    private function findCityInApi(string $cityName, string $countryCode): ?array
    {
        $cities = $this->getCitiesForCountry($countryCode);
        $cityNameLower = mb_strtolower($cityName);

        foreach ($cities as $city) {
            if (mb_strtolower($city['name']) === $cityNameLower) {
                return $city;
            }
        }

        return null;
    }

    /**
     * Get the country name for a given ISO2 code.
     */
    private function getCountryName(string $countryCode): string
    {
        $countries = $this->getCountries();

        foreach ($countries as $country) {
            if ($country['iso2'] === $countryCode) {
                return $country['name'];
            }
        }

        return $countryCode; // fallback to code if name not found
    }
}

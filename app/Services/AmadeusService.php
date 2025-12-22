<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class AmadeusService
{
    private string $apiKey;
    private string $apiSecret;
    private string $baseUrl;
    private ?string $accessToken = null;

    public function __construct()
    {
        $this->apiKey = config('services.amadeus.api_key');
        $this->apiSecret = config('services.amadeus.api_secret');
        $this->baseUrl = config('services.amadeus.base_url');
    }

    /**
     * Get OAuth access token
     */
    public function getAccessToken(): string
    {
        // Cache token for 25 minutes (Amadeus tokens expire in 30 minutes)
        return Cache::remember('amadeus_access_token', 1500, function () {
            $response = Http::withOptions(['verify' => false])
                ->asForm()
                ->post($this->baseUrl . '/v1/security/oauth2/token', [
                    'grant_type' => 'client_credentials',
                    'client_id' => $this->apiKey,
                    'client_secret' => $this->apiSecret,
                ]);

            if ($response->successful()) {
                return $response->json()['access_token'];
            }

            $error = $response->json();
            Log::error('Amadeus authentication failed', [
                'status' => $response->status(),
                'error' => $error,
                'body' => $response->body()
            ]);
            
            throw new \Exception('Failed to authenticate with Amadeus API: ' . ($error['error_description'] ?? $response->body()));
        });
    }

    /**
     * Search hotels by city/location
     * 
     * @param string $cityCode IATA city code (e.g., 'TCI' for Tenerife)
     * @param array $params Additional parameters (radius, ratings, etc.)
     * @return array
     */
    public function searchHotelsByCity(string $cityCode, array $params = []): array
    {
        $token = $this->getAccessToken();

        $queryParams = array_merge([
            'cityCode' => $cityCode,
            'radius' => $params['radius'] ?? 50,
            'radiusUnit' => 'KM',
            'ratings' => $params['ratings'] ?? '4,5',
        ], $params);

        $response = Http::withOptions(['verify' => false])
            ->withToken($token)
            ->get($this->baseUrl . '/v1/reference-data/locations/hotels/by-city', $queryParams);

        if ($response->successful()) {
            $data = $response->json();
            Log::info('Amadeus search by city response', [
                'cityCode' => $cityCode,
                'count' => count($data['data'] ?? []),
                'meta' => $data['meta'] ?? null
            ]);
            return $data['data'] ?? [];
        }

        Log::error('Amadeus hotel search failed', [
            'cityCode' => $cityCode,
            'status' => $response->status(),
            'response' => $response->json()
        ]);

        return [];
    }

    /**
     * Search hotels by geographic coordinates
     * 
     * @param float $latitude
     * @param float $longitude
     * @param int $radius Radius in kilometers
     * @return array
     */
    public function searchHotelsByGeocode(float $latitude, float $longitude, int $radius = 20): array
    {
        $token = $this->getAccessToken();

        $response = Http::withOptions(['verify' => false])->withToken($token)->get($this->baseUrl . '/v1/reference-data/locations/hotels/by-geocode', [
            'latitude' => $latitude,
            'longitude' => $longitude,
            'radius' => $radius,
            'radiusUnit' => 'KM',
        ]);

        if ($response->successful()) {
            return $response->json()['data'] ?? [];
        }

        Log::error('Amadeus geocode search failed', [
            'lat' => $latitude,
            'lng' => $longitude,
            'response' => $response->body()
        ]);

        return [];
    }

    /**
     * Get hotel details by hotel ID
     * 
     * @param string $hotelId Amadeus hotel ID
     * @return array|null
     */
    public function getHotelDetails(string $hotelId): ?array
    {
        $token = $this->getAccessToken();

        $response = Http::withOptions(['verify' => false])
            ->withToken($token)
            ->get($this->baseUrl . '/v1/reference-data/locations/hotels/by-hotels', [
                'hotelIds' => $hotelId,
            ]);

        if ($response->successful()) {
            $data = $response->json()['data'] ?? [];
            return $data[0] ?? null;
        }

        Log::error('Amadeus hotel details failed', [
            'hotelId' => $hotelId,
            'response' => $response->body()
        ]);

        return null;
    }

    /**
     * Get hotel offers (prices and availability)
     * 
     * @param array $hotelIds Array of hotel IDs
     * @param string $checkInDate Format: YYYY-MM-DD
     * @param string $checkOutDate Format: YYYY-MM-DD
     * @param int $adults Number of adults
     * @return array
     */
    public function getHotelOffers(array $hotelIds, string $checkInDate, string $checkOutDate, int $adults = 2): array
    {
        $token = $this->getAccessToken();

        $response = Http::withOptions(['verify' => false])->withToken($token)->get($this->baseUrl . '/v3/shopping/hotel-offers', [
            'hotelIds' => implode(',', $hotelIds),
            'checkInDate' => $checkInDate,
            'checkOutDate' => $checkOutDate,
            'adults' => $adults,
            'roomQuantity' => 1,
            'currency' => 'USD',
        ]);

        if ($response->successful()) {
            return $response->json()['data'] ?? [];
        }

        Log::error('Amadeus hotel offers failed', [
            'hotelIds' => $hotelIds,
            'response' => $response->body()
        ]);

        return [];
    }

    /**
     * Parse hotel data from Amadeus response
     * 
     * @param array $hotelData Raw hotel data from Amadeus
     * @return array Formatted hotel data
     */
    public function parseHotelData(array $hotelData): array
    {
        return [
            'amadeus_id' => $hotelData['hotelId'] ?? null,
            'name' => $hotelData['name'] ?? 'Unknown Hotel',
            'iata_code' => $hotelData['iataCode'] ?? null,
            'address' => [
                'street' => $hotelData['address']['lines'][0] ?? null,
                'city' => $hotelData['address']['cityName'] ?? null,
                'state' => $hotelData['address']['stateCode'] ?? null,
                'postal_code' => $hotelData['address']['postalCode'] ?? null,
                'country' => $hotelData['address']['countryCode'] ?? null,
            ],
            'full_address' => $this->formatAddress($hotelData['address'] ?? []),
            'coordinates' => [
                'latitude' => $hotelData['geoCode']['latitude'] ?? null,
                'longitude' => $hotelData['geoCode']['longitude'] ?? null,
            ],
            'distance' => $hotelData['distance']['value'] ?? null,
            'distance_unit' => $hotelData['distance']['unit'] ?? null,
        ];
    }

    /**
     * Format address from Amadeus data
     */
    private function formatAddress(array $address): string
    {
        $parts = [];
        
        if (!empty($address['lines'])) {
            $parts[] = implode(', ', $address['lines']);
        }
        if (!empty($address['cityName'])) {
            $parts[] = $address['cityName'];
        }
        if (!empty($address['stateCode'])) {
            $parts[] = $address['stateCode'];
        }
        if (!empty($address['postalCode'])) {
            $parts[] = $address['postalCode'];
        }
        if (!empty($address['countryCode'])) {
            $parts[] = $address['countryCode'];
        }

        return implode(', ', array_filter($parts));
    }
}

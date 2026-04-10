<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AgodaService
{
    protected string $siteId;
    protected string $apiKey;
    protected string $endpoint;

    public function __construct()
    {
        $this->siteId = config('services.agoda.site_id', '');
        $this->apiKey = config('services.agoda.api_key', '');
        $this->endpoint = config('services.agoda.endpoint');
    }

    /**
     * Check if Agoda API credentials are configured.
     */
    public function isConfigured(): bool
    {
        return !empty($this->siteId) && !empty($this->apiKey);
    }

    /**
     * Search hotels by Agoda city ID.
     */
    public function searchByCity(
        int $cityId,
        string $checkIn,
        string $checkOut,
        int $adults = 2,
        int $children = 0,
        string $currency = 'USD',
        string $language = 'en-us',
        int $maxResults = 10,
        string $sortBy = 'Recommended'
    ): ?array {
        $cacheKey = "agoda:city:{$cityId}:{$checkIn}:{$checkOut}:{$adults}:{$children}:{$currency}";

        return Cache::remember($cacheKey, 600, function () use (
            $cityId, $checkIn, $checkOut, $adults, $children, $currency, $language, $maxResults, $sortBy
        ) {
            return $this->makeRequest([
                'criteria' => [
                    'checkInDate' => $checkIn,
                    'checkOutDate' => $checkOut,
                    'cityId' => $cityId,
                    'additional' => [
                        'currency' => $currency,
                        'language' => $language,
                        'maxResult' => $maxResults,
                        'sortBy' => $sortBy,
                        'discountOnly' => false,
                        'minimumStarRating' => 0,
                        'minimumReviewScore' => 0,
                        'occupancy' => [
                            'numberOfAdult' => $adults,
                            'numberOfChildren' => $children,
                        ],
                    ],
                ],
            ]);
        });
    }

    /**
     * Search specific hotels by their Agoda hotel IDs.
     */
    public function searchByHotelIds(
        array $hotelIds,
        string $checkIn,
        string $checkOut,
        int $adults = 2,
        int $children = 0,
        string $currency = 'USD',
        string $language = 'en-us'
    ): ?array {
        if (empty($hotelIds)) {
            return null;
        }

        $idsKey = implode('-', $hotelIds);
        $cacheKey = "agoda:hotels:{$idsKey}:{$checkIn}:{$checkOut}:{$adults}:{$children}:{$currency}";

        return Cache::remember($cacheKey, 600, function () use (
            $hotelIds, $checkIn, $checkOut, $adults, $children, $currency, $language
        ) {
            return $this->makeRequest([
                'criteria' => [
                    'checkInDate' => $checkIn,
                    'checkOutDate' => $checkOut,
                    'hotelId' => $hotelIds,
                    'additional' => [
                        'currency' => $currency,
                        'language' => $language,
                        'discountOnly' => false,
                        'occupancy' => [
                            'numberOfAdult' => $adults,
                            'numberOfChildren' => $children,
                        ],
                    ],
                ],
            ]);
        });
    }

    /**
     * Get pricing for a single hotel by Agoda hotel ID.
     */
    public function getHotelPricing(
        int $agodaHotelId,
        ?string $checkIn = null,
        ?string $checkOut = null,
        int $adults = 2,
        string $currency = 'USD'
    ): ?array {
        $checkIn = $checkIn ?: now()->addDay()->format('Y-m-d');
        $checkOut = $checkOut ?: now()->addDays(2)->format('Y-m-d');

        $result = $this->searchByHotelIds(
            [$agodaHotelId],
            $checkIn,
            $checkOut,
            $adults,
            0,
            $currency
        );

        if ($result && !empty($result['results'])) {
            return $result['results'][0];
        }

        return null;
    }

    /**
     * Build a direct Agoda affiliate link (without API call).
     */
    public function buildAffiliateUrl(
        int $agodaHotelId,
        ?string $checkIn = null,
        ?string $checkOut = null,
        int $adults = 2,
        int $children = 0,
        string $currency = 'USD'
    ): string {
        $params = [
            'cid' => $this->siteId,
            'hid' => $agodaHotelId,
            'currency' => $currency,
            'NumberofAdults' => $adults,
            'NumberofChildren' => $children,
            'Rooms' => 1,
        ];

        if ($checkIn) {
            $params['checkin'] = $checkIn;
        }
        if ($checkOut) {
            $params['checkout'] = $checkOut;
        }

        return 'https://www.agoda.com/partners/partnersearch.aspx?' . http_build_query($params);
    }

    /**
     * Make the API request to Agoda.
     */
    protected function makeRequest(array $body): ?array
    {
        if (!$this->isConfigured()) {
            Log::warning('Agoda API credentials not configured');
            return null;
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => "{$this->siteId}:{$this->apiKey}",
                'Accept-Encoding' => 'gzip,deflate',
                'Content-Type' => 'application/json',
            ])
            ->timeout(10)
            ->post($this->endpoint, $body);

            if ($response->successful()) {
                $data = $response->json();

                if (isset($data['error'])) {
                    Log::info('Agoda API returned error', [
                        'error_id' => $data['error']['id'] ?? null,
                        'message' => $data['error']['message'] ?? 'Unknown error',
                    ]);
                    return null;
                }

                return $data;
            }

            Log::warning('Agoda API request failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('Agoda API exception', [
                'message' => $e->getMessage(),
            ]);
            return null;
        }
    }
}

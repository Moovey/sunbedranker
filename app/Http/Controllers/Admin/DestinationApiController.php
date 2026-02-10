<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\DestinationLookupService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DestinationApiController extends Controller
{
    public function __construct(
        protected DestinationLookupService $lookupService
    ) {}

    /**
     * Get list of countries for the country selector.
     */
    public function countries(): JsonResponse
    {
        $countries = $this->lookupService->getCountries();

        return response()->json($countries);
    }

    /**
     * Search cities within a country.
     * GET /admin/api/destinations/cities?country_code=GR&query=ath
     */
    public function searchCities(Request $request): JsonResponse
    {
        $request->validate([
            'country_code' => 'required|string|size:2',
            'query' => 'required|string|min:2|max:100',
        ]);

        $cities = $this->lookupService->searchCities(
            $request->input('country_code'),
            $request->input('query')
        );

        return response()->json($cities);
    }
}

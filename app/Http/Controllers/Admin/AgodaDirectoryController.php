<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Jobs\ImportAgodaDirectory;
use App\Models\AgodaHotel;
use App\Models\Destination;
use App\Models\Hotel;
use App\Models\PoolCriteria;
use App\Services\HotelScoringService;
use App\Services\PoolEstimationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AgodaDirectoryController extends Controller
{
    public function index(Request $request): Response
    {
        $query = AgodaHotel::query();

        $hasSearch = false;
        if ($search = $request->input('search')) {
            $hasSearch = true;
            $escaped = str_replace(['%', '_'], ['\%', '\_'], $search);
            // Check if it's a numeric ID search
            if (is_numeric($escaped)) {
                $query->where('agoda_hotel_id', $escaped);
            } else {
                $query->whereRaw('MATCH(hotel_name, city, country) AGAINST(? IN BOOLEAN MODE)', [$escaped . '*']);
            }
        }

        if ($country = $request->input('country')) {
            $query->where('countryisocode', $country);
        }

        if ($starRating = $request->input('star_rating')) {
            $query->where('star_rating', $starRating);
        }

        if ($type = $request->input('accommodation_type')) {
            $query->where('accommodation_type', $type);
        }

        if ($request->input('promoted') === 'yes') {
            $query->whereNotNull('promoted_hotel_id');
        } elseif ($request->input('promoted') === 'no') {
            $query->whereNull('promoted_hotel_id');
        }

        // Use FULLTEXT relevance for search, otherwise hotel_name index
        if (!$hasSearch) {
            $query->orderBy('hotel_name');
        }

        $hotels = $query
            ->select([
                'id', 'agoda_hotel_id', 'hotel_name', 'city', 'country',
                'countryisocode', 'star_rating', 'photo1', 'numberrooms',
                'rating_average', 'number_of_reviews', 'rates_from',
                'rates_currency', 'accommodation_type', 'promoted_hotel_id',
            ])
            ->simplePaginate(50)
            ->withQueryString();

        // Get distinct countries for filter dropdown
        $countries = Cache::remember('agoda_directory_countries', now()->addHours(6), function () {
            return AgodaHotel::selectRaw('DISTINCT countryisocode, country')
                ->whereNotNull('countryisocode')
                ->orderBy('country')
                ->get()
                ->map(fn ($c) => ['code' => $c->countryisocode, 'name' => $c->country])
                ->toArray();
        });

        // Get distinct accommodation types for filter
        $accommodationTypes = Cache::remember('agoda_directory_types', now()->addHours(6), function () {
            return AgodaHotel::selectRaw('DISTINCT accommodation_type')
                ->whereNotNull('accommodation_type')
                ->orderBy('accommodation_type')
                ->pluck('accommodation_type')
                ->toArray();
        });

        $totalCount = Cache::remember('agoda_directory_total', now()->addHours(1), function () {
            return AgodaHotel::count();
        });

        $promotedCount = Cache::remember('agoda_directory_promoted', now()->addMinutes(10), function () {
            return AgodaHotel::whereNotNull('promoted_hotel_id')->count();
        });

        $importProgress = Cache::get('agoda_directory_import');

        return Inertia::render('Admin/Directory/Index', [
            'hotels' => $hotels,
            'countries' => $countries,
            'accommodationTypes' => $accommodationTypes,
            'totalCount' => $totalCount,
            'promotedCount' => $promotedCount,
            'importProgress' => $importProgress,
            'filters' => $request->only(['search', 'country', 'star_rating', 'accommodation_type', 'promoted']),
            'stats' => $this->getAdminStats(),
        ]);
    }

    public function upload(Request $request): RedirectResponse
    {
        $request->validate([
            'csv_file' => 'required|file|max:512000', // 500MB max
        ]);

        $file = $request->file('csv_file');
        $ext = strtolower($file->getClientOriginalExtension());

        if (!in_array($ext, ['csv', 'txt', 'tsv'])) {
            return back()->withErrors(['csv_file' => 'Please upload a CSV file. If you have an Excel (.xlsx) file, save it as CSV first.']);
        }

        $path = $file->store('agoda-imports', 'local');

        ImportAgodaDirectory::dispatch($path, 'local');

        Cache::put('agoda_directory_import', [
            'status' => 'queued',
            'processed' => 0,
            'total' => 0,
            'message' => 'Import job queued. Processing will begin shortly...',
            'updated_at' => now()->toIso8601String(),
        ], now()->addHours(2));

        return back()->with('success', 'CSV upload started! The import will run in the background.');
    }

    public function uploadFromPath(Request $request): RedirectResponse
    {
        $request->validate([
            'server_path' => 'required|string|max:1000',
        ]);

        $path = $request->input('server_path');

        if (!file_exists($path)) {
            return back()->withErrors(['server_path' => 'File not found on server: ' . $path]);
        }

        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        if (!in_array($ext, ['csv', 'txt', 'tsv'])) {
            return back()->withErrors(['server_path' => 'File must be a CSV, TXT, or TSV file.']);
        }

        ImportAgodaDirectory::dispatch($path, 'raw');

        Cache::put('agoda_directory_import', [
            'status' => 'queued',
            'processed' => 0,
            'total' => 0,
            'message' => 'Import job queued. Processing will begin shortly...',
            'updated_at' => now()->toIso8601String(),
        ], now()->addHours(2));

        return back()->with('success', 'Import started from server file! Processing will run in the background.');
    }

    public function importProgress(): JsonResponse
    {
        return response()->json(
            Cache::get('agoda_directory_import', [
                'status' => 'idle',
                'processed' => 0,
                'total' => 0,
                'message' => 'No import running.',
            ])
        );
    }

    public function dismissImportProgress(): JsonResponse
    {
        Cache::forget('agoda_directory_import');

        return response()->json(['status' => 'idle']);
    }

    public function show(AgodaHotel $agodaHotel): JsonResponse
    {
        return response()->json($agodaHotel);
    }

    public function promote(Request $request, AgodaHotel $agodaHotel): RedirectResponse
    {
        if ($agodaHotel->isPromoted()) {
            return back()->withErrors(['error' => 'This hotel has already been promoted.']);
        }

        // Check if agoda_hotel_id already exists as a curated hotel
        $existing = Hotel::where('agoda_hotel_id', $agodaHotel->agoda_hotel_id)->first();
        if ($existing) {
            $agodaHotel->update(['promoted_hotel_id' => $existing->id]);
            return back()->with('success', "Linked to existing curated hotel \"{$existing->name}\".");
        }

        // Auto-match destination: by agoda_city_id, then by city name + country code
        $destination = null;

        if ($agodaHotel->city_id) {
            $destination = Destination::where('agoda_city_id', $agodaHotel->city_id)->first();
        }

        if (!$destination && $agodaHotel->city && $agodaHotel->countryisocode) {
            $destination = Destination::where('country_code', $agodaHotel->countryisocode)
                ->whereRaw('LOWER(name) = ?', [strtolower(trim($agodaHotel->city))])
                ->first();
        }

        // Auto-create destination if none found
        if (!$destination) {
            $cityName = $agodaHotel->city ?: 'Unknown';
            $countryName = $agodaHotel->country ?: 'Unknown';
            $countryCode = $agodaHotel->countryisocode ?: 'XX';

            $slug = Str::slug($cityName . ' ' . $countryCode);
            $existingSlug = Destination::where('slug', $slug)->exists();
            if ($existingSlug) {
                $slug .= '-' . $agodaHotel->city_id;
            }

            $destination = Destination::create([
                'name' => $cityName,
                'slug' => $slug,
                'country' => $countryName,
                'country_code' => $countryCode,
                'latitude' => $agodaHotel->latitude,
                'longitude' => $agodaHotel->longitude,
                'is_active' => true,
                'is_auto_created' => true,
                'agoda_city_id' => $agodaHotel->city_id,
            ]);
        }

        $starRating = (int) round($agodaHotel->star_rating ?? 3);
        $starRating = max(1, min(5, $starRating));

        $hotelName = $agodaHotel->hotel_name;
        $slug = Str::slug($hotelName) . '-' . $agodaHotel->agoda_hotel_id;

        // Ensure unique slug
        $count = Hotel::where('slug', $slug)->count();
        if ($count > 0) {
            $slug .= '-' . ($count + 1);
        }

        $hotel = Hotel::create([
            'name' => $hotelName,
            'slug' => $slug,
            'destination_id' => $destination->id,
            'star_rating' => $starRating,
            'total_rooms' => $agodaHotel->numberrooms ?: $this->estimateTotalRooms($starRating),
            'address' => implode(', ', array_filter([$agodaHotel->addressline1, $agodaHotel->city, $agodaHotel->country])),
            'latitude' => $agodaHotel->latitude,
            'longitude' => $agodaHotel->longitude,
            'main_image' => $this->upgradeAgodaImageUrl($agodaHotel->photo1),
            'images' => array_values(array_filter(array_map(
                fn ($url) => $this->upgradeAgodaImageUrl($url),
                [$agodaHotel->photo2, $agodaHotel->photo3, $agodaHotel->photo4, $agodaHotel->photo5]
            ))),
            'description' => $agodaHotel->overview,
            'agoda_hotel_id' => $agodaHotel->agoda_hotel_id,
            'booking_affiliate_url' => $agodaHotel->affiliate_url,
            'is_active' => true,
            'is_verified' => false,
            'external_api_id' => (string) $agodaHotel->agoda_hotel_id,
            'external_api_source' => 'agoda',
        ]);

        // Create estimated pool criteria
        $estimationService = app(PoolEstimationService::class);
        $estimated = $estimationService->estimate((float) $starRating);

        PoolCriteria::create(array_merge(
            ['hotel_id' => $hotel->id],
            $this->buildPoolCriteriaFromEstimate($estimated)
        ));

        // Calculate scores
        app(HotelScoringService::class)->calculateAndUpdateScores($hotel->fresh());

        // Link directory entry to promoted hotel
        $agodaHotel->update(['promoted_hotel_id' => $hotel->id]);

        // Clear cache
        Cache::forget('agoda_directory_promoted');

        Log::info('Agoda directory hotel promoted', [
            'agoda_hotel_id' => $agodaHotel->agoda_hotel_id,
            'hotel_id' => $hotel->id,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('admin.hotels.edit', $hotel->id)
            ->with('success', "Hotel \"{$hotel->name}\" promoted to curated listing! Edit the details and refine pool criteria.");
    }

    protected function estimateTotalRooms(int $starRating): int
    {
        return match ($starRating) {
            5 => 200,
            4 => 150,
            3 => 100,
            default => 80,
        };
    }

    protected function buildPoolCriteriaFromEstimate(object $estimated): array
    {
        return [
            'sunbed_count' => $estimated->sunbed_count,
            'sunbed_to_guest_ratio' => $estimated->sunbed_to_guest_ratio,
            'sunbed_types' => $estimated->sunbed_types,
            'sun_exposure' => $estimated->sun_exposure,
            'sunny_areas' => $estimated->sunny_areas,
            'pool_size_category' => $estimated->pool_size_category,
            'pool_size_sqm' => $estimated->pool_size_sqm,
            'number_of_pools' => $estimated->number_of_pools,
            'pool_types' => $estimated->pool_types,
            'atmosphere' => $estimated->atmosphere,
            'music_level' => $estimated->music_level,
            'has_entertainment' => $estimated->has_entertainment ?? false,
            'entertainment_types' => $estimated->entertainment_types,
            'has_pool_bar' => $estimated->has_pool_bar ?? false,
            'has_waiter_service' => $estimated->has_waiter_service ?? false,
            'shade_options' => $estimated->shade_options,
            'bar_distance' => $estimated->bar_distance,
            'toilet_distance' => $estimated->toilet_distance,
            'towel_reservation_policy' => $estimated->towel_reservation_policy,
            'towel_service_cost' => $estimated->towel_service_cost,
            'pool_opening_hours' => $estimated->pool_opening_hours,
            'has_infinity_pool' => $estimated->has_infinity_pool ?? false,
            'has_rooftop_pool' => $estimated->has_rooftop_pool ?? false,
            'is_adults_only' => $estimated->is_adults_only ?? false,
            'has_kids_pool' => $estimated->has_kids_pool ?? false,
            'kids_pool_depth_m' => $estimated->kids_pool_depth_m,
            'has_splash_park' => $estimated->has_splash_park ?? false,
            'has_waterslide' => $estimated->has_waterslide ?? false,
            'has_lifeguard' => $estimated->has_lifeguard ?? false,
            'lifeguard_hours' => $estimated->lifeguard_hours,
            'has_luxury_cabanas' => $estimated->has_luxury_cabanas ?? false,
            'has_cabana_service' => $estimated->has_cabana_service ?? false,
            'has_heated_pool' => $estimated->has_heated_pool ?? false,
            'has_jacuzzi' => $estimated->has_jacuzzi ?? false,
            'has_adult_sun_terrace' => $estimated->has_adult_sun_terrace ?? false,
            'cleanliness_rating' => $estimated->cleanliness_rating,
            'sunbed_condition_rating' => $estimated->sunbed_condition_rating,
            'tiling_condition_rating' => $estimated->tiling_condition_rating,
            'has_accessibility_ramp' => $estimated->has_accessibility_ramp ?? false,
            'has_pool_hoist' => $estimated->has_pool_hoist ?? false,
            'has_step_free_access' => $estimated->has_step_free_access ?? false,
            'has_elevator_to_rooftop' => $estimated->has_elevator_to_rooftop ?? false,
        ];
    }

    protected function getAdminStats(): array
    {
        return [
            'total_hotels' => Cache::remember('admin.stats.total_hotels', 300, fn () => Hotel::count()),
            'pending_claims' => Cache::remember('admin.nav.pending_claims', 120, fn () => \App\Models\HotelClaim::where('status', 'pending')->count()),
        ];
    }

    protected function upgradeAgodaImageUrl(?string $url): ?string
    {
        if (!$url) {
            return null;
        }

        // Replace small thumbnail parameter (s=312x) with high-res (s=1024x)
        // Also upgrade from http to https
        $url = preg_replace('/\bs=\d+x\b/', 's=1024x', $url);
        $url = str_replace('http://', 'https://', $url);

        return $url;
    }
}

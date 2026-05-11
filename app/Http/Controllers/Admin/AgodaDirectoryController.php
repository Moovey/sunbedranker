<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Directory\BulkPromoteSelectedRequest;
use App\Jobs\BulkPromoteAgodaHotels;
use App\Jobs\ImportAgodaDirectory;
use App\Models\AgodaHotel;
use App\Models\Destination;
use App\Models\Hotel;
use App\Models\PoolCriteria;
use App\Services\AgodaPromotionService;
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
        $this->clearStalePromotionLinks();

        $query = AgodaHotel::query();

        $hasSearch = false;
        if ($search = $request->input('search')) {
            $hasSearch = true;
            $escaped = str_replace(['%', '_'], ['\%', '\_'], $search);
            // Check if it's a numeric ID search
            if (is_numeric($escaped)) {
                $query->where('agoda_hotel_id', $escaped);
            } else {
                // Strip MySQL fulltext operators so user input can't break the BOOLEAN MODE
                // syntax (or be used to probe for errors). Then append our own wildcard.
                $cleaned = trim(preg_replace('/[+\-><\(\)~*"@]+/', ' ', $escaped));
                if ($cleaned !== '') {
                    $query->whereRaw('MATCH(hotel_name, city, country) AGAINST(? IN BOOLEAN MODE)', [$cleaned . '*']);
                }
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
        $bulkPromoteProgress = Cache::get(BulkPromoteAgodaHotels::PROGRESS_KEY);

        return Inertia::render('Admin/Directory/Index', [
            'hotels' => $hotels,
            'countries' => $countries,
            'accommodationTypes' => $accommodationTypes,
            'totalCount' => $totalCount,
            'promotedCount' => $promotedCount,
            'importProgress' => $importProgress,
            'bulkPromoteProgress' => $bulkPromoteProgress,
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

        // Restrict imports to a known allow-listed directory to prevent path-traversal
        // / arbitrary file reads (e.g. /etc/passwd) from a compromised admin account.
        $allowedRoot = realpath(storage_path('app/agoda-imports'));
        $requested = realpath($request->input('server_path'));

        if (!$requested || !$allowedRoot || !str_starts_with($requested, $allowedRoot . DIRECTORY_SEPARATOR) && $requested !== $allowedRoot) {
            return back()->withErrors([
                'server_path' => 'File must be located inside storage/app/agoda-imports/.',
            ]);
        }

        $path = $requested;

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

    public function promote(Request $request, AgodaHotel $agodaHotel, AgodaPromotionService $service): RedirectResponse
    {
        try {
            $result = $service->promote($agodaHotel);
        } catch (\Throwable $e) {
            Log::error('Agoda promote failed', [
                'agoda_hotel_id' => $agodaHotel->agoda_hotel_id,
                'error' => $e->getMessage(),
            ]);
            return back()->withErrors(['error' => 'Promotion failed. ' . $e->getMessage()]);
        }

        if ($result['status'] === 'skipped') {
            return back()->withErrors(['error' => $result['message']]);
        }

        $hotel = $result['hotel'];

        Log::info('Agoda directory hotel promoted', [
            'agoda_hotel_id' => $agodaHotel->agoda_hotel_id,
            'hotel_id' => $hotel?->id,
            'status' => $result['status'],
            'user_id' => Auth::id(),
        ]);

        // For created hotels send admin to the edit screen so they can refine criteria.
        if ($result['status'] === 'created' && $hotel) {
            return redirect()->route('admin.hotels.edit', $hotel->id)
                ->with('success', "Hotel \"{$hotel->name}\" promoted to curated listing! Edit the details and refine pool criteria.")
                ->with('promote_mode', 'promoted');
        }

        return back()
            ->with('success', $result['message'])
            ->with('promote_mode', $result['status']);
    }

    /**
     * Preview how many unpromoted hotels match a bulk-promote filter set.
     * Used by the UI to show "This will promote N hotels" before confirming.
     */
    public function bulkPromotePreview(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'country' => 'required|string|size:2',
            'star_rating' => 'nullable|integer|min:1|max:5',
            'accommodation_type' => 'nullable|string|max:100',
        ]);

        $count = AgodaHotel::query()
            ->whereNull('promoted_hotel_id')
            ->where('countryisocode', strtoupper($validated['country']))
            ->when(!empty($validated['star_rating']), fn ($q) => $q->where('star_rating', $validated['star_rating']))
            ->when(!empty($validated['accommodation_type']), fn ($q) => $q->where('accommodation_type', $validated['accommodation_type']))
            ->count();

        return response()->json(['matching' => $count]);
    }

    /**
     * Dispatch a background job to bulk-promote unpromoted hotels matching the filters.
     */
    public function bulkPromote(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'country' => 'required|string|size:2',
            'star_rating' => 'nullable|integer|min:1|max:5',
            'accommodation_type' => 'nullable|string|max:100',
            'limit' => 'nullable|integer|min:1|max:5000',
        ]);

        // Refuse to start if another bulk job is already running.
        $current = Cache::get(BulkPromoteAgodaHotels::PROGRESS_KEY);
        if ($current && in_array($current['status'] ?? null, ['queued', 'running'], true)) {
            return back()->withErrors([
                'bulk' => 'A bulk promotion is already running. Please wait for it to finish.',
            ]);
        }

        $filters = [
            'country' => strtoupper($validated['country']),
            'star_rating' => $validated['star_rating'] ?? null,
            'accommodation_type' => $validated['accommodation_type'] ?? null,
            'limit' => $validated['limit'] ?? 500,
        ];

        Cache::put(BulkPromoteAgodaHotels::PROGRESS_KEY, [
            'status' => 'queued',
            'processed' => 0,
            'total' => 0,
            'created' => 0,
            'failed' => 0,
            'message' => 'Bulk promotion queued. Processing will begin shortly...',
            'updated_at' => now()->toIso8601String(),
        ], now()->addHours(2));

        BulkPromoteAgodaHotels::dispatch($filters);

        Log::info('Agoda bulk promote dispatched', [
            'filters' => $filters,
            'user_id' => Auth::id(),
        ]);

        return back()->with('success', "Bulk promotion started for country {$filters['country']} (up to {$filters['limit']} hotels). Watch the progress banner above.");
    }

    /**
     * Promote a curated, admin-selected list of directory hotels at once.
     * Each promoted hotel automatically queues AI content generation via
     * AgodaPromotionService::promote(), so no extra step is needed.
     */
    public function bulkPromoteSelected(BulkPromoteSelectedRequest $request): RedirectResponse
    {
        // Refuse to start if another bulk job is already running.
        $current = Cache::get(BulkPromoteAgodaHotels::PROGRESS_KEY);
        if ($current && in_array($current['status'] ?? null, ['queued', 'running'], true)) {
            return back()->withErrors([
                'bulk' => 'A bulk promotion is already running. Please wait for it to finish.',
            ]);
        }

        // Drop any IDs that are already promoted so the count is honest.
        $eligible = AgodaHotel::query()
            ->whereIn('id', $request->ids())
            ->whereNull('promoted_hotel_id')
            ->pluck('id')
            ->all();

        if (empty($eligible)) {
            return back()->withErrors([
                'bulk' => 'None of the selected hotels are eligible for promotion (already promoted or not found).',
            ]);
        }

        $filters = [
            'ids'   => $eligible,
            'limit' => count($eligible),
        ];

        Cache::put(BulkPromoteAgodaHotels::PROGRESS_KEY, [
            'status'    => 'queued',
            'processed' => 0,
            'total'     => count($eligible),
            'created'   => 0,
            'failed'    => 0,
            'message'   => 'Promoting ' . count($eligible) . ' selected hotels and generating AI content...',
            'updated_at'=> now()->toIso8601String(),
        ], now()->addHours(2));

        BulkPromoteAgodaHotels::dispatch($filters);

        Log::info('Agoda bulk promote (selected) dispatched', [
            'count'   => count($eligible),
            'user_id' => Auth::id(),
        ]);

        return back()->with(
            'success',
            'Promoting ' . count($eligible) . ' selected hotel' . (count($eligible) === 1 ? '' : 's') . '. AI descriptions will be generated automatically.'
        );
    }

    /**
     * Polling endpoint for bulk-promote progress.
     */
    public function bulkPromoteProgress(): JsonResponse
    {
        return response()->json(
            Cache::get(BulkPromoteAgodaHotels::PROGRESS_KEY, [
                'status' => 'idle',
                'processed' => 0,
                'total' => 0,
                'created' => 0,
                'failed' => 0,
                'message' => 'No bulk promotion running.',
            ])
        );
    }

    public function dismissBulkPromoteProgress(): JsonResponse
    {
        Cache::forget(BulkPromoteAgodaHotels::PROGRESS_KEY);
        return response()->json(['status' => 'idle']);
    }

    private function clearStalePromotionLinks(): void
    {
        AgodaHotel::whereNotNull('promoted_hotel_id')
            ->whereDoesntHave('promotedHotel')
            ->update(['promoted_hotel_id' => null]);
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

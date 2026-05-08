<?php

namespace App\Http\Middleware;

use App\Models\HotelClaim;
use App\Models\ScoringWeight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        
        return [
            ...parent::share($request),
            'appUrl' => config('app.url'),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'profile_picture_url' => $user->profile_picture_url,
                    'created_at' => $user->created_at,
                    'email_verified_at' => $user->email_verified_at,
                ] : null,
            ],
            // Only emit flash keys that actually have a value (smaller JSON payload)
            'flash' => fn () => array_filter([
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
                'warning' => $request->session()->get('warning'),
                'info'    => $request->session()->get('info'),
                'promote_mode' => $request->session()->get('promote_mode'),
            ], fn ($v) => $v !== null),
            // Share pending claims count for admin nav badge (only for admin users)
            'adminStats' => fn () => $user && $user->role === 'admin' ? [
                'pending_claims' => Cache::remember('admin.nav.pending_claims', now()->addMinutes(2), function () {
                    return HotelClaim::where('status', 'pending')->count();
                }),
            ] : null,
            // Map of criteria_name => true for metrics admins have flagged as
            // publicly displayable. Frontend uses this to gate metric sections
            // on hotel detail, comparison and ranking pages. Cached because it
            // changes only when an admin saves the visibility tab.
            'publicMetrics' => fn () => Cache::remember(
                self::PUBLIC_METRICS_CACHE_KEY,
                now()->addHour(),
                fn () => ScoringWeight::query()
                    ->where('is_public', true)
                    ->pluck('criteria_name')
                    ->mapWithKeys(fn ($name) => [$name => true])
                    ->all(),
            ),
        ];
    }

    /**
     * Cache key for the publicly-visible metrics map.
     */
    public const PUBLIC_METRICS_CACHE_KEY = 'inertia.public_metrics';

    /**
     * Forget the cached public metrics map. Call from admin controllers
     * whenever ScoringWeight visibility flags change.
     */
    public static function forgetPublicMetricsCache(): void
    {
        Cache::forget(self::PUBLIC_METRICS_CACHE_KEY);
    }
}

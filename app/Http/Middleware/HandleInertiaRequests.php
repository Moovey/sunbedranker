<?php

namespace App\Http\Middleware;

use App\Models\HotelClaim;
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
        ];
    }
}

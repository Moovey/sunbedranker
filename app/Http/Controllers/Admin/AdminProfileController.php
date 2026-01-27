<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class AdminProfileController extends Controller
{
    /**
     * Display the admin's profile.
     */
    public function index(): Response
    {
        // Reuse cached stats from dashboard (10 min TTL)
        $allStats = Cache::get(AdminDashboardController::CACHE_KEY_STATS, []);
        
        // Extract only the stats needed for profile page
        $stats = [
            'total_hotels' => $allStats['total_hotels'] ?? 0,
            'active_hotels' => $allStats['active_hotels'] ?? 0,
            'total_destinations' => $allStats['total_destinations'] ?? 0,
            'pending_claims' => $allStats['pending_claims'] ?? 0,
            'pending_reviews' => $allStats['pending_reviews'] ?? 0,
            'total_users' => $allStats['total_users'] ?? 0,
            'hoteliers' => $allStats['hoteliers'] ?? 0,
        ];

        return Inertia::render('Admin/Profile', [
            'stats' => $stats,
        ]);
    }

    /**
     * Update the admin's profile information.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . Auth::id()],
            'profile_picture' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
        ]);

        /** @var User $user */
        $user = Auth::user();
        
        // Handle profile picture upload
        if ($request->hasFile('profile_picture')) {
            // Delete old profile picture if exists
            if ($user->profile_picture && !str_starts_with($user->profile_picture, 'http')) {
                $disk = config('filesystems.public_uploads', 'public');
                Storage::disk($disk)->delete($user->profile_picture);
            }
            
            // Store new profile picture
            $disk = config('filesystems.public_uploads', 'public');
            $path = $request->file('profile_picture')->store('profile-pictures', $disk);
            $validated['profile_picture'] = $path;
        } else {
            unset($validated['profile_picture']);
        }
        
        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $saved = $user->save();
        
        if ($saved) {
            return back()->with('success', 'Profile updated successfully.');
        }
        
        return back()->withErrors(['error' => 'Failed to save profile.']);
    }

    /**
     * Update the admin's password.
     * Rate limited to 5 attempts per minute to prevent brute force attacks.
     */
    public function updatePassword(Request $request)
    {
        // Rate limit password change attempts (5 per minute)
        $this->ensurePasswordChangeIsNotRateLimited($request);

        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        // Clear rate limiter on successful password change
        RateLimiter::clear($this->passwordChangeThrottleKey($request));

        /** @var User $user */
        $user = Auth::user();
        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Password updated successfully.');
    }

    /**
     * Ensure the password change request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function ensurePasswordChangeIsNotRateLimited(Request $request): void
    {
        $key = $this->passwordChangeThrottleKey($request);

        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);

            throw ValidationException::withMessages([
                'current_password' => __('Too many password change attempts. Please try again in :seconds seconds.', [
                    'seconds' => $seconds,
                ]),
            ]);
        }

        RateLimiter::hit($key, 60); // 1 minute decay
    }

    /**
     * Get the rate limiting throttle key for password changes.
     */
    protected function passwordChangeThrottleKey(Request $request): string
    {
        return 'password-change:' . Auth::id() . '|' . $request->ip();
    }

    /**
     * Remove the admin's profile picture.
     */
    public function removeProfilePicture()
    {
        /** @var User $user */
        $user = Auth::user();
        
        if ($user->profile_picture && !str_starts_with($user->profile_picture, 'http')) {
            $disk = config('filesystems.public_uploads', 'public');
            Storage::disk($disk)->delete($user->profile_picture);
        }
        
        $user->update(['profile_picture' => null]);

        return back();
    }
}

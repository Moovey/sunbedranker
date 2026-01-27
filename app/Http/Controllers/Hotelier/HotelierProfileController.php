<?php

namespace App\Http\Controllers\Hotelier;

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
use App\Models\Hotel;
use App\Models\Review;
use App\Models\User;

class HotelierProfileController extends Controller
{
    /**
     * Display the hotelier's profile.
     */
    public function index(): Response
    {
        $user = Auth::user();
        
        // Get hotels owned by this hotelier
        $hotels = Hotel::where('owned_by', $user->id)
            ->with(['destination', 'poolCriteria'])
            ->get();

        // Get cached stats (reuse from dashboard if available, otherwise calculate)
        $stats = $this->getProfileStats($user->id, $hotels);

        return Inertia::render('Hotelier/Profile', [
            'stats' => $stats,
            'hotels' => $hotels,
        ]);
    }

    /**
     * Update the hotelier's profile information.
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
     * Update the hotelier's password.
     */
    public function updatePassword(Request $request)
    {
        $user = Auth::user();
        
        // Rate limiting: 5 attempts per minute
        $key = 'hotelier-password-update:' . $user->id;
        
        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            throw ValidationException::withMessages([
                'current_password' => "Too many password change attempts. Please try again in {$seconds} seconds.",
            ]);
        }
        
        RateLimiter::hit($key, 60);

        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        /** @var User $user */
        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        // Clear rate limiter on successful password change
        RateLimiter::clear($key);

        return back()->with('success', 'Password updated successfully.');
    }

    /**
     * Remove the hotelier's profile picture.
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

        return back()->with('success', 'Profile picture removed.');
    }

    /**
     * Get profile stats (tries to reuse dashboard cache)
     */
    private function getProfileStats(int $userId, $hotels): array
    {
        // Try to get from dashboard cache first
        $dashboardCache = Cache::get("hotelier.dashboard.{$userId}");
        
        if ($dashboardCache && isset($dashboardCache['stats'])) {
            return [
                'total_hotels' => $dashboardCache['stats']['total_hotels'],
                'average_score' => $dashboardCache['stats']['average_score'],
                'total_reviews' => $dashboardCache['stats']['total_reviews'] ?? 0,
            ];
        }

        // Fallback: calculate fresh
        return [
            'total_hotels' => $hotels->count(),
            'average_score' => $hotels->avg('overall_score'),
            'total_reviews' => Review::whereIn('hotel_id', $hotels->pluck('id'))->count(),
        ];
    }
}

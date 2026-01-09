<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Hotel;
use App\Models\User;
use App\Models\HotelClaim;
use App\Models\Review;
use App\Models\Destination;

class AdminProfileController extends Controller
{
    /**
     * Display the admin's profile.
     */
    public function index(): Response
    {
        $stats = [
            'total_hotels' => Hotel::count(),
            'active_hotels' => Hotel::where('is_active', true)->count(),
            'total_destinations' => Destination::count(),
            'pending_claims' => HotelClaim::where('status', 'pending')->count(),
            'pending_reviews' => Review::where('status', 'pending')->count(),
            'total_users' => User::count(),
            'hoteliers' => User::where('role', 'hotelier')->count(),
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
     */
    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        /** @var User $user */
        $user = Auth::user();
        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
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

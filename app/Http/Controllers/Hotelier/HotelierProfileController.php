<?php

namespace App\Http\Controllers\Hotelier;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
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

        // Calculate stats
        $stats = [
            'total_hotels' => $hotels->count(),
            'average_score' => $hotels->avg('overall_score'),
            'total_reviews' => Review::whereIn('hotel_id', $hotels->pluck('id'))->count(),
        ];

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

        return back();
    }
}

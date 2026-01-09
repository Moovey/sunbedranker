<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Review;
use App\Models\User;

class UserProfileController extends Controller
{
    /**
     * Display the user's profile.
     */
    public function index(): Response
    {
        $user = Auth::user();
        
        // Get user's reviews with hotel information
        $reviews = Review::where('user_id', $user->id)
            ->with('hotel')
            ->orderBy('created_at', 'desc')
            ->get();

        // Saved hotels would be implemented if you have a saved/favorites feature
        $savedHotels = [];

        return Inertia::render('User/Profile', [
            'reviews' => $reviews,
            'savedHotels' => $savedHotels,
        ]);
    }

    /**
     * Update the user's profile information.
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
     * Update the user's password.
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
     * Remove the user's profile picture.
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

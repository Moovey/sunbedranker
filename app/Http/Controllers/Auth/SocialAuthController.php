<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    /**
     * Redirect to Google OAuth.
     */
    public function redirectToGoogle(): RedirectResponse
    {
        $role = request()->get('role', 'user');
        
        // Validate role
        if (!in_array($role, ['user', 'hotelier'])) {
            $role = 'user';
        }
        
        // Store role in session for callback
        session(['google_auth_role' => $role]);
        
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle Google OAuth callback.
     */
    public function handleGoogleCallback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Google authentication failed. Please try again.');
        }

        // Check if user exists with this Google ID
        $user = User::where('google_id', $googleUser->getId())->first();

        if (!$user) {
            // Check if user exists with the same email
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                // Link Google account to existing user
                $user->update([
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                ]);
            } else {
                // Get role from session (default to 'user')
                $role = session('google_auth_role', 'user');
                session()->forget('google_auth_role');
                
                // Create new user
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'email_verified_at' => now(),
                    'role' => $role,
                ]);
            }
        } else {
            // Update avatar if changed
            $user->update([
                'avatar' => $googleUser->getAvatar(),
            ]);
        }

        // Update last login
        $user->update(['last_login_at' => now()]);

        Auth::login($user, true);

        // Redirect based on user role
        // Hoteliers go to their dashboard, travelers/users go to homepage
        if ($user->role === 'hotelier') {
            return redirect()->intended(route('hotelier.dashboard'));
        }
        
        return redirect()->intended('/');
    }
}

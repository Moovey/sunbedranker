<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\HotelClaim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    /**
     * Display a listing of users
     */
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->get();

        $stats = [
            'total_users' => User::count(),
            'hoteliers' => User::where('role', 'hotelier')->count(),
            'admins' => User::where('role', 'admin')->count(),
            'pending_claims' => HotelClaim::where('status', 'pending')->count(),
        ];

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for editing a user
     */
    public function edit(User $user)
    {
        $stats = [
            'total_users' => User::count(),
            'hoteliers' => User::where('role', 'hotelier')->count(),
            'admins' => User::where('role', 'admin')->count(),
            'pending_claims' => HotelClaim::where('status', 'pending')->count(),
        ];

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'stats' => $stats,
        ]);
    }

    /**
     * Update the specified user
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|in:user,hotelier,admin',
            'password' => 'nullable|confirmed|min:8',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->role = $validated['role'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user
     */
    public function destroy(User $user)
    {
        // Prevent deleting yourself
        if ($user->id === Auth::id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        // Prevent deleting admin users (optional security measure)
        if ($user->role === 'admin') {
            return back()->with('error', 'Admin users cannot be deleted.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }
}

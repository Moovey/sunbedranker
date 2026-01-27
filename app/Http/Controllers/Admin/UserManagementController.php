<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\HotelClaim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    /**
     * Display a listing of users
     */
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->paginate(10);

        // Reuse cached stats from AdminDashboardController
        $stats = $this->getUserStats();

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
        // Reuse cached stats from AdminDashboardController
        $stats = $this->getUserStats();

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

        // Track changes for audit log
        $changes = [];
        if ($user->name !== $validated['name']) {
            $changes['name'] = ['from' => $user->name, 'to' => $validated['name']];
        }
        if ($user->email !== $validated['email']) {
            $changes['email'] = ['from' => $user->email, 'to' => $validated['email']];
        }
        if ($user->role !== $validated['role']) {
            $changes['role'] = ['from' => $user->role, 'to' => $validated['role']];
        }
        if (!empty($validated['password'])) {
            $changes['password'] = 'changed';
        }

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->role = $validated['role'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        // Audit log
        Log::channel('admin_audit')->info('User updated by admin', [
            'target_user_id' => $user->id,
            'target_user_email' => $user->email,
            'admin_id' => Auth::id(),
            'admin_email' => Auth::user()->email,
            'changes' => $changes,
            'ip_address' => $request->ip(),
            'timestamp' => now()->toISOString(),
        ]);

        // Clear cached stats if role changed (affects counts)
        if (isset($changes['role'])) {
            AdminDashboardController::clearStatsCache();
        }

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user
     */
    public function destroy(Request $request, User $user)
    {
        // Prevent deleting yourself
        if ($user->id === Auth::id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        // Prevent deleting admin users (optional security measure)
        if ($user->role === 'admin') {
            return back()->with('error', 'Admin users cannot be deleted.');
        }

        // Audit log before deletion
        Log::channel('admin_audit')->warning('User deleted by admin', [
            'deleted_user_id' => $user->id,
            'deleted_user_email' => $user->email,
            'deleted_user_name' => $user->name,
            'deleted_user_role' => $user->role,
            'admin_id' => Auth::id(),
            'admin_email' => Auth::user()->email,
            'ip_address' => $request->ip(),
            'timestamp' => now()->toISOString(),
        ]);

        $user->delete();

        // Clear cached stats
        AdminDashboardController::clearStatsCache();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }

    /**
     * Get user-related stats (subset of dashboard stats)
     */
    private function getUserStats(): array
    {
        // Try to get from dashboard cache first
        $dashboardStats = Cache::get(AdminDashboardController::CACHE_KEY_STATS);
        
        if ($dashboardStats) {
            return [
                'total_users' => $dashboardStats['total_users'],
                'hoteliers' => $dashboardStats['hoteliers'],
                'admins' => $dashboardStats['admins'],
                'pending_claims' => $dashboardStats['pending_claims'],
            ];
        }

        // Fallback: calculate fresh (will be cached on next dashboard visit)
        return Cache::remember('admin.users.stats', 600, function () {
            return [
                'total_users' => User::count(),
                'hoteliers' => User::where('role', 'hotelier')->count(),
                'admins' => User::where('role', 'admin')->count(),
                'pending_claims' => HotelClaim::where('status', 'pending')->count(),
            ];
        });
    }
}

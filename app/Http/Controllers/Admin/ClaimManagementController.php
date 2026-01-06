<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HotelClaim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ClaimManagementController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->get('status', 'pending');

        $claims = HotelClaim::with(['hotel.destination', 'user', 'reviewer'])
            ->when($status !== 'all', function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Claims/Index', [
            'claims' => $claims,
            'filters' => [
                'status' => $status,
            ],
            'stats' => [
                'pending' => HotelClaim::where('status', 'pending')->count(),
                'approved' => HotelClaim::where('status', 'approved')->count(),
                'rejected' => HotelClaim::where('status', 'rejected')->count(),
            ],
        ]);
    }

    /**
     * Show detailed claim for review
     */
    public function show(HotelClaim $claim): Response
    {
        $claim->load([
            'hotel.destination',
            'hotel.poolCriteria',
            'user',
            'reviewer'
        ]);

        // Get user's claim history
        $userClaimHistory = HotelClaim::with('hotel')
            ->where('user_id', $claim->user_id)
            ->where('id', '!=', $claim->id)
            ->latest()
            ->get();

        // Get hotel's claim history
        $hotelClaimHistory = HotelClaim::with('user')
            ->where('hotel_id', $claim->hotel_id)
            ->where('id', '!=', $claim->id)
            ->latest()
            ->get();

        return Inertia::render('Admin/Claims/Show', [
            'claim' => $claim,
            'userClaimHistory' => $userClaimHistory,
            'hotelClaimHistory' => $hotelClaimHistory,
        ]);
    }

    public function approve(Request $request, HotelClaim $claim): RedirectResponse
    {
        if ($claim->status !== 'pending') {
            return back()->withErrors(['message' => 'Only pending claims can be approved.']);
        }

        // Check if hotel already has an owner
        if ($claim->hotel->hasOwner()) {
            return back()->withErrors(['message' => 'This hotel already has an approved owner.']);
        }

        DB::beginTransaction();
        try {
            $claim->approve($request->user());

            DB::commit();

            return redirect()->route('admin.claims.index')
                ->with('success', 'Claim approved successfully! Hotel ownership has been assigned.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to approve claim: ' . $e->getMessage()]);
        }
    }

    public function reject(Request $request, HotelClaim $claim): RedirectResponse
    {
        $validated = $request->validate([
            'admin_notes' => 'required|string|max:1000',
        ]);

        if ($claim->status !== 'pending') {
            return back()->withErrors(['message' => 'Only pending claims can be rejected.']);
        }

        DB::beginTransaction();
        try {
            $claim->reject($request->user(), $validated['admin_notes']);

            DB::commit();

            return redirect()->route('admin.claims.index')
                ->with('success', 'Claim rejected successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to reject claim: ' . $e->getMessage()]);
        }
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HotelClaim;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ClaimManagementController extends Controller
{
    public function index(): Response
    {
        $claims = HotelClaim::with(['hotel', 'user', 'reviewer'])
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Claims/Index', [
            'claims' => $claims,
        ]);
    }

    public function approve(Request $request, HotelClaim $claim): RedirectResponse
    {
        $claim->approve($request->user());

        return back()->with('success', 'Hotel claim approved. User is now a hotelier.');
    }

    public function reject(Request $request, HotelClaim $claim): RedirectResponse
    {
        $validated = $request->validate([
            'admin_notes' => 'nullable|string',
        ]);

        $claim->reject($request->user(), $validated['admin_notes'] ?? null);

        return back()->with('success', 'Hotel claim rejected.');
    }
}

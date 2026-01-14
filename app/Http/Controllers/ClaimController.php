<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\HotelClaim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ClaimController extends Controller
{
    /**
     * Show hotelier's claims
     */
    public function index()
    {
        // Only hoteliers can access
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!Auth::check() || !$user->isHotelier()) {
            abort(403, 'Only hoteliers can view claims');
        }

        $claims = HotelClaim::with(['hotel.destination'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        $subscription = [
            'tier' => $user->subscription_tier ?? 'free',
            'hasEnhanced' => $user->hasAtLeastEnhancedTier(),
            'hasPremium' => $user->hasPremiumTier(),
        ];

        return Inertia::render('Hotelier/Claims/Index', [
            'claims' => $claims,
            'subscription' => $subscription,
        ]);
    }

    /**
     * Show claim form for a hotel
     */
    public function create(Hotel $hotel)
    {
        // Only hoteliers can access
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!Auth::check() || !$user->isHotelier()) {
            abort(403, 'Only hoteliers can claim hotels');
        }

        // Check subscription tier - only Enhanced and Premium can claim
        if (!$user->canClaimHotels()) {
            // Redirect to subscription page with the intended claim URL
            return redirect()->route('hotelier.subscription', [
                'redirect' => route('hotelier.hotels.claim', $hotel->slug),
            ]);
        }

        // Check anti-fraud conditions
        $this->checkAntifraudConditions($hotel, Auth::user());

        return Inertia::render('Hotelier/ClaimHotel', [
            'hotel' => $hotel->load('destination'),
        ]);
    }

    /**
     * Store a new hotel claim
     */
    public function store(Request $request, Hotel $hotel)
    {
        // Only hoteliers can claim
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!Auth::check() || !$user->isHotelier()) {
            abort(403, 'Only hoteliers can claim hotels');
        }

        // Check subscription tier - only Enhanced and Premium can claim
        if (!$user->canClaimHotels()) {
            return redirect()->route('hotelier.subscription', [
                'redirect' => route('hotelier.hotels.claim', $hotel->slug),
            ]);
        }

        // Check anti-fraud conditions
        $this->checkAntifraudConditions($hotel, Auth::user());

        // Validate request
        $validated = $request->validate([
            'official_email' => 'required|email',
                'phone' => 'required|string|min:10|max:20',
            'claim_message' => 'nullable|string|max:1000',
        ]);

        // Verify email domain matches hotel website (if website exists)
        if ($hotel->website) {
            $emailDomain = substr(strrchr($validated['official_email'], "@"), 1);
            $websiteDomain = parse_url($hotel->website, PHP_URL_HOST);
            $websiteDomain = $websiteDomain ? str_replace('www.', '', $websiteDomain) : null;

            if ($websiteDomain && strtolower($emailDomain) !== strtolower($websiteDomain)) {
                throw ValidationException::withMessages([
                    'official_email' => 'Email must be from the official hotel domain (@' . $websiteDomain . ')',
                ]);
            }
        }

        // Rate limiting - max 3 attempts per hour per IP
        $rateLimitKey = 'claim_attempts:' . $request->ip();
        $attempts = Cache::get($rateLimitKey, 0);
        
        if ($attempts >= 3) {
            throw ValidationException::withMessages([
                'rate_limit' => 'Too many claim attempts. Please try again later.',
            ]);
        }

        // Create claim with transaction
        DB::beginTransaction();
        try {
            $claim = HotelClaim::create([
                'hotel_id' => $hotel->id,
                'user_id' => Auth::id(),
                'status' => 'pending',
                'official_email' => $validated['official_email'],
                'phone' => $validated['phone'],
                'claim_message' => $validated['claim_message'] ?? null,
                'ip_address' => $request->ip(),
                'last_claim_attempt_at' => now(),
                'claim_attempts' => 1,
            ]);

            // Increment rate limiter
            Cache::put($rateLimitKey, $attempts + 1, now()->addHour());

            DB::commit();

            return redirect()->route('hotelier.dashboard')
                ->with('success', 'Hotel claim submitted successfully! Our team will review it within 24-48 hours.');

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Check anti-fraud conditions before allowing claim
     */
    protected function checkAntifraudConditions(Hotel $hotel, $user)
    {
        // 1. Check if hotel already has an approved owner
        if ($hotel->hasOwner()) {
            abort(403, 'This hotel already has an approved owner.');
        }

        // 2. Check if hotel has a pending claim (lock while under review)
        if ($hotel->hasPendingClaim()) {
            abort(403, 'This hotel has a pending claim under review. Please wait for the current claim to be processed.');
        }

        // 3. Block repeated claims from same user
        $existingClaim = HotelClaim::where('hotel_id', $hotel->id)
            ->where('user_id', $user->id)
            ->whereIn('status', ['pending', 'approved'])
            ->exists();

        if ($existingClaim) {
            abort(403, 'You have already submitted a claim for this hotel.');
        }

        // 4. Check if user has too many pending claims (max 3)
        $pendingClaimsCount = HotelClaim::where('user_id', $user->id)
            ->where('status', 'pending')
            ->count();

        if ($pendingClaimsCount >= 3) {
            abort(403, 'You have too many pending claims. Please wait for your existing claims to be reviewed.');
        }

        // 5. Check recent rejected claims for this hotel by this user (can retry after 30 days)
        $recentRejection = HotelClaim::where('hotel_id', $hotel->id)
            ->where('user_id', $user->id)
            ->where('status', 'rejected')
            ->where('reviewed_at', '>', now()->subDays(30))
            ->exists();

        if ($recentRejection) {
            abort(403, 'Your previous claim was rejected. Please wait 30 days before trying again.');
        }
    }
}

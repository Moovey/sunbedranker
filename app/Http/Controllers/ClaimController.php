<?php

namespace App\Http\Controllers;

use App\Events\HotelClaimSubmitted;
use App\Models\Hotel;
use App\Models\HotelClaim;
use App\Notifications\ClaimVerificationCodeNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\RateLimiter;
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
            ->get()
            ->map(function ($claim) {
                // Add email verification status for frontend
                $claim->email_verified = !is_null($claim->email_verified_at);
                $claim->needs_verification = is_null($claim->email_verified_at) && $claim->status === 'pending';
                return $claim;
            });

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

        // Rate limiting - max 3 attempts per hour per IP using RateLimiter facade
        $rateLimitKey = 'claim-submission:' . $request->ip();
        if (RateLimiter::tooManyAttempts($rateLimitKey, 3)) {
            $seconds = RateLimiter::availableIn($rateLimitKey);
            $minutes = ceil($seconds / 60);
            throw ValidationException::withMessages([
                'rate_limit' => "Too many claim attempts. Please try again in {$minutes} minute(s).",
            ]);
        }

        // Create claim with transaction
        DB::beginTransaction();
        try {
            // Generate 6-digit verification code
            $verificationCode = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            
            $claim = HotelClaim::create([
                'hotel_id' => $hotel->id,
                'user_id' => Auth::id(),
                'status' => 'pending',
                'official_email' => $validated['official_email'],
                'phone' => $validated['phone'],
                'claim_message' => $validated['claim_message'] ?? null,
                'email_verification_code' => $verificationCode,
                'email_verification_code_expires_at' => now()->addMinutes(30),
                'ip_address' => $request->ip(),
                'last_claim_attempt_at' => now(),
                'claim_attempts' => 1,
            ]);

            // Increment rate limiter (1 hour decay)
            RateLimiter::hit($rateLimitKey, 3600);

            DB::commit();

            // Send verification code to official email
            Notification::route('mail', $validated['official_email'])
                ->notify(new ClaimVerificationCodeNotification($claim, $verificationCode));

            // Dispatch event to notify admins
            event(new HotelClaimSubmitted($claim, $user));

            // Audit log
            Log::channel('admin_audit')->info('Hotel claim submitted', [
                'claim_id' => $claim->id,
                'hotel_id' => $hotel->id,
                'hotel_name' => $hotel->name,
                'user_id' => $user->id,
                'user_email' => $user->email,
                'official_email' => $validated['official_email'],
                'ip_address' => $request->ip(),
                'timestamp' => now()->toISOString(),
            ]);

            return redirect()->route('hotelier.claims.verify', $claim->id)
                ->with('success', 'A verification code has been sent to ' . $validated['official_email']);

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * Show verification code entry form
     */
    public function showVerify(HotelClaim $claim)
    {
        // Only claim owner can verify
        if ($claim->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        // If already verified, redirect to claims
        if ($claim->email_verified_at) {
            return redirect()->route('hotelier.claims.index')
                ->with('info', 'This claim has already been verified.');
        }

        return Inertia::render('Hotelier/Claims/Verify', [
            'claim' => $claim->load('hotel'),
            'email' => $claim->official_email,
        ]);
    }

    /**
     * Verify the email verification code
     */
    public function verify(Request $request, HotelClaim $claim)
    {
        // Only claim owner can verify
        if ($claim->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        // Check if code expired
        if ($claim->email_verification_code_expires_at && $claim->email_verification_code_expires_at->isPast()) {
            throw ValidationException::withMessages([
                'code' => 'Verification code has expired. Please request a new one.',
            ]);
        }

        // Check if code matches
        if ($claim->email_verification_code !== $request->code) {
            throw ValidationException::withMessages([
                'code' => 'Invalid verification code. Please try again.',
            ]);
        }

        // Mark as verified
        $claim->update([
            'email_verified_at' => now(),
            'email_verification_code' => null, // Clear the code
        ]);

        // Clear admin stats cache so pending count updates
        \App\Http\Controllers\Admin\ClaimManagementController::clearStatsCache();

        return redirect()->route('hotelier.claims.index')
            ->with('success', 'Email verified successfully! Your claim is now under review.');
    }

    /**
     * Resend verification code
     */
    public function resendCode(HotelClaim $claim)
    {
        // Only claim owner can resend
        if ($claim->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        // Rate limit resend (max 3 per 10 minutes)
        $rateLimitKey = 'resend-verification:' . Auth::id() . ':' . $claim->id;
        if (RateLimiter::tooManyAttempts($rateLimitKey, 3)) {
            $seconds = RateLimiter::availableIn($rateLimitKey);
            throw ValidationException::withMessages([
                'resend' => "Too many resend attempts. Please wait " . ceil($seconds / 60) . " minute(s).",
            ]);
        }

        // Generate new code
        $verificationCode = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        
        $claim->update([
            'email_verification_code' => $verificationCode,
            'email_verification_code_expires_at' => now()->addMinutes(30),
        ]);

        // Send new code
        Notification::route('mail', $claim->official_email)
            ->notify(new ClaimVerificationCodeNotification($claim, $verificationCode));

        RateLimiter::hit($rateLimitKey, 600); // 10 minute window

        return back()->with('success', 'A new verification code has been sent to ' . $claim->official_email);
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

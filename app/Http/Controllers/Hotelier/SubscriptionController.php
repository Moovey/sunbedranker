<?php

namespace App\Http\Controllers\Hotelier;

use App\Events\SubscriptionUpdated;
use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    /**
     * Pricing configuration - centralized for consistency
     */
    private array $pricing = [
        'enhanced' => [
            'name' => 'Enhanced',
            'monthly_price' => 49,
        ],
        'premium' => [
            'name' => 'Premium',
            'monthly_price' => 149,
        ],
    ];

    /**
     * Period configuration with discounts
     */
    private array $periods = [
        '1' => ['months' => 1, 'discount' => 0, 'free_months' => 0, 'label' => '1-month'],
        '12' => ['months' => 12, 'discount' => 15, 'free_months' => 0, 'label' => '12-month'],
        '24' => ['months' => 24, 'discount' => 25, 'free_months' => 0, 'label' => '24-month'],
        '48' => ['months' => 48, 'discount' => 35, 'free_months' => 3, 'label' => '48-month'],
    ];

    /**
     * Display the subscription plans page.
     */
    public function index(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        return Inertia::render('Hotelier/Subscription', [
            'currentTier' => $user->subscription_tier ?? 'free',
            'activeSubscription' => $user->activeSubscription,
            'redirectTo' => $request->query('redirect'),
        ]);
    }

    /**
     * Display the subscription checkout page for a specific plan.
     */
    public function checkout(Request $request, string $plan)
    {
        // Validate the plan
        if (!in_array($plan, ['enhanced', 'premium'])) {
            return redirect()->route('hotelier.subscription')
                ->with('error', 'Invalid subscription plan selected.');
        }

        return Inertia::render('Hotelier/SubscriptionCheckout', [
            'plan' => $plan,
            'redirectTo' => $request->query('redirect'),
        ]);
    }

    /**
     * Display the payment page after checkout.
     */
    public function payment(Request $request, string $plan)
    {
        $user = Auth::user();
        
        // Rate limiting: 5 payment intent creations per minute
        $key = 'subscription-payment:' . $user->id;
        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            return redirect()->route('hotelier.subscription')
                ->with('error', "Too many payment attempts. Please wait {$seconds} seconds.");
        }
        RateLimiter::hit($key, 60);

        // Validate the plan
        if (!isset($this->pricing[$plan])) {
            return redirect()->route('hotelier.subscription')
                ->with('error', 'Invalid subscription plan selected.');
        }

        // Validate the period
        $period = $request->input('period', '1');
        if (!isset($this->periods[$period])) {
            return redirect()->route('hotelier.subscribe', $plan)
                ->with('error', 'Invalid billing period selected.');
        }

        // Get pricing and period config
        $planConfig = $this->pricing[$plan];
        $periodConfig = $this->periods[$period];

        // Calculate pricing
        $originalMonthlyPrice = $planConfig['monthly_price'];
        $discountPercent = $periodConfig['discount'];
        $discountedMonthlyPrice = $originalMonthlyPrice * (1 - $discountPercent / 100);
        
        $periodMonths = $periodConfig['months'];
        $freeMonths = $periodConfig['free_months'];
        $totalMonths = $periodMonths + $freeMonths;
        
        $originalTotal = $originalMonthlyPrice * $periodMonths;
        $totalAmount = $discountedMonthlyPrice * $periodMonths;
        $savings = $originalTotal - $totalAmount;

        // Audit log: Payment intent creation
        Log::channel('admin_audit')->info('Subscription payment initiated', [
            'user_id' => $user->id,
            'user_email' => $user->email,
            'plan' => $plan,
            'period_months' => $periodMonths,
            'total_amount' => $totalAmount,
            'ip_address' => $request->ip(),
            'timestamp' => now()->toISOString(),
        ]);

        // Create Stripe Payment Intent
        \Stripe\Stripe::setApiKey(config('services.stripe.secret'));
        
        $paymentIntent = \Stripe\PaymentIntent::create([
            'amount' => (int) ($totalAmount * 100), // Stripe uses cents
            'currency' => 'gbp',
            'payment_method_types' => ['card', 'link'],
            'metadata' => [
                'user_id' => Auth::id(),
                'plan' => $plan,
                'period' => $period,
            ],
        ]);

        return Inertia::render('Hotelier/SubscriptionPayment', [
            'plan' => $plan,
            'period' => $period,
            'orderSummary' => [
                'planName' => $planConfig['name'],
                'periodLabel' => $periodConfig['label'],
                'periodMonths' => $periodMonths,
                'freeMonths' => $freeMonths,
                'totalMonths' => $totalMonths,
                'originalMonthlyPrice' => $originalMonthlyPrice,
                'discountedMonthlyPrice' => $discountedMonthlyPrice,
                'discountPercent' => $discountPercent,
                'discount' => $discountPercent,
                'originalTotal' => $originalTotal,
                'total' => $totalAmount,
                'savings' => $savings,
            ],
            'stripeKey' => config('services.stripe.key'),
            'clientSecret' => $paymentIntent->client_secret,
            'redirectTo' => $request->query('redirect'),
        ]);
    }

    /**
     * Handle subscription to a plan (from checkout page - redirects to payment).
     */
    public function subscribe(Request $request, string $plan)
    {
        // Validate the plan
        if (!isset($this->pricing[$plan])) {
            return redirect()->route('hotelier.subscription')
                ->with('error', 'Invalid subscription plan selected.');
        }

        // Validate the period
        $period = $request->input('period', '1');
        if (!isset($this->periods[$period])) {
            return redirect()->route('hotelier.subscription')
                ->with('error', 'Invalid billing period selected.');
        }

        // Redirect to payment page with period
        return redirect()->route('hotelier.subscribe.payment', [
            'plan' => $plan,
            'period' => $period,
            'redirect' => $request->query('redirect'),
        ]);
    }

    /**
     * Complete the subscription after payment.
     * In production, this would be called by a Stripe webhook.
     */
    public function complete(Request $request, string $plan)
    {
        /** @var User $user */
        $user = Auth::user();

        // Rate limiting: 5 subscription completions per minute (prevent duplicate submissions)
        $key = 'subscription-complete:' . $user->id;
        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            return redirect()->route('hotelier.subscription')
                ->with('error', "Too many attempts. Please wait {$seconds} seconds.");
        }
        RateLimiter::hit($key, 60);

        // Validate the plan
        if (!isset($this->pricing[$plan])) {
            return redirect()->route('hotelier.subscription')
                ->with('error', 'Invalid subscription plan selected.');
        }

        // Validate billing address
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'phone_code' => 'nullable|string|max:10',
            'phone_number' => 'nullable|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'zip_code' => 'required|string|max:20',
            'payment_method' => 'required|string|max:50', // card, google_pay, apple_pay, klarna, link, etc.
            'period' => 'required|in:1,12,24,48',
            'payment_intent_id' => 'nullable|string', // Stripe Payment Intent ID
        ]);

        // Get pricing and period config
        $period = $validated['period'] ?? '1';
        $planConfig = $this->pricing[$plan];
        $periodConfig = $this->periods[$period];

        // Calculate pricing
        $originalMonthlyPrice = $planConfig['monthly_price'];
        $discountPercent = $periodConfig['discount'];
        $discountedMonthlyPrice = $originalMonthlyPrice * (1 - $discountPercent / 100);
        
        $periodMonths = $periodConfig['months'];
        $freeMonths = $periodConfig['free_months'];
        $totalMonths = $periodMonths + $freeMonths;
        
        $originalTotal = $originalMonthlyPrice * $periodMonths;
        $totalAmount = $discountedMonthlyPrice * $periodMonths;
        $savings = $originalTotal - $totalAmount;

        // Cancel any existing active subscription for this user
        Subscription::where('user_id', $user->id)
            ->where('status', Subscription::STATUS_ACTIVE)
            ->update(['status' => Subscription::STATUS_CANCELLED]);

        // Create subscription record with billing details
        $subscription = Subscription::create([
            'user_id' => $user->id,
            'tier' => $plan,
            'period_months' => $periodMonths,
            'monthly_price' => $discountedMonthlyPrice,
            'original_price' => $originalMonthlyPrice,
            'total_amount' => $totalAmount,
            'savings' => $savings,
            'discount_percent' => $discountPercent,
            'free_months' => $freeMonths,
            'starts_at' => now(),
            'ends_at' => now()->addMonths($totalMonths),
            'status' => Subscription::STATUS_ACTIVE,
            'payment_method' => $validated['payment_method'],
            'transaction_id' => $validated['payment_intent_id'] ?? null, // Stripe Payment Intent ID
            'coupon_code' => $request->input('coupon_code'),
            // Billing details
            'billing_first_name' => $validated['first_name'],
            'billing_last_name' => $validated['last_name'],
            'billing_country' => $validated['country'],
            'billing_phone' => trim(($validated['phone_code'] ?? '') . ' ' . ($validated['phone_number'] ?? '')),
            'billing_address' => $validated['address'],
            'billing_city' => $validated['city'],
            'billing_zip' => $validated['zip_code'],
        ]);

        // Dispatch subscription event for notifications/side effects
        // Note: For self-purchase, the user is both hotelier and admin (triggerer)
        event(new SubscriptionUpdated(
            hotelier: $user,
            subscription: $subscription,
            tier: $plan,
            periodMonths: $periodMonths,
            admin: $user, // Self-purchase
            reason: 'Self-service subscription purchase'
        ));

        // Audit log: Subscription purchased
        Log::channel('admin_audit')->info('Subscription purchased', [
            'user_id' => $user->id,
            'user_email' => $user->email,
            'subscription_id' => $subscription->id,
            'plan' => $plan,
            'tier' => $planConfig['name'],
            'period_months' => $periodMonths,
            'total_amount' => $totalAmount,
            'payment_method' => $validated['payment_method'],
            'transaction_id' => $validated['payment_intent_id'] ?? null,
            'starts_at' => $subscription->starts_at,
            'ends_at' => $subscription->ends_at,
            'ip_address' => $request->ip(),
            'timestamp' => now()->toISOString(),
        ]);

        // In production, you would:
        // 1. Create Stripe Payment Intent or redirect to PayPal/Google Pay
        // 2. Set status to 'pending'
        // 3. Handle webhook for successful payment
        // 4. Then activate the subscription

        $redirectTo = $request->query('redirect');
        $planName = $planConfig['name'];
        
        if ($redirectTo) {
            return redirect($redirectTo)
                ->with('success', "Successfully subscribed to {$planName} plan for {$totalMonths} months! You can now claim hotels.");
        }

        return redirect()->route('hotelier.dashboard')
            ->with('success', "Successfully subscribed to {$planName} plan for {$totalMonths} months! You can now claim and manage hotels.");
    }
}

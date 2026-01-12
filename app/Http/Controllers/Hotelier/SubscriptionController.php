<?php

namespace App\Http\Controllers\Hotelier;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    /**
     * Display the subscription plans page.
     */
    public function index(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        return Inertia::render('Hotelier/Subscription', [
            'currentTier' => $user->subscription_tier ?? 'free',
            'redirectTo' => $request->query('redirect'),
        ]);
    }

    /**
     * Handle subscription to a plan.
     * In a real application, this would integrate with a payment provider like Stripe.
     */
    public function subscribe(Request $request, string $plan)
    {
        /** @var User $user */
        $user = Auth::user();

        // Validate the plan
        if (!in_array($plan, ['enhanced', 'premium'])) {
            return redirect()->route('hotelier.subscription')
                ->with('error', 'Invalid subscription plan selected.');
        }

        // In a real application, you would:
        // 1. Redirect to Stripe checkout
        // 2. Handle the webhook for successful payment
        // 3. Update the user's subscription tier

        // For now, we'll just update the subscription directly (demo mode)
        $user->update([
            'subscription_tier' => $plan,
            'subscription_expires_at' => now()->addMonth(), // 1 month subscription
        ]);

        $redirectTo = $request->query('redirect');
        
        if ($redirectTo) {
            return redirect($redirectTo)
                ->with('success', "Successfully upgraded to {$plan} plan! You can now claim hotels.");
        }

        return redirect()->route('hotelier.dashboard')
            ->with('success', "Successfully upgraded to {$plan} plan! You can now claim and manage hotels.");
    }
}

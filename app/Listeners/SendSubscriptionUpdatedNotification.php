<?php

namespace App\Listeners;

use App\Events\SubscriptionUpdated;
use App\Notifications\SubscriptionUpdatedNotification;
use Illuminate\Support\Facades\Log;

class SendSubscriptionUpdatedNotification
{
    /**
     * Handle the event.
     */
    public function handle(SubscriptionUpdated $event): void
    {
        // Send notification to the hotelier
        $event->hotelier->notify(new SubscriptionUpdatedNotification(
            $event->subscription,
            $event->tier,
            $event->periodMonths,
            $event->reason
        ));

        // Audit log
        Log::channel('admin_audit')->info('Subscription updated by admin', [
            'hotelier_id' => $event->hotelier->id,
            'hotelier_email' => $event->hotelier->email,
            'tier' => $event->tier,
            'period_months' => $event->periodMonths,
            'subscription_id' => $event->subscription?->id,
            'admin_id' => $event->admin->id,
            'admin_email' => $event->admin->email,
            'reason' => $event->reason,
            'timestamp' => now()->toISOString(),
        ]);
    }
}

<?php

namespace App\Listeners;

use App\Events\TemporaryAccessGranted;
use App\Notifications\TemporaryAccessGrantedNotification;
use Illuminate\Support\Facades\Log;

class SendTemporaryAccessGrantedNotification
{
    /**
     * Handle the event.
     */
    public function handle(TemporaryAccessGranted $event): void
    {
        // Send notification to the hotelier
        $event->hotelier->notify(new TemporaryAccessGrantedNotification(
            $event->subscription,
            $event->tier,
            $event->days,
            $event->reason
        ));

        // Audit log
        Log::channel('admin_audit')->info('Temporary access granted', [
            'hotelier_id' => $event->hotelier->id,
            'hotelier_email' => $event->hotelier->email,
            'tier' => $event->tier,
            'days' => $event->days,
            'subscription_id' => $event->subscription->id,
            'expires_at' => $event->subscription->ends_at->toISOString(),
            'admin_id' => $event->admin->id,
            'admin_email' => $event->admin->email,
            'reason' => $event->reason,
            'timestamp' => now()->toISOString(),
        ]);
    }
}

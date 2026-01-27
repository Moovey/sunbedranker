<?php

namespace App\Listeners;

use App\Events\ClaimRejected;
use App\Notifications\ClaimRejectedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class SendClaimRejectedNotification implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(ClaimRejected $event): void
    {
        // Send notification to the hotelier
        $event->claim->user->notify(new ClaimRejectedNotification($event->claim, $event->reason));

        // Audit log
        Log::channel('admin_audit')->info('Claim rejected', [
            'claim_id' => $event->claim->id,
            'hotel_id' => $event->claim->hotel_id,
            'hotel_name' => $event->claim->hotel->name,
            'hotelier_id' => $event->claim->user_id,
            'hotelier_email' => $event->claim->user->email,
            'admin_id' => $event->admin->id,
            'admin_email' => $event->admin->email,
            'reason' => $event->reason,
            'timestamp' => now()->toISOString(),
        ]);
    }
}

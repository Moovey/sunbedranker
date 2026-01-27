<?php

namespace App\Listeners;

use App\Events\ClaimApproved;
use App\Notifications\ClaimApprovedNotification;
use Illuminate\Support\Facades\Log;

class SendClaimApprovedNotification
{
    /**
     * Handle the event.
     */
    public function handle(ClaimApproved $event): void
    {
        // Send notification to the hotelier
        $event->claim->user->notify(new ClaimApprovedNotification($event->claim));

        // Audit log
        Log::channel('admin_audit')->info('Claim approved', [
            'claim_id' => $event->claim->id,
            'hotel_id' => $event->claim->hotel_id,
            'hotel_name' => $event->claim->hotel->name,
            'hotelier_id' => $event->claim->user_id,
            'hotelier_email' => $event->claim->user->email,
            'admin_id' => $event->admin->id,
            'admin_email' => $event->admin->email,
            'timestamp' => now()->toISOString(),
        ]);
    }
}

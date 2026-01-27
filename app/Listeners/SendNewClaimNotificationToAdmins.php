<?php

namespace App\Listeners;

use App\Events\HotelClaimSubmitted;
use App\Models\User;
use App\Notifications\NewClaimSubmittedNotification;
use Illuminate\Support\Facades\Log;

class SendNewClaimNotificationToAdmins
{
    /**
     * Handle the event.
     */
    public function handle(HotelClaimSubmitted $event): void
    {
        // Notify all admins about the new claim
        $admins = User::where('role', 'admin')->get();
        
        foreach ($admins as $admin) {
            $admin->notify(new NewClaimSubmittedNotification($event->claim));
        }

        // Audit log
        Log::channel('admin_audit')->info('New hotel claim submitted', [
            'claim_id' => $event->claim->id,
            'hotel_id' => $event->claim->hotel_id,
            'hotel_name' => $event->claim->hotel->name ?? 'Unknown',
            'hotelier_id' => $event->hotelier->id,
            'hotelier_email' => $event->hotelier->email,
            'official_email' => $event->claim->official_email,
            'ip_address' => $event->claim->ip_address,
            'timestamp' => now()->toISOString(),
        ]);
    }
}

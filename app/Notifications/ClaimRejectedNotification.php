<?php

namespace App\Notifications;

use App\Models\HotelClaim;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ClaimRejectedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public HotelClaim $claim,
        public string $reason
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $hotelName = $this->claim->hotel->name;

        return (new MailMessage)
            ->subject('Hotel Claim Update - ' . $hotelName)
            ->view('emails.claim-rejected', [
                'userName' => $notifiable->name,
                'hotelName' => $hotelName,
                'reason' => $this->reason,
                'contactUrl' => url('/contact'),
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'claim_rejected',
            'claim_id' => $this->claim->id,
            'hotel_id' => $this->claim->hotel_id,
            'hotel_name' => $this->claim->hotel->name,
            'reason' => $this->reason,
            'message' => 'Your claim for "' . $this->claim->hotel->name . '" was not approved.',
        ];
    }
}

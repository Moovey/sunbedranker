<?php

namespace App\Notifications;

use App\Models\HotelClaim;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewClaimSubmittedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public HotelClaim $claim
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
        $hotelName = $this->claim->hotel->name ?? 'Unknown Hotel';
        $hotelierName = $this->claim->user->name ?? 'Unknown';
        $hotelierEmail = $this->claim->user->email ?? 'Unknown';

        return (new MailMessage)
            ->subject('New Hotel Claim Submitted - ' . $hotelName)
            ->greeting('Hello Admin!')
            ->line('A new hotel claim has been submitted and requires your review.')
            ->line('**Hotel:** ' . $hotelName)
            ->line('**Claimed By:** ' . $hotelierName . ' (' . $hotelierEmail . ')')
            ->line('**Official Email:** ' . $this->claim->official_email)
            ->line('**Phone:** ' . $this->claim->phone)
            ->line('**Submitted:** ' . $this->claim->created_at->format('M d, Y H:i'))
            ->action('Review Claim', url('/admin/claims'))
            ->line('Please review this claim within 24-48 hours.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'new_claim_submitted',
            'claim_id' => $this->claim->id,
            'hotel_id' => $this->claim->hotel_id,
            'hotel_name' => $this->claim->hotel->name ?? 'Unknown',
            'hotelier_id' => $this->claim->user_id,
            'hotelier_name' => $this->claim->user->name ?? 'Unknown',
            'message' => 'New claim for ' . ($this->claim->hotel->name ?? 'a hotel') . ' requires review',
        ];
    }
}

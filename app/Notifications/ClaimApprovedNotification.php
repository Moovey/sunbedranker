<?php

namespace App\Notifications;

use App\Models\HotelClaim;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ClaimApprovedNotification extends Notification implements ShouldQueue
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
        $hotelName = $this->claim->hotel->name;

        return (new MailMessage)
            ->subject('Hotel Claim Approved - ' . $hotelName)
            ->greeting('Congratulations, ' . $notifiable->name . '!')
            ->line('Your claim for **' . $hotelName . '** has been approved.')
            ->line('You are now the verified owner of this property on SunbedRanker.')
            ->line('You can now:')
            ->line('• Update your hotel profile and photos')
            ->line('• Respond to reviews')
            ->line('• View analytics and performance data')
            ->line('• Upgrade your subscription for enhanced features')
            ->action('Manage Your Hotel', url('/hotelier/hotels'))
            ->line('Thank you for being part of SunbedRanker!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'claim_approved',
            'claim_id' => $this->claim->id,
            'hotel_id' => $this->claim->hotel_id,
            'hotel_name' => $this->claim->hotel->name,
            'message' => 'Your claim for "' . $this->claim->hotel->name . '" has been approved.',
        ];
    }
}

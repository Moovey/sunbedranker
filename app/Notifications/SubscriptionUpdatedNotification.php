<?php

namespace App\Notifications;

use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SubscriptionUpdatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public ?Subscription $subscription,
        public string $tier,
        public int $periodMonths,
        public ?string $reason = null
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
        $tierLabel = ucfirst($this->tier);
        
        $mail = (new MailMessage)
            ->subject('Subscription Updated - ' . $tierLabel . ' Plan')
            ->greeting('Hello, ' . $notifiable->name . '!');

        if ($this->tier === 'free') {
            $mail->line('Your subscription has been updated to the **Free** tier.');
        } else {
            $mail->line('Great news! Your subscription has been upgraded to the **' . $tierLabel . '** plan.')
                 ->line('Duration: **' . $this->periodMonths . ' month(s)**');
            
            if ($this->subscription) {
                $mail->line('Valid until: **' . $this->subscription->ends_at->format('F j, Y') . '**');
            }

            if ($this->tier === 'enhanced') {
                $mail->line('With Enhanced, you can now:')
                     ->line('• Add promotional banners')
                     ->line('• Feature special offers')
                     ->line('• Priority listing in search results');
            } elseif ($this->tier === 'premium') {
                $mail->line('With Premium, you get everything in Enhanced plus:')
                     ->line('• 360° video tours')
                     ->line('• Multiple promotions')
                     ->line('• Verified badge display')
                     ->line('• Top placement in listings');
            }
        }

        if ($this->reason) {
            $mail->line('**Note:** ' . $this->reason);
        }

        return $mail
            ->action('View Your Dashboard', url('/hotelier/dashboard'))
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
            'type' => 'subscription_updated',
            'tier' => $this->tier,
            'period_months' => $this->periodMonths,
            'ends_at' => $this->subscription?->ends_at?->toISOString(),
            'reason' => $this->reason,
            'message' => 'Your subscription has been updated to ' . ucfirst($this->tier) . '.',
        ];
    }
}

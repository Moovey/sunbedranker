<?php

namespace App\Notifications;

use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TemporaryAccessGrantedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Subscription $subscription,
        public string $tier,
        public int $days,
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
            ->subject('Temporary ' . $tierLabel . ' Access Granted!')
            ->greeting('Hello, ' . $notifiable->name . '!')
            ->line('You have been granted temporary access to our **' . $tierLabel . '** features.')
            ->line('**Duration:** ' . $this->days . ' days')
            ->line('**Expires:** ' . $this->subscription->ends_at->format('F j, Y'));

        if ($this->tier === 'enhanced') {
            $mail->line('During this period, you can:')
                 ->line('• Add promotional banners')
                 ->line('• Feature special offers')
                 ->line('• Get priority listing in search results');
        } elseif ($this->tier === 'premium') {
            $mail->line('During this period, you get full Premium access:')
                 ->line('• 360° video tours')
                 ->line('• Multiple promotions')
                 ->line('• Verified badge display')
                 ->line('• Top placement in listings');
        }

        if ($this->reason) {
            $mail->line('**Reason:** ' . $this->reason);
        }

        return $mail
            ->action('Start Using Your Features', url('/hotelier/dashboard'))
            ->line('Make the most of your temporary access!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'temporary_access_granted',
            'tier' => $this->tier,
            'days' => $this->days,
            'ends_at' => $this->subscription->ends_at->toISOString(),
            'reason' => $this->reason,
            'message' => 'You have been granted ' . $this->days . ' days of ' . ucfirst($this->tier) . ' access.',
        ];
    }
}

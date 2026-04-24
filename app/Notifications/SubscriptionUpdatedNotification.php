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

        return (new MailMessage)
            ->subject('Subscription Updated - ' . $tierLabel . ' Plan')
            ->view('emails.subscription-updated', [
                'userName' => $notifiable->name,
                'tier' => $this->tier,
                'periodMonths' => $this->periodMonths,
                'endsAt' => $this->subscription?->ends_at?->format('F j, Y'),
                'reason' => $this->reason,
                'dashboardUrl' => url('/hotelier/dashboard'),
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
            'type' => 'subscription_updated',
            'tier' => $this->tier,
            'period_months' => $this->periodMonths,
            'ends_at' => $this->subscription?->ends_at?->toISOString(),
            'reason' => $this->reason,
            'message' => 'Your subscription has been updated to ' . ucfirst($this->tier) . '.',
        ];
    }
}

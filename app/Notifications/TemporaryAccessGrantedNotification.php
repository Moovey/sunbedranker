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

        return (new MailMessage)
            ->subject('Temporary ' . $tierLabel . ' Access Granted!')
            ->view('emails.temporary-access-granted', [
                'userName' => $notifiable->name,
                'tier' => $this->tier,
                'days' => $this->days,
                'endsAt' => $this->subscription->ends_at->format('F j, Y'),
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
            'type' => 'temporary_access_granted',
            'tier' => $this->tier,
            'days' => $this->days,
            'ends_at' => $this->subscription->ends_at->toISOString(),
            'reason' => $this->reason,
            'message' => 'You have been granted ' . $this->days . ' days of ' . ucfirst($this->tier) . ' access.',
        ];
    }
}

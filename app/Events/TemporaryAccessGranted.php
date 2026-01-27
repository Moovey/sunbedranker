<?php

namespace App\Events;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TemporaryAccessGranted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public User $hotelier,
        public Subscription $subscription,
        public string $tier,
        public int $days,
        public User $admin,
        public ?string $reason = null
    ) {}
}

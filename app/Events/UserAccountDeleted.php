<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserAccountDeleted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The deleted user's data (stored as array since user will be deleted).
     */
    public array $userData;

    /**
     * Create a new event instance.
     */
    public function __construct(User $user)
    {
        // Store user data as array since the user will be deleted
        $this->userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'deleted_at' => now()->toDateTimeString(),
        ];
    }
}

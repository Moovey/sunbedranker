<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @method bool isAdmin()
 * @method bool isHotelier()
 * @method bool isUser()
 * @method string getRedirectPath()
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'last_login_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Check if user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is a hotelier.
     */
    public function isHotelier(): bool
    {
        return $this->role === 'hotelier';
    }

    /**
     * Check if user is a regular user (holidaymaker).
     */
    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    /**
     * Get the redirect path after login based on user role.
     */
    public function getRedirectPath(): string
    {
        return match($this->role) {
            'admin' => '/admin',
            'hotelier' => '/hotelier',
            default => '/',
        };
    }
}

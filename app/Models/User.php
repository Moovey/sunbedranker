<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;

/**
 * @method bool isAdmin()
 * @method bool isHotelier()
 * @method bool isUser()
 * @method string getRedirectPath()
 * @property string|null $profile_picture_url
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
        'profile_picture',
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
     * The attributes to append to the model's array form.
     *
     * @var list<string>
     */
    protected $appends = ['profile_picture_url'];

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
     * Get the profile picture URL.
     */
    protected function profilePictureUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->profile_picture) {
                    return null;
                }

                // If it's already a full URL (like from Unsplash or external source)
                if (str_starts_with($this->profile_picture, 'http://') || str_starts_with($this->profile_picture, 'https://')) {
                    return $this->profile_picture;
                }

                // Get the configured disk for public uploads
                $disk = config('filesystems.public_uploads', 'public');

                /** @var \Illuminate\Filesystem\FilesystemAdapter $storage */
                $storage = Storage::disk($disk);

                return $storage->url($this->profile_picture);
            }
        );
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

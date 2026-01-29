<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;

/**
 * @method bool isAdmin()
 * @method bool isHotelier()
 * @method bool isUser()
 * @method string getRedirectPath()
 * @method bool canClaimHotels()
 * @method bool canEditHotels()
 * @method bool hasFreeTier()
 * @method bool hasEnhancedTier()
 * @method bool hasPremiumTier()
 * @property string|null $profile_picture_url
 * @property string $subscription_tier
 * @property Subscription|null $activeSubscription
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Subscription tier constants
     */
    public const TIER_FREE = 'free';
    public const TIER_ENHANCED = 'enhanced';
    public const TIER_PREMIUM = 'premium';

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
        'google_id',
        'avatar',
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
    protected $appends = ['profile_picture_url', 'subscription_tier'];

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
     * Get the user's subscriptions.
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    /**
     * Get the user's active subscription.
     */
    public function activeSubscription(): HasOne
    {
        return $this->hasOne(Subscription::class)
            ->where('status', Subscription::STATUS_ACTIVE)
            ->where(function ($query) {
                $query->whereNull('ends_at')
                      ->orWhere('ends_at', '>', now());
            })
            ->latest();
    }

    /**
     * Get the current subscription tier (from active subscription or free).
     */
    protected function subscriptionTier(): Attribute
    {
        return Attribute::make(
            get: function () {
                $subscription = $this->activeSubscription;
                return $subscription ? $subscription->tier : self::TIER_FREE;
            }
        );
    }

    /**
     * Get the subscription expiration date.
     */
    public function getSubscriptionExpiresAtAttribute()
    {
        $subscription = $this->activeSubscription;
        return $subscription ? $subscription->ends_at : null;
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

    /**
     * Check if user has free tier subscription.
     */
    public function hasFreeTier(): bool
    {
        return $this->subscription_tier === self::TIER_FREE || $this->subscription_tier === null;
    }

    /**
     * Check if user has enhanced tier subscription.
     */
    public function hasEnhancedTier(): bool
    {
        return $this->subscription_tier === self::TIER_ENHANCED;
    }

    /**
     * Check if user has premium tier subscription.
     */
    public function hasPremiumTier(): bool
    {
        return $this->subscription_tier === self::TIER_PREMIUM;
    }

    /**
     * Check if user has at least enhanced tier (enhanced or premium).
     */
    public function hasAtLeastEnhancedTier(): bool
    {
        return in_array($this->subscription_tier, [self::TIER_ENHANCED, self::TIER_PREMIUM]);
    }

    /**
     * Check if user can claim hotels (requires at least enhanced tier).
     */
    public function canClaimHotels(): bool
    {
        return $this->isHotelier() && $this->hasAtLeastEnhancedTier();
    }

    /**
     * Check if user can edit hotel profiles (requires at least enhanced tier).
     */
    public function canEditHotels(): bool
    {
        return $this->isHotelier() && $this->hasAtLeastEnhancedTier();
    }

    /**
     * Check if subscription is active (not expired).
     */
    public function hasActiveSubscription(): bool
    {
        // Free tier is always active
        if ($this->hasFreeTier()) {
            return true;
        }

        // For paid tiers, check expiration
        if ($this->subscription_expires_at === null) {
            return true; // No expiration set means lifetime
        }

        return $this->subscription_expires_at->isFuture();
    }

    /**
     * Get the subscription tier display name.
     */
    public function getSubscriptionTierName(): string
    {
        return match($this->subscription_tier) {
            self::TIER_PREMIUM => 'Premium',
            self::TIER_ENHANCED => 'Enhanced',
            default => 'Free',
        };
    }

    /**
     * Send the password reset notification.
     *
     * @param string $token
     */
    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new \App\Notifications\CustomResetPasswordNotification($token));
    }
}

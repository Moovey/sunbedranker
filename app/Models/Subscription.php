<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends Model
{
    use HasFactory;

    /**
     * Subscription tier constants
     */
    public const TIER_FREE = 'free';
    public const TIER_ENHANCED = 'enhanced';
    public const TIER_PREMIUM = 'premium';

    /**
     * Status constants
     */
    public const STATUS_PENDING = 'pending';
    public const STATUS_ACTIVE = 'active';
    public const STATUS_CANCELLED = 'cancelled';
    public const STATUS_EXPIRED = 'expired';

    protected $fillable = [
        'user_id',
        'tier',
        'period_months',
        'monthly_price',
        'original_price',
        'total_amount',
        'savings',
        'discount_percent',
        'free_months',
        'starts_at',
        'ends_at',
        'status',
        'payment_method',
        'transaction_id',
        'coupon_code',
        // Billing fields
        'billing_first_name',
        'billing_last_name',
        'billing_country',
        'billing_phone',
        'billing_address',
        'billing_city',
        'billing_zip',
    ];

    protected $casts = [
        'monthly_price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'savings' => 'decimal:2',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    /**
     * Get the user that owns the subscription.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if subscription is active.
     */
    public function isActive(): bool
    {
        return $this->status === self::STATUS_ACTIVE && 
               ($this->ends_at === null || $this->ends_at->isFuture());
    }

    /**
     * Check if subscription is expired.
     */
    public function isExpired(): bool
    {
        return $this->ends_at && $this->ends_at->isPast();
    }

    /**
     * Check if subscription is pending payment.
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Get remaining days.
     */
    public function remainingDays(): int
    {
        if (!$this->ends_at || $this->ends_at->isPast()) {
            return 0;
        }
        return now()->diffInDays($this->ends_at);
    }

    /**
     * Get total months including free months.
     */
    public function getTotalMonthsAttribute(): int
    {
        return $this->period_months + $this->free_months;
    }

    /**
     * Get tier display name.
     */
    public function getTierNameAttribute(): string
    {
        return match($this->tier) {
            self::TIER_PREMIUM => 'Premium',
            self::TIER_ENHANCED => 'Enhanced',
            default => 'Free',
        };
    }

    /**
     * Get status display name.
     */
    public function getStatusNameAttribute(): string
    {
        return match($this->status) {
            self::STATUS_ACTIVE => 'Active',
            self::STATUS_PENDING => 'Pending Payment',
            self::STATUS_CANCELLED => 'Cancelled',
            self::STATUS_EXPIRED => 'Expired',
            default => ucfirst($this->status),
        };
    }

    /**
     * Scope for active subscriptions.
     */
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE)
                     ->where(function ($q) {
                         $q->whereNull('ends_at')
                           ->orWhere('ends_at', '>', now());
                     });
    }

    /**
     * Scope for a specific user.
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Activate the subscription.
     */
    public function activate(): bool
    {
        return $this->update([
            'status' => self::STATUS_ACTIVE,
            'starts_at' => now(),
        ]);
    }

    /**
     * Cancel the subscription.
     */
    public function cancel(): bool
    {
        return $this->update([
            'status' => self::STATUS_CANCELLED,
        ]);
    }
}

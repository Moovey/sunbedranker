<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HotelClaim extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_id',
        'user_id',
        'status',
        'claim_message',
        'official_email',
        'phone',
        'phone_verified_at',
        'proof_document',
        'admin_notes',
        'reviewed_by',
        'reviewed_at',
        'claimed_at',
        'ip_address',
        'last_claim_attempt_at',
        'claim_attempts',
    ];

    protected $casts = [
        'reviewed_at' => 'datetime',
        'phone_verified_at' => 'datetime',
        'claimed_at' => 'datetime',
        'last_claim_attempt_at' => 'datetime',
    ];

    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function approve(User $admin): void
    {
        $this->update([
            'status' => 'approved',
            'reviewed_by' => $admin->id,
            'reviewed_at' => now(),
            'claimed_at' => now(),
        ]);

        // Assign hotel ownership
        $this->hotel->update(['owned_by' => $this->user_id]);
    }

    public function reject(User $admin, ?string $notes = null): void
    {
        $this->update([
            'status' => 'rejected',
            'reviewed_by' => $admin->id,
            'reviewed_at' => now(),
            'admin_notes' => $notes,
        ]);
    }

    public function isEmailFromHotelDomain(): bool
    {
        if (!$this->official_email || !$this->hotel->website) {
            return false;
        }

        $emailDomain = substr(strrchr($this->official_email, "@"), 1);
        $websiteDomain = parse_url($this->hotel->website, PHP_URL_HOST);
        $websiteDomain = str_replace('www.', '', $websiteDomain ?? '');

        return strtolower($emailDomain) === strtolower($websiteDomain);
    }
}

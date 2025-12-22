<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'hotel_id',
        'user_id',
        'title',
        'content',
        'overall_rating',
        'sunbed_rating',
        'pool_rating',
        'cleanliness_rating',
        'atmosphere_rating',
        'visit_date',
        'travel_type',
        'status',
        'is_verified_stay',
        'moderated_by',
        'moderated_at',
        'helpful_count',
        'not_helpful_count',
    ];

    protected $casts = [
        'visit_date' => 'date',
        'is_verified_stay' => 'boolean',
        'moderated_at' => 'datetime',
    ];

    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function moderator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'moderated_by');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeRecent($query)
    {
        return $query->orderByDesc('created_at');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HotelAnalytic extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_id',
        'date',
        'views',
        'clicks',
        'comparisons',
        'ctr',
    ];

    protected $casts = [
        'date' => 'date',
        'ctr' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($analytic) {
            // Auto-calculate CTR
            if ($analytic->views > 0) {
                $analytic->ctr = round(($analytic->clicks / $analytic->views) * 100, 2);
            }
        });
    }

    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PoolCriteria extends Model
{
    use HasFactory;

    protected $table = 'pool_criteria';

    protected $fillable = [
        'hotel_id',
        'total_sunbeds',
        'total_guests',
        'sunbed_to_guest_ratio',
        'has_towel_reservation_policy',
        'sunbed_quality',
        'number_of_pools',
        'pool_types',
        'total_pool_area_sqm',
        'has_infinity_pool',
        'has_rooftop_pool',
        'has_heated_pool',
        'has_kids_pool',
        'has_lazy_river',
        'has_pool_bar',
        'sun_exposure',
        'has_shade_areas',
        'sun_from',
        'sun_until',
        'atmosphere',
        'is_adults_only',
        'has_music',
        'music_volume',
        'allows_food_drinks',
        'cleanliness_score',
        'maintenance_score',
        'water_quality',
        'has_lifeguard',
        'wheelchair_accessible',
        'has_changing_facilities',
        'has_pool_toys',
        'has_kids_activities',
        'special_features',
        'restrictions',
        'opening_time',
        'closing_time',
        'seasonal_availability',
        'data_source',
        'is_verified',
        'verified_at',
        'verified_by',
    ];

    protected $casts = [
        'sunbed_to_guest_ratio' => 'decimal:2',
        'total_pool_area_sqm' => 'decimal:2',
        'has_towel_reservation_policy' => 'boolean',
        'has_infinity_pool' => 'boolean',
        'has_rooftop_pool' => 'boolean',
        'has_heated_pool' => 'boolean',
        'has_kids_pool' => 'boolean',
        'has_lazy_river' => 'boolean',
        'has_pool_bar' => 'boolean',
        'has_shade_areas' => 'boolean',
        'is_adults_only' => 'boolean',
        'has_music' => 'boolean',
        'allows_food_drinks' => 'boolean',
        'has_lifeguard' => 'boolean',
        'wheelchair_accessible' => 'boolean',
        'has_changing_facilities' => 'boolean',
        'has_pool_toys' => 'boolean',
        'has_kids_activities' => 'boolean',
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($poolCriteria) {
            // Auto-calculate sunbed ratio if both values are present
            if ($poolCriteria->total_sunbeds && $poolCriteria->total_guests) {
                $poolCriteria->sunbed_to_guest_ratio = 
                    round($poolCriteria->total_sunbeds / $poolCriteria->total_guests, 2);
            }
        });
    }

    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function getPoolTypesArray(): array
    {
        return $this->pool_types ? explode(',', $this->pool_types) : [];
    }

    public function hasPoolType(string $type): bool
    {
        return in_array($type, $this->getPoolTypesArray());
    }

    public function getSunExposureHours(): ?int
    {
        if (!$this->sun_from || !$this->sun_until) {
            return null;
        }

        $from = \Carbon\Carbon::parse($this->sun_from);
        $until = \Carbon\Carbon::parse($this->sun_until);
        
        return $until->diffInHours($from);
    }

    public function isFamilyFriendly(): bool
    {
        return $this->has_kids_pool 
            || $this->has_kids_activities 
            || $this->has_lifeguard 
            || $this->has_pool_toys;
    }

    public function isQuiet(): bool
    {
        return $this->atmosphere === 'quiet' 
            || ($this->music_volume === 'none' || $this->music_volume === 'low')
            || $this->is_adults_only;
    }
}

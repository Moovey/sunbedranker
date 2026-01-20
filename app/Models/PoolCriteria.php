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
        
        // Core scoring fields currently in use
        'sunbed_count',
        'sunbed_to_guest_ratio',
        'sunbed_types',
        
        'sun_exposure',
        'sunny_areas',
        
        'pool_size_category',
        'pool_size_sqm',
        'number_of_pools',
        'pool_types',
        
        'towel_reservation_policy',
        'towel_service_cost',
        'pool_opening_hours',
        
        'has_pool_bar',
        'has_waiter_service',
        'shade_options',
        'bar_distance',
        'toilet_distance',
        
        'atmosphere',
        'music_level',
        'has_entertainment',
        'entertainment_types',
        
        'cleanliness_rating',
        'sunbed_condition_rating',
        'tiling_condition_rating',
        
        'has_accessibility_ramp',
        'has_pool_hoist',
        'has_step_free_access',
        'has_elevator_to_rooftop',
        
        'has_kids_pool',
        'kids_pool_depth_m',
        'has_splash_park',
        'has_waterslide',
        'has_lifeguard',
        'lifeguard_hours',
        
        'has_luxury_cabanas',
        'has_cabana_service',
        'has_heated_pool',
        'has_jacuzzi',
        'has_adult_sun_terrace',
        
        // Pool type flags
        'has_infinity_pool',
        'has_rooftop_pool',
        'is_adults_only',
    ];

    protected $casts = [
        'sunbed_to_guest_ratio' => 'decimal:2',
        'pool_size_sqm' => 'decimal:2',
        'kids_pool_depth_m' => 'decimal:2',
        
        // Array fields
        'sunbed_types' => 'array',
        'sunny_areas' => 'array',
        'pool_types' => 'array',
        'shade_options' => 'array',
        'entertainment_types' => 'array',
        
        // Boolean fields
        'has_pool_bar' => 'boolean',
        'has_waiter_service' => 'boolean',
        'has_entertainment' => 'boolean',
        'has_accessibility_ramp' => 'boolean',
        'has_pool_hoist' => 'boolean',
        'has_step_free_access' => 'boolean',
        'has_elevator_to_rooftop' => 'boolean',
        'has_kids_pool' => 'boolean',
        'has_splash_park' => 'boolean',
        'has_waterslide' => 'boolean',
        'has_lifeguard' => 'boolean',
        'has_luxury_cabanas' => 'boolean',
        'has_cabana_service' => 'boolean',
        'has_heated_pool' => 'boolean',
        'has_jacuzzi' => 'boolean',
        'has_adult_sun_terrace' => 'boolean',
        
        // Pool type flags
        'has_infinity_pool' => 'boolean',
        'has_rooftop_pool' => 'boolean',
        'is_adults_only' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($poolCriteria) {
            // Auto-calculate sunbed ratio from sunbed_count and hotel's total_rooms
            // Formula: sunbed_count / (total_rooms * 2) - assuming 2 guests per room
            if ($poolCriteria->sunbed_count && $poolCriteria->hotel_id) {
                $hotel = \App\Models\Hotel::find($poolCriteria->hotel_id);
                if ($hotel && $hotel->total_rooms) {
                    $totalGuests = $hotel->total_rooms * 2; // Average 2 guests per room
                    $poolCriteria->sunbed_to_guest_ratio = 
                        round($poolCriteria->sunbed_count / $totalGuests, 2);
                }
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

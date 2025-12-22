<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'country',
        'country_code',
        'region',
        'description',
        'image',
        'latitude',
        'longitude',
        'hotel_count',
        'is_featured',
        'is_active',
    ];

    protected $casts = [
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function hotels(): HasMany
    {
        return $this->hasMany(Hotel::class);
    }

    public function activeHotels(): HasMany
    {
        return $this->hasMany(Hotel::class)->where('is_active', true);
    }

    public function featuredHotels(): HasMany
    {
        return $this->hasMany(Hotel::class)
            ->where('is_active', true)
            ->where('is_featured', true)
            ->orderByDesc('overall_score');
    }

    public function topRatedHotels(int $limit = 10): HasMany
    {
        return $this->hasMany(Hotel::class)
            ->where('is_active', true)
            ->whereNotNull('overall_score')
            ->orderByDesc('overall_score')
            ->limit($limit);
    }

    public function updateHotelCount(): void
    {
        $this->update([
            'hotel_count' => $this->activeHotels()->count()
        ]);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

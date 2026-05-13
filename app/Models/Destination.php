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
        'is_auto_created',
        'agoda_city_id',
        // AI-generated SEO content
        'ai_description',
        'ai_meta_title',
        'ai_meta_description',
        'ai_h2_sections',
        'ai_schema_jsonld',
        'ai_generated_at',
        'ai_model_used',
    ];

    protected $casts = [
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'is_auto_created' => 'boolean',
        'ai_h2_sections' => 'array',
        'ai_schema_jsonld' => 'array',
        'ai_generated_at' => 'datetime',
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

    /** @param  \Illuminate\Database\Eloquent\Builder  $query */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Case-insensitive partial match across name/country/region/country_code.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     */
    public function scopeSearch($query, string $term)
    {
        $escaped = str_replace(['%', '_'], ['\%', '\_'], trim($term));

        return $query->where(function ($q) use ($escaped) {
            $q->where('name', 'LIKE', "%{$escaped}%")
              ->orWhere('country', 'LIKE', "%{$escaped}%")
              ->orWhere('region', 'LIKE', "%{$escaped}%")
              ->orWhere('country_code', 'LIKE', "{$escaped}%");
        });
    }
}

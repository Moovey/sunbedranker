<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AgodaHotel extends Model
{
    protected $fillable = [
        'agoda_hotel_id', 'chain_id', 'chain_name', 'brand_id', 'brand_name',
        'hotel_name', 'hotel_formerly_name', 'hotel_translated_name',
        'addressline1', 'addressline2', 'zipcode', 'city', 'state', 'country',
        'countryisocode', 'star_rating', 'longitude', 'latitude', 'url',
        'checkin', 'checkout', 'numberrooms', 'numberfloors',
        'yearopened', 'yearrenovated',
        'photo1', 'photo2', 'photo3', 'photo4', 'photo5',
        'overview', 'rates_from', 'continent_id', 'continent_name',
        'city_id', 'country_id', 'number_of_reviews', 'rating_average',
        'rates_currency', 'rates_from_exclusive', 'accommodation_type',
        'promoted_hotel_id',
    ];

    protected $casts = [
        'star_rating' => 'decimal:1',
        'longitude' => 'decimal:8',
        'latitude' => 'decimal:8',
        'rates_from' => 'decimal:2',
        'rates_from_exclusive' => 'decimal:2',
        'rating_average' => 'decimal:1',
        'agoda_hotel_id' => 'integer',
        'chain_id' => 'integer',
        'brand_id' => 'integer',
        'city_id' => 'integer',
        'country_id' => 'integer',
        'number_of_reviews' => 'integer',
        'numberrooms' => 'integer',
        'numberfloors' => 'integer',
        'yearopened' => 'integer',
        'yearrenovated' => 'integer',
    ];

    public function promotedHotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class, 'promoted_hotel_id');
    }

    public function isPromoted(): bool
    {
        return $this->promoted_hotel_id !== null;
    }

    public function getPhotosAttribute(): array
    {
        return array_values(array_filter([
            $this->photo1, $this->photo2, $this->photo3,
            $this->photo4, $this->photo5,
        ]));
    }

    public function getAffiliateUrlAttribute(): string
    {
        $siteId = config('services.agoda.site_id', '1955707');
        return "https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid={$siteId}&hid={$this->agoda_hotel_id}";
    }
}

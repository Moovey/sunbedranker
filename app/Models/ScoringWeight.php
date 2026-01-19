<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScoringWeight extends Model
{
    use HasFactory;

    protected $fillable = [
        'criteria_name',
        'display_name',
        'weight',
        'family_weight',
        'quiet_weight',
        'party_weight',
        'description',
        'is_active',
        'is_visible',
        'is_public',
        'order',
    ];

    protected $casts = [
        'weight' => 'decimal:2',
        'family_weight' => 'decimal:2',
        'quiet_weight' => 'decimal:2',
        'party_weight' => 'decimal:2',
        'is_active' => 'boolean',
        'is_visible' => 'boolean',
        'is_public' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('order');
    }

    public function scopeVisible($query)
    {
        return $query->where('is_visible', true)->orderBy('order');
    }

    public function scopePublic($query)
    {
        return $query->where('is_public', true)->orderBy('order');
    }
}

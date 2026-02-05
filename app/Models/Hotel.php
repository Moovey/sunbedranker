<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Hotel extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'destination_id',
        'name',
        'slug',
        'description',
        'pool_description',
        'amenities_description',
        'house_rules',
        'towel_policy',
        'faqs',
        'address',
        'latitude',
        'longitude',
        'star_rating',
        'total_rooms',
        'phone',
        'email',
        'website',
        'external_api_id',
        'external_api_source',
        'external_data',
        'main_image',
        'logo',
        'images',
        'booking_affiliate_url',
        'expedia_affiliate_url',
        'direct_booking_url',
        'is_active',
        'is_verified',
        'is_featured',
        'owned_by',
        'subscription_tier',
        'subscription_expires_at',
        'overall_score',
        'family_score',
        'quiet_score',
        'party_score',
        'view_count',
        'click_count',
        'affiliate_click_count',
        'direct_click_count',
        'average_rating',
        'review_count',
        'affiliate_provider',
        'affiliate_tracking_code',
        'affiliate_revenue',
        'override_name',
        'override_images',
        'override_description',
        // Enhanced subscription features
        'promotional_banner',
        'special_offer',
        'special_offer_expires_at',
        'video_url',
        'video_360_url',
        'show_verified_badge',
        'promotions', // JSON array for multiple promotions (Premium feature)
    ];

    protected $casts = [
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'external_data' => 'array',
        'images' => 'array',
        'faqs' => 'array',
        'is_active' => 'boolean',
        'is_verified' => 'boolean',
        'is_featured' => 'boolean',
        'subscription_expires_at' => 'datetime',
        'overall_score' => 'decimal:1',
        'family_score' => 'decimal:1',
        'quiet_score' => 'decimal:1',
        'party_score' => 'decimal:1',
        'average_rating' => 'decimal:1',
        'affiliate_revenue' => 'decimal:2',
        'override_name' => 'boolean',
        'override_images' => 'boolean',
        'override_description' => 'boolean',
        'special_offer_expires_at' => 'date',
        'show_verified_badge' => 'boolean',
        'promotions' => 'array',
    ];

    protected $appends = ['main_image_url', 'gallery_images_urls', 'has_pending_claim', 'is_premium', 'active_promotions'];

    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }

    public function poolCriteria(): HasOne
    {
        return $this->hasOne(PoolCriteria::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function approvedReviews(): HasMany
    {
        return $this->hasMany(Review::class)->where('status', 'approved');
    }

    public function claims(): HasMany
    {
        return $this->hasMany(HotelClaim::class);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owned_by');
    }

    public function hasPendingClaim(): bool
    {
        return $this->claims()->where('status', 'pending')->exists();
    }

    public function hasOwner(): bool
    {
        return $this->owned_by !== null;
    }

    public function analytics(): HasMany
    {
        return $this->hasMany(HotelAnalytic::class);
    }

    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class)->withTimestamps();
    }

    public function isPremium(): bool
    {
        // Check if the hotel owner (hotelier) has a premium subscription
        if ($this->owner) {
            return $this->owner->hasPremiumTier() && $this->owner->hasActiveSubscription();
        }
        return false;
    }

    public function isEnhanced(): bool
    {
        // Check if the hotel owner (hotelier) has at least enhanced subscription
        if ($this->owner) {
            return $this->owner->hasAtLeastEnhancedTier() && $this->owner->hasActiveSubscription();
        }
        return false;
    }

    public function incrementViews(): void
    {
        $this->increment('view_count');
        
        // Update analytics
        $analytic = $this->analytics()->firstOrCreate(
            ['date' => now()->toDateString()],
            ['views' => 0, 'clicks' => 0]
        );
        $analytic->increment('views');
    }

    public function incrementClicks(string $type = 'affiliate'): void
    {
        $this->increment('click_count');
        
        // Track by type (affiliate vs direct)
        if ($type === 'direct') {
            $this->increment('direct_click_count');
        } else {
            $this->increment('affiliate_click_count');
        }
        
        // Update analytics
        $analytic = $this->analytics()->firstOrCreate(
            ['date' => now()->toDateString()],
            ['views' => 0, 'clicks' => 0, 'affiliate_clicks' => 0, 'direct_clicks' => 0]
        );
        $analytic->increment('clicks');
        
        // Also increment the specific type
        if ($type === 'direct') {
            $analytic->increment('direct_clicks');
        } else {
            $analytic->increment('affiliate_clicks');
        }
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeTopRated($query)
    {
        return $query->whereNotNull('overall_score')
            ->orderByDesc('overall_score');
    }

    public function scopeForFamilies($query)
    {
        return $query->whereNotNull('family_score')
            ->orderByDesc('family_score');
    }

    public function scopeQuietSun($query)
    {
        return $query->whereNotNull('quiet_score')
            ->orderByDesc('quiet_score');
    }

    public function scopePartyPools($query)
    {
        return $query->whereNotNull('party_score')
            ->orderByDesc('party_score');
    }

    /**
     * Get the main image URL (handles both uploaded files and external URLs)
     */
    public function getMainImageUrlAttribute(): ?string
    {
        if (!$this->main_image) {
            return null;
        }

        // If it's already a full URL (Unsplash, etc.), return as is
        if (filter_var($this->main_image, FILTER_VALIDATE_URL)) {
            return $this->main_image;
        }

        // Otherwise, convert storage path to URL using configured disk
        $disk = config('filesystems.public_uploads', 'public');
        /** @var \Illuminate\Filesystem\FilesystemAdapter $storage */
        $storage = \Illuminate\Support\Facades\Storage::disk($disk);
        return $storage->url($this->main_image);
    }

    /**
     * Get gallery images URLs (handles both uploaded files and external URLs)
     */
    public function getGalleryImagesUrlsAttribute(): array
    {
        if (!$this->images || !is_array($this->images)) {
            return [];
        }

        $disk = config('filesystems.public_uploads', 'public');
        /** @var \Illuminate\Filesystem\FilesystemAdapter $storage */
        $storage = \Illuminate\Support\Facades\Storage::disk($disk);
        
        return array_map(function ($image) use ($storage) {
            // If it's already a full URL, return as is
            if (filter_var($image, FILTER_VALIDATE_URL)) {
                return $image;
            }
            // Otherwise, convert storage path to URL using configured disk
            return $storage->url($image);
        }, $this->images);
    }

    /**
     * Check if hotel has a pending claim
     */
    public function getHasPendingClaimAttribute(): bool
    {
        return $this->claims()->where('status', 'pending')->exists();
    }

    /**
     * Check if hotel is premium (via owner's subscription)
     */
    public function getIsPremiumAttribute(): bool
    {
        return $this->isPremium();
    }

    /**
     * Get active (non-expired) promotions only
     * Filters out promotions where special_offer_expires_at is in the past
     */
    public function getActivePromotionsAttribute(): array
    {
        $promotions = $this->promotions ?? [];
        
        if (empty($promotions)) {
            return [];
        }

        $today = now()->startOfDay();

        return array_values(array_filter($promotions, function ($promo) use ($today) {
            // Keep promotions without expiry date or with future/today expiry
            if (empty($promo['special_offer_expires_at'])) {
                return true;
            }
            
            $expiryDate = \Carbon\Carbon::parse($promo['special_offer_expires_at'])->startOfDay();
            return $expiryDate >= $today;
        }));
    }
}

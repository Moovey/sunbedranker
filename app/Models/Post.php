<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'author_id',
        'category_id',
        'status',
        'published_at',
        'views_count',
        'meta',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'meta' => 'array',
    ];

    protected $appends = ['featured_image_url'];

    /**
     * Get the featured image URL.
     */
    protected function featuredImageUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->featured_image) {
                    return null;
                }

                // If it's already a full URL
                if (str_starts_with($this->featured_image, 'http://') || str_starts_with($this->featured_image, 'https://')) {
                    return $this->featured_image;
                }

                // Get the configured disk for public uploads
                $disk = config('filesystems.public_uploads', 'public');

                /** @var \Illuminate\Filesystem\FilesystemAdapter $storage */
                $storage = Storage::disk($disk);

                return $storage->url($this->featured_image);
            }
        );
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }
}

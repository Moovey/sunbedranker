<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display blog listing with filters
     */
    public function index(Request $request)
    {
        $query = Post::with(['author:id,name,profile_picture', 'category:id,name,slug,color', 'tags:id,name,slug'])
            ->where('status', 'published')
            ->where(function ($q) {
                $q->whereNull('published_at')
                  ->orWhere('published_at', '<=', now());
            });

        // Filter by category
        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Filter by tag
        if ($request->filled('tag')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('slug', $request->tag);
            });
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $posts = $query->orderBy('published_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(12)
            ->withQueryString();

        // Get categories with post counts (cached 10 minutes)
        $categories = Cache::remember('blog:categories', 600, function () {
            return Category::withCount(['posts' => function ($q) {
                $q->where('status', 'published')
                  ->where(function ($sq) {
                      $sq->whereNull('published_at')
                        ->orWhere('published_at', '<=', now());
                  });
            }])
            ->having('posts_count', '>', 0)
            ->orderBy('name')
            ->get();
        });

        // Get popular tags (cached 10 minutes)
        $tags = Cache::remember('blog:tags', 600, function () {
            return Tag::withCount(['posts' => function ($q) {
                $q->where('status', 'published')
                  ->where(function ($sq) {
                      $sq->whereNull('published_at')
                        ->orWhere('published_at', '<=', now());
                  });
            }])
            ->having('posts_count', '>', 0)
            ->orderByDesc('posts_count')
            ->limit(20)
            ->get();
        });

        // Get featured/recent posts for sidebar (cached 5 minutes)
        $featuredPosts = Cache::remember('blog:featured', 300, function () {
            return Post::with(['category:id,name,slug'])
                ->where('status', 'published')
                ->where(function ($q) {
                    $q->whereNull('published_at')
                      ->orWhere('published_at', '<=', now());
                })
                ->orderByDesc('views_count')
                ->limit(5)
                ->get(['id', 'title', 'slug', 'featured_image', 'published_at', 'category_id']);
        });

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'tags' => $tags,
            'featuredPosts' => $featuredPosts,
            'filters' => [
                'category' => $request->category,
                'tag' => $request->tag,
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Display a single blog post
     */
    public function show(Post $post)
    {
        // Only show published posts
        if ($post->status !== 'published') {
            abort(404);
        }

        // Check if scheduled for future
        if ($post->published_at && $post->published_at > now()) {
            abort(404);
        }

        // Rate-limited view count increment (1 per IP per post per 5 minutes)
        // Prevents artificial view inflation
        $viewKey = 'blog-view:' . $post->id . ':' . request()->ip();
        if (!RateLimiter::tooManyAttempts($viewKey, 1)) {
            $post->increment('views_count');
            RateLimiter::hit($viewKey, 300); // 5 minute cooldown
        }

        // Load relationships
        $post->load([
            'author:id,name,profile_picture',
            'category:id,name,slug,color',
            'tags:id,name,slug'
        ]);

        // Get related posts (same category or tags)
        $relatedPosts = Post::with(['category:id,name,slug'])
            ->where('status', 'published')
            ->where('id', '!=', $post->id)
            ->where(function ($q) {
                $q->whereNull('published_at')
                  ->orWhere('published_at', '<=', now());
            })
            ->where(function ($q) use ($post) {
                $q->where('category_id', $post->category_id)
                  ->orWhereHas('tags', function ($tq) use ($post) {
                      $tq->whereIn('tags.id', $post->tags->pluck('id'));
                  });
            })
            ->orderByDesc('published_at')
            ->limit(3)
            ->get(['id', 'title', 'slug', 'excerpt', 'featured_image', 'published_at', 'category_id']);

        // Get next and previous posts
        $nextPost = Post::where('status', 'published')
            ->where(function ($q) {
                $q->whereNull('published_at')
                  ->orWhere('published_at', '<=', now());
            })
            ->where('published_at', '>', $post->published_at ?? $post->created_at)
            ->orderBy('published_at')
            ->first(['id', 'title', 'slug']);

        $previousPost = Post::where('status', 'published')
            ->where(function ($q) {
                $q->whereNull('published_at')
                  ->orWhere('published_at', '<=', now());
            })
            ->where('published_at', '<', $post->published_at ?? $post->created_at)
            ->orderByDesc('published_at')
            ->first(['id', 'title', 'slug']);

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
            'nextPost' => $nextPost,
            'previousPost' => $previousPost,
        ]);
    }

    /**
     * Get latest posts for homepage (cached 5 minutes)
     */
    public static function getLatestPosts(int $limit = 3)
    {
        return Cache::remember("blog:latest:{$limit}", 300, function () use ($limit) {
            return Post::with(['category:id,name,slug,color'])
                ->where('status', 'published')
                ->where(function ($q) {
                    $q->whereNull('published_at')
                      ->orWhere('published_at', '<=', now());
                })
                ->orderByDesc('published_at')
                ->orderByDesc('created_at')
                ->limit($limit)
                ->get(['id', 'title', 'slug', 'excerpt', 'featured_image', 'published_at', 'category_id', 'views_count']);
        });
    }
}

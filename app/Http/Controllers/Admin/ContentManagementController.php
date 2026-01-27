<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ContentManagementController extends Controller
{
    /**
     * Cache keys for content management
     */
    public const CACHE_KEY_STATS = 'admin.content.stats';
    private const STATS_TTL_MINUTES = 10;
    /**
     * Display content management dashboard
     */
    public function index(Request $request): Response
    {
        $tab = $request->get('tab', 'posts');
        $search = $request->get('search', '');
        $status = $request->get('status', 'all');
        $categoryId = $request->get('category', 'all');

        // Posts with filters
        $postsQuery = Post::with(['author', 'category', 'tags'])
            ->when($search, function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%");
            })
            ->when($status !== 'all', function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when($categoryId !== 'all', function ($query) use ($categoryId) {
                $query->where('category_id', $categoryId);
            });

        $posts = $postsQuery->latest()->paginate(15);

        // Categories
        $categories = Category::withCount('posts')
            ->when($search && $tab === 'categories', function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy('name')
            ->paginate(15);

        // Tags
        $tags = Tag::withCount('posts')
            ->when($search && $tab === 'tags', function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy('name')
            ->paginate(15);

        // All categories for filter dropdown
        $allCategories = Category::orderBy('name')->get();

        // Get cached stats
        $stats = $this->getCachedStats();

        return Inertia::render('Admin/Content/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'tags' => $tags,
            'allCategories' => $allCategories,
            'filters' => [
                'tab' => $tab,
                'search' => $search,
                'status' => $status,
                'category' => $categoryId,
            ],
            'stats' => $stats,
        ]);
    }

    /**
     * Show create post form
     */
    public function createPost(): Response
    {
        $categories = Category::orderBy('name')->get();
        $tags = Tag::orderBy('name')->get();

        return Inertia::render('Admin/Content/CreatePost', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Store a new post
     */
    public function storePost(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:posts,slug',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'status' => 'required|in:draft,published,scheduled',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
        ]);

        DB::beginTransaction();
        try {
            // Handle featured image upload
            $imagePath = null;
            if ($request->hasFile('featured_image')) {
                $disk = config('filesystems.public_uploads', 'public');
                $imagePath = $request->file('featured_image')->store('posts', $disk);
            }

            // Generate slug if not provided
            $slug = $validated['slug'] ?? Str::slug($validated['title']);
            
            // Ensure unique slug
            $originalSlug = $slug;
            $counter = 1;
            while (Post::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $counter++;
            }

            // Create post
            $post = Post::create([
                'title' => $validated['title'],
                'slug' => $slug,
                'excerpt' => $validated['excerpt'],
                'content' => $validated['content'],
                'featured_image' => $imagePath,
                'category_id' => $validated['category_id'],
                'author_id' => Auth::id(),
                'status' => $validated['status'],
                'published_at' => $validated['status'] === 'published' ? now() : $validated['published_at'],
                'meta' => [
                    'title' => $validated['meta_title'] ?? null,
                    'description' => $validated['meta_description'] ?? null,
                ],
            ]);

            // Sync tags
            if (!empty($validated['tags'])) {
                $post->tags()->sync($validated['tags']);
            }

            // Update category posts count
            Category::where('id', $validated['category_id'])->increment('posts_count');

            DB::commit();

            return redirect()->route('admin.content.index')
                ->with('success', 'Post created successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to create post: ' . $e->getMessage()]);
        }
    }

    /**
     * Show edit post form
     */
    public function editPost(Post $post): Response
    {
        $post->load(['category', 'tags']);
        $categories = Category::orderBy('name')->get();
        $tags = Tag::orderBy('name')->get();

        return Inertia::render('Admin/Content/EditPost', [
            'post' => $post,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Update a post
     */
    public function updatePost(Request $request, Post $post): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:posts,slug,' . $post->id,
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'status' => 'required|in:draft,published,scheduled',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
        ]);

        DB::beginTransaction();
        try {
            $oldCategoryId = $post->category_id;

            // Handle featured image
            $imagePath = $post->featured_image;
            if ($request->hasFile('featured_image')) {
                // Delete old image
                if ($post->featured_image && !str_starts_with($post->featured_image, 'http')) {
                    $disk = config('filesystems.public_uploads', 'public');
                    Storage::disk($disk)->delete($post->featured_image);
                }
                $disk = config('filesystems.public_uploads', 'public');
                $imagePath = $request->file('featured_image')->store('posts', $disk);
            }

            // Generate slug if changed
            $slug = $validated['slug'] ?? Str::slug($validated['title']);
            if ($slug !== $post->slug) {
                $originalSlug = $slug;
                $counter = 1;
                while (Post::where('slug', $slug)->where('id', '!=', $post->id)->exists()) {
                    $slug = $originalSlug . '-' . $counter++;
                }
            }

            // Update post
            $post->update([
                'title' => $validated['title'],
                'slug' => $slug,
                'excerpt' => $validated['excerpt'],
                'content' => $validated['content'],
                'featured_image' => $imagePath,
                'category_id' => $validated['category_id'],
                'status' => $validated['status'],
                'published_at' => $validated['status'] === 'published' && !$post->published_at 
                    ? now() 
                    : $validated['published_at'],
                'meta' => [
                    'title' => $validated['meta_title'] ?? null,
                    'description' => $validated['meta_description'] ?? null,
                ],
            ]);

            // Sync tags
            $post->tags()->sync($validated['tags'] ?? []);

            // Update category counts if changed
            if ($oldCategoryId !== $validated['category_id']) {
                Category::where('id', $oldCategoryId)->decrement('posts_count');
                Category::where('id', $validated['category_id'])->increment('posts_count');
            }

            DB::commit();

            return redirect()->route('admin.content.index')
                ->with('success', 'Post updated successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to update post: ' . $e->getMessage()]);
        }
    }

    /**
     * Delete a post
     */
    public function destroyPost(Post $post): RedirectResponse
    {
        DB::beginTransaction();
        try {
            // Delete featured image
            if ($post->featured_image) {
                Storage::disk('public')->delete($post->featured_image);
            }

            // Decrement category count
            if ($post->category_id) {
                Category::where('id', $post->category_id)->decrement('posts_count');
            }

            // Detach tags
            $post->tags()->detach();

            // Delete post
            $post->forceDelete();

            DB::commit();

            return back()->with('success', 'Post deleted successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to delete post: ' . $e->getMessage()]);
        }
    }

    /**
     * Store a new category
     */
    public function storeCategory(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:categories,name',
            'description' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:7',
        ]);

        Category::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'],
            'color' => $validated['color'] ?? '#f97316',
            'posts_count' => 0,
        ]);

        return back()->with('success', 'Category created successfully!');
    }

    /**
     * Update a category
     */
    public function updateCategory(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:categories,name,' . $category->id,
            'description' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:7',
        ]);

        $category->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'],
            'color' => $validated['color'],
        ]);

        return back()->with('success', 'Category updated successfully!');
    }

    /**
     * Delete a category
     */
    public function destroyCategory(Category $category): RedirectResponse
    {
        if ($category->posts()->count() > 0) {
            return back()->withErrors(['message' => 'Cannot delete category with associated posts.']);
        }

        $category->delete();

        return back()->with('success', 'Category deleted successfully!');
    }

    /**
     * Store a new tag
     */
    public function storeTag(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:tags,name',
        ]);

        Tag::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'posts_count' => 0,
        ]);

        return back()->with('success', 'Tag created successfully!');
    }

    /**
     * Update a tag
     */
    public function updateTag(Request $request, Tag $tag): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:tags,name,' . $tag->id,
        ]);

        $tag->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
        ]);

        return back()->with('success', 'Tag updated successfully!');
    }

    /**
     * Delete a tag
     */
    public function destroyTag(Tag $tag): RedirectResponse
    {
        // Detach from all posts
        $tag->posts()->detach();
        $tag->delete();

        return back()->with('success', 'Tag deleted successfully!');
    }

    /**
     * Toggle post status (publish/unpublish)
     */
    public function togglePostStatus(Post $post): RedirectResponse
    {
        $newStatus = $post->status === 'published' ? 'draft' : 'published';
        
        $post->update([
            'status' => $newStatus,
            'published_at' => $newStatus === 'published' ? now() : $post->published_at,
        ]);

        return back()->with('success', 'Post status updated to ' . $newStatus);
    }

    /**
     * Get cached stats (10 min TTL)
     */
    private function getCachedStats(): array
    {
        return Cache::remember(self::CACHE_KEY_STATS, now()->addMinutes(self::STATS_TTL_MINUTES), function () {
            return [
                'total_posts' => Post::count(),
                'published_posts' => Post::where('status', 'published')->count(),
                'draft_posts' => Post::where('status', 'draft')->count(),
                'total_categories' => Category::count(),
                'total_tags' => Tag::count(),
                'total_views' => Post::sum('views_count'),
            ];
        });
    }

    /**
     * Clear stats cache
     */
    public static function clearStatsCache(): void
    {
        Cache::forget(self::CACHE_KEY_STATS);
    }
}

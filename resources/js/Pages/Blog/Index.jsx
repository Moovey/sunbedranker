import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/Components/Header';

export default function BlogIndex({ posts, categories, tags, featuredPosts, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('blog.index'), { search }, { preserveState: true });
    };

    const clearFilters = () => {
        router.get(route('blog.index'));
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const hasActiveFilters = filters.category || filters.tag || filters.search;

    return (
        <>
            <Head title="Pool & Sunbed Guides | Expert Tips & Reviews">
                <meta name="description" content="Expert guides, tips, and insights about hotel pools, sunbeds, and the best places to relax in the sun. Find your perfect pool experience." />
            </Head>

            <div className="min-h-screen bg-gray-50 font-sans">
                <Header />

                {/* Hero Section */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Pool & Sunbed Guides
                        </h1>
                        <p className="text-lg md:text-xl text-orange-100 max-w-2xl">
                            Expert tips, destination guides, and insider knowledge to help you find the perfect pool experience.
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="mt-8 max-w-xl">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search guides..."
                                    className="w-full px-5 py-3 pl-12 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-300 focus:outline-none"
                                />
                                <svg
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Active Filters */}
                            {hasActiveFilters && (
                                <div className="mb-6 flex flex-wrap items-center gap-2">
                                    <span className="text-sm text-gray-600">Filtered by:</span>
                                    {filters.category && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                                            Category: {filters.category}
                                            <Link
                                                href={route('blog.index', { tag: filters.tag, search: filters.search })}
                                                className="ml-1 hover:text-orange-600"
                                            >
                                                ×
                                            </Link>
                                        </span>
                                    )}
                                    {filters.tag && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                            Tag: {filters.tag}
                                            <Link
                                                href={route('blog.index', { category: filters.category, search: filters.search })}
                                                className="ml-1 hover:text-blue-600"
                                            >
                                                ×
                                            </Link>
                                        </span>
                                    )}
                                    {filters.search && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                                            Search: "{filters.search}"
                                            <Link
                                                href={route('blog.index', { category: filters.category, tag: filters.tag })}
                                                className="ml-1 hover:text-gray-600"
                                            >
                                                ×
                                            </Link>
                                        </span>
                                    )}
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                                    >
                                        Clear all
                                    </button>
                                </div>
                            )}

                            {/* Posts Grid */}
                            {posts.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {posts.data.map((post) => (
                                            <article
                                                key={post.id}
                                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
                                            >
                                                <Link href={route('blog.show', post.slug)}>
                                                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                                                        {post.featured_image ? (
                                                            <img
                                                                src={`/storage/${post.featured_image}`}
                                                                alt={post.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
                                                                <svg className="w-12 h-12 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>

                                                <div className="p-5">
                                                    {post.category && (
                                                        <Link
                                                            href={route('blog.index', { category: post.category.slug })}
                                                            className="inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3 transition-colors"
                                                            style={{
                                                                backgroundColor: `${post.category.color}20`,
                                                                color: post.category.color,
                                                            }}
                                                        >
                                                            {post.category.name}
                                                        </Link>
                                                    )}

                                                    <Link href={route('blog.show', post.slug)}>
                                                        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                                            {post.title}
                                                        </h2>
                                                    </Link>

                                                    {post.excerpt && (
                                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                            {post.excerpt}
                                                        </p>
                                                    )}

                                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                                        <span>{formatDate(post.published_at)}</span>
                                                        {post.views_count > 0 && (
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                                {post.views_count.toLocaleString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {posts.last_page > 1 && (
                                        <div className="mt-8 flex justify-center">
                                            <nav className="flex items-center gap-1">
                                                {posts.links.map((link, index) => (
                                                    <Link
                                                        key={index}
                                                        href={link.url || '#'}
                                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                            link.active
                                                                ? 'bg-orange-500 text-white'
                                                                : link.url
                                                                ? 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ))}
                                            </nav>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No guides found</h3>
                                    <p className="text-gray-500 mb-4">
                                        {hasActiveFilters
                                            ? 'Try adjusting your filters or search terms.'
                                            : 'Check back soon for new content!'}
                                    </p>
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                        >
                                            Clear filters
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:w-80 space-y-6">
                            {/* Categories */}
                            {categories.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                                    <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                                    <ul className="space-y-2">
                                        {categories.map((category) => (
                                            <li key={category.id}>
                                                <Link
                                                    href={route('blog.index', { category: category.slug })}
                                                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                                                        filters.category === category.slug
                                                            ? 'bg-orange-100 text-orange-700'
                                                            : 'hover:bg-gray-50 text-gray-700'
                                                    }`}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <span
                                                            className="w-2 h-2 rounded-full"
                                                            style={{ backgroundColor: category.color }}
                                                        />
                                                        {category.name}
                                                    </span>
                                                    <span className="text-xs text-gray-400">{category.posts_count}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Tags */}
                            {tags.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                                    <h3 className="font-semibold text-gray-900 mb-4">Popular Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag) => (
                                            <Link
                                                key={tag.id}
                                                href={route('blog.index', { tag: tag.slug })}
                                                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                                                    filters.tag === tag.slug
                                                        ? 'bg-orange-500 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                #{tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Popular Posts */}
                            {featuredPosts.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                                    <h3 className="font-semibold text-gray-900 mb-4">Most Popular</h3>
                                    <ul className="space-y-4">
                                        {featuredPosts.map((post, index) => (
                                            <li key={post.id}>
                                                <Link
                                                    href={route('blog.show', post.slug)}
                                                    className="flex gap-3 group"
                                                >
                                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-sm font-medium text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                                                        {index + 1}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                                            {post.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {formatDate(post.published_at)}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 mt-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center text-gray-500 text-sm">
                            © {new Date().getFullYear()} Sunbed Ranker. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

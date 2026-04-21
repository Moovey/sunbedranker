import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { useAppUrl } from '@/hooks/useAppUrl';
import SeoHead from '@/Components/SeoHead';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function BlogIndex({ posts, categories, tags, featuredPosts, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const appUrl = useAppUrl();

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
            <SeoHead
                title="Travel Guides, Pool Tips & Hotel Reviews | Sunbed Ranker Blog"
                description="Expert travel guides, destination tips, pool reviews, and insider knowledge about hotel pools, sunbeds, and the best places to relax in the sun. Updated regularly with fresh travel content."
                path="/guides"
                type="blog"
                prev={posts?.prev_page_url}
                next={posts?.next_page_url}
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Blog",
                    "name": "Sunbed Ranker Travel Blog",
                    "description": "Expert travel guides, destination tips, and hotel pool reviews.",
                    "url": `${appUrl}/guides`,
                    "publisher": {
                        "@type": "Organization",
                        "name": "Sunbed Ranker",
                        "logo": { "@type": "ImageObject", "url": `${appUrl}/images/logo.png` }
                    }
                }}
            />

            <div className="min-h-screen bg-slate-50/60 font-sans">
                <Header />

                {/* Hero Section */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                        <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-orange-100/90 mb-2 sm:mb-3">Sunbed Ranker Guides</p>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] mb-2 sm:mb-3 md:mb-4">
                            Pool & Sunbed Guides
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-100/90 max-w-2xl">
                            Expert tips, destination guides, and insider knowledge to help you find the perfect pool experience.
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="mt-5 sm:mt-6 md:mt-8 max-w-xl">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search guides..."
                                    className="w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 pl-10 sm:pl-12 rounded-lg sm:rounded-xl text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-white/20 shadow-sm focus:ring-2 focus:ring-white/60 focus:outline-none text-sm sm:text-base"
                                />
                                <svg
                                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <button
                                    type="submit"
                                    className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 px-2.5 sm:px-4 py-1 sm:py-1.5 bg-slate-900 text-white rounded-md sm:rounded-lg hover:bg-slate-800 transition-colors text-xs sm:text-sm font-semibold tracking-tight ring-1 ring-inset ring-black/[0.04]"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
                    <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 md:gap-8">
                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Active Filters */}
                            {hasActiveFilters && (
                                <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-1.5 sm:gap-2">
                                    <span className="text-xs sm:text-sm text-slate-500 font-medium">Filtered by:</span>
                                    {filters.category && (
                                        <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs sm:text-sm font-semibold ring-1 ring-inset ring-orange-200">
                                            Category: {filters.category}
                                            <Link
                                                href={route('blog.index', { tag: filters.tag, search: filters.search })}
                                                className="ml-0.5 sm:ml-1 hover:text-orange-900"
                                            >
                                                ×
                                            </Link>
                                        </span>
                                    )}
                                    {filters.tag && (
                                        <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-semibold ring-1 ring-inset ring-blue-200">
                                            Tag: {filters.tag}
                                            <Link
                                                href={route('blog.index', { category: filters.category, search: filters.search })}
                                                className="ml-0.5 sm:ml-1 hover:text-blue-900"
                                            >
                                                ×
                                            </Link>
                                        </span>
                                    )}
                                    {filters.search && (
                                        <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-slate-50 text-slate-700 rounded-full text-xs sm:text-sm font-semibold ring-1 ring-inset ring-slate-200">
                                            Search: "{filters.search}"
                                            <Link
                                                href={route('blog.index', { category: filters.category, tag: filters.tag })}
                                                className="ml-0.5 sm:ml-1 hover:text-slate-900"
                                            >
                                                ×
                                            </Link>
                                        </span>
                                    )}
                                    <button
                                        onClick={clearFilters}
                                        className="text-xs sm:text-sm text-slate-500 hover:text-slate-700 underline font-medium"
                                    >
                                        Clear all
                                    </button>
                                </div>
                            )}

                            {/* Posts Grid */}
                            {posts.data.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                                        {posts.data.map((post) => (
                                            <article
                                                key={post.id}
                                                className="bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] overflow-hidden hover:ring-slate-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_18px_36px_-18px_rgba(15,23,42,0.22)] transition-all duration-200 group"
                                            >
                                                <Link href={route('blog.show', post.slug)}>
                                                    <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                                                        {post.featured_image ? (
                                                            <img
                                                                src={post.featured_image_url}
                                                                alt={post.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
                                                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>

                                                <div className="p-3 sm:p-4 md:p-5">
                                                    {post.category && (
                                                        <Link
                                                            href={route('blog.index', { category: post.category.slug })}
                                                            className="inline-block px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3 transition-colors ring-1 ring-inset"
                                                            style={{
                                                                backgroundColor: `${post.category.color}15`,
                                                                color: post.category.color,
                                                                boxShadow: `inset 0 0 0 1px ${post.category.color}33`,
                                                            }}
                                                        >
                                                            {post.category.name}
                                                        </Link>
                                                    )}

                                                    <Link href={route('blog.show', post.slug)}>
                                                        <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                                            {post.title}
                                                        </h2>
                                                    </Link>

                                                    {post.excerpt && (
                                                        <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 leading-relaxed">
                                                            {post.excerpt}
                                                        </p>
                                                    )}

                                                    <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-500 font-medium pt-3 border-t border-slate-100">
                                                        <span className="tabular-nums">{formatDate(post.published_at)}</span>
                                                        {post.views_count > 0 && (
                                                            <span className="flex items-center gap-0.5 sm:gap-1 tabular-nums">
                                                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                        <div className="mt-6 sm:mt-8 flex justify-center">
                                            <nav className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
                                                {posts.links.map((link, index) => (
                                                    <Link
                                                        key={index}
                                                        href={link.url || '#'}
                                                        className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 ${
                                                            link.active
                                                                ? 'bg-orange-500 text-white shadow-sm ring-1 ring-inset ring-black/[0.04]'
                                                                : link.url
                                                                ? 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 ring-1 ring-slate-200 hover:ring-slate-300'
                                                                : 'bg-slate-50 text-slate-300 cursor-not-allowed ring-1 ring-slate-200/60'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ))}
                                            </nav>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-10 sm:py-12 md:py-16 bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] px-6">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-slate-50 ring-1 ring-inset ring-slate-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 mb-1.5 sm:mb-2">No guides found</h3>
                                    <p className="text-slate-500 mb-3 sm:mb-4 text-sm">
                                        {hasActiveFilters
                                            ? 'Try adjusting your filters or search terms.'
                                            : 'Check back soon for new content!'}
                                    </p>
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="inline-block px-4 sm:px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 text-sm font-semibold tracking-tight shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04]"
                                        >
                                            Clear filters
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:w-72 xl:w-80 space-y-4 sm:space-y-5 md:space-y-6">
                            {/* Categories */}
                            {categories.length > 0 && (
                                <div className="bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] p-4 sm:p-5">
                                    <h3 className="text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-3 sm:mb-4">Categories</h3>
                                    <ul className="space-y-1">
                                        {categories.map((category) => (
                                            <li key={category.id}>
                                                <Link
                                                    href={route('blog.index', { category: category.slug })}
                                                    className={`flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors text-sm font-medium ${
                                                        filters.category === category.slug
                                                            ? 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200'
                                                            : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                                                    }`}
                                                >
                                                    <span className="flex items-center gap-1.5 sm:gap-2">
                                                        <span
                                                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                                                            style={{ backgroundColor: category.color }}
                                                        />
                                                        <span className="text-xs sm:text-sm">{category.name}</span>
                                                    </span>
                                                    <span className="text-[10px] sm:text-xs text-slate-400 tabular-nums">{category.posts_count}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Tags */}
                            {tags.length > 0 && (
                                <div className="bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] p-4 sm:p-5">
                                    <h3 className="text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-3 sm:mb-4">Popular Tags</h3>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {tags.map((tag) => (
                                            <Link
                                                key={tag.id}
                                                href={route('blog.index', { tag: tag.slug })}
                                                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 ${
                                                    filters.tag === tag.slug
                                                        ? 'bg-orange-500 text-white shadow-sm ring-1 ring-inset ring-black/[0.04]'
                                                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 ring-1 ring-inset ring-slate-200'
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
                                <div className="bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] p-4 sm:p-5">
                                    <h3 className="text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-3 sm:mb-4">Most Popular</h3>
                                    <ul className="space-y-3 sm:space-y-4">
                                        {featuredPosts.map((post, index) => (
                                            <li key={post.id}>
                                                <Link
                                                    href={route('blog.show', post.slug)}
                                                    className="flex gap-2 sm:gap-3 group"
                                                >
                                                    <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-slate-50 rounded-lg text-xs sm:text-sm font-semibold text-slate-500 ring-1 ring-inset ring-slate-200 group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:ring-orange-200 transition-colors tabular-nums">
                                                        {index + 1}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-xs sm:text-sm font-semibold tracking-tight text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                                            {post.title}
                                                        </h4>
                                                        <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 tabular-nums">
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

                <Footer />
            </div>
        </>
    );
}

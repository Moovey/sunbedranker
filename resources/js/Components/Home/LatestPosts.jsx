import { Link } from '@inertiajs/react';

export default function LatestPosts({ posts }) {
    if (!posts || posts.length === 0) {
        return null;
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Pool & Sunbed Guides
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Expert tips and insights for the perfect pool experience
                        </p>
                    </div>
                    <Link
                        href={route('blog.index')}
                        className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm"
                    >
                        View all guides
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                        >
                            <Link href={route('blog.show', post.slug)}>
                                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                                    {post.featured_image ? (
                                        <img
                                            src={`/storage/${post.featured_image}`}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                                        className="inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3 transition-colors hover:opacity-80"
                                        style={{
                                            backgroundColor: `${post.category.color}20`,
                                            color: post.category.color,
                                        }}
                                    >
                                        {post.category.name}
                                    </Link>
                                )}

                                <Link href={route('blog.show', post.slug)}>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                        {post.title}
                                    </h3>
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

                {/* Mobile View All Link */}
                <div className="mt-8 text-center sm:hidden">
                    <Link
                        href={route('blog.index')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
                    >
                        View all guides
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

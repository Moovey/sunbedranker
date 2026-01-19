import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function BlogShow({ post, relatedPosts, nextPost, previousPost }) {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Simple markdown-like rendering
    const renderContent = (content) => {
        if (!content) return '';
        
        const paragraphs = content.split('\n\n').filter(p => p.trim());
        
        return paragraphs.map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
                return (
                    <h3 key={index} className="text-xl sm:text-2xl font-bold text-gray-900 mt-10 mb-4">
                        {paragraph.replace('### ', '')}
                    </h3>
                );
            }
            if (paragraph.startsWith('## ')) {
                return (
                    <h2 key={index} className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-5">
                        {paragraph.replace('## ', '')}
                    </h2>
                );
            }
            if (paragraph.startsWith('# ')) {
                return (
                    <h1 key={index} className="text-3xl sm:text-4xl font-bold text-gray-900 mt-12 mb-5">
                        {paragraph.replace('# ', '')}
                    </h1>
                );
            }
            
            if (paragraph.includes('\n- ')) {
                const items = paragraph.split('\n- ').filter(item => item.trim());
                return (
                    <ul key={index} className="list-none space-y-3 my-6">
                        {items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mt-0.5">
                                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <span className="text-gray-700 leading-relaxed">{item.replace(/^- /, '')}</span>
                            </li>
                        ))}
                    </ul>
                );
            }
            
            return (
                <p key={index} className="text-gray-700 leading-relaxed text-lg mb-6">
                    {paragraph}
                </p>
            );
        });
    };

    return (
        <>
            <Head title={post.meta?.title || post.title}>
                <meta name="description" content={post.meta?.description || post.excerpt} />
            </Head>

            <div className="min-h-screen bg-white font-sans">
                <Header />

                {/* Hero Section with Featured Image */}
                <div className="relative">
                    {post.featured_image ? (
                        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
                            <img
                                src={`/storage/${post.featured_image}`}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                            
                            {/* Hero Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
                                <div className="max-w-4xl mx-auto">
                                    {/* Breadcrumb */}
                                    <nav className="flex items-center gap-2 text-sm text-white/80 mb-4">
                                        <Link href={route('blog.index')} className="hover:text-white transition-colors">
                                            Guides
                                        </Link>
                                        <span>→</span>
                                        {post.category && (
                                            <>
                                                <Link
                                                    href={route('blog.index', { category: post.category.slug })}
                                                    className="hover:text-white transition-colors"
                                                >
                                                    {post.category.name}
                                                </Link>
                                            </>
                                        )}
                                    </nav>

                                    {/* Category Badge */}
                                    {post.category && (
                                        <Link
                                            href={route('blog.index', { category: post.category.slug })}
                                            className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-4 hover:bg-white/30 transition-colors"
                                        >
                                            {post.category.name}
                                        </Link>
                                    )}

                                    {/* Title */}
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                        {post.title}
                                    </h1>

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                                        {post.author && (
                                            <div className="flex items-center gap-2">
                                                {post.author.profile_picture ? (
                                                    <img
                                                        src={`/storage/${post.author.profile_picture}`}
                                                        alt={post.author.name}
                                                        className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold border-2 border-white/30">
                                                        {post.author.name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <span className="font-medium">{post.author.name}</span>
                                            </div>
                                        )}
                                        <span className="w-1 h-1 bg-white/50 rounded-full" />
                                        <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                                        {post.views_count > 0 && (
                                            <>
                                                <span className="w-1 h-1 bg-white/50 rounded-full" />
                                                <span className="flex items-center gap-1.5">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    {post.views_count.toLocaleString()} views
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* No Image Hero */
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20 lg:py-24">
                            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                                <nav className="flex items-center gap-2 text-sm text-white/80 mb-4">
                                    <Link href={route('blog.index')} className="hover:text-white transition-colors">
                                        Guides
                                    </Link>
                                    <span>→</span>
                                    {post.category && (
                                        <Link
                                            href={route('blog.index', { category: post.category.slug })}
                                            className="hover:text-white transition-colors"
                                        >
                                            {post.category.name}
                                        </Link>
                                    )}
                                </nav>

                                {post.category && (
                                    <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-4">
                                        {post.category.name}
                                    </span>
                                )}

                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                    {post.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                                    {post.author && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                                                {post.author.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium">{post.author.name}</span>
                                        </div>
                                    )}
                                    <span className="w-1 h-1 bg-white/50 rounded-full" />
                                    <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content Section */}
                <section className="bg-white py-12 sm:py-16 lg:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Excerpt Card */}
                        {post.excerpt && (
                            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 sm:p-8 mb-10 border-l-4 border-orange-500">
                                <p className="text-xl sm:text-2xl text-gray-800 font-medium leading-relaxed italic">
                                    {post.excerpt}
                                </p>
                            </div>
                        )}

                        {/* Article Content */}
                        <article className="prose-custom">
                            {renderContent(post.content)}
                        </article>

                        {/* Tags Section */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t-2 border-gray-100">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-gray-500 font-medium">Tags:</span>
                                    {post.tags.map((tag) => (
                                        <Link
                                            key={tag.id}
                                            href={route('blog.index', { tag: tag.slug })}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-orange-100 hover:text-orange-700 transition-all duration-300 transform hover:scale-105"
                                        >
                                            #{tag.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share Section */}
                        <div className="mt-8 pt-8 border-t-2 border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <span className="text-gray-500 font-medium">Share this guide:</span>
                                <div className="flex gap-3">
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-110"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                        </svg>
                                    </a>
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(post.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:scale-110"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            alert('Link copied to clipboard!');
                                        }}
                                        className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Post Navigation */}
                {(previousPost || nextPost) && (
                    <section className="bg-gradient-to-b from-white to-orange-50 py-12 sm:py-16">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {previousPost ? (
                                    <Link
                                        href={route('blog.show', previousPost.slug)}
                                        className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-100"
                                    >
                                        <div className="flex items-center gap-2 text-orange-500 font-semibold mb-3">
                                            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Previous Guide
                                        </div>
                                        <h4 className="font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors text-lg">
                                            {previousPost.title}
                                        </h4>
                                    </Link>
                                ) : (
                                    <div />
                                )}
                                {nextPost && (
                                    <Link
                                        href={route('blog.show', nextPost.slug)}
                                        className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-100 text-right"
                                    >
                                        <div className="flex items-center justify-end gap-2 text-orange-500 font-semibold mb-3">
                                            Next Guide
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors text-lg">
                                            {nextPost.title}
                                        </h4>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Related Posts Section */}
                {relatedPosts.length > 0 && (
                    <section className="bg-white py-12 sm:py-16 lg:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 md:mb-12 gap-4">
                                <div>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                        Related Guides
                                    </h2>
                                    <p className="text-gray-600 text-lg font-medium">
                                        More tips for your pool experience
                                    </p>
                                </div>
                                <Link 
                                    href={route('blog.index')}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                                >
                                    View all →
                                </Link>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                                {relatedPosts.map((relatedPost) => (
                                    <article
                                        key={relatedPost.id}
                                        className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-2xl shadow-lg border-2 border-gray-100 transform hover:scale-105"
                                    >
                                        <Link href={route('blog.show', relatedPost.slug)} className="block">
                                            <div className="relative overflow-hidden aspect-[16/10]">
                                                {relatedPost.featured_image ? (
                                                    <img
                                                        src={`/storage/${relatedPost.featured_image}`}
                                                        alt={relatedPost.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
                                                        <svg className="w-16 h-16 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                                
                                                {relatedPost.category && (
                                                    <div 
                                                        className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
                                                        style={{
                                                            backgroundColor: relatedPost.category.color,
                                                            color: 'white',
                                                        }}
                                                    >
                                                        {relatedPost.category.name}
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                        
                                        <div className="p-5 sm:p-6">
                                            <Link href={route('blog.show', relatedPost.slug)}>
                                                <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors text-lg mb-2">
                                                    {relatedPost.title}
                                                </h3>
                                            </Link>
                                            {relatedPost.excerpt && (
                                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                    {relatedPost.excerpt}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span>{formatDate(relatedPost.published_at)}</span>
                                                <Link 
                                                    href={route('blog.show', relatedPost.slug)}
                                                    className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
                                                >
                                                    Read more →
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="bg-gradient-to-b from-orange-50 to-white py-12 sm:py-16 md:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Ready to find your perfect pool?
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 font-medium">
                            Discover top-rated hotels with the best sunbed experiences
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/destinations"
                                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Explore Destinations
                            </Link>
                            <Link
                                href={route('blog.index')}
                                className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-gray-200"
                            >
                                More Guides
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

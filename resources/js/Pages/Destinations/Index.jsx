import { Link } from '@inertiajs/react';
import SeoHead from '@/Components/SeoHead';
import { useAppUrl } from '@/hooks/useAppUrl';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function DestinationsIndex({ destinations }) {
    const items = destinations?.data || [];
    const appUrl = useAppUrl();

    // Group paginated results by country
    const grouped = items.reduce((acc, dest) => {
        const country = dest.country || 'Other';
        if (!acc[country]) acc[country] = [];
        acc[country].push(dest);
        return acc;
    }, {});
    const countries = Object.entries(grouped);
    const { links } = destinations || {};
    const nextUrl = destinations?.next_page_url;
    const prevUrl = destinations?.prev_page_url;

    return (
        <>
            <SeoHead
                title="Travel Destinations | Best Hotel Pools & Sunbed Reviews"
                description="Explore top travel destinations with the best hotel pools and sunbed experiences. Detailed reviews, pool ratings, and expert travel tips for every destination."
                path="/destinations"
                prev={prevUrl}
                next={nextUrl}
                schema={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Travel Destinations",
                    "description": "Explore top travel destinations with the best hotel pools and sunbed experiences worldwide.",
                    "url": `${appUrl}/destinations`,
                    "publisher": {
                        "@type": "Organization",
                        "name": "Sunbed Ranker",
                        "logo": { "@type": "ImageObject", "url": `${appUrl}/images/logo.png` }
                    }
                }}
            />

            <div className="min-h-screen bg-white font-sans">
                <Header />

                {/* Hero Section */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20 lg:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            Explore Destinations
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Discover top-rated hotels with the best pool and sunbed experiences around the world
                        </p>
                    </div>
                </div>

                {/* Destinations List */}
                <section className="py-12 sm:py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {countries.length > 0 ? (
                            <div className="space-y-12">
                                {countries.map(([country, countryDestinations]) => (
                                    <div key={country}>
                                        {/* Country Header */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                                {country}
                                            </h2>
                                            <div className="flex-1 h-px bg-gray-200" />
                                            <span className="text-sm text-gray-500 font-medium">
                                                {countryDestinations.length} {countryDestinations.length === 1 ? 'destination' : 'destinations'}
                                            </span>
                                        </div>

                                        {/* Destinations Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {countryDestinations.map((destination) => (
                                                <Link
                                                    key={destination.id}
                                                    href={`/destinations/${destination.slug}`}
                                                    className="group bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:scale-105"
                                                >
                                                    {/* Image */}
                                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                                        <img
                                                            src={destination.image ? (destination.image.startsWith('http') ? destination.image : `/storage/${destination.image}`) : '/images/default-destination.svg'}
                                                            alt={destination.name}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                                        
                                                        {/* Hotel Count Badge */}
                                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-gray-900 shadow-lg">
                                                            {destination.active_hotels_count || 0} {destination.active_hotels_count === 1 ? 'hotel' : 'hotels'}
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-5">
                                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
                                                            {destination.name}
                                                        </h3>
                                                        {destination.description && (
                                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                                {destination.description}
                                                            </p>
                                                        )}
                                                        <div className="mt-4 flex items-center text-orange-500 font-semibold text-sm">
                                                            Explore hotels
                                                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-20">
                                <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No destinations yet</h3>
                                <p className="text-gray-600 mb-6">
                                    Check back soon for exciting new destinations!
                                </p>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Home
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-b from-orange-50 to-white py-12 sm:py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Can't find your destination?
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 font-medium">
                            We're constantly adding new destinations. Let us know where you'd like to see next!
                        </p>
                        <Link
                            href="/"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
                        >
                            Back to Home
                        </Link>
                    </div>
                </section>

                {/* Pagination */}
                {links && links.length > 3 && (
                    <div className="py-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <nav className="flex items-center justify-center gap-1">
                                {links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-orange-500 text-white'
                                                : link.url
                                                    ? 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                                                    : 'text-gray-300 cursor-not-allowed'
                                        }`}
                                        preserveScroll
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </>
    );
}

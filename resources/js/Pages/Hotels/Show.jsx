import { Link, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/Components/Header';

export default function HotelShow({ hotel, similarHotels }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const handleBookingClick = (type) => {
        router.get(`/hotels/${hotel.slug}/click?type=${type}`);
    };

    // Get all images (main + gallery)
    const allImages = [
        hotel.main_image_url,
        ...(hotel.gallery_images_urls || [])
    ].filter(Boolean);

    return (
        <>
            <Head title={`${hotel.name} - Pool & Sunbed Review`} />
            
            <div className="min-h-screen bg-neutral-50">
                <Header />
                
                {/* Breadcrumb */}
                <div className="bg-white border-b border-neutral-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3 sm:py-4 lg:py-5">
                        <div className="text-xs sm:text-sm lg:text-base text-neutral-600 font-sans-luxury flex items-center flex-wrap gap-2">
                            <Link href="/" className="hover:text-neutral-900 transition-colors duration-300">Home</Link>
                            <svg className="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <Link href={`/destinations/${hotel.destination.slug}`} className="hover:text-neutral-900 transition-colors duration-300">
                                {hotel.destination.name}
                            </Link>
                            <svg className="w-3 h-3 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-neutral-900 font-medium">{hotel.name}</span>
                        </div>
                    </div>
                </div>

                {/* Above the Fold - Hero Section */}
                <div className="bg-white border-b border-neutral-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8 lg:py-10 xl:py-12">
                        {/* Hotel Header */}
                        <div className="mb-6 sm:mb-8 lg:mb-10">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif-luxury font-semibold text-neutral-900 mb-3 sm:mb-4 lg:mb-5 xl:mb-6">{hotel.name}</h1>
                            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 flex-wrap">
                                {hotel.star_rating && (
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-0.5">
                                            {[...Array(hotel.star_rating)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-amber-400 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-neutral-600 font-sans-luxury text-sm sm:text-base lg:text-lg xl:text-xl">{hotel.star_rating} Star Hotel</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-neutral-700 font-sans-luxury text-sm sm:text-base lg:text-lg xl:text-xl">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{hotel.destination.name}</span>
                                </div>
                                {hotel.subscription_tier === 'premium' && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs sm:text-sm lg:text-base font-sans-luxury font-medium">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Verified
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Hero Grid: Image + Map + Score */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 xl:gap-8 mb-6 sm:mb-8 lg:mb-10">
                            {/* Main Pool Image */}
                            <div className="lg:col-span-2">
                                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] 2xl:h-[36rem] rounded-xl overflow-hidden shadow-2xl">
                                    <img
                                        src={allImages[activeImageIndex] || '/images/default-hotel.jpg'}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {allImages.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => setActiveImageIndex((prev) => prev === 0 ? allImages.length - 1 : prev - 1)}
                                                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-all duration-300"
                                            >
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => setActiveImageIndex((prev) => (prev + 1) % allImages.length)}
                                                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-all duration-300"
                                            >
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/60 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-sans-luxury backdrop-blur-sm">
                                                {activeImageIndex + 1} / {allImages.length}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Map & Score Column */}
                            <div className="space-y-4">
                                {/* Google Map */}
                                {hotel.latitude && hotel.longitude && (
                                    <div className="h-40 sm:h-48 lg:h-52 xl:h-56 2xl:h-64 rounded-xl overflow-hidden shadow-lg">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            style={{ border: 0 }}
                                            src={`https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${hotel.latitude},${hotel.longitude}&zoom=16&maptype=satellite`}
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}

                                {/* Overall Score Card */}
                                {hotel.overall_score && (
                                    <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-xl shadow-2xl p-5 sm:p-6 lg:p-7 xl:p-8 text-white">
                                        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-serif-luxury font-semibold mb-3 lg:mb-4">Pool & Sun Score</h3>
                                        <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif-luxury font-bold mb-4 lg:mb-5">{hotel.overall_score}<span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-neutral-300">/10</span></div>
                                        <div className="space-y-2 lg:space-y-3">
                                            {hotel.family_score && (
                                                <div className="flex justify-between text-xs sm:text-sm lg:text-base xl:text-lg font-sans-luxury">
                                                    <span className="text-neutral-300">Family</span>
                                                    <span className="font-semibold">{hotel.family_score}/10</span>
                                                </div>
                                            )}
                                            {hotel.quiet_score && (
                                                <div className="flex justify-between text-xs sm:text-sm font-sans-luxury">
                                                    <span className="text-neutral-300">Quiet Sun</span>
                                                    <span className="font-semibold">{hotel.quiet_score}/10</span>
                                                </div>
                                            )}
                                            {hotel.party_score && (
                                                <div className="flex justify-between text-xs sm:text-sm font-sans-luxury">
                                                    <span className="text-neutral-300">Party Vibe</span>
                                                    <span className="font-semibold">{hotel.party_score}/10</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-5 sm:space-y-6 lg:space-y-7 xl:space-y-8">
                            
                            {/* Pool Details - Metrics Table */}
                            {hotel.pool_criteria && (
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif-luxury font-semibold text-neutral-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Pool Details
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
                                        {/* Sunbed Info */}
                                        {hotel.pool_criteria.sunbed_to_guest_ratio && (
                                            <MetricCard
                                                icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 15l3-3m0 0l3 3m-3-3v12M21 9l-3 3m0 0l-3-3m3 3V3M12 3h.01M12 21h.01" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                label="Sunbed Availability"
                                                value={`${hotel.pool_criteria.sunbed_to_guest_ratio}:1 ratio`}
                                                description={getSunbedRatioText(hotel.pool_criteria.sunbed_to_guest_ratio)}
                                                highlight={hotel.pool_criteria.sunbed_to_guest_ratio >= 0.75}
                                            />
                                        )}

                                        {/* Sun Exposure */}
                                        {hotel.pool_criteria.sun_exposure && (
                                            <MetricCard
                                                icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                label="Sun Exposure"
                                                value={formatSunExposure(hotel.pool_criteria.sun_exposure)}
                                                description={getSunExposureDescription(hotel.pool_criteria.sun_exposure)}
                                            />
                                        )}

                                        {/* Number of Pools */}
                                        <MetricCard
                                            icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                            label="Number of Pools"
                                            value={hotel.pool_criteria.number_of_pools || 1}
                                        />

                                        {/* Pool Size */}
                                        {hotel.pool_criteria.pool_size_sqm && (
                                            <MetricCard
                                                icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                label="Total Pool Size"
                                                value={`${hotel.pool_criteria.pool_size_sqm} m²`}
                                            />
                                        )}

                                        {/* Pool Depth */}
                                        {hotel.pool_criteria.max_depth_m && (
                                            <MetricCard
                                                icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                label="Maximum Depth"
                                                value={`${hotel.pool_criteria.max_depth_m} meters`}
                                            />
                                        )}

                                        {/* Shade Availability */}
                                        {hotel.pool_criteria.has_shade_areas && (
                                            <MetricCard
                                                icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                label="Shade Options"
                                                value="Available"
                                                description="Natural and artificial shade areas"
                                            />
                                        )}
                                    </div>

                                    {/* Special Pool Features */}
                                    {hasPoolFeatures(hotel.pool_criteria) && (
                                        <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-neutral-200">
                                            <h3 className="font-serif-luxury font-semibold text-neutral-900 mb-4 text-base sm:text-lg">Special Features</h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                                                {hotel.pool_criteria.has_infinity_pool && (
                                                    <FeatureBadge 
                                                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>} 
                                                        text="Infinity Pool" 
                                                        color="bg-sky-50 text-sky-800 border border-sky-200" 
                                                    />
                                                )}
                                                {hotel.pool_criteria.has_rooftop_pool && (
                                                    <FeatureBadge 
                                                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>} 
                                                        text="Rooftop Pool" 
                                                        color="bg-purple-50 text-purple-800 border border-purple-200" 
                                                    />
                                                )}
                                                {hotel.pool_criteria.has_heated_pool && (
                                                    <FeatureBadge 
                                                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>} 
                                                        text="Heated Pool" 
                                                        color="bg-orange-50 text-orange-800 border border-orange-200" 
                                                    />
                                                )}
                                                {hotel.pool_criteria.has_pool_bar && (
                                                    <FeatureBadge 
                                                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.707 2.707 0 003 15.546M12 6.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 3v2.25m0 0l2.25 9.75H9.75L12 5.25z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>} 
                                                        text="Pool Bar" 
                                                        color="bg-emerald-50 text-emerald-800 border border-emerald-200" 
                                                    />
                                                )}
                                                {hotel.pool_criteria.has_lazy_river && (
                                                    <FeatureBadge 
                                                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>} 
                                                        text="Lazy River" 
                                                        color="bg-cyan-50 text-cyan-800 border border-cyan-200" 
                                                    />
                                                )}
                                                {hotel.pool_criteria.has_swim_up_bar && (
                                                    <FeatureBadge 
                                                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 8h6m-5 0a3 3 0 110 6H9l3 7-3-7m1 0h6m-6 0L7 21m5-5h6m2 0l-2-5-2 5m2 0h2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>} 
                                                        text="Swim-up Bar" 
                                                        color="bg-teal-50 text-teal-800 border border-teal-200" 
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* New Pool & Features Sections */}
                            {hotel.pool_criteria?.pool_overview && hotel.pool_criteria.pool_overview.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif-luxury font-semibold text-neutral-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Pool & Sun Overview
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                        {hotel.pool_criteria.pool_overview.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                                                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-light text-neutral-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hotel.pool_criteria?.pool_details && hotel.pool_criteria.pool_details.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif-luxury font-semibold text-neutral-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Pool Types & Details
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                        {hotel.pool_criteria.pool_details.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-light text-neutral-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hotel.pool_criteria?.shade_options && hotel.pool_criteria.shade_options.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif-luxury font-semibold text-neutral-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Shade Options
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                        {hotel.pool_criteria.shade_options.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                                <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-light text-neutral-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hotel.pool_criteria?.special_features_list && hotel.pool_criteria.special_features_list.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif-luxury font-semibold text-neutral-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Special Features
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                        {hotel.pool_criteria.special_features_list.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                                <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-light text-neutral-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hotel.pool_criteria?.atmosphere_vibe && hotel.pool_criteria.atmosphere_vibe.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif-luxury font-semibold text-neutral-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Pool Atmosphere & Vibe
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                        {hotel.pool_criteria.atmosphere_vibe.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-pink-50 rounded-lg border border-pink-200">
                                                <svg className="w-4 h-4 text-pink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-light text-neutral-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hotel.pool_criteria?.family_features && hotel.pool_criteria.family_features.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif-luxury font-semibold text-neutral-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Family Friendliness
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                        {hotel.pool_criteria.family_features.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-light text-neutral-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hotel.pool_criteria && (hotel.pool_criteria.has_kids_pool || hotel.pool_criteria.has_splash_area || hotel.pool_criteria.has_lifeguard) && (
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif-luxury font-semibold text-neutral-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Family Features
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {hotel.pool_criteria.has_kids_pool && (
                                            <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-lg border border-sky-100">
                                                <svg className="w-7 h-7 text-sky-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div>
                                                    <h4 className="font-serif-luxury font-semibold text-neutral-900 mb-1 text-sm sm:text-base">Kids Pool</h4>
                                                    <p className="text-xs sm:text-sm text-neutral-600 font-sans-luxury">Dedicated shallow pool area for children</p>
                                                </div>
                                            </div>
                                        )}

                                        {hotel.pool_criteria.has_splash_area && (
                                            <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-lg border border-sky-100">
                                                <svg className="w-7 h-7 text-sky-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div>
                                                    <h4 className="font-serif-luxury font-semibold text-neutral-900 mb-1 text-sm sm:text-base">Splash Area</h4>
                                                    <p className="text-xs sm:text-sm text-neutral-600 font-sans-luxury">Water play area with fountains and slides</p>
                                                </div>
                                            </div>
                                        )}

                                        {hotel.pool_criteria.has_lifeguard && (
                                            <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                                                <svg className="w-7 h-7 text-emerald-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div>
                                                    <h4 className="font-serif-luxury font-semibold text-neutral-900 mb-1 text-sm sm:text-base">Lifeguard on Duty</h4>
                                                    <p className="text-xs sm:text-sm text-neutral-600 font-sans-luxury">Professional supervision for safety</p>
                                                </div>
                                            </div>
                                        )}

                                        {hotel.pool_criteria.has_waterslide && (
                                            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                                                <svg className="w-7 h-7 text-purple-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div>
                                                    <h4 className="font-serif-luxury font-semibold text-neutral-900 mb-1 text-sm sm:text-base">Water Slides</h4>
                                                    <p className="text-xs sm:text-sm text-neutral-600 font-sans-luxury">Fun slides for all ages</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Gallery */}
                            {allImages.length > 1 && (
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif-luxury font-semibold text-neutral-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Photo Gallery
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
                                        {allImages.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setActiveImageIndex(index);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className="relative h-32 sm:h-40 lg:h-44 xl:h-48 2xl:h-52 rounded-lg overflow-hidden hover:opacity-75 transition-all duration-300 group"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${hotel.name} - ${index + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {index === activeImageIndex && (
                                                    <div className="absolute inset-0 border-4 border-neutral-900 rounded-lg"></div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Enhanced Profile Content */}
                            {(hotel.subscription_tier === 'enhanced' || hotel.subscription_tier === 'premium') && (
                                <>
                                    {/* Description */}
                                    {hotel.description && (
                                        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6">
                                            <h2 className="text-xl sm:text-2xl font-serif-luxury font-semibold text-neutral-900 mb-4">About This Hotel</h2>
                                            <div className="prose max-w-none text-neutral-700 font-sans-luxury text-sm sm:text-base">
                                                {hotel.description}
                                            </div>
                                        </div>
                                    )}

                                    {/* FAQs - Placeholder for future implementation */}
                                    <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 border-2 border-neutral-200 rounded-xl p-5 sm:p-6">
                                        <h3 className="text-base sm:text-lg font-serif-luxury font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Enhanced Profile
                                        </h3>
                                        <p className="text-neutral-600 font-sans-luxury text-xs sm:text-sm">This hotel has an enhanced profile with additional exclusive content, special offers, and verified information.</p>
                                    </div>
                                </>
                            )}

                            {/* Reviews */}
                            {hotel.approved_reviews && hotel.approved_reviews.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif-luxury font-semibold text-neutral-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8">Guest Reviews</h2>
                                    <div className="space-y-5 sm:space-y-6">
                                        {hotel.approved_reviews.map((review) => (
                                            <div key={review.id} className="border-b last:border-0 border-neutral-200 pb-5 sm:pb-6 last:pb-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="font-serif-luxury font-semibold text-neutral-900 text-sm sm:text-base">{review.user.name}</div>
                                                    <div className="flex gap-0.5">
                                                        {[...Array(review.overall_rating)].map((_, i) => (
                                                            <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                                {review.title && (
                                                    <h4 className="font-sans-luxury font-semibold text-neutral-800 mb-1 text-sm sm:text-base">{review.title}</h4>
                                                )}
                                                <p className="text-neutral-700 font-sans-luxury text-xs sm:text-sm mb-2">{review.content}</p>
                                                <div className="text-xs sm:text-sm text-neutral-500 font-sans-luxury">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-4 lg:top-6 xl:top-8 space-y-5 sm:space-y-6 lg:space-y-7 xl:space-y-8">
                                {/* Booking Card */}
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-serif-luxury font-semibold text-neutral-900 mb-4 lg:mb-5 xl:mb-6 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Check Prices & Book
                                    </h3>
                                    
                                    <div className="space-y-2 sm:space-y-3">
                                        {hotel.booking_affiliate_url && (
                                            <button
                                                onClick={() => handleBookingClick('booking')}
                                                className="w-full px-4 py-2.5 sm:py-3 lg:py-3.5 xl:py-4 bg-neutral-900 text-white font-sans-luxury font-semibold rounded-lg hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg xl:text-xl"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M3 21h18M9 8h6M9 8V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3M9 8H5a2 2 0 0 0-2 2v11M15 8h4a2 2 0 0 1 2 2v11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Check Booking.com
                                            </button>
                                        )}
                                        {hotel.expedia_affiliate_url && (
                                            <button
                                                onClick={() => handleBookingClick('expedia')}
                                                className="w-full px-4 py-2.5 sm:py-3 bg-amber-500 text-white font-sans-luxury font-semibold rounded-lg hover:bg-amber-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Check Expedia
                                            </button>
                                        )}
                                        {hotel.direct_booking_url && (
                                            <button
                                                onClick={() => handleBookingClick('direct')}
                                                className="w-full px-4 py-2.5 sm:py-3 bg-neutral-700 text-white font-sans-luxury font-semibold rounded-lg hover:bg-neutral-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Visit Hotel Website
                                            </button>
                                        )}
                                    </div>

                                    <div className="mt-4 text-[10px] sm:text-xs text-neutral-500 text-center font-sans-luxury">
                                        We may earn a commission from bookings made through these links
                                    </div>
                                </div>

                                {/* Promotional Banner for Premium Hotels */}
                                {hotel.subscription_tier === 'premium' && (
                                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg p-5 sm:p-6 text-white">
                                        <div className="text-center">
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            <h3 className="text-lg sm:text-xl font-serif-luxury font-bold mb-2">Special Offer!</h3>
                                            <p className="text-xs sm:text-sm mb-4 opacity-90 font-sans-luxury">Book directly and receive exclusive benefits</p>
                                            <button
                                                onClick={() => handleBookingClick('direct')}
                                                className="w-full px-4 py-2 bg-white text-orange-600 font-sans-luxury font-semibold rounded-lg hover:bg-neutral-50 transition-all duration-300 shadow-md text-sm"
                                            >
                                                View Offers
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Verification Badge */}
                                {hotel.subscription_tier === 'premium' && (
                                    <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-emerald-200">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div>
                                                <h4 className="font-serif-luxury font-semibold text-neutral-900 text-sm sm:text-base">Verified Profile</h4>
                                                <p className="text-xs sm:text-sm text-neutral-600 font-sans-luxury">Information verified and regularly updated by hotel staff</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Quick Stats */}
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-serif-luxury font-semibold text-neutral-900 mb-4 lg:mb-5 xl:mb-6">Quick Info</h3>
                                    <div className="space-y-3">
                                        {hotel.total_rooms && (
                                            <div className="flex justify-between text-xs sm:text-sm font-sans-luxury">
                                                <span className="text-neutral-600">Rooms:</span>
                                                <span className="font-semibold text-neutral-900">{hotel.total_rooms}</span>
                                            </div>
                                        )}
                                        {hotel.pool_criteria?.number_of_pools && (
                                            <div className="flex justify-between text-xs sm:text-sm font-sans-luxury">
                                                <span className="text-neutral-600">Pools:</span>
                                                <span className="font-semibold text-neutral-900">{hotel.pool_criteria.number_of_pools}</span>
                                            </div>
                                        )}
                                        {hotel.view_count > 0 && (
                                            <div className="flex justify-between text-xs sm:text-sm font-sans-luxury">
                                                <span className="text-neutral-600">Profile Views:</span>
                                                <span className="font-semibold text-neutral-900">{hotel.view_count}</span>
                                            </div>
                                        )}
                                        {hotel.review_count > 0 && (
                                            <div className="flex justify-between text-xs sm:text-sm font-sans-luxury">
                                                <span className="text-neutral-600">Reviews:</span>
                                                <span className="font-semibold text-neutral-900">{hotel.review_count}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-serif-luxury font-semibold text-neutral-900 mb-4 lg:mb-5 xl:mb-6">Contact</h3>
                                    <div className="space-y-3 text-xs sm:text-sm text-neutral-700 font-sans-luxury">
                                        {hotel.address && (
                                            <div className="flex items-start gap-2">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div>
                                                    <div className="font-medium text-neutral-900 mb-1">Address</div>
                                                    {hotel.address}
                                                </div>
                                            </div>
                                        )}
                                        {hotel.phone && (
                                            <div className="flex items-start gap-2">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <div>
                                                    <div className="font-medium text-neutral-900 mb-1">Phone</div>
                                                    <a href={`tel:${hotel.phone}`} className="text-neutral-900 hover:text-neutral-700 transition-colors duration-300">{hotel.phone}</a>
                                                </div>
                                            </div>
                                        )}
                                        {hotel.email && (
                                            <div className="flex items-start gap-2">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <div>
                                                    <div className="font-medium text-neutral-900 mb-1">Email</div>
                                                    <a href={`mailto:${hotel.email}`} className="text-neutral-900 hover:text-neutral-700 break-all transition-colors duration-300">
                                                        {hotel.email}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Similar Hotels */}
                    {similarHotels && similarHotels.length > 0 && (
                        <div className="mt-10 sm:mt-12 lg:mt-14 xl:mt-16">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-serif-luxury font-semibold text-neutral-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8">Similar Hotels in {hotel.destination.name}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
                                {similarHotels.map((similar) => (
                                    <SimilarHotelCard key={similar.id} hotel={similar} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// Helper Components
function MetricCard({ icon, label, value, description, highlight }) {
    return (
        <div className={`p-4 sm:p-5 lg:p-6 xl:p-7 rounded-xl border-2 transition-all duration-300 ${
            highlight ? 'border-emerald-300 bg-emerald-50' : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
        }`}>
            <div className="flex items-start gap-3 lg:gap-4">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl flex-shrink-0">{icon}</div>
                <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm lg:text-base xl:text-lg text-neutral-600 mb-1 font-sans-luxury">{label}</div>
                    <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-serif-luxury font-semibold text-neutral-900 truncate">{value}</div>
                    {description && (
                        <div className="text-xs sm:text-sm lg:text-base text-neutral-600 mt-1 font-sans-luxury">{description}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

function FeatureBadge({ icon, text, color }) {
    return (
        <div className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-lg ${color} transition-all duration-300 hover:scale-105`}>
            <span className="text-base sm:text-lg flex-shrink-0">{icon}</span>
            <span className="text-xs sm:text-sm font-sans-luxury font-medium">{text}</span>
        </div>
    );
}

function ScoreBadge({ label, score }) {
    return (
        <div className="text-center">
            <div className="text-2xl font-serif-luxury font-bold text-neutral-800">{score}</div>
            <div className="text-xs text-neutral-600 font-sans-luxury">{label}</div>
        </div>
    );
}

function DetailItem({ icon, label, value, description }) {
    return (
        <div className="flex items-start">
            <div className="text-2xl mr-3">{icon}</div>
            <div>
                <div className="text-sm text-neutral-600 font-sans-luxury">{label}</div>
                <div className="font-serif-luxury font-semibold text-neutral-900">{value}</div>
                {description && (
                    <div className="text-xs text-neutral-500 mt-1 font-sans-luxury">{description}</div>
                )}
            </div>
        </div>
    );
}

function Badge({ children, color = 'blue' }) {
    const colors = {
        blue: 'bg-blue-100 text-blue-800',
        purple: 'bg-purple-100 text-purple-800',
        green: 'bg-green-100 text-green-800',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[color]}`}>
            {children}
        </span>
    );
}

function SimilarHotelCard({ hotel }) {
    return (
        <Link href={`/hotels/${hotel.slug}`} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
            <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                    src={hotel.main_image_url || '/images/default-hotel.jpg'}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-4">
                <h3 className="font-serif-luxury font-semibold text-neutral-900 mb-2 text-sm sm:text-base line-clamp-2">{hotel.name}</h3>
                {hotel.overall_score && (
                    <div className="inline-block px-3 py-1 bg-neutral-900 text-white rounded-lg font-sans-luxury font-semibold text-xs sm:text-sm">
                        {hotel.overall_score}/10
                    </div>
                )}
            </div>
        </Link>
    );
}

// Helper Functions
function getSunbedRatioText(ratio) {
    if (ratio >= 1.0) return 'Excellent - plenty of sunbeds';
    if (ratio >= 0.75) return 'Very good - usually available';
    if (ratio >= 0.5) return 'Good - may need to arrive early';
    if (ratio >= 0.33) return 'Average - expect competition';
    return 'Limited - arrive very early';
}

function getSunBadges(poolCriteria) {
    const badges = [];
    
    if (poolCriteria.sun_exposure === 'all_day') {
        badges.push({ icon: '☀️', text: 'Sun all day', color: 'bg-amber-100 text-amber-800' });
    } else if (poolCriteria.sun_exposure === 'afternoon_only') {
        badges.push({ icon: '🌅', text: 'Sun all afternoon', color: 'bg-orange-100 text-orange-800' });
    } else if (poolCriteria.sun_exposure === 'morning_only') {
        badges.push({ icon: '🌄', text: 'Morning sun', color: 'bg-blue-100 text-blue-800' });
    }
    
    if (poolCriteria.sunbed_to_guest_ratio >= 0.75) {
        badges.push({ icon: '🏖️', text: 'High sunbed availability', color: 'bg-emerald-100 text-emerald-800' });
    }
    
    if (poolCriteria.has_shade_areas) {
        badges.push({ icon: '🌴', text: 'Plenty of shade', color: 'bg-teal-100 text-teal-800' });
    }
    
    if (poolCriteria.has_infinity_pool) {
        badges.push({ icon: '∞', text: 'Infinity pool', color: 'bg-cyan-100 text-cyan-800' });
    }
    
    if (poolCriteria.is_adults_only) {
        badges.push({ icon: '🍸', text: 'Adults only', color: 'bg-purple-100 text-purple-800' });
    }
    
    if (poolCriteria.noise_level === 'quiet') {
        badges.push({ icon: '🤫', text: 'Peaceful atmosphere', color: 'bg-indigo-100 text-indigo-800' });
    }
    
    return badges;
}

function formatSunExposure(exposure) {
    const map = {
        'all_day': 'All Day Sun',
        'afternoon_only': 'Afternoon Only',
        'morning_only': 'Morning Only',
        'partial_shade': 'Partial Shade',
        'mostly_shaded': 'Mostly Shaded'
    };
    return map[exposure] || exposure;
}

function getSunExposureDescription(exposure) {
    const map = {
        'all_day': 'Pool area receives sunshine throughout the day',
        'afternoon_only': 'Best sun from noon onwards',
        'morning_only': 'Morning sunshine, shaded in afternoon',
        'partial_shade': 'Mix of sun and shade throughout the day',
        'mostly_shaded': 'Limited direct sunlight'
    };
    return map[exposure] || '';
}

function getAtmosphereIcon(atmosphere) {
    const icons = {
        'lively': '🎉',
        'relaxed': '😌',
        'quiet': '🧘',
        'family': '👨‍👩‍👧‍👦',
        'romantic': '💑',
        'party': '🎊'
    };
    return icons[atmosphere] || '🏊';
}

function getAtmosphereDescription(atmosphere) {
    const descriptions = {
        'lively': 'Energetic and social pool environment',
        'relaxed': 'Calm and laid-back atmosphere',
        'quiet': 'Peaceful and tranquil setting',
        'family': 'Friendly environment for all ages',
        'romantic': 'Intimate and serene ambiance',
        'party': 'Fun and festive pool scene'
    };
    return descriptions[atmosphere] || '';
}

function getNoiseDescription(level) {
    const descriptions = {
        'quiet': 'Minimal noise, peaceful environment',
        'moderate': 'Some background activity and conversation',
        'lively': 'Active atmosphere with music and socializing',
        'loud': 'High energy with music and entertainment'
    };
    return descriptions[level] || '';
}

function hasPoolFeatures(poolCriteria) {
    return poolCriteria.has_infinity_pool || 
           poolCriteria.has_rooftop_pool || 
           poolCriteria.has_heated_pool || 
           poolCriteria.has_pool_bar || 
           poolCriteria.has_lazy_river || 
           poolCriteria.has_swim_up_bar;
}

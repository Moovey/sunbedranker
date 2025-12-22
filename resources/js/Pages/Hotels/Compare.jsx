import { Link, Head } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function HotelCompare({ hotels, auth }) {
    if (!hotels || hotels.length === 0) {
        return (
            <>
                <Head title="Compare Hotels" />
                <div className="min-h-screen bg-neutral-50">
                    <Header />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
                        <div className="text-center max-w-2xl mx-auto">
                            <div className="mb-6 sm:mb-8">
                                <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
                                    <path d="M21 21l-4.35-4.35" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif-luxury font-semibold text-neutral-900 mb-3 sm:mb-4 px-4">No Hotels Selected</h2>
                            <p className="text-sm sm:text-base md:text-lg text-neutral-600 mb-8 sm:mb-10 md:mb-12 font-sans-luxury px-4">
                                Select 2-4 hotels to compare their pool and sunbed features
                            </p>
                            <Link
                                href="/"
                                className="inline-block px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 bg-neutral-900 text-white font-sans-luxury font-medium rounded-lg hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                            >
                                Start Searching
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Compare Hotels - Pool & Sunbed Features" />
            
            <div className="min-h-screen bg-neutral-50">
                <Header />
                
                {/* Header */}
                <div className="bg-white border-b border-neutral-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                            <div className="w-full sm:w-auto">
                                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif-luxury font-semibold text-neutral-900">Compare Hotels</h1>
                                <p className="text-xs sm:text-sm md:text-base text-neutral-600 mt-1 sm:mt-2 font-sans-luxury">Side-by-side comparison of pool & sunbed features</p>
                            </div>
                            <Link
                                href="/"
                                className="w-full sm:w-auto text-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-all duration-300 font-sans-luxury text-xs sm:text-sm font-medium text-neutral-700 whitespace-nowrap"
                            >
                                ← Back to Search
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16">
                    {/* Mobile Scroll Hint */}
                    <div className="md:hidden mb-4 text-center">
                        <p className="text-xs text-neutral-500 font-sans-luxury flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Scroll horizontally to view all hotels
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </p>
                    </div>
                    
                    {/* Comparison Table */}
                    <div className="bg-white rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl overflow-hidden">
                        <div className="overflow-x-auto overflow-y-visible scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100">
                            <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b-2 border-neutral-200">
                                    <th className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 text-left font-serif-luxury font-semibold text-neutral-900 bg-neutral-50 sticky left-0 z-10 text-xs sm:text-sm md:text-base shadow-sm">
                                        Feature
                                    </th>
                                    {hotels.map((hotel) => (
                                        <th key={hotel.id} className="p-3 sm:p-4 md:p-5 lg:p-6 text-center min-w-[220px] sm:min-w-[250px] md:min-w-[280px] lg:min-w-[300px]">
                                            <div className="space-y-2 sm:space-y-3">
                                                <div className="overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg">
                                                    <img
                                                        src={hotel.main_image || '/images/default-hotel.jpg'}
                                                        alt={hotel.name}
                                                        className="w-full h-28 sm:h-32 md:h-36 lg:h-40 xl:h-44 object-cover transform hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <Link
                                                    href={`/hotels/${hotel.slug}`}
                                                    className="font-serif-luxury font-semibold text-sm sm:text-base md:text-lg text-neutral-900 hover:text-neutral-700 block transition-colors duration-300 px-2"
                                                >
                                                    {hotel.name}
                                                </Link>
                                                {hotel.star_rating && (
                                                    <div className="flex justify-center gap-0.5 sm:gap-1">
                                                        {[...Array(hotel.star_rating)].map((_, i) => (
                                                            <svg key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="text-[10px] sm:text-xs md:text-sm text-neutral-600 font-sans-luxury px-2">{hotel.destination?.name}</div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Overall Score */}
                                <ComparisonRow
                                    label="Overall Pool & Sun Score"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.overall_score}
                                    formatValue={(value) => value ? `${value}/10` : '-'}
                                    highlightBest={true}
                                />

                                {/* Family Score */}
                                <ComparisonRow
                                    label="Family Score"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.family_score}
                                    formatValue={(value) => value ? `${value}/10` : '-'}
                                    highlightBest={true}
                                />

                                {/* Quiet Score */}
                                <ComparisonRow
                                    label="Quiet Sun Score"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.quiet_score}
                                    formatValue={(value) => value ? `${value}/10` : '-'}
                                    highlightBest={true}
                                />

                                {/* Party Score */}
                                <ComparisonRow
                                    label="Party Vibe Score"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0zM17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.party_score}
                                    formatValue={(value) => value ? `${value}/10` : '-'}
                                    highlightBest={true}
                                />

                                {/* Section Header - Pool Metrics */}
                                <tr className="bg-neutral-100">
                                    <td colSpan={hotels.length + 1} className="p-3 sm:p-4 font-serif-luxury font-semibold text-neutral-900">
                                        Pool Metrics
                                    </td>
                                </tr>

                                {/* Sunbed Ratio */}
                                <ComparisonRow
                                    label="Sunbed to Guest Ratio"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2" strokeWidth="1.5" /><path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.sunbed_to_guest_ratio}
                                    formatValue={(value) => value ? `${value}:1` : '-'}
                                    highlightBest={true}
                                />

                                {/* Number of Pools */}
                                <ComparisonRow
                                    label="Number of Pools"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M2 15c1.67-2.67 3.67-4 6-4s4.33 1.33 6 4c1.67-2.67 3.67-4 6-4s4.33 1.33 6 4M2 21c1.67-2.67 3.67-4 6-4s4.33 1.33 6 4c1.67-2.67 3.67-4 6-4s4.33 1.33 6 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.number_of_pools}
                                    formatValue={(value) => value || '-'}
                                    highlightBest={true}
                                />

                                {/* Pool Size */}
                                <ComparisonRow
                                    label="Total Pool Size"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeWidth="1.5" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><line x1="12" y1="22.08" x2="12" y2="12" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.pool_size_sqm}
                                    formatValue={(value) => value ? `${value} m²` : '-'}
                                    highlightBest={true}
                                />

                                {/* Sun Exposure */}
                                <ComparisonRow
                                    label="Sun Exposure"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" strokeWidth="1.5" /><line x1="12" y1="1" x2="12" y2="3" strokeWidth="1.5" strokeLinecap="round" /><line x1="12" y1="21" x2="12" y2="23" strokeWidth="1.5" strokeLinecap="round" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="1.5" strokeLinecap="round" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="1.5" strokeLinecap="round" /><line x1="1" y1="12" x2="3" y2="12" strokeWidth="1.5" strokeLinecap="round" /><line x1="21" y1="12" x2="23" y2="12" strokeWidth="1.5" strokeLinecap="round" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="1.5" strokeLinecap="round" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.sun_exposure}
                                    formatValue={(value) => value ? formatSunExposure(value) : '-'}
                                />

                                {/* Atmosphere */}
                                <ComparisonRow
                                    label="Atmosphere"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.atmosphere}
                                    formatValue={(value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : '-'}
                                />

                                {/* Section Header - Features */}
                                <tr className="bg-neutral-100">
                                    <td colSpan={hotels.length + 1} className="p-3 sm:p-4 font-serif-luxury font-semibold text-neutral-900">
                                        Pool Features
                                    </td>
                                </tr>

                                {/* Infinity Pool */}
                                <ComparisonRow
                                    label="Infinity Pool"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M2 12h20M12 2v20" strokeWidth="1.5" strokeLinecap="round" /><path d="M8 12c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zM24 12c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_infinity_pool}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Rooftop Pool */}
                                <ComparisonRow
                                    label="Rooftop Pool"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 21h18M9 8h6M9 8V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3M9 8H5a2 2 0 0 0-2 2v11M15 8h4a2 2 0 0 1 2 2v11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_rooftop_pool}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Heated Pool */}
                                <ComparisonRow
                                    label="Heated Pool"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2v10M8.5 5.5l2.83 2.83M15.5 5.5l-2.83 2.83M4 15h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_heated_pool}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Pool Bar */}
                                <ComparisonRow
                                    label="Pool Bar"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 1v4M10 1v4M14 1v4" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_pool_bar}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Lazy River */}
                                <ComparisonRow
                                    label="Lazy River"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M2 15c1.67-2.67 3.67-4 6-4s4.33 1.33 6 4c1.67-2.67 3.67-4 6-4s4.33 1.33 6 4M2 21c1.67-2.67 3.67-4 6-4s4.33 1.33 6 4c1.67-2.67 3.67-4 6-4s4.33 1.33 6 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 9c1-1.5 2.5-2 4-2s3 .5 4 2" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_lazy_river}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Section Header - Family Features */}
                                <tr className="bg-neutral-100">
                                    <td colSpan={hotels.length + 1} className="p-3 sm:p-4 font-serif-luxury font-semibold text-neutral-900">
                                        Family & Safety
                                    </td>
                                </tr>

                                {/* Kids Pool */}
                                <ComparisonRow
                                    label="Kids Pool"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4" strokeWidth="1.5" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M16 11l2 2 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_kids_pool}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Splash Area */}
                                <ComparisonRow
                                    label="Splash Area"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="3" strokeWidth="1.5" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_splash_area}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Lifeguard */}
                                <ComparisonRow
                                    label="Lifeguard on Duty"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="1.5" /><circle cx="12" cy="12" r="4" strokeWidth="1.5" /><line x1="4.93" y1="4.93" x2="9.17" y2="9.17" strokeWidth="1.5" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" strokeWidth="1.5" /><line x1="14.83" y1="9.17" x2="19.07" y2="4.93" strokeWidth="1.5" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" strokeWidth="1.5" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_lifeguard}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Adults Only */}
                                <ComparisonRow
                                    label="Adults Only"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M18 8l2 2 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.is_adults_only}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Section Header - Comfort */}
                                <tr className="bg-neutral-100">
                                    <td colSpan={hotels.length + 1} className="p-3 sm:p-4 font-serif-luxury font-semibold text-neutral-900">
                                        Comfort & Amenities
                                    </td>
                                </tr>

                                {/* Shade Areas */}
                                <ComparisonRow
                                    label="Shade Areas"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="12" r="3" strokeWidth="1.5" /><path d="M12 19a7 7 0 0 1-7-7" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_shade_areas}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Towel Service */}
                                <ComparisonRow
                                    label="Towel Service"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" /><path d="M3 9h18M9 21V9" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_towel_service}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Food Service */}
                                <ComparisonRow
                                    label="Poolside Food Service"
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="1" strokeWidth="1.5" /></svg>}
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_food_service}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />
                            </tbody>
                        </table>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                        {hotels.map((hotel) => (
                            <div key={hotel.id} className="bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 sm:p-5 md:p-6 text-center">
                                <h3 className="font-serif-luxury font-semibold text-neutral-900 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2">{hotel.name}</h3>
                                <div className="space-y-2 sm:space-y-3">
                                    <Link
                                        href={`/hotels/${hotel.slug}`}
                                        className="block w-full px-4 py-2.5 sm:py-3 bg-neutral-900 text-white font-sans-luxury font-medium rounded-lg hover:bg-neutral-800 transition-all duration-300 shadow-md hover:shadow-lg text-xs sm:text-sm"
                                    >
                                        View Details
                                    </Link>
                                    {hotel.booking_affiliate_url && (
                                        <a
                                            href={hotel.booking_affiliate_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full px-4 py-2.5 sm:py-3 bg-neutral-700 text-white font-sans-luxury font-medium rounded-lg hover:bg-neutral-600 transition-all duration-300 shadow-md hover:shadow-lg text-xs sm:text-sm"
                                        >
                                            Book Now
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

// Comparison Row Component
function ComparisonRow({ label, icon, hotels, getValue, formatValue, highlightBest = false }) {
    const values = hotels.map(getValue);
    const maxValue = highlightBest && values.some(v => typeof v === 'number') 
        ? Math.max(...values.filter(v => typeof v === 'number'))
        : null;

    return (
        <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors duration-200">
            <td className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 font-sans-luxury font-medium text-neutral-700 bg-neutral-50 sticky left-0 z-10 shadow-sm">
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                    <span className="text-neutral-600 flex-shrink-0">{icon}</span>
                    <span className="text-[10px] sm:text-xs md:text-sm lg:text-base">{label}</span>
                </div>
            </td>
            {hotels.map((hotel, index) => {
                const value = getValue(hotel);
                const isBest = highlightBest && typeof value === 'number' && value === maxValue && maxValue !== null;
                
                return (
                    <td 
                        key={hotel.id} 
                        className={`p-3 sm:p-4 md:p-5 lg:p-6 text-center font-sans-luxury text-xs sm:text-sm md:text-base ${
                            isBest ? 'bg-emerald-50 font-semibold text-emerald-900' : 'text-neutral-700'
                        }`}
                    >
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                            {typeof formatValue === 'function' ? formatValue(value) : value || '-'}
                            {isBest && (
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-amber-500 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            )}
                        </div>
                    </td>
                );
            })}
        </tr>
    );
}

// Boolean Badge Component
function BooleanBadge({ value }) {
    if (value === true) {
        return (
            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-emerald-50 text-emerald-800 rounded-full text-[10px] sm:text-xs md:text-sm font-sans-luxury font-medium">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="whitespace-nowrap">Yes</span>
            </span>
        );
    }
    if (value === false) {
        return (
            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-neutral-100 text-neutral-600 rounded-full text-[10px] sm:text-xs md:text-sm font-sans-luxury font-medium">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
                    <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="whitespace-nowrap">No</span>
            </span>
        );
    }
    return <span className="text-neutral-400 font-sans-luxury text-xs sm:text-sm">-</span>;
}

// Helper Functions
function formatSunExposure(exposure) {
    const map = {
        'all_day': 'All Day',
        'afternoon_only': 'Afternoon Only',
        'morning_only': 'Morning Only',
        'partial_shade': 'Partial Shade',
        'mostly_shaded': 'Mostly Shaded'
    };
    return map[exposure] || exposure;
}

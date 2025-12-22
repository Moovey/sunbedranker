import { useState } from 'react';
import { Link, Head, router } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function DestinationShow({ destination, hotels, filters = {} }) {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        router.get(`/destinations/${destination.slug}`, newFilters, { preserveState: true });
    };

    const clearFilters = () => {
        setLocalFilters({});
        router.get(`/destinations/${destination.slug}`);
    };

    return (
        <>
            <Head title={`${destination.name} - Hotels with Great Pools`} />
            
            <div className="min-h-screen bg-neutral-50">
                <Header />
                {/* Header */}
                <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                        <Link href="/" className="text-neutral-300 hover:text-white mb-3 sm:mb-4 md:mb-5 lg:mb-6 inline-flex items-center gap-2 font-sans-luxury text-xs sm:text-sm md:text-base transition-colors duration-300">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back to Home
                        </Link>
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-serif-luxury font-semibold mb-2 sm:mb-3 leading-tight">{destination.name}</h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-200 font-sans-luxury">
                            {hotels.total} hotel{hotels.total !== 1 ? 's' : ''} ranked by pool & sunbed quality
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12">
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                        {/* Filters Sidebar */}
                        <div className="w-full lg:w-64 xl:w-72 2xl:w-80 flex-shrink-0">
                            <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-5 md:p-6 lg:sticky lg:top-24">
                                <div className="flex justify-between items-center mb-4 sm:mb-5 md:mb-6">
                                    <h2 className="text-sm sm:text-base md:text-lg font-serif-luxury font-semibold text-neutral-900">Filters</h2>
                                    {Object.keys(localFilters).length > 0 && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-[10px] sm:text-xs md:text-sm text-neutral-900 hover:text-neutral-700 font-sans-luxury font-medium transition-colors duration-300 px-2 py-1 hover:bg-neutral-50 rounded"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>

                                {/* Sort */}
                                <div className="mb-4 sm:mb-5">
                                    <label className="block text-[10px] sm:text-xs md:text-sm font-sans-luxury font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                                        Sort by
                                    </label>
                                    <select
                                        value={localFilters.sort || 'score'}
                                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 font-sans-luxury text-xs sm:text-sm text-neutral-900 transition-all duration-300 bg-white"
                                    >
                                        <option value="score">Overall Score</option>
                                        <option value="family">Best for Families</option>
                                        <option value="quiet">Quietest</option>
                                        <option value="party">Best Party Vibe</option>
                                        <option value="name">Name (A-Z)</option>
                                    </select>
                                </div>

                                {/* Pool Type */}
                                <div className="mb-4 sm:mb-5">
                                    <label className="block text-[10px] sm:text-xs md:text-sm font-sans-luxury font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                                        Pool Type
                                    </label>
                                    <select
                                        value={localFilters.pool_type || ''}
                                        onChange={(e) => handleFilterChange('pool_type', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 font-sans-luxury text-xs sm:text-sm text-neutral-900 transition-all duration-300 bg-white"
                                    >
                                        <option value="">All Types</option>
                                        <option value="infinity">Infinity Pool</option>
                                        <option value="rooftop">Rooftop Pool</option>
                                        <option value="heated">Heated Pool</option>
                                        <option value="kids">Kids Pool</option>
                                    </select>
                                </div>

                                {/* Atmosphere */}
                                <div className="mb-4 sm:mb-5">
                                    <label className="block text-[10px] sm:text-xs md:text-sm font-sans-luxury font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                                        Atmosphere
                                    </label>
                                    <select
                                        value={localFilters.atmosphere || ''}
                                        onChange={(e) => handleFilterChange('atmosphere', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 font-sans-luxury text-xs sm:text-sm text-neutral-900 transition-all duration-300 bg-white"
                                    >
                                        <option value="">All Atmospheres</option>
                                        <option value="quiet">Quiet & Relaxing</option>
                                        <option value="family">Family-Friendly</option>
                                        <option value="lively">Lively</option>
                                        <option value="party">Party Vibe</option>
                                    </select>
                                </div>

                                {/* Sunbed Ratio */}
                                <div className="mb-4 sm:mb-5">
                                    <label className="block text-[10px] sm:text-xs md:text-sm font-sans-luxury font-semibold text-neutral-700 mb-1.5 sm:mb-2">
                                        Minimum Sunbed Ratio
                                    </label>
                                    <select
                                        value={localFilters.sunbed_ratio || ''}
                                        onChange={(e) => handleFilterChange('sunbed_ratio', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 font-sans-luxury text-xs sm:text-sm text-neutral-900 transition-all duration-300 bg-white"
                                    >
                                        <option value="">Any Ratio</option>
                                        <option value="1.0">1:1 (Excellent)</option>
                                        <option value="0.75">3:4 (Very Good)</option>
                                        <option value="0.5">1:2 (Good)</option>
                                        <option value="0.33">1:3 (Average)</option>
                                    </select>
                                </div>

                                {/* Adults Only */}
                                <div className="mb-0">
                                    <label className="flex items-center cursor-pointer py-2">
                                        <input
                                            type="checkbox"
                                            checked={localFilters.adults_only || false}
                                            onChange={(e) => handleFilterChange('adults_only', e.target.checked ? '1' : '')}
                                            className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 w-4 h-4 sm:w-5 sm:h-5"
                                        />
                                        <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs md:text-sm text-neutral-700 font-sans-luxury">Adults Only</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Hotels Grid */}
                        <div className="flex-1 min-w-0">
                            {hotels.data.length === 0 ? (
                                <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 text-center">
                                    <div className="mb-4 sm:mb-6">
                                        <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 21h18M9 8h6M9 8V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3M9 8H5a2 2 0 0 0-2 2v11M15 8h4a2 2 0 0 1 2 2v11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <p className="text-neutral-600 font-sans-luxury text-xs sm:text-sm md:text-base mb-4 sm:mb-6">No hotels match your filters.</p>
                                    <button
                                        onClick={clearFilters}
                                        className="text-neutral-900 hover:text-neutral-700 font-sans-luxury font-semibold text-xs sm:text-sm md:text-base transition-colors duration-300 px-4 py-2 hover:bg-neutral-50 rounded-lg"
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
                                        {hotels.data.map((hotel) => (
                                            <HotelCard key={hotel.id} hotel={hotel} />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {hotels.links && (
                                        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                                            {hotels.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-sans-luxury text-[10px] sm:text-xs md:text-sm transition-all duration-300 ${
                                                        link.active
                                                            ? 'bg-neutral-900 text-white shadow-lg'
                                                            : 'bg-white text-neutral-700 hover:bg-neutral-50 shadow-md'
                                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function HotelCard({ hotel }) {
    return (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
            <div className="flex flex-col sm:flex-row h-full">
                <div className="relative w-full sm:w-2/5 md:w-1/3 lg:w-2/5 h-40 sm:h-auto flex-shrink-0">
                    <img
                        src={hotel.main_image || '/images/default-hotel.jpg'}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {hotel.overall_score && (
                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-neutral-900 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-sans-luxury font-bold text-[10px] sm:text-xs md:text-sm shadow-lg">
                            {hotel.overall_score}/10
                        </div>
                    )}
                </div>
                
                <div className="flex-1 p-3 sm:p-4 md:p-5 flex flex-col">
                    <Link href={`/hotels/${hotel.slug}`} className="group/link">
                        <h3 className="font-serif-luxury font-semibold text-sm sm:text-base md:text-lg text-neutral-900 mb-1.5 sm:mb-2 group-hover/link:text-neutral-700 transition-colors duration-300 line-clamp-2">{hotel.name}</h3>
                    </Link>
                    
                    {hotel.star_rating && (
                        <div className="flex gap-0.5 mb-2 sm:mb-3">
                            {[...Array(hotel.star_rating)].map((_, i) => (
                                <svg key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>
                    )}

                    {hotel.pool_criteria && (
                        <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs md:text-sm mb-3 sm:mb-4 flex-grow">
                            {hotel.pool_criteria.sunbed_to_guest_ratio && (
                                <div className="flex items-center text-neutral-700 font-sans-luxury">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <rect x="3" y="11" width="18" height="10" rx="2" strokeWidth="1.5" />
                                        <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <span className="font-medium">Sunbeds:</span>&nbsp;{hotel.pool_criteria.sunbed_to_guest_ratio}:1
                                </div>
                            )}
                            {hotel.pool_criteria.sun_exposure && (
                                <div className="flex items-center text-neutral-700 font-sans-luxury">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="5" strokeWidth="1.5" />
                                        <line x1="12" y1="1" x2="12" y2="3" strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="12" y1="21" x2="12" y2="23" strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="1" y1="12" x2="3" y2="12" strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="21" y1="12" x2="23" y2="12" strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="1.5" strokeLinecap="round" />
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <span className="font-medium">Sun:</span>&nbsp;<span className="truncate">{hotel.pool_criteria.sun_exposure.replace('_', ' ')}</span>
                                </div>
                            )}
                            {hotel.pool_criteria.atmosphere && (
                                <div className="flex items-center text-neutral-700 font-sans-luxury">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="font-medium">Vibe:</span>&nbsp;<span className="truncate capitalize">{hotel.pool_criteria.atmosphere}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-auto pt-2">
                        <Link
                            href={`/hotels/${hotel.slug}`}
                            className="inline-flex items-center gap-1.5 sm:gap-2 text-neutral-900 hover:text-neutral-700 font-sans-luxury font-semibold text-[10px] sm:text-xs md:text-sm transition-colors duration-300"
                        >
                            View Details
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

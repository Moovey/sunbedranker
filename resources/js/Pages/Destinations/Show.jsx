import { useState } from 'react';
import { Link, Head, router } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function DestinationShow({ destination, hotels, filters = {} }) {
    const [localFilters, setLocalFilters] = useState(filters);
    const [compareList, setCompareList] = useState([]);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        router.get(`/destinations/${destination.slug}`, newFilters, { preserveState: true });
    };

    const clearFilters = () => {
        setLocalFilters({});
        router.get(`/destinations/${destination.slug}`);
    };

    const toggleCompare = (hotelId, event) => {
        event.preventDefault();
        event.stopPropagation();
        
        setCompareList(prev => {
            if (prev.includes(hotelId)) {
                return prev.filter(id => id !== hotelId);
            } else if (prev.length < 4) {
                return [...prev, hotelId];
            }
            return prev;
        });
    };

    return (
        <>
            <Head title={`${destination.name} - Hotels with Great Pools`} />
            
            <div className="min-h-screen bg-white">
                <Header />
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-blue-600 text-white py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 shadow-lg">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                        <Link href="/" className="text-white hover:text-orange-100 mb-3 sm:mb-4 md:mb-5 lg:mb-6 inline-flex items-center gap-2 font-sans font-bold text-xs sm:text-sm md:text-base transition-all duration-300 transform hover:scale-105">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                            </svg>
                            Back to Home
                        </Link>
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-sans font-black mb-2 sm:mb-3 leading-tight">{destination.name}</h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-sans font-bold">
                            {hotels.total} hotel{hotels.total !== 1 ? 's' : ''} ranked by pool & sunbed quality
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12">
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                        {/* Filters Sidebar */}
                        <div className="w-full lg:w-64 xl:w-72 2xl:w-80 flex-shrink-0">
                            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 lg:sticky lg:top-24 border-2 border-gray-100">
                                <div className="flex justify-between items-center mb-4 sm:mb-5 md:mb-6">
                                    <h2 className="text-sm sm:text-base md:text-lg font-sans font-black text-gray-900 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
                                        </svg>
                                        Filters
                                    </h2>
                                    {Object.keys(localFilters).length > 0 && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-[10px] sm:text-xs md:text-sm text-red-600 hover:text-red-700 font-sans font-bold transition-all duration-300 px-2 py-1 hover:bg-red-50 rounded-lg"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>

                                {/* Sort */}
                                <div className="mb-4 sm:mb-5">
                                    <label className="block text-[10px] sm:text-xs md:text-sm font-sans font-bold text-gray-900 mb-1.5 sm:mb-2">
                                        Sort by
                                    </label>
                                    <select
                                        value={localFilters.sort || 'score'}
                                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-sans font-bold text-xs sm:text-sm text-gray-900 transition-all duration-300 bg-white hover:border-orange-300"
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
                                    <label className="block text-[10px] sm:text-xs md:text-sm font-sans font-bold text-gray-900 mb-1.5 sm:mb-2">
                                        Pool Type
                                    </label>
                                    <select
                                        value={localFilters.pool_type || ''}
                                        onChange={(e) => handleFilterChange('pool_type', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-sans font-bold text-xs sm:text-sm text-gray-900 transition-all duration-300 bg-white hover:border-orange-300"
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
                                    <label className="block text-[10px] sm:text-xs md:text-sm font-sans font-bold text-gray-900 mb-1.5 sm:mb-2">
                                        Atmosphere
                                    </label>
                                    <select
                                        value={localFilters.atmosphere || ''}
                                        onChange={(e) => handleFilterChange('atmosphere', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-sans font-bold text-xs sm:text-sm text-gray-900 transition-all duration-300 bg-white hover:border-orange-300"
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
                                    <label className="block text-[10px] sm:text-xs md:text-sm font-sans font-bold text-gray-900 mb-1.5 sm:mb-2">
                                        Minimum Sunbed Ratio
                                    </label>
                                    <select
                                        value={localFilters.sunbed_ratio || ''}
                                        onChange={(e) => handleFilterChange('sunbed_ratio', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-sans font-bold text-xs sm:text-sm text-gray-900 transition-all duration-300 bg-white hover:border-orange-300"
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
                                            className="rounded border-2 border-orange-300 text-orange-500 focus:ring-orange-500 w-4 h-4 sm:w-5 sm:h-5"
                                        />
                                        <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs md:text-sm text-gray-900 font-sans font-bold">Adults Only</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Hotels Grid */}
                        <div className="flex-1 min-w-0">
                            {/* Compare Bar - Shows when hotels are selected */}
                            {compareList.length > 0 && (
                                <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl shadow-xl border-2 border-orange-200 p-4 sm:p-5 mb-4 sm:mb-6">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                                        <div className="text-center sm:text-left">
                                            <p className="text-sm sm:text-base font-sans font-black text-gray-900 mb-1">
                                                {compareList.length} hotel{compareList.length !== 1 ? 's' : ''} selected
                                            </p>
                                            <p className="text-[10px] sm:text-xs text-gray-700 font-sans font-bold">
                                                Select up to 4 hotels to compare
                                            </p>
                                        </div>
                                        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                                            <button
                                                onClick={() => setCompareList([])}
                                                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 border-2 border-gray-300 text-gray-700 font-sans font-bold rounded-lg hover:bg-white transition-all duration-300 text-xs sm:text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                                            >
                                                Clear
                                            </button>
                                            <Link
                                                href={`/compare?hotels=${compareList.join(',')}`}
                                                className="flex-1 sm:flex-none px-6 sm:px-8 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-sans font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"/>
                                                </svg>
                                                Compare {compareList.length}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {hotels.data.length === 0 ? (
                                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 text-center border-2 border-gray-100">
                                    <div className="mb-4 sm:mb-6">
                                        <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 font-sans font-bold text-xs sm:text-sm md:text-base mb-4 sm:mb-6">No hotels match your filters.</p>
                                    <button
                                        onClick={clearFilters}
                                        className="text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 font-sans font-bold text-xs sm:text-sm md:text-base transition-all duration-300 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-4 sm:mb-6 md:mb-8">
                                        {hotels.data.map((hotel) => (
                                            <HotelCard 
                                                key={hotel.id} 
                                                hotel={hotel}
                                                isInCompare={compareList.includes(hotel.id)}
                                                onToggleCompare={(e) => toggleCompare(hotel.id, e)}
                                            />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {hotels.links && (
                                        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                                            {hotels.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-sans font-bold text-[10px] sm:text-xs md:text-sm transition-all duration-300 ${
                                                        link.active
                                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105'
                                                            : 'bg-white text-gray-700 hover:bg-orange-50 shadow-md border-2 border-gray-100 hover:border-orange-200'
                                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:scale-105'}`}
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

function HotelCard({ hotel, isInCompare, onToggleCompare }) {
    const isPremium = hotel.is_premium;
    
    // Premium hotels get larger, more prominent cards with enhanced borders
    const cardClasses = isPremium 
        ? "bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group relative border-4 border-yellow-400 transform hover:scale-105 ring-2 ring-yellow-200"
        : "bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative border-2 border-gray-100 transform hover:scale-105";
    
    // Premium hotels get taller images on mobile
    const imageHeight = isPremium ? "h-56 sm:h-auto" : "h-40 sm:h-auto";
    const imageWidth = isPremium ? "sm:w-1/2" : "sm:w-2/5 md:w-1/3 lg:w-2/5";
    
    return (
        <div className={cardClasses}>
            {/* Premium Badge */}
            {hotel.is_premium && (
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-sans font-black text-[10px] sm:text-xs shadow-lg flex items-center gap-1 animate-pulse">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                    PREMIUM
                </div>
            )}
            
            {/* Special Offer Badge */}
            {isPremium && hotel.special_offer && (
                <div className="absolute top-10 sm:top-12 right-2 sm:right-3 z-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 sm:px-2.5 py-1 rounded-full font-sans font-bold text-[9px] sm:text-[10px] shadow-lg flex items-center gap-1">
                    🎉 OFFER
                </div>
            )}
            
            {/* Compare Checkbox */}
            <button
                onClick={onToggleCompare}
                className={`absolute top-2 sm:top-3 left-2 sm:left-3 z-10 p-2 rounded-lg transition-all duration-300 shadow-lg ${
                    isInCompare 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                        : 'bg-white/90 text-gray-700 hover:bg-white border-2 border-gray-200'
                }`}
                title={isInCompare ? 'Remove from comparison' : 'Add to comparison'}
            >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    {isInCompare ? (
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    ) : (
                        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"/>
                    )}
                </svg>
            </button>
            
            <div className="flex flex-col sm:flex-row h-full">
                <div className={`relative w-full ${imageWidth} ${imageHeight} flex-shrink-0`}>
                    <img
                        src={hotel.main_image_url || '/images/default-hotel.jpg'}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {hotel.overall_score && (
                        <div className={`absolute ${hotel.is_premium ? 'top-10 sm:top-12' : 'top-2 sm:top-3'} right-2 sm:right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-sans font-black text-[10px] sm:text-xs md:text-sm shadow-lg flex items-center gap-1`}>
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            {hotel.overall_score}/10
                        </div>
                    )}
                </div>
                
                <div className="flex-1 p-3 sm:p-4 md:p-5 flex flex-col">
                    <Link href={`/hotels/${hotel.slug}`} className="group/link">
                        <h3 className="font-sans font-bold text-sm sm:text-base md:text-lg text-gray-900 mb-1.5 sm:mb-2 group-hover/link:text-orange-600 transition-colors duration-300 line-clamp-2">{hotel.name}</h3>
                    </Link>
                    
                    {hotel.star_rating && (
                        <div className="flex gap-0.5 mb-2 sm:mb-3">
                            {[...Array(hotel.star_rating)].map((_, i) => (
                                <svg key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>
                    )}

                    {hotel.pool_criteria && (
                        <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs md:text-sm mb-3 sm:mb-4 flex-grow">
                            {hotel.pool_criteria.sunbed_to_guest_ratio && (
                                <div className="flex items-center text-gray-700 font-sans font-bold">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 2v2h2V2h4v2h2V2h2v4H6V2h2zm0 6h8v12H8V8zm-5 2v12a2 2 0 002 2h14a2 2 0 002-2V10a2 2 0 00-2-2H5a2 2 0 00-2 2z"/>
                                    </svg>
                                    <span className="font-bold">Sunbeds:</span>&nbsp;{hotel.pool_criteria.sunbed_to_guest_ratio}:1
                                </div>
                            )}
                            {hotel.pool_criteria.sun_exposure && (
                                <div className="flex items-center text-gray-700 font-sans font-bold">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                                    </svg>
                                    <span className="font-bold">Sun:</span>&nbsp;<span className="truncate">{hotel.pool_criteria.sun_exposure.replace('_', ' ')}</span>
                                </div>
                            )}
                            {hotel.pool_criteria.atmosphere && (
                                <div className="flex items-center text-gray-700 font-sans font-bold">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"/>
                                    </svg>
                                    <span className="font-bold">Vibe:</span>&nbsp;<span className="truncate capitalize">{hotel.pool_criteria.atmosphere}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-auto pt-2">
                        <Link
                            href={`/hotels/${hotel.slug}`}
                            className="inline-flex items-center gap-1.5 sm:gap-2 text-orange-600 hover:text-orange-700 font-sans font-black text-[10px] sm:text-xs md:text-sm transition-all duration-300 transform hover:scale-105"
                        >
                            View Details
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

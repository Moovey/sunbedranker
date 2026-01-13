import { Link, Head, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import Header from '@/Components/Header';

export default function SearchResults({ searchParams, localHotels, amadeusHotels, amadeusError, hasResults }) {
    const { auth } = usePage().props;
    const [compareList, setCompareList] = useState([]);
    const [filters, setFilters] = useState({
        poolTypes: [],
        sunbedRatio: '',
        atmosphere: '',
        budget: ''
    });
    const [sortBy, setSortBy] = useState('score'); // score, price, distance

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

    const toggleFilter = (category, value) => {
        if (category === 'poolTypes') {
            setFilters(prev => ({
                ...prev,
                poolTypes: prev.poolTypes.includes(value)
                    ? prev.poolTypes.filter(v => v !== value)
                    : [...prev.poolTypes, value]
            }));
        } else {
            setFilters(prev => ({
                ...prev,
                [category]: prev[category] === value ? '' : value
            }));
        }
    };

    const clearFilters = () => {
        setFilters({
            poolTypes: [],
            sunbedRatio: '',
            atmosphere: '',
            budget: ''
        });
    };

    // Filter and sort hotels
    const filteredAndSortedHotels = useMemo(() => {
        if (!localHotels) return [];

        let filtered = [...localHotels];

        // Apply filters
        if (filters.poolTypes.length > 0) {
            filtered = filtered.filter(hotel => {
                if (!hotel.pool_criteria) return false;
                return filters.poolTypes.some(type => {
                    if (type === 'infinity') return hotel.pool_criteria.has_infinity_pool;
                    if (type === 'rooftop') return hotel.pool_criteria.has_rooftop_pool;
                    if (type === 'kids') return hotel.pool_criteria.has_kids_pool;
                    if (type === 'adults') return hotel.pool_criteria.is_adults_only;
                    return false;
                });
            });
        }

        if (filters.sunbedRatio) {
            filtered = filtered.filter(hotel => {
                if (!hotel.pool_criteria?.sunbed_to_guest_ratio) return false;
                const ratio = hotel.pool_criteria.sunbed_to_guest_ratio;
                if (filters.sunbedRatio === 'excellent') return ratio >= 1.0;
                if (filters.sunbedRatio === 'very-good') return ratio >= 0.75 && ratio < 1.0;
                if (filters.sunbedRatio === 'good') return ratio >= 0.5 && ratio < 0.75;
                return true;
            });
        }

        if (filters.atmosphere) {
            filtered = filtered.filter(hotel => {
                if (!hotel.pool_criteria?.atmosphere) return false;
                return hotel.pool_criteria.atmosphere === filters.atmosphere;
            });
        }

        // Apply sorting - Premium hotels always come first, then secondary sort
        filtered.sort((a, b) => {
            // Premium hotels first
            const aPremium = a.is_premium ? 1 : 0;
            const bPremium = b.is_premium ? 1 : 0;
            if (bPremium !== aPremium) {
                return bPremium - aPremium;
            }
            
            // Secondary sort
            if (sortBy === 'score') {
                return (b.overall_score || 0) - (a.overall_score || 0);
            }
            if (sortBy === 'price') {
                // Placeholder - would integrate with affiliate pricing
                return 0;
            }
            if (sortBy === 'distance') {
                // Placeholder - would calculate distance to beach
                return 0;
            }
            return 0;
        });

        return filtered;
    }, [localHotels, filters, sortBy]);

    const activeFilterCount = filters.poolTypes.length + 
        (filters.sunbedRatio ? 1 : 0) + 
        (filters.atmosphere ? 1 : 0) + 
        (filters.budget ? 1 : 0);

    return (
        <>
            <Head title={`Hotels in ${searchParams.destination || 'Search Results'}`} />
            
            <div className="min-h-screen bg-white font-sans">
                <Header />

                {/* Search Summary - Jet2 Style */}
                <div className="bg-gradient-to-r from-blue-50 to-white border-b-4 border-orange-400">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                            <div className="w-full sm:w-auto">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    {searchParams.destination ? `Hotels in ${searchParams.destination}` : 'Search Results'}
                                </h1>
                                {searchParams.checkIn && searchParams.checkOut && (
                                    <p className="text-gray-600 mt-2 sm:mt-3 font-medium text-sm sm:text-base flex items-center gap-2">
                                        <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z"/>
                                        </svg>
                                        {new Date(searchParams.checkIn).toLocaleDateString()} - {new Date(searchParams.checkOut).toLocaleDateString()}
                                        {searchParams.guests && ` · ${searchParams.guests} guest${searchParams.guests > 1 ? 's' : ''}`}
                                    </p>
                                )}
                                {searchParams.poolVibe && (
                                    <span className="inline-flex items-center gap-2 mt-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-bold shadow-md">
                                        {getVibeLabel(searchParams.poolVibe)}
                                    </span>
                                )}
                            </div>
                            <Link
                                href="/"
                                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-white border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-all duration-300 text-sm font-bold text-center whitespace-nowrap flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                </svg>
                                Modify Search
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                    {!hasResults && (
                        <div className="text-center py-12 sm:py-16 md:py-20 bg-gradient-to-b from-orange-50 to-white rounded-2xl border-2 border-gray-100">
                            <svg className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-6.18C11.6 5.84 10.3 5 8.86 5 6.75 5 5.06 6.69 5.06 8.8c0 1.66 1.13 3.1 2.68 3.52L3.94 18H2v3h7v-2.78c0-.38.2-.72.52-.88.79-.4 2.39-1.34 3.48-1.34 1.09 0 2.69.94 3.48 1.34.32.16.52.5.52.88V21h7v-3h-1.94l-3.8-5.68C19.87 11.9 21 10.46 21 8.8 21 6.69 19.31 5 17.2 5c-1.44 0-2.74.84-3.96 2.02L13 7.8V7z"/>
                            </svg>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">No hotels found</h2>
                            <p className="text-gray-600 mb-6 sm:mb-8 font-medium leading-relaxed max-w-xs sm:max-w-md mx-auto px-4 text-sm sm:text-base">
                                Try searching for a different destination or adjust your filters
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-base hover:shadow-xl transform hover:scale-105 active:scale-95"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="11" cy="11" r="8"/>
                                    <path d="M21 21l-4.35-4.35"/>
                                </svg>
                                Start New Search
                            </Link>
                        </div>
                    )}

                    {/* Amadeus Error Message */}
                    {amadeusError && (
                        <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-amber-800 font-light text-sm sm:text-base">{amadeusError}</p>
                        </div>
                    )}

                    {/* Main Content Area with Sidebar */}
                    {localHotels && localHotels.length > 0 && (
                        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
                            {/* Sidebar - Filters */}
                            <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
                                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4 sm:p-5 md:p-6 lg:sticky lg:top-24">
                                    <div className="flex items-center justify-between mb-5 sm:mb-6">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                                            <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                                            </svg>
                                            Filters
                                        </h3>
                                        {activeFilterCount > 0 && (
                                            <button
                                                onClick={clearFilters}
                                                className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 font-semibold rounded-full text-xs transition-all duration-300 transform hover:scale-105"
                                            >
                                                Clear ({activeFilterCount})
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-5 sm:space-y-6">
                                        {/* Pool Types */}
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                                                <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M22 6.5c-1.1 0-2.2.3-3 .9-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9v2c.8 0 1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8V6.5z"/>
                                                </svg>
                                                Pool Type
                                            </h4>
                                            <div className="space-y-2">
                                                {[
                                                    { value: 'infinity', label: 'Infinity Pool', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6.5c-1.1 0-2.2.3-3 .9-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9v2c.8 0 1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8V6.5z"/></svg>, color: 'blue' },
                                                    { value: 'rooftop', label: 'Rooftop Pool', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>, color: 'purple' },
                                                    { value: 'kids', label: 'Kids Pool', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, color: 'green' },
                                                    { value: 'adults', label: 'Adults Only', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>, color: 'pink' }
                                                ].map(type => {
                                                    const isChecked = filters.poolTypes.includes(type.value);
                                                    return (
                                                        <label
                                                            key={type.value}
                                                            className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all duration-300 border-2 ${
                                                                isChecked 
                                                                    ? `bg-${type.color}-50 border-${type.color}-300` 
                                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                onChange={() => toggleFilter('poolTypes', type.value)}
                                                                className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                                            />
                                                            <span className={isChecked ? `text-${type.color}-600` : 'text-gray-600'}>{type.icon}</span>
                                                            <span className="text-sm font-semibold text-gray-900">{type.label}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="border-t-2 border-orange-200"></div>

                                        {/* Sunbed Ratio */}
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                                                <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-6.18C11.6 5.84 10.3 5 8.86 5 6.75 5 5.06 6.69 5.06 8.8c0 1.66 1.13 3.1 2.68 3.52L3.94 18H2v3h7v-2.78c0-.38.2-.72.52-.88.79-.4 2.39-1.34 3.48-1.34 1.09 0 2.69.94 3.48 1.34.32.16.52.5.52.88V21h7v-3h-1.94l-3.8-5.68C19.87 11.9 21 10.46 21 8.8 21 6.69 19.31 5 17.2 5c-1.44 0-2.74.84-3.96 2.02L13 7.8V7z"/>
                                                </svg>
                                                Sunbed Availability
                                            </h4>
                                            <div className="space-y-2">
                                                {[
                                                    { value: 'excellent', label: 'Excellent', sublabel: '1:1 or better', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: 'green' },
                                                    { value: 'very-good', label: 'Very Good', sublabel: '0.75:1+', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>, color: 'blue' },
                                                    { value: 'good', label: 'Good', sublabel: '0.5:1+', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>, color: 'yellow' }
                                                ].map(ratio => {
                                                    const isChecked = filters.sunbedRatio === ratio.value;
                                                    return (
                                                        <label
                                                            key={ratio.value}
                                                            className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg transition-all duration-300 border-2 ${
                                                                isChecked 
                                                                    ? `bg-${ratio.color}-50 border-${ratio.color}-300` 
                                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="sunbedRatio"
                                                                checked={isChecked}
                                                                onChange={() => toggleFilter('sunbedRatio', ratio.value)}
                                                                className="w-5 h-5 mt-0.5 text-orange-500 border-gray-300 focus:ring-orange-500"
                                                            />
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    <span className={isChecked ? `text-${ratio.color}-600` : 'text-gray-600'}>{ratio.icon}</span>
                                                                    <span className="text-sm font-bold text-gray-900">{ratio.label}</span>
                                                                </div>
                                                                <span className="text-xs text-gray-600 font-medium ml-7">{ratio.sublabel}</span>
                                                            </div>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="border-t-2 border-orange-200"></div>

                                        {/* Atmosphere */}
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                                                <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                                                </svg>
                                                Atmosphere
                                            </h4>
                                            <div className="space-y-2">
                                                {[
                                                    { value: 'quiet', label: 'Quiet & Peaceful', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 9v6h4l5 5V4l-5 5H7z"/></svg>, color: 'blue' },
                                                    { value: 'family', label: 'Family Friendly', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, color: 'green' },
                                                    { value: 'lively', label: 'Lively & Social', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>, color: 'orange' },
                                                    { value: 'party', label: 'Party Atmosphere', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22l14-5-9-9z"/><path d="M14.53 12.53l5.59-5.59c.49-.49 1.28-.49 1.77 0l.59.59 1.06-1.06-.59-.59c-1.07-1.07-2.82-1.07-3.89 0l-5.59 5.59 1.06 1.06zM10.06 6.88L9 5.82l-.59.59c-1.07 1.07-1.07 2.82 0 3.89l.59.59 1.06-1.06-.59-.59c-.49-.49-.49-1.28 0-1.77l.59-.59zM17.06 11.88l-1.59 1.59 1.06 1.06 1.59-1.59c.49-.49 1.28-.49 1.77 0l1.61 1.61 1.06-1.06-1.61-1.61c-1.07-1.07-2.82-1.07-3.89 0zM15.06 5.88l-3.59 3.59 1.06 1.06 3.59-3.59 1.59 1.59 1.06-1.06-1.59-1.59c-.98-.97-2.56-.97-3.54 0l-.01.01z"/></svg>, color: 'red' }
                                                ].map(atm => {
                                                    const isChecked = filters.atmosphere === atm.value;
                                                    return (
                                                        <label
                                                            key={atm.value}
                                                            className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all duration-300 border-2 ${
                                                                isChecked 
                                                                    ? `bg-${atm.color}-50 border-${atm.color}-300` 
                                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="atmosphere"
                                                                checked={isChecked}
                                                                onChange={() => toggleFilter('atmosphere', atm.value)}
                                                                className="w-5 h-5 text-orange-500 border-gray-300 focus:ring-orange-500"
                                                            />
                                                            <span className={isChecked ? `text-${atm.color}-600` : 'text-gray-600'}>{atm.icon}</span>
                                                            <span className="text-sm font-semibold text-gray-900">{atm.label}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="border-t-2 border-orange-200"></div>

                                        {/* Budget - Placeholder */}
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                                                <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                                                </svg>
                                                Budget
                                            </h4>
                                            <div className="space-y-2">
                                                {[
                                                    { value: 'budget', label: 'Budget Friendly', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6" fill="white"/></svg>, color: 'green' },
                                                    { value: 'mid', label: 'Mid Range', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z"/><circle cx="12" cy="12" r="3" fill="white"/></svg>, color: 'blue' },
                                                    { value: 'luxury', label: 'Luxury', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: 'purple' }
                                                ].map(budget => (
                                                    <label
                                                        key={budget.value}
                                                        className="flex items-center gap-3 p-3 rounded-lg cursor-not-allowed opacity-50 border-2 border-gray-200 bg-gray-50"
                                                        title="Coming soon with affiliate pricing"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="budget"
                                                            disabled
                                                            className="w-5 h-5 text-orange-500 border-gray-300"
                                                        />
                                                        <span className="text-gray-400">{budget.icon}</span>
                                                        <span className="text-sm font-semibold text-gray-500">{budget.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <p className="text-xs text-orange-600 mt-3 italic font-medium bg-orange-50 p-2 rounded-lg">🎉 Coming soon with live pricing</p>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            {/* Main Content - Results */}
                            <div className="flex-1 min-w-0">
                                {/* Sorting Bar */}
                                <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-200 p-4 sm:p-5 mb-6 relative z-10">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 w-full sm:w-auto">
                                            <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
                                            </svg>
                                            <label htmlFor="sortBy" className="text-sm font-bold text-gray-900 whitespace-nowrap">
                                                Sort by:
                                            </label>
                                            <select
                                                id="sortBy"
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="flex-1 sm:flex-none px-4 py-2.5 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 cursor-pointer bg-white transition-all duration-300 hover:border-gray-400"
                                            >
                                                <option value="score">Pool & Sun Score (Highest)</option>
                                                <option value="price">Price (Low to High)</option>
                                                <option value="distance">Distance to Beach</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                            <span className="text-sm font-bold text-gray-900 bg-orange-100 px-3 py-1.5 rounded-full">
                                                {filteredAndSortedHotels.length} hotel{filteredAndSortedHotels.length !== 1 ? 's' : ''}
                                            </span>
                                            {compareList.length > 0 && (
                                                <Link
                                                    href={`/compare?hotels=${compareList.join(',')}`}
                                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
                                                >
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zM14.99 13v-3H22V8h-7.01V5L11 9l3.99 4z"/>
                                                    </svg>
                                                    Compare {compareList.length}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Hotel Results */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                                    {filteredAndSortedHotels.map((hotel) => (
                                        <HotelCard 
                                            key={hotel.id} 
                                            hotel={hotel}
                                            isInCompare={compareList.includes(hotel.id)}
                                            onToggleCompare={(e) => toggleCompare(hotel.id, e)}
                                            isHotelier={auth?.user?.role === 'hotelier'}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Amadeus Hotels with Prices */}
                    {amadeusHotels && amadeusHotels.length > 0 && (
                        <section className="mt-10 sm:mt-12 md:mt-16">
                            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 mb-6 sm:mb-8 md:mb-10 tracking-tight">
                                💰 Hotels with Live Prices
                            </h2>
                            <div className="space-y-4 sm:space-y-6">
                                {amadeusHotels.map((offer, index) => (
                                    <AmadeusHotelCard key={index} offer={offer} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}

function HotelCard({ hotel, isInCompare, onToggleCompare, isHotelier }) {
    const canClaim = isHotelier && !hotel.owned_by && !hotel.has_pending_claim;

    return (
        <div className="bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl rounded-lg relative group">
            <Link href={`/hotels/${hotel.slug}`} className="block">
                <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                        src={hotel.main_image_url || '/images/default-hotel.jpg'}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Premium Badge */}
                    {hotel.is_premium && (
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold text-[10px] sm:text-xs shadow-lg flex items-center gap-1 animate-pulse z-10">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                            </svg>
                            PREMIUM
                        </div>
                    )}
                    
                    {hotel.overall_score && (
                        <div className={`absolute ${hotel.is_premium ? 'top-12 sm:top-14' : 'top-3 sm:top-4'} right-3 sm:right-4 bg-white/95 backdrop-blur-sm text-neutral-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-light tracking-wider text-xs sm:text-sm shadow-lg`}>
                            {hotel.overall_score}/10
                        </div>
                    )}
                    {hotel.has_pending_claim && (
                        <div className="absolute bottom-3 left-3 right-3 bg-yellow-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-semibold text-center">
                            🔒 Claim under review
                        </div>
                    )}
                    {hotel.owned_by && (
                        <div className="absolute bottom-3 left-3 right-3 bg-green-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified Owner
                        </div>
                    )}
                </div>
                <div className="p-4 sm:p-5 md:p-6 bg-white">
                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 mb-1.5 sm:mb-2">{hotel.name}</h3>
                    <p className="text-xs text-neutral-500 mb-4 sm:mb-5 font-light tracking-wide uppercase">{hotel.destination?.name}</p>
                    
                    {hotel.pool_criteria && (
                        <div className="space-y-3 text-sm">
                            {hotel.pool_criteria.sunbed_to_guest_ratio && (
                                <div className="flex items-center justify-between">
                                    <span className="text-neutral-600 font-light">Sunbed Ratio:</span>
                                    <span className="font-normal text-neutral-900">
                                        {hotel.pool_criteria.sunbed_to_guest_ratio}:1
                                    </span>
                                </div>
                            )}
                            <div className="flex gap-2 flex-wrap">
                                {hotel.pool_criteria.has_infinity_pool && (
                                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-neutral-50 text-neutral-700 border border-neutral-200 font-light tracking-wide text-[10px]">∞ Pool</span>
                                )}
                                {hotel.pool_criteria.has_kids_pool && (
                                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-neutral-50 text-neutral-700 border border-neutral-200 font-light tracking-wide text-[10px]">Kids Pool</span>
                                )}
                                {hotel.pool_criteria.is_adults_only && (
                                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-neutral-50 text-neutral-700 border border-neutral-200 font-light tracking-wide text-[10px]">Adults Only</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Link>
            
            {/* Action buttons container */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2">
                {/* Compare Button */}
                <button
                    onClick={onToggleCompare}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 shadow-lg text-sm font-semibold ${
                        isInCompare 
                            ? 'bg-neutral-900 text-white' 
                            : 'bg-white/90 text-neutral-700 hover:bg-white'
                    }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isInCompare ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        )}
                    </svg>
                    Compare
                </button>

                {/* Claim Hotel Button (Hotelier Only) */}
                {canClaim && (
                    <Link
                        href={`/hotelier/hotels/${hotel.slug}/claim`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 shadow-lg bg-orange-500 text-white hover:bg-orange-600 text-sm font-semibold"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Claim Hotel
                    </Link>
                )}
            </div>
        </div>
    );
}

function AmadeusHotelCard({ offer }) {
    const hotel = offer.hotel;
    const lowestOffer = offer.offers?.[0];
    
    return (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4 sm:p-6 md:p-8 hover:shadow-xl transition-all duration-500">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
                <div className="flex-1 w-full sm:w-auto">
                    <h3 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-light text-neutral-900 mb-2">{hotel.name}</h3>
                    {hotel.cityCode && (
                        <p className="text-xs sm:text-sm text-neutral-500 mb-3 font-light tracking-wide uppercase">{hotel.cityCode}</p>
                    )}
                    
                    {hotel.rating && (
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                                {[...Array(parseInt(hotel.rating))].map((_, i) => (
                                    <span key={i} className="text-amber-400 text-base sm:text-lg">★</span>
                                ))}
                            </div>
                            <span className="text-xs sm:text-sm text-neutral-600 font-light">{hotel.rating} stars</span>
                        </div>
                    )}
                </div>
                
                {lowestOffer && (
                    <div className="text-left sm:text-right w-full sm:w-auto sm:ml-4">
                        <div className="text-[10px] sm:text-xs text-neutral-500 font-light tracking-wide uppercase">from</div>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-light text-neutral-900 mt-1">
                            {lowestOffer.price.currency} {lowestOffer.price.total}
                        </div>
                        <div className="text-xs sm:text-sm text-neutral-600 font-light mb-3 sm:mb-4">per stay</div>
                        <a
                            href={lowestOffer.self || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-neutral-900 text-white font-normal rounded-xl hover:bg-neutral-800 transition-all duration-300 text-xs sm:text-sm tracking-wide uppercase hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] text-center"
                        >
                            View Deal
                        </a>
                    </div>
                )}
            </div>
            
            {lowestOffer?.room && (
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-neutral-100">
                    <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                        <strong className="font-normal">Room:</strong> {lowestOffer.room.typeEstimated?.category || 'Standard'}
                        {lowestOffer.room.description?.text && ` - ${lowestOffer.room.description.text}`}
                    </p>
                </div>
            )}
        </div>
    );
}

function getVibeLabel(vibe) {
    const labels = {
        family: '🏊 Best for Families',
        quiet: '🧘 Quiet & Relaxing',
        party: '🎉 Lively & Social',
        luxury: '✨ Luxury Experience',
        adults: '🍸 Adults Only',
    };
    return labels[vibe] || vibe;
}

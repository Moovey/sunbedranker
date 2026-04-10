import { Link, Head, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function SearchResults({ searchParams, localHotels, agodaHotels, hasResults }) {
    const { auth } = usePage().props;
    const [compareList, setCompareList] = useState([]);
    const [filters, setFilters] = useState({
        poolVibe: searchParams.poolVibe || '',
        poolFeatures: [],
        sunbedRatio: ''
    });
    const [sortBy, setSortBy] = useState('score');

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
        if (category === 'poolFeatures') {
            setFilters(prev => ({
                ...prev,
                poolFeatures: prev.poolFeatures.includes(value)
                    ? prev.poolFeatures.filter(v => v !== value)
                    : [...prev.poolFeatures, value]
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
            poolVibe: '',
            poolFeatures: [],
            sunbedRatio: ''
        });
    };

    // Filter and sort hotels
    const filteredAndSortedHotels = useMemo(() => {
        const allHotels = [
            ...(localHotels?.data || []),
            ...(agodaHotels || []),
        ];

        if (allHotels.length === 0) return [];

        let filtered = [...allHotels];

        // Apply pool vibe filter (matches homepage vibes + backend logic)
        if (filters.poolVibe) {
            filtered = filtered.filter(hotel => {
                if (!hotel.pool_criteria) return false;
                const pc = hotel.pool_criteria;
                switch (filters.poolVibe) {
                    case 'family':
                        return pc.has_kids_pool || pc.has_waterslide || pc.atmosphere === 'family';
                    case 'quiet':
                        return pc.atmosphere === 'quiet' || pc.atmosphere === 'relaxed' || pc.is_adults_only;
                    case 'party':
                        return pc.atmosphere === 'lively' || pc.atmosphere === 'party' || pc.has_pool_bar;
                    case 'luxury':
                        return pc.has_infinity_pool || pc.has_rooftop_pool || pc.has_luxury_cabanas;
                    case 'adults':
                        return pc.is_adults_only;
                    default:
                        return true;
                }
            });
        }

        // Apply pool feature filters
        if (filters.poolFeatures.length > 0) {
            filtered = filtered.filter(hotel => {
                if (!hotel.pool_criteria) return false;
                return filters.poolFeatures.some(feat => {
                    if (feat === 'infinity') return hotel.pool_criteria.has_infinity_pool;
                    if (feat === 'rooftop') return hotel.pool_criteria.has_rooftop_pool;
                    if (feat === 'kids') return hotel.pool_criteria.has_kids_pool;
                    if (feat === 'heated') return hotel.pool_criteria.has_heated_pool;
                    if (feat === 'pool_bar') return hotel.pool_criteria.has_pool_bar;
                    if (feat === 'waterslide') return hotel.pool_criteria.has_waterslide;
                    return false;
                });
            });
        }

        if (filters.sunbedRatio) {
            filtered = filtered.filter(hotel => {
                if (!hotel.pool_criteria?.sunbed_to_guest_ratio) return false;
                const ratio = parseFloat(hotel.pool_criteria.sunbed_to_guest_ratio);
                if (filters.sunbedRatio === 'excellent') return ratio >= 0.70;
                if (filters.sunbedRatio === 'very-good') return ratio >= 0.40;
                if (filters.sunbedRatio === 'good') return ratio >= 0.20;
                return true;
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
            if (sortBy === 'sunbed') {
                const aRatio = parseFloat(a.pool_criteria?.sunbed_to_guest_ratio) || 0;
                const bRatio = parseFloat(b.pool_criteria?.sunbed_to_guest_ratio) || 0;
                return bRatio - aRatio;
            }
            if (sortBy === 'stars') {
                return (b.star_rating || 0) - (a.star_rating || 0);
            }
            if (sortBy === 'name') {
                return (a.name || '').localeCompare(b.name || '');
            }
            return 0;
        });

        return filtered;
    }, [localHotels, agodaHotels, filters, sortBy]);

    const activeFilterCount = (filters.poolVibe ? 1 : 0) +
        filters.poolFeatures.length + 
        (filters.sunbedRatio ? 1 : 0);

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
                                    <span className="inline-flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs sm:text-sm font-bold shadow-md">
                                        {getVibeLabel(searchParams.poolVibe)}
                                    </span>
                                )}
                            </div>
                            <Link
                                href="/"
                                className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-all duration-300 text-xs sm:text-sm font-bold text-center whitespace-nowrap flex items-center justify-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                </svg>
                                Modify Search
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                    {!hasResults && (
                        <div className="text-center py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-orange-50 to-white rounded-xl sm:rounded-2xl border-2 border-gray-100">
                            <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4 md:mb-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-6.18C11.6 5.84 10.3 5 8.86 5 6.75 5 5.06 6.69 5.06 8.8c0 1.66 1.13 3.1 2.68 3.52L3.94 18H2v3h7v-2.78c0-.38.2-.72.52-.88.79-.4 2.39-1.34 3.48-1.34 1.09 0 2.69.94 3.48 1.34.32.16.52.5.52.88V21h7v-3h-1.94l-3.8-5.68C19.87 11.9 21 10.46 21 8.8 21 6.69 19.31 5 17.2 5c-1.44 0-2.74.84-3.96 2.02L13 7.8V7z"/>
                            </svg>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 px-3 sm:px-4">No hotels found</h2>
                            <p className="text-gray-600 mb-4 sm:mb-6 md:mb-8 font-medium leading-relaxed max-w-xs sm:max-w-sm md:max-w-md mx-auto px-3 sm:px-4 text-xs sm:text-sm md:text-base">
                                Try searching for a different destination or adjust your filters
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm sm:text-base hover:shadow-xl transform hover:scale-105 active:scale-95"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="11" cy="11" r="8"/>
                                    <path d="M21 21l-4.35-4.35"/>
                                </svg>
                                Start New Search
                            </Link>
                        </div>
                    )}

                    {/* Main Content Area with Sidebar */}
                    {(localHotels?.data?.length > 0 || agodaHotels?.length > 0) && (
                        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
                            {/* Sidebar - Filters */}
                            <aside className="w-full lg:w-64 xl:w-72 2xl:w-80 flex-shrink-0">
                                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6 lg:sticky lg:top-24">
                                    <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                                            </svg>
                                            Filters
                                        </h3>
                                        {activeFilterCount > 0 && (
                                            <button
                                                onClick={clearFilters}
                                                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-red-100 text-red-700 hover:bg-red-200 font-semibold rounded-full text-[10px] sm:text-xs transition-all duration-300 transform hover:scale-105"
                                            >
                                                Clear ({activeFilterCount})
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                        {/* Pool Vibe - Matches homepage vibes */}
                                        <div>
                                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 flex items-center gap-1.5 sm:gap-2">
                                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                                                </svg>
                                                Pool Vibe
                                            </h4>
                                            <div className="space-y-1.5 sm:space-y-2">
                                                {[
                                                    { value: 'family', label: 'Families', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, color: 'green' },
                                                    { value: 'quiet', label: 'Quiet & Relaxed', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>, color: 'blue' },
                                                    { value: 'party', label: 'Social & Lively', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 8h10V6H7v2zm0 4h10v-2H7v2zm0 4h7v-2H7v2zm13.5-10.5v13.09c0 .45-.54.67-.85.35l-2.65-2.65-2.65 2.65c-.31.32-.85.1-.85-.35V5.5c0-.83.67-1.5 1.5-1.5h3.5c.83 0 1.5.67 1.5 1.5z"/></svg>, color: 'orange' },
                                                    { value: 'luxury', label: 'Luxury', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: 'purple' },
                                                    { value: 'adults', label: 'Adults Only', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>, color: 'pink' }
                                                ].map(vibe => {
                                                    const isChecked = filters.poolVibe === vibe.value;
                                                    return (
                                                        <label
                                                            key={vibe.value}
                                                            className={`flex items-center gap-2 sm:gap-3 cursor-pointer p-2 sm:p-3 rounded-lg transition-all duration-300 border-2 ${
                                                                isChecked 
                                                                    ? `bg-${vibe.color}-50 border-${vibe.color}-300` 
                                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="poolVibe"
                                                                checked={isChecked}
                                                                onChange={() => toggleFilter('poolVibe', vibe.value)}
                                                                className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 border-gray-300 focus:ring-orange-500"
                                                            />
                                                            <span className={isChecked ? `text-${vibe.color}-600` : 'text-gray-600'}>{vibe.icon}</span>
                                                            <span className="text-xs sm:text-sm font-semibold text-gray-900">{vibe.label}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="border-t-2 border-orange-200"></div>

                                        {/* Pool Features */}
                                        <div>
                                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 flex items-center gap-1.5 sm:gap-2">
                                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M22 6.5c-1.1 0-2.2.3-3 .9-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9v2c.8 0 1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8V6.5z"/>
                                                </svg>
                                                Pool Features
                                            </h4>
                                            <div className="space-y-1.5 sm:space-y-2">
                                                {[
                                                    { value: 'infinity', label: 'Infinity Pool', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6.5c-1.1 0-2.2.3-3 .9-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9v2c.8 0 1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8V6.5z"/></svg>, color: 'blue' },
                                                    { value: 'rooftop', label: 'Rooftop Pool', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>, color: 'purple' },
                                                    { value: 'kids', label: "Kids Pool", icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, color: 'green' },
                                                    { value: 'heated', label: 'Heated Pool', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>, color: 'red' },
                                                    { value: 'pool_bar', label: 'Pool Bar', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z"/></svg>, color: 'orange' },
                                                    { value: 'waterslide', label: 'Waterslide', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/></svg>, color: 'teal' }
                                                ].map(feat => {
                                                    const isChecked = filters.poolFeatures.includes(feat.value);
                                                    return (
                                                        <label
                                                            key={feat.value}
                                                            className={`flex items-center gap-2 sm:gap-3 cursor-pointer p-2 sm:p-3 rounded-lg transition-all duration-300 border-2 ${
                                                                isChecked 
                                                                    ? `bg-${feat.color}-50 border-${feat.color}-300` 
                                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                onChange={() => toggleFilter('poolFeatures', feat.value)}
                                                                className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                                            />
                                                            <span className={isChecked ? `text-${feat.color}-600` : 'text-gray-600'}>{feat.icon}</span>
                                                            <span className="text-xs sm:text-sm font-semibold text-gray-900">{feat.label}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="border-t-2 border-orange-200"></div>

                                        {/* Sunbed Ratio */}
                                        <div>
                                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 flex items-center gap-1.5 sm:gap-2">
                                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-6.18C11.6 5.84 10.3 5 8.86 5 6.75 5 5.06 6.69 5.06 8.8c0 1.66 1.13 3.1 2.68 3.52L3.94 18H2v3h7v-2.78c0-.38.2-.72.52-.88.79-.4 2.39-1.34 3.48-1.34 1.09 0 2.69.94 3.48 1.34.32.16.52.5.52.88V21h7v-3h-1.94l-3.8-5.68C19.87 11.9 21 10.46 21 8.8 21 6.69 19.31 5 17.2 5c-1.44 0-2.74.84-3.96 2.02L13 7.8V7z"/>
                                                </svg>
                                                Sunbed Availability
                                            </h4>
                                            <div className="space-y-1.5 sm:space-y-2">
                                                {[
                                                    { value: 'excellent', label: 'Excellent', sublabel: '70%+ ratio', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: 'green' },
                                                    { value: 'very-good', label: 'Very Good', sublabel: '40%+ ratio', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>, color: 'blue' },
                                                    { value: 'good', label: 'Good', sublabel: '20%+ ratio', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>, color: 'yellow' }
                                                ].map(ratio => {
                                                    const isChecked = filters.sunbedRatio === ratio.value;
                                                    return (
                                                        <label
                                                            key={ratio.value}
                                                            className={`flex items-start gap-2 sm:gap-3 cursor-pointer p-2 sm:p-3 rounded-lg transition-all duration-300 border-2 ${
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
                                                                className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-orange-500 border-gray-300 focus:ring-orange-500"
                                                            />
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-1.5 sm:gap-2">
                                                                    <span className={isChecked ? `text-${ratio.color}-600` : 'text-gray-600'}>{ratio.icon}</span>
                                                                    <span className="text-xs sm:text-sm font-bold text-gray-900">{ratio.label}</span>
                                                                </div>
                                                                <span className="text-[10px] sm:text-xs text-gray-600 font-medium ml-5 sm:ml-7">{ratio.sublabel}</span>
                                                            </div>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </aside>

                            {/* Main Content - Results */}
                            <div className="flex-1 min-w-0">
                                {/* Sorting Bar */}
                                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-orange-200 p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 relative z-10">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                                        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
                                            </svg>
                                            <label htmlFor="sortBy" className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap">
                                                Sort by:
                                            </label>
                                            <select
                                                id="sortBy"
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="flex-1 sm:flex-none px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg text-xs sm:text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 cursor-pointer bg-white transition-all duration-300 hover:border-gray-400"
                                            >
                                                <option value="score">Pool & Sun Score (Highest)</option>
                                                <option value="sunbed">Sunbed Ratio (Best)</option>
                                                <option value="stars">Star Rating (Highest)</option>
                                                <option value="name">Name (A-Z)</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                            <span className="text-xs sm:text-sm font-bold text-gray-900 bg-orange-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-300">
                                                {activeFilterCount > 0 
                                                    ? `${filteredAndSortedHotels.length} of ${localHotels?.total || 0}`
                                                    : `${localHotels?.total || filteredAndSortedHotels.length}`
                                                } hotel{(activeFilterCount > 0 ? filteredAndSortedHotels.length : (localHotels?.total || filteredAndSortedHotels.length)) !== 1 ? 's' : ''}
                                            </span>
                                            {compareList.length > 0 && (
                                                <Link
                                                    href={`/compare?hotels=${compareList.join(',')}`}
                                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap text-xs sm:text-sm"
                                                >
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zM14.99 13v-3H22V8h-7.01V5L11 9l3.99 4z"/>
                                                    </svg>
                                                    Compare {compareList.length}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Hotel Results */}
                                {filteredAndSortedHotels.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
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
                                ) : activeFilterCount > 0 ? (
                                    <div className="text-center py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white rounded-xl sm:rounded-2xl border-2 border-gray-100 transition-all duration-500 animate-fadeIn">
                                        <div className="relative inline-block mb-4 sm:mb-6">
                                            <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                            </svg>
                                            <div className="absolute -top-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                            No matches for these filters
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 max-w-sm mx-auto px-4 leading-relaxed">
                                            None of the {localHotels?.total || 0} hotels in this area match your current filter combination. Try adjusting or clearing your filters.
                                        </p>
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                            <button
                                                onClick={clearFilters}
                                                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                                </svg>
                                                Clear All Filters
                                            </button>
                                            <Link
                                                href="/"
                                                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-orange-400 hover:text-orange-600 transition-all duration-300 text-sm sm:text-base"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                                </svg>
                                                New Search
                                            </Link>
                                        </div>
                                    </div>
                                ) : null}

                                {/* Pagination */}
                                {localHotels?.links?.length > 3 && (
                                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <p className="text-sm text-gray-600">
                                            Showing <span className="font-semibold text-gray-900">{localHotels.from}</span> to{' '}
                                            <span className="font-semibold text-gray-900">{localHotels.to}</span> of{' '}
                                            <span className="font-semibold text-gray-900">{localHotels.total}</span> results
                                        </p>
                                        <div className="flex gap-1 flex-wrap justify-center">
                                            {localHotels.links.map((link, index) => (
                                                link.url ? (
                                                    <Link
                                                        key={index}
                                                        href={link.url}
                                                        preserveScroll
                                                        className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                                                            link.active
                                                                ? 'bg-orange-500 text-white shadow-md'
                                                                : 'text-gray-700 hover:bg-orange-50 border border-gray-200'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ) : (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-2 text-sm text-gray-400"
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                )
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
}

function HotelCard({ hotel, isInCompare, onToggleCompare, isHotelier }) {
    const canClaim = isHotelier && !hotel.owned_by && !hotel.has_pending_claim;
    const isPremium = hotel.is_premium;
    const isAgoda = hotel.is_agoda;

    // Use <a> for Agoda (external link) or <Link> for local hotels
    const LinkOrA = isAgoda
        ? ({ children, className }) => (
            <a href={hotel.landing_url || '#'} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
        )
        : ({ children, className }) => (
            <Link href={`/hotels/${hotel.slug}`} className={className}>{children}</Link>
        );

    // Premium hotels get larger, more prominent cards
    const cardClasses = isPremium 
        ? "bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl rounded-lg relative group border-4 border-gradient-to-r from-yellow-400 to-orange-500 shadow-xl ring-2 ring-yellow-300"
        : "bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl rounded-lg relative group";
    
    const imageAspect = isPremium ? "aspect-[16/10]" : "aspect-[4/3]";

    return (
        <div className={cardClasses}>
            <LinkOrA className="block">
                <div className={`relative overflow-hidden ${imageAspect}`}>
                    <img
                        src={hotel.main_image_url || hotel.main_image || '/images/default-hotel.jpg'}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Estimated badge for Agoda */}
                    {isAgoda && (
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-blue-500/90 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold text-[10px] sm:text-xs shadow-lg z-10">
                            Estimated
                        </div>
                    )}
                    
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
                        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-yellow-500/90 backdrop-blur-sm text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-semibold text-center">
                            🔒 Claim under review
                        </div>
                    )}
                    {hotel.owned_by && (
                        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-green-500/90 backdrop-blur-sm text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-semibold text-center flex items-center justify-center gap-1">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified Owner
                        </div>
                    )}
                </div>
                <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-white">
                    <h3 className="font-serif-luxury text-base sm:text-lg md:text-xl lg:text-2xl font-light text-neutral-900 mb-1 sm:mb-1.5 md:mb-2">{hotel.name}</h3>
                    <p className="text-[10px] sm:text-xs text-neutral-500 mb-3 sm:mb-4 md:mb-5 font-light tracking-wide uppercase">{hotel.destination?.name}</p>
                    
                    {hotel.pool_criteria && (
                        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                            {hotel.pool_criteria.sunbed_to_guest_ratio && (
                                <div className="flex items-center justify-between">
                                    <span className="text-neutral-600 font-light text-xs sm:text-sm">Sunbed Ratio:</span>
                                    <span className="font-normal text-neutral-900 text-xs sm:text-sm">
                                        {hotel.pool_criteria.sunbed_to_guest_ratio}:1
                                    </span>
                                </div>
                            )}
                            
                            {/* Atmosphere Badge */}
                            {hotel.pool_criteria.atmosphere && (
                                <div className="flex items-center justify-between">
                                    <span className="text-neutral-600 font-light text-xs sm:text-sm">Atmosphere:</span>
                                    <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-purple-100 text-purple-700 rounded-full font-semibold capitalize text-[10px] sm:text-xs">
                                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                        </svg>
                                        {hotel.pool_criteria.atmosphere}
                                    </span>
                                </div>
                            )}
                            
                            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                                {hotel.pool_criteria.has_infinity_pool && (
                                    <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 bg-neutral-50 text-neutral-700 border border-neutral-200 font-light tracking-wide text-[9px] sm:text-[10px]">∞ Pool</span>
                                )}
                                {hotel.pool_criteria.has_kids_pool && (
                                    <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 bg-neutral-50 text-neutral-700 border border-neutral-200 font-light tracking-wide text-[9px] sm:text-[10px]">Kids Pool</span>
                                )}
                                {hotel.pool_criteria.is_adults_only && (
                                    <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 bg-neutral-50 text-neutral-700 border border-neutral-200 font-light tracking-wide text-[9px] sm:text-[10px]">Adults Only</span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Agoda price + book section */}
                    {isAgoda && (
                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                            {hotel.price ? (
                                <div>
                                    <span className="text-xs text-gray-500">from </span>
                                    <span className="text-sm font-bold text-gray-900">
                                        {hotel.currency === 'USD' ? '$' : hotel.currency}{Math.round(hotel.price)}
                                    </span>
                                    <span className="text-[10px] text-gray-500">/night</span>
                                </div>
                            ) : (
                                <span className="text-xs text-gray-400">Check price</span>
                            )}
                            <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                                Book on Agoda
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </span>
                        </div>
                    )}
                </div>
            </LinkOrA>
            
            {/* Action buttons container */}
            <div className={`absolute ${isAgoda ? 'top-12 sm:top-14' : 'top-2 sm:top-3 md:top-4'} left-2 sm:left-3 md:left-4 flex gap-1.5 sm:gap-2`}>
                {/* Compare Button */}
                <button
                    onClick={onToggleCompare}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-300 shadow-lg text-xs sm:text-sm font-semibold ${
                        isInCompare 
                            ? 'bg-neutral-900 text-white' 
                            : 'bg-white/90 text-neutral-700 hover:bg-white'
                    }`}
                >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isInCompare ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        )}
                    </svg>
                    <span className="hidden xs:inline sm:inline">Compare</span>
                </button>

                {/* Claim Hotel Button (Hotelier Only) */}
                {canClaim && !isAgoda && (
                    <Link
                        href={`/hotelier/hotels/${hotel.slug}/claim`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-300 shadow-lg bg-orange-500 text-white hover:bg-orange-600 text-xs sm:text-sm font-semibold"
                    >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="hidden xs:inline sm:inline">Claim</span>
                    </Link>
                )}
            </div>
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

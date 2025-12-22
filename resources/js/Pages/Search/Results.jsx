import { Link, Head } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import Header from '@/Components/Header';

export default function SearchResults({ searchParams, localHotels, amadeusHotels, amadeusError, hasResults }) {
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

        // Apply sorting
        filtered.sort((a, b) => {
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
            
            <div className="min-h-screen bg-neutral-50 font-sans-luxury">
                <Header />

                {/* Search Summary */}
                <div className="bg-white border-b border-neutral-200">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                            <div className="w-full sm:w-auto">
                                <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-neutral-900 leading-tight">
                                    {searchParams.destination ? `Hotels in ${searchParams.destination}` : 'Search Results'}
                                </h1>
                                {searchParams.checkIn && searchParams.checkOut && (
                                    <p className="text-neutral-600 mt-2 sm:mt-3 font-light tracking-wide text-sm sm:text-base">
                                        {new Date(searchParams.checkIn).toLocaleDateString()} - {new Date(searchParams.checkOut).toLocaleDateString()}
                                        {searchParams.guests && ` · ${searchParams.guests} guest${searchParams.guests > 1 ? 's' : ''}`}
                                    </p>
                                )}
                                {searchParams.poolVibe && (
                                    <span className="inline-block mt-3 px-3 sm:px-4 py-1 sm:py-1.5 bg-neutral-100 text-neutral-700 rounded-full text-xs font-normal tracking-wide">
                                        {getVibeLabel(searchParams.poolVibe)}
                                    </span>
                                )}
                            </div>
                            <Link
                                href="/"
                                className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-300 text-sm font-normal tracking-wide text-neutral-700 text-center whitespace-nowrap"
                            >
                                ← Modify Search
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                    {!hasResults && (
                        <div className="text-center py-12 sm:py-16 md:py-20">
                            <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🏖️</div>
                            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-light text-neutral-900 mb-3 sm:mb-4 px-4">No hotels found</h2>
                            <p className="text-neutral-600 mb-6 sm:mb-8 font-light leading-relaxed max-w-xs sm:max-w-md mx-auto px-4 text-sm sm:text-base">
                                Try searching for a different destination or adjust your filters
                            </p>
                            <Link
                                href="/"
                                className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-neutral-900 text-white font-normal rounded-xl hover:bg-neutral-800 transition-all duration-300 tracking-wide uppercase text-xs sm:text-sm hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                            >
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
                                <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4 sm:p-5 md:p-6 lg:sticky lg:top-24">
                                    <div className="flex items-center justify-between mb-5 sm:mb-6">
                                        <h3 className="font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 tracking-tight">Filters</h3>
                                        {activeFilterCount > 0 && (
                                            <button
                                                onClick={clearFilters}
                                                className="text-[10px] sm:text-xs text-neutral-600 hover:text-neutral-900 font-normal tracking-wide uppercase transition-colors duration-300"
                                            >
                                                Clear ({activeFilterCount})
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-5 sm:space-y-6">
                                        {/* Pool Types */}
                                        <div>
                                            <h4 className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-neutral-500 mb-3 sm:mb-4">Pool Type</h4>
                                            <div className="space-y-1.5 sm:space-y-2">
                                                {[
                                                    { value: 'infinity', label: 'Infinity Pool', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12c0 0 3-6 6-6s3 6 6 6 3-6 6-6 6 6 6 6M2 18c0 0 3-6 6-6s3 6 6 6 3-6 6-6 6 6 6 6"/></svg> },
                                                    { value: 'rooftop', label: 'Rooftop Pool', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h.01M15 17h.01"/></svg> },
                                                    { value: 'kids', label: 'Kids Pool', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="7" r="3"/><path d="M3 21v-4a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4M16 11l2 2 4-4"/></svg> },
                                                    { value: 'adults', label: 'Adults Only', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
                                                ].map(type => (
                                                    <label
                                                        key={type.value}
                                                        className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-neutral-50 p-2 sm:p-2.5 rounded-lg transition-all duration-300"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={filters.poolTypes.includes(type.value)}
                                                            onChange={() => toggleFilter('poolTypes', type.value)}
                                                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-500"
                                                        />
                                                        <span className="text-neutral-600">{type.icon}</span>
                                                        <span className="text-xs sm:text-sm text-neutral-700 font-light">{type.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="border-t border-neutral-100"></div>

                                        {/* Sunbed Ratio */}
                                        <div>
                                            <h4 className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-neutral-500 mb-3 sm:mb-4">Sunbed Availability</h4>
                                            <div className="space-y-1.5 sm:space-y-2">
                                                {[
                                                    { value: 'excellent', label: 'Excellent', sublabel: '1:1 or better', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z"/></svg> },
                                                    { value: 'very-good', label: 'Very Good', sublabel: '0.75:1+', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/></svg> },
                                                    { value: 'good', label: 'Good', sublabel: '0.5:1+', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> }
                                                ].map(ratio => (
                                                    <label
                                                        key={ratio.value}
                                                        className="flex items-start gap-2 sm:gap-3 cursor-pointer hover:bg-neutral-50 p-2 sm:p-2.5 rounded-lg transition-all duration-300"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="sunbedRatio"
                                                            checked={filters.sunbedRatio === ratio.value}
                                                            onChange={() => toggleFilter('sunbedRatio', ratio.value)}
                                                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 sm:mt-1 text-neutral-900 border-neutral-300 focus:ring-neutral-500"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                                <span className="text-neutral-600">{ratio.icon}</span>
                                                                <span className="text-xs sm:text-sm font-normal text-neutral-900">{ratio.label}</span>
                                                            </div>
                                                            <span className="text-[10px] sm:text-xs text-neutral-500 font-light ml-6 sm:ml-7">{ratio.sublabel}</span>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="border-t border-neutral-100"></div>

                                        {/* Atmosphere */}
                                        <div>
                                            <h4 className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-neutral-500 mb-3 sm:mb-4">Atmosphere</h4>
                                            <div className="space-y-1.5 sm:space-y-2">
                                                {[
                                                    { value: 'quiet', label: 'Quiet & Peaceful', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
                                                    { value: 'family', label: 'Family Friendly', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                                                    { value: 'lively', label: 'Lively & Social', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/><circle cx="12" cy="12" r="2"/></svg> },
                                                    { value: 'party', label: 'Party Atmosphere', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h16M12 4v16"/><circle cx="12" cy="12" r="9"/><path d="M8 8l8 8M16 8l-8 8"/></svg> }
                                                ].map(atm => (
                                                    <label
                                                        key={atm.value}
                                                        className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-neutral-50 p-2 sm:p-2.5 rounded-lg transition-all duration-300"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="atmosphere"
                                                            checked={filters.atmosphere === atm.value}
                                                            onChange={() => toggleFilter('atmosphere', atm.value)}
                                                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-900 border-neutral-300 focus:ring-neutral-500"
                                                        />
                                                        <span className="text-neutral-600">{atm.icon}</span>
                                                        <span className="text-xs sm:text-sm text-neutral-700 font-light">{atm.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="border-t border-neutral-100"></div>

                                        {/* Budget - Placeholder */}
                                        <div>
                                            <h4 className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-neutral-500 mb-3 sm:mb-4">Budget</h4>
                                            <div className="space-y-1.5 sm:space-y-2">
                                                {[
                                                    { value: 'budget', label: 'Budget Friendly', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6"/></svg> },
                                                    { value: 'mid', label: 'Mid Range', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z"/><circle cx="12" cy="12" r="3"/></svg> },
                                                    { value: 'luxury', label: 'Luxury', icon: <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z"/></svg> }
                                                ].map(budget => (
                                                    <label
                                                        key={budget.value}
                                                        className="flex items-center gap-2 sm:gap-3 cursor-not-allowed opacity-40 p-2 sm:p-2.5 rounded-lg"
                                                        title="Coming soon with affiliate pricing"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="budget"
                                                            disabled
                                                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-900 border-neutral-300 focus:ring-neutral-500"
                                                        />
                                                        <span className="text-neutral-600">{budget.icon}</span>
                                                        <span className="text-xs sm:text-sm text-neutral-700 font-light">{budget.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <p className="text-[10px] sm:text-xs text-neutral-500 mt-2 sm:mt-3 italic font-light">Coming soon with live pricing</p>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            {/* Main Content - Results */}
                            <div className="flex-1 min-w-0">
                                {/* Sorting Bar */}
                                <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 md:mb-8 relative z-10">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                                        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                                            <label htmlFor="sortBy" className="text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase text-neutral-500 whitespace-nowrap">
                                                Sort by:
                                            </label>
                                            <select
                                                id="sortBy"
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-700 font-light focus:ring-2 focus:ring-neutral-500 focus:border-neutral-900 cursor-pointer relative z-20 bg-white transition-all duration-300"
                                            >
                                                <option value="score">Pool & Sun Score (Highest)</option>
                                                <option value="price">Price (Low to High)</option>
                                                <option value="distance">Distance to Beach</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                            <span className="text-xs sm:text-sm text-neutral-600 font-light">
                                                {filteredAndSortedHotels.length} hotel{filteredAndSortedHotels.length !== 1 ? 's' : ''}
                                            </span>
                                            {compareList.length > 0 && (
                                                <Link
                                                    href={`/compare?hotels=${compareList.join(',')}`}
                                                    className="px-4 sm:px-6 py-2 sm:py-2.5 bg-neutral-900 text-white font-normal rounded-xl hover:bg-neutral-800 transition-all duration-300 text-xs sm:text-sm tracking-wide uppercase hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                                                >
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

function HotelCard({ hotel, isInCompare, onToggleCompare }) {
    return (
        <div className="bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl rounded-lg relative group">
            <Link href={`/hotels/${hotel.slug}`} className="block">
                <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                        src={hotel.main_image || '/images/default-hotel.jpg'}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {hotel.overall_score && (
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur-sm text-neutral-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-light tracking-wider text-xs sm:text-sm shadow-lg">
                            {hotel.overall_score}/10
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
            
            {/* Compare Checkbox */}
            <button
                onClick={onToggleCompare}
                className={`absolute top-3 sm:top-4 left-3 sm:left-4 p-2 rounded-lg transition-all duration-300 shadow-lg ${
                    isInCompare 
                        ? 'bg-neutral-900 text-white' 
                        : 'bg-white/90 text-neutral-700 hover:bg-white'
                }`}
                title={isInCompare ? 'Remove from comparison' : 'Add to comparison'}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isInCompare ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    )}
                </svg>
            </button>
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

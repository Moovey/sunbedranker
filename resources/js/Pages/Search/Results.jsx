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
            
            <div className="min-h-screen bg-gray-50">
                <Header />

                {/* Search Summary */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {searchParams.destination ? `Hotels in ${searchParams.destination}` : 'Search Results'}
                                </h1>
                                {searchParams.checkIn && searchParams.checkOut && (
                                    <p className="text-gray-600 mt-1">
                                        {new Date(searchParams.checkIn).toLocaleDateString()} - {new Date(searchParams.checkOut).toLocaleDateString()}
                                        {searchParams.guests && ` · ${searchParams.guests} guest${searchParams.guests > 1 ? 's' : ''}`}
                                    </p>
                                )}
                                {searchParams.poolVibe && (
                                    <span className="inline-block mt-2 px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                                        {getVibeLabel(searchParams.poolVibe)}
                                    </span>
                                )}
                            </div>
                            <Link
                                href="/"
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                ← Modify Search
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {!hasResults && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🏖️</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">No hotels found</h2>
                            <p className="text-gray-600 mb-6">
                                Try searching for a different destination or adjust your filters
                            </p>
                            <Link
                                href="/"
                                className="inline-block px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700"
                            >
                                Start New Search
                            </Link>
                        </div>
                    )}

                    {/* Amadeus Error Message */}
                    {amadeusError && (
                        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-yellow-800">{amadeusError}</p>
                        </div>
                    )}

                    {/* Main Content Area with Sidebar */}
                    {localHotels && localHotels.length > 0 && (
                        <div className="flex gap-8">
                            {/* Sidebar - Filters */}
                            <aside className="w-80 flex-shrink-0">
                                <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                                        {activeFilterCount > 0 && (
                                            <button
                                                onClick={clearFilters}
                                                className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                                            >
                                                Clear ({activeFilterCount})
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        {/* Pool Types */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Pool Type</h4>
                                            <div className="space-y-2">
                                                {[
                                                    { value: 'infinity', label: 'Infinity Pool', icon: '∞' },
                                                    { value: 'rooftop', label: 'Rooftop Pool', icon: '🏙️' },
                                                    { value: 'kids', label: 'Kids Pool', icon: '🧒' },
                                                    { value: 'adults', label: 'Adults Only', icon: '🍸' }
                                                ].map(type => (
                                                    <label
                                                        key={type.value}
                                                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={filters.poolTypes.includes(type.value)}
                                                            onChange={() => toggleFilter('poolTypes', type.value)}
                                                            className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                                                        />
                                                        <span className="text-lg">{type.icon}</span>
                                                        <span className="text-sm text-gray-700">{type.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200"></div>

                                        {/* Sunbed Ratio */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Sunbed Availability</h4>
                                            <div className="space-y-2">
                                                {[
                                                    { value: 'excellent', label: 'Excellent', sublabel: '1:1 or better', icon: '🏖️' },
                                                    { value: 'very-good', label: 'Very Good', sublabel: '0.75:1+', icon: '✨' },
                                                    { value: 'good', label: 'Good', sublabel: '0.5:1+', icon: '👍' }
                                                ].map(ratio => (
                                                    <label
                                                        key={ratio.value}
                                                        className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="sunbedRatio"
                                                            checked={filters.sunbedRatio === ratio.value}
                                                            onChange={() => toggleFilter('sunbedRatio', ratio.value)}
                                                            className="w-4 h-4 mt-1 text-sky-600 border-gray-300 focus:ring-sky-500"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-lg">{ratio.icon}</span>
                                                                <span className="text-sm font-medium text-gray-900">{ratio.label}</span>
                                                            </div>
                                                            <span className="text-xs text-gray-500">{ratio.sublabel}</span>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200"></div>

                                        {/* Atmosphere */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Atmosphere</h4>
                                            <div className="space-y-2">
                                                {[
                                                    { value: 'quiet', label: 'Quiet & Peaceful', icon: '🧘' },
                                                    { value: 'family', label: 'Family Friendly', icon: '👨‍👩‍👧‍👦' },
                                                    { value: 'lively', label: 'Lively & Social', icon: '🎉' },
                                                    { value: 'party', label: 'Party Atmosphere', icon: '🎊' }
                                                ].map(atm => (
                                                    <label
                                                        key={atm.value}
                                                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="atmosphere"
                                                            checked={filters.atmosphere === atm.value}
                                                            onChange={() => toggleFilter('atmosphere', atm.value)}
                                                            className="w-4 h-4 text-sky-600 border-gray-300 focus:ring-sky-500"
                                                        />
                                                        <span className="text-lg">{atm.icon}</span>
                                                        <span className="text-sm text-gray-700">{atm.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200"></div>

                                        {/* Budget - Placeholder */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Budget</h4>
                                            <div className="space-y-2">
                                                {[
                                                    { value: 'budget', label: 'Budget Friendly', icon: '💰' },
                                                    { value: 'mid', label: 'Mid Range', icon: '💎' },
                                                    { value: 'luxury', label: 'Luxury', icon: '✨' }
                                                ].map(budget => (
                                                    <label
                                                        key={budget.value}
                                                        className="flex items-center gap-3 cursor-not-allowed opacity-50 p-2 rounded-lg"
                                                        title="Coming soon with affiliate pricing"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="budget"
                                                            disabled
                                                            className="w-4 h-4 text-sky-600 border-gray-300 focus:ring-sky-500"
                                                        />
                                                        <span className="text-lg">{budget.icon}</span>
                                                        <span className="text-sm text-gray-700">{budget.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-3 italic">Coming soon with live pricing</p>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            {/* Main Content - Results */}
                            <div className="flex-1 min-w-0">
                                {/* Sorting Bar */}
                                <div className="bg-white rounded-lg shadow-md p-4 mb-6 relative z-10">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div className="flex items-center gap-3">
                                            <label htmlFor="sortBy" className="text-sm font-semibold text-gray-700">
                                                Sort by:
                                            </label>
                                            <select
                                                id="sortBy"
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 cursor-pointer relative z-20"
                                            >
                                                <option value="score">Pool & Sun Score (Highest)</option>
                                                <option value="price">Price (Low to High)</option>
                                                <option value="distance">Distance to Beach</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm text-gray-600">
                                                {filteredAndSortedHotels.length} hotel{filteredAndSortedHotels.length !== 1 ? 's' : ''}
                                            </span>
                                            {compareList.length > 0 && (
                                                <Link
                                                    href={`/compare?hotels=${compareList.join(',')}`}
                                                    className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition text-sm"
                                                >
                                                    Compare {compareList.length}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Hotel Results */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                💰 Hotels with Live Prices
                            </h2>
                            <div className="space-y-4">
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
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden relative">
            <Link href={`/hotels/${hotel.slug}`} className="block">
                <div className="relative">
                    <img
                        src={hotel.main_image || '/images/default-hotel.jpg'}
                        alt={hotel.name}
                        className="w-full h-48 object-cover"
                    />
                    {hotel.overall_score && (
                        <div className="absolute top-3 right-3 bg-sky-600 text-white px-3 py-1 rounded-lg font-bold">
                            {hotel.overall_score}/10
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{hotel.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{hotel.destination?.name}</p>
                    
                    {hotel.pool_criteria && (
                        <div className="space-y-2 text-sm">
                            {hotel.pool_criteria.sunbed_to_guest_ratio && (
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Sunbed Ratio:</span>
                                    <span className="font-semibold text-gray-900">
                                        {hotel.pool_criteria.sunbed_to_guest_ratio}:1
                                    </span>
                                </div>
                            )}
                            <div className="flex gap-2 flex-wrap mt-3">
                                {hotel.pool_criteria.has_infinity_pool && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Infinity Pool</span>
                                )}
                                {hotel.pool_criteria.has_kids_pool && (
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Kids Pool</span>
                                )}
                                {hotel.pool_criteria.is_adults_only && (
                                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Adults Only</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Link>
            
            {/* Compare Checkbox */}
            <button
                onClick={onToggleCompare}
                className={`absolute top-3 left-3 p-2 rounded-lg transition ${
                    isInCompare 
                        ? 'bg-sky-600 text-white' 
                        : 'bg-white/90 text-gray-700 hover:bg-white'
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
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                    {hotel.cityCode && (
                        <p className="text-sm text-gray-600 mb-2">{hotel.cityCode}</p>
                    )}
                    
                    {hotel.rating && (
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex">
                                {[...Array(parseInt(hotel.rating))].map((_, i) => (
                                    <span key={i} className="text-yellow-400">★</span>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">{hotel.rating} stars</span>
                        </div>
                    )}
                </div>
                
                {lowestOffer && (
                    <div className="text-right ml-4">
                        <div className="text-sm text-gray-600">from</div>
                        <div className="text-3xl font-bold text-sky-600">
                            {lowestOffer.price.currency} {lowestOffer.price.total}
                        </div>
                        <div className="text-sm text-gray-600">per stay</div>
                        <a
                            href={lowestOffer.self || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-block px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition"
                        >
                            View Deal
                        </a>
                    </div>
                )}
            </div>
            
            {lowestOffer?.room && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700">
                        <strong>Room:</strong> {lowestOffer.room.typeEstimated?.category || 'Standard'}
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

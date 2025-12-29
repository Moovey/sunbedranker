import { Link, Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from '@/Components/Header';

export default function Home({ featuredDestinations, topRatedHotels, familyFriendlyHotels, quietSunHotels }) {
    const [searchData, setSearchData] = useState({
        destination: '',
        checkIn: '',
        checkOut: '',
        poolVibe: '',
        guests: 2
    });
    const [isSearching, setIsSearching] = useState(false);
    
    // Auto-rotating background images from Unsplash
    const backgroundImages = [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80', // Luxury pool
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80', // Resort pool
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80', // Hotel pool view
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80', // Infinity pool
        'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=1920&q=80', // Rooftop pool
    ];
    
    const [currentBgIndex, setCurrentBgIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 6000); // Change every 6 seconds
        
        return () => clearInterval(interval);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        
        if (!searchData.destination) {
            alert('Please enter a destination');
            return;
        }

        setIsSearching(true);
        
        // Submit search to backend
        router.get('/search', searchData, {
            onFinish: () => setIsSearching(false)
        });
    };

    return (
        <>
            <Head title="Find the Best Hotel Pools & Sunbeds">
                <meta name="agd-partner-manual-verification" />
            </Head>
            
            <div className="min-h-screen bg-white font-sans-luxury">
                <Header />

                {/* Hero Section - Fully Responsive */}
                <div className="relative h-screen min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden">
                    {/* Auto-rotating background images */}
                    {backgroundImages.map((image, index) => (
                        <div
                            key={index}
                            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                            style={{
                                opacity: currentBgIndex === index ? 1 : 0,
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    ))}
                    
                    {/* Dark overlay - responsive opacity */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75 sm:from-black/60 sm:via-black/50 sm:to-black/70" />
                    
                    {/* Decorative luxury accents - responsive positioning */}
                    <div className="absolute top-16 right-8 md:top-20 md:right-10 xl:top-24 xl:right-16 opacity-8 md:opacity-10 hidden lg:block">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="md:w-20 md:h-20 xl:w-24 xl:h-24">
                            <path d="M30 5L32 26L53 30L32 34L30 55L28 34L7 30L28 26L30 5Z" stroke="white" strokeWidth="1" />
                            <circle cx="30" cy="30" r="22" stroke="white" strokeWidth="0.5" opacity="0.5" />
                        </svg>
                    </div>
                    
                    <div className="relative h-full flex items-center justify-center py-20 sm:py-24 md:py-28 lg:py-32">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full">
                            <div className="text-center animate-fade-up">
                                {/* Compact luxury icon - responsive sizing */}
                                <div className="flex justify-center mb-3 sm:mb-4 md:mb-5">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="sm:w-8 sm:h-8 md:w-9 md:h-9 text-white opacity-80">
                                        <path d="M14 2L15.5 11.5L25 14L15.5 16.5L14 26L12.5 16.5L3 14L12.5 11.5L14 2Z" stroke="currentColor" strokeWidth="1.5"/>
                                        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
                                    </svg>
                                </div>
                                
                                {/* Responsive heading */}
                                <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight mb-3 sm:mb-4 md:mb-5 leading-tight text-white px-2">
                                    Will You Struggle to <br className="hidden sm:block" />Get a Sunbed?
                                </h1>
                                
                                {/* Responsive description */}
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-10 text-white/90 font-light max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
                                    Compare hotels by pool quality, sunbed availability, and sun exposure.
                                </p>
                                
                                {/* Compact Search Bar - Fully Responsive */}
                                <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-2">
                                    <div className="bg-white/95 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-7 lg:p-8 border border-white/30">
                                        <form onSubmit={handleSearch}>
                                            {/* Search input and button */}
                                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                                {/* Compact Destination Input */}
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={searchData.destination}
                                                        onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                                                        placeholder="Where to? (e.g., Tenerife)"
                                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5 border-b-2 border-neutral-200 focus:border-neutral-900 outline-none text-neutral-900 placeholder-neutral-400 transition-all duration-300 bg-transparent text-sm sm:text-base"
                                                    />
                                                </div>

                                                {/* Compact Search Button */}
                                                <button
                                                    type="submit"
                                                    disabled={isSearching}
                                                    className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 bg-neutral-900 text-white font-normal rounded-lg sm:rounded-xl hover:bg-neutral-800 transition-all duration-300 disabled:bg-neutral-400 disabled:cursor-not-allowed tracking-wide uppercase text-xs sm:text-sm hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                                                >
                                                    {isSearching ? 'Searching...' : 'Search'}
                                                </button>
                                            </div>

                                            {/* Compact Pool Filters - Responsive */}
                                            <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-neutral-200">
                                                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-2.5">
                                                    {[
                                                        { value: 'family', label: 'Families', shortLabel: 'Family', icon: <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                                                        { value: 'quiet', label: 'Quiet', shortLabel: 'Quiet', icon: <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
                                                        { value: 'party', label: 'Social', shortLabel: 'Social', icon: <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/></svg> },
                                                        { value: 'luxury', label: 'Luxury', shortLabel: 'Luxury', icon: <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z"/></svg> },
                                                        { value: 'adults', label: 'Adults Only', shortLabel: 'Adults', icon: <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
                                                    ].map((vibe) => (
                                                        <button
                                                            key={vibe.value}
                                                            type="button"
                                                            onClick={() => setSearchData({
                                                                ...searchData, 
                                                                poolVibe: searchData.poolVibe === vibe.value ? '' : vibe.value
                                                            })}
                                                            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-normal transition-all duration-300 border ${
                                                                searchData.poolVibe === vibe.value 
                                                                    ? 'bg-neutral-900 text-white border-neutral-900' 
                                                                    : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200'
                                                            }`}
                                                        >
                                                            {vibe.icon}
                                                            <span className="hidden xs:inline sm:inline">{vibe.label}</span>
                                                            <span className="inline xs:hidden sm:hidden">{vibe.shortLabel}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Scroll indicator - responsive */}
                    <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>

                {/* Featured Destinations */}
                {featuredDestinations?.length > 0 && (
                    <section className="bg-neutral-50 py-12 sm:py-16 md:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {/* Section accent */}
                            <div className="flex items-center justify-center mb-6">
                                <div className="h-px w-12 bg-neutral-300"></div>
                                <svg className="mx-4 text-neutral-400" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2L11.5 8.5L18 10L11.5 11.5L10 18L8.5 11.5L2 10L8.5 8.5L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
                                </svg>
                                <div className="h-px w-12 bg-neutral-300"></div>
                            </div>
                            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 mb-8 sm:mb-10 md:mb-12 tracking-tight text-center">Popular Destinations</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                                {featuredDestinations.map((destination, index) => (
                                    <Link
                                        key={destination.id}
                                        href={`/destinations/${destination.slug}`}
                                        className="group relative overflow-hidden rounded-lg sm:rounded-none shadow-md sm:shadow-sm hover:shadow-2xl transition-all duration-500 animate-fade-up"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="relative overflow-hidden aspect-[4/5]">
                                            <img
                                                src={destination.image || '/images/default-destination.jpg'}
                                                alt={destination.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                                            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light tracking-wide mb-1 sm:mb-2">{destination.name}</h3>
                                            <p className="text-neutral-200 font-light text-xs sm:text-sm tracking-wide">{destination.hotel_count} hotels with pool ratings</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Top Rated Hotels */}
                {topRatedHotels?.length > 0 && (
                    <section className="bg-white py-12 sm:py-16 md:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-10 md:mb-12 gap-4">
                                <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 tracking-tight">Highest Rated<br className="hidden sm:block" /> Pool Experiences</h2>
                                <Link href="/destinations" className="text-neutral-600 hover:text-neutral-900 font-light tracking-[0.1em] uppercase text-xs transition-colors duration-400 group border-b border-neutral-300 hover:border-neutral-900 pb-1">
                                    View all <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
                                {topRatedHotels.map((hotel) => (
                                    <HotelCard key={hotel.id} hotel={hotel} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Best for Families */}
                {familyFriendlyHotels?.length > 0 && (
                    <section className="bg-neutral-50 py-12 sm:py-16 md:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 mb-8 sm:mb-10 md:mb-12 tracking-tight">Best for Families</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                                {familyFriendlyHotels.map((hotel) => (
                                    <HotelCard key={hotel.id} hotel={hotel} scoreType="family" />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Quiet Sun */}
                {quietSunHotels?.length > 0 && (
                    <section className="bg-white py-12 sm:py-16 md:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 mb-8 sm:mb-10 md:mb-12 tracking-tight">Best for Quiet Sun</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                                {quietSunHotels.map((hotel) => (
                                    <HotelCard key={hotel.id} hotel={hotel} scoreType="quiet" />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Key Questions Section */}
                <section className="bg-neutral-50 py-12 sm:py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 mb-10 sm:mb-12 md:mb-14 text-center tracking-tight px-4">
                            We Answer the Questions<br className="hidden sm:block" /> That Really Matter
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                            {[
                                { 
                                    icon: <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, 
                                    question: 'Will I struggle to get a sunbed?', 
                                    answer: 'We show sunbed-to-guest ratios' 
                                },
                                { 
                                    icon: <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/></svg>, 
                                    question: 'Is the pool sunny all day?', 
                                    answer: 'Sun exposure times and coverage' 
                                },
                                { 
                                    icon: <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 5L6 9l5 4-5 4 5 4M13 5l5 4-5 4 5 4-5 4"/></svg>, 
                                    question: 'Is it quiet or noisy?', 
                                    answer: 'Atmosphere ratings and music levels' 
                                },
                                { 
                                    icon: <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, 
                                    question: 'Is it good for families?', 
                                    answer: 'Kids pools, activities, and safety' 
                                },
                            ].map((item, index) => (
                                <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                                    <div className="flex justify-center mb-6 text-neutral-700">{item.icon}</div>
                                    <h3 className="font-serif-luxury text-xl mb-4 text-neutral-900">{item.question}</h3>
                                    <p className="text-neutral-600 font-light leading-relaxed text-sm">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

function HotelCard({ hotel, scoreType = 'overall' }) {
    const score = scoreType === 'family' ? hotel.family_score 
                : scoreType === 'quiet' ? hotel.quiet_score
                : hotel.overall_score;

    return (
        <Link
            href={`/hotels/${hotel.slug}`}
            className="group bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl rounded-lg sm:rounded-none"
        >
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={hotel.main_image || '/images/default-hotel.jpg'}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {score && (
                    <div className="absolute top-3 sm:top-4 md:top-5 right-3 sm:right-4 md:right-5 bg-white/95 backdrop-blur-sm text-neutral-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-light tracking-wider text-xs sm:text-sm shadow-lg">
                        {score}/10
                    </div>
                )}
                {hotel.is_featured && (
                    <div className="absolute top-3 sm:top-4 md:top-5 left-3 sm:left-4 md:left-5 bg-neutral-900 text-white px-3 sm:px-4 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-normal tracking-[0.15em] uppercase flex items-center gap-1.5">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                            <path d="M6 1L7 5L11 6L7 7L6 11L5 7L1 6L5 5L6 1Z" stroke="currentColor" strokeWidth="1"/>
                        </svg>
                        Featured
                    </div>
                )}
            </div>
            <div className="p-4 sm:p-5 md:p-6 bg-white">
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 mb-1.5 sm:mb-2">{hotel.name}</h3>
                <p className="text-xs text-neutral-500 mb-4 sm:mb-5 font-light tracking-wide uppercase">{hotel.destination?.name}</p>
                
                {hotel.pool_criteria && (
                    <div className="flex flex-wrap gap-2 text-[9px] sm:text-[10px] text-neutral-600 mb-4 sm:mb-5">
                        {hotel.pool_criteria.has_infinity_pool && <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-neutral-50 text-neutral-700 border border-neutral-200 font-light tracking-wide">∞ Pool</span>}
                        {hotel.pool_criteria.has_rooftop_pool && <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-neutral-50 text-neutral-700 border border-neutral-200 font-light tracking-wide">Rooftop</span>}
                        {hotel.pool_criteria.is_adults_only && <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-neutral-50 text-neutral-700 border border-neutral-200 font-light tracking-wide">Adults Only</span>}
                    </div>
                )}
                
                {hotel.pool_criteria?.sunbed_to_guest_ratio && (
                    <div className="text-xs text-neutral-600 font-light tracking-wide">
                        <span className="font-normal">Sunbed Ratio:</span> {hotel.pool_criteria.sunbed_to_guest_ratio}:1
                    </div>
                )}
            </div>
        </Link>
    );
}

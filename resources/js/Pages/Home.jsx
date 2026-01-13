import { Link, Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '@/Components/Header';

export default function Home({ featuredDestinations, topRatedHotels, familyFriendlyHotels, quietSunHotels }) {
    const { auth } = usePage().props;
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
            
            <div className="min-h-screen bg-white font-sans">
                <Header />

                {/* Promotional Banner - Jet2 Style */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 text-center">
                    <p className="text-sm sm:text-base font-semibold flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                        </svg>
                        SPECIAL OFFER: Book now and get exclusive pool access! Limited time only. T&Cs apply.
                    </p>
                </div>

                {/* Hero Section - Jet2 Inspired */}
                <div className="relative h-auto min-h-[600px] sm:min-h-[700px] lg:min-h-[600px] overflow-hidden bg-gradient-to-b from-blue-50 to-white">
                    {/* Background with lighter overlay for vibrant feel */}
                    {backgroundImages.map((image, index) => (
                        <div
                            key={index}
                            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                            style={{
                                opacity: currentBgIndex === index ? 0.3 : 0,
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                    ))}
                    
                    <div className="relative h-full flex items-center justify-center py-12 sm:py-16 md:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            <div className="text-center">
                                {/* Bold Heading - Jet2 Style */}
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900">
                                    Will You Struggle to <br className="hidden sm:block" />Get a Sunbed?
                                </h1>
                                
                                {/* Subheading */}
                                <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-700 font-medium max-w-3xl mx-auto">
                                    Compare hotels by pool quality, sunbed availability, and sun exposure.
                                </p>
                                
                                {/* Large White Search Box - Jet2 Style */}
                                <div className="max-w-5xl mx-auto px-2">
                                    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 border-4 border-orange-400">
                                        <form onSubmit={handleSearch}>
                                            {/* Search input and button */}
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                {/* Destination Input with Icon */}
                                                <div className="flex-1">
                                                    <label className="flex items-center gap-2 text-left text-sm font-semibold text-gray-700 mb-2">
                                                        <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                                        </svg>
                                                        Destination
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={searchData.destination}
                                                        onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                                                        placeholder="Where to? (e.g., Tenerife)"
                                                        className="w-full px-4 py-3 sm:py-4 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 text-base sm:text-lg font-medium"
                                                    />
                                                </div>

                                                {/* Large Orange Search Button - Jet2 Style */}
                                                <button
                                                    type="submit"
                                                    disabled={isSearching}
                                                    className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                                                >
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                                        <circle cx="11" cy="11" r="8"/>
                                                        <path d="M21 21l-4.35-4.35"/>
                                                    </svg>
                                                    {isSearching ? 'Searching...' : 'Search holidays'}
                                                </button>
                                            </div>

                                            {/* Pool Filters - Colorful Jet2 Style */}
                                            <div className="mt-6 sm:mt-8 pt-6 border-t-2 border-gray-200">
                                                <p className="text-left text-sm font-semibold text-gray-700 mb-3">
                                                    Find your perfect stay:
                                                </p>
                                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                                    {[
                                                        { value: 'family', label: 'Families', shortLabel: 'Family', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg> },
                                                        { value: 'quiet', label: 'Quiet', shortLabel: 'Quiet', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> },
                                                        { value: 'party', label: 'Social', shortLabel: 'Social', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 8h10V6H7v2zm0 4h10v-2H7v2zm0 4h7v-2H7v2zm13.5-10.5v13.09c0 .45-.54.67-.85.35l-2.65-2.65-2.65 2.65c-.31.32-.85.1-.85-.35V5.5c0-.83.67-1.5 1.5-1.5h3.5c.83 0 1.5.67 1.5 1.5z"/></svg> },
                                                        { value: 'luxury', label: 'Luxury', shortLabel: 'Luxury', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
                                                        { value: 'adults', label: 'Adults Only', shortLabel: 'Adults', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> },
                                                    ].map((vibe) => {
                                                        const isActive = searchData.poolVibe === vibe.value;
                                                        let buttonClasses = 'flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 border-2 shadow-md hover:shadow-lg transform hover:scale-105';
                                                        
                                                        if (isActive) {
                                                            if (vibe.value === 'family') buttonClasses += ' bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600';
                                                            else if (vibe.value === 'quiet') buttonClasses += ' bg-gradient-to-r from-green-500 to-green-600 text-white border-green-600';
                                                            else if (vibe.value === 'party') buttonClasses += ' bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-600';
                                                            else if (vibe.value === 'luxury') buttonClasses += ' bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-yellow-600';
                                                            else if (vibe.value === 'adults') buttonClasses += ' bg-gradient-to-r from-red-500 to-red-600 text-white border-red-600';
                                                        } else {
                                                            buttonClasses += ' bg-white text-gray-700 hover:bg-gray-50 border-gray-300';
                                                        }
                                                        
                                                        return (
                                                            <button
                                                                key={vibe.value}
                                                                type="button"
                                                                onClick={() => setSearchData({
                                                                    ...searchData, 
                                                                    poolVibe: searchData.poolVibe === vibe.value ? '' : vibe.value
                                                                })}
                                                                className={buttonClasses}
                                                            >
                                                                {vibe.icon}
                                                                <span className="hidden xs:inline sm:inline">{vibe.label}</span>
                                                                <span className="inline xs:hidden sm:hidden">{vibe.shortLabel}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Destinations - Jet2 Style */}
                {featuredDestinations?.length > 0 && (
                    <section className="bg-gradient-to-b from-white to-blue-50 py-12 sm:py-16 md:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Popular Destinations</h2>
                            <p className="text-center text-gray-600 text-lg mb-8 sm:mb-10 md:mb-12 font-medium">Find your perfect stay...</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                                {featuredDestinations.map((destination, index) => (
                                    <Link
                                        key={destination.id}
                                        href={`/destinations/${destination.slug}`}
                                        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-up transform hover:scale-105"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="relative overflow-hidden aspect-[4/5]">
                                            <img
                                                src={destination.image || '/images/default-destination.jpg'}
                                                alt={destination.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                            <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                                                </svg>
                                                POPULAR
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                                            <h3 className="text-2xl sm:text-3xl font-bold mb-2">{destination.name}</h3>
                                            <p className="text-white font-semibold text-sm sm:text-base">{destination.hotel_count} hotels with pool ratings</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Top Rated Hotels - Jet2 Style */}
                {topRatedHotels?.length > 0 && (
                    <section className="bg-white py-12 sm:py-16 md:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 md:mb-12 gap-4">
                                <div>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">Highest Rated Pool Experiences</h2>
                                    <p className="text-gray-600 text-lg font-medium">Top picks for sun seekers</p>
                                </div>
                                <Link href="/destinations" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                                    View all →
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
                                {topRatedHotels.map((hotel) => (
                                    <HotelCard 
                                        key={hotel.id} 
                                        hotel={hotel}
                                        isHotelier={auth.user?.role === 'hotelier'}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Best for Families - Jet2 Style */}
                {familyFriendlyHotels?.length > 0 && (
                    <section className="bg-gradient-to-b from-blue-50 to-white py-12 sm:py-16 md:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-3">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                </svg>
                                Best for Families
                            </h2>
                            <p className="text-center text-gray-600 text-lg mb-8 sm:mb-10 md:mb-12 font-medium">Perfect pools for the whole family</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                                {familyFriendlyHotels.map((hotel) => (
                                    <HotelCard 
                                        key={hotel.id} 
                                        hotel={hotel} 
                                        scoreType="family"
                                        isHotelier={auth.user?.role === 'hotelier'}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Quiet Sun - Jet2 Style */}
                {quietSunHotels?.length > 0 && (
                    <section className="bg-white py-12 sm:py-16 md:py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-3">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z"/>
                                </svg>
                                Best for Quiet Sun
                            </h2>
                            <p className="text-center text-gray-600 text-lg mb-8 sm:mb-10 md:mb-12 font-medium">Peaceful pools for relaxation</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                                {quietSunHotels.map((hotel) => (
                                    <HotelCard 
                                        key={hotel.id} 
                                        hotel={hotel} 
                                        scoreType="quiet"
                                        isHotelier={auth.user?.role === 'hotelier'}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Why Choose Us Section - Jet2 Style */}
                <section className="bg-gradient-to-b from-orange-50 to-white py-12 sm:py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
                            Get all this included...
                        </h2>
                        <p className="text-center text-gray-600 text-lg mb-10 sm:mb-12 md:mb-14 font-medium">We answer the questions that really matter</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {[
                                { 
                                    icon: <svg className="w-16 h-16 mx-auto text-orange-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>, 
                                    question: 'Will I struggle to get a sunbed?', 
                                    answer: 'We show sunbed-to-guest ratios' 
                                },
                                { 
                                    icon: <svg className="w-16 h-16 mx-auto text-yellow-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>, 
                                    question: 'Is the pool sunny all day?', 
                                    answer: 'Sun exposure times and coverage' 
                                },
                                { 
                                    icon: <svg className="w-16 h-16 mx-auto text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z"/></svg>, 
                                    question: 'Is it quiet or noisy?', 
                                    answer: 'Atmosphere ratings and music levels' 
                                },
                                { 
                                    icon: <svg className="w-16 h-16 mx-auto text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, 
                                    question: 'Is it good for families?', 
                                    answer: 'Kids pools, activities, and safety' 
                                },
                            ].map((item, index) => (
                                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-100 animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                                    <div className="mb-4">{item.icon}</div>
                                    <h3 className="text-lg font-bold mb-3 text-gray-900 text-center">{item.question}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm text-center font-medium">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

function HotelCard({ hotel, scoreType = 'overall', isInCompare = false, onToggleCompare, isHotelier = false }) {
    const [showCompareTooltip, setShowCompareTooltip] = useState(false);
    const [showClaimTooltip, setShowClaimTooltip] = useState(false);

    const score = scoreType === 'family' ? hotel.family_score 
                : scoreType === 'quiet' ? hotel.quiet_score
                : hotel.overall_score;

    const canClaim = isHotelier && !hotel.owned_by && !hotel.has_pending_claim;
    const isPremium = hotel.is_premium;

    const handleClaimClick = (e) => {
        e.stopPropagation();
        
        // Check if hotel is already claimed or has pending claim
        if (hotel.owned_by) {
            toast.error('This hotel has already been claimed by another hotelier.', {
                position: 'top-right',
                autoClose: 4000,
            });
            return;
        }
        
        if (hotel.has_pending_claim) {
            toast.warning('This hotel already has a pending claim under review.', {
                position: 'top-right',
                autoClose: 4000,
            });
            return;
        }
        
        // Navigate to claim form
        router.visit(`/hotelier/hotels/${hotel.slug}/claim`);
    };

    // Premium hotels get larger, more prominent cards
    const cardClasses = isPremium 
        ? "group bg-white overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-2xl shadow-xl border-4 border-gradient-to-r from-yellow-400 to-orange-500 transform hover:scale-105 relative ring-2 ring-yellow-300"
        : "group bg-white overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-2xl shadow-lg border-2 border-gray-100 transform hover:scale-105 relative";
    
    const imageAspect = isPremium ? "aspect-[16/10]" : "aspect-[4/3]";

    return (
        <div className={cardClasses}>
            <Link
                href={`/hotels/${hotel.slug}`}
                className="block"
            >
                <div className={`relative overflow-hidden ${imageAspect}`}>
                    <img
                        src={hotel.main_image || '/images/default-hotel.jpg'}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* Premium Badge */}
                    {hotel.is_premium && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse z-10">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                            </svg>
                            PREMIUM
                        </div>
                    )}
                    
                    {/* Special Offer Badge - for premium hotels */}
                    {isPremium && hotel.special_offer && (
                        <div className="absolute top-14 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 z-10">
                            <span>🎉</span>
                            SPECIAL OFFER
                        </div>
                    )}
                    
                    {/* Verified Badge - for premium hotels */}
                    {isPremium && hotel.show_verified_badge && (
                        <div className="absolute top-24 left-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 z-10">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            VERIFIED
                        </div>
                    )}
                    
                    {score && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-bold text-base shadow-lg flex items-center gap-1.5">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                            {score}/10
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
                <div className="p-5 sm:p-6 bg-white">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 font-semibold uppercase tracking-wide flex items-center gap-1">
                        <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {hotel.destination?.name}
                    </p>
                    
                    {hotel.pool_criteria && (
                        <div className="flex flex-wrap gap-2 text-xs mb-4">
                            {hotel.pool_criteria.has_infinity_pool && (
                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full font-semibold flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22 6.5c-1.1 0-2.2.3-3 .9-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9v2c.8 0 1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8V6.5z"/>
                                    </svg>
                                    Infinity Pool
                                </span>
                            )}
                            {hotel.pool_criteria.has_rooftop_pool && (
                                <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full font-semibold flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                                    </svg>
                                    Rooftop
                                </span>
                            )}
                            {hotel.pool_criteria.is_adults_only && (
                                <span className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-full font-semibold flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                    Adults Only
                                </span>
                            )}
                        </div>
                    )}
                    
                    {hotel.pool_criteria?.sunbed_to_guest_ratio && (
                        <div className="text-sm text-gray-700 font-semibold bg-orange-50 px-3 py-2 rounded-lg flex items-center gap-2">
                            <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-6.18C11.6 5.84 10.3 5 8.86 5 6.75 5 5.06 6.69 5.06 8.8c0 1.66 1.13 3.1 2.68 3.52L3.94 18H2v3h7v-2.78c0-.38.2-.72.52-.88.79-.4 2.39-1.34 3.48-1.34 1.09 0 2.69.94 3.48 1.34.32.16.52.5.52.88V21h7v-3h-1.94l-3.8-5.68C19.87 11.9 21 10.46 21 8.8 21 6.69 19.31 5 17.2 5c-1.44 0-2.74.84-3.96 2.02L13 7.8V7z"/>
                            </svg>
                            Sunbed Ratio: <span className="text-orange-600">{hotel.pool_criteria.sunbed_to_guest_ratio}:1</span>
                        </div>
                    )}
                    
                    {/* Premium CTA Buttons - visible for premium hotels */}
                    {isPremium && (
                        <div className="flex gap-2 mt-4">
                            <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                View Pool Details
                            </span>
                            {hotel.direct_booking_url && (
                                <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold text-sm shadow-md">
                                    💰 Book Direct
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </Link>

            {/* Action buttons container - positioned where Featured badge used to be for non-premium */}
            {(onToggleCompare || canClaim) && (
                <div className={`absolute ${isPremium ? 'top-16' : 'top-4'} left-4 flex gap-2 z-10`}>
                    {/* Compare Button */}
                    {onToggleCompare && (
                        <div className="relative">
                            <button
                                onClick={onToggleCompare}
                                onMouseEnter={() => setShowCompareTooltip(true)}
                                onMouseLeave={() => setShowCompareTooltip(false)}
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
                            {/* Instant Tooltip */}
                            {showCompareTooltip && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg whitespace-nowrap z-50 pointer-events-none">
                                    {isInCompare ? 'Remove from comparison' : 'Add to comparison'}
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Claim Hotel Button (Hotelier Only) */}
                    {canClaim && (
                        <div className="relative">
                            <button
                                onClick={handleClaimClick}
                                onMouseEnter={() => setShowClaimTooltip(true)}
                                onMouseLeave={() => setShowClaimTooltip(false)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 shadow-lg bg-orange-500 text-white hover:bg-orange-600 text-sm font-semibold"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Claim Hotel
                            </button>
                            {/* Instant Tooltip */}
                            {showClaimTooltip && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg whitespace-nowrap z-50 pointer-events-none">
                                    Claim this hotel
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

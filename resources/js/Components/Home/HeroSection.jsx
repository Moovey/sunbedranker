import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

// Use smaller, optimized images with proper sizing
const backgroundImages = [
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=75&auto=format',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=75&auto=format',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=75&auto=format',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=75&auto=format',
    'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=1200&q=75&auto=format',
];

const poolVibes = [
    { value: 'family', label: 'Families', shortLabel: 'Family', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg> },
    { value: 'quiet', label: 'Quiet', shortLabel: 'Quiet', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> },
    { value: 'party', label: 'Social', shortLabel: 'Social', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 8h10V6H7v2zm0 4h10v-2H7v2zm0 4h7v-2H7v2zm13.5-10.5v13.09c0 .45-.54.67-.85.35l-2.65-2.65-2.65 2.65c-.31.32-.85.1-.85-.35V5.5c0-.83.67-1.5 1.5-1.5h3.5c.83 0 1.5.67 1.5 1.5z"/></svg> },
    { value: 'luxury', label: 'Luxury', shortLabel: 'Luxury', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
    { value: 'adults', label: 'Adults Only', shortLabel: 'Adults', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> },
];

const getVibeButtonClasses = (vibe, isActive) => {
    let classes = 'flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 border-2 shadow-md hover:shadow-lg transform hover:scale-105';
    
    if (isActive) {
        const colorMap = {
            family: ' bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600',
            quiet: ' bg-gradient-to-r from-green-500 to-green-600 text-white border-green-600',
            party: ' bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-600',
            luxury: ' bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-yellow-600',
            adults: ' bg-gradient-to-r from-red-500 to-red-600 text-white border-red-600',
        };
        classes += colorMap[vibe] || '';
    } else {
        classes += ' bg-white text-gray-700 hover:bg-gray-50 border-gray-300';
    }
    
    return classes;
};

export default function HeroSection() {
    const [searchData, setSearchData] = useState({
        destination: '',
        checkIn: '',
        checkOut: '',
        poolVibe: '',
        guests: 2
    });
    const [isSearching, setIsSearching] = useState(false);
    const [currentBgIndex, setCurrentBgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 6000);
        
        return () => clearInterval(interval);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        
        if (!searchData.destination) {
            alert('Please enter a destination');
            return;
        }

        setIsSearching(true);
        
        router.get('/search', searchData, {
            onFinish: () => setIsSearching(false)
        });
    };

    return (
        <div className="relative h-auto min-h-[600px] sm:min-h-[700px] lg:min-h-[600px] overflow-hidden bg-gradient-to-b from-blue-50 to-white">
            {/* Background Images */}
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
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900">
                            Will You Struggle to <br className="hidden sm:block" />Get a Sunbed?
                        </h1>
                        
                        <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-700 font-medium max-w-3xl mx-auto">
                            Compare hotels by pool quality, sunbed availability, and sun exposure.
                        </p>
                        
                        {/* Search Box */}
                        <div className="max-w-5xl mx-auto px-2">
                            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 border-4 border-orange-400">
                                <form onSubmit={handleSearch}>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1">
                                            <label htmlFor="destination-input" className="flex items-center gap-2 text-left text-sm font-semibold text-gray-700 mb-2">
                                                <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                                </svg>
                                                Destination
                                            </label>
                                            <input
                                                id="destination-input"
                                                type="text"
                                                value={searchData.destination}
                                                onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                                                placeholder="Where to? (e.g., Tenerife)"
                                                className="w-full px-4 py-3 sm:py-4 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 text-base sm:text-lg font-medium"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSearching}
                                            aria-label={isSearching ? 'Searching for hotels' : 'Search hotels'}
                                            className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                                                <circle cx="11" cy="11" r="8"/>
                                                <path d="M21 21l-4.35-4.35"/>
                                            </svg>
                                            {isSearching ? 'Searching...' : 'Search holidays'}
                                        </button>
                                    </div>

                                    {/* Pool Filters */}
                                    <div className="mt-6 sm:mt-8 pt-6 border-t-2 border-gray-200">
                                        <p className="text-left text-sm font-semibold text-gray-700 mb-3">
                                            Find your perfect stay:
                                        </p>
                                        <div className="flex flex-wrap gap-2 sm:gap-3">
                                            {poolVibes.map((vibe) => (
                                                <button
                                                    key={vibe.value}
                                                    type="button"
                                                    onClick={() => setSearchData({
                                                        ...searchData, 
                                                        poolVibe: searchData.poolVibe === vibe.value ? '' : vibe.value
                                                    })}
                                                    className={getVibeButtonClasses(vibe.value, searchData.poolVibe === vibe.value)}
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
        </div>
    );
}

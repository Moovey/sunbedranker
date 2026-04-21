import { useState, useEffect, useCallback, useRef } from 'react';
import { router } from '@inertiajs/react';

// Use a simple gradient background instead of external images to dramatically improve LCP
// This removes the 28+ second LCP caused by loading multiple large external images

const poolVibes = [
    { value: 'family', label: 'Families', shortLabel: 'Family', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg> },
    { value: 'quiet', label: 'Quiet', shortLabel: 'Quiet', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> },
    { value: 'party', label: 'Social', shortLabel: 'Social', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 8h10V6H7v2zm0 4h10v-2H7v2zm0 4h7v-2H7v2zm13.5-10.5v13.09c0 .45-.54.67-.85.35l-2.65-2.65-2.65 2.65c-.31.32-.85.1-.85-.35V5.5c0-.83.67-1.5 1.5-1.5h3.5c.83 0 1.5.67 1.5 1.5z"/></svg> },
    { value: 'luxury', label: 'Luxury', shortLabel: 'Luxury', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
    { value: 'adults', label: 'Adults Only', shortLabel: 'Adults', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> },
];

const getVibeButtonClasses = (vibe, isActive) => {
    const base = 'flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ring-1 ring-inset';
    
    if (isActive) {
        return `${base} bg-orange-500 text-white ring-orange-500 shadow-sm`;
    }
    return `${base} bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 ring-slate-200`;
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
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const debounceRef = useRef(null);
    const wrapperRef = useRef(null);

    // Close suggestions on outside click
    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const fetchSuggestions = useCallback((text) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (text.trim().length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        debounceRef.current = setTimeout(() => {
            fetch(`/search/autocomplete?q=${encodeURIComponent(text.trim())}`, {
                headers: { 'Accept': 'application/json' },
            })
                .then(r => r.json())
                .then(data => {
                    setSuggestions(data || []);
                    setShowSuggestions((data || []).length > 0);
                    setActiveIndex(-1);
                })
                .catch(() => {});
        }, 250);
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setSearchData({ ...searchData, destination: val });
        fetchSuggestions(val);
    };

    const selectSuggestion = (suggestion) => {
        setSearchData({ ...searchData, destination: suggestion.value });
        setShowSuggestions(false);
        setSuggestions([]);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(i => (i < suggestions.length - 1 ? i + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(i => (i > 0 ? i - 1 : suggestions.length - 1));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault();
            selectSuggestion(suggestions[activeIndex]);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        
        if (!searchData.destination) {
            alert('Please enter a destination');
            return;
        }

        setIsSearching(true);
        
        router.get('/search', searchData, {
            onFinish: () => setIsSearching(false)
        });
    }, [searchData]);

    return (
        <section className="relative min-h-[500px] sm:min-h-[550px] lg:min-h-[500px] overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-orange-50">
            {/* Decorative elements - CSS only, no external images */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100 rounded-full opacity-10 blur-3xl" />
            </div>
            
            <div className="relative h-full flex items-center justify-center py-10 sm:py-14 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-5 leading-[1.05] text-slate-900">
                            Will You Struggle to <br className="hidden sm:block" />Get a Sunbed?
                        </h1>
                        
                        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
                            Compare hotels by pool quality, sunbed availability, and sun exposure.
                        </p>
                        
                        {/* Search Box */}
                        <div className="max-w-4xl mx-auto px-2">
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl ring-1 ring-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-20px_rgba(15,23,42,0.18)] p-5 sm:p-6 lg:p-8">
                                <form onSubmit={handleSearch}>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1 relative" ref={wrapperRef}>
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
                                                onChange={handleInputChange}
                                                onKeyDown={handleKeyDown}
                                                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                                                placeholder="Where to? (e.g., Canary Islands, Tenerife)"
                                                className="w-full px-4 py-3 bg-white ring-1 ring-slate-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:shadow-[0_0_0_4px_rgba(249,115,22,0.08)] outline-none text-slate-900 placeholder-slate-400 transition-all duration-200 text-base font-medium"
                                                autoComplete="off"
                                                role="combobox"
                                                aria-expanded={showSuggestions}
                                                aria-autocomplete="list"
                                                aria-controls="destination-suggestions"
                                            />

                                            {/* Autocomplete Suggestions */}
                                            {showSuggestions && suggestions.length > 0 && (
                                                <ul
                                                    id="destination-suggestions"
                                                    role="listbox"
                                                    className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-72 overflow-y-auto"
                                                >
                                                    {suggestions.map((s, i) => (
                                                        <li
                                                            key={`${s.type}-${s.value}`}
                                                            role="option"
                                                            aria-selected={i === activeIndex}
                                                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                                                                i === activeIndex ? 'bg-orange-50' : 'hover:bg-gray-50'
                                                            }`}
                                                            onClick={() => selectSuggestion(s)}
                                                            onMouseEnter={() => setActiveIndex(i)}
                                                        >
                                                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                                                s.type === 'region' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                                                            }`}>
                                                                {s.type === 'region' ? (
                                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                                                    </svg>
                                                                ) : (
                                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                                                    </svg>
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-sm font-semibold text-gray-900 truncate">{s.label}</div>
                                                                {s.sublabel && (
                                                                    <div className="text-xs text-gray-500 truncate">{s.sublabel}</div>
                                                                )}
                                                            </div>
                                                            <span className="flex-shrink-0 text-xs font-medium text-gray-400">
                                                                {s.hotel_count} {s.hotel_count === 1 ? 'hotel' : 'hotels'}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSearching}
                                            aria-label={isSearching ? 'Searching for hotels' : 'Search hotels'}
                                            className="w-full sm:w-auto px-8 py-3 bg-orange-500 text-white font-semibold tracking-tight text-base rounded-lg hover:bg-orange-600 transition-all duration-200 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04] flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                                                <circle cx="11" cy="11" r="8"/>
                                                <path d="M21 21l-4.35-4.35"/>
                                            </svg>
                                            {isSearching ? 'Searching...' : 'Search'}
                                        </button>
                                    </div>

                                    {/* Pool Filters */}
                                    <div className="mt-5 pt-5 border-t border-slate-100">
                                        <p className="text-left text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-3">
                                            Find your perfect stay
                                        </p>
                                        <div className="flex flex-wrap gap-2">
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
        </section>
    );
}

import { Link, Head, router } from '@inertiajs/react';
import { useState, useCallback, useMemo } from 'react';
import Header from '@/Components/Header';

// ============================================
// CONSTANTS
// ============================================

const SUN_EXPOSURE_MAP = {
    'all_day': { label: 'All Day Sun', description: 'Pool area receives sunshine throughout the day' },
    'afternoon_only': { label: 'Afternoon Only', description: 'Best sun from noon onwards' },
    'morning_only': { label: 'Morning Only', description: 'Morning sunshine, shaded in afternoon' },
    'partial_shade': { label: 'Partial Shade', description: 'Mix of sun and shade throughout the day' },
    'mostly_shaded': { label: 'Mostly Shaded', description: 'Limited direct sunlight' }
};

const ATMOSPHERE_CONFIG = {
    'lively': { icon: '🎉', description: 'Energetic and social pool environment' },
    'relaxed': { icon: '😌', description: 'Calm and laid-back atmosphere' },
    'quiet': { icon: '🧘', description: 'Peaceful and tranquil setting' },
    'family': { icon: '👨‍👩‍👧‍👦', description: 'Friendly environment for all ages' },
    'romantic': { icon: '💑', description: 'Intimate and serene ambiance' },
    'party': { icon: '🎊', description: 'Fun and festive pool scene' }
};

const NOISE_DESCRIPTIONS = {
    'quiet': 'Minimal noise, peaceful environment',
    'moderate': 'Some background activity and conversation',
    'lively': 'Active atmosphere with music and socializing',
    'loud': 'High energy with music and entertainment'
};

const POOL_SIZE_LABELS = {
    'small': 'Small Pool (under 50m²)',
    'medium': 'Medium Pool (50-150m²)',
    'large': 'Large Pool (150-300m²)',
    'very_large': 'Very Large Pool (over 300m²)',
    'resort_style': 'Resort Style (multiple pools, lagoons)'
};

const TOWEL_POLICY_LABELS = {
    'free': 'Free towels available',
    'deposit': 'Towels with deposit',
    'rental': 'Towel rental available',
    'bring_own': 'Bring your own towels'
};

const SUNBED_RESERVATION_LABELS = {
    'not_allowed': 'Reserving not allowed',
    'first_come': 'First come, first served',
    'timed_limit': 'Time limit policy',
    'reservation_system': 'Reservation system'
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const formatSunExposure = (exposure) => SUN_EXPOSURE_MAP[exposure]?.label || exposure;
const getSunExposureDescription = (exposure) => SUN_EXPOSURE_MAP[exposure]?.description || '';
const getAtmosphereIcon = (atmosphere) => ATMOSPHERE_CONFIG[atmosphere]?.icon || '🏊';
const getAtmosphereDescription = (atmosphere) => ATMOSPHERE_CONFIG[atmosphere]?.description || '';
const getNoiseDescription = (level) => NOISE_DESCRIPTIONS[level] || '';

const getSunbedRatioText = (ratio) => {
    if (ratio >= 1.0) return 'Excellent - plenty of sunbeds';
    if (ratio >= 0.75) return 'Very good - usually available';
    if (ratio >= 0.5) return 'Good - may need to arrive early';
    if (ratio >= 0.33) return 'Average - expect competition';
    return 'Limited - arrive very early';
};

const hasPoolFeatures = (poolCriteria) => {
    if (!poolCriteria) return false;
    return poolCriteria.has_infinity_pool || 
           poolCriteria.has_rooftop_pool || 
           poolCriteria.has_heated_pool || 
           poolCriteria.has_pool_bar || 
           poolCriteria.has_lazy_river || 
           poolCriteria.has_swim_up_bar;
};

const getSunBadges = (poolCriteria) => {
    const badges = [];
    
    if (poolCriteria.sun_exposure === 'all_day') {
        badges.push({ icon: '☀️', text: 'Sun all day', color: 'bg-amber-100 text-amber-800 border-amber-200' });
    } else if (poolCriteria.sun_exposure === 'afternoon_only') {
        badges.push({ icon: '🌅', text: 'Sun all afternoon', color: 'bg-orange-100 text-orange-800 border-orange-200' });
    } else if (poolCriteria.sun_exposure === 'morning_only') {
        badges.push({ icon: '🌄', text: 'Morning sun', color: 'bg-blue-100 text-blue-800 border-blue-200' });
    }
    
    if (poolCriteria.sunbed_to_guest_ratio >= 0.75) {
        badges.push({ icon: '🏖️', text: 'High sunbed availability', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' });
    }
    
    if (poolCriteria.has_shade_areas) {
        badges.push({ icon: '🌴', text: 'Plenty of shade', color: 'bg-teal-100 text-teal-800 border-teal-200' });
    }
    
    if (poolCriteria.has_infinity_pool) {
        badges.push({ icon: '∞', text: 'Infinity pool', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' });
    }
    
    if (poolCriteria.is_adults_only) {
        badges.push({ icon: '🍸', text: 'Adults only', color: 'bg-purple-100 text-purple-800 border-purple-200' });
    }
    
    if (poolCriteria.noise_level === 'quiet') {
        badges.push({ icon: '🤫', text: 'Peaceful atmosphere', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' });
    }
    
    return badges;
};

// ============================================
// REUSABLE UI COMPONENTS
// ============================================

function FaqItem({ question, answer, isOpen, onClick }) {
    return (
        <div className="border-b border-orange-200 last:border-b-0">
            <button
                onClick={onClick}
                className="w-full py-4 sm:py-5 flex items-center justify-between text-left hover:bg-orange-50/50 transition-colors px-1"
            >
                <span className="font-sans font-bold text-gray-900 pr-4 text-sm sm:text-base lg:text-lg">{question}</span>
                <svg 
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4 sm:pb-5' : 'max-h-0'}`}>
                <div className="text-gray-700 font-sans leading-relaxed px-1 text-sm sm:text-base">
                    {answer}
                </div>
            </div>
        </div>
    );
}

function MetricCard({ icon, label, value, description, highlight }) {
    return (
        <div className={`p-4 sm:p-5 lg:p-6 rounded-2xl border-2 transition-all duration-300 ${
            highlight 
                ? 'border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg' 
                : 'border-gray-200 bg-white hover:border-orange-200 hover:shadow-md'
        }`}>
            <div className="flex items-start gap-3 lg:gap-4">
                <div className="text-2xl sm:text-3xl lg:text-4xl flex-shrink-0">{icon}</div>
                <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600 mb-1 font-sans">{label}</div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-sans font-bold text-gray-900 truncate">{value}</div>
                    {description && (
                        <div className="text-xs sm:text-sm lg:text-base text-gray-500 mt-1 font-sans">{description}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

function FeatureBadge({ icon, text, color }) {
    return (
        <div className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-xl border ${color} transition-all duration-300 hover:scale-105 hover:shadow-md`}>
            <span className="text-base sm:text-lg flex-shrink-0">{icon}</span>
            <span className="text-xs sm:text-sm font-sans font-semibold">{text}</span>
        </div>
    );
}

function SectionCard({ children, className = '', gradient = false }) {
    return (
        <div className={`bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-5 sm:p-6 lg:p-8 ${
            gradient ? 'bg-gradient-to-br from-white to-orange-50/30' : ''
        } ${className}`}>
            {children}
        </div>
    );
}

function SectionTitle({ icon, children, iconColor = 'text-orange-500' }) {
    return (
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 lg:mb-6 flex items-center gap-2 lg:gap-3">
            {icon && <span className={`w-6 h-6 sm:w-7 sm:h-7 ${iconColor}`}>{icon}</span>}
            {children}
        </h2>
    );
}

function VerifiedBadge() {
    return (
        <div className="mt-4 pt-4 border-t border-blue-200 flex items-center gap-2 text-blue-700 text-sm font-semibold">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
            Verified by hotel management
        </div>
    );
}

function BookingButton({ onClick, variant = 'primary', icon, children }) {
    const variants = {
        primary: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white',
        secondary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white',
        outline: 'bg-white border-2 border-orange-300 text-orange-600 hover:bg-orange-50'
    };
    
    return (
        <button
            onClick={onClick}
            className={`w-full px-4 py-3 sm:py-3.5 font-sans font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base ${variants[variant]}`}
        >
            {icon}
            {children}
        </button>
    );
}

function SimilarHotelCard({ hotel }) {
    return (
        <Link 
            href={`/hotels/${hotel.slug}`} 
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-gray-100 hover:border-orange-200"
        >
            <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                    src={hotel.main_image_url || '/images/default-hotel.jpg'}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {hotel.overall_score && (
                    <div className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-sans font-bold text-sm shadow-lg">
                        {hotel.overall_score}/10
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-sans font-bold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {hotel.name}
                </h3>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="font-sans">{hotel.destination?.name}</span>
                </div>
            </div>
        </Link>
    );
}

// ============================================
// ICONS (SVG Components for cleaner JSX)
// ============================================

const Icons = {
    ChevronRight: () => (
        <svg className="w-3 h-3 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7"/>
        </svg>
    ),
    Location: ({ className = "w-4 h-4 sm:w-5 sm:h-5 text-orange-500" }) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
    ),
    Star: ({ className = "w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" }) => (
        <svg className={className} viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    ),
    Verified: ({ className = "w-3.5 h-3.5" }) => (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
    ),
    ChevronLeft: () => (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
    ),
    ChevronRightNav: () => (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    ),
    Pool: ({ className = "w-6 h-6 sm:w-7 sm:h-7 text-blue-600" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2zM22 16.3c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36s-.78.13-1.15.36c-.47.27-1.09.64-2.2.64v-2c.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36v2zM8.67 12c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.12-.07.26-.15.41-.23L10.48 5C10.26 4.42 9.69 4 9 4H6l3.89 8.4c.26.07.54.1.78.1z"/>
        </svg>
    ),
    Amenities: ({ className = "w-6 h-6 sm:w-7 sm:h-7 text-green-600" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.5 21H2V9l10-7 10 7v12h-5.5M7.5 21v-6.5a2.5 2.5 0 015 0V21M7.5 21h5"/>
        </svg>
    ),
    Rules: ({ className = "w-6 h-6 sm:w-7 sm:h-7 text-red-600" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
    ),
    Towel: ({ className = "w-6 h-6 sm:w-7 sm:h-7 text-purple-600" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V9h-2V7h4v10z"/>
        </svg>
    ),
    FAQ: ({ className = "w-6 h-6 sm:w-7 sm:h-7 text-orange-500" }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
        </svg>
    ),
    Gallery: ({ className = "w-5 h-5 sm:w-6 sm:h-6 text-gray-700" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    Phone: ({ className = "w-4 h-4 sm:w-5 sm:h-5 text-gray-400" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
    ),
    Email: ({ className = "w-4 h-4 sm:w-5 sm:h-5 text-gray-400" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    Address: ({ className = "w-4 h-4 sm:w-5 sm:h-5 text-gray-400" }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    Booking: () => (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M3 21h18M9 8h6M9 8V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3M9 8H5a2 2 0 0 0-2 2v11M15 8h4a2 2 0 0 1 2 2v11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    External: () => (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function HotelShow({ hotel, similarHotels }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    // Memoized handlers
    const handleBookingClick = useCallback((type) => {
        router.get(`/hotels/${hotel.slug}/click?type=${type}`);
    }, [hotel.slug]);

    const toggleFaq = useCallback((index) => {
        setOpenFaqIndex(prev => prev === index ? null : index);
    }, []);

    const handlePrevImage = useCallback(() => {
        setActiveImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1);
    }, []);

    const handleNextImage = useCallback(() => {
        setActiveImageIndex(prev => (prev + 1) % allImages.length);
    }, []);

    // Memoized values
    const allImages = useMemo(() => [
        hotel.main_image_url,
        ...(hotel.gallery_images_urls || [])
    ].filter(Boolean), [hotel.main_image_url, hotel.gallery_images_urls]);

    const poolCriteria = hotel.pool_criteria;
    const sunBadges = useMemo(() => poolCriteria ? getSunBadges(poolCriteria) : [], [poolCriteria]);

    return (
        <>
            <Head title={`${hotel.name} - Pool & Sunbed Review`} />
            
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Header />
                
                {/* Breadcrumb */}
                <div className="bg-gradient-to-r from-orange-50 via-white to-blue-50 border-b-2 border-orange-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                        <nav className="text-xs sm:text-sm lg:text-base text-gray-600 font-sans flex items-center flex-wrap gap-2">
                            <Link href="/" className="hover:text-orange-600 transition-colors duration-300 font-semibold">Home</Link>
                            <Icons.ChevronRight />
                            <Link href={`/destinations/${hotel.destination.slug}`} className="hover:text-orange-600 transition-colors duration-300 font-semibold">
                                {hotel.destination.name}
                            </Link>
                            <Icons.ChevronRight />
                            <span className="text-gray-900 font-bold">{hotel.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="bg-gradient-to-b from-blue-50/50 to-white border-b border-orange-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                        {/* Hotel Header */}
                        <div className="mb-6 sm:mb-8">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-gray-900 mb-3 sm:mb-4">
                                {hotel.name}
                            </h1>
                            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                                {hotel.star_rating && (
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-0.5">
                                            {[...Array(hotel.star_rating)].map((_, i) => (
                                                <Icons.Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                        <span className="text-gray-700 font-sans font-bold text-sm sm:text-base">{hotel.star_rating} Star Hotel</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-sm sm:text-base">
                                    <Icons.Location className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                                    <span>{hotel.destination.name}</span>
                                </div>
                                {hotel.subscription_tier === 'premium' && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs sm:text-sm font-sans font-bold border border-green-200">
                                        <Icons.Verified />
                                        Verified
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Hero Grid: Image + Map + Score */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            {/* Main Pool Image */}
                            <div className="lg:col-span-2">
                                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-100">
                                    <img
                                        src={allImages[activeImageIndex] || '/images/default-hotel.jpg'}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {allImages.length > 1 && (
                                        <>
                                            <button
                                                onClick={handlePrevImage}
                                                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-all duration-300 backdrop-blur-sm"
                                                aria-label="Previous image"
                                            >
                                                <Icons.ChevronLeft />
                                            </button>
                                            <button
                                                onClick={handleNextImage}
                                                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-all duration-300 backdrop-blur-sm"
                                                aria-label="Next image"
                                            >
                                                <Icons.ChevronRightNav />
                                            </button>
                                            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/60 text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm font-sans backdrop-blur-sm">
                                                {activeImageIndex + 1} / {allImages.length}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Map & Score Column */}
                            <div className="space-y-4">
                                {/* Google Map */}
                                {hotel.latitude && hotel.longitude && (
                                    <div className="h-40 sm:h-48 lg:h-52 xl:h-56 2xl:h-64 rounded-xl overflow-hidden shadow-lg">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            style={{ border: 0 }}
                                            src={`https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${hotel.latitude},${hotel.longitude}&zoom=16&maptype=satellite`}
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}

                                {/* Overall Score Card */}
                                {hotel.overall_score && (
                                    <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl shadow-2xl p-5 sm:p-6 lg:p-7 xl:p-8 text-white border-2 border-orange-400">
                                        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-sans font-bold mb-3 lg:mb-4 flex items-center gap-2">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                            </svg>
                                            Pool & Sun Score
                                        </h3>
                                        <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-sans font-black mb-4 lg:mb-5">{hotel.overall_score}<span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-orange-200">/10</span></div>
                                        <div className="space-y-2 lg:space-y-3">
                                            {hotel.family_score && (
                                                <div className="flex justify-between text-xs sm:text-sm lg:text-base xl:text-lg font-sans">
                                                    <span className="text-orange-100 font-semibold">Family</span>
                                                    <span className="font-black">{hotel.family_score}/10</span>
                                                </div>
                                            )}
                                            {hotel.quiet_score && (
                                                <div className="flex justify-between text-xs sm:text-sm font-sans">
                                                    <span className="text-orange-100 font-semibold">Quiet Sun</span>
                                                    <span className="font-black">{hotel.quiet_score}/10</span>
                                                </div>
                                            )}
                                            {hotel.party_score && (
                                                <div className="flex justify-between text-xs sm:text-sm font-sans">
                                                    <span className="text-orange-100 font-semibold">Party Vibe</span>
                                                    <span className="font-black">{hotel.party_score}/10</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-5 sm:space-y-6 lg:space-y-7 xl:space-y-8">
                            
                            {/* Pool Details - Metrics Table */}
                            {hotel.pool_criteria && (
                                <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                                        </svg>
                                        Pool Details
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
                                        {/* Sunbed Info */}
                                        {hotel.pool_criteria.sunbed_to_guest_ratio && (
                                            <MetricCard
                                                icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 15l3-3m0 0l3 3m-3-3v12M21 9l-3 3m0 0l-3-3m3 3V3M12 3h.01M12 21h.01" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                label="Sunbed Availability"
                                                value={`${hotel.pool_criteria.sunbed_to_guest_ratio}:1 ratio`}
                                                description={getSunbedRatioText(hotel.pool_criteria.sunbed_to_guest_ratio)}
                                                highlight={hotel.pool_criteria.sunbed_to_guest_ratio >= 0.75}
                                            />
                                        )}

                                        {/* Sun Exposure */}
                                        {hotel.pool_criteria.sun_exposure && (
                                            <MetricCard
                                                icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                label="Sun Exposure"
                                                value={formatSunExposure(hotel.pool_criteria.sun_exposure)}
                                                description={getSunExposureDescription(hotel.pool_criteria.sun_exposure)}
                                            />
                                        )}

                                        {/* Number of Pools */}
                                        <MetricCard
                                            icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                            label="Number of Pools"
                                            value={hotel.pool_criteria.number_of_pools || 1}
                                        />

                                        {/* Pool Size */}
                                        {hotel.pool_criteria.pool_size_sqm && (
                                            <MetricCard
                                                icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                label="Total Pool Size"
                                                value={`${hotel.pool_criteria.pool_size_sqm} m²`}
                                            />
                                        )}

                                        {/* Pool Depth */}
                                        {hotel.pool_criteria.max_depth_m && (
                                            <MetricCard
                                                icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                label="Maximum Depth"
                                                value={`${hotel.pool_criteria.max_depth_m} meters`}
                                            />
                                        )}

                                        {/* Shade Availability */}
                                        {hotel.pool_criteria.has_shade_areas && (
                                            <MetricCard
                                                icon={<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                label="Shade Options"
                                                value="Available"
                                                description="Natural and artificial shade areas"
                                            />
                                        )}
                                    </div>

                                    {/* Special Pool Features */}
                                    {hasPoolFeatures(hotel.pool_criteria) && (
                                        <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t-2 border-orange-200">
                                            <h3 className="font-sans font-bold text-gray-900 mb-4 text-base sm:text-lg flex items-center gap-2">
                                                <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                </svg>
                                                Special Features
                                            </h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                                                {hotel.pool_criteria.has_infinity_pool && (
                                                    <FeatureBadge 
                                                        icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6.5c-1.1 0-2.2.3-3 .9-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9v2c.8 0 1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8V6.5z"/></svg>} 
                                                        text="Infinity Pool" 
                                                        color="bg-blue-100 text-blue-700 border-2 border-blue-300" 
                                                    />
                                                )}
                                                {hotel.pool_criteria.has_rooftop_pool && (
                                                    <FeatureBadge 
                                                        icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>} 
                                                        text="Rooftop Pool" 
                                                        color="bg-purple-100 text-purple-700 border-2 border-purple-300" 
                                                    />
                                                )}
                                                {hotel.pool_criteria.has_heated_pool && (
                                                    <FeatureBadge 
                                                        icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>} 
                                                        text="Heated Pool" 
                                                        color="bg-orange-100 text-orange-700 border-2 border-orange-300" 
                                                    />
                                                )}
                                                {hotel.pool_criteria.has_pool_bar && (
                                                    <FeatureBadge 
                                                        icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 2l2.01 18.23C5.13 21.23 5.97 22 7 22h10c1.03 0 1.87-.77 1.99-1.77L21 2H3zm9 17c-1.66 0-3-1.34-3-3 0-2 3-5.4 3-5.4s3 3.4 3 5.4c0 1.66-1.34 3-3 3z"/></svg>} 
                                                        text="Pool Bar" 
                                                        color="bg-green-100 text-green-700 border-2 border-green-300" 
                                                    />
                                                )}
                                                {hotel.pool_criteria.has_lazy_river && (
                                                    <FeatureBadge 
                                                        icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16c.58-.45 1.27-.67 2-.67.73 0 1.42.22 2 .67.58-.45 1.27-.67 2-.67.73 0 1.42.22 2 .67.58-.45 1.27-.67 2-.67.73 0 1.42.22 2 .67V14c-.58-.45-1.27-.67-2-.67-.73 0-1.42.22-2 .67-.58-.45-1.27-.67-2-.67-.73 0-1.42.22-2 .67-.58-.45-1.27-.67-2-.67-.73 0-1.42.22-2 .67v2z"/></svg>} 
                                                        text="Lazy River" 
                                                        color="bg-cyan-100 text-cyan-700 border-2 border-cyan-300" 
                                                    />
                                                )}
                                                {hotel.pool_criteria.has_swim_up_bar && (
                                                    <FeatureBadge 
                                                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 8h6m-5 0a3 3 0 110 6H9l3 7-3-7m1 0h6m-6 0L7 21m5-5h6m2 0l-2-5-2 5m2 0h2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>} 
                                                        text="Swim-up Bar" 
                                                        color="bg-teal-50 text-teal-800 border border-teal-200" 
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* New Pool & Features Sections */}
                            {hotel.pool_criteria?.pool_overview && hotel.pool_criteria.pool_overview.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                        Pool & Sun Overview
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                        {hotel.pool_criteria.pool_overview.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-light text-gray-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hotel.pool_criteria?.pool_details && hotel.pool_criteria.pool_details.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22 6.5c-1.1 0-2.2.3-3 .9-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9v2c.8 0 1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8V6.5z"/>
                                        </svg>
                                        Pool Types & Details
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                        {hotel.pool_criteria.pool_details.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-light text-gray-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hotel.pool_criteria?.shade_options && hotel.pool_criteria.shade_options.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M3.5 19.5L2 21l8-4-6-6-4 8 1.5 1.5zM19 3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2z"/>
                                        </svg>
                                        Shade Options
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                        {hotel.pool_criteria.shade_options.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                                <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-light text-gray-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hotel.pool_criteria?.special_features_list && hotel.pool_criteria.special_features_list.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                        Special Features
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                        {hotel.pool_criteria.special_features_list.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                                <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-light text-gray-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hotel.pool_criteria?.atmosphere_vibe && hotel.pool_criteria.atmosphere_vibe.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                        </svg>
                                        Pool Atmosphere & Vibe
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                        {hotel.pool_criteria.atmosphere_vibe.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-pink-50 rounded-lg border border-pink-200">
                                                <svg className="w-4 h-4 text-pink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-light text-gray-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hotel.pool_criteria?.family_features && hotel.pool_criteria.family_features.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                        </svg>
                                        Family Friendliness
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                        {hotel.pool_criteria.family_features.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-light text-gray-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hotel.pool_criteria && (hotel.pool_criteria.has_kids_pool || hotel.pool_criteria.has_splash_area || hotel.pool_criteria.has_lifeguard) && (
                                <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                        </svg>
                                        Family Features
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {hotel.pool_criteria.has_kids_pool && (
                                            <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-lg border border-sky-100">
                                                <svg className="w-7 h-7 text-sky-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div>
                                                    <h4 className="font-sans font-semibold text-gray-900 mb-1 text-sm sm:text-base">Kids Pool</h4>
                                                    <p className="text-xs sm:text-sm text-gray-600 font-sans">Dedicated shallow pool area for children</p>
                                                </div>
                                            </div>
                                        )}

                                        {hotel.pool_criteria.has_splash_area && (
                                            <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-lg border border-sky-100">
                                                <svg className="w-7 h-7 text-sky-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div>
                                                    <h4 className="font-sans font-semibold text-gray-900 mb-1 text-sm sm:text-base">Splash Area</h4>
                                                    <p className="text-xs sm:text-sm text-gray-600 font-sans">Water play area with fountains and slides</p>
                                                </div>
                                            </div>
                                        )}

                                        {hotel.pool_criteria.has_lifeguard && (
                                            <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                                                <svg className="w-7 h-7 text-emerald-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div>
                                                    <h4 className="font-sans font-semibold text-gray-900 mb-1 text-sm sm:text-base">Lifeguard on Duty</h4>
                                                    <p className="text-xs sm:text-sm text-gray-600 font-sans">Professional supervision for safety</p>
                                                </div>
                                            </div>
                                        )}

                                        {hotel.pool_criteria.has_waterslide && (
                                            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                                                <svg className="w-7 h-7 text-purple-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div>
                                                    <h4 className="font-sans font-semibold text-gray-900 mb-1 text-sm sm:text-base">Water Slides</h4>
                                                    <p className="text-xs sm:text-sm text-gray-600 font-sans">Fun slides for all ages</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Comprehensive Pool Criteria Details */}
                            {hotel.pool_criteria && (
                                <>
                                    {/* 1. Sunbed Availability & Ratio */}
                                    {(hotel.pool_criteria.sunbed_count || hotel.pool_criteria.sunbed_to_guest_ratio || hotel.pool_criteria.sunbed_types) && (
                                        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Sunbed Availability
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {hotel.pool_criteria.sunbed_count && (
                                                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                                                        <div className="text-2xl font-bold text-amber-700">{hotel.pool_criteria.sunbed_count}</div>
                                                        <div className="text-sm text-gray-700">Total Sunbeds</div>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.sunbed_to_guest_ratio && (
                                                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                                                        <div className="text-2xl font-bold text-emerald-700">{hotel.pool_criteria.sunbed_to_guest_ratio}</div>
                                                        <div className="text-sm text-gray-700">Sunbed Ratio</div>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.sunbed_types && hotel.pool_criteria.sunbed_types.length > 0 && (
                                                    <div className="md:col-span-2 lg:col-span-1">
                                                        <div className="text-sm font-semibold text-gray-900 mb-2">Sunbed Types:</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {hotel.pool_criteria.sunbed_types.map((type, i) => (
                                                                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium capitalize">
                                                                    {type.replace('_', ' ')}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* 2. Sun Exposure */}
                                    {hotel.pool_criteria.sun_exposure && (
                                        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Sun Exposure
                                            </h2>
                                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                                <div className="text-lg font-semibold text-yellow-800 capitalize">
                                                    {hotel.pool_criteria.sun_exposure.replace('_', ' ')}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* 3. Pool Size & Variety */}
                                    {(hotel.pool_criteria.pool_size_category || hotel.pool_criteria.total_pool_area_sqm || hotel.pool_criteria.number_of_pools || hotel.pool_criteria.pool_types) && (
                                        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Pool Size & Variety
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {hotel.pool_criteria.pool_size_category && (
                                                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                        <div className="text-sm text-gray-600 mb-1">Pool Size</div>
                                                        <div className="text-lg font-semibold text-blue-700 capitalize">
                                                            {hotel.pool_criteria.pool_size_category.replace('_', ' ')}
                                                        </div>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.total_pool_area_sqm && (
                                                    <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                                                        <div className="text-sm text-gray-600 mb-1">Total Area</div>
                                                        <div className="text-lg font-semibold text-cyan-700">
                                                            {hotel.pool_criteria.total_pool_area_sqm} m²
                                                        </div>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.number_of_pools && (
                                                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                                                        <div className="text-sm text-gray-600 mb-1">Number of Pools</div>
                                                        <div className="text-lg font-semibold text-indigo-700">
                                                            {hotel.pool_criteria.number_of_pools}
                                                        </div>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.pool_types && hotel.pool_criteria.pool_types.length > 0 && (
                                                    <div className="md:col-span-3">
                                                        <div className="text-sm font-semibold text-gray-900 mb-2">Pool Types:</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {hotel.pool_criteria.pool_types.map((type, i) => (
                                                                <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium capitalize">
                                                                    {type.replace('_', ' ')}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* 4. Facilities & Amenities */}
                                    {(hotel.pool_criteria.has_pool_bar || hotel.pool_criteria.has_waiter_service || (hotel.pool_criteria.shade_options && hotel.pool_criteria.shade_options.length > 0)) && (
                                        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.707 2.707 0 003 15.546M12 6.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 3v2.25m0 0l2.25 9.75H9.75L12 5.25z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Facilities & Amenities
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {hotel.pool_criteria.has_pool_bar && (
                                                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                                                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Pool Bar Available</span>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.has_waiter_service && (
                                                    <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg border border-teal-200">
                                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Waiter Service</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* 5. Atmosphere & Vibe */}
                                    {(hotel.pool_criteria.atmosphere || hotel.pool_criteria.music_level) && (
                                        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Atmosphere & Vibe
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {hotel.pool_criteria.atmosphere && (
                                                    <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                                                        <div className="text-sm text-gray-600 mb-1">Atmosphere</div>
                                                        <div className="text-lg font-semibold text-pink-700 capitalize">
                                                            {hotel.pool_criteria.atmosphere}
                                                        </div>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.music_level && (
                                                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                                        <div className="text-sm text-gray-600 mb-1">Music Level</div>
                                                        <div className="text-lg font-semibold text-purple-700 capitalize">
                                                            {hotel.pool_criteria.music_level}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* 6. Cleanliness & Maintenance */}
                                    {(hotel.pool_criteria.cleanliness_rating || hotel.pool_criteria.sunbed_condition_rating || hotel.pool_criteria.tiling_condition_rating) && (
                                        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Cleanliness & Maintenance
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {hotel.pool_criteria.cleanliness_rating > 0 && (
                                                    <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                                                        <div className="text-sm text-gray-600 mb-2">Cleanliness</div>
                                                        <div className="flex gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className={`w-5 h-5 ${i < hotel.pool_criteria.cleanliness_rating ? 'text-teal-600' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.sunbed_condition_rating > 0 && (
                                                    <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                                                        <div className="text-sm text-gray-600 mb-2">Sunbed Condition</div>
                                                        <div className="flex gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className={`w-5 h-5 ${i < hotel.pool_criteria.sunbed_condition_rating ? 'text-cyan-600' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.tiling_condition_rating > 0 && (
                                                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                                                        <div className="text-sm text-gray-600 mb-2">Tiling Condition</div>
                                                        <div className="flex gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className={`w-5 h-5 ${i < hotel.pool_criteria.tiling_condition_rating ? 'text-indigo-600' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* 7. Accessibility Features */}
                                    {(hotel.pool_criteria.has_accessibility_ramp || hotel.pool_criteria.has_pool_hoist || hotel.pool_criteria.has_step_free_access || hotel.pool_criteria.has_elevator_to_rooftop) && (
                                        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Accessibility Features
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {hotel.pool_criteria.has_accessibility_ramp && (
                                                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Accessibility Ramp</span>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.has_pool_hoist && (
                                                    <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                                                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Pool Hoist</span>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.has_step_free_access && (
                                                    <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                                                        <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Step-Free Access</span>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.has_elevator_to_rooftop && (
                                                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Elevator to Rooftop</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* 8. Kids & Family Features */}
                                    {(hotel.pool_criteria.has_kids_pool || hotel.pool_criteria.has_splash_park || hotel.pool_criteria.has_waterslide || hotel.pool_criteria.has_lifeguard) && (
                                        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Kids & Family Features
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {hotel.pool_criteria.has_kids_pool && (
                                                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Kids Pool</span>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.has_splash_park && (
                                                    <div className="flex items-center gap-3 p-4 bg-sky-50 rounded-lg border border-sky-200">
                                                        <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Splash Park</span>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.has_waterslide && (
                                                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Water Slides</span>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.has_lifeguard && (
                                                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                                                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Lifeguard on Duty</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* 9. Luxury & Premium Features */}
                                    {(hotel.pool_criteria.has_luxury_cabanas || hotel.pool_criteria.has_cabana_service || hotel.pool_criteria.has_heated_pool || hotel.pool_criteria.has_jacuzzi || hotel.pool_criteria.has_adult_sun_terrace) && (
                                        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Luxury & Premium Features
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {hotel.pool_criteria.has_luxury_cabanas && (
                                                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                                                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Luxury Cabanas</span>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.has_cabana_service && (
                                                    <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Cabana Service</span>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.has_heated_pool && (
                                                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Heated Pool</span>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.has_jacuzzi && (
                                                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Jacuzzi</span>
                                                    </div>
                                                )}
                                                {hotel.pool_criteria.has_adult_sun_terrace && (
                                                    <div className="flex items-center gap-3 p-4 bg-rose-50 rounded-lg border border-rose-200">
                                                        <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-gray-900 font-medium">Adult Sun Terrace</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* ============================================ */}
                            {/* HOTELIER-PROVIDED CONTENT SECTIONS */}
                            {/* ============================================ */}

                            {/* Pool Area Description (from Hotelier) */}
                            {hotel.pool_description && (
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-blue-200">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22 6.5c-1.1 0-2.2.3-3 .9-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9v2c.8 0 1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8V6.5z"/>
                                        </svg>
                                        About Our Pool Area
                                    </h2>
                                    <div className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line">
                                        {hotel.pool_description}
                                    </div>
                                    {hotel.is_verified && (
                                        <div className="mt-4 pt-4 border-t border-blue-200 flex items-center gap-2 text-blue-700 text-sm font-semibold">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                                            </svg>
                                            Verified by hotel management
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Amenities Description (from Hotelier) */}
                            {hotel.amenities_description && (
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-green-200">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M7.5 21H2V9l10-7 10 7v12h-5.5M7.5 21v-6.5a2.5 2.5 0 015 0V21M7.5 21h5"/>
                                        </svg>
                                        Pool Amenities & Services
                                    </h2>
                                    <div className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line">
                                        {hotel.amenities_description}
                                    </div>
                                    {hotel.is_verified && (
                                        <div className="mt-4 pt-4 border-t border-green-200 flex items-center gap-2 text-green-700 text-sm font-semibold">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                                            </svg>
                                            Verified by hotel management
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* House Rules (from Hotelier) */}
                            {hotel.house_rules && (
                                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-red-200">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                        </svg>
                                        Pool House Rules
                                    </h2>
                                    <div className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line">
                                        {hotel.house_rules}
                                    </div>
                                </div>
                            )}

                            {/* Towel Policy (from Hotelier) */}
                            {hotel.towel_policy && (
                                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-purple-200">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V9h-2V7h4v10z"/>
                                        </svg>
                                        Towel & Sunbed Policy
                                    </h2>
                                    <div className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line">
                                        {hotel.towel_policy}
                                    </div>
                                </div>
                            )}

                            {/* FAQs (from Hotelier) */}
                            {hotel.faqs && hotel.faqs.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                                        </svg>
                                        Frequently Asked Questions
                                    </h2>
                                    <div className="divide-y divide-orange-100 border-t border-orange-200">
                                        {hotel.faqs.map((faq, index) => (
                                            <FaqItem
                                                key={index}
                                                question={faq.question}
                                                answer={faq.answer}
                                                isOpen={openFaqIndex === index}
                                                onClick={() => toggleFaq(index)}
                                            />
                                        ))}
                                    </div>
                                    {hotel.is_verified && (
                                        <div className="mt-5 pt-4 border-t border-gray-200 flex items-center gap-2 text-blue-600 text-sm font-semibold">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                                            </svg>
                                            Answers provided by hotel management
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* END HOTELIER-PROVIDED CONTENT SECTIONS */}
                            {/* ============================================ */}

                            {/* Gallery */}
                            {allImages.length > 1 && (
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Photo Gallery
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
                                        {allImages.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setActiveImageIndex(index);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className="relative h-32 sm:h-40 lg:h-44 xl:h-48 2xl:h-52 rounded-lg overflow-hidden hover:opacity-75 transition-all duration-300 group"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${hotel.name} - ${index + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {index === activeImageIndex && (
                                                    <div className="absolute inset-0 border-4 border-gray-900 rounded-lg"></div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Enhanced Profile Content */}
                            {(hotel.subscription_tier === 'enhanced' || hotel.subscription_tier === 'premium') && (
                                <>
                                    {/* Description */}
                                    {hotel.description && (
                                        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6">
                                            <h2 className="text-xl sm:text-2xl font-sans font-semibold text-gray-900 mb-4">About This Hotel</h2>
                                            <div className="prose max-w-none text-gray-700 font-sans text-sm sm:text-base">
                                                {hotel.description}
                                            </div>
                                        </div>
                                    )}

                                    {/* FAQs - Placeholder for future implementation */}
                                    <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 border-2 border-gray-200 rounded-xl p-5 sm:p-6">
                                        <h3 className="text-base sm:text-lg font-sans font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Enhanced Profile
                                        </h3>
                                        <p className="text-gray-600 font-sans text-xs sm:text-sm">This hotel has an enhanced profile with additional exclusive content, special offers, and verified information.</p>
                                    </div>
                                </>
                            )}

                            {/* Reviews */}
                            {hotel.approved_reviews && hotel.approved_reviews.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8">Guest Reviews</h2>
                                    <div className="space-y-5 sm:space-y-6">
                                        {hotel.approved_reviews.map((review) => (
                                            <div key={review.id} className="border-b last:border-0 border-gray-200 pb-5 sm:pb-6 last:pb-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="font-sans font-semibold text-gray-900 text-sm sm:text-base">{review.user.name}</div>
                                                    <div className="flex gap-0.5">
                                                        {[...Array(review.overall_rating)].map((_, i) => (
                                                            <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                                {review.title && (
                                                    <h4 className="font-sans font-semibold text-gray-800 mb-1 text-sm sm:text-base">{review.title}</h4>
                                                )}
                                                <p className="text-gray-700 font-sans text-xs sm:text-sm mb-2">{review.content}</p>
                                                <div className="text-xs sm:text-sm text-gray-500 font-sans">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-4 lg:top-6 xl:top-8 space-y-5 sm:space-y-6 lg:space-y-7 xl:space-y-8">
                                {/* Booking Card */}
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-sans font-semibold text-gray-900 mb-4 lg:mb-5 xl:mb-6 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Check Prices & Book
                                    </h3>
                                    
                                    <div className="space-y-2 sm:space-y-3">
                                        {hotel.booking_affiliate_url && (
                                            <button
                                                onClick={() => handleBookingClick('booking')}
                                                className="w-full px-4 py-2.5 sm:py-3 lg:py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-sans font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M3 21h18M9 8h6M9 8V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3M9 8H5a2 2 0 0 0-2 2v11M15 8h4a2 2 0 0 1 2 2v11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Check Booking.com
                                            </button>
                                        )}
                                        {hotel.expedia_affiliate_url && (
                                            <button
                                                onClick={() => handleBookingClick('expedia')}
                                                className="w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-sans font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Check Expedia
                                            </button>
                                        )}
                                        {hotel.direct_booking_url && (
                                            <button
                                                onClick={() => handleBookingClick('direct')}
                                                className="w-full px-4 py-2.5 sm:py-3 bg-white border-2 border-orange-300 text-orange-600 font-sans font-bold rounded-xl hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Visit Hotel Website
                                            </button>
                                        )}
                                    </div>

                                    <div className="mt-4 text-[10px] sm:text-xs text-gray-500 text-center font-sans">
                                        We may earn a commission from bookings made through these links
                                    </div>
                                </div>

                                {/* Promotional Banner for Premium Hotels */}
                                {hotel.subscription_tier === 'premium' && (
                                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg p-5 sm:p-6 text-white">
                                        <div className="text-center">
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            <h3 className="text-lg sm:text-xl font-sans font-bold mb-2">Special Offer!</h3>
                                            <p className="text-xs sm:text-sm mb-4 opacity-90 font-sans">Book directly and receive exclusive benefits</p>
                                            <button
                                                onClick={() => handleBookingClick('direct')}
                                                className="w-full px-4 py-2 bg-white text-orange-600 font-sans font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-md text-sm"
                                            >
                                                View Offers
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Verification Badge */}
                                {hotel.subscription_tier === 'premium' && (
                                    <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-emerald-200">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div>
                                                <h4 className="font-sans font-semibold text-gray-900 text-sm sm:text-base">Verified Profile</h4>
                                                <p className="text-xs sm:text-sm text-gray-600 font-sans">Information verified and regularly updated by hotel staff</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Quick Stats */}
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-sans font-semibold text-gray-900 mb-4 lg:mb-5 xl:mb-6">Quick Info</h3>
                                    <div className="space-y-3">
                                        {hotel.total_rooms && (
                                            <div className="flex justify-between text-xs sm:text-sm font-sans">
                                                <span className="text-gray-600">Rooms:</span>
                                                <span className="font-semibold text-gray-900">{hotel.total_rooms}</span>
                                            </div>
                                        )}
                                        {hotel.pool_criteria?.number_of_pools && (
                                            <div className="flex justify-between text-xs sm:text-sm font-sans">
                                                <span className="text-gray-600">Pools:</span>
                                                <span className="font-semibold text-gray-900">{hotel.pool_criteria.number_of_pools}</span>
                                            </div>
                                        )}
                                        {hotel.view_count > 0 && (
                                            <div className="flex justify-between text-xs sm:text-sm font-sans">
                                                <span className="text-gray-600">Profile Views:</span>
                                                <span className="font-semibold text-gray-900">{hotel.view_count}</span>
                                            </div>
                                        )}
                                        {hotel.review_count > 0 && (
                                            <div className="flex justify-between text-xs sm:text-sm font-sans">
                                                <span className="text-gray-600">Reviews:</span>
                                                <span className="font-semibold text-gray-900">{hotel.review_count}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
                                    <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-sans font-semibold text-gray-900 mb-4 lg:mb-5 xl:mb-6">Contact</h3>
                                    <div className="space-y-3 text-xs sm:text-sm text-gray-700 font-sans">
                                        {hotel.address && (
                                            <div className="flex items-start gap-2">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div>
                                                    <div className="font-medium text-gray-900 mb-1">Address</div>
                                                    {hotel.address}
                                                </div>
                                            </div>
                                        )}
                                        {hotel.phone && (
                                            <div className="flex items-start gap-2">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <div>
                                                    <div className="font-medium text-gray-900 mb-1">Phone</div>
                                                    <a href={`tel:${hotel.phone}`} className="text-gray-900 hover:text-gray-700 transition-colors duration-300">{hotel.phone}</a>
                                                </div>
                                            </div>
                                        )}
                                        {hotel.email && (
                                            <div className="flex items-start gap-2">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <div>
                                                    <div className="font-medium text-gray-900 mb-1">Email</div>
                                                    <a href={`mailto:${hotel.email}`} className="text-gray-900 hover:text-gray-700 break-all transition-colors duration-300">
                                                        {hotel.email}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Similar Hotels */}
                    {similarHotels && similarHotels.length > 0 && (
                        <div className="mt-10 sm:mt-12 lg:mt-14 xl:mt-16">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8">Similar Hotels in {hotel.destination.name}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
                                {similarHotels.map((similar) => (
                                    <SimilarHotelCard key={similar.id} hotel={similar} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}



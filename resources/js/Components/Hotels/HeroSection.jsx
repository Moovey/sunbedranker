import { Link } from '@inertiajs/react';
import { Icons } from './Icons';

// ============================================
// BREADCRUMB COMPONENT
// ============================================
export function Breadcrumb({ hotel }) {
    return (
        <div className="bg-white border-b-2 border-gray-100">
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
    );
}

// ============================================
// HOTEL HEADER COMPONENT
// ============================================
export function HotelHeader({ hotel }) {
    return (
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs sm:text-sm font-sans font-bold border border-orange-200">
                        <Icons.Verified />
                        Verified
                    </span>
                )}
            </div>
        </div>
    );
}

// ============================================
// IMAGE GALLERY COMPONENT
// ============================================
export function ImageGallery({ allImages, activeImageIndex, hotelName, onPrevImage, onNextImage, isPremium = false }) {
    // Premium hotels get significantly larger hero images
    const heightClass = isPremium 
        ? "h-80 sm:h-96 md:h-[32rem] lg:h-[40rem] xl:h-[48rem]" 
        : "h-64 sm:h-80 md:h-96 lg:h-[28rem]";
    
    return (
        <div className="lg:col-span-2">
            <div className={`relative ${heightClass} rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-100`}>
                <img
                    src={allImages[activeImageIndex] || '/images/default-hotel.jpg'}
                    alt={hotelName}
                    className="w-full h-full object-cover"
                />
                
                {/* Premium Badge Overlay */}
                {isPremium && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 animate-pulse z-10">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                        </svg>
                        PREMIUM
                    </div>
                )}
                
                {allImages.length > 1 && (
                    <>
                        <button
                            onClick={onPrevImage}
                            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-all duration-300 backdrop-blur-sm"
                            aria-label="Previous image"
                        >
                            <Icons.ChevronLeft />
                        </button>
                        <button
                            onClick={onNextImage}
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
    );
}

// ============================================
// MAP AND SCORE COLUMN COMPONENT
// ============================================
export function MapAndScoreColumn({ hotel }) {
    return (
        <div className="space-y-4">
            {/* Google Maps (Free embed, no API key required) */}
            {hotel.latitude && hotel.longitude && (
                <div className="h-40 sm:h-48 lg:h-52 xl:h-56 2xl:h-64 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://maps.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=15&output=embed`}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            )}

            {/* Overall Score Card */}
            {hotel.overall_score && (
                <ScoreCard hotel={hotel} />
            )}
        </div>
    );
}

// ============================================
// SCORE CARD COMPONENT
// ============================================
export function ScoreCard({ hotel }) {
    return (
        <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl shadow-2xl p-5 sm:p-6 lg:p-7 xl:p-8 text-white border-2 border-orange-400">
            <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-sans font-bold mb-3 lg:mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Pool & Sun Score
            </h3>
            <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-sans font-black mb-4 lg:mb-5">
                {hotel.overall_score}<span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-orange-200">/10</span>
            </div>
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
    );
}

// ============================================
// HERO SECTION - COMBINES ALL HERO COMPONENTS
// ============================================
// Helper to extract YouTube video ID
const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
};

// Check if URL is a YouTube link
const isYouTubeUrl = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
};

// Special Offer Banner Component - Displayed above image gallery
// Supports multiple promotions for Premium hoteliers
function SpecialOfferBanner({ hotel }) {
    // Use server-filtered active_promotions (excludes expired), with fallback to legacy format
    const promotions = hotel.active_promotions && hotel.active_promotions.length > 0 
        ? hotel.active_promotions 
        : (hotel.promotional_banner || hotel.special_offer) 
            ? [{
                promotional_banner: hotel.promotional_banner,
                special_offer: hotel.special_offer,
                special_offer_expires_at: hotel.special_offer_expires_at,
            }]
            : [];

    // Filter to only show promotions with actual content
    const activePromotions = promotions.filter(promo => {
        return promo.promotional_banner || promo.special_offer;
    });

    if (activePromotions.length === 0) {
        return null;
    }

    // Single promotion - compact display
    if (activePromotions.length === 1) {
        const promo = activePromotions[0];
        return (
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-xl mb-4 shadow-md relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-1/2 w-16 h-16 bg-white/10 rounded-full -mb-8"></div>
                
                <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🎉</span>
                        <span className="font-bold text-sm">Special Offer</span>
                    </div>
                    
                    {promo.promotional_banner && (
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-sm">
                            {promo.promotional_banner}
                        </span>
                    )}
                    
                    {promo.special_offer && (
                        <span className="text-white/90 text-sm">{promo.special_offer}</span>
                    )}
                    
                    {promo.special_offer_expires_at && (
                        <span className="flex items-center gap-1 text-xs text-white/80 ml-auto">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Valid until {new Date(promo.special_offer_expires_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                    )}
                </div>
            </div>
        );
    }

    // Multiple promotions - vertical display for Premium hoteliers
    return (
        <div className="mb-4 space-y-3">
            {/* Header for multiple promotions */}
            <div className="flex items-center gap-2">
                <span className="text-xl">🎉</span>
                <span className="font-bold text-gray-800">Current Offers & Promotions</span>
                <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    {activePromotions.length} Active
                </span>
            </div>
            
            {/* Promotions Vertical Stack */}
            <div className="flex flex-col gap-3">
                {activePromotions.map((promo, index) => (
                    <div 
                        key={index}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-xl shadow-md relative overflow-hidden"
                    >
                        {/* Decorative element */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                        
                        <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2">
                            {promo.promotional_banner && (
                                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-sm">
                                    {promo.promotional_banner}
                                </span>
                            )}
                            
                            {promo.special_offer && (
                                <span className="text-white/90 text-sm">{promo.special_offer}</span>
                            )}
                            
                            {promo.special_offer_expires_at && (
                                <span className="flex items-center gap-1 text-xs text-white/80 ml-auto">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Valid until {new Date(promo.special_offer_expires_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Enhanced Features Component for Hero Section
function HeroEnhancedFeatures({ hotel, onBookingClick }) {
    const hasVideoContent = hotel.video_url || hotel.video_360_url;
    const hasDirectBooking = hotel.direct_booking_url;
    
    if (!hasVideoContent && !hasDirectBooking) {
        return null;
    }

    // Handle direct booking click with tracking
    const handleDirectClick = (e) => {
        e.preventDefault();
        if (onBookingClick) {
            onBookingClick('direct');
        }
        // Open in new tab after tracking
        window.open(hotel.direct_booking_url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="mt-6 sm:mt-8">
            {/* Main Enhanced Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Video Tour */}
                {hotel.video_url && (
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl overflow-hidden shadow-lg">
                        {isYouTubeUrl(hotel.video_url) && getYouTubeVideoId(hotel.video_url) ? (
                            <div className="aspect-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(hotel.video_url)}`}
                                    title="Pool Video Tour"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                        ) : (
                            <a 
                                href={hotel.video_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center p-6 text-white hover:bg-white/10 transition-colors h-full"
                            >
                                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-2">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                                <span className="font-bold">Watch Video Tour</span>
                                <span className="text-xs text-white/80">See our pool area</span>
                            </a>
                        )}
                    </div>
                )}

                {/* 360° Virtual Tour */}
                {hotel.video_360_url && (
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl overflow-hidden shadow-lg">
                        {isYouTubeUrl(hotel.video_360_url) && getYouTubeVideoId(hotel.video_360_url) ? (
                            <div className="aspect-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(hotel.video_360_url)}`}
                                    title="360° Virtual Tour"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; vr"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                        ) : (
                            <a 
                                href={hotel.video_360_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center p-6 text-white hover:bg-white/10 transition-colors h-full"
                            >
                                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-2">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <span className="font-bold">360° Virtual Tour</span>
                                <span className="text-xs text-white/80">Explore in immersive 360°</span>
                            </a>
                        )}
                    </div>
                )}

                {/* Visit Hotel Website */}
                {hasDirectBooking && (
                    <button 
                        onClick={handleDirectClick}
                        className="bg-white border-2 border-orange-300 rounded-2xl p-5 shadow-lg flex items-center gap-4 hover:bg-orange-50 transition-all group hover:shadow-xl text-left"
                    >
                        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                        <div>
                            <span className="font-bold block text-orange-600">Visit Hotel Website</span>
                            <span className="text-xs text-gray-500">Book direct for best rates</span>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
}

export function HeroSection({ hotel, allImages, activeImageIndex, onPrevImage, onNextImage, onBookingClick }) {
    const isPremium = hotel.is_premium;
    
    return (
        <div className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                {/* Hotel Header */}
                <HotelHeader hotel={hotel} />

                {/* Special Offer Banner - Above Image Gallery */}
                <SpecialOfferBanner hotel={hotel} />

                {/* Hero Grid: Image + Map + Score */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Main Pool Image */}
                    <ImageGallery 
                        allImages={allImages}
                        activeImageIndex={activeImageIndex}
                        hotelName={hotel.name}
                        onPrevImage={onPrevImage}
                        onNextImage={onNextImage}
                        isPremium={isPremium}
                    />

                    {/* Map & Score Column */}
                    <MapAndScoreColumn hotel={hotel} />
                </div>

                {/* Enhanced Features from Hotelier */}
                <HeroEnhancedFeatures hotel={hotel} onBookingClick={onBookingClick} />
            </div>
        </div>
    );
}

export default HeroSection;

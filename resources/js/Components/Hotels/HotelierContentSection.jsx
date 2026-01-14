import { FaqItem, VerifiedBadge } from './ui';
import { Icons } from './Icons';

// ============================================
// POOL DESCRIPTION SECTION (from Hotelier)
// ============================================
export function PoolDescriptionSection({ hotel }) {
    if (!hotel.pool_description) return null;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-blue-200">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3">
                <Icons.Pool className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                About Our Pool Area
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line">
                {hotel.pool_description}
            </div>
            {hotel.is_verified && <VerifiedBadge />}
        </div>
    );
}

// ============================================
// AMENITIES DESCRIPTION SECTION (from Hotelier)
// ============================================
export function AmenitiesDescriptionSection({ hotel }) {
    if (!hotel.amenities_description) return null;

    return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-green-200">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3">
                <Icons.Amenities className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
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
    );
}

// ============================================
// HOUSE RULES SECTION (from Hotelier)
// ============================================
export function HouseRulesSection({ hotel }) {
    if (!hotel.house_rules) return null;

    return (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-red-200">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3">
                <Icons.Rules className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
                Pool House Rules
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line">
                {hotel.house_rules}
            </div>
        </div>
    );
}

// ============================================
// TOWEL POLICY SECTION (from Hotelier)
// ============================================
export function TowelPolicySection({ hotel }) {
    if (!hotel.towel_policy) return null;

    return (
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-purple-200">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3">
                <Icons.Towel className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                Towel & Sunbed Policy
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line">
                {hotel.towel_policy}
            </div>
        </div>
    );
}

// ============================================
// FAQS SECTION (from Hotelier)
// ============================================
export function FaqsSection({ hotel, openFaqIndex, toggleFaq }) {
    if (!hotel.faqs || hotel.faqs.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                <Icons.FAQ className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" />
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
    );
}

// ============================================
// PHOTO GALLERY SECTION
// ============================================
export function PhotoGallerySection({ allImages, activeImageIndex, setActiveImageIndex, hotelName }) {
    if (allImages.length <= 1) return null;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                <Icons.Gallery className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
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
                            alt={`${hotelName} - ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {index === activeImageIndex && (
                            <div className="absolute inset-0 border-4 border-gray-900 rounded-lg"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ============================================
// ENHANCED PROFILE SECTION
// ============================================
export function EnhancedProfileSection({ hotel }) {
    // Check if hotel has any enhanced content to display
    const hasPromotionalContent = hotel.promotional_banner || hotel.special_offer;
    const hasVideoContent = hotel.video_url || hotel.video_360_url;
    const hasVerifiedBadge = hotel.show_verified_badge;
    const hasDirectBooking = hotel.direct_booking_url;
    
    // If no enhanced features are set, don't render anything
    if (!hasPromotionalContent && !hasVideoContent && !hasVerifiedBadge && !hasDirectBooking) {
        return null;
    }

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

    return (
        <div className="space-y-5 sm:space-y-6">
            {/* Verified by Hotel Badge */}
            {hasVerifiedBadge && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-5 sm:p-6 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-purple-900">Verified by Hotel</h3>
                            <p className="text-sm text-purple-700">All information on this page has been verified by the hotel management</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Promotional Banner & Special Offers */}
            {hasPromotionalContent && (
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-5 sm:p-6 shadow-lg overflow-hidden relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-100 rounded-full -ml-12 -mb-12 opacity-50"></div>
                    
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">🎉</span>
                            <h3 className="text-lg sm:text-xl font-bold text-orange-900">Special Offer</h3>
                        </div>
                        
                        {hotel.promotional_banner && (
                            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-3 rounded-xl font-bold text-base sm:text-lg mb-4 shadow-md">
                                {hotel.promotional_banner}
                            </div>
                        )}
                        
                        {hotel.special_offer && (
                            <div className="bg-white/80 rounded-xl p-4 border border-orange-200">
                                <p className="text-gray-700 font-medium whitespace-pre-line">{hotel.special_offer}</p>
                            </div>
                        )}
                        
                        {hotel.special_offer_expires_at && (
                            <div className="mt-3 flex items-center gap-2 text-sm text-orange-700 font-semibold">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Offer valid until {new Date(hotel.special_offer_expires_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Video Content */}
            {hasVideoContent && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-5 sm:p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">🎬</span>
                        <h3 className="text-lg sm:text-xl font-bold text-blue-900">Video Tours</h3>
                    </div>
                    
                    <div className="space-y-4">
                        {/* Main Video */}
                        {hotel.video_url && (
                            <div>
                                <h4 className="text-sm font-bold text-blue-800 mb-2">Pool Video Tour</h4>
                                {isYouTubeUrl(hotel.video_url) && getYouTubeVideoId(hotel.video_url) ? (
                                    <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
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
                                        className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                        Watch Video Tour
                                    </a>
                                )}
                            </div>
                        )}
                        
                        {/* 360° Virtual Tour */}
                        {hotel.video_360_url && (
                            <div>
                                <h4 className="text-sm font-bold text-blue-800 mb-2">360° Virtual Tour</h4>
                                <a 
                                    href={hotel.video_360_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-md"
                                >
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block">Experience 360° Virtual Tour</span>
                                        <span className="text-xs text-white/80 font-normal">Explore our pool area in immersive 360°</span>
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Direct Booking Link */}
            {hasDirectBooking && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-5 sm:p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">💰</span>
                        <h3 className="text-lg sm:text-xl font-bold text-green-900">Book Direct & Save</h3>
                    </div>
                    <p className="text-sm text-green-700 mb-4">
                        Book directly with the hotel for the best rates and exclusive benefits!
                    </p>
                    <a 
                        href={hotel.direct_booking_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Book Direct Now
                    </a>
                </div>
            )}
        </div>
    );
}

// ============================================
// REVIEWS SECTION
// ============================================
export function ReviewsSection({ hotel }) {
    if (!hotel.approved_reviews || hotel.approved_reviews.length === 0) return null;

    return (
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8">
                Guest Reviews
            </h2>
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
    );
}

export default PoolDescriptionSection;

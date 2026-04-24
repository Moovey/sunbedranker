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
        <div className="bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] p-5 sm:p-6 lg:p-7 xl:p-8">
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
        <div className="bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] hover:ring-slate-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_16px_36px_-16px_rgba(15,23,42,0.12)] p-5 sm:p-6 lg:p-7 xl:p-8 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-semibold tracking-tight text-slate-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
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
                            loading="lazy"
                            width={300}
                            height={200}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
// Refined, professional layout for claimed hotels.
// Same data fields as before, just a cleaner, more cohesive UI.
// ============================================
export function EnhancedProfileSection({ hotel }) {
    const hasPromotionalContent = hotel.promotional_banner || hotel.special_offer;
    const hasVideoContent = hotel.video_url;
    const hasVerifiedBadge = hotel.show_verified_badge;

    // Direct booking is rendered in the sidebar BookingCard for claimed hotels,
    // so we intentionally do not duplicate it here.
    if (!hasPromotionalContent && !hasVideoContent && !hasVerifiedBadge) {
        return null;
    }

    const getYouTubeVideoId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    };
    const isYouTubeUrl = (url) => url && (url.includes('youtube.com') || url.includes('youtu.be'));

    return (
        <div className="space-y-5 sm:space-y-6">
            {/* Verified by Hotel Badge */}
            {hasVerifiedBadge && (
                <div className="relative overflow-hidden bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500" />
                    <div className="flex items-center gap-4 p-5 sm:p-6">
                        <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-blue-50 ring-1 ring-blue-100 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-base sm:text-lg font-semibold text-slate-900">Verified by Hotel</h3>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                                    Official
                                </span>
                            </div>
                            <p className="text-sm text-slate-600">All information on this page has been verified by hotel management.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Promotional Banner & Special Offers */}
            {hasPromotionalContent && (
                <div className="relative overflow-hidden bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400" />
                    <div className="p-5 sm:p-6 lg:p-7">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-600">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                                </svg>
                                Promotion
                            </span>
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Special Offer</h3>
                        </div>

                        {hotel.promotional_banner && (
                            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3 rounded-xl font-semibold text-sm sm:text-base mb-3 shadow-sm">
                                {hotel.promotional_banner}
                            </div>
                        )}

                        {hotel.special_offer && (
                            <div className="rounded-xl bg-orange-50/70 ring-1 ring-orange-100 p-4">
                                <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">{hotel.special_offer}</p>
                            </div>
                        )}

                        {hotel.special_offer_expires_at && (
                            <div className="mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm text-orange-700 font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Valid until {new Date(hotel.special_offer_expires_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Video Content */}
            {hasVideoContent && (
                <div className="relative overflow-hidden bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-sky-500 to-blue-500" />
                    <div className="p-5 sm:p-6 lg:p-7">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-600">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                                Video
                            </span>
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Pool Video Tour</h3>
                        </div>

                        {hotel.video_url && (
                            isYouTubeUrl(hotel.video_url) && getYouTubeVideoId(hotel.video_url) ? (
                                <div className="aspect-video rounded-xl overflow-hidden ring-1 ring-slate-200">
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
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                    Watch Video Tour
                                </a>
                            )
                        )}
                    </div>
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

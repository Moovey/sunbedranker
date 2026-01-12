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
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                <Icons.Gallery className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
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
    if (hotel.subscription_tier !== 'enhanced' && hotel.subscription_tier !== 'premium') {
        return null;
    }

    return (
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

            {/* Enhanced Profile Badge */}
            <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 border-2 border-gray-200 rounded-xl p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-sans font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Enhanced Profile
                </h3>
                <p className="text-gray-600 font-sans text-xs sm:text-sm">
                    This hotel has an enhanced profile with additional exclusive content, special offers, and verified information.
                </p>
            </div>
        </>
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

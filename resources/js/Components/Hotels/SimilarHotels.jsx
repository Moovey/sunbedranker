import { Link } from '@inertiajs/react';

// ============================================
// SIMILAR HOTEL CARD COMPONENT
// ============================================
export function SimilarHotelCard({ hotel }) {
    const isPremium = hotel.is_premium;
    
    // Premium hotels get enhanced styling
    const cardClasses = isPremium 
        ? "bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border-4 border-yellow-400 hover:border-orange-400 ring-2 ring-yellow-200"
        : "bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-gray-100 hover:border-orange-200";
    
    const imageHeight = isPremium ? "h-56 sm:h-64" : "h-40 sm:h-48";
    
    return (
        <Link 
            href={`/hotels/${hotel.slug}`} 
            className={cardClasses}
        >
            <div className={`relative ${imageHeight} overflow-hidden`}>
                <img
                    src={hotel.main_image_url || '/images/default-hotel.jpg'}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Premium Badge */}
                {isPremium && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center gap-1 animate-pulse z-10">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                        </svg>
                        PREMIUM
                    </div>
                )}
                
                {/* Special Offer Badge */}
                {isPremium && hotel.special_offer && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2.5 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1 z-10">
                        🎉 OFFER
                    </div>
                )}
                
                {/* Verified Badge */}
                {isPremium && hotel.show_verified_badge && (
                    <div className="absolute bottom-3 left-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-2.5 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1 z-10">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        VERIFIED
                    </div>
                )}
                
                {hotel.overall_score && (
                    <div className={`absolute ${isPremium ? 'top-12' : 'top-3'} right-3 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-sans font-bold text-sm shadow-lg`}>
                        {hotel.overall_score}/10
                    </div>
                )}
            </div>
            <div className={`p-4 ${isPremium ? 'bg-gradient-to-b from-yellow-50 to-white' : ''}`}>
                <h3 className={`font-sans font-bold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2 group-hover:text-orange-600 transition-colors ${isPremium ? 'text-base sm:text-lg' : ''}`}>
                    {hotel.name}
                </h3>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="font-sans">{hotel.destination?.name}</span>
                </div>
                
                {/* Premium CTA */}
                {isPremium && (
                    <div className="mt-3 flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-xs shadow-md">
                            View Pool Details →
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
}

// ============================================
// SIMILAR HOTELS SECTION COMPONENT
// ============================================
export function SimilarHotelsSection({ similarHotels, destinationName }) {
    if (!similarHotels || similarHotels.length === 0) return null;

    return (
        <div className="mt-10 sm:mt-12 lg:mt-14 xl:mt-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-3">
                <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="currentColor"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>
                Similar Hotels in {destinationName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
                {similarHotels.map((similar) => (
                    <SimilarHotelCard key={similar.id} hotel={similar} />
                ))}
            </div>
        </div>
    );
}

export default SimilarHotelsSection;

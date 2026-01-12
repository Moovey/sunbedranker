import { Link } from '@inertiajs/react';

// ============================================
// SIMILAR HOTEL CARD COMPONENT
// ============================================
export function SimilarHotelCard({ hotel }) {
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
// SIMILAR HOTELS SECTION COMPONENT
// ============================================
export function SimilarHotelsSection({ similarHotels, destinationName }) {
    if (!similarHotels || similarHotels.length === 0) return null;

    return (
        <div className="mt-10 sm:mt-12 lg:mt-14 xl:mt-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8">
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

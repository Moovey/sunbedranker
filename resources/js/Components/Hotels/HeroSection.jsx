import { Link } from '@inertiajs/react';
import { Icons } from './Icons';

// ============================================
// BREADCRUMB COMPONENT
// ============================================
export function Breadcrumb({ hotel }) {
    return (
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs sm:text-sm font-sans font-bold border border-green-200">
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
export function ImageGallery({ allImages, activeImageIndex, hotelName, onPrevImage, onNextImage }) {
    return (
        <div className="lg:col-span-2">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-100">
                <img
                    src={allImages[activeImageIndex] || '/images/default-hotel.jpg'}
                    alt={hotelName}
                    className="w-full h-full object-cover"
                />
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
export function HeroSection({ hotel, allImages, activeImageIndex, onPrevImage, onNextImage }) {
    return (
        <div className="bg-gradient-to-b from-blue-50/50 to-white border-b border-orange-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                {/* Hotel Header */}
                <HotelHeader hotel={hotel} />

                {/* Hero Grid: Image + Map + Score */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Main Pool Image */}
                    <ImageGallery 
                        allImages={allImages}
                        activeImageIndex={activeImageIndex}
                        hotelName={hotel.name}
                        onPrevImage={onPrevImage}
                        onNextImage={onNextImage}
                    />

                    {/* Map & Score Column */}
                    <MapAndScoreColumn hotel={hotel} />
                </div>
            </div>
        </div>
    );
}

export default HeroSection;

import { Icons } from './Icons';

// ============================================
// BOOKING CARD COMPONENT
// ============================================
export function BookingCard({ hotel, onBookingClick }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-sans font-bold text-gray-900 mb-4 lg:mb-5 xl:mb-6 flex items-center gap-2">
                <Icons.Money className="w-5 h-5 text-orange-500" />
                Check Prices & Book
            </h3>
            
            <div className="space-y-2 sm:space-y-3">
                {hotel.booking_affiliate_url && (
                    <button
                        onClick={() => onBookingClick('booking')}
                        className="w-full px-4 py-2.5 sm:py-3 lg:py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-sans font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    >
                        <Icons.Booking />
                        Check Booking.com
                    </button>
                )}
                {hotel.expedia_affiliate_url && (
                    <button
                        onClick={() => onBookingClick('expedia')}
                        className="w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-sans font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    >
                        <Icons.Plane />
                        Check Expedia
                    </button>
                )}
            </div>

            <div className="mt-4 text-[10px] sm:text-xs text-gray-500 text-center font-sans">
                We may earn a commission from bookings made through these links
            </div>
        </div>
    );
}

// ============================================
// PROMOTIONAL BANNER COMPONENT
// ============================================
export function PromotionalBanner({ hotel, onBookingClick }) {
    if (hotel.subscription_tier !== 'premium') return null;

    return (
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-5 sm:p-6 text-white">
            <div className="text-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <h3 className="text-lg sm:text-xl font-sans font-bold mb-2">Special Offer!</h3>
                <p className="text-xs sm:text-sm mb-4 opacity-90 font-sans">Book directly and receive exclusive benefits</p>
                <button
                    onClick={() => onBookingClick('direct')}
                    className="w-full px-4 py-2 bg-white text-orange-600 font-sans font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-md text-sm"
                >
                    View Offers
                </button>
            </div>
        </div>
    );
}

// ============================================
// HOTEL BADGES COMPONENT (Award Badges)
// ============================================
// SunbedRanker themed badge icons using SVG - matching homepage style
const getBadgeIcon = (iconName, color = 'currentColor') => {
    const icons = {
        sunbed: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>,
        pool: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2z"/></svg>,
        sun: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>,
        infinity: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/></svg>,
        toprated: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>,
        family: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
        relaxed: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z"/></svg>,
        lively: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>,
        luxury: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>,
        clean: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"/></svg>,
        accessible: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M12 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 6h-5.5v10.5h-3V10H5V7h14v3z"/></svg>,
        verified: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
        heated: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>,
        rooftop: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>,
        cabana: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>,
        // Legacy mappings
        star: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>,
        trophy: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>,
        medal: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2z"/></svg>,
        water: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/></svg>,
        quiet: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z"/></svg>,
        party: <svg className="w-4 h-4" viewBox="0 0 24 24" fill={color}><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>,
    };
    return icons[iconName] || icons.toprated;
};

export function HotelBadgesCard({ hotel }) {
    const badges = hotel.badges || [];
    
    if (badges.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-sans font-bold text-gray-900 mb-4 lg:mb-5 xl:mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Awards & Badges
            </h3>
            <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                    <div
                        key={badge.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                        style={{
                            backgroundColor: `${badge.color}15`,
                            color: badge.color,
                            border: `1px solid ${badge.color}30`,
                        }}
                        title={badge.description || badge.name}
                    >
                        <span style={{ color: badge.color }}>{getBadgeIcon(badge.icon, badge.color)}</span>
                        <span className="font-sans">{badge.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// VERIFICATION BADGE COMPONENT
// ============================================
export function VerificationBadgeCard({ hotel }) {
    if (hotel.subscription_tier !== 'premium') return null;

    return (
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg p-4 border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                    <h4 className="font-sans font-semibold text-gray-900 text-sm sm:text-base">Verified Profile</h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-sans">Information verified and regularly updated by hotel staff</p>
                </div>
            </div>
        </div>
    );
}

// ============================================
// QUICK STATS COMPONENT
// ============================================
export function QuickStatsCard({ hotel }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-sans font-bold text-gray-900 mb-4 lg:mb-5 xl:mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>
                Quick Info
            </h3>
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
    );
}

// ============================================
// CONTACT INFO COMPONENT
// ============================================
export function ContactInfoCard({ hotel }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-sans font-bold text-gray-900 mb-4 lg:mb-5 xl:mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                Contact
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-gray-700 font-sans">
                {hotel.address && (
                    <div className="flex items-start gap-2">
                        <Icons.Address className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <div className="font-medium text-gray-900 mb-1">Address</div>
                            {hotel.address}
                        </div>
                    </div>
                )}
                {hotel.phone && (
                    <div className="flex items-start gap-2">
                        <Icons.Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <div className="font-medium text-gray-900 mb-1">Phone</div>
                            <a href={`tel:${hotel.phone}`} className="text-gray-900 hover:text-gray-700 transition-colors duration-300">{hotel.phone}</a>
                        </div>
                    </div>
                )}
                {hotel.email && (
                    <div className="flex items-start gap-2">
                        <Icons.Email className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <div className="font-medium text-gray-900 mb-1">Email</div>
                            <a href={`mailto:${hotel.email}`} className="text-gray-900 hover:text-gray-700 break-all transition-colors duration-300">
                                {hotel.email}
                            </a>
                        </div>
                    </div>
                )}
                {hotel.website && (
                    <div className="flex items-start gap-2">
                        <Icons.Website className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <div className="font-medium text-gray-900 mb-1">Website</div>
                            <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 break-all transition-colors duration-300">
                                {hotel.website.replace(/^https?:\/\//, '')}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// SIDEBAR WRAPPER COMPONENT
// ============================================
export function Sidebar({ hotel, onBookingClick }) {
    return (
        <div className="lg:col-span-1">
            <div className="sticky top-4 lg:top-6 xl:top-8 space-y-5 sm:space-y-6 lg:space-y-7 xl:space-y-8">
                <BookingCard hotel={hotel} onBookingClick={onBookingClick} />
                <PromotionalBanner hotel={hotel} onBookingClick={onBookingClick} />
                <HotelBadgesCard hotel={hotel} />
                <VerificationBadgeCard hotel={hotel} />
                <QuickStatsCard hotel={hotel} />
                <ContactInfoCard hotel={hotel} />
            </div>
        </div>
    );
}

export default Sidebar;

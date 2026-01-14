import { Icons } from './Icons';

// ============================================
// BOOKING CARD COMPONENT
// ============================================
export function BookingCard({ hotel, onBookingClick }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-sans font-semibold text-gray-900 mb-4 lg:mb-5 xl:mb-6 flex items-center gap-2">
                <Icons.Money className="w-5 h-5" />
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
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg p-5 sm:p-6 text-white">
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
// VERIFICATION BADGE COMPONENT
// ============================================
export function VerificationBadgeCard({ hotel }) {
    if (hotel.subscription_tier !== 'premium') return null;

    return (
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
    );
}

// ============================================
// QUICK STATS COMPONENT
// ============================================
export function QuickStatsCard({ hotel }) {
    return (
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
    );
}

// ============================================
// CONTACT INFO COMPONENT
// ============================================
export function ContactInfoCard({ hotel }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
            <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-sans font-semibold text-gray-900 mb-4 lg:mb-5 xl:mb-6">Contact</h3>
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
                <VerificationBadgeCard hotel={hotel} />
                <QuickStatsCard hotel={hotel} />
                <ContactInfoCard hotel={hotel} />
            </div>
        </div>
    );
}

export default Sidebar;

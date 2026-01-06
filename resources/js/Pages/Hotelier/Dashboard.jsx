import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function HotelierDashboard({ hotels, pendingClaim, recentReviews, stats }) {
    const { auth } = usePage().props;
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <Head title="Hotelier Dashboard" />
            
            <div className="min-h-screen bg-white font-sans">
                {/* Hotelier Navigation */}
                <nav className="bg-white border-b-2 border-orange-200 shadow-lg sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo and Brand */}
                            <div className="flex items-center gap-4 sm:gap-8">
                                <Link href="/" className="flex items-center flex-shrink-0">
                                    <span className="text-xl sm:text-2xl font-bold">
                                        <span className="text-red-500">sun</span>
                                        <span className="text-orange-500">bed</span>
                                        <span className="text-blue-500">ranker</span>
                                    </span>
                                    <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-bold text-gray-700 border-l-2 pl-2 sm:pl-3">Hotelier</span>
                                </Link>

                                {/* Desktop Navigation Links */}
                                <div className="hidden md:flex items-center gap-1">
                                    <Link
                                        href={route('hotelier.dashboard')}
                                        className={`px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                                            route().current('hotelier.dashboard')
                                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                                : 'text-gray-700 hover:bg-orange-50'
                                        }`}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route('hotelier.claims.index')}
                                        className={`px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                                            route().current('hotelier.claims.*')
                                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                                : 'text-gray-700 hover:bg-orange-50'
                                        }`}
                                    >
                                        My Claims
                                    </Link>
                                </div>
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center gap-2 sm:gap-4">
                                {/* Back to Site - Hidden on small mobile */}
                                <Link
                                    href="/"
                                    className="hidden sm:block text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300 transform hover:scale-105"
                                >
                                    ← Back to Site
                                </Link>

                                {/* User Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                                        className="flex items-center gap-2 px-2 sm:px-3 py-2 border-2 border-gray-300 rounded-lg hover:border-orange-300 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-md">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden sm:block text-sm font-bold text-gray-900 max-w-[100px] truncate">{auth.user.name}</span>
                                        <svg className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {showUserDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl py-1 z-50 border-2 border-gray-100">
                                            <div className="px-4 py-2 border-b-2 border-gray-100">
                                                <p className="text-sm font-bold text-gray-900 truncate">{auth.user.name}</p>
                                                <p className="text-xs text-gray-600 font-semibold truncate">{auth.user.email}</p>
                                            </div>
                                            <Link
                                                href={route('profile.edit')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 font-semibold transition-colors duration-300"
                                            >
                                                Profile Settings
                                            </Link>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors duration-300"
                                            >
                                                Logout
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                    className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-orange-50 transition-colors duration-300"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {showMobileMenu ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        {showMobileMenu && (
                            <div className="md:hidden border-t-2 border-gray-200 py-4 space-y-2">
                                <Link
                                    href={route('hotelier.dashboard')}
                                    className={`block px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                                        route().current('hotelier.dashboard')
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                            : 'text-gray-700 hover:bg-orange-50'
                                    }`}
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('hotelier.claims.index')}
                                    className={`block px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                                        route().current('hotelier.claims.*')
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                            : 'text-gray-700 hover:bg-orange-50'
                                    }`}
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    My Claims
                                </Link>
                                <Link
                                    href="/"
                                    className="block sm:hidden px-3 py-2 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50 transition-all duration-300"
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    ← Back to Site
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Page Header */}
                <div className="bg-gradient-to-r from-orange-50 to-blue-50 shadow-lg border-b-2 border-orange-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
                        {/* Decorative accent */}
                        <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                            <div className="h-1 w-8 sm:w-10 md:w-12 lg:w-16 bg-orange-300 rounded-full"></div>
                            <svg className="mx-3 sm:mx-4 text-orange-500" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                            </svg>
                            <div className="h-1 w-8 sm:w-10 md:w-12 lg:w-16 bg-blue-300 rounded-full"></div>
                        </div>
                        <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 text-center">Hotelier Dashboard</h1>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 2xl:py-24">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20">
                        <StatCard
                            title="Total Hotels"
                            value={stats.total_hotels}
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M3 21h18M9 8h1m0 0h1m-1 0v12m0-12V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m0 0h1m-1 0v12m-6 0h6m-9 0H3m0 0V8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v13"/>
                                </svg>
                            }
                        />
                        <StatCard
                            title="Average Score"
                            value={stats.average_score ? Number(stats.average_score).toFixed(1) : 'N/A'}
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                </svg>
                            }
                        />
                        <StatCard
                            title="Total Reviews"
                            value={stats.total_reviews}
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                                </svg>
                            }
                        />
                    </div>

                    {/* Pending Claim Alert */}
                    {pendingClaim && (
                        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-lg">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-yellow-900 mb-2 sm:mb-3">Pending Claim</h3>
                                    <p className="text-sm sm:text-base text-yellow-800 font-semibold leading-relaxed">
                                        Your claim for <span className="font-bold break-words">{pendingClaim.hotel.name}</span> is currently under review.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hotels List */}
                    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 md:p-8 border-2 border-gray-100 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                        <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-5 sm:mb-6">My Hotels</h3>
                        {hotels && hotels.length > 0 ? (
                            <>
                                {/* Desktop Table View - Hidden on mobile */}
                                <div className="hidden md:block overflow-x-auto -mx-5 sm:-mx-6 md:-mx-8">
                                    <div className="inline-block min-w-full align-middle">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full divide-y-2 divide-gray-200">
                                                <thead className="bg-gradient-to-r from-orange-50 to-blue-50">
                                                    <tr>
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                                                            Hotel Name
                                                        </th>
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                                                            Destination
                                                        </th>
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                                                            Score
                                                        </th>
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                                                            Reviews
                                                        </th>
                                                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-100">
                                                    {hotels.map((hotel) => (
                                                        <tr key={hotel.id} className="hover:bg-orange-50 transition-colors duration-300">
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                                <div className="text-sm font-bold text-gray-900">{hotel.name}</div>
                                                            </td>
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-700 font-semibold">{hotel.destination}</div>
                                                            </td>
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900 font-bold">{hotel.score ? Number(hotel.score).toFixed(1) : 'N/A'}</div>
                                                            </td>
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900 font-bold">{hotel.total_reviews}</div>
                                                            </td>
                                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-bold">
                                                                <Link
                                                                    href={route('hotels.show', hotel.slug)}
                                                                    className="text-orange-600 hover:text-orange-700 font-bold uppercase text-xs transition-all duration-300 transform hover:scale-105"
                                                                >
                                                                    View
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Card View - Hidden on desktop */}
                                <div className="md:hidden space-y-4">
                                    {hotels.map((hotel) => (
                                        <div key={hotel.id} className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-4 border-2 border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-300">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900 text-base mb-1">{hotel.name}</h4>
                                                    <p className="text-xs text-gray-700 font-semibold uppercase tracking-wide">{hotel.destination}</p>
                                                </div>
                                                <Link
                                                    href={route('hotels.show', hotel.slug)}
                                                    className="ml-3 text-orange-600 hover:text-orange-700 font-bold uppercase text-xs transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                            <div className="flex gap-6 text-sm">
                                                <div>
                                                    <span className="text-xs text-gray-700 font-bold uppercase tracking-wider block mb-1">Score</span>
                                                    <span className="text-gray-900 font-bold">{hotel.score ? Number(hotel.score).toFixed(1) : 'N/A'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-700 font-bold uppercase tracking-wider block mb-1">Reviews</span>
                                                    <span className="text-gray-900 font-bold">{hotel.total_reviews}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-600 font-semibold">You don't have any hotels yet.</p>
                        )}
                    </div>

                    {/* Recent Reviews */}
                    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 md:p-8 border-2 border-gray-100">
                        <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-5 sm:mb-6">Recent Reviews</h3>
                        {recentReviews && recentReviews.length > 0 ? (
                            <div className="space-y-4 sm:space-y-5">
                                {recentReviews.map((review) => (
                                    <div key={review.id} className="border-b-2 border-gray-200 pb-4 sm:pb-5 last:border-b-0 last:pb-0">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
                                            <div className="flex-1">
                                                <p className="font-bold text-gray-900 text-base sm:text-lg">{review.hotel.name}</p>
                                                <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">by {review.user.name}</p>
                                            </div>
                                            <div className="text-orange-500 flex items-center gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < review.rating ? 'fill-current' : 'fill-gray-300'}`}
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm sm:text-base text-gray-700 font-medium leading-relaxed">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 font-semibold">No reviews yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

function StatCard({ title, value, subtitle, icon, link }) {
    const card = (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 md:p-8 border-2 border-gray-100 group transform hover:scale-105">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1">
                    <div className="text-gray-700 font-bold text-xs sm:text-sm uppercase mb-2 sm:mb-3">{title}</div>
                    <div className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">{value}</div>
                    {subtitle && (
                        <div className="text-gray-600 font-semibold text-xs sm:text-sm mt-1 sm:mt-2">{subtitle}</div>
                    )}
                </div>
                <div className="text-orange-400 group-hover:text-orange-600 transition-colors duration-300 flex-shrink-0 ml-2">
                    {icon}
                </div>
            </div>
        </div>
    );

    return link ? (
        <Link href={link} className="block">
            {card}
        </Link>
    ) : card;
}

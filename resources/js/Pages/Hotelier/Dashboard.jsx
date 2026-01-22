import { Head, Link, usePage } from '@inertiajs/react';
import HotelierNav from '@/Components/HotelierNav';

export default function HotelierDashboard({ hotels, pendingClaim, recentReviews, stats, subscription }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Hotelier Dashboard" />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <HotelierNav />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Hotelier Dashboard</h1>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Welcome back, {auth.user.name}</p>
                        </div>
                        {subscription && (
                            <span className={`self-start sm:self-auto px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full ${
                                subscription.tier === 'premium' ? 'bg-purple-100 text-purple-700' :
                                subscription.tier === 'enhanced' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'
                            }`}>
                                {subscription.tier?.charAt(0).toUpperCase() + subscription.tier?.slice(1)} Plan
                            </span>
                        )}
                    </div>

                    {/* Free Tier Upgrade Banner */}
                    {subscription?.tier === 'free' && (
                        <div className="mb-4 sm:mb-6 bg-orange-50 border border-orange-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                                <div className="flex-shrink-0 hidden sm:block">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">Upgrade Your Subscription</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                        Upgrade to <span className="font-medium text-blue-600">Enhanced</span> or <span className="font-medium text-purple-600">Premium</span> to claim and manage your hotel profiles.
                                    </p>
                                    <div className="flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500">
                                        <span className="inline-flex items-center gap-1">
                                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Claim Ownership
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Edit Profiles
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Upload Images
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href="/hotelier/upgrade"
                                    className="w-full sm:w-auto flex-shrink-0 px-3 sm:px-4 py-2 bg-orange-500 text-white font-medium text-xs sm:text-sm rounded-lg hover:bg-orange-600 transition-colors text-center"
                                >
                                    Upgrade Now
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Stats Overview - MiniStatCard style */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                        <MiniStatCard
                            icon={
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                                </svg>
                            }
                            value={stats.total_hotels}
                            label="HOTELS"
                            bgColor="bg-orange-50"
                        />
                        <MiniStatCard
                            icon={
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                                </svg>
                            }
                            value={stats.average_score ? Number(stats.average_score).toFixed(1) : 'N/A'}
                            label="AVG SCORE"
                            bgColor="bg-yellow-50"
                        />
                        <MiniStatCard
                            icon={
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
                                </svg>
                            }
                            value={stats.total_reviews}
                            label="REVIEWS"
                            bgColor="bg-cyan-50"
                        />
                    </div>

                    {/* Pending Claim Alert */}
                    {pendingClaim && (
                        <div className="mb-4 sm:mb-6 bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="flex items-start gap-2 sm:gap-3">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5 sm:mb-1">Pending Claim</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Your claim for <span className="font-medium">{pendingClaim.hotel.name}</span> is currently under review.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        {/* Hotels List - Takes 2 columns on xl screens */}
                        <div className="xl:col-span-2 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6">
                            <div className="flex justify-between items-center mb-3 sm:mb-4">
                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">My Hotels</h3>
                                {hotels && hotels.length > 0 && (
                                    <span className="text-xs sm:text-sm text-gray-500">{hotels.length} total</span>
                                )}
                            </div>
                            {hotels && hotels.length > 0 ? (
                                <>
                                    {/* Desktop/Tablet Table View */}
                                    <div className="hidden sm:block overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="text-left text-[10px] sm:text-xs text-gray-500 border-b border-gray-100">
                                                    <th className="pb-2 sm:pb-3 font-medium">Hotel Name</th>
                                                    <th className="pb-2 sm:pb-3 font-medium">Destination</th>
                                                    <th className="pb-2 sm:pb-3 font-medium">Score</th>
                                                    <th className="pb-2 sm:pb-3 font-medium">Reviews</th>
                                                    <th className="pb-2 sm:pb-3 font-medium">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {hotels.map((hotel) => (
                                                    <tr key={hotel.id} className="border-b border-gray-50 hover:bg-gray-50">
                                                        <td className="py-2 sm:py-3">
                                                            <span className="text-xs sm:text-sm font-medium text-gray-900">{hotel.name}</span>
                                                        </td>
                                                        <td className="py-2 sm:py-3">
                                                            <span className="text-xs sm:text-sm text-gray-500">{hotel.destination}</span>
                                                        </td>
                                                        <td className="py-2 sm:py-3">
                                                            <span className="text-xs sm:text-sm font-medium text-gray-900">{hotel.score ? Number(hotel.score).toFixed(1) : 'N/A'}</span>
                                                        </td>
                                                        <td className="py-2 sm:py-3">
                                                            <span className="text-xs sm:text-sm text-gray-900">{hotel.total_reviews}</span>
                                                        </td>
                                                        <td className="py-2 sm:py-3">
                                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                                <Link
                                                                    href={route('hotels.show', hotel.slug)}
                                                                    className="text-orange-600 hover:text-orange-700 text-xs sm:text-sm font-medium"
                                                                >
                                                                    View
                                                                </Link>
                                                                {(subscription?.tier === 'premium' || subscription?.tier === 'enhanced') && (
                                                                    <Link
                                                                        href={route('hotelier.hotels.analytics', hotel.slug)}
                                                                        className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-orange-500 text-white rounded text-[10px] sm:text-xs font-medium hover:bg-orange-600 transition-colors"
                                                                    >
                                                                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                                        </svg>
                                                                        <span className="hidden md:inline">Analytics</span>
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile Card View */}
                                    <div className="sm:hidden space-y-2">
                                        {hotels.map((hotel) => (
                                            <div key={hotel.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                                <div className="flex justify-between items-start mb-1.5">
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-gray-900 text-sm truncate">{hotel.name}</h4>
                                                        <p className="text-[10px] text-gray-500">{hotel.destination}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 text-[10px] mb-2">
                                                    <div>
                                                        <span className="text-gray-500 block">Score</span>
                                                        <span className="font-medium text-gray-900">{hotel.score ? Number(hotel.score).toFixed(1) : 'N/A'}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500 block">Reviews</span>
                                                        <span className="font-medium text-gray-900">{hotel.total_reviews}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={route('hotels.show', hotel.slug)}
                                                        className="text-orange-600 hover:text-orange-700 text-[10px] font-medium"
                                                    >
                                                        View
                                                    </Link>
                                                    {(subscription?.tier === 'premium' || subscription?.tier === 'enhanced') && (
                                                        <Link
                                                            href={route('hotelier.hotels.analytics', hotel.slug)}
                                                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-orange-500 text-white rounded text-[10px] font-medium hover:bg-orange-600 transition-colors"
                                                        >
                                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                            </svg>
                                                            Analytics
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-6 sm:py-8">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 text-xs sm:text-sm">You don't have any hotels yet.</p>
                                </div>
                            )}
                        </div>

                        {/* Recent Reviews Sidebar */}
                        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6">
                            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Recent Reviews</h3>
                            {recentReviews && recentReviews.length > 0 ? (
                                <div className="space-y-3 sm:space-y-4 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                                    {recentReviews.map((review) => (
                                        <div key={review.id} className="pb-3 sm:pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                            <div className="flex justify-between items-start mb-1.5 sm:mb-2 gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{review.hotel.name}</p>
                                                    <p className="text-[10px] sm:text-xs text-gray-500">by {review.user.name}</p>
                                                </div>
                                                <div className="text-orange-500 flex items-center gap-0.5 flex-shrink-0">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < review.rating ? 'fill-current' : 'fill-gray-300'}`}
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-[10px] sm:text-sm text-gray-600 line-clamp-2">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4 sm:py-6">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 text-xs sm:text-sm">No reviews yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6">
                        <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Quick Actions</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                            <Link
                                href="/hotels"
                                className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-orange-50 rounded-lg sm:rounded-xl hover:bg-orange-100 transition-colors group"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                                    </svg>
                                </div>
                                <span className="font-medium text-gray-900 text-[10px] sm:text-sm text-center sm:text-left">Browse Hotels</span>
                            </Link>
                            {(subscription?.tier === 'premium' || subscription?.tier === 'enhanced') && (
                                <Link
                                    href="/hotels"
                                    className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl hover:bg-green-100 transition-colors group"
                                >
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <span className="font-medium text-gray-900 text-[10px] sm:text-sm text-center sm:text-left">Claim Hotel</span>
                                </Link>
                            )}
                            <Link
                                href="/hotelier/profile"
                                className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl hover:bg-blue-100 transition-colors group"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                </div>
                                <span className="font-medium text-gray-900 text-[10px] sm:text-sm text-center sm:text-left">My Profile</span>
                            </Link>
                            <Link
                                href="/hotelier/upgrade"
                                className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-purple-50 rounded-lg sm:rounded-xl hover:bg-purple-100 transition-colors group"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                                    </svg>
                                </div>
                                <span className="font-medium text-gray-900 text-[10px] sm:text-sm text-center sm:text-left">Upgrade Plan</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function MiniStatCard({ icon, value, label, bgColor }) {
    return (
        <div className={`${bgColor} rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3`}>
            <div className="flex-shrink-0">
                {icon}
            </div>
            <div className="text-center sm:text-left">
                <div className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{value}</div>
                <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 font-medium">{label}</div>
            </div>
        </div>
    );
}



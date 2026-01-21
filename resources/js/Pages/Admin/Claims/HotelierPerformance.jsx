import { Link, Head } from '@inertiajs/react';
import AdminNav from '@/Components/AdminNav';

export default function HotelierPerformance({ hotelier, hotels, performance, dailyStats, claims }) {
    return (
        <>
            <Head title={`${hotelier.name} - Performance`} />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                        <Link href={route('admin.claims.index')} className="hover:text-gray-700">
                            Hoteliers
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900 truncate max-w-[150px] sm:max-w-none">{hotelier.name}</span>
                    </div>

                    {/* Header */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl flex-shrink-0">
                                    {hotelier.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">{hotelier.name}</h1>
                                        <TierBadge tier={hotelier.subscription_tier} />
                                    </div>
                                    <p className="text-gray-500 text-sm sm:text-base truncate">{hotelier.email}</p>
                                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
                                        Member since {formatDate(hotelier.created_at)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <Link
                                    href={`mailto:${hotelier.email}`}
                                    className="flex-1 sm:flex-none text-center px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Performance Overview */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                        <StatCard 
                            label="Profile Views" 
                            value={formatNumber(performance.total_views)}
                            icon={<EyeIcon />}
                            color="blue"
                        />
                        <StatCard 
                            label="Link Clicks" 
                            value={formatNumber(performance.total_clicks)}
                            icon={<ClickIcon />}
                            color="green"
                        />
                        <StatCard 
                            label="Affiliate Clicks" 
                            value={formatNumber(performance.total_affiliate_clicks)}
                            icon={<LinkIcon />}
                            color="purple"
                        />
                        <StatCard 
                            label="Revenue" 
                            value={`€${formatNumber(performance.total_revenue)}`}
                            icon={<CurrencyIcon />}
                            color="emerald"
                        />
                        <StatCard 
                            label="Avg Score" 
                            value={performance.average_score ? Number(performance.average_score).toFixed(1) : 'N/A'}
                            icon={<StarIcon />}
                            color="orange"
                        />
                    </div>

                    {/* Subscription Details */}
                    {hotelier.active_subscription && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Current Subscription</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500">Plan</p>
                                    <p className="text-base sm:text-lg font-semibold text-gray-900 capitalize">
                                        {hotelier.active_subscription.tier}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500">Period</p>
                                    <p className="text-base sm:text-lg font-semibold text-gray-900">
                                        {hotelier.active_subscription.period_months} months
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500">Amount Paid</p>
                                    <p className="text-base sm:text-lg font-semibold text-gray-900">
                                        €{hotelier.active_subscription.total_amount}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500">Expires</p>
                                    <p className={`text-base sm:text-lg font-semibold ${
                                        new Date(hotelier.active_subscription.ends_at) < new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
                                            ? 'text-red-600'
                                            : 'text-gray-900'
                                    }`}>
                                        {formatDate(hotelier.active_subscription.ends_at)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hotels */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                            Managed Hotels ({hotels.length})
                        </h2>
                        
                        {hotels.length === 0 ? (
                            <p className="text-gray-500 text-center py-6 sm:py-8 text-sm">No hotels managed yet</p>
                        ) : (
                            <div className="grid gap-3 sm:gap-4">
                                {hotels.map((hotel) => (
                                    <div 
                                        key={hotel.id} 
                                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors gap-3 sm:gap-4"
                                    >
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <img 
                                                src={hotel.main_image || '/images/default-hotel.jpg'}
                                                alt={hotel.name}
                                                className="w-14 h-10 sm:w-16 sm:h-12 rounded-lg object-cover flex-shrink-0"
                                            />
                                            <div className="min-w-0">
                                                <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{hotel.name}</p>
                                                <p className="text-xs sm:text-sm text-gray-500 truncate">{hotel.destination?.name}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-500">
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-900">{formatNumber(hotel.view_count)}</p>
                                                <p className="text-[10px] sm:text-xs">Views</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-gray-900">{formatNumber(hotel.click_count)}</p>
                                                <p className="text-[10px] sm:text-xs">Clicks</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-orange-600">{hotel.overall_score ? Number(hotel.overall_score).toFixed(1) : 'N/A'}</p>
                                                <p className="text-[10px] sm:text-xs">Score</p>
                                            </div>
                                            <Link
                                                href={route('admin.hotels.edit', hotel.id)}
                                                className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors whitespace-nowrap"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Claims History */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                            Claims History ({claims.length})
                        </h2>
                        
                        {claims.length === 0 ? (
                            <p className="text-gray-500 text-center py-6 sm:py-8 text-sm">No claims submitted</p>
                        ) : (
                            <>
                                {/* Desktop Table */}
                                <div className="hidden sm:block overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50 border-b border-gray-100">
                                            <tr>
                                                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Hotel</th>
                                                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                                                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {claims.map((claim) => (
                                                <tr key={claim.id} className="hover:bg-gray-50">
                                                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                                                        <p className="text-xs sm:text-sm font-medium text-gray-900">{claim.hotel?.name}</p>
                                                    </td>
                                                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                                                        <StatusBadge status={claim.status} />
                                                    </td>
                                                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-500">
                                                        {formatDate(claim.created_at)}
                                                    </td>
                                                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                                                        <Link
                                                            href={route('admin.claims.show', claim.id)}
                                                            className="text-orange-600 hover:text-orange-700 text-xs sm:text-sm font-medium"
                                                        >
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Mobile Cards */}
                                <div className="sm:hidden space-y-3">
                                    {claims.map((claim) => (
                                        <div key={claim.id} className="border border-gray-100 rounded-lg p-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-sm font-medium text-gray-900 truncate flex-1 mr-2">{claim.hotel?.name}</p>
                                                <StatusBadge status={claim.status} />
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>{formatDate(claim.created_at)}</span>
                                                <Link
                                                    href={route('admin.claims.show', claim.id)}
                                                    className="text-orange-600 hover:text-orange-700 font-medium"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

// Helper Components
function StatCard({ label, value, icon, color }) {
    const colors = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        orange: 'bg-orange-50 text-orange-600',
    };

    return (
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
                <div className={`p-1.5 sm:p-2 rounded-lg ${colors[color]} [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5`}>
                    {icon}
                </div>
                <div className="min-w-0">
                    <div className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">{value}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500 truncate">{label}</div>
                </div>
            </div>
        </div>
    );
}

function TierBadge({ tier }) {
    const styles = {
        premium: 'bg-purple-100 text-purple-700',
        enhanced: 'bg-orange-100 text-orange-700',
        free: 'bg-gray-100 text-gray-600',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[tier] || styles.free}`}>
            {tier?.charAt(0).toUpperCase() + tier?.slice(1) || 'Free'}
        </span>
    );
}

function StatusBadge({ status }) {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-700',
        approved: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

// Helper Functions
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toLocaleString() || '0';
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

// Icons
function EyeIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
    );
}

function ClickIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.414 1.415l.708-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
        </svg>
    );
}

function LinkIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
        </svg>
    );
}

function CurrencyIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
    );
}

function StarIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    );
}

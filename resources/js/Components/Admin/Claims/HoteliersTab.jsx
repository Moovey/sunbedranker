// HoteliersTab Component
// Displays hoteliers list with performance stats and actions

import { Link } from '@inertiajs/react';
import TierBadge from '@/Components/Admin/TierBadge';
import Pagination from '@/Components/Admin/Pagination';
import EmptyState from '@/Components/Admin/EmptyState';
import { UsersIcon } from '@/Components/Admin/Icons';
import { formatDate, formatNumber } from '@/Components/Admin/helpers';

export default function HoteliersTab({ hoteliers, onManageSubscription, onGrantAccess }) {
    if (hoteliers.data.length === 0) {
        return (
            <EmptyState 
                icon={<UsersIcon className="w-12 h-12" />}
                title="No hoteliers found"
                description="There are no hoteliers matching your filters."
            />
        );
    }

    return (
        <>
            <div className="divide-y divide-gray-100">
                {hoteliers.data.map((hotelier) => (
                    <HotelierCard 
                        key={hotelier.id} 
                        hotelier={hotelier}
                        onManageSubscription={onManageSubscription}
                        onGrantAccess={onGrantAccess}
                    />
                ))}
            </div>
            <Pagination links={hoteliers.links} from={hoteliers.from} to={hoteliers.to} total={hoteliers.total} />
        </>
    );
}

function HotelierCard({ hotelier, onManageSubscription, onGrantAccess }) {
    return (
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 sm:gap-4">
                {/* Hotelier Info */}
                <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-base sm:text-lg flex-shrink-0">
                        {hotelier.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate max-w-[180px] sm:max-w-none">{hotelier.name}</h3>
                            <TierBadge tier={hotelier.subscription_tier} />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{hotelier.email}</p>
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
                            Joined {formatDate(hotelier.created_at)}
                        </p>
                    </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-6 bg-gray-50 sm:bg-transparent rounded-lg p-2 sm:p-0">
                    <div className="text-center">
                        <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">{hotelier.hotels_count}</div>
                        <div className="text-[10px] sm:text-xs text-gray-500">Hotels</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">{formatNumber(hotelier.total_views)}</div>
                        <div className="text-[10px] sm:text-xs text-gray-500">Views</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">{formatNumber(hotelier.total_clicks)}</div>
                        <div className="text-[10px] sm:text-xs text-gray-500">Clicks</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm sm:text-base lg:text-lg font-bold text-emerald-600">€{formatNumber(hotelier.total_revenue)}</div>
                        <div className="text-[10px] sm:text-xs text-gray-500">Revenue</div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Link
                        href={route('admin.hoteliers.performance', hotelier.id)}
                        className="flex-1 sm:flex-none text-center px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                        View Details
                    </Link>
                    <button
                        onClick={() => onManageSubscription(hotelier)}
                        className="flex-1 sm:flex-none px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors whitespace-nowrap"
                    >
                        Manage Plan
                    </button>
                    <button
                        onClick={() => onGrantAccess(hotelier)}
                        className="flex-1 sm:flex-none px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors whitespace-nowrap"
                    >
                        Grant Access
                    </button>
                </div>
            </div>

            {/* Hotels Preview */}
            {hotelier.hotels && hotelier.hotels.length > 0 && (
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                    <p className="text-[10px] sm:text-xs font-medium text-gray-500 mb-1.5 sm:mb-2">MANAGED HOTELS</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {hotelier.hotels.map((hotel) => (
                            <Link
                                key={hotel.id}
                                href={route('admin.hotels.edit', hotel.id)}
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                                <img 
                                    src={hotel.main_image || '/images/default-hotel.jpg'} 
                                    alt={hotel.name}
                                    className="w-4 h-4 sm:w-5 sm:h-5 rounded object-cover flex-shrink-0"
                                />
                                <span className="truncate max-w-[100px] sm:max-w-none">{hotel.name}</span>
                            </Link>
                        ))}
                        {hotelier.hotels_count > 3 && (
                            <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-500">
                                +{hotelier.hotels_count - 3} more
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Subscription Info */}
            {hotelier.active_subscription && (
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-4 text-xs sm:text-sm">
                    <span className="text-gray-500">
                        <strong>Current Plan:</strong> {hotelier.active_subscription.tier_name}
                    </span>
                    {hotelier.active_subscription.ends_at && (
                        <span className={`${
                            new Date(hotelier.active_subscription.ends_at) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                                ? 'text-red-600'
                                : 'text-gray-500'
                        }`}>
                            <strong>Expires:</strong> {formatDate(hotelier.active_subscription.ends_at)}
                        </span>
                    )}
                    <span className="text-gray-500">
                        <strong>Payment:</strong> {hotelier.active_subscription.payment_method || 'N/A'}
                    </span>
                </div>
            )}
        </div>
    );
}

// ClaimsTab Component
// Displays hotel claims table with status and actions

import { Link } from '@inertiajs/react';
import StatusBadge from '@/Components/Admin/StatusBadge';
import Pagination from '@/Components/Admin/Pagination';
import EmptyState from '@/Components/Admin/EmptyState';
import { DocumentIcon } from '@/Components/Admin/Icons';
import { formatDate } from '@/Components/Admin/helpers';

export default function ClaimsTab({ claims }) {
    if (claims.data.length === 0) {
        return (
            <EmptyState 
                icon={<DocumentIcon />}
                title="No claims found"
                description="There are no hotel claims matching your filters."
            />
        );
    }

    return (
        <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                            <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claimant</th>
                            <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                            <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {claims.data.map((claim) => (
                            <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3 lg:px-6 py-3 lg:py-4">
                                    <div className="flex items-center gap-2 lg:gap-3">
                                        <img
                                            src={claim.hotel?.main_image || '/images/default-hotel.jpg'}
                                            alt={claim.hotel?.name}
                                            className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg object-cover flex-shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate max-w-[120px] lg:max-w-[180px]">{claim.hotel?.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{claim.hotel?.destination?.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 lg:px-6 py-3 lg:py-4">
                                    <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">{claim.user?.name}</p>
                                    <p className="text-xs text-gray-500 truncate max-w-[120px]">{claim.user?.email}</p>
                                </td>
                                <td className="px-3 lg:px-6 py-3 lg:py-4">
                                    <p className="text-sm text-gray-900 truncate max-w-[140px]">{claim.official_email}</p>
                                    <p className="text-xs text-gray-500">{claim.phone}</p>
                                </td>
                                <td className="px-3 lg:px-6 py-3 lg:py-4">
                                    <StatusBadge status={claim.status} />
                                </td>
                                <td className="px-3 lg:px-6 py-3 lg:py-4 text-sm text-gray-500">
                                    {formatDate(claim.created_at)}
                                </td>
                                <td className="px-3 lg:px-6 py-3 lg:py-4">
                                    <Link
                                        href={route('admin.claims.show', claim.id)}
                                        className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
                                    >
                                        Review
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-100">
                {claims.data.map((claim) => (
                    <div key={claim.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                        {/* Hotel Info */}
                        <div className="flex items-start gap-3 mb-3">
                            <img
                                src={claim.hotel?.main_image || '/images/default-hotel.jpg'}
                                alt={claim.hotel?.name}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{claim.hotel?.name}</p>
                                        <p className="text-xs text-gray-500">{claim.hotel?.destination?.name}</p>
                                    </div>
                                    <StatusBadge status={claim.status} />
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                            <div>
                                <p className="text-xs text-gray-500">Claimant</p>
                                <p className="font-medium text-gray-900 truncate">{claim.user?.name}</p>
                                <p className="text-xs text-gray-500 truncate">{claim.user?.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Contact</p>
                                <p className="text-gray-900 truncate text-xs sm:text-sm">{claim.official_email}</p>
                                <p className="text-xs text-gray-500">{claim.phone}</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <span className="text-xs text-gray-500">
                                Submitted {formatDate(claim.created_at)}
                            </span>
                            <Link
                                href={route('admin.claims.show', claim.id)}
                                className="text-orange-600 hover:text-orange-700 font-medium text-xs sm:text-sm transition-colors"
                            >
                                Review Claim
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination links={claims.links} from={claims.from} to={claims.to} total={claims.total} />
        </>
    );
}

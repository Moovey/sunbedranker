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
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claimant</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {claims.data.map((claim) => (
                            <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={claim.hotel?.main_image || '/images/default-hotel.jpg'}
                                            alt={claim.hotel?.name}
                                            className="w-10 h-10 rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{claim.hotel?.name}</p>
                                            <p className="text-xs text-gray-500">{claim.hotel?.destination?.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-gray-900">{claim.user?.name}</p>
                                    <p className="text-xs text-gray-500">{claim.user?.email}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-gray-900">{claim.official_email}</p>
                                    <p className="text-xs text-gray-500">{claim.phone}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={claim.status} />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {formatDate(claim.created_at)}
                                </td>
                                <td className="px-6 py-4">
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
            <Pagination links={claims.links} from={claims.from} to={claims.to} total={claims.total} />
        </>
    );
}

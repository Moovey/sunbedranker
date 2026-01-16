import { Link, Head, router } from '@inertiajs/react';
import AdminNav from '@/Components/AdminNav';

export default function ClaimsIndex({ claims, filters, stats }) {
    const handleStatusFilter = (status) => {
        router.get(route('admin.claims.index'), { status }, { preserveState: true });
    };

    const getStatusBadge = (status) => {
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
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Head title="Hotel Claims Management" />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav stats={stats} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Hotel Claims</h1>
                            <p className="text-gray-500 text-sm mt-1">Review and manage hotel ownership claims</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-yellow-50 rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900">{stats.pending}</div>
                                <div className="text-xs text-gray-500 font-medium">PENDING REVIEW</div>
                            </div>
                        </div>

                        <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900">{stats.approved}</div>
                                <div className="text-xs text-gray-500 font-medium">APPROVED</div>
                            </div>
                        </div>

                        <div className="bg-red-50 rounded-xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-gray-900">{stats.rejected}</div>
                                <div className="text-xs text-gray-500 font-medium">REJECTED</div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <h2 className="font-semibold text-gray-900 mb-4">Filter Claims</h2>
                        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Status
                                </label>
                                <select
                                    value={filters.status || 'all'}
                                    onChange={(e) => handleStatusFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>

                            <div>
                                {/* Empty column for consistency */}
                            </div>

                            <div>
                                {/* Empty column for consistency */}
                            </div>

                            <div className="flex items-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleStatusFilter('all')}
                                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm"
                                >
                                    Clear
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Claims Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {claims.data.length === 0 ? (
                            <div className="p-12 text-center">
                                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-500 text-sm">No claims found</p>
                            </div>
                        ) : (
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
                                                    {getStatusBadge(claim.status)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {formatDate(claim.created_at)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link
                                                        href={route('admin.claims.show', claim.id)}
                                                        className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
                                                    >
                                                        Review
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {claims.links && (
                            <div className="bg-white px-6 py-4 border-t border-gray-100">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-sm text-gray-500">
                                        Showing <span className="font-medium text-gray-900">{claims.from}</span> to{' '}
                                        <span className="font-medium text-gray-900">{claims.to}</span> of{' '}
                                        <span className="font-medium text-gray-900">{claims.total}</span> results
                                    </div>
                                    <div className="flex gap-1 flex-wrap justify-center">
                                        {claims.links.map((link, index) => (
                                            link.url ? (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                                                        link.active
                                                            ? 'bg-orange-500 text-white'
                                                            : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1.5 text-sm text-gray-400"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

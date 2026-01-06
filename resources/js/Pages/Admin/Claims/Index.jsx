import { Link, Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function ClaimsIndex({ claims, filters, stats }) {
    const handleStatusFilter = (status) => {
        router.get(route('admin.claims.index'), { status }, { preserveState: true });
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            approved: 'bg-green-100 text-green-800 border-green-300',
            rejected: 'bg-red-100 text-red-800 border-red-300',
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${styles[status]}`}>
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
        <AdminLayout>
            <Head title="Hotel Claims Management" />

            <div className="py-6 sm:py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Hotel Claims</h1>
                        <p className="text-gray-600 mt-2">Review and manage hotel ownership claims</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-yellow-600 font-semibold">Pending Review</p>
                                    <p className="text-3xl font-bold text-yellow-900 mt-2">{stats.pending}</p>
                                </div>
                                <svg className="w-12 h-12 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-green-600 font-semibold">Approved</p>
                                    <p className="text-3xl font-bold text-green-900 mt-2">{stats.approved}</p>
                                </div>
                                <svg className="w-12 h-12 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-red-600 font-semibold">Rejected</p>
                                    <p className="text-3xl font-bold text-red-900 mt-2">{stats.rejected}</p>
                                </div>
                                <svg className="w-12 h-12 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                        <div className="flex flex-wrap gap-2">
                            {['pending', 'approved', 'rejected', 'all'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusFilter(status)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                        filters.status === status
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Claims Table */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {claims.data.length === 0 ? (
                            <div className="p-12 text-center">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-500 text-lg">No claims found</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Hotel</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Claimant</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Submitted</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {claims.data.map((claim) => (
                                            <tr key={claim.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={claim.hotel?.main_image || '/images/default-hotel.jpg'}
                                                            alt={claim.hotel?.name}
                                                            className="w-16 h-16 object-cover rounded-lg"
                                                        />
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{claim.hotel?.name}</p>
                                                            <p className="text-sm text-gray-500">{claim.hotel?.destination?.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="font-semibold text-gray-900">{claim.user?.name}</p>
                                                    <p className="text-sm text-gray-500">{claim.user?.email}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-900">{claim.official_email}</p>
                                                    <p className="text-sm text-gray-500">{claim.phone}</p>
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
                                                        className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold text-sm"
                                                    >
                                                        Review
                                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {claims.links && claims.links.length > 3 && (
                            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                                <div className="flex justify-center gap-2">
                                    {claims.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 rounded-lg font-semibold ${
                                                link.active
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={!link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

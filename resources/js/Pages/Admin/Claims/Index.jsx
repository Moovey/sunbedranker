import { Link, Head, router } from '@inertiajs/react';
import AdminNav from '@/Components/AdminNav';

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
        <>
            <Head title="Hotel Claims Management" />
            
            <div className="min-h-screen bg-white font-sans">
                <AdminNav stats={stats} />
                
                {/* Page Header */}
                <div className="bg-gradient-to-r from-orange-50 to-blue-50 shadow-lg border-b-2 border-orange-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
                        {/* Decorative accent */}
                        <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                            <div className="h-0.5 w-8 sm:w-10 md:w-12 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                            <svg className="mx-3 sm:mx-4 text-orange-500" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <div className="h-0.5 w-8 sm:w-10 md:w-12 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">Hotel Claims</h1>
                                <p className="text-gray-700 mt-2 font-semibold">Review and manage hotel ownership claims</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-6 sm:p-8 border-2 border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Pending Review</p>
                                    <p className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">{stats.pending}</p>
                                </div>
                                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center shadow-md">
                                    <svg className="w-7 h-7 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-6 sm:p-8 border-2 border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Approved</p>
                                    <p className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">{stats.approved}</p>
                                </div>
                                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center shadow-md">
                                    <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-6 sm:p-8 border-2 border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Rejected</p>
                                    <p className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">{stats.rejected}</p>
                                </div>
                                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center shadow-md">
                                    <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-10 border-2 border-gray-100">
                        <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Filter Claims</h2>
                        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={filters.status || 'all'}
                                    onChange={(e) => handleStatusFilter(e.target.value)}
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                                    className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-bold transition-all duration-300 transform hover:scale-105"
                                >
                                    Clear
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Claims Table */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden border-2 border-gray-100">
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
                                    <thead className="bg-gradient-to-r from-orange-50 to-blue-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Hotel</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Claimant</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Contact</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Submitted</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {claims.data.map((claim) => (
                                            <tr key={claim.id} className="hover:bg-orange-50 transition-colors duration-200">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={claim.hotel?.main_image || '/images/default-hotel.jpg'}
                                                            alt={claim.hotel?.name}
                                                            className="w-16 h-16 rounded-lg object-cover mr-4 border-2 border-gray-100"
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
                                                        className="text-orange-600 hover:text-orange-700 font-bold transition-all duration-300 transform hover:scale-105"
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
                            <div className="bg-white px-4 py-3 border-t-2 border-gray-200 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700 font-semibold">
                                        Showing <span className="font-bold text-orange-600">{claims.from}</span> to{' '}
                                        <span className="font-bold text-orange-600">{claims.to}</span> of{' '}
                                        <span className="font-bold text-orange-600">{claims.total}</span> results
                                    </div>
                                    <div className="flex gap-2">
                                        {claims.links.map((link, index) => (
                                            link.url ? (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-1 border-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                                                        link.active
                                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-600 shadow-lg'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50 hover:border-orange-300'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 border-2 rounded-lg bg-gray-100 text-gray-400 border-gray-200 font-semibold"
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

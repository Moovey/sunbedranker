import { Link, Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AdminNav from '@/Components/AdminNav';
import { toast } from 'react-toastify';

export default function HotelsIndex({ hotels, destinations, filters, stats }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [selectedDestination, setSelectedDestination] = useState(filters.destination_id || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.hotels.index'), {
            search,
            destination_id: selectedDestination,
            status: selectedStatus,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedDestination('');
        setSelectedStatus('');
        router.get(route('admin.hotels.index'));
    };

    const handleDelete = (hotel) => {
        if (confirm(`Are you sure you want to delete "${hotel.name}"? This action cannot be undone.`)) {
            router.delete(route('admin.hotels.destroy', hotel.id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`Hotel "${hotel.name}" has been deleted successfully!`);
                },
                onError: () => {
                    toast.error('Failed to delete hotel. Please try again.');
                },
            });
        }
    };

    return (
        <>
            <Head title="Manage Hotels" />
            
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
                                <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">Hotel Management</h1>
                                <p className="text-gray-700 mt-2 font-semibold">Manage all hotels and their details</p>
                            </div>
                            <Link
                                href={route('admin.hotels.create')}
                                className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-center hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm sm:text-base whitespace-nowrap shadow-lg"
                            >
                                Add New Hotel
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                    {/* Filters */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-10 border-2 border-gray-100">
                        <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Filter Hotels</h2>
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Hotel name..."
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Destination
                                </label>
                                <select
                                    value={selectedDestination}
                                    onChange={e => setSelectedDestination(e.target.value)}
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="">All Destinations</option>
                                    {destinations.map(dest => (
                                        <option key={dest.id} value={dest.id}>{dest.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={selectedStatus}
                                    onChange={e => setSelectedStatus(e.target.value)}
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="flex items-end gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 font-bold transition-all duration-300 shadow-lg transform hover:scale-105"
                                >
                                    Search
                                </button>
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-bold transition-all duration-300 transform hover:scale-105"
                                >
                                    Clear
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Hotels List */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden border-2 border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gradient-to-r from-orange-50 to-blue-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                                            Hotel
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                                            Destination
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                                            Score
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                                            Subscription
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {hotels.data.map(hotel => (
                                        <tr key={hotel.id} className="hover:bg-orange-50 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {hotel.main_image_url && (
                                                        <img
                                                            src={hotel.main_image_url}
                                                            alt={hotel.name}
                                                            className="w-16 h-16 rounded-lg object-cover mr-4 border-2 border-gray-100"
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {hotel.name}
                                                        </div>
                                                        <div className="text-sm text-gray-600 font-medium">
                                                            {hotel.star_rating && `${hotel.star_rating} Star`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-semibold">{hotel.destination?.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-900">
                                                    {hotel.overall_score ? `${hotel.overall_score}/100` : 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full font-bold border-2 ${
                                                    hotel.subscription_tier === 'premium' ? 'bg-purple-100 text-purple-700 border-purple-300' :
                                                    hotel.subscription_tier === 'enhanced' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                                                    'bg-gray-100 text-gray-700 border-gray-300'
                                                }`}>
                                                    {hotel.subscription_tier}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col gap-1">
                                                    {hotel.is_active && (
                                                        <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                                                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                                            </svg>
                                                            Active
                                                        </span>
                                                    )}
                                                    {hotel.is_verified && (
                                                        <span className="text-xs text-blue-600 font-bold flex items-center gap-1">
                                                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                                                            </svg>
                                                            Verified
                                                        </span>
                                                    )}
                                                    {hotel.is_featured && (
                                                        <span className="text-xs text-orange-600 font-bold flex items-center gap-1">
                                                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                            </svg>
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-center gap-3">
                                                    <Link
                                                        href={`/admin/hotels/${hotel.id}/edit`}
                                                        className="text-blue-600 hover:text-blue-700 font-bold transition-all duration-300 transform hover:scale-105"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={`/hotels/${hotel.slug}`}
                                                        target="_blank"
                                                        className="text-orange-600 hover:text-orange-700 font-bold transition-all duration-300 transform hover:scale-105"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(hotel)}
                                                        className="text-red-600 hover:text-red-700 font-bold transition-all duration-300 transform hover:scale-105"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {hotels.links && (
                            <div className="bg-white px-4 py-3 border-t-2 border-gray-200 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700 font-semibold">
                                        Showing <span className="font-bold text-orange-600">{hotels.from}</span> to{' '}
                                        <span className="font-bold text-orange-600">{hotels.to}</span> of{' '}
                                        <span className="font-bold text-orange-600">{hotels.total}</span> results
                                    </div>
                                    <div className="flex gap-2">
                                        {hotels.links.map((link, index) => (
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

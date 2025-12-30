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
            
            <div className="min-h-screen bg-neutral-50 font-sans-luxury">
                <AdminNav stats={stats} />
                
                {/* Page Header */}
                <div className="bg-white shadow-sm border-b border-neutral-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
                        {/* Decorative accent */}
                        <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                            <div className="h-px w-8 sm:w-10 md:w-12 bg-neutral-300"></div>
                            <svg className="mx-3 sm:mx-4 text-neutral-400" width="16" height="16" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2L11.5 8.5L18 10L11.5 11.5L10 18L8.5 11.5L2 10L8.5 8.5L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            <div className="h-px w-8 sm:w-10 md:w-12 bg-neutral-300"></div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight">Hotel Management</h1>
                                <p className="text-neutral-600 mt-2 font-light tracking-wide">Manage all hotels and their details</p>
                            </div>
                            <Link
                                href={route('admin.hotels.create')}
                                className="px-4 sm:px-6 py-3 sm:py-4 bg-neutral-900 text-white font-light rounded-lg hover:bg-neutral-800 transition-all duration-300 text-center tracking-wide hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base whitespace-nowrap"
                            >
                                Add New Hotel
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-10 border border-neutral-100">
                        <h2 className="font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 mb-5 sm:mb-6">Filter Hotels</h2>
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Hotel name..."
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                                    Destination
                                </label>
                                <select
                                    value={selectedDestination}
                                    onChange={e => setSelectedDestination(e.target.value)}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Destinations</option>
                                    {destinations.map(dest => (
                                        <option key={dest.id} value={dest.id}>{dest.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                                    Status
                                </label>
                                <select
                                    value={selectedStatus}
                                    onChange={e => setSelectedStatus(e.target.value)}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="flex items-end gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 font-light transition-all duration-300 tracking-wide"
                                >
                                    Search
                                </button>
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 font-light transition-all duration-300 tracking-wide"
                                >
                                    Clear
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Hotels List */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden border border-neutral-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-neutral-200">
                                <thead className="bg-neutral-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-light text-neutral-500 uppercase tracking-wider">
                                            Hotel
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-light text-neutral-500 uppercase tracking-wider">
                                            Destination
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-light text-neutral-500 uppercase tracking-wider">
                                            Score
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-light text-neutral-500 uppercase tracking-wider">
                                            Subscription
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-light text-neutral-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-light text-neutral-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-neutral-200">
                                    {hotels.data.map(hotel => (
                                        <tr key={hotel.id} className="hover:bg-neutral-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {hotel.main_image && (
                                                        <img
                                                            src={hotel.main_image}
                                                            alt={hotel.name}
                                                            className="w-16 h-16 rounded-lg object-cover mr-4"
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-light text-neutral-900">
                                                            {hotel.name}
                                                        </div>
                                                        <div className="text-sm text-neutral-500 font-light">
                                                            {hotel.star_rating && `${hotel.star_rating} Star`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-neutral-900 font-light">{hotel.destination?.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-light text-neutral-900">
                                                    {hotel.overall_score ? `${hotel.overall_score}/100` : 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full font-light ${
                                                    hotel.subscription_tier === 'premium' ? 'bg-purple-100 text-purple-700' :
                                                    hotel.subscription_tier === 'enhanced' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-neutral-100 text-neutral-600'
                                                }`}>
                                                    {hotel.subscription_tier}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col gap-1">
                                                    {hotel.is_active && (
                                                        <span className="text-xs text-green-600">● Active</span>
                                                    )}
                                                    {hotel.is_verified && (
                                                        <span className="text-xs text-blue-600">✓ Verified</span>
                                                    )}
                                                    {hotel.is_featured && (
                                                        <span className="text-xs text-orange-600">⭐ Featured</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-center gap-3">
                                                    <Link
                                                        href={`/admin/hotels/${hotel.id}/edit`}
                                                        className="text-blue-600 hover:text-blue-900 font-light transition-colors duration-300"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={`/hotels/${hotel.slug}`}
                                                        target="_blank"
                                                        className="text-neutral-600 hover:text-neutral-900 font-light transition-colors duration-300"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(hotel)}
                                                        className="text-red-600 hover:text-red-900 font-light transition-colors duration-300"
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
                            <div className="bg-white px-4 py-3 border-t border-neutral-200 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-neutral-700 font-light">
                                        Showing <span className="font-medium">{hotels.from}</span> to{' '}
                                        <span className="font-medium">{hotels.to}</span> of{' '}
                                        <span className="font-medium">{hotels.total}</span> results
                                    </div>
                                    <div className="flex gap-2">
                                        {hotels.links.map((link, index) => (
                                            link.url ? (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-1 border rounded ${
                                                        link.active
                                                            ? 'bg-neutral-900 text-white border-neutral-900'
                                                            : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 border rounded bg-neutral-100 text-neutral-400 border-neutral-200"
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

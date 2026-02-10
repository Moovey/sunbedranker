import { Link, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '@/Components/AdminNav';

const STATUS_OPTIONS = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
];

const FEATURED_OPTIONS = [
    { value: '', label: 'All' },
    { value: 'yes', label: 'Featured' },
    { value: 'no', label: 'Not Featured' },
];

const TABLE_COLUMNS = [
    { key: 'destination', label: 'Destination' },
    { key: 'country', label: 'Country' },
    { key: 'hotels', label: 'Hotels' },
    { key: 'status', label: 'Status' },
    { key: 'featured', label: 'Featured' },
    { key: 'actions', label: 'Actions' },
];

export default function DestinationsIndex({ destinations, filters }) {
    const [filterState, setFilterState] = useState({
        search: filters.search || '',
        status: filters.status || '',
        featured: filters.featured || '',
    });

    const updateFilter = (key, value) => {
        setFilterState(prev => ({ ...prev, [key]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.destinations.index'), filterState, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setFilterState({ search: '', status: '', featured: '' });
        router.get(route('admin.destinations.index'));
    };

    const handleToggleActive = (destination) => {
        router.post(route('admin.destinations.toggle-active', destination.id), {}, {
            preserveScroll: true,
            onSuccess: () => toast.success(`Destination "${destination.name}" status updated!`),
            onError: () => toast.error('Failed to update status.'),
        });
    };

    const handleToggleFeatured = (destination) => {
        router.post(route('admin.destinations.toggle-featured', destination.id), {}, {
            preserveScroll: true,
            onSuccess: () => toast.success(`Destination "${destination.name}" featured status updated!`),
            onError: () => toast.error('Failed to update featured status.'),
        });
    };

    const handleDelete = (destination) => {
        if (!confirm(`Are you sure you want to delete "${destination.name}"? This action cannot be undone.`)) return;

        router.delete(route('admin.destinations.destroy', destination.id), {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = page?.props?.flash;
                if (flash?.error) {
                    toast.error(flash.error);
                } else if (flash?.success) {
                    toast.success(flash.success);
                } else {
                    toast.success(`Destination "${destination.name}" has been deleted!`);
                }
            },
            onError: () => toast.error('Failed to delete destination.'),
        });
    };

    const { data: items, links, current_page, last_page, total } = destinations;

    return (
        <>
            <Head title="Manage Destinations" />

            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Destination Management</h1>
                            <p className="text-gray-500 text-xs sm:text-sm mt-1">
                                Manage all destinations · {total} total
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border border-gray-100 mb-4 sm:mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                value={filterState.search}
                                onChange={(e) => updateFilter('search', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                            <select
                                value={filterState.status}
                                onChange={(e) => updateFilter('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            >
                                {STATUS_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <select
                                value={filterState.featured}
                                onChange={(e) => updateFilter('featured', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            >
                                {FEATURED_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors text-sm"
                                >
                                    Search
                                </button>
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Desktop Table */}
                    <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        {TABLE_COLUMNS.map(col => (
                                            <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                {col.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {items.map(destination => (
                                        <tr key={destination.id} className="hover:bg-gray-50/50 transition-colors">
                                            {/* Destination */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                        <img
                                                            src={destination.image ? (destination.image.startsWith('http') ? destination.image : `/storage/${destination.image}`) : '/images/default-destination.svg'}
                                                            alt={destination.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{destination.name}</p>
                                                        {destination.region && (
                                                            <p className="text-xs text-gray-500 truncate">{destination.region}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Country */}
                                            <td className="px-4 py-3">
                                                <span className="text-sm text-gray-700">{destination.country}</span>
                                                <span className="ml-1 text-xs text-gray-400 uppercase">({destination.country_code})</span>
                                            </td>

                                            {/* Hotels */}
                                            <td className="px-4 py-3">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {destination.active_hotels_count || 0}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => handleToggleActive(destination)}
                                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                                                        destination.is_active
                                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${destination.is_active ? 'bg-green-500' : 'bg-gray-400'}`} />
                                                    {destination.is_active ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>

                                            {/* Featured */}
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => handleToggleFeatured(destination)}
                                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                                                        destination.is_featured
                                                            ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {destination.is_featured ? (
                                                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                        </svg>
                                                    )}
                                                    {destination.is_featured ? 'Featured' : 'No'}
                                                </button>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={route('admin.destinations.edit', destination.id)}
                                                        className="px-2.5 py-1 text-xs font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(destination)}
                                                        className="px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
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

                        {items.length === 0 && (
                            <div className="text-center py-12">
                                <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-sm text-gray-500">No destinations found</p>
                            </div>
                        )}
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-3">
                        {items.map(destination => (
                            <div key={destination.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                        <img
                                            src={destination.image ? (destination.image.startsWith('http') ? destination.image : `/storage/${destination.image}`) : '/images/default-destination.svg'}
                                            alt={destination.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-gray-900 truncate">{destination.name}</h3>
                                        <p className="text-xs text-gray-500">
                                            {destination.country} ({destination.country_code})
                                            {destination.region && <> · {destination.region}</>}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                    <span className="text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded-full">
                                        {destination.active_hotels_count || 0} hotels
                                    </span>
                                    <button
                                        onClick={() => handleToggleActive(destination)}
                                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                            destination.is_active
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-500'
                                        }`}
                                    >
                                        {destination.is_active ? 'Active' : 'Inactive'}
                                    </button>
                                    <button
                                        onClick={() => handleToggleFeatured(destination)}
                                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                            destination.is_featured
                                                ? 'bg-orange-100 text-orange-700'
                                                : 'bg-gray-100 text-gray-500'
                                        }`}
                                    >
                                        {destination.is_featured ? '★ Featured' : 'Not Featured'}
                                    </button>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        href={route('admin.destinations.edit', destination.id)}
                                        className="flex-1 text-center px-3 py-1.5 text-xs font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(destination)}
                                        className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}

                        {items.length === 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                                <p className="text-sm text-gray-500">No destinations found</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {links && links.length > 3 && (
                        <div className="mt-6 flex items-center justify-center gap-1">
                            {links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        link.active
                                            ? 'bg-orange-500 text-white'
                                            : link.url
                                                ? 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                                                : 'text-gray-300 cursor-not-allowed'
                                    }`}
                                    preserveScroll
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

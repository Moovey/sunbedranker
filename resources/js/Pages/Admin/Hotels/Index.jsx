import { Link, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '@/Components/AdminNav';

// Status options for filter dropdown
const STATUS_OPTIONS = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
];

// Subscription tier styling configuration
const SUBSCRIPTION_STYLES = {
    premium: 'bg-purple-100 text-purple-700 border-purple-300',
    enhanced: 'bg-blue-100 text-blue-700 border-blue-300',
    free: 'bg-gray-100 text-gray-700 border-gray-300',
};

// Table column configuration
const TABLE_COLUMNS = [
    { key: 'hotel', label: 'Hotel' },
    { key: 'destination', label: 'Destination' },
    { key: 'score', label: 'Score' },
    { key: 'subscription', label: 'Subscription' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
];

export default function HotelsIndex({ hotels, destinations, filters, stats }) {
    const [filterState, setFilterState] = useState({
        search: filters.search || '',
        destination_id: filters.destination_id || '',
        status: filters.status || '',
    });

    const updateFilter = (key, value) => {
        setFilterState(prev => ({ ...prev, [key]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.hotels.index'), filterState, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setFilterState({ search: '', destination_id: '', status: '' });
        router.get(route('admin.hotels.index'));
    };

    const handleDelete = (hotel) => {
        if (!confirm(`Are you sure you want to delete "${hotel.name}"? This action cannot be undone.`)) {
            return;
        }
        
        router.delete(route('admin.hotels.destroy', hotel.id), {
            preserveScroll: true,
            onSuccess: () => toast.success(`Hotel "${hotel.name}" has been deleted successfully!`),
            onError: () => toast.error('Failed to delete hotel. Please try again.'),
        });
    };

    return (
        <>
            <Head title="Manage Hotels" />
            
            <div className="min-h-screen bg-white font-sans">
                <AdminNav stats={stats} />
                
                <PageHeader />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                    <FilterSection
                        filterState={filterState}
                        updateFilter={updateFilter}
                        destinations={destinations}
                        onSearch={handleSearch}
                        onClear={clearFilters}
                    />

                    <HotelTable 
                        hotels={hotels} 
                        onDelete={handleDelete} 
                    />
                </div>
            </div>
        </>
    );
}

// ============================================================================
// Sub-components
// ============================================================================

function PageHeader() {
    return (
        <div className="bg-gradient-to-r from-orange-50 to-blue-50 shadow-lg border-b-2 border-orange-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
                <DecorativeAccent />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">
                            Hotel Management
                        </h1>
                        <p className="text-gray-700 mt-2 font-semibold">
                            Manage all hotels and their details
                        </p>
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
    );
}

function DecorativeAccent() {
    return (
        <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
            <div className="h-0.5 w-8 sm:w-10 md:w-12 bg-gradient-to-r from-orange-500 to-orange-600" />
            <StarIcon className="w-6 h-6 mx-3 sm:mx-4 text-orange-500" />
            <div className="h-0.5 w-8 sm:w-10 md:w-12 bg-gradient-to-r from-blue-500 to-blue-600" />
        </div>
    );
}

function FilterSection({ filterState, updateFilter, destinations, onSearch, onClear }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-10 border-2 border-gray-100">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">
                Filter Hotels
            </h2>
            <form onSubmit={onSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FilterInput
                    label="Search"
                    type="text"
                    value={filterState.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    placeholder="Hotel name..."
                />

                <FilterSelect
                    label="Destination"
                    value={filterState.destination_id}
                    onChange={(e) => updateFilter('destination_id', e.target.value)}
                    options={[
                        { value: '', label: 'All Destinations' },
                        ...destinations.map(dest => ({ value: dest.id, label: dest.name })),
                    ]}
                />

                <FilterSelect
                    label="Status"
                    value={filterState.status}
                    onChange={(e) => updateFilter('status', e.target.value)}
                    options={STATUS_OPTIONS}
                />

                <div className="flex items-end gap-2">
                    <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 font-bold transition-all duration-300 shadow-lg transform hover:scale-105"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={onClear}
                        className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-bold transition-all duration-300 transform hover:scale-105"
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
}

function FilterInput({ label, ...props }) {
    return (
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
                {label}
            </label>
            <input
                {...props}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
        </div>
    );
}

function FilterSelect({ label, options, ...props }) {
    return (
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
                {label}
            </label>
            <select
                {...props}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

function HotelTable({ hotels, onDelete }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden border-2 border-gray-100">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <TableHeader />
                    <tbody className="bg-white divide-y divide-gray-200">
                        {hotels.data.length === 0 ? (
                            <EmptyRow />
                        ) : (
                            hotels.data.map(hotel => (
                                <HotelRow 
                                    key={hotel.id} 
                                    hotel={hotel} 
                                    onDelete={onDelete} 
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {hotels.links && <Pagination hotels={hotels} />}
        </div>
    );
}

function TableHeader() {
    return (
        <thead className="bg-gradient-to-r from-orange-50 to-blue-50">
            <tr>
                {TABLE_COLUMNS.map(col => (
                    <th 
                        key={col.key}
                        className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase"
                    >
                        {col.label}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

function EmptyRow() {
    return (
        <tr>
            <td colSpan={TABLE_COLUMNS.length} className="px-6 py-12 text-center">
                <p className="text-gray-500 font-semibold">No hotels found</p>
            </td>
        </tr>
    );
}

function HotelRow({ hotel, onDelete }) {
    return (
        <tr className="hover:bg-orange-50 transition-colors duration-200">
            <HotelInfoCell hotel={hotel} />
            <DestinationCell destination={hotel.destination?.name} />
            <ScoreCell score={hotel.overall_score} />
            <SubscriptionCell tier={hotel.subscription_tier} />
            <StatusCell hotel={hotel} />
            <ActionsCell hotel={hotel} onDelete={onDelete} />
        </tr>
    );
}

function HotelInfoCell({ hotel }) {
    return (
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
                    {hotel.star_rating && (
                        <div className="text-sm text-gray-600 font-medium">
                            {hotel.star_rating} Star
                        </div>
                    )}
                </div>
            </div>
        </td>
    );
}

function DestinationCell({ destination }) {
    return (
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900 font-semibold">
                {destination || '-'}
            </div>
        </td>
    );
}

function ScoreCell({ score }) {
    return (
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-bold text-gray-900">
                {score ? `${score}/100` : 'N/A'}
            </div>
        </td>
    );
}

function SubscriptionCell({ tier }) {
    const style = SUBSCRIPTION_STYLES[tier] || SUBSCRIPTION_STYLES.free;
    
    return (
        <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 py-1 text-xs rounded-full font-bold border-2 ${style}`}>
                {tier || 'free'}
            </span>
        </td>
    );
}

function StatusCell({ hotel }) {
    return (
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex flex-col gap-1">
                {hotel.is_active && <StatusBadge type="active" />}
                {hotel.is_verified && <StatusBadge type="verified" />}
                {hotel.is_featured && <StatusBadge type="featured" />}
            </div>
        </td>
    );
}

function StatusBadge({ type }) {
    const badges = {
        active: {
            color: 'text-green-600',
            icon: <CheckCircleIcon />,
            label: 'Active',
        },
        verified: {
            color: 'text-blue-600',
            icon: <ShieldCheckIcon />,
            label: 'Verified',
        },
        featured: {
            color: 'text-orange-600',
            icon: <StarIcon className="w-3 h-3" />,
            label: 'Featured',
        },
    };

    const badge = badges[type];
    
    return (
        <span className={`text-xs ${badge.color} font-bold flex items-center gap-1`}>
            {badge.icon}
            {badge.label}
        </span>
    );
}

function ActionsCell({ hotel, onDelete }) {
    return (
        <td className="px-6 py-4 whitespace-nowrap text-sm">
            <div className="flex items-center gap-3">
                <Link
                    href={route('admin.hotels.edit', hotel.id)}
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
                    onClick={() => onDelete(hotel)}
                    className="text-red-600 hover:text-red-700 font-bold transition-all duration-300 transform hover:scale-105"
                >
                    Delete
                </button>
            </div>
        </td>
    );
}

function Pagination({ hotels }) {
    return (
        <div className="bg-white px-4 py-3 border-t-2 border-gray-200 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <PaginationInfo 
                    from={hotels.from} 
                    to={hotels.to} 
                    total={hotels.total} 
                />
                <PaginationLinks links={hotels.links} />
            </div>
        </div>
    );
}

function PaginationInfo({ from, to, total }) {
    return (
        <div className="text-sm text-gray-700 font-semibold">
            Showing <span className="font-bold text-orange-600">{from}</span> to{' '}
            <span className="font-bold text-orange-600">{to}</span> of{' '}
            <span className="font-bold text-orange-600">{total}</span> results
        </div>
    );
}

function PaginationLinks({ links }) {
    return (
        <div className="flex gap-2 flex-wrap justify-center">
            {links.map((link, index) => (
                <PaginationLink key={index} link={link} />
            ))}
        </div>
    );
}

function PaginationLink({ link }) {
    const baseClasses = 'px-3 py-1 border-2 rounded-lg font-bold transition-all duration-300';
    
    if (!link.url) {
        return (
            <span
                className={`${baseClasses} bg-gray-100 text-gray-400 border-gray-200 font-semibold`}
                dangerouslySetInnerHTML={{ __html: link.label }}
            />
        );
    }

    return (
        <Link
            href={link.url}
            className={`${baseClasses} transform hover:scale-105 ${
                link.active
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-600 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50 hover:border-orange-300'
            }`}
            dangerouslySetInnerHTML={{ __html: link.label }}
        />
    );
}

// ============================================================================
// Icons
// ============================================================================

function StarIcon({ className = 'w-6 h-6' }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
    );
}

function CheckCircleIcon() {
    return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
    );
}

function ShieldCheckIcon() {
    return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
        </svg>
    );
}

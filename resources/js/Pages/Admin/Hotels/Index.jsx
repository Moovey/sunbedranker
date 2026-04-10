import { Link, Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '@/Components/AdminNav';

// Status options for filter dropdown
const STATUS_OPTIONS = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
];

// Claim status styling configuration
const CLAIM_STYLES = {
    approved: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700',
    unclaimed: 'bg-gray-100 text-gray-500',
};

// Table column configuration
const TABLE_COLUMNS = [
    { key: 'hotel', label: 'Hotel' },
    { key: 'destination', label: 'Destination' },
    { key: 'score', label: 'Score' },
    { key: 'claim', label: 'Claim Status' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
];

export default function HotelsIndex({ hotels, destinations, filters, stats }) {
    const [filterState, setFilterState] = useState({
        search: filters.search || '',
        destination_id: filters.destination_id || '',
        status: filters.status || '',
    });

    const [showImportModal, setShowImportModal] = useState(false);

    const importForm = useForm({
        agoda_hotel_id: '',
        destination_id: '',
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

    const handleImportById = (e) => {
        e.preventDefault();
        importForm.post(route('admin.hotels.import-agoda'), {
            onSuccess: () => {
                setShowImportModal(false);
                importForm.reset();
            },
            onError: () => {
                toast.error(importForm.errors.agoda_hotel_id || 'Failed to import hotel.');
            },
        });
    };

    return (
        <>
            <Head title="Manage Hotels" />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav stats={stats} />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Hotel Management</h1>
                            <p className="text-gray-500 text-xs sm:text-sm mt-1">Manage all hotels and their details</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => setShowImportModal(true)}
                                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm sm:text-base"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Import from Agoda
                            </button>
                            <Link
                                href={route('admin.hotels.create')}
                                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm text-sm sm:text-base"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Add New Hotel
                            </Link>
                        </div>
                    </div>

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

            {/* Import from Agoda Modal */}
            {showImportModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => { setShowImportModal(false); importForm.reset(); }} />
                        
                        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Import Hotel from Agoda</h3>
                                <button onClick={() => { setShowImportModal(false); importForm.reset(); }} className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <p className="text-sm text-gray-500 mb-4">
                                Enter the Agoda Hotel ID to import it. The destination will be auto-detected from the hotel's location.
                                You can find the ID in the hotel's image URLs on agoda.com
                                (e.g. <code className="text-xs bg-gray-100 px-1 rounded">hotelImages/<strong>81940</strong>/...</code>).
                            </p>

                            <form onSubmit={handleImportById} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Agoda Hotel ID *</label>
                                    <input
                                        type="number"
                                        value={importForm.data.agoda_hotel_id}
                                        onChange={e => importForm.setData('agoda_hotel_id', e.target.value)}
                                        placeholder="e.g. 81940"
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                        min="1"
                                        required
                                    />
                                    {importForm.errors.agoda_hotel_id && (
                                        <p className="mt-1 text-sm text-red-600">{importForm.errors.agoda_hotel_id}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Destination <span className="text-gray-400 font-normal">(optional — auto-detected from coordinates)</span>
                                    </label>
                                    <select
                                        value={importForm.data.destination_id}
                                        onChange={e => importForm.setData('destination_id', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                    >
                                        <option value="">Auto-detect from location</option>
                                        {destinations?.map(dest => (
                                            <option key={dest.id} value={dest.id}>{dest.name}</option>
                                        ))}
                                    </select>
                                    {importForm.errors.destination_id && (
                                        <p className="mt-1 text-sm text-red-600">{importForm.errors.destination_id}</p>
                                    )}
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => { setShowImportModal(false); importForm.reset(); }}
                                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={importForm.processing}
                                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {importForm.processing ? 'Importing...' : 'Import Hotel'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// ============================================================================
// Sub-components
// ============================================================================

function FilterSection({ filterState, updateFilter, destinations, onSearch, onClear }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
            <h2 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Filter Hotels</h2>
            <form onSubmit={onSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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

                <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-1">
                    <button
                        type="submit"
                        className="flex-1 px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors text-sm sm:text-base"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={onClear}
                        className="px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm sm:text-base"
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
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                {label}
            </label>
            <input
                {...props}
                className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm"
            />
        </div>
    );
}

function FilterSelect({ label, options, ...props }) {
    return (
        <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                {label}
            </label>
            <select
                {...props}
                className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm"
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full">
                    <TableHeader />
                    <tbody className="divide-y divide-gray-100">
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

            {/* Mobile Card View */}
            <div className="md:hidden">
                {hotels.data.length === 0 ? (
                    <div className="px-4 py-12 text-center">
                        <p className="text-gray-500 text-sm">No hotels found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {hotels.data.map(hotel => (
                            <MobileHotelCard 
                                key={hotel.id} 
                                hotel={hotel} 
                                onDelete={onDelete} 
                            />
                        ))}
                    </div>
                )}
            </div>

            {hotels.links && <Pagination hotels={hotels} />}
        </div>
    );
}

function getClaimInfo(hotel) {
    const latestClaim = hotel.claims?.[0];
    if (hotel.owned_by || latestClaim?.status === 'approved') {
        return { label: 'Claimed', status: 'approved', claim: latestClaim, ownerName: latestClaim?.user?.name || hotel.owner?.name || 'Owner' };
    }
    if (latestClaim?.status === 'pending') {
        return { label: 'Pending', status: 'pending', claim: latestClaim, ownerName: latestClaim?.user?.name };
    }
    if (latestClaim?.status === 'rejected') {
        return { label: 'Rejected', status: 'rejected', claim: latestClaim, ownerName: latestClaim?.user?.name };
    }
    return { label: 'Unclaimed', status: 'unclaimed', claim: null, ownerName: null };
}

function MobileHotelCard({ hotel, onDelete }) {
    const claimInfo = getClaimInfo(hotel);
    const claimStyle = CLAIM_STYLES[claimInfo.status] || CLAIM_STYLES.unclaimed;
    
    return (
        <div className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
            {/* Top Row: Image + Hotel Info */}
            <div className="flex items-start gap-3 mb-3">
                {hotel.main_image_url ? (
                    <img
                        src={hotel.main_image_url}
                        alt={hotel.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                    />
                ) : (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                {hotel.name}
                            </h3>
                            {hotel.star_rating && (
                                <div className="text-xs text-gray-500 mt-0.5">
                                    {hotel.star_rating} Star
                                </div>
                            )}
                            <div className="text-xs text-gray-500 mt-0.5 truncate">
                                {hotel.destination?.name || '-'}
                            </div>
                        </div>
                        {claimInfo.claim ? (
                            <Link
                                href={route('admin.claims.show', claimInfo.claim.id)}
                                className={`px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full flex-shrink-0 hover:opacity-80 transition-opacity ${claimStyle}`}
                            >
                                {claimInfo.label}
                            </Link>
                        ) : (
                            <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full flex-shrink-0 ${claimStyle}`}>
                                {claimInfo.label}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Middle Row: Stats */}
            <div className="flex items-center gap-3 mb-3 text-xs">
                <div className="flex items-center gap-1">
                    <span className="text-gray-500">Score:</span>
                    <span className="font-medium text-gray-900">
                        {hotel.overall_score ? `${hotel.overall_score}/100` : 'N/A'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {hotel.is_active && <StatusBadge type="active" />}
                    {hotel.is_verified && <StatusBadge type="verified" />}
                    {hotel.is_featured && <StatusBadge type="featured" />}
                </div>
            </div>

            {/* Bottom Row: Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <Link
                    href={route('admin.hotels.edit', hotel.id)}
                    className="flex-1 px-3 py-1.5 text-center text-xs sm:text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
                >
                    Edit
                </Link>
                <Link
                    href={`/hotels/${hotel.slug}`}
                    target="_blank"
                    className="flex-1 px-3 py-1.5 text-center text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    View
                </Link>
                <button
                    onClick={() => onDelete(hotel)}
                    className="px-3 py-1.5 text-xs sm:text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

function TableHeader() {
    return (
        <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
                {TABLE_COLUMNS.map(col => (
                    <th 
                        key={col.key}
                        className="px-3 md:px-4 lg:px-6 py-2.5 md:py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider"
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
            <td colSpan={TABLE_COLUMNS.length} className="px-4 md:px-6 py-8 md:py-12 text-center">
                <p className="text-gray-500 text-xs sm:text-sm">No hotels found</p>
            </td>
        </tr>
    );
}

function HotelRow({ hotel, onDelete }) {
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <HotelInfoCell hotel={hotel} />
            <DestinationCell destination={hotel.destination?.name} />
            <ScoreCell score={hotel.overall_score} />
            <ClaimCell hotel={hotel} />
            <StatusCell hotel={hotel} />
            <ActionsCell hotel={hotel} onDelete={onDelete} />
        </tr>
    );
}

function HotelInfoCell({ hotel }) {
    return (
        <td className="px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap">
            <div className="flex items-center">
                {hotel.main_image_url ? (
                    <img
                        src={hotel.main_image_url}
                        alt={hotel.name}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover mr-2 md:mr-3"
                    />
                ) : (
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-lg mr-2 md:mr-3"></div>
                )}
                <div className="min-w-0">
                    <div className="text-xs md:text-sm font-medium text-gray-900 truncate max-w-[120px] lg:max-w-[180px]">
                        {hotel.name}
                    </div>
                    {hotel.star_rating && (
                        <div className="text-[10px] md:text-xs text-gray-500">
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
        <td className="px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap">
            <div className="text-xs md:text-sm text-gray-900 truncate max-w-[100px] lg:max-w-[150px]">
                {destination || '-'}
            </div>
        </td>
    );
}

function ScoreCell({ score }) {
    return (
        <td className="px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap">
            <div className="text-xs md:text-sm font-medium text-gray-900">
                {score ? `${score}/10` : 'N/A'}
            </div>
        </td>
    );
}

function ClaimCell({ hotel }) {
    const claimInfo = getClaimInfo(hotel);
    const style = CLAIM_STYLES[claimInfo.status] || CLAIM_STYLES.unclaimed;
    
    return (
        <td className="px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap">
            <div className="flex flex-col gap-0.5">
                {claimInfo.claim ? (
                    <Link
                        href={route('admin.claims.show', claimInfo.claim.id)}
                        className={`inline-flex px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-full hover:opacity-80 transition-opacity w-fit ${style}`}
                    >
                        {claimInfo.label}
                    </Link>
                ) : (
                    <span className={`inline-flex px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-full w-fit ${style}`}>
                        {claimInfo.label}
                    </span>
                )}
                {claimInfo.ownerName && (
                    <span className="text-[10px] md:text-xs text-gray-400 truncate max-w-[120px]">
                        {claimInfo.ownerName}
                    </span>
                )}
            </div>
        </td>
    );
}

function StatusCell({ hotel }) {
    return (
        <td className="px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap">
            <div className="flex flex-col gap-0.5 md:gap-1">
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
            color: 'text-purple-600',
            icon: <StarIcon className="w-2.5 h-2.5 md:w-3 md:h-3" />,
            label: 'Featured',
        },
    };

    const badge = badges[type];
    
    return (
        <span className={`text-[10px] md:text-xs ${badge.color} font-medium flex items-center gap-0.5 md:gap-1`}>
            {badge.icon}
            {badge.label}
        </span>
    );
}

function ActionsCell({ hotel, onDelete }) {
    return (
        <td className="px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm">
            <div className="flex items-center gap-2 md:gap-3">
                <Link
                    href={route('admin.hotels.edit', hotel.id)}
                    className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
                >
                    Edit
                </Link>
                <Link
                    href={`/hotels/${hotel.slug}`}
                    target="_blank"
                    className="text-gray-600 hover:text-gray-700 font-medium transition-colors"
                >
                    View
                </Link>
                <button
                    onClick={() => onDelete(hotel)}
                    className="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                    Delete
                </button>
            </div>
        </td>
    );
}

function Pagination({ hotels }) {
    return (
        <div className="bg-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
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
        <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            Showing <span className="font-medium text-gray-900">{from}</span> to{' '}
            <span className="font-medium text-gray-900">{to}</span> of{' '}
            <span className="font-medium text-gray-900">{total}</span> results
        </div>
    );
}

function PaginationLinks({ links }) {
    return (
        <div className="flex gap-0.5 sm:gap-1 flex-wrap justify-center">
            {links.map((link, index) => (
                <PaginationLink key={index} link={link} />
            ))}
        </div>
    );
}

function PaginationLink({ link }) {
    const baseClasses = 'px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg font-medium transition-colors';
    
    if (!link.url) {
        return (
            <span
                className={`${baseClasses} text-gray-400`}
                dangerouslySetInnerHTML={{ __html: link.label }}
            />
        );
    }

    return (
        <Link
            href={link.url}
            className={`${baseClasses} ${
                link.active
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
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
        <svg className="w-2.5 h-2.5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
    );
}

function ShieldCheckIcon() {
    return (
        <svg className="w-2.5 h-2.5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
        </svg>
    );
}

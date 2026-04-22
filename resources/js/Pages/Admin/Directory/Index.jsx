import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '@/Components/AdminNav';

const STAR_OPTIONS = [
    { value: '', label: 'All Stars' },
    { value: '1', label: '1 Star' },
    { value: '2', label: '2 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '5', label: '5 Stars' },
];

const PROMOTED_OPTIONS = [
    { value: '', label: 'All Hotels' },
    { value: 'no', label: 'Not Promoted' },
    { value: 'yes', label: 'Promoted' },
];

const PROMOTE_MODE_BADGE = {
    restored: {
        label: 'Restored',
        className: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    },
    relinked: {
        label: 'Re-linked',
        className: 'bg-blue-100 text-blue-800 border border-blue-200',
    },
    promoted: {
        label: 'Promoted',
        className: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
    },
};

export default function DirectoryIndex({
    hotels, countries, accommodationTypes, totalCount, promotedCount,
    bulkPromoteProgress, filters, stats,
}) {
    const { flash } = usePage().props;
    const promoteBadge = PROMOTE_MODE_BADGE[flash?.promote_mode] || null;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const [filterState, setFilterState] = useState({
        search: filters.search || '',
        country: filters.country || '',
        star_rating: filters.star_rating || '',
        accommodation_type: filters.accommodation_type || '',
        promoted: filters.promoted || '',
    });

    const [showPromoteModal, setShowPromoteModal] = useState(false);
    const [showBulkPromoteModal, setShowBulkPromoteModal] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailHotel, setDetailHotel] = useState(null);
    const [liveBulkProgress, setLiveBulkProgress] = useState(bulkPromoteProgress);

    const promoteForm = useForm({});
    const bulkForm = useForm({
        country: filters.country || '',
        star_rating: '',
        accommodation_type: '',
        limit: 500,
    });
    const [bulkMatching, setBulkMatching] = useState(null);
    const [bulkPreviewLoading, setBulkPreviewLoading] = useState(false);

    // Poll bulk-promote progress
    useEffect(() => {
        const isActive = liveBulkProgress && !['idle', 'completed', 'failed'].includes(liveBulkProgress.status);
        if (!isActive) return;

        const poll = () => {
            fetch(route('admin.directory.bulk-promote.progress'), {
                headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' },
                credentials: 'same-origin',
            })
                .then(r => r.json())
                .then(data => {
                    setLiveBulkProgress(data);
                    if (data.status === 'completed') {
                        toast.success(`Bulk promote done. Created/linked: ${data.created}. Failed: ${data.failed}.`);
                        router.reload({ only: ['hotels', 'totalCount', 'promotedCount'] });
                    } else if (data.status === 'failed') {
                        toast.error('Bulk promote failed: ' + (data.message || 'Unknown error'));
                    }
                })
                .catch(() => {});
        };

        poll();
        const interval = setInterval(poll, 2500);
        return () => clearInterval(interval);
    }, [liveBulkProgress?.status]);

    // Live preview of how many hotels match the bulk filters (debounced)
    useEffect(() => {
        if (!showBulkPromoteModal || !bulkForm.data.country) {
            setBulkMatching(null);
            return;
        }
        setBulkPreviewLoading(true);
        const token = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
        const t = setTimeout(() => {
            fetch(route('admin.directory.bulk-promote.preview'), {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': token ? decodeURIComponent(token) : '',
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    country: bulkForm.data.country,
                    star_rating: bulkForm.data.star_rating || null,
                    accommodation_type: bulkForm.data.accommodation_type || null,
                }),
            })
                .then(r => r.json())
                .then(data => setBulkMatching(data.matching ?? 0))
                .catch(() => setBulkMatching(null))
                .finally(() => setBulkPreviewLoading(false));
        }, 350);
        return () => clearTimeout(t);
    }, [showBulkPromoteModal, bulkForm.data.country, bulkForm.data.star_rating, bulkForm.data.accommodation_type]);

    const updateFilter = (key, value) => {
        setFilterState(prev => ({ ...prev, [key]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.directory.index'), filterState, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setFilterState({ search: '', country: '', star_rating: '', accommodation_type: '', promoted: '' });
        router.get(route('admin.directory.index'));
    };

    const openPromoteModal = (hotel) => {
        setSelectedHotel(hotel);
        setShowPromoteModal(true);
    };

    const handlePromote = (e) => {
        e.preventDefault();
        promoteForm.post(route('admin.directory.promote', selectedHotel.id), {
            onSuccess: () => {
                setShowPromoteModal(false);
                setSelectedHotel(null);
            },
        });
    };

    const handleBulkPromote = (e) => {
        e.preventDefault();
        bulkForm.post(route('admin.directory.bulk-promote'), {
            preserveScroll: true,
            onSuccess: () => {
                setShowBulkPromoteModal(false);
                setLiveBulkProgress({ status: 'queued', processed: 0, total: 0, created: 0, failed: 0, message: 'Bulk promotion queued...' });
            },
            onError: (errors) => {
                if (errors.bulk) toast.error(errors.bulk);
                else if (errors.country) toast.error(errors.country);
                else toast.error('Failed to start bulk promotion.');
            },
        });
    };

    const openDetail = (hotel) => {
        fetch(route('admin.directory.show', hotel.id), {
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' },
            credentials: 'same-origin',
        })
            .then(r => r.json())
            .then(data => {
                setDetailHotel(data);
                setShowDetailModal(true);
            })
            .catch(() => toast.error('Failed to load hotel details.'));
    };

    return (
        <>
            <Head title="Agoda Hotel Directory" />

            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav stats={stats} />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Agoda Hotel Directory</h1>
                            <p className="text-gray-500 text-xs sm:text-sm mt-1">
                                {totalCount.toLocaleString()} hotels in directory · {promotedCount.toLocaleString()} promoted to site
                            </p>
                            {promoteBadge && (
                                <span className={`inline-flex items-center px-2.5 py-1 mt-2 text-xs font-semibold rounded-full ${promoteBadge.className}`}>
                                    Last action: {promoteBadge.label}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-3">
                            <button
                                onClick={() => setShowBulkPromoteModal(true)}
                                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm text-sm sm:text-base"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Bulk Promote
                            </button>
                        </div>
                    </div>

                    {/* Bulk Promote Progress Banner */}
                    <ImportProgressBanner progress={liveBulkProgress} onDismiss={() => {
                        const token = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
                        fetch(route('admin.directory.bulk-promote.dismiss'), {
                            method: 'DELETE',
                            headers: { 'X-Requested-With': 'XMLHttpRequest', 'X-XSRF-TOKEN': token ? decodeURIComponent(token) : '' },
                            credentials: 'same-origin',
                        }).then(() => setLiveBulkProgress(null));
                    }} />

                    {/* Filters */}
                    <FilterSection
                        filterState={filterState}
                        updateFilter={updateFilter}
                        countries={countries}
                        accommodationTypes={accommodationTypes}
                        onSearch={handleSearch}
                        onClear={clearFilters}
                    />

                    {/* Hotels Table */}
                    <DirectoryTable
                        hotels={hotels}
                        onPromote={openPromoteModal}
                        onViewDetail={openDetail}
                    />
                </div>
            </div>

            {/* Promote Modal */}
            {showPromoteModal && selectedHotel && (
                <ModalOverlay onClose={() => { setShowPromoteModal(false); setSelectedHotel(null); }}>
                    <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 z-10">
                        <ModalHeader title="Promote to Curated Listing" onClose={() => { setShowPromoteModal(false); setSelectedHotel(null); }} />
                        <div className="mb-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                {selectedHotel.photo1 && (
                                    <img src={selectedHotel.photo1} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{selectedHotel.hotel_name}</p>
                                    <p className="text-xs text-gray-500">
                                        {[selectedHotel.city, selectedHotel.country].filter(Boolean).join(', ')}
                                        {selectedHotel.star_rating && ` · ${selectedHotel.star_rating}★`}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                            This will create a curated hotel entry with estimated pool criteria and scoring.
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                            The destination will be auto-matched from the hotel's city (<strong>{selectedHotel.city || 'Unknown'}</strong>, {selectedHotel.country || 'Unknown'}). If no matching destination exists, one will be created automatically.
                        </p>
                        {promoteForm.errors.error && (
                            <p className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded-lg">{promoteForm.errors.error}</p>
                        )}
                        <form onSubmit={handlePromote}>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => { setShowPromoteModal(false); setSelectedHotel(null); }}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={promoteForm.processing}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                                >
                                    {promoteForm.processing ? 'Promoting...' : 'Promote to Site'}
                                </button>
                            </div>
                        </form>
                    </div>
                </ModalOverlay>
            )}

            {/* Detail Modal */}
            {showDetailModal && detailHotel && (
                <ModalOverlay onClose={() => { setShowDetailModal(false); setDetailHotel(null); }}>
                    <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 z-10 max-h-[85vh] overflow-y-auto">
                        <ModalHeader title={detailHotel.hotel_name} onClose={() => { setShowDetailModal(false); setDetailHotel(null); }} />

                        {/* Photos */}
                        {detailHotel.photo1 && (
                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                {[detailHotel.photo1, detailHotel.photo2, detailHotel.photo3, detailHotel.photo4, detailHotel.photo5]
                                    .filter(Boolean)
                                    .map((url, i) => (
                                        <img key={i} src={url} alt="" className="w-28 h-20 rounded-lg object-cover flex-shrink-0" />
                                    ))}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                            <DetailField label="Agoda ID" value={detailHotel.agoda_hotel_id} />
                            <DetailField label="Star Rating" value={detailHotel.star_rating ? `${detailHotel.star_rating}★` : 'N/A'} />
                            <DetailField label="City" value={detailHotel.city} />
                            <DetailField label="Country" value={detailHotel.country} />
                            <DetailField label="Rooms" value={detailHotel.numberrooms} />
                            <DetailField label="Floors" value={detailHotel.numberfloors} />
                            <DetailField label="Reviews" value={detailHotel.number_of_reviews?.toLocaleString()} />
                            <DetailField label="Rating" value={detailHotel.rating_average ? `${detailHotel.rating_average}/10` : 'N/A'} />
                            <DetailField label="Rate From" value={detailHotel.rates_from ? `${detailHotel.rates_currency || '$'}${detailHotel.rates_from}` : 'N/A'} />
                            <DetailField label="Type" value={detailHotel.accommodation_type} />
                            <DetailField label="Chain" value={detailHotel.chain_name} />
                            <DetailField label="Brand" value={detailHotel.brand_name} />
                            <DetailField label="Year Opened" value={detailHotel.yearopened} />
                            <DetailField label="Year Renovated" value={detailHotel.yearrenovated} />
                            <DetailField label="Check-in" value={detailHotel.checkin} />
                            <DetailField label="Check-out" value={detailHotel.checkout} />
                        </div>

                        {detailHotel.addressline1 && (
                            <div className="mb-4">
                                <p className="text-xs font-medium text-gray-500 mb-1">Address</p>
                                <p className="text-sm text-gray-900">
                                    {[detailHotel.addressline1, detailHotel.addressline2, detailHotel.zipcode].filter(Boolean).join(', ')}
                                </p>
                            </div>
                        )}

                        {detailHotel.overview && (
                            <div className="mb-4">
                                <p className="text-xs font-medium text-gray-500 mb-1">Overview</p>
                                <p className="text-sm text-gray-700 line-clamp-6">{detailHotel.overview}</p>
                            </div>
                        )}

                        <div className="flex gap-3 pt-2 border-t border-gray-100">
                            {!detailHotel.promoted_hotel_id && (
                                <button
                                    onClick={() => {
                                        setShowDetailModal(false);
                                        openPromoteModal(detailHotel);
                                    }}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                    Promote to Site
                                </button>
                            )}
                            {detailHotel.promoted_hotel_id && (
                                <Link
                                    href={route('admin.hotels.edit', detailHotel.promoted_hotel_id)}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    View Curated Listing
                                </Link>
                            )}
                            <a
                                href={`https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=${1955707}&hid=${detailHotel.agoda_hotel_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-4 py-2 text-sm font-medium text-center text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                View on Agoda
                            </a>
                        </div>
                    </div>
                </ModalOverlay>
            )}

            {/* Bulk Promote Modal */}
            {showBulkPromoteModal && (
                <ModalOverlay onClose={() => setShowBulkPromoteModal(false)}>
                    <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6 z-10 max-h-[90vh] overflow-y-auto">
                        <ModalHeader title="Bulk Promote by Country" onClose={() => setShowBulkPromoteModal(false)} />

                        <p className="text-sm text-gray-600 mb-4">
                            Promote all unpromoted hotels matching the filters below into curated listings.
                            This runs in the background — you can leave the page.
                        </p>

                        <form onSubmit={handleBulkPromote} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                                <select
                                    value={bulkForm.data.country}
                                    onChange={e => bulkForm.setData('country', e.target.value)}
                                    required
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="">Select a country...</option>
                                    {countries.map(c => (
                                        <option key={c.code} value={c.code}>{c.name || c.code}</option>
                                    ))}
                                </select>
                                {bulkForm.errors.country && (
                                    <p className="mt-1 text-sm text-red-600">{bulkForm.errors.country}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Stars (optional)</label>
                                    <select
                                        value={bulkForm.data.star_rating}
                                        onChange={e => bulkForm.setData('star_rating', e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    >
                                        {STAR_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type (optional)</label>
                                    <select
                                        value={bulkForm.data.accommodation_type}
                                        onChange={e => bulkForm.setData('accommodation_type', e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    >
                                        <option value="">All Types</option>
                                        {accommodationTypes.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Maximum hotels to promote (1–5000)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5000"
                                    value={bulkForm.data.limit}
                                    onChange={e => bulkForm.setData('limit', parseInt(e.target.value) || 500)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Hard cap: 5000 per job. Run again to continue if there are more.
                                </p>
                            </div>

                            {/* Live preview of matching count */}
                            {bulkForm.data.country && (
                                <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm">
                                    {bulkPreviewLoading && (
                                        <span className="text-orange-700">Counting matching hotels…</span>
                                    )}
                                    {!bulkPreviewLoading && bulkMatching !== null && (
                                        <p className="text-orange-800">
                                            <strong>{bulkMatching.toLocaleString()}</strong> unpromoted hotels match these filters.
                                            {bulkMatching > 0 && (
                                                <> Up to <strong>{Math.min(bulkMatching, bulkForm.data.limit).toLocaleString()}</strong> will be promoted.</>
                                            )}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                                ⚠ Each hotel runs through the same logic as a single promote: matching/creating
                                its destination, generating estimated pool criteria, and calculating scores.
                                Recommended to start with a small limit (e.g. 50) to verify the result.
                            </div>

                            {bulkForm.errors.bulk && (
                                <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">{bulkForm.errors.bulk}</p>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowBulkPromoteModal(false)}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={bulkForm.processing || !bulkForm.data.country || bulkMatching === 0}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {bulkForm.processing ? 'Starting…' : 'Start Bulk Promote'}
                                </button>
                            </div>
                        </form>
                    </div>
                </ModalOverlay>
            )}
        </>
    );
}

// ============================================================================
// Sub-components
// ============================================================================

function ImportProgressBanner({ progress, onDismiss }) {
    if (!progress || progress.status === 'idle') return null;

    const configs = {
        queued: {
            bg: 'bg-blue-50 border-blue-200',
            text: 'text-blue-700',
            bar: 'bg-blue-500',
            icon: (
                <svg className="w-5 h-5 animate-spin text-blue-500" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            ),
            label: 'Queued',
        },
        running: {
            bg: 'bg-amber-50 border-amber-200',
            text: 'text-amber-700',
            bar: 'bg-amber-500',
            icon: (
                <svg className="w-5 h-5 animate-spin text-amber-500" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            ),
            label: 'Importing',
        },
        completed: {
            bg: 'bg-green-50 border-green-200',
            text: 'text-green-700',
            bar: 'bg-green-500',
            icon: (
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            ),
            label: 'Completed',
        },
        failed: {
            bg: 'bg-red-50 border-red-200',
            text: 'text-red-700',
            bar: 'bg-red-500',
            icon: (
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
            ),
            label: 'Failed',
        },
    };

    const config = configs[progress.status] || configs.queued;
    const pct = progress.total > 0 ? Math.round((progress.processed / progress.total) * 100) : 0;
    const processed = (progress.processed || 0).toLocaleString();
    const total = (progress.total || 0).toLocaleString();

    return (
        <div className={`rounded-xl border-2 p-4 sm:p-5 mb-4 sm:mb-6 ${config.bg}`}>
            {/* Top row: icon + status + counts */}
            <div className="flex items-center gap-3 mb-2">
                {config.icon}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm sm:text-base font-semibold ${config.text}`}>
                            {config.label}
                        </span>
                        <div className="flex items-center gap-2">
                        {(progress.status === 'completed' || progress.status === 'failed') && onDismiss && (
                            <button onClick={onDismiss} className={`text-xs px-2 py-0.5 rounded ${config.text} hover:bg-white/50 transition-colors`}>
                                Dismiss
                            </button>
                        )}
                        {progress.total > 0 && (
                            <span className={`text-xs sm:text-sm font-bold ${config.text}`}>
                                {pct}%
                            </span>
                        )}
                        </div>
                    </div>
                    <p className={`text-xs sm:text-sm ${config.text} opacity-80 mt-0.5`}>
                        {progress.message}
                    </p>
                </div>
            </div>

            {/* Progress bar */}
            {(progress.status === 'running' || progress.status === 'queued') && (
                <div className="w-full bg-white/60 rounded-full h-3 mb-2">
                    <div
                        className={`${config.bar} h-3 rounded-full transition-all duration-700 ease-out`}
                        style={{ width: progress.status === 'queued' ? '2%' : `${Math.max(pct, 1)}%` }}
                    />
                </div>
            )}
            {progress.status === 'completed' && (
                <div className="w-full bg-white/60 rounded-full h-3 mb-2">
                    <div className="bg-green-500 h-3 rounded-full w-full" />
                </div>
            )}

            {/* Counts */}
            {progress.total > 0 && (
                <div className="flex items-center justify-between">
                    <span className={`text-xs ${config.text} opacity-70`}>
                        {processed} of {total} hotels processed
                    </span>
                    {progress.status === 'running' && progress.processed > 0 && progress.processed < progress.total && (() => {
                        try {
                            const elapsed = (Date.now() - new Date(progress.updated_at).getTime()) / 1000;
                            if (elapsed <= 0) return null;
                            const rate = progress.processed / Math.max(elapsed, 1);
                            const remaining = Math.round((progress.total - progress.processed) / rate / 60);
                            if (remaining <= 0 || !isFinite(remaining)) return null;
                            return (
                                <span className={`text-xs ${config.text} opacity-70`}>
                                    ~{remaining} min remaining
                                </span>
                            );
                        } catch { return null; }
                    })()}
                </div>
            )}
        </div>
    );
}

function FilterSection({ filterState, updateFilter, countries, accommodationTypes, onSearch, onClear }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
            <h2 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Filter Directory</h2>
            <form onSubmit={onSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
                <div className="lg:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">Search</label>
                    <input
                        type="text"
                        value={filterState.search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                        placeholder="Hotel name, city, or ID..."
                        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">Country</label>
                    <select
                        value={filterState.country}
                        onChange={(e) => updateFilter('country', e.target.value)}
                        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm"
                    >
                        <option value="">All Countries</option>
                        {countries.map(c => (
                            <option key={c.code} value={c.code}>{c.name || c.code}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">Stars</label>
                    <select
                        value={filterState.star_rating}
                        onChange={(e) => updateFilter('star_rating', e.target.value)}
                        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm"
                    >
                        {STAR_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">Status</label>
                    <select
                        value={filterState.promoted}
                        onChange={(e) => updateFilter('promoted', e.target.value)}
                        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm"
                    >
                        {PROMOTED_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-end gap-2">
                    <button
                        type="submit"
                        className="flex-1 px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors text-sm"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={onClear}
                        className="px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm"
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
}

function DirectoryTable({ hotels, onPromote, onViewDetail }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {hotels.data.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-12 text-center text-gray-500 text-sm">
                                    No hotels found. {hotels.total === 0 ? 'Upload a CSV to get started.' : 'Try adjusting your filters.'}
                                </td>
                            </tr>
                        ) : (
                            hotels.data.map(hotel => (
                                <tr key={hotel.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            {hotel.photo1 ? (
                                                <img src={hotel.photo1} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                                            ) : (
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0" />
                                            )}
                                            <div className="min-w-0">
                                                <button
                                                    onClick={() => onViewDetail(hotel)}
                                                    className="text-sm font-medium text-gray-900 hover:text-orange-600 truncate max-w-[220px] block text-left transition-colors"
                                                >
                                                    {hotel.hotel_name}
                                                </button>
                                                <div className="text-xs text-gray-500">
                                                    {hotel.star_rating ? `${hotel.star_rating}★` : ''} 
                                                    {hotel.accommodation_type ? ` · ${hotel.accommodation_type}` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-sm text-gray-900 truncate max-w-[150px]">{hotel.city || '-'}</div>
                                        <div className="text-xs text-gray-500">{hotel.country || hotel.countryisocode || '-'}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {hotel.rating_average ? (
                                            <div>
                                                <span className="text-sm font-medium text-gray-900">{hotel.rating_average}/10</span>
                                                <div className="text-xs text-gray-500">{hotel.number_of_reviews?.toLocaleString()} reviews</div>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {hotel.rates_from ? (
                                            <span className="text-sm text-gray-900">
                                                {hotel.rates_currency || '$'}{hotel.rates_from}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-400">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {hotel.promoted_hotel_id ? (
                                            <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                                Promoted
                                            </span>
                                        ) : (
                                            <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-500">
                                                Directory
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onViewDetail(hotel)}
                                                className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                            >
                                                View
                                            </button>
                                            {hotel.promoted_hotel_id ? (
                                                <Link
                                                    href={route('admin.hotels.edit', hotel.promoted_hotel_id)}
                                                    className="text-xs font-medium text-green-600 hover:text-green-700 transition-colors"
                                                >
                                                    Edit Listing
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={() => onPromote(hotel)}
                                                    className="text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors"
                                                >
                                                    Promote
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
                {hotels.data.length === 0 ? (
                    <div className="px-4 py-12 text-center text-gray-500 text-sm">
                        No hotels found.
                    </div>
                ) : (
                    hotels.data.map(hotel => (
                        <div key={hotel.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start gap-3 mb-2">
                                {hotel.photo1 ? (
                                    <img src={hotel.photo1} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                                ) : (
                                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                    <button
                                        onClick={() => onViewDetail(hotel)}
                                        className="text-sm font-medium text-gray-900 truncate block text-left"
                                    >
                                        {hotel.hotel_name}
                                    </button>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {[hotel.city, hotel.country].filter(Boolean).join(', ')}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        {hotel.star_rating && <span className="text-xs text-gray-500">{hotel.star_rating}★</span>}
                                        {hotel.rating_average && <span className="text-xs text-gray-500">{hotel.rating_average}/10</span>}
                                        {hotel.promoted_hotel_id ? (
                                            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-green-100 text-green-700">Promoted</span>
                                        ) : (
                                            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 text-gray-500">Directory</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                                <button
                                    onClick={() => onViewDetail(hotel)}
                                    className="flex-1 px-3 py-1.5 text-center text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    View Details
                                </button>
                                {hotel.promoted_hotel_id ? (
                                    <Link
                                        href={route('admin.hotels.edit', hotel.promoted_hotel_id)}
                                        className="flex-1 px-3 py-1.5 text-center text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Edit Listing
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => onPromote(hotel)}
                                        className="flex-1 px-3 py-1.5 text-center text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        Promote
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {(hotels.prev_page_url || hotels.next_page_url) && (
                <div className="bg-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t border-gray-100">
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                        <div className="text-xs sm:text-sm text-gray-500">
                            {hotels.from && hotels.to && (
                                <>
                                    Showing <span className="font-medium text-gray-900">{hotels.from}</span> to{' '}
                                    <span className="font-medium text-gray-900">{hotels.to}</span>
                                </>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {hotels.prev_page_url ? (
                                <Link
                                    href={hotels.prev_page_url}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    ← Previous
                                </Link>
                            ) : (
                                <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium text-gray-400 bg-gray-50">
                                    ← Previous
                                </span>
                            )}
                            <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium bg-orange-500 text-white">
                                Page {hotels.current_page}
                            </span>
                            {hotels.next_page_url ? (
                                <Link
                                    href={hotels.next_page_url}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    Next →
                                </Link>
                            ) : (
                                <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium text-gray-400 bg-gray-50">
                                    Next →
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function DetailField({ label, value }) {
    if (!value) return null;
    return (
        <div>
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="text-sm text-gray-900">{value}</p>
        </div>
    );
}

function ModalOverlay({ children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
                {children}
            </div>
        </div>
    );
}

function ModalHeader({ title, onClose }) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}

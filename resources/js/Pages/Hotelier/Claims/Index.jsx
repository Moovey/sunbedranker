import { Link, Head, usePage } from '@inertiajs/react';
import HotelierNav from '@/Components/HotelierNav';

export default function HotelierClaimsIndex({ claims, subscription }) {
    const { auth } = usePage().props;

    const getStatusBadge = (claim) => {
        // Check if email verification is needed
        if (claim.needs_verification) {
            return (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    Verify Email
                </span>
            );
        }
        
        const badges = {
            pending: 'bg-yellow-100 text-yellow-700',
            approved: 'bg-green-100 text-green-700',
            rejected: 'bg-red-100 text-red-700',
        };
        const labels = {
            pending: 'Pending Review',
            approved: 'Approved',
            rejected: 'Rejected',
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[claim.status]}`}>
                {labels[claim.status]}
            </span>
        );
    };

    // Count claims by status
    const needsVerificationCount = claims.filter(c => c.needs_verification).length;
    const pendingCount = claims.filter(c => c.status === 'pending' && !c.needs_verification).length;
    const approvedCount = claims.filter(c => c.status === 'approved').length;
    const rejectedCount = claims.filter(c => c.status === 'rejected').length;

    return (
        <>
            <Head title="My Hotel Claims" />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <HotelierNav />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Hotel Claims</h1>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Track the status of your hotel ownership claims</p>
                        </div>
                        <Link
                            href="/"
                            className="px-3 sm:px-4 py-2 bg-orange-500 text-white font-medium text-xs sm:text-sm rounded-lg hover:bg-orange-600 transition-colors text-center w-full sm:w-auto"
                        >
                            Search Hotels
                        </Link>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        {needsVerificationCount > 0 && (
                            <div className="bg-blue-50 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <div className="text-lg sm:text-xl font-bold text-gray-900">{needsVerificationCount}</div>
                                    <div className="text-xs text-blue-600 font-medium">VERIFY EMAIL</div>
                                </div>
                            </div>
                        )}
                        <div className="bg-yellow-50 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <div className="text-lg sm:text-xl font-bold text-gray-900">{pendingCount}</div>
                                <div className="text-xs text-gray-500 font-medium">PENDING</div>
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <div className="text-lg sm:text-xl font-bold text-gray-900">{approvedCount}</div>
                                <div className="text-xs text-gray-500 font-medium">APPROVED</div>
                            </div>
                        </div>
                        <div className="bg-red-50 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <div className="text-lg sm:text-xl font-bold text-gray-900">{rejectedCount}</div>
                                <div className="text-xs text-gray-500 font-medium">REJECTED</div>
                            </div>
                        </div>
                    </div>

                    {/* Claims List */}
                    {claims.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-12 text-center">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No Claims Yet</h3>
                            <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">You haven't submitted any hotel ownership claims yet.</p>
                            <Link
                                href="/"
                                className="inline-block px-3 sm:px-4 py-2 bg-orange-500 text-white font-medium text-xs sm:text-sm rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Search for Hotels to Claim
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="p-4 sm:p-6 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">All Claims</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {claims.map((claim) => (
                                    <div key={claim.id} className="p-3 sm:p-4 md:p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                                            {/* Hotel Image */}
                                            <div className="w-full sm:w-32 lg:w-32 flex-shrink-0">
                                                <img
                                                    src={claim.hotel.main_image_url || '/images/default-hotel.jpg'}
                                                    alt={claim.hotel.name}
                                                    className="w-full h-32 sm:h-24 lg:h-20 object-cover rounded-lg"
                                                    width="128"
                                                    height="80"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Claim Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2 sm:mb-3">
                                                    <div className="min-w-0">
                                                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{claim.hotel.name}</h3>
                                                        <p className="text-xs text-gray-500">{claim.hotel.destination?.name}</p>
                                                    </div>
                                                    {getStatusBadge(claim)}
                                                </div>

                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs mb-2 sm:mb-3">
                                                    <div className="min-w-0">
                                                        <p className="text-gray-500">Email</p>
                                                        <p className="text-gray-900 font-medium truncate">{claim.official_email}</p>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-gray-500">Phone</p>
                                                        <p className="text-gray-900 font-medium truncate">{claim.phone}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Submitted</p>
                                                        <p className="text-gray-900 font-medium">{new Date(claim.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                    {claim.reviewed_at && (
                                                        <div>
                                                            <p className="text-gray-500">Reviewed</p>
                                                            <p className="text-gray-900 font-medium">{new Date(claim.reviewed_at).toLocaleDateString()}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                {claim.claim_message && (
                                                    <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                                                        <p className="text-xs text-gray-500 mb-1">Your Message</p>
                                                        <p className="text-xs text-gray-700 break-words">{claim.claim_message}</p>
                                                    </div>
                                                )}

                                                {claim.admin_notes && (
                                                    <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-orange-50 rounded-lg">
                                                        <p className="text-xs text-gray-500 mb-1">Admin Notes</p>
                                                        <p className="text-xs text-gray-700 break-words">{claim.admin_notes}</p>
                                                    </div>
                                                )}

                                                {/* Verify Email Button for unverified claims */}
                                                {claim.needs_verification && (
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <Link
                                                            href={route('hotelier.claims.verify', claim.id)}
                                                            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors text-xs"
                                                        >
                                                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                            Verify Email
                                                        </Link>
                                                        <span className="text-xs text-gray-500">
                                                            Check your inbox at {claim.official_email}
                                                        </span>
                                                    </div>
                                                )}

                                                {claim.status === 'approved' && (
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <Link
                                                            href={route('hotelier.hotels.manage', claim.hotel.slug)}
                                                            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors text-xs"
                                                        >
                                                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Manage
                                                        </Link>
                                                        <Link
                                                            href={`/hotels/${claim.hotel.slug}`}
                                                            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-xs"
                                                        >
                                                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            View
                                                        </Link>
                                                        {(subscription?.tier === 'premium' || subscription?.tier === 'enhanced') && (
                                                            <Link
                                                                href={route('hotelier.hotels.analytics', claim.hotel.slug)}
                                                                className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-orange-50 text-orange-600 font-medium rounded-lg hover:bg-orange-100 transition-colors text-xs"
                                                            >
                                                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                                </svg>
                                                                Analytics
                                                            </Link>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

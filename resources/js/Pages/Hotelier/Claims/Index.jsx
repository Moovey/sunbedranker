import { Link, Head, usePage } from '@inertiajs/react';
import HotelierNav from '@/Components/HotelierNav';

export default function HotelierClaimsIndex({ claims, subscription }) {
    const { auth } = usePage().props;

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            approved: 'bg-green-100 text-green-800 border-green-300',
            rejected: 'bg-red-100 text-red-800 border-red-300',
        };
        const labels = {
            pending: 'Pending Review',
            approved: 'Approved',
            rejected: 'Rejected',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <>
            <Head title="My Hotel Claims" />
            
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <HotelierNav />

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Hotel Claims</h1>
                        <p className="text-gray-600 mt-2">Track the status of your hotel ownership claims</p>
                    </div>

                    {/* Claims List */}
                    {claims.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-gray-100">
                            <svg className="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Claims Yet</h3>
                            <p className="text-gray-600 mb-6">You haven't submitted any hotel ownership claims yet.</p>
                            <Link
                                href="/"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Search for Hotels to Claim
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {claims.map((claim) => (
                                <div key={claim.id} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        {/* Hotel Image */}
                                        <div className="lg:w-48 flex-shrink-0">
                                            <img
                                                src={claim.hotel.main_image_url || '/images/default-hotel.jpg'}
                                                alt={claim.hotel.name}
                                                className="w-full h-32 lg:h-full object-cover rounded-lg"
                                            />
                                        </div>

                                        {/* Claim Details */}
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{claim.hotel.name}</h3>
                                                    <p className="text-gray-600 text-sm">{claim.hotel.destination?.name}</p>
                                                </div>
                                                {getStatusBadge(claim.status)}
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-500 font-semibold">Official Email</p>
                                                    <p className="text-gray-900">{claim.official_email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 font-semibold">Phone</p>
                                                    <p className="text-gray-900">{claim.phone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 font-semibold">Submitted</p>
                                                    <p className="text-gray-900">{new Date(claim.created_at).toLocaleDateString()}</p>
                                                </div>
                                                {claim.reviewed_at && (
                                                    <div>
                                                        <p className="text-gray-500 font-semibold">Reviewed</p>
                                                        <p className="text-gray-900">{new Date(claim.reviewed_at).toLocaleDateString()}</p>
                                                    </div>
                                                )}
                                            </div>

                                            {claim.claim_message && (
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <p className="text-gray-500 font-semibold text-sm mb-1">Your Message</p>
                                                    <p className="text-gray-900 text-sm">{claim.claim_message}</p>
                                                </div>
                                            )}

                                            {claim.admin_notes && (
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <p className="text-gray-500 font-semibold text-sm mb-1">Admin Notes</p>
                                                    <p className="text-gray-900 text-sm">{claim.admin_notes}</p>
                                                </div>
                                            )}

                                            {claim.status === 'approved' && (
                                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                                    <Link
                                                        href={route('hotelier.hotels.manage', claim.hotel.slug)}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Manage Hotel Profile
                                                    </Link>
                                                    <Link
                                                        href={`/hotels/${claim.hotel.slug}`}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md text-sm"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        View Public Profile
                                                    </Link>
                                                    {(subscription?.tier === 'premium' || subscription?.tier === 'enhanced') && (
                                                        <Link
                                                            href={route('hotelier.hotels.analytics', claim.hotel.slug)}
                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md text-sm"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    )}
                </div>
            </div>
        </>
    );
}

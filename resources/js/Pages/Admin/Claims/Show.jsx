import { Link, Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminNav from '@/Components/AdminNav';

export default function ClaimShow({ claim, userClaimHistory, hotelClaimHistory, stats }) {
    const [showRejectModal, setShowRejectModal] = useState(false);

    const approveForm = useForm({});
    const rejectForm = useForm({
        admin_notes: '',
    });

    const handleApprove = () => {
        if (confirm('Are you sure you want to approve this claim? This will grant hotel ownership to this user.')) {
            approveForm.post(route('admin.claims.approve', claim.id));
        }
    };

    const handleReject = (e) => {
        e.preventDefault();
        rejectForm.post(route('admin.claims.reject', claim.id), {
            onSuccess: () => setShowRejectModal(false)
        });
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-50 text-yellow-700',
            approved: 'bg-green-50 text-green-700',
            rejected: 'bg-red-50 text-red-700',
        };

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
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

    // Check if email domain matches hotel website
    const getEmailDomain = () => {
        if (!claim.official_email) return '';
        return claim.official_email.split('@')[1];
    };

    const getHotelDomain = () => {
        if (!claim.hotel?.website) return '';
        try {
            const url = new URL(claim.hotel.website.startsWith('http') ? claim.hotel.website : 'https://' + claim.hotel.website);
            return url.hostname.replace('www.', '');
        } catch {
            return '';
        }
    };

    const emailDomain = getEmailDomain();
    const hotelDomain = getHotelDomain();
    const domainMatches = emailDomain.toLowerCase() === hotelDomain.toLowerCase();

    return (
        <>
            <Head title={`Review Claim - ${claim.hotel?.name}`} />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav stats={stats} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('admin.claims.index')}
                                className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Review Claim</h1>
                                <p className="text-sm text-gray-500">Claim #{claim.id} • {claim.hotel?.name}</p>
                            </div>
                        </div>
                        {getStatusBadge(claim.status)}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Hotel Information */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Hotel Details</h2>
                                <div className="flex gap-4">
                                    <img
                                        src={claim.hotel?.main_image || '/images/default-hotel.jpg'}
                                        alt={claim.hotel?.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">{claim.hotel?.name}</h3>
                                        <p className="text-gray-500 text-sm mt-1">{claim.hotel?.destination?.name}</p>
                                        {claim.hotel?.website && (
                                            <p className="text-sm text-gray-500 mt-2">
                                                Website: <a href={claim.hotel.website} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700">{claim.hotel.website}</a>
                                            </p>
                                        )}
                                        {claim.hotel?.email && (
                                            <p className="text-sm text-gray-500">Official Email: {claim.hotel.email}</p>
                                        )}
                                        {claim.hotel?.phone && (
                                            <p className="text-sm text-gray-500">Phone: {claim.hotel.phone}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Claimant Information */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Claimant Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Name</p>
                                        <p className="text-gray-900 mt-1">{claim.user?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Account Email</p>
                                        <p className="text-gray-900 mt-1">{claim.user?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Official Hotel Email</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-gray-900">{claim.official_email}</p>
                                            {domainMatches ? (
                                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        {!domainMatches && (
                                            <p className="text-xs text-red-600 mt-1">⚠️ Domain mismatch! Expected: @{hotelDomain}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Phone</p>
                                        <p className="text-gray-900 mt-1">{claim.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">IP Address</p>
                                        <p className="text-gray-900 mt-1">{claim.ip_address || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Submitted</p>
                                        <p className="text-gray-900 mt-1">{formatDate(claim.created_at)}</p>
                                    </div>
                                </div>

                                {claim.claim_message && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Additional Message</p>
                                        <p className="text-gray-900 text-sm">{claim.claim_message}</p>
                                    </div>
                                )}
                            </div>

                            {/* Review Information (if reviewed) */}
                            {claim.reviewed_at && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Review Details</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Reviewed By</p>
                                            <p className="text-gray-900 mt-1">{claim.reviewer?.name || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Reviewed At</p>
                                            <p className="text-gray-900 mt-1">{formatDate(claim.reviewed_at)}</p>
                                        </div>
                                    </div>
                                    {claim.admin_notes && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Admin Notes</p>
                                            <p className="text-gray-900 text-sm">{claim.admin_notes}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Actions */}
                            {claim.status === 'pending' && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                                    <div className="space-y-3">
                                        <button
                                            onClick={handleApprove}
                                            disabled={approveForm.processing}
                                            className="w-full px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {approveForm.processing ? 'Approving...' : 'Approve Claim'}
                                        </button>
                                        <button
                                            onClick={() => setShowRejectModal(true)}
                                            className="w-full px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            Reject Claim
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Verification Checklist */}
                            <div className="bg-orange-50 rounded-xl border border-orange-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Checklist</h3>
                                <div className="space-y-3">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" checked={domainMatches} readOnly className="mt-0.5 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                                        <span className="text-sm text-gray-700">Email domain matches hotel website</span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" checked={!!claim.phone} readOnly className="mt-0.5 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                                        <span className="text-sm text-gray-700">Phone number provided</span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" checked={!claim.hotel?.owned_by} readOnly className="mt-0.5 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                                        <span className="text-sm text-gray-700">Hotel has no existing owner</span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" checked={userClaimHistory.length === 0} readOnly className="mt-0.5 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                                        <span className="text-sm text-gray-700">No suspicious claim history</span>
                                    </label>
                                </div>
                            </div>

                            {/* User Claim History */}
                            {userClaimHistory.length > 0 && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User's Claim History</h3>
                                    <div className="space-y-2">
                                        {userClaimHistory.map((historyClaim) => (
                                            <div key={historyClaim.id} className="text-sm p-3 bg-gray-50 rounded-lg">
                                                <p className="font-medium text-gray-900">{historyClaim.hotel?.name}</p>
                                                <p className="text-gray-500 text-xs mt-1">{historyClaim.status} • {formatDate(historyClaim.created_at)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Hotel Claim History */}
                            {hotelClaimHistory.length > 0 && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel's Claim History</h3>
                                    <div className="space-y-2">
                                        {hotelClaimHistory.map((historyClaim) => (
                                            <div key={historyClaim.id} className="text-sm p-3 bg-gray-50 rounded-lg">
                                                <p className="font-medium text-gray-900">{historyClaim.user?.name}</p>
                                                <p className="text-gray-500 text-xs mt-1">{historyClaim.status} • {formatDate(historyClaim.created_at)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reject Modal */}
                {showRejectModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-sm max-w-lg w-full p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reject Claim</h3>
                            <form onSubmit={handleReject}>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Reason for Rejection *
                                    </label>
                                    <textarea
                                        value={rejectForm.data.admin_notes}
                                        onChange={(e) => rejectForm.setData('admin_notes', e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                        placeholder="Explain why this claim is being rejected..."
                                        required
                                    />
                                    {rejectForm.errors.admin_notes && (
                                        <p className="text-red-500 text-sm mt-2">{rejectForm.errors.admin_notes}</p>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={rejectForm.processing}
                                        className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                                    >
                                        {rejectForm.processing ? 'Rejecting...' : 'Confirm Rejection'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowRejectModal(false)}
                                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

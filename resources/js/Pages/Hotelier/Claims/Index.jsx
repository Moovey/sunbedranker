import { Link, Head, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

export default function HotelierClaimsIndex({ claims }) {
    const { auth } = usePage().props;
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                {/* Header Navigation */}
                <nav className="bg-white border-b-4 border-orange-400 shadow-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-14 sm:h-16">
                            {/* Logo and Brand */}
                            <div className="flex items-center gap-4 sm:gap-8">
                                <Link href="/" className="flex items-center flex-shrink-0">
                                    <span className="text-xl sm:text-2xl font-bold">
                                        <span className="text-red-500">sun</span>
                                        <span className="text-orange-500">bed</span>
                                        <span className="text-blue-500">ranker</span>
                                    </span>
                                    <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-bold text-gray-700 border-l-2 pl-2 sm:pl-3">Hotelier</span>
                                </Link>

                                {/* Desktop Navigation Links */}
                                <div className="hidden md:flex items-center gap-1">
                                    <Link
                                        href={route('hotelier.dashboard')}
                                        className="px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 text-gray-700 hover:bg-orange-50"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route('hotelier.claims.index')}
                                        className="px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                                    >
                                        My Claims
                                    </Link>
                                </div>
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center gap-2 sm:gap-4">
                                {/* Back to Site */}
                                <Link
                                    href="/"
                                    className="hidden sm:block text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300"
                                >
                                    ← Back to Site
                                </Link>

                                {/* User Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                                        className="flex items-center gap-2 px-2 sm:px-3 py-2 border-2 border-gray-300 rounded-lg hover:border-orange-300 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-md">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden sm:block text-sm font-bold text-gray-900">{auth.user.name}</span>
                                        <svg className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {showUserDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-gray-200 py-1 z-50">
                                            <Link
                                                href={route('profile.edit')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 font-semibold"
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold"
                                            >
                                                Logout
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

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
                                                <div className="mt-4">
                                                    <Link
                                                        href={`/hotels/${claim.hotel.slug}`}
                                                        className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md text-sm"
                                                    >
                                                        View Your Hotel Profile
                                                    </Link>
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

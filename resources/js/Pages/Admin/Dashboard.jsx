import { Link, Head, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function AdminDashboard({ stats, recentHotels, pendingClaims, pendingReviews }) {
    const { auth } = usePage().props;
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <Head title="Admin Dashboard" />
            
            <div className="min-h-screen bg-gray-100">
                {/* Admin Navigation */}
                <nav className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo and Brand */}
                            <div className="flex items-center gap-8">
                                <Link href="/" className="flex items-center">
                                    <span className="text-2xl font-bold">
                                        <span className="text-red-500">sun</span>
                                        <span className="text-orange-500">bed</span>
                                        <span className="text-blue-500">ranker</span>
                                    </span>
                                    <span className="ml-3 text-sm font-semibold text-gray-500 border-l pl-3">Admin</span>
                                </Link>

                                {/* Navigation Links */}
                                <div className="hidden md:flex items-center gap-1">
                                    <Link
                                        href="/admin"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                                            route().current('admin.dashboard')
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/admin/hotels"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                                            route().current('admin.hotels.*')
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        Hotels
                                    </Link>
                                    <Link
                                        href="/admin/claims"
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                                            route().current('admin.claims.*')
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        Claims
                                        {stats?.pending_claims > 0 && (
                                            <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-yellow-500 text-white rounded-full">
                                                {stats.pending_claims}
                                            </span>
                                        )}
                                    </Link>
                                </div>
                            </div>

                            {/* User Profile Dropdown */}
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/"
                                    className="text-sm text-gray-600 hover:text-gray-900 transition"
                                >
                                    ← Back to Site
                                </Link>

                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                                        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:border-gray-400 transition"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-semibold">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden sm:block text-sm font-medium text-gray-700">{auth.user.name}</span>
                                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {showUserDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                            <div className="px-4 py-2 border-b border-gray-200">
                                                <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
                                                <p className="text-xs text-gray-500">{auth.user.email}</p>
                                            </div>
                                            <Link
                                                href={route('profile.edit')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Profile Settings
                                            </Link>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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

                {/* Page Header */}
                <div className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Hotels"
                            value={stats.total_hotels}
                            subtitle={`${stats.active_hotels} active`}
                            color="blue"
                        />
                        <StatCard
                            title="Destinations"
                            value={stats.total_destinations}
                            color="green"
                        />
                        <StatCard
                            title="Pending Claims"
                            value={stats.pending_claims}
                            color="yellow"
                            link="/admin/claims"
                        />
                        <StatCard
                            title="Pending Reviews"
                            value={stats.pending_reviews}
                            color="purple"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Users"
                            value={stats.total_users}
                            color="indigo"
                        />
                        <StatCard
                            title="Hoteliers"
                            value={stats.hoteliers}
                            color="pink"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Hotels */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Recent Hotels</h2>
                                <Link href="/admin/hotels" className="text-sky-600 hover:text-sky-700 text-sm">
                                    View all →
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {recentHotels?.map((hotel) => (
                                    <Link
                                        key={hotel.id}
                                        href={`/admin/hotels/${hotel.id}/edit`}
                                        className="block p-3 hover:bg-gray-50 rounded-lg transition"
                                    >
                                        <div className="font-semibold text-gray-900">{hotel.name}</div>
                                        <div className="text-sm text-gray-600">{hotel.destination.name}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Pending Claims */}
                        {pendingClaims?.length > 0 && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-900">Pending Hotel Claims</h2>
                                    <Link href="/admin/claims" className="text-sky-600 hover:text-sky-700 text-sm">
                                        View all →
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    {pendingClaims.map((claim) => (
                                        <div key={claim.id} className="p-3 bg-yellow-50 rounded-lg">
                                            <div className="font-semibold text-gray-900">{claim.hotel.name}</div>
                                            <div className="text-sm text-gray-600">
                                                Claimed by {claim.user.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link
                                href="/admin/hotels/create"
                                className="px-4 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition text-center"
                            >
                                Add New Hotel
                            </Link>
                            <Link
                                href="/admin/hotels"
                                className="px-4 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition text-center"
                            >
                                Manage Hotels
                            </Link>
                            <Link
                                href="/admin/claims"
                                className="px-4 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition text-center"
                            >
                                Review Claims
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function StatCard({ title, value, subtitle, color = 'blue', link }) {
    const colors = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        purple: 'bg-purple-500',
        indigo: 'bg-indigo-500',
        pink: 'bg-pink-500',
    };

    const card = (
        <div className="bg-white rounded-lg shadow p-6">
            <div className={`w-12 h-12 ${colors[color]} rounded-lg flex items-center justify-center mb-4`}>
                <div className="text-white text-2xl font-bold">{value}</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
    );

    return link ? <Link href={link}>{card}</Link> : card;
}

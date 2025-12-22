import { Link, Head, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function AdminDashboard({ stats, recentHotels, pendingClaims, pendingReviews }) {
    const { auth } = usePage().props;
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
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
            
            <div className="min-h-screen bg-neutral-50 font-sans-luxury">
                {/* Admin Navigation */}
                <nav className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo and Brand */}
                            <div className="flex items-center gap-4 sm:gap-8">
                                <Link href="/" className="flex items-center flex-shrink-0">
                                    <span className="text-xl sm:text-2xl font-bold">
                                        <span className="text-red-500">sun</span>
                                        <span className="text-orange-500">bed</span>
                                        <span className="text-blue-500">ranker</span>
                                    </span>
                                    <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-light text-neutral-600 border-l pl-2 sm:pl-3 tracking-wide">Admin</span>
                                </Link>

                                {/* Desktop Navigation Links */}
                                <div className="hidden md:flex items-center gap-1">
                                    <Link
                                        href="/admin"
                                        className={`px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                                            route().current('admin.dashboard')
                                                ? 'bg-neutral-100 text-neutral-900'
                                                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                        }`}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/admin/hotels"
                                        className={`px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                                            route().current('admin.hotels.*')
                                                ? 'bg-neutral-100 text-neutral-900'
                                                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                        }`}
                                    >
                                        Hotels
                                    </Link>
                                    <Link
                                        href="/admin/claims"
                                        className={`px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                                            route().current('admin.claims.*')
                                                ? 'bg-neutral-100 text-neutral-900'
                                                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                        }`}
                                    >
                                        Claims
                                        {stats?.pending_claims > 0 && (
                                            <span className="ml-2 px-2 py-0.5 text-xs font-normal bg-neutral-900 text-white rounded-full">
                                                {stats.pending_claims}
                                            </span>
                                        )}
                                    </Link>
                                </div>
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center gap-2 sm:gap-4">
                                {/* Back to Site - Hidden on small mobile */}
                                <Link
                                    href="/"
                                    className="hidden sm:block text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 font-light transition-colors duration-300"
                                >
                                    ← Back to Site
                                </Link>

                                {/* User Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                                        className="flex items-center gap-2 px-2 sm:px-3 py-2 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-all duration-300"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-light">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden sm:block text-sm font-light text-neutral-700 max-w-[100px] truncate">{auth.user.name}</span>
                                        <svg className={`w-4 h-4 text-neutral-600 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {showUserDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-1 z-50 border border-neutral-100">
                                            <div className="px-4 py-2 border-b border-neutral-100">
                                                <p className="text-sm font-light text-neutral-900 truncate">{auth.user.name}</p>
                                                <p className="text-xs text-neutral-500 font-light truncate">{auth.user.email}</p>
                                            </div>
                                            <Link
                                                href={route('profile.edit')}
                                                className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 font-light transition-colors duration-300"
                                            >
                                                Profile Settings
                                            </Link>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-50 font-light transition-colors duration-300"
                                            >
                                                Logout
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                    className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors duration-300"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {showMobileMenu ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        {showMobileMenu && (
                            <div className="md:hidden border-t border-neutral-200 py-4 space-y-2">
                                <Link
                                    href="/admin"
                                    className={`block px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                                        route().current('admin.dashboard')
                                            ? 'bg-neutral-100 text-neutral-900'
                                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                    }`}
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/admin/hotels"
                                    className={`block px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                                        route().current('admin.hotels.*')
                                            ? 'bg-neutral-100 text-neutral-900'
                                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                    }`}
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    Hotels
                                </Link>
                                <Link
                                    href="/admin/claims"
                                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                                        route().current('admin.claims.*')
                                            ? 'bg-neutral-100 text-neutral-900'
                                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                    }`}
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    <span>Claims</span>
                                    {stats?.pending_claims > 0 && (
                                        <span className="px-2 py-0.5 text-xs font-normal bg-neutral-900 text-white rounded-full">
                                            {stats.pending_claims}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    href="/"
                                    className="block sm:hidden px-3 py-2 rounded-lg text-sm font-light text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-all duration-300"
                                    onClick={() => setShowMobileMenu(false)}
                                >
                                    ← Back to Site
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>

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
                        <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 text-center tracking-tight">Admin Dashboard</h1>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                        <StatCard
                            title="Total Hotels"
                            value={stats.total_hotels}
                            subtitle={`${stats.active_hotels} active`}
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M3 21h18M9 8h1m0 0h1m-1 0v12m0-12V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m0 0h1m-1 0v12m-6 0h6m-9 0H3m0 0V8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v13"/>
                                </svg>
                            }
                        />
                        <StatCard
                            title="Destinations"
                            value={stats.total_destinations}
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                            }
                        />
                        <StatCard
                            title="Pending Claims"
                            value={stats.pending_claims}
                            link="/admin/claims"
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            }
                        />
                        <StatCard
                            title="Pending Reviews"
                            value={stats.pending_reviews}
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                </svg>
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                        <StatCard
                            title="Total Users"
                            value={stats.total_users}
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                            }
                        />
                        <StatCard
                            title="Hoteliers"
                            value={stats.hoteliers}
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                        {/* Recent Hotels */}
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-5 sm:p-6 md:p-8 border border-neutral-100">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-6 gap-3 sm:gap-0">
                                <h2 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-light text-neutral-900">Recent Hotels</h2>
                                <Link 
                                    href="/admin/hotels" 
                                    className="text-neutral-600 hover:text-neutral-900 font-light tracking-[0.1em] uppercase text-xs transition-colors duration-400 group border-b border-neutral-300 hover:border-neutral-900 pb-1 whitespace-nowrap"
                                >
                                    View all <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </Link>
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                {recentHotels?.map((hotel) => (
                                    <Link
                                        key={hotel.id}
                                        href={`/admin/hotels/${hotel.id}/edit`}
                                        className="block p-3 sm:p-4 hover:bg-neutral-50 rounded-lg transition-all duration-300 border border-transparent hover:border-neutral-200"
                                    >
                                        <div className="font-light text-neutral-900 text-base sm:text-lg">{hotel.name}</div>
                                        <div className="text-xs sm:text-sm text-neutral-500 font-light tracking-wide uppercase mt-1">{hotel.destination.name}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Pending Claims */}
                        {pendingClaims?.length > 0 && (
                            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-5 sm:p-6 md:p-8 border border-neutral-100">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-6 gap-3 sm:gap-0">
                                    <h2 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-light text-neutral-900">Pending Hotel Claims</h2>
                                    <Link 
                                        href="/admin/claims" 
                                        className="text-neutral-600 hover:text-neutral-900 font-light tracking-[0.1em] uppercase text-xs transition-colors duration-400 group border-b border-neutral-300 hover:border-neutral-900 pb-1 whitespace-nowrap"
                                    >
                                        View all <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </Link>
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    {pendingClaims.map((claim) => (
                                        <div key={claim.id} className="p-3 sm:p-4 bg-amber-50 rounded-lg border border-amber-100">
                                            <div className="font-light text-neutral-900 text-base sm:text-lg">{claim.hotel.name}</div>
                                            <div className="text-xs sm:text-sm text-neutral-600 font-light mt-1">
                                                Claimed by {claim.user.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-5 sm:p-6 md:p-8 border border-neutral-100">
                        <h2 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-light text-neutral-900 mb-5 sm:mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                            <Link
                                href="/admin/hotels/create"
                                className="px-4 sm:px-6 py-3 sm:py-4 bg-neutral-900 text-white font-light rounded-lg hover:bg-neutral-800 transition-all duration-300 text-center tracking-wide hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                            >
                                Add New Hotel
                            </Link>
                            <Link
                                href="/admin/hotels"
                                className="px-4 sm:px-6 py-3 sm:py-4 bg-neutral-700 text-white font-light rounded-lg hover:bg-neutral-600 transition-all duration-300 text-center tracking-wide hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                            >
                                Manage Hotels
                            </Link>
                            <Link
                                href="/admin/claims"
                                className="px-4 sm:px-6 py-3 sm:py-4 bg-amber-600 text-white font-light rounded-lg hover:bg-amber-700 transition-all duration-300 text-center tracking-wide hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base sm:col-span-2 md:col-span-1"
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

function StatCard({ title, value, subtitle, icon, link }) {
    const card = (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-5 sm:p-6 md:p-8 border border-neutral-100 group">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1">
                    <div className="text-neutral-600 font-light text-xs sm:text-sm tracking-wide uppercase mb-2 sm:mb-3">{title}</div>
                    <div className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900">{value}</div>
                    {subtitle && (
                        <div className="text-neutral-500 font-light text-xs sm:text-sm mt-1 sm:mt-2">{subtitle}</div>
                    )}
                </div>
                <div className="text-neutral-400 group-hover:text-neutral-600 transition-colors duration-500 flex-shrink-0 ml-2">
                    {icon}
                </div>
            </div>
        </div>
    );

    return link ? (
        <Link href={link} className="block hover:scale-[1.02] transition-transform duration-300">
            {card}
        </Link>
    ) : card;
}

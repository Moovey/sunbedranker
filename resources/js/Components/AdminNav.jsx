import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function AdminNav({ stats }) {
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
        <nav className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center gap-4 sm:gap-8">
                        <Link href="/" className="flex items-center flex-shrink-0 gap-2 sm:gap-3">
                            <img 
                                src="/images/logo.png" 
                                alt="Sunbed Ranker" 
                                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                            />
                            <span className="text-xs sm:text-sm font-light text-neutral-600 border-l pl-2 sm:pl-3 tracking-wide">Admin</span>
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
                                    route().current('admin.claims.*') || route().current('admin.hoteliers.*') || route().current('admin.subscriptions.*')
                                        ? 'bg-neutral-100 text-neutral-900'
                                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                }`}
                            >
                                Hoteliers
                                {stats?.pending_claims > 0 && (
                                    <span className="ml-2 px-2 py-0.5 text-xs font-normal bg-neutral-900 text-white rounded-full">
                                        {stats.pending_claims}
                                    </span>
                                )}
                            </Link>
                            <Link
                                href="/admin/users"
                                className={`px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                                    route().current('admin.users.*')
                                        ? 'bg-neutral-100 text-neutral-900'
                                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                }`}
                            >
                                Users
                            </Link>
                            <Link
                                href="/admin/content"
                                className={`px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                                    route().current('admin.content.*')
                                        ? 'bg-neutral-100 text-neutral-900'
                                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                }`}
                            >
                                Content
                            </Link>
                            <Link
                                href="/admin/scoring"
                                className={`px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                                    route().current('admin.scoring.*')
                                        ? 'bg-neutral-100 text-neutral-900'
                                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                }`}
                            >
                                Scoring
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
                                {auth.user.profile_picture_url ? (
                                    <img 
                                        src={auth.user.profile_picture_url} 
                                        alt={auth.user.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-light">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
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
                                        href={route('admin.profile')}
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
                                route().current('admin.claims.*') || route().current('admin.hoteliers.*') || route().current('admin.subscriptions.*')
                                    ? 'bg-neutral-100 text-neutral-900'
                                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                            }`}
                            onClick={() => setShowMobileMenu(false)}
                        >
                            <span>Hoteliers</span>
                            {stats?.pending_claims > 0 && (
                                <span className="px-2 py-0.5 text-xs font-normal bg-neutral-900 text-white rounded-full">
                                    {stats.pending_claims}
                                </span>
                            )}
                        </Link>
                        <Link
                            href="/admin/users"
                            className={`block px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                                route().current('admin.users.*')
                                    ? 'bg-neutral-100 text-neutral-900'
                                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                            }`}
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Users
                        </Link>
                        <Link
                            href="/admin/content"
                            className={`block px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                                route().current('admin.content.*')
                                    ? 'bg-neutral-100 text-neutral-900'
                                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                            }`}
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Content
                        </Link>
                        <Link
                            href="/admin/scoring"
                            className={`block px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                                route().current('admin.scoring.*')
                                    ? 'bg-neutral-100 text-neutral-900'
                                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                            }`}
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Scoring
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
    );
}

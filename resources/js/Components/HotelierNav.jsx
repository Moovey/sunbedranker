import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function HotelierNav() {
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
        <nav className="bg-white border-b-2 border-orange-200 shadow-lg sticky top-0 z-50">
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
                            <span className="text-xs sm:text-sm font-bold text-gray-700 border-l-2 pl-2 sm:pl-3">Hotelier</span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-1">
                            <Link
                                href={route('hotelier.dashboard')}
                                className={`px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                                    route().current('hotelier.dashboard')
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-orange-50'
                                }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route('hotelier.claims.index')}
                                className={`px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                                    route().current('hotelier.claims.*')
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-orange-50'
                                }`}
                            >
                                My Claims
                            </Link>
                            <Link
                                href={route('hotelier.subscription')}
                                className={`px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                                    route().current('hotelier.subscription')
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-orange-50'
                                }`}
                            >
                                Subscription
                            </Link>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Back to Site - Hidden on small mobile */}
                        <Link
                            href="/"
                            className="hidden sm:block text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300 transform hover:scale-105"
                        >
                            ← Back to Site
                        </Link>

                        {/* User Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowUserDropdown(!showUserDropdown)}
                                className="flex items-center gap-2 px-2 sm:px-3 py-2 border-2 border-gray-300 rounded-lg hover:border-orange-300 hover:shadow-md transition-all duration-300"
                            >
                                {auth.user.profile_picture_url ? (
                                    <img 
                                        src={auth.user.profile_picture_url} 
                                        alt={auth.user.name}
                                        className="w-8 h-8 rounded-full object-cover shadow-md"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-md">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <span className="hidden sm:block text-sm font-bold text-gray-900 max-w-[100px] truncate">{auth.user.name}</span>
                                <svg className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {showUserDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl py-1 z-50 border-2 border-gray-100">
                                    <div className="px-4 py-2 border-b-2 border-gray-100">
                                        <p className="text-sm font-bold text-gray-900 truncate">{auth.user.name}</p>
                                        <p className="text-xs text-gray-600 font-semibold truncate">{auth.user.email}</p>
                                    </div>
                                    <Link
                                        href={route('hotelier.profile')}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 font-semibold transition-colors duration-300"
                                    >
                                        Profile Settings
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors duration-300"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-orange-50 transition-colors duration-300"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {showMobileMenu ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div className="md:hidden border-t-2 border-gray-200 py-4 space-y-2">
                        <Link
                            href={route('hotelier.dashboard')}
                            className={`block px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                                route().current('hotelier.dashboard')
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-orange-50'
                            }`}
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route('hotelier.claims.index')}
                            className={`block px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                                route().current('hotelier.claims.*')
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-orange-50'
                            }`}
                            onClick={() => setShowMobileMenu(false)}
                        >
                            My Claims
                        </Link>
                        <Link
                            href={route('hotelier.subscription')}
                            className={`block px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                                route().current('hotelier.subscription')
                                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-orange-50'
                            }`}
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Subscription
                        </Link>
                        <Link
                            href="/"
                            className="block sm:hidden px-3 py-2 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50 transition-all duration-300"
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

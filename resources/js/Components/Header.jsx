import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
    const { auth } = usePage().props;
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold">
                            <span className="text-red-500">sun</span>
                            <span className="text-orange-500">bed</span>
                            <span className="text-blue-500">ranker</span>
                        </span>
                    </Link>
                    
                    {/* Right Side Menu */}
                    <div className="flex items-center gap-3">
                        {/* Language/Currency */}
                        <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:border-gray-400 transition">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">EN · ₱</span>
                        </button>
                        
                        {/* User Profile or Sign In */}
                        {auth.user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:border-gray-400 transition"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium text-gray-700">{auth.user.name}</span>
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                        <div className="px-4 py-2 border-b border-gray-200">
                                            <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
                                            <p className="text-xs text-gray-500">{auth.user.email}</p>
                                            <p className="text-xs text-gray-500 mt-1 capitalize">Role: {auth.user.role}</p>
                                        </div>
                                        
                                        {auth.user.role === 'admin' && (
                                            <Link
                                                href="/admin"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        
                                        {auth.user.role === 'hotelier' && (
                                            <Link
                                                href="/hotelier"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Hotelier Dashboard
                                            </Link>
                                        )}
                                        
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
                        ) : (
                            <Link href="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:border-gray-400 transition">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Sign in</span>
                            </Link>
                        )}
                        
                        {/* Menu */}
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:border-gray-400 transition">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

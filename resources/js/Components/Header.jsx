import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
    const { auth } = usePage().props;
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setShowMobileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
                    {/* Logo - Responsive sizing */}
                    <Link href="/" className="flex items-center flex-shrink-0">
                        <img 
                            src="/images/logo.png" 
                            alt="Sunbed Ranker" 
                            className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-24 w-auto object-contain"
                        />
                    </Link>
                    
                    {/* Desktop Navigation - Hidden on mobile */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-3">
                        {/* Language/Currency - Hidden on smaller screens */}
                        <button className="hidden lg:flex items-center gap-2 px-3 lg:px-4 py-2 border border-neutral-200 rounded-lg hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-300">
                            <svg className="w-4 h-4 lg:w-5 lg:h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs lg:text-sm font-medium text-neutral-700">EN · ₱</span>
                        </button>
                        
                        {/* User Profile or Sign In */}
                        {auth.user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 px-3 lg:px-4 py-2 border border-neutral-200 rounded-lg hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-300"
                                >
                                    {auth.user.profile_picture_url ? (
                                        <img 
                                            src={auth.user.profile_picture_url} 
                                            alt={auth.user.name}
                                            className="w-7 h-7 lg:w-8 lg:h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center text-white font-medium text-sm">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span className="hidden lg:block text-xs lg:text-sm font-medium text-neutral-700 max-w-[120px] truncate">{auth.user.name}</span>
                                    <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-56 lg:w-64 bg-white rounded-lg shadow-xl py-1 z-50 border border-neutral-200">
                                        <div className="px-4 py-3 border-b border-neutral-200">
                                            <p className="text-sm font-medium text-neutral-900 truncate">{auth.user.name}</p>
                                            <p className="text-xs text-neutral-500 truncate">{auth.user.email}</p>
                                            <p className="text-xs text-neutral-500 mt-1.5 capitalize">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-neutral-800">
                                                    {auth.user.role}
                                                </span>
                                            </p>
                                        </div>
                                        
                                        {auth.user.role === 'admin' && (
                                            <Link
                                                href={route('admin.dashboard')}
                                                className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                    <span>Admin Dashboard</span>
                                                </div>
                                            </Link>
                                        )}
                                        
                                        {auth.user.role === 'hotelier' && (
                                            <Link
                                                href="/hotelier"
                                                className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span>Hotelier Dashboard</span>
                                                </div>
                                            </Link>
                                        )}
                                        
                                        <Link
                                            href={route('user.profile')}
                                            className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
                                        >
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>Profile Settings</span>
                                            </div>
                                        </Link>
                                        
                                        <div className="border-t border-neutral-200 mt-1 pt-1">
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    <span>Logout</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login" className="flex items-center gap-2 px-3 lg:px-4 py-2 border border-neutral-200 rounded-lg hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-300">
                                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-xs lg:text-sm font-medium text-neutral-700">Sign in</span>
                            </Link>
                        )}
                        
                        {/* Desktop Menu Button */}
                        <button className="flex items-center gap-2 px-3 lg:px-4 py-2 border border-neutral-200 rounded-lg hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-300">
                            <svg className="w-4 h-4 lg:w-5 lg:h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <span className="hidden lg:block text-xs lg:text-sm font-medium text-neutral-700">Menu</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button - Visible on mobile/tablet */}
                    <div className="flex md:hidden items-center gap-2" ref={mobileMenuRef}>
                        {auth.user && (
                            auth.user.profile_picture_url ? (
                                <img 
                                    src={auth.user.profile_picture_url} 
                                    alt={auth.user.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center text-white font-medium text-xs">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>
                            )
                        )}
                        <button 
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="flex items-center justify-center w-10 h-10 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all duration-300"
                        >
                            <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showMobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>

                        {/* Mobile Dropdown Menu */}
                        {showMobileMenu && (
                            <div className="absolute top-14 right-3 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50 border border-neutral-200">
                                {auth.user ? (
                                    <>
                                        <div className="px-4 py-3 border-b border-neutral-200">
                                            <p className="text-sm font-medium text-neutral-900 truncate">{auth.user.name}</p>
                                            <p className="text-xs text-neutral-500 truncate">{auth.user.email}</p>
                                            <p className="text-xs text-neutral-500 mt-1.5 capitalize">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-neutral-800">
                                                    {auth.user.role}
                                                </span>
                                            </p>
                                        </div>
                                        
                                        {auth.user.role === 'admin' && (
                                            <Link
                                                href={route('admin.dashboard')}
                                                className="block px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                    <span>Admin Dashboard</span>
                                                </div>
                                            </Link>
                                        )}
                                        
                                        {auth.user.role === 'hotelier' && (
                                            <Link
                                                href="/hotelier"
                                                className="block px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <span>Hotelier Dashboard</span>
                                                </div>
                                            </Link>
                                        )}
                                        
                                        <Link
                                            href={route('user.profile')}
                                            className="block px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>Profile Settings</span>
                                            </div>
                                        </Link>
                                        
                                        <div className="border-t border-neutral-200 mt-2 pt-2">
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    <span>Logout</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="block px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>Sign in / Register</span>
                                        </div>
                                    </Link>
                                )}
                                
                                <div className="border-t border-neutral-200 mt-2 pt-2">
                                    <button className="block w-full text-left px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Language & Currency</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

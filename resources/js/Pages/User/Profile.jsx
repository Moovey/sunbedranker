import { Head, useForm, usePage, Link, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '@/Components/Header';

export default function UserProfile({ reviews, savedHotels, isGoogleUser }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [activeTab, setActiveTab] = useState('profile');
    const [imagePreview, setImagePreview] = useState(user.profile_picture_url);
    const fileInputRef = useRef(null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Keep imagePreview in sync with user's profile picture when props change
    useEffect(() => {
        setImagePreview(user.profile_picture_url);
    }, [user.profile_picture_url]);

    const { data, setData, post, errors, processing, reset } = useForm({
        name: user.name,
        email: user.email,
        profile_picture: null,
    });

    const { data: passwordData, setData: setPasswordData, put: updatePassword, errors: passwordErrors, processing: passwordProcessing, reset: resetPassword } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error('Image size must be less than 2MB');
                return;
            }
            setData('profile_picture', file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        router.delete(route('user.profile.picture.remove'), {
            onSuccess: () => {
                setImagePreview(null);
                setData('profile_picture', null);
                toast.success('Profile picture removed!');
            },
            onError: () => toast.error('Failed to remove profile picture'),
        });
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        post(route('user.profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success('Profile updated successfully!');
                reset('profile_picture');
                // Update the image preview with the new URL from the response
                if (page.props.auth?.user?.profile_picture_url) {
                    setImagePreview(page.props.auth.user.profile_picture_url);
                }
            },
            onError: (errors) => {
                console.error('Profile update errors:', errors);
                toast.error('Failed to update profile');
            },
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        updatePassword(route('user.profile.password'), {
            onSuccess: () => {
                toast.success('Password updated successfully!');
                resetPassword();
            },
            onError: () => toast.error('Failed to update password'),
        });
    };

    return (
        <>
            <Head title="My Profile" />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <Header />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">My Profile</h1>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Manage your account and view your activity</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                        {/* Left Column - Profile Card */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* User Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="bg-orange-500 px-4 sm:px-6 py-6 sm:py-8 text-white text-center">
                                    <div className="relative inline-block group">
                                        {imagePreview ? (
                                            <img 
                                                src={imagePreview} 
                                                alt={user.name}
                                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white/30 mx-auto"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold border-4 border-white/30 mx-auto">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        >
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <h2 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">{user.name}</h2>
                                    <p className="text-orange-100 text-xs sm:text-sm truncate max-w-full px-2">{user.email}</p>
                                    <span className="inline-block mt-2 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white/20 rounded-full text-[10px] sm:text-xs font-medium">
                                        Traveller
                                    </span>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3">
                                <div className="bg-orange-50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                                    </svg>
                                    <div className="text-center sm:text-left">
                                        <div className="text-base sm:text-xl font-bold text-gray-900">{reviews?.length || 0}</div>
                                        <div className="text-[9px] sm:text-xs text-gray-500 font-medium">REVIEWS</div>
                                    </div>
                                </div>
                                <div className="bg-cyan-50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                    </svg>
                                    <div className="text-center sm:text-left">
                                        <div className="text-base sm:text-xl font-bold text-gray-900">{savedHotels?.length || 0}</div>
                                        <div className="text-[9px] sm:text-xs text-gray-500 font-medium">SAVED</div>
                                    </div>
                                </div>
                                <div className="bg-green-50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                                    </svg>
                                    <div className="text-center sm:text-left">
                                        <div className="text-base sm:text-xl font-bold text-gray-900">{new Date(user.created_at).getFullYear()}</div>
                                        <div className="text-[9px] sm:text-xs text-gray-500 font-medium">JOINED</div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">Quick Links</h3>
                                </div>
                                <div className="p-2 sm:p-3 space-y-0.5 sm:space-y-1">
                                    <Link
                                        href={route('home')}
                                        className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-all"
                                    >
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                                        </svg>
                                        <span className="font-medium text-gray-700 text-xs sm:text-sm">Home</span>
                                    </Link>
                                    <Link
                                        href={route('destinations.index')}
                                        className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-all"
                                    >
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                        </svg>
                                        <span className="font-medium text-gray-700 text-xs sm:text-sm">Destinations</span>
                                    </Link>
                                    <Link
                                        href={route('compare.index')}
                                        className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-all"
                                    >
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                        </svg>
                                        <span className="font-medium text-gray-700 text-xs sm:text-sm">Compare Hotels</span>
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="w-full flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                                    >
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                                        </svg>
                                        <span className="font-medium text-xs sm:text-sm">Log Out</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Forms */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                {/* Tab Navigation */}
                                <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide">
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className={`flex-1 min-w-[100px] px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 font-medium text-[11px] sm:text-xs md:text-sm transition-colors whitespace-nowrap ${
                                            activeTab === 'profile'
                                                ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        Profile Info
                                    </button>
                                    {!isGoogleUser && (
                                        <button
                                            onClick={() => setActiveTab('password')}
                                            className={`flex-1 min-w-[100px] px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 font-medium text-[11px] sm:text-xs md:text-sm transition-colors whitespace-nowrap ${
                                                activeTab === 'password'
                                                    ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                        >
                                            Password
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setActiveTab('reviews')}
                                        className={`flex-1 min-w-[100px] px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 font-medium text-[11px] sm:text-xs md:text-sm transition-colors whitespace-nowrap ${
                                            activeTab === 'reviews'
                                                ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        My Reviews
                                    </button>
                                </div>

                                {/* Tab Content */}
                                <div className="p-3 sm:p-4 md:p-6">
                                    {activeTab === 'profile' && (
                                        <form onSubmit={handleProfileSubmit} className="space-y-4 sm:space-y-5">
                                            {/* Profile Picture Upload */}
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Profile Picture</label>
                                                <div className="flex items-center gap-3 sm:gap-4">
                                                    <div className="relative flex-shrink-0">
                                                        {imagePreview ? (
                                                            <img 
                                                                src={imagePreview} 
                                                                alt="Profile preview"
                                                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-200"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-semibold text-gray-400 border border-gray-200">
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
                                                        <input
                                                            ref={fileInputRef}
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                                            onChange={handleImageChange}
                                                            className="hidden"
                                                        />
                                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => fileInputRef.current?.click()}
                                                                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-orange-50 text-orange-700 font-medium rounded-lg hover:bg-orange-100 transition-colors text-[11px] sm:text-sm"
                                                            >
                                                                Upload Photo
                                                            </button>
                                                            {(imagePreview || user.profile_picture_url) && (
                                                                <button
                                                                    type="button"
                                                                    onClick={handleRemoveImage}
                                                                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors text-[11px] sm:text-sm"
                                                                >
                                                                    Remove
                                                                </button>
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] sm:text-xs text-gray-500">JPG, PNG, GIF or WEBP. Max 2MB.</p>
                                                    </div>
                                                </div>
                                                {errors.profile_picture && <p className="mt-1 text-red-600 text-sm">{errors.profile_picture}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                                                />
                                                {errors.name && <p className="mt-1 text-red-600 text-xs sm:text-sm">{errors.name}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                                                />
                                                {errors.email && <p className="mt-1 text-red-600 text-xs sm:text-sm">{errors.email}</p>}
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Account Type</label>
                                                    <input
                                                        type="text"
                                                        value="Traveller"
                                                        disabled
                                                        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Member Since</label>
                                                    <input
                                                        type="text"
                                                        value={new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                        disabled
                                                        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-3 sm:pt-4 border-t border-gray-100">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 text-sm"
                                                >
                                                    {processing ? 'Saving...' : 'Update Profile'}
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {activeTab === 'password' && !isGoogleUser && (
                                        <form onSubmit={handlePasswordSubmit} className="space-y-4 sm:space-y-5">
                                            {/* Hidden username field for accessibility and password managers */}
                                            <input
                                                type="email"
                                                value={user.email}
                                                autoComplete="username"
                                                readOnly
                                                className="sr-only"
                                                tabIndex={-1}
                                                aria-hidden="true"
                                            />
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={showCurrentPassword ? "text" : "password"}
                                                        value={passwordData.current_password}
                                                        onChange={(e) => setPasswordData('current_password', e.target.value)}
                                                        autoComplete="current-password"
                                                        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                                    >
                                                        {showCurrentPassword ? (
                                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                                {passwordErrors.current_password && <p className="mt-1 text-red-600 text-xs sm:text-sm">{passwordErrors.current_password}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">New Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={showNewPassword ? "text" : "password"}
                                                        value={passwordData.password}
                                                        onChange={(e) => setPasswordData('password', e.target.value)}
                                                        autoComplete="new-password"
                                                        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                                    >
                                                        {showNewPassword ? (
                                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                                {passwordErrors.password && <p className="mt-1 text-red-600 text-xs sm:text-sm">{passwordErrors.password}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        value={passwordData.password_confirmation}
                                                        onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                                        autoComplete="new-password"
                                                        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="pt-3 sm:pt-4 border-t border-gray-100">
                                                <button
                                                    type="submit"
                                                    disabled={passwordProcessing}
                                                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 text-sm"
                                                >
                                                    {passwordProcessing ? 'Updating...' : 'Update Password'}
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {activeTab === 'reviews' && (
                                        <div>
                                            {reviews && reviews.length > 0 ? (
                                                <div className="space-y-2 sm:space-y-3">
                                                    {reviews.map((review) => (
                                                        <div key={review.id} className="p-2.5 sm:p-3 rounded-lg border border-gray-100 hover:border-orange-200 transition-all">
                                                            <div className="flex items-start justify-between gap-2 sm:gap-4">
                                                                <div className="flex-1 min-w-0">
                                                                    <Link 
                                                                        href={route('hotels.show', review.hotel?.slug)}
                                                                        className="font-medium text-gray-900 hover:text-orange-600 transition-colors text-xs sm:text-sm line-clamp-1"
                                                                    >
                                                                        {review.hotel?.name}
                                                                    </Link>
                                                                    <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                                                                        <div className="flex">
                                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                                <svg
                                                                                    key={star}
                                                                                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${star <= review.rating ? 'text-orange-500' : 'text-gray-300'}`}
                                                                                    fill="currentColor"
                                                                                    viewBox="0 0 24 24"
                                                                                >
                                                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                                                </svg>
                                                                            ))}
                                                                        </div>
                                                                        <span className="text-[10px] sm:text-xs text-gray-500">
                                                                            {new Date(review.created_at).toLocaleDateString()}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-gray-600 mt-1.5 sm:mt-2 text-[11px] sm:text-xs line-clamp-2">{review.comment}</p>
                                                                </div>
                                                                <span className={`flex-shrink-0 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium ${
                                                                    review.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                                    review.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                                    'bg-red-100 text-red-700'
                                                                }`}>
                                                                    {review.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-6 sm:py-8">
                                                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                    </svg>
                                                    <p className="text-gray-500 text-xs sm:text-sm">You haven't written any reviews yet</p>
                                                    <Link
                                                        href={route('destinations.index')}
                                                        className="inline-block mt-1.5 sm:mt-2 text-orange-600 font-medium text-xs sm:text-sm hover:text-orange-700"
                                                    >
                                                        Explore hotels to review →
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

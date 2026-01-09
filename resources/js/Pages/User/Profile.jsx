import { Head, useForm, usePage, Link, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '@/Components/Header';

export default function UserProfile({ reviews, savedHotels }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [activeTab, setActiveTab] = useState('profile');
    const [imagePreview, setImagePreview] = useState(user.profile_picture_url);
    const fileInputRef = useRef(null);

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
            
            <div className="min-h-screen bg-white font-sans">
                <Header />

                {/* Page Header */}
                <div className="bg-gradient-to-r from-orange-50 to-blue-50 shadow-lg border-b-2 border-orange-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
                        <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                            <div className="h-1 w-8 sm:w-10 md:w-12 bg-orange-300 rounded-full"></div>
                            <svg className="mx-3 sm:mx-4 text-orange-500" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                            </svg>
                            <div className="h-1 w-8 sm:w-10 md:w-12 bg-blue-300 rounded-full"></div>
                        </div>
                        <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 text-center">My Profile</h1>
                        <p className="text-center text-gray-600 mt-2 font-semibold">Manage your account and view your activity</p>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Profile Card */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
                                {/* Profile Header */}
                                <div className="bg-gradient-to-r from-orange-500 to-blue-500 px-6 py-8 text-white">
                                    <div className="flex items-center gap-6">
                                        <div className="relative group">
                                            {imagePreview ? (
                                                <img 
                                                    src={imagePreview} 
                                                    alt={user.name}
                                                    className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-black border-4 border-white/30">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                            >
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">{user.name}</h2>
                                            <p className="text-white/80">{user.email}</p>
                                            <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm font-bold">
                                                Member
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Row */}
                                <div className="grid grid-cols-3 border-b-2 border-gray-100">
                                    <div className="p-4 text-center border-r border-gray-100">
                                        <div className="text-2xl font-black text-orange-600">{reviews?.length || 0}</div>
                                        <div className="text-sm text-gray-600 font-semibold">Reviews</div>
                                    </div>
                                    <div className="p-4 text-center border-r border-gray-100">
                                        <div className="text-2xl font-black text-blue-600">{savedHotels?.length || 0}</div>
                                        <div className="text-sm text-gray-600 font-semibold">Saved Hotels</div>
                                    </div>
                                    <div className="p-4 text-center">
                                        <div className="text-2xl font-black text-green-600">
                                            {new Date(user.created_at).getFullYear()}
                                        </div>
                                        <div className="text-sm text-gray-600 font-semibold">Joined</div>
                                    </div>
                                </div>

                                {/* Tab Navigation */}
                                <div className="flex border-b-2 border-gray-100">
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className={`flex-1 px-6 py-4 font-bold text-sm transition-all ${
                                            activeTab === 'profile'
                                                ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        Profile Info
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('password')}
                                        className={`flex-1 px-6 py-4 font-bold text-sm transition-all ${
                                            activeTab === 'password'
                                                ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        Password
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('reviews')}
                                        className={`flex-1 px-6 py-4 font-bold text-sm transition-all ${
                                            activeTab === 'reviews'
                                                ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        My Reviews
                                    </button>
                                </div>

                                {/* Tab Content */}
                                <div className="p-6 sm:p-8">
                                    {activeTab === 'profile' && (
                                        <form onSubmit={handleProfileSubmit} className="space-y-6">
                                            {/* Profile Picture Upload */}
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Profile Picture</label>
                                                <div className="flex items-center gap-6">
                                                    <div className="relative">
                                                        {imagePreview ? (
                                                            <img 
                                                                src={imagePreview} 
                                                                alt="Profile preview"
                                                                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                                                            />
                                                        ) : (
                                                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl font-black text-gray-400 border-4 border-gray-200">
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <input
                                                            ref={fileInputRef}
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                                            onChange={handleImageChange}
                                                            className="hidden"
                                                        />
                                                        <div className="flex flex-wrap gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => fileInputRef.current?.click()}
                                                                className="px-4 py-2 bg-orange-100 text-orange-700 font-bold rounded-lg hover:bg-orange-200 transition-colors"
                                                            >
                                                                Upload New Photo
                                                            </button>
                                                            {(imagePreview || user.profile_picture_url) && (
                                                                <button
                                                                    type="button"
                                                                    onClick={handleRemoveImage}
                                                                    className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200 transition-colors"
                                                                >
                                                                    Remove
                                                                </button>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500">JPG, PNG, GIF or WEBP. Max 2MB.</p>
                                                    </div>
                                                </div>
                                                {errors.profile_picture && <p className="mt-2 text-red-600 text-sm">{errors.profile_picture}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-semibold"
                                                />
                                                {errors.name && <p className="mt-2 text-red-600 text-sm">{errors.name}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-semibold"
                                                />
                                                {errors.email && <p className="mt-2 text-red-600 text-sm">{errors.email}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Member Since</label>
                                                <input
                                                    type="text"
                                                    value={new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    disabled
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 font-semibold"
                                                />
                                            </div>

                                            <div className="pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50"
                                                >
                                                    {processing ? 'Saving...' : 'Update Profile'}
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {activeTab === 'password' && (
                                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
                                                <input
                                                    type="password"
                                                    value={passwordData.current_password}
                                                    onChange={(e) => setPasswordData('current_password', e.target.value)}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-semibold"
                                                />
                                                {passwordErrors.current_password && <p className="mt-2 text-red-600 text-sm">{passwordErrors.current_password}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                                                <input
                                                    type="password"
                                                    value={passwordData.password}
                                                    onChange={(e) => setPasswordData('password', e.target.value)}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-semibold"
                                                />
                                                {passwordErrors.password && <p className="mt-2 text-red-600 text-sm">{passwordErrors.password}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    value={passwordData.password_confirmation}
                                                    onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-semibold"
                                                />
                                            </div>

                                            <div className="pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={passwordProcessing}
                                                    className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50"
                                                >
                                                    {passwordProcessing ? 'Updating...' : 'Update Password'}
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {activeTab === 'reviews' && (
                                        <div>
                                            {reviews && reviews.length > 0 ? (
                                                <div className="space-y-4">
                                                    {reviews.map((review) => (
                                                        <div key={review.id} className="p-4 rounded-xl border-2 border-gray-100 hover:border-orange-200 transition-all">
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <Link 
                                                                        href={route('hotels.show', review.hotel?.slug)}
                                                                        className="font-bold text-gray-900 hover:text-orange-600 transition-colors"
                                                                    >
                                                                        {review.hotel?.name}
                                                                    </Link>
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <div className="flex">
                                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                                <svg
                                                                                    key={star}
                                                                                    className={`w-4 h-4 ${star <= review.rating ? 'text-orange-500' : 'text-gray-300'}`}
                                                                                    fill="currentColor"
                                                                                    viewBox="0 0 24 24"
                                                                                >
                                                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                                                </svg>
                                                                            ))}
                                                                        </div>
                                                                        <span className="text-sm text-gray-500">
                                                                            {new Date(review.created_at).toLocaleDateString()}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-gray-600 mt-2 text-sm">{review.comment}</p>
                                                                </div>
                                                                <span className={`px-2 py-1 rounded text-xs font-bold ${
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
                                                <div className="text-center py-12">
                                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                    </svg>
                                                    <p className="text-gray-500 font-semibold">You haven't written any reviews yet</p>
                                                    <Link
                                                        href={route('destinations.index')}
                                                        className="inline-block mt-4 text-orange-600 font-bold hover:text-orange-700"
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

                        {/* Right Column - Quick Links & Info */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Quick Links */}
                            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-orange-50 to-blue-50 px-6 py-4 border-b-2 border-gray-100">
                                    <h3 className="font-bold text-gray-900 text-lg">Quick Links</h3>
                                </div>
                                <div className="p-4 space-y-2">
                                    <Link
                                        href={route('home')}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 transition-all"
                                    >
                                        <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                                        </svg>
                                        <span className="font-semibold text-gray-700">Home</span>
                                    </Link>
                                    <Link
                                        href={route('destinations.index')}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-all"
                                    >
                                        <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                        </svg>
                                        <span className="font-semibold text-gray-700">Destinations</span>
                                    </Link>
                                    <Link
                                        href={route('compare.index')}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-all"
                                    >
                                        <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                        </svg>
                                        <span className="font-semibold text-gray-700">Compare Hotels</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-gradient-to-br from-orange-500 to-blue-500 rounded-2xl shadow-xl p-6 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                                    </svg>
                                    <h3 className="font-bold text-lg">Sunbed Ranker Tips</h3>
                                </div>
                                <p className="text-white/90 text-sm leading-relaxed">
                                    Share your pool experiences by writing reviews! Your insights help fellow travelers find the perfect sunbed spot.
                                </p>
                            </div>

                            {/* Account Actions */}
                            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-orange-50 to-blue-50 px-6 py-4 border-b-2 border-gray-100">
                                    <h3 className="font-bold text-gray-900 text-lg">Account</h3>
                                </div>
                                <div className="p-4">
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                                        </svg>
                                        <span className="font-semibold">Log Out</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '@/Components/AdminNav';

export default function AdminProfile({ stats }) {
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
        router.delete(route('admin.profile.picture.remove'), {
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
        post(route('admin.profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success('Profile updated successfully!');
                reset('profile_picture');
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
        updatePassword(route('admin.profile.password'), {
            onSuccess: () => {
                toast.success('Password updated successfully!');
                resetPassword();
            },
            onError: () => toast.error('Failed to update password'),
        });
    };

    return (
        <>
            <Head title="Admin Profile" />
            
            <div className="min-h-screen bg-white font-sans">
                <AdminNav stats={stats} />

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
                        <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 text-center">Admin Profile</h1>
                        <p className="text-center text-gray-600 mt-2 font-semibold">Manage your administrator account</p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
                        {/* Profile Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
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
                                    <p className="text-orange-100">{user.email}</p>
                                    <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm font-bold">
                                        Administrator
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 border-b-2 border-gray-100">
                            <div className="p-4 text-center border-r border-gray-100">
                                <div className="text-2xl font-black text-orange-600">{stats?.total_hotels || 0}</div>
                                <div className="text-sm text-gray-600 font-semibold">Hotels</div>
                            </div>
                            <div className="p-4 text-center border-r border-gray-100">
                                <div className="text-2xl font-black text-blue-600">{stats?.total_users || 0}</div>
                                <div className="text-sm text-gray-600 font-semibold">Users</div>
                            </div>
                            <div className="p-4 text-center">
                                <div className="text-2xl font-black text-green-600">{stats?.pending_claims || 0}</div>
                                <div className="text-sm text-gray-600 font-semibold">Pending Claims</div>
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
                                Profile Information
                            </button>
                            <button
                                onClick={() => setActiveTab('password')}
                                className={`flex-1 px-6 py-4 font-bold text-sm transition-all ${
                                    activeTab === 'password'
                                        ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                Change Password
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
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
                                        <input
                                            type="text"
                                            value="Administrator"
                                            disabled
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 font-semibold"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Account Created</label>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

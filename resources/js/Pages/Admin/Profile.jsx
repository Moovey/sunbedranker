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
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav stats={stats} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
                            <p className="text-sm text-gray-500">Manage your administrator account</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Profile Card */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* User Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="bg-orange-500 px-6 py-8 text-white text-center">
                                    <div className="relative inline-block group">
                                        {imagePreview ? (
                                            <img 
                                                src={imagePreview} 
                                                alt={user.name}
                                                className="w-20 h-20 rounded-full object-cover border-4 border-white/30 mx-auto"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white/30 mx-auto">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        >
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
                                    <p className="text-orange-100 text-sm">{user.email}</p>
                                    <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                                        Administrator
                                    </span>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="bg-orange-50 rounded-xl p-4 flex items-center gap-3">
                                <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                                </svg>
                                <div>
                                    <div className="text-xl font-bold text-gray-900">{stats?.total_hotels || 0}</div>
                                    <div className="text-xs text-gray-500 font-medium">HOTELS</div>
                                </div>
                            </div>
                            <div className="bg-cyan-50 rounded-xl p-4 flex items-center gap-3">
                                <svg className="w-5 h-5 text-cyan-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                </svg>
                                <div>
                                    <div className="text-xl font-bold text-gray-900">{stats?.total_users || 0}</div>
                                    <div className="text-xs text-gray-500 font-medium">USERS</div>
                                </div>
                            </div>
                            <div className="bg-yellow-50 rounded-xl p-4 flex items-center gap-3">
                                <svg className="w-5 h-5 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                </svg>
                                <div>
                                    <div className="text-xl font-bold text-gray-900">{stats?.pending_claims || 0}</div>
                                    <div className="text-xs text-gray-500 font-medium">PENDING CLAIMS</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Forms */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                {/* Tab Navigation */}
                                <div className="flex border-b border-gray-100">
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className={`flex-1 px-6 py-3 font-medium text-sm transition-colors ${
                                            activeTab === 'profile'
                                                ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        Profile Information
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('password')}
                                        className={`flex-1 px-6 py-3 font-medium text-sm transition-colors ${
                                            activeTab === 'password'
                                                ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        Change Password
                                    </button>
                                </div>

                                {/* Tab Content */}
                                <div className="p-6">
                                    {activeTab === 'profile' && (
                                        <form onSubmit={handleProfileSubmit} className="space-y-5">
                                            {/* Profile Picture Upload */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        {imagePreview ? (
                                                            <img 
                                                                src={imagePreview} 
                                                                alt="Profile preview"
                                                                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                                                            />
                                                        ) : (
                                                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl font-semibold text-gray-400 border border-gray-200">
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
                                                                className="px-3 py-1.5 bg-orange-50 text-orange-700 font-medium rounded-lg hover:bg-orange-100 transition-colors text-sm"
                                                            >
                                                                Upload New Photo
                                                            </button>
                                                            {(imagePreview || user.profile_picture_url) && (
                                                                <button
                                                                    type="button"
                                                                    onClick={handleRemoveImage}
                                                                    className="px-3 py-1.5 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors text-sm"
                                                                >
                                                                    Remove
                                                                </button>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500">JPG, PNG, GIF or WEBP. Max 2MB.</p>
                                                    </div>
                                                </div>
                                                {errors.profile_picture && <p className="mt-1 text-red-600 text-sm">{errors.profile_picture}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                                                />
                                                {errors.name && <p className="mt-1 text-red-600 text-sm">{errors.name}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                                                />
                                                {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email}</p>}
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                                    <input
                                                        type="text"
                                                        value="Administrator"
                                                        disabled
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Created</label>
                                                    <input
                                                        type="text"
                                                        value={new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                        disabled
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-gray-100">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                                                >
                                                    {processing ? 'Saving...' : 'Update Profile'}
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {activeTab === 'password' && (
                                        <form onSubmit={handlePasswordSubmit} className="space-y-5">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                                <input
                                                    type="password"
                                                    value={passwordData.current_password}
                                                    onChange={(e) => setPasswordData('current_password', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                                                />
                                                {passwordErrors.current_password && <p className="mt-1 text-red-600 text-sm">{passwordErrors.current_password}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                                <input
                                                    type="password"
                                                    value={passwordData.password}
                                                    onChange={(e) => setPasswordData('password', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                                                />
                                                {passwordErrors.password && <p className="mt-1 text-red-600 text-sm">{passwordErrors.password}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    value={passwordData.password_confirmation}
                                                    onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                                                />
                                            </div>

                                            <div className="pt-4 border-t border-gray-100">
                                                <button
                                                    type="submit"
                                                    disabled={passwordProcessing}
                                                    className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
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
                </div>
            </div>
        </>
    );
}

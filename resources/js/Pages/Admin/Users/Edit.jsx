import { Link, Head, useForm } from '@inertiajs/react';
import AdminNav from '@/Components/AdminNav';
import { toast } from 'react-toastify';

export default function UsersEdit({ stats, user }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/admin/users/${user.id}`, {
            onSuccess: () => {
                toast.success(`User "${data.name}" has been updated successfully!`);
            },
            onError: () => {
                toast.error('Failed to update user. Please check the form and try again.');
            },
        });
    };

    const getRoleBadge = (role) => {
        const badges = {
            admin: 'bg-red-50 text-red-700',
            hotelier: 'bg-orange-50 text-orange-700',
            user: 'bg-gray-50 text-gray-700'
        };
        return badges[role] || badges.user;
    };

    return (
        <>
            <Head title={`Edit User: ${user.name} - Admin`} />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav stats={stats} />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Link
                                href="/admin/users"
                                className="p-1.5 sm:p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex-shrink-0"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <div className="min-w-0">
                                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Edit User</h1>
                                <p className="text-xs sm:text-sm text-gray-500 truncate">Update user information and permissions</p>
                            </div>
                        </div>
                        <span className={`self-start sm:self-auto ml-8 sm:ml-0 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getRoleBadge(user.role)}`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                                    required
                                />
                                {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email}</p>}
                            </div>

                            {/* Role */}
                            <div>
                                <label htmlFor="role" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    User Role
                                </label>
                                <select
                                    id="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                                    required
                                >
                                    <option value="user">User</option>
                                    <option value="hotelier">Hotelier</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors.role && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.role}</p>}
                                <p className="mt-2 text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                                    <span className="block sm:inline"><strong>User:</strong> Regular user with basic access.</span>
                                    <span className="block sm:inline sm:ml-2"><strong>Hotelier:</strong> Can claim and manage hotels.</span>
                                    <span className="block sm:inline sm:ml-2"><strong>Admin:</strong> Full system access.</span>
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-100">
                                <Link
                                    href="/admin/users"
                                    className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-xs sm:text-sm transition-colors text-center"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium text-xs sm:text-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* User Info Card */}
                    <div className="mt-4 sm:mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">User Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                            <div>
                                <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">User ID</p>
                                <p className="text-sm sm:text-base text-gray-900 mt-0.5 sm:mt-1">{user.id}</p>
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">Account Created</p>
                                <p className="text-sm sm:text-base text-gray-900 mt-0.5 sm:mt-1">{new Date(user.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}</p>
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">Last Updated</p>
                                <p className="text-sm sm:text-base text-gray-900 mt-0.5 sm:mt-1">{new Date(user.updated_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

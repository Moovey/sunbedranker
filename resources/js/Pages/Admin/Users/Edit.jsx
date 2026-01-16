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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/admin/users"
                                className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
                                <p className="text-sm text-gray-500">Update user information and permissions</p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadge(user.role)}`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                                    required
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            {/* Role */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                    User Role
                                </label>
                                <select
                                    id="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                                    required
                                >
                                    <option value="user">User</option>
                                    <option value="hotelier">Hotelier</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                                <p className="mt-2 text-xs text-gray-500">
                                    <strong>User:</strong> Regular user with basic access. 
                                    <strong className="ml-2">Hotelier:</strong> Can claim and manage hotels. 
                                    <strong className="ml-2">Admin:</strong> Full system access.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <Link
                                    href="/admin/users"
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* User Info Card */}
                    <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">User Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">User ID</p>
                                <p className="text-gray-900 mt-1">{user.id}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Account Created</p>
                                <p className="text-gray-900 mt-1">{new Date(user.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Last Updated</p>
                                <p className="text-gray-900 mt-1">{new Date(user.updated_at).toLocaleDateString('en-US', {
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

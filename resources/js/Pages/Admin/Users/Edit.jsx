import { Link, Head, useForm } from '@inertiajs/react';
import AdminNav from '@/Components/AdminNav';
import { toast } from 'react-toastify';

export default function UsersEdit({ stats, user }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
        password: '',
        password_confirmation: '',
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

    return (
        <>
            <Head title={`Edit User: ${user.name} - Admin`} />
            
            <div className="min-h-screen bg-white font-sans">
                <AdminNav stats={stats} />

                {/* Page Header */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg border-b-2 border-purple-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <Link
                                    href="/admin/users"
                                    className="text-purple-600 hover:text-purple-700 font-semibold text-sm mb-2 inline-flex items-center gap-1 transition-colors duration-300"
                                >
                                    ← Back to Users
                                </Link>
                                <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
                                    Edit User
                                </h1>
                                <p className="text-gray-600 mt-1 text-sm sm:text-base font-light">
                                    Update user information and permissions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
                    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border-2 border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
                                    required
                                />
                                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
                                    required
                                />
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            {/* Role */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                                    User Role
                                </label>
                                <select
                                    id="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
                                    required
                                >
                                    <option value="user">User</option>
                                    <option value="hotelier">Hotelier</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors.role && <p className="mt-2 text-sm text-red-600">{errors.role}</p>}
                                <p className="mt-2 text-sm text-gray-500">
                                    <strong>User:</strong> Regular user with basic access. 
                                    <strong className="ml-2">Hotelier:</strong> Can claim and manage hotels. 
                                    <strong className="ml-2">Admin:</strong> Full system access.
                                </p>
                            </div>

                            {/* Password */}
                            <div className="pt-4 border-t-2 border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password (Optional)</h3>
                                <p className="text-sm text-gray-600 mb-4">Leave blank to keep the current password</p>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                            New Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
                                            autoComplete="new-password"
                                        />
                                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="password_confirmation" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Confirm New Password
                                        </label>
                                        <input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
                                            autoComplete="new-password"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-6 border-t-2 border-gray-200">
                                <Link
                                    href="/admin/users"
                                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-all duration-300"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* User Info Card */}
                    <div className="mt-6 bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">User Information</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>User ID:</strong> {user.id}</p>
                            <p><strong>Account Created:</strong> {new Date(user.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>
                            <p><strong>Last Updated:</strong> {new Date(user.updated_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

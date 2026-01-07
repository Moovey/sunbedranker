import { Link, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminNav from '@/Components/AdminNav';
import { toast } from 'react-toastify';

export default function UsersIndex({ stats, users }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    const filteredUsers = users.data.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const getRoleBadge = (role) => {
        const badges = {
            admin: 'bg-red-100 text-red-700 border-red-300',
            hotelier: 'bg-purple-100 text-purple-700 border-purple-300',
            user: 'bg-gray-100 text-gray-700 border-gray-300'
        };
        return badges[role] || badges.user;
    };

    const handleDeleteUser = (userId, userName) => {
        if (confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
            router.delete(`/admin/users/${userId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`User "${userName}" has been deleted successfully!`);
                },
                onError: () => {
                    toast.error('Failed to delete user. Please try again.');
                },
            });
        }
    };

    return (
        <>
            <Head title="Users Management - Admin" />
            
            <div className="min-h-screen bg-white font-sans">
                <AdminNav stats={stats} />

                {/* Page Header */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg border-b-2 border-purple-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
                        {/* Decorative accent */}
                        <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                            <div className="h-0.5 w-8 sm:w-10 md:w-12 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                            <svg className="mx-3 sm:mx-4 text-purple-500" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                            </svg>
                            <div className="h-0.5 w-8 sm:w-10 md:w-12 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">Users Management</h1>
                                <p className="text-gray-700 mt-2 font-semibold">Manage all registered users</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-6 sm:p-8 border-2 border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Users</p>
                                    <p className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">{stats.total_users}</p>
                                </div>
                                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center shadow-md">
                                    <svg className="w-7 h-7 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-6 sm:p-8 border-2 border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Hoteliers</p>
                                    <p className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">{stats.hoteliers}</p>
                                </div>
                                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center shadow-md">
                                    <svg className="w-7 h-7 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-6 sm:p-8 border-2 border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Admins</p>
                                    <p className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">{stats.admins || 0}</p>
                                </div>
                                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center shadow-md">
                                    <svg className="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-10 border-2 border-gray-100">
                        <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Filter Users</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Role
                                </label>
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="hotelier">Hotelier</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <div className="flex items-end">
                                <button
                                    type="button"
                                    onClick={() => { setSearchTerm(''); setRoleFilter('all'); }}
                                    className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-bold transition-all duration-300 transform hover:scale-105"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden border-2 border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Joined</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-purple-50 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-black shadow-md">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-bold text-gray-900">{user.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 font-semibold">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getRoleBadge(user.role)}`}>
                                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 font-semibold">
                                                        {new Date(user.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex items-center gap-3">
                                                        <Link
                                                            href={`/admin/users/${user.id}/edit`}
                                                            className="text-blue-600 hover:text-blue-700 font-bold transition-all duration-300 transform hover:scale-105"
                                                        >
                                                            Edit
                                                        </Link>
                                                        {user.role !== 'admin' && (
                                                            <button
                                                                onClick={() => handleDeleteUser(user.id, user.name)}
                                                                className="text-red-600 hover:text-red-700 font-bold transition-all duration-300 transform hover:scale-105"
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center">
                                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                                </svg>
                                                <p className="text-lg font-bold text-gray-500">No users found</p>
                                                <p className="text-sm mt-1 text-gray-400 font-semibold">Try adjusting your search or filters</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {users.links && (
                            <div className="bg-white px-4 py-3 border-t-2 border-gray-200 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700 font-semibold">
                                        Showing <span className="font-bold text-purple-600">{users.from}</span> to{' '}
                                        <span className="font-bold text-purple-600">{users.to}</span> of{' '}
                                        <span className="font-bold text-purple-600">{users.total}</span> results
                                    </div>
                                    <div className="flex gap-2">
                                        {users.links.map((link, index) => (
                                            link.url ? (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-1 border-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                                                        link.active
                                                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-600 shadow-lg'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50 hover:border-purple-300'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 border-2 rounded-lg bg-gray-100 text-gray-400 border-gray-200 font-semibold"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

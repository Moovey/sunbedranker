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
            admin: 'bg-red-50 text-red-700',
            hotelier: 'bg-orange-50 text-orange-700',
            user: 'bg-gray-50 text-gray-700'
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
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav stats={stats} />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div>
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Users Management</h1>
                            <p className="text-xs sm:text-sm text-gray-500">Manage all registered users</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                        <div className="bg-cyan-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 flex items-center gap-2 sm:gap-3">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                            </svg>
                            <div className="min-w-0">
                                <div className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{stats.total_users}</div>
                                <div className="text-[10px] sm:text-xs text-gray-500 font-medium truncate">TOTAL USERS</div>
                            </div>
                        </div>
                        <div className="bg-orange-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 flex items-center gap-2 sm:gap-3">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                            <div className="min-w-0">
                                <div className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{stats.hoteliers}</div>
                                <div className="text-[10px] sm:text-xs text-gray-500 font-medium truncate">HOTELIERS</div>
                            </div>
                        </div>
                        <div className="bg-red-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 flex items-center gap-2 sm:gap-3">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <div className="min-w-0">
                                <div className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{stats.admins || 0}</div>
                                <div className="text-[10px] sm:text-xs text-gray-500 font-medium truncate">ADMINS</div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 mb-4 sm:mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Role
                                </label>
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="hotelier">Hotelier</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <div className="flex items-end sm:col-span-2 md:col-span-1">
                                <button
                                    type="button"
                                    onClick={() => { setSearchTerm(''); setRoleFilter('all'); }}
                                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-xs sm:text-sm transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Users Table - Desktop */}
                    <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white font-semibold text-sm lg:text-base flex-shrink-0">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="ml-2 lg:ml-3 min-w-0">
                                                            <div className="text-sm font-medium text-gray-900 truncate max-w-[120px] lg:max-w-[180px]">{user.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 truncate max-w-[150px] lg:max-w-[200px]">{user.email}</div>
                                                </td>
                                                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(user.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm">
                                                    <div className="flex items-center gap-2 lg:gap-3">
                                                        <Link
                                                            href={`/admin/users/${user.id}/edit`}
                                                            className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
                                                        >
                                                            Edit
                                                        </Link>
                                                        {user.role !== 'admin' && (
                                                            <button
                                                                onClick={() => handleDeleteUser(user.id, user.name)}
                                                                className="text-red-600 hover:text-red-700 font-medium transition-colors"
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
                                                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                                </svg>
                                                <p className="text-sm font-medium text-gray-500">No users found</p>
                                                <p className="text-xs mt-1 text-gray-400">Try adjusting your search or filters</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Desktop Pagination */}
                        {users.links && (
                            <div className="bg-white px-4 py-3 border-t border-gray-100 lg:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        Showing <span className="font-medium text-gray-900">{users.from}</span> to{' '}
                                        <span className="font-medium text-gray-900">{users.to}</span> of{' '}
                                        <span className="font-medium text-gray-900">{users.total}</span> results
                                    </div>
                                    <div className="flex gap-1">
                                        {users.links.map((link, index) => (
                                            link.url ? (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                                        link.active
                                                            ? 'bg-orange-500 text-white'
                                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 rounded-lg text-sm bg-gray-50 text-gray-400"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Users Cards - Mobile/Tablet */}
                    <div className="md:hidden space-y-3">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base flex-shrink-0">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{user.name}</h3>
                                                    <p className="text-xs sm:text-sm text-gray-500 truncate">{user.email}</p>
                                                </div>
                                                <span className={`px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium flex-shrink-0 ${getRoleBadge(user.role)}`}>
                                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                </span>
                                            </div>
                                            <div className="mt-2 sm:mt-3 flex items-center justify-between">
                                                <span className="text-[10px] sm:text-xs text-gray-400">
                                                    Joined {new Date(user.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                                <div className="flex items-center gap-3">
                                                    <Link
                                                        href={`/admin/users/${user.id}/edit`}
                                                        className="text-orange-600 hover:text-orange-700 font-medium text-xs sm:text-sm transition-colors"
                                                    >
                                                        Edit
                                                    </Link>
                                                    {user.role !== 'admin' && (
                                                        <button
                                                            onClick={() => handleDeleteUser(user.id, user.name)}
                                                            className="text-red-600 hover:text-red-700 font-medium text-xs sm:text-sm transition-colors"
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                </svg>
                                <p className="text-sm font-medium text-gray-500">No users found</p>
                                <p className="text-xs mt-1 text-gray-400">Try adjusting your search or filters</p>
                            </div>
                        )}

                        {/* Mobile Pagination */}
                        {users.links && filteredUsers.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
                                <div className="flex flex-col gap-3">
                                    <div className="text-xs sm:text-sm text-gray-500 text-center">
                                        Showing <span className="font-medium text-gray-900">{users.from}</span> to{' '}
                                        <span className="font-medium text-gray-900">{users.to}</span> of{' '}
                                        <span className="font-medium text-gray-900">{users.total}</span>
                                    </div>
                                    <div className="flex justify-center gap-1 flex-wrap">
                                        {users.links.map((link, index) => (
                                            link.url ? (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                                                        link.active
                                                            ? 'bg-orange-500 text-white'
                                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    key={index}
                                                    className="px-2.5 sm:px-3 py-1 rounded-lg text-xs sm:text-sm bg-gray-50 text-gray-400"
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

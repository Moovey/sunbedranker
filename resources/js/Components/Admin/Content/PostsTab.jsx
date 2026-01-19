import React from 'react';
import { Link } from '@inertiajs/react';
import { StatusBadge, Pagination, EmptyState, Icons } from '@/Components/Admin';

export default function PostsTab({ posts, onDelete, onToggleStatus }) {
    const getStatusColor = (status) => {
        const colors = {
            published: 'green',
            draft: 'yellow',
            scheduled: 'blue',
        };
        return colors[status] || 'gray';
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (posts.data.length === 0) {
        return (
            <EmptyState
                icon={<Icons.Document className="w-12 h-12" />}
                title="No posts found"
                description="Create your first post to start building your content library"
            />
        );
    }

    return (
        <div className="space-y-4">
            {/* Posts Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Post
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Author
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Views
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {posts.data.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        {post.featured_image ? (
                                            <img
                                                src={post.featured_image_url}
                                                alt={post.title}
                                                className="w-12 h-12 rounded-lg object-cover mr-3"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center mr-3">
                                                <Icons.Document className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                                {post.title}
                                            </div>
                                            <div className="text-xs text-gray-500 line-clamp-1">
                                                /{post.slug}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {post.category ? (
                                        <span
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                            style={{
                                                backgroundColor: `${post.category.color}20`,
                                                color: post.category.color,
                                            }}
                                        >
                                            {post.category.name}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 text-sm">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status={post.status} color={getStatusColor(post.status)} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {post.author?.name || 'Unknown'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Icons.Eye className="w-4 h-4 mr-1" />
                                        {(post.views_count || 0).toLocaleString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(post.published_at || post.created_at)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onToggleStatus(post)}
                                            className={`p-1.5 rounded-lg transition-colors ${
                                                post.status === 'published'
                                                    ? 'text-yellow-600 hover:bg-yellow-50'
                                                    : 'text-green-600 hover:bg-green-50'
                                            }`}
                                            title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                                        >
                                            {post.status === 'published' ? (
                                                <Icons.Pending className="w-5 h-5" />
                                            ) : (
                                                <Icons.Check className="w-5 h-5" />
                                            )}
                                        </button>
                                        <Link
                                            href={route('admin.content.posts.edit', post.id)}
                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Icons.Edit className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => onDelete(post)}
                                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Icons.Trash className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {posts.last_page > 1 && (
                <Pagination
                    currentPage={posts.current_page}
                    lastPage={posts.last_page}
                    from={posts.from}
                    to={posts.to}
                    total={posts.total}
                    links={posts.links}
                />
            )}
        </div>
    );
}

import React from 'react';
import { Pagination, EmptyState, Icons } from '@/Components/Admin';

export default function TagsTab({ tags, onEdit, onDelete }) {
    if (tags.data.length === 0) {
        return (
            <EmptyState
                icon={<Icons.Tag className="w-12 h-12" />}
                title="No tags found"
                description="Create tags to help categorize and discover your content"
            />
        );
    }

    return (
        <div className="space-y-4">
            {/* Tags Grid */}
            <div className="flex flex-wrap gap-3">
                {tags.data.map((tag) => (
                    <div
                        key={tag.id}
                        className="inline-flex items-center bg-white border border-gray-200 rounded-full pl-4 pr-2 py-2 hover:shadow-md transition-shadow group"
                    >
                        <Icons.Tag className="w-4 h-4 text-orange-500 mr-2" />
                        <span className="font-medium text-gray-900 mr-1">{tag.name}</span>
                        <span className="text-xs text-gray-500 mr-2">
                            ({tag.posts_count || 0})
                        </span>
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onEdit(tag)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                title="Edit"
                            >
                                <Icons.Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={() => onDelete(tag)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                title="Delete"
                            >
                                <Icons.Trash className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tags Table (for detailed view) */}
            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tag Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Slug
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Posts
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tags.data.map((tag) => (
                            <tr key={tag.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <Icons.Tag className="w-4 h-4 text-orange-500 mr-2" />
                                        <span className="font-medium text-gray-900">{tag.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {tag.slug}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {tag.posts_count || 0} posts
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(tag)}
                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Icons.Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(tag)}
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
            {tags.last_page > 1 && (
                <Pagination
                    currentPage={tags.current_page}
                    lastPage={tags.last_page}
                    from={tags.from}
                    to={tags.to}
                    total={tags.total}
                    links={tags.links}
                />
            )}
        </div>
    );
}

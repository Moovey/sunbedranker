import React from 'react';
import { Pagination, EmptyState, Icons } from '@/Components/Admin';

export default function CategoriesTab({ categories, onEdit, onDelete }) {
    if (categories.data.length === 0) {
        return (
            <EmptyState
                icon={<Icons.Category className="w-12 h-12" />}
                title="No categories found"
                description="Create your first category to organize your content"
            />
        );
    }

    return (
        <div className="space-y-4">
            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.data.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                                    style={{ backgroundColor: `${category.color}20` }}
                                >
                                    <Icons.Category
                                        className="w-5 h-5"
                                        style={{ color: category.color }}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                                    <p className="text-xs text-gray-500">/{category.slug}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => onEdit(category)}
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Icons.Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => onDelete(category)}
                                    className={`p-1.5 rounded-lg transition-colors ${
                                        category.posts_count > 0
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-red-600 hover:bg-red-50'
                                    }`}
                                    title={category.posts_count > 0 ? 'Cannot delete: category has posts' : 'Delete'}
                                    disabled={category.posts_count > 0}
                                >
                                    <Icons.Trash className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {category.description && (
                            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                                {category.description}
                            </p>
                        )}

                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                {category.posts_count || 0} posts
                            </span>
                            <span
                                className="inline-block w-4 h-4 rounded-full border border-gray-200"
                                style={{ backgroundColor: category.color }}
                                title={category.color}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {categories.last_page > 1 && (
                <Pagination
                    currentPage={categories.current_page}
                    lastPage={categories.last_page}
                    from={categories.from}
                    to={categories.to}
                    total={categories.total}
                    links={categories.links}
                />
            )}
        </div>
    );
}

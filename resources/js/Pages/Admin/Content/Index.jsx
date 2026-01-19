import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminNav from '@/Components/AdminNav';
import { StatCard, TabButton, Modal, Pagination, EmptyState, Icons } from '@/Components/Admin';
import PostsTab from '@/Components/Admin/Content/PostsTab';
import CategoriesTab from '@/Components/Admin/Content/CategoriesTab';
import TagsTab from '@/Components/Admin/Content/TagsTab';
import CategoryModal from '@/Components/Admin/Content/CategoryModal';
import TagModal from '@/Components/Admin/Content/TagModal';

export default function ContentIndex({ posts, categories, tags, allCategories, filters, stats }) {
    const [activeTab, setActiveTab] = useState(filters.tab || 'posts');
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || 'all');
    
    // Modal states
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showTagModal, setShowTagModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingTag, setEditingTag] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        router.get(route('admin.content.index'), { tab, search: '' }, { preserveState: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.content.index'), {
            tab: activeTab,
            search,
            status: statusFilter,
            category: categoryFilter,
        }, { preserveState: true });
    };

    const handleFilterChange = (newFilters) => {
        router.get(route('admin.content.index'), {
            tab: activeTab,
            search,
            ...newFilters,
        }, { preserveState: true });
    };

    // Category handlers
    const handleCreateCategory = () => {
        setEditingCategory(null);
        setShowCategoryModal(true);
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setShowCategoryModal(true);
    };

    const handleDeleteCategory = (category) => {
        setDeleteItem({ type: 'category', item: category });
        setShowDeleteModal(true);
    };

    // Tag handlers
    const handleCreateTag = () => {
        setEditingTag(null);
        setShowTagModal(true);
    };

    const handleEditTag = (tag) => {
        setEditingTag(tag);
        setShowTagModal(true);
    };

    const handleDeleteTag = (tag) => {
        setDeleteItem({ type: 'tag', item: tag });
        setShowDeleteModal(true);
    };

    // Post handlers
    const handleDeletePost = (post) => {
        setDeleteItem({ type: 'post', item: post });
        setShowDeleteModal(true);
    };

    const handleTogglePostStatus = (post) => {
        router.post(route('admin.content.posts.toggle-status', post.id));
    };

    // Confirm delete
    const confirmDelete = () => {
        if (!deleteItem) return;

        const routes = {
            post: 'admin.content.posts.destroy',
            category: 'admin.content.categories.destroy',
            tag: 'admin.content.tags.destroy',
        };

        router.delete(route(routes[deleteItem.type], deleteItem.item.id), {
            onSuccess: () => {
                setShowDeleteModal(false);
                setDeleteItem(null);
            },
        });
    };

    const tabCounts = {
        posts: stats.total_posts,
        categories: stats.total_categories,
        tags: stats.total_tags,
    };

    return (
        <>
            <Head title="Content & Guides" />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav stats={{ pending_claims: 0 }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Content & Guides</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage blog posts, categories, and tags for SEO and platform authority
                            </p>
                        </div>
                        {activeTab === 'posts' && (
                            <a
                                href={route('admin.content.posts.create')}
                                className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                <Icons.Plus className="w-5 h-5 mr-2" />
                                New Post
                            </a>
                        )}
                        {activeTab === 'categories' && (
                            <button
                                onClick={handleCreateCategory}
                                className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                <Icons.Plus className="w-5 h-5 mr-2" />
                                New Category
                            </button>
                        )}
                        {activeTab === 'tags' && (
                            <button
                                onClick={handleCreateTag}
                                className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                <Icons.Plus className="w-5 h-5 mr-2" />
                                New Tag
                            </button>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
                        <StatCard
                            label="Total Posts"
                            value={stats.total_posts}
                            icon={<Icons.Document className="w-5 h-5" />}
                            color="blue"
                        />
                        <StatCard
                            label="Published"
                            value={stats.published_posts}
                            icon={<Icons.Check className="w-5 h-5" />}
                            color="green"
                        />
                        <StatCard
                            label="Drafts"
                            value={stats.draft_posts}
                            icon={<Icons.Pending className="w-5 h-5" />}
                            color="yellow"
                        />
                        <StatCard
                            label="Categories"
                            value={stats.total_categories}
                            icon={<Icons.Category className="w-5 h-5" />}
                            color="purple"
                        />
                        <StatCard
                            label="Tags"
                            value={stats.total_tags}
                            icon={<Icons.Tag className="w-5 h-5" />}
                            color="orange"
                        />
                        <StatCard
                            label="Total Views"
                            value={stats.total_views.toLocaleString()}
                            icon={<Icons.Eye className="w-5 h-5" />}
                            color="emerald"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="border-b border-gray-200">
                            <nav className="flex -mb-px">
                                <TabButton
                                    active={activeTab === 'posts'}
                                    onClick={() => handleTabChange('posts')}
                                    count={tabCounts.posts}
                                >
                                    Posts
                                </TabButton>
                                <TabButton
                                    active={activeTab === 'categories'}
                                    onClick={() => handleTabChange('categories')}
                                    count={tabCounts.categories}
                                >
                                    Categories
                                </TabButton>
                                <TabButton
                                    active={activeTab === 'tags'}
                                    onClick={() => handleTabChange('tags')}
                                    count={tabCounts.tags}
                                >
                                    Tags
                                </TabButton>
                            </nav>
                        </div>

                        {/* Search & Filters */}
                        <div className="p-4 border-b border-gray-200">
                            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder={`Search ${activeTab}...`}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>
                                
                                {activeTab === 'posts' && (
                                    <>
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => {
                                                setStatusFilter(e.target.value);
                                                handleFilterChange({ status: e.target.value, category: categoryFilter });
                                            }}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="published">Published</option>
                                            <option value="draft">Draft</option>
                                            <option value="scheduled">Scheduled</option>
                                        </select>
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => {
                                                setCategoryFilter(e.target.value);
                                                handleFilterChange({ status: statusFilter, category: e.target.value });
                                            }}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        >
                                            <option value="all">All Categories</option>
                                            {allCategories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </>
                                )}
                                
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                                >
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Tab Content */}
                        <div className="p-4">
                            {activeTab === 'posts' && (
                                <PostsTab
                                    posts={posts}
                                    onDelete={handleDeletePost}
                                    onToggleStatus={handleTogglePostStatus}
                                />
                            )}
                            {activeTab === 'categories' && (
                                <CategoriesTab
                                    categories={categories}
                                    onEdit={handleEditCategory}
                                    onDelete={handleDeleteCategory}
                                />
                            )}
                            {activeTab === 'tags' && (
                                <TagsTab
                                    tags={tags}
                                    onEdit={handleEditTag}
                                    onDelete={handleDeleteTag}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Modal */}
            <CategoryModal
                show={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                category={editingCategory}
            />

            {/* Tag Modal */}
            <TagModal
                show={showTagModal}
                onClose={() => setShowTagModal(false)}
                tag={editingTag}
            />

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title={`Delete ${deleteItem?.type}`}
                maxWidth="sm"
            >
                <div className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                        <Icons.Trash className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="text-center text-gray-600 mb-6">
                        Are you sure you want to delete this {deleteItem?.type}?
                        {deleteItem?.type === 'post' && ' This action cannot be undone.'}
                        {deleteItem?.type === 'category' && deleteItem?.item?.posts_count > 0 && (
                            <span className="block mt-2 text-red-600">
                                This category has {deleteItem.item.posts_count} posts and cannot be deleted.
                            </span>
                        )}
                    </p>
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            disabled={deleteItem?.type === 'category' && deleteItem?.item?.posts_count > 0}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

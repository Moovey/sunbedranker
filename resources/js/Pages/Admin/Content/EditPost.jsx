import React, { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AdminNav from '@/Components/AdminNav';
import { Icons } from '@/Components/Admin';

export default function EditPost({ post, categories, tags }) {
    const [formData, setFormData] = useState({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        category_id: post.category_id || '',
        tags: post.tags?.map((t) => t.id) || [],
        status: post.status || 'draft',
        published_at: post.published_at ? post.published_at.slice(0, 16) : '',
        meta_title: post.meta?.title || '',
        meta_description: post.meta?.description || '',
    });
    const [featuredImage, setFeaturedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(
        post.featured_image ? `/storage/${post.featured_image}` : null
    );
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFeaturedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setFeaturedImage(null);
        setImagePreview(null);
    };

    const handleTagToggle = (tagId) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.includes(tagId)
                ? prev.tags.filter((id) => id !== tagId)
                : [...prev.tags, tagId],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);

        const data = new FormData();
        data.append('_method', 'PUT');
        
        Object.keys(formData).forEach((key) => {
            if (key === 'tags') {
                formData.tags.forEach((tagId) => data.append('tags[]', tagId));
            } else {
                data.append(key, formData[key] ?? '');
            }
        });

        if (featuredImage) {
            data.append('featured_image', featuredImage);
        }

        router.post(route('admin.content.posts.update', post.id), data, {
            onError: (errors) => {
                setErrors(errors);
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    return (
        <>
            <Head title={`Edit: ${post.title}`} />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav stats={{ pending_claims: 0 }} />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <Link
                                href={route('admin.content.index')}
                                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Content
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                post.status === 'published'
                                    ? 'bg-green-100 text-green-800'
                                    : post.status === 'scheduled'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                            </span>
                            {post.views_count > 0 && (
                                <span className="flex items-center text-sm text-gray-500">
                                    <Icons.Eye className="w-4 h-4 mr-1" />
                                    {post.views_count.toLocaleString()} views
                                </span>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Title & Slug */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Title <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                                                    errors.title ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="Enter post title..."
                                            />
                                            {errors.title && (
                                                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Slug
                                            </label>
                                            <div className="flex items-center">
                                                <span className="text-sm text-gray-500 mr-2">/blog/</span>
                                                <input
                                                    type="text"
                                                    value={formData.slug}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, slug: generateSlug(e.target.value) })
                                                    }
                                                    className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                                                        errors.slug ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder="post-url-slug"
                                                />
                                            </div>
                                            {errors.slug && (
                                                <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Excerpt */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Excerpt
                                    </label>
                                    <textarea
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        rows={3}
                                        maxLength={500}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                                            errors.excerpt ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Brief summary of the post..."
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        {(formData.excerpt || '').length}/500 characters
                                    </p>
                                    {errors.excerpt && (
                                        <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Content <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        rows={15}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm ${
                                            errors.content ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Write your content here... (Markdown supported)"
                                    />
                                    {errors.content && (
                                        <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                                    )}
                                </div>

                                {/* SEO */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Meta Title
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.meta_title}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, meta_title: e.target.value })
                                                }
                                                maxLength={60}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                placeholder="Custom title for search engines..."
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                {(formData.meta_title || '').length}/60 characters
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Meta Description
                                            </label>
                                            <textarea
                                                value={formData.meta_description}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, meta_description: e.target.value })
                                                }
                                                rows={2}
                                                maxLength={160}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                placeholder="Description for search engine results..."
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                {(formData.meta_description || '').length}/160 characters
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Publish */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Publish</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, status: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="published">Published</option>
                                                <option value="scheduled">Scheduled</option>
                                            </select>
                                        </div>

                                        {formData.status === 'scheduled' && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Publish Date
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    value={formData.published_at}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, published_at: e.target.value })
                                                    }
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                />
                                            </div>
                                        )}

                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
                                            >
                                                {processing ? 'Saving...' : 'Update Post'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Featured Image */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Featured Image</h3>
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-40 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                            >
                                                <Icons.Close className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                                            <Icons.Document className="w-10 h-10 text-gray-400" />
                                            <span className="mt-2 text-sm text-gray-500">
                                                Click to upload
                                            </span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                    {errors.featured_image && (
                                        <p className="mt-2 text-sm text-red-600">{errors.featured_image}</p>
                                    )}
                                </div>

                                {/* Category */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Category</h3>
                                    <select
                                        value={formData.category_id}
                                        onChange={(e) =>
                                            setFormData({ ...formData, category_id: e.target.value })
                                        }
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                                            errors.category_id ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                                    )}
                                </div>

                                {/* Tags */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag) => (
                                            <button
                                                key={tag.id}
                                                type="button"
                                                onClick={() => handleTagToggle(tag.id)}
                                                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                                    formData.tags.includes(tag.id)
                                                        ? 'bg-orange-500 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                <Icons.Tag className="w-3.5 h-3.5 mr-1" />
                                                {tag.name}
                                            </button>
                                        ))}
                                    </div>
                                    {tags.length === 0 && (
                                        <p className="text-sm text-gray-500">No tags available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

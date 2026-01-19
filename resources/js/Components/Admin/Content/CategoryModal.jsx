import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Modal } from '@/Components/Admin';

const PRESET_COLORS = [
    '#f97316', // orange
    '#ef4444', // red
    '#ec4899', // pink
    '#8b5cf6', // purple
    '#3b82f6', // blue
    '#06b6d4', // cyan
    '#10b981', // green
    '#84cc16', // lime
    '#f59e0b', // amber
    '#6b7280', // gray
];

export default function CategoryModal({ show, onClose, category }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: '#f97316',
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || '',
                description: category.description || '',
                color: category.color || '#f97316',
            });
        } else {
            setFormData({
                name: '',
                description: '',
                color: '#f97316',
            });
        }
        setErrors({});
    }, [category, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);

        const url = category
            ? route('admin.content.categories.update', category.id)
            : route('admin.content.categories.store');

        const method = category ? 'put' : 'post';

        router[method](url, formData, {
            onSuccess: () => {
                onClose();
                setFormData({ name: '', description: '', color: '#f97316' });
            },
            onError: (errors) => {
                setErrors(errors);
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={category ? 'Edit Category' : 'Create Category'}
            maxWidth="md"
        >
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Travel Tips"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                            errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Brief description of this category..."
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                </div>

                {/* Color */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {PRESET_COLORS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => setFormData({ ...formData, color })}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${
                                    formData.color === color
                                        ? 'border-gray-900 scale-110'
                                        : 'border-transparent hover:border-gray-300'
                                }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        <div className="relative">
                            <input
                                type="color"
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                className="w-8 h-8 rounded-full cursor-pointer overflow-hidden"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-2">Preview:</p>
                    <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                            backgroundColor: `${formData.color}20`,
                            color: formData.color,
                        }}
                    >
                        {formData.name || 'Category Name'}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
                    >
                        {processing ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

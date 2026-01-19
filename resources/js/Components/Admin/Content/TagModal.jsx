import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Modal, Icons } from '@/Components/Admin';

export default function TagModal({ show, onClose, tag }) {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (tag) {
            setName(tag.name || '');
        } else {
            setName('');
        }
        setErrors({});
    }, [tag, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);

        const url = tag
            ? route('admin.content.tags.update', tag.id)
            : route('admin.content.tags.store');

        const method = tag ? 'put' : 'post';

        router[method](url, { name }, {
            onSuccess: () => {
                onClose();
                setName('');
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
            title={tag ? 'Edit Tag' : 'Create Tag'}
            maxWidth="sm"
        >
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tag Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Icons.Tag className="w-5 h-5" />
                        </span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g., luxury, budget-friendly"
                        />
                    </div>
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                </div>

                {/* Preview */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-2">Preview:</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                        <Icons.Tag className="w-4 h-4 mr-1" />
                        {name || 'tag-name'}
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
                        disabled={processing || !name.trim()}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
                    >
                        {processing ? 'Saving...' : tag ? 'Update Tag' : 'Create Tag'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

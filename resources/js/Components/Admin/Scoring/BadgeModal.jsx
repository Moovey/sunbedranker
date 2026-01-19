import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Modal, Icons } from '@/Components/Admin';

const BADGE_ICONS = [
    { key: 'star', emoji: '⭐', label: 'Star' },
    { key: 'trophy', emoji: '🏆', label: 'Trophy' },
    { key: 'medal', emoji: '🏅', label: 'Medal' },
    { key: 'sun', emoji: '☀️', label: 'Sun' },
    { key: 'water', emoji: '💧', label: 'Water' },
    { key: 'heart', emoji: '❤️', label: 'Heart' },
    { key: 'family', emoji: '👨‍👩‍👧‍👦', label: 'Family' },
    { key: 'quiet', emoji: '🤫', label: 'Quiet' },
    { key: 'party', emoji: '🎉', label: 'Party' },
    { key: 'luxury', emoji: '💎', label: 'Luxury' },
    { key: 'clean', emoji: '✨', label: 'Clean' },
    { key: 'accessible', emoji: '♿', label: 'Accessible' },
    { key: 'verified', emoji: '✓', label: 'Verified' },
];

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

const OPERATORS = [
    { value: '>', label: '> Greater than' },
    { value: '>=', label: '>= Greater or equal' },
    { value: '<', label: '< Less than' },
    { value: '<=', label: '<= Less or equal' },
    { value: '==', label: '== Equals' },
    { value: '!=', label: '!= Not equals' },
];

export default function BadgeModal({ show, onClose, badge, availableCriteria }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: 'star',
        color: '#f97316',
        priority: 50,
        is_active: true,
        criteria: [{ field: '', operator: '>=', value: '' }],
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [previewCount, setPreviewCount] = useState(null);
    const [previewLoading, setPreviewLoading] = useState(false);

    useEffect(() => {
        if (badge) {
            setFormData({
                name: badge.name || '',
                description: badge.description || '',
                icon: badge.icon || 'star',
                color: badge.color || '#f97316',
                priority: badge.priority || 50,
                is_active: badge.is_active ?? true,
                criteria: Array.isArray(badge.criteria) && badge.criteria.length > 0
                    ? badge.criteria
                    : [{ field: '', operator: '>=', value: '' }],
            });
        } else {
            setFormData({
                name: '',
                description: '',
                icon: 'star',
                color: '#f97316',
                priority: 50,
                is_active: true,
                criteria: [{ field: '', operator: '>=', value: '' }],
            });
        }
        setErrors({});
        setPreviewCount(null);
    }, [badge, show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);

        // Validate criteria
        const validCriteria = formData.criteria.filter(c => c.field && c.value !== '');
        if (validCriteria.length === 0) {
            setErrors({ criteria: 'At least one valid criterion is required' });
            setProcessing(false);
            return;
        }

        const data = {
            ...formData,
            criteria: validCriteria,
        };

        const url = badge
            ? route('admin.scoring.badges.update', badge.id)
            : route('admin.scoring.badges.store');

        const method = badge ? 'put' : 'post';

        router[method](url, data, {
            onSuccess: () => {
                onClose();
            },
            onError: (errors) => {
                setErrors(errors);
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    const addCriterion = () => {
        setFormData(prev => ({
            ...prev,
            criteria: [...prev.criteria, { field: '', operator: '>=', value: '' }],
        }));
    };

    const removeCriterion = (index) => {
        if (formData.criteria.length > 1) {
            setFormData(prev => ({
                ...prev,
                criteria: prev.criteria.filter((_, i) => i !== index),
            }));
        }
    };

    const updateCriterion = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            criteria: prev.criteria.map((c, i) => 
                i === index ? { ...c, [field]: value } : c
            ),
        }));
    };

    const handlePreview = async () => {
        const validCriteria = formData.criteria.filter(c => c.field && c.value !== '');
        if (validCriteria.length === 0) return;

        setPreviewLoading(true);
        try {
            const response = await fetch(route('admin.scoring.badges.preview'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ criteria: validCriteria }),
            });
            
            const data = await response.json();
            setPreviewCount(data.count);
        } catch (error) {
            console.error('Preview failed:', error);
        } finally {
            setPreviewLoading(false);
        }
    };

    const selectedIcon = BADGE_ICONS.find(i => i.key === formData.icon);

    return (
        <Modal
            show={show}
            onClose={onClose}
            title={badge ? 'Edit Badge Rule' : 'Create Badge Rule'}
            maxWidth="2xl"
        >
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[80vh] overflow-y-auto">
                {/* Basic Info Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Badge Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="e.g., Never Short of Beds"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority (0-100)
                        </label>
                        <input
                            type="number"
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                            min="0"
                            max="100"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                        />
                        <p className="mt-1 text-xs text-gray-500">Higher priority badges show first</p>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={2}
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                        placeholder="What this badge represents..."
                    />
                </div>

                {/* Icon & Color */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Icon Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Icon
                        </label>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {BADGE_ICONS.map((icon) => (
                                <button
                                    key={icon.key}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, icon: icon.key })}
                                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-base sm:text-xl rounded-lg border-2 transition-all ${
                                        formData.icon === icon.key
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    title={icon.label}
                                >
                                    {icon.emoji}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Color
                        </label>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {PRESET_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, color })}
                                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all ${
                                        formData.color === color
                                            ? 'border-gray-900 scale-110'
                                            : 'border-transparent hover:scale-105'
                                    }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Preview Badge */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <p className="text-xs text-gray-500 mb-2">Preview:</p>
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <span
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-base sm:text-xl flex-shrink-0"
                            style={{ backgroundColor: `${formData.color}20` }}
                        >
                            {selectedIcon?.emoji || '🏷️'}
                        </span>
                        <span
                            className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                            style={{ backgroundColor: `${formData.color}20`, color: formData.color }}
                        >
                            {formData.name || 'Badge Name'}
                        </span>
                    </div>
                </div>

                {/* Criteria Rules */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Rules <span className="text-red-500">*</span>
                        </label>
                        <button
                            type="button"
                            onClick={addCriterion}
                            className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                        >
                            + Add Rule
                        </button>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-3">
                        Hotels must match ALL rules to receive this badge (AND logic)
                    </p>

                    <div className="space-y-3">
                        {formData.criteria.map((criterion, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2">
                                {/* AND label - shown on left for desktop, as a tag for mobile */}
                                {index > 0 && (
                                    <span className="text-xs text-gray-400 sm:w-10 font-medium bg-gray-100 sm:bg-transparent px-2 py-1 sm:p-0 rounded self-start sm:self-auto">AND</span>
                                )}
                                {index === 0 && <span className="hidden sm:block sm:w-10"></span>}
                                
                                {/* Criteria fields - stacked on mobile, inline on desktop */}
                                <div className="flex flex-col sm:flex-row flex-1 gap-2">
                                    <select
                                        value={criterion.field}
                                        onChange={(e) => updateCriterion(index, 'field', e.target.value)}
                                        className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    >
                                        <option value="">Select metric...</option>
                                        {availableCriteria.map((c) => (
                                            <option key={c.key} value={c.key}>
                                                {c.label}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="flex gap-2">
                                        <select
                                            value={criterion.operator}
                                            onChange={(e) => updateCriterion(index, 'operator', e.target.value)}
                                            className="flex-1 sm:w-32 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        >
                                            {OPERATORS.map((op) => (
                                                <option key={op.value} value={op.value}>
                                                    {op.label}
                                                </option>
                                            ))}
                                        </select>

                                        <input
                                            type="text"
                                            value={criterion.value}
                                            onChange={(e) => updateCriterion(index, 'value', e.target.value)}
                                            placeholder="Value"
                                            className="flex-1 sm:w-24 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        />

                                        {formData.criteria.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeCriterion(index)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0"
                                            >
                                                <Icons.Trash className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {errors.criteria && (
                        <p className="mt-2 text-sm text-red-600">{errors.criteria}</p>
                    )}
                </div>

                {/* Preview Count */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center text-sm text-blue-700">
                        <Icons.Info className="w-4 h-4 mr-2 flex-shrink-0" />
                        {previewCount !== null ? (
                            <span><strong>{previewCount}</strong> hotels would receive this badge</span>
                        ) : (
                            <span>Click preview to see how many hotels match</span>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={handlePreview}
                        disabled={previewLoading || !formData.criteria.some(c => c.field && c.value)}
                        className="w-full sm:w-auto px-3 py-2 sm:py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                    >
                        {previewLoading ? 'Loading...' : 'Preview'}
                    </button>
                </div>

                {/* Active Toggle */}
                <div className="flex items-start sm:items-center">
                    <input
                        type="checkbox"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-4 h-4 mt-0.5 sm:mt-0 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                        Badge is active and can be applied to hotels
                    </label>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-4 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
                    >
                        {processing ? 'Saving...' : badge ? 'Update Badge' : 'Create Badge'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

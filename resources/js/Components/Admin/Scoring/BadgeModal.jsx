import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Modal, Icons } from '@/Components/Admin';

// SunbedRanker themed badge icons using SVG - matching homepage style
const BADGE_ICONS = [
    { 
        key: 'sunbed', 
        label: 'Sunbed Excellence',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>
    },
    { 
        key: 'pool', 
        label: 'Pool Quality',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2z"/></svg>
    },
    { 
        key: 'sun', 
        label: 'Sun Exposure',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>
    },
    { 
        key: 'infinity', 
        label: 'Infinity Pool',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/></svg>
    },
    { 
        key: 'toprated', 
        label: 'Top Rated',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    },
    { 
        key: 'family', 
        label: 'Family Friendly',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
    },
    { 
        key: 'relaxed', 
        label: 'Relaxed Vibe',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z"/></svg>
    },
    { 
        key: 'lively', 
        label: 'Lively Atmosphere',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
    },
    { 
        key: 'luxury', 
        label: 'Luxury Experience',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>
    },
    { 
        key: 'clean', 
        label: 'Spotless Clean',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"/></svg>
    },
    { 
        key: 'accessible', 
        label: 'Accessible',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M12 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 6h-5.5v10.5h-3V10H5V7h14v3z"/></svg>
    },
    { 
        key: 'verified', 
        label: 'Verified',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    },
    { 
        key: 'heated', 
        label: 'Heated Pool',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>
    },
    { 
        key: 'rooftop', 
        label: 'Rooftop Pool',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>
    },
    { 
        key: 'cabana', 
        label: 'Private Cabanas',
        icon: (color) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
    },
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
                            {BADGE_ICONS.map((iconItem) => (
                                <button
                                    key={iconItem.key}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, icon: iconItem.key })}
                                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border-2 transition-all ${
                                        formData.icon === iconItem.key
                                            ? 'border-orange-500 bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    title={iconItem.label}
                                >
                                    <span className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: formData.color }}>
                                        {iconItem.icon(formData.icon === iconItem.key ? '#f97316' : '#6b7280')}
                                    </span>
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
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${formData.color}20` }}
                        >
                            <span style={{ color: formData.color }}>
                                {selectedIcon?.icon(formData.color) || <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>}
                            </span>
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
                                        {/* Group criteria by their group property */}
                                        {Object.entries(
                                            availableCriteria.reduce((groups, c) => {
                                                const group = c.group || 'Other';
                                                if (!groups[group]) groups[group] = [];
                                                groups[group].push(c);
                                                return groups;
                                            }, {})
                                        ).map(([groupName, items]) => (
                                            <optgroup key={groupName} label={groupName}>
                                                {items.map((c) => (
                                                    <option key={c.key} value={c.key}>
                                                        {c.label}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>

                                    <div className="flex gap-2">
                                        {/* Operator - hide for boolean fields */}
                                        {!availableCriteria.find(c => c.key === criterion.field)?.type?.includes('boolean') && (
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
                                        )}

                                        {/* Value input - dynamic based on field type */}
                                        {availableCriteria.find(c => c.key === criterion.field)?.type === 'boolean' ? (
                                            // Boolean dropdown
                                            <select
                                                value={criterion.value}
                                                onChange={(e) => {
                                                    updateCriterion(index, 'value', e.target.value);
                                                    updateCriterion(index, 'operator', '==');
                                                }}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            >
                                                <option value="">Select...</option>
                                                <option value="true">Yes (Has this feature)</option>
                                                <option value="false">No (Doesn't have)</option>
                                            </select>
                                        ) : availableCriteria.find(c => c.key === criterion.field)?.type === 'decimal' ? (
                                            // Decimal input for ratio fields
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={criterion.value}
                                                onChange={(e) => updateCriterion(index, 'value', e.target.value)}
                                                placeholder="e.g. 0.5"
                                                className="flex-1 sm:w-24 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            />
                                        ) : (
                                            // Integer input for other number fields
                                            <input
                                                type="number"
                                                step="1"
                                                min="0"
                                                value={criterion.value}
                                                onChange={(e) => {
                                                    // Only allow integers
                                                    const val = e.target.value.replace(/[^0-9]/g, '');
                                                    updateCriterion(index, 'value', val);
                                                }}
                                                placeholder="Value"
                                                className="flex-1 sm:w-24 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            />
                                        )}

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

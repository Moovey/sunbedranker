import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Icons } from '@/Components/Admin';
import BadgeModal from './BadgeModal';

export default function BadgesTab({ badges, availableCriteria }) {
    const [showBadgeModal, setShowBadgeModal] = useState(false);
    const [editingBadge, setEditingBadge] = useState(null);
    const [previewingBadge, setPreviewingBadge] = useState(null);
    const [previewResult, setPreviewResult] = useState(null);
    const [previewLoading, setPreviewLoading] = useState(false);

    const handleCreateBadge = () => {
        setEditingBadge(null);
        setShowBadgeModal(true);
    };

    const handleEditBadge = (badge) => {
        setEditingBadge(badge);
        setShowBadgeModal(true);
    };

    const handleDeleteBadge = (badge) => {
        if (confirm(`Are you sure you want to delete the "${badge.name}" badge?`)) {
            router.delete(route('admin.scoring.badges.destroy', badge.id));
        }
    };

    const handleToggleBadge = (badge) => {
        router.post(route('admin.scoring.badges.toggle', badge.id));
    };

    const handleApplyBadge = (badge) => {
        if (confirm(`Apply "${badge.name}" badge to all matching hotels?`)) {
            router.post(route('admin.scoring.badges.apply', badge.id));
        }
    };

    const handlePreview = async (badge) => {
        setPreviewingBadge(badge.id);
        setPreviewLoading(true);
        
        try {
            const response = await fetch(route('admin.scoring.badges.preview'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ criteria: badge.criteria }),
            });
            
            const data = await response.json();
            setPreviewResult(data);
        } catch (error) {
            console.error('Preview failed:', error);
        } finally {
            setPreviewLoading(false);
        }
    };

    const closePreview = () => {
        setPreviewingBadge(null);
        setPreviewResult(null);
    };

    const formatCriteria = (criteria) => {
        if (!Array.isArray(criteria)) return 'Invalid criteria';
        
        return criteria.map((c, i) => {
            const criteriaLabel = availableCriteria.find(ac => ac.key === c.field)?.label || c.field;
            return (
                <span key={i} className="inline-flex items-center mr-2">
                    <span className="text-gray-600">{criteriaLabel}</span>
                    <span className="mx-1 text-orange-500 font-mono">{c.operator}</span>
                    <span className="font-medium">{String(c.value)}</span>
                    {i < criteria.length - 1 && <span className="ml-2 text-gray-400">AND</span>}
                </span>
            );
        });
    };

    // SunbedRanker themed badge icons using SVG - matching homepage style
    const getBadgeIcon = (iconName, color = 'currentColor') => {
        const icons = {
            sunbed: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>,
            pool: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2z"/></svg>,
            sun: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>,
            infinity: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/></svg>,
            toprated: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>,
            family: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
            relaxed: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z"/></svg>,
            lively: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>,
            luxury: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>,
            clean: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"/></svg>,
            accessible: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M12 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 6h-5.5v10.5h-3V10H5V7h14v3z"/></svg>,
            verified: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
            heated: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>,
            rooftop: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>,
            cabana: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>,
            // Legacy mappings
            star: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>,
            trophy: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>,
            medal: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2z"/></svg>,
            water: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/></svg>,
            quiet: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z"/></svg>,
            party: <svg className="w-5 h-5" viewBox="0 0 24 24" fill={color}><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>,
        };
        return icons[iconName] || icons.toprated;
    };

    return (
        <div className="space-y-6">
            {/* Info Box */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start">
                    <Icons.Info className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-orange-700">
                        <p className="font-medium mb-1">Automatic Badge Rules</p>
                        <p>
                            Create rules to automatically award badges to hotels that meet certain criteria.
                            Badges add credibility and help hotels stand out. When you click "Apply", 
                            the badge will be assigned to all hotels matching the rules.
                        </p>
                    </div>
                </div>
            </div>

            {/* Create Badge Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleCreateBadge}
                    className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                    <Icons.Plus className="w-4 h-4 mr-2" />
                    Create Badge Rule
                </button>
            </div>

            {/* Badges List */}
            {badges.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Icons.Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No badges yet</h3>
                    <p className="text-gray-500 mb-4">Create your first badge rule to reward great hotels.</p>
                    <button
                        onClick={handleCreateBadge}
                        className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        <Icons.Plus className="w-4 h-4 mr-2" />
                        Create First Badge
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {badges.map((badge) => (
                        <div
                            key={badge.id}
                            className={`bg-white border rounded-lg p-4 ${
                                badge.is_active ? 'border-gray-200' : 'border-gray-100 opacity-60'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start">
                                    <div
                                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
                                    >
                                        {getBadgeIcon(badge.icon, badge.color)}
                                    </div>
                                    <div className="ml-4">
                                        <div className="flex items-center">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {badge.name}
                                            </h3>
                                            {!badge.is_active && (
                                                <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded">
                                                    Inactive
                                                </span>
                                            )}
                                            <span
                                                className="ml-2 px-2 py-0.5 text-xs rounded"
                                                style={{
                                                    backgroundColor: `${badge.color}20`,
                                                    color: badge.color,
                                                }}
                                            >
                                                Priority: {badge.priority}
                                            </span>
                                        </div>
                                        {badge.description && (
                                            <p className="text-sm text-gray-500 mt-1">{badge.description}</p>
                                        )}
                                        <div className="mt-2 text-sm">
                                            <span className="text-gray-500 mr-2">Rules:</span>
                                            {formatCriteria(badge.criteria)}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    {/* Preview Button */}
                                    <button
                                        onClick={() => handlePreview(badge)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Preview matching hotels"
                                    >
                                        <Icons.Eye className="w-5 h-5" />
                                    </button>
                                    
                                    {/* Apply Button */}
                                    <button
                                        onClick={() => handleApplyBadge(badge)}
                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                        title="Apply to matching hotels"
                                    >
                                        <Icons.Check className="w-5 h-5" />
                                    </button>
                                    
                                    {/* Toggle Button */}
                                    <button
                                        onClick={() => handleToggleBadge(badge)}
                                        className={`p-2 rounded-lg transition-colors ${
                                            badge.is_active
                                                ? 'text-yellow-600 hover:bg-yellow-50'
                                                : 'text-green-600 hover:bg-green-50'
                                        }`}
                                        title={badge.is_active ? 'Deactivate' : 'Activate'}
                                    >
                                        {badge.is_active ? (
                                            <Icons.Pending className="w-5 h-5" />
                                        ) : (
                                            <Icons.Refresh className="w-5 h-5" />
                                        )}
                                    </button>
                                    
                                    {/* Edit Button */}
                                    <button
                                        onClick={() => handleEditBadge(badge)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Icons.Edit className="w-5 h-5" />
                                    </button>
                                    
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteBadge(badge)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Icons.Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Preview Results */}
                            {previewingBadge === badge.id && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    {previewLoading ? (
                                        <div className="flex items-center text-gray-500">
                                            <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading preview...
                                        </div>
                                    ) : previewResult ? (
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-gray-900">
                                                    {previewResult.count} hotels match this rule
                                                </span>
                                                <button
                                                    onClick={closePreview}
                                                    className="text-gray-400 hover:text-gray-600"
                                                >
                                                    <Icons.Close className="w-4 h-4" />
                                                </button>
                                            </div>
                                            {previewResult.hotels.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {previewResult.hotels.map((hotel) => (
                                                        <span
                                                            key={hotel.id}
                                                            className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                                                        >
                                                            {hotel.name} ({hotel.overall_score})
                                                        </span>
                                                    ))}
                                                    {previewResult.count > 10 && (
                                                        <span className="px-2 py-1 text-gray-500 text-sm">
                                                            +{previewResult.count - 10} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Badge Modal */}
            <BadgeModal
                show={showBadgeModal}
                onClose={() => setShowBadgeModal(false)}
                badge={editingBadge}
                availableCriteria={availableCriteria}
            />
        </div>
    );
}

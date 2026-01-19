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

    const getBadgeIcon = (iconName) => {
        const icons = {
            star: '⭐',
            trophy: '🏆',
            medal: '🏅',
            sun: '☀️',
            water: '💧',
            heart: '❤️',
            family: '👨‍👩‍👧‍👦',
            quiet: '🤫',
            party: '🎉',
            luxury: '💎',
            clean: '✨',
            accessible: '♿',
            verified: '✓',
        };
        return icons[iconName] || '🏷️';
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
                                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                                        style={{ backgroundColor: `${badge.color}20` }}
                                    >
                                        {getBadgeIcon(badge.icon)}
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

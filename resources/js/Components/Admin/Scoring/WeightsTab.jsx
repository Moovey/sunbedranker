import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Icons } from '@/Components/Admin';

export default function WeightsTab({ weights }) {
    const [localWeights, setLocalWeights] = useState(weights);
    const [hasChanges, setHasChanges] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleWeightChange = (id, field, value) => {
        const numValue = parseFloat(value) || 0;
        setLocalWeights(prev => prev.map(w => 
            w.id === id ? { ...w, [field]: Math.min(5, Math.max(0, numValue)) } : w
        ));
        setHasChanges(true);
    };

    const handleSave = () => {
        setProcessing(true);
        router.put(route('admin.scoring.weights.update'), {
            weights: localWeights.map(w => ({
                id: w.id,
                weight: w.weight,
                family_weight: w.family_weight,
                quiet_weight: w.quiet_weight,
                party_weight: w.party_weight,
            }))
        }, {
            onSuccess: () => {
                setHasChanges(false);
            },
            onFinish: () => {
                setProcessing(false);
            }
        });
    };

    const handleReset = () => {
        setLocalWeights(weights);
        setHasChanges(false);
    };

    const getWeightColor = (value) => {
        if (value >= 2) return 'text-green-600 bg-green-50';
        if (value >= 1) return 'text-blue-600 bg-blue-50';
        if (value > 0) return 'text-yellow-600 bg-yellow-50';
        return 'text-gray-400 bg-gray-50';
    };

    return (
        <div className="space-y-6">
            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                    <Icons.Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-blue-700">
                        <p className="font-medium mb-1">How Weighting Works</p>
                        <p>
                            Each metric contributes to the final score based on its weight. 
                            Higher weights (max 5.0) mean the metric has more impact on the ranking.
                            A weight of 0 means the metric is not counted in that scoring type.
                        </p>
                    </div>
                </div>
            </div>

            {/* Weights Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Metric
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center justify-center">
                                    <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                                    Overall
                                </div>
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center justify-center">
                                    <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                                    Family
                                </div>
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center justify-center">
                                    <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                                    Quiet
                                </div>
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center justify-center">
                                    <span className="w-3 h-3 rounded-full bg-pink-500 mr-2"></span>
                                    Party
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {localWeights.map((metric) => (
                            <tr key={metric.id} className={!metric.is_active ? 'opacity-50' : ''}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <Icons.Chart className="w-5 h-5 text-gray-500" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {metric.display_name}
                                                {!metric.is_active && (
                                                    <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded">
                                                        Inactive
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500">{metric.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="number"
                                            value={metric.weight}
                                            onChange={(e) => handleWeightChange(metric.id, 'weight', e.target.value)}
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            className={`w-20 px-3 py-2 text-center border rounded-lg text-sm font-medium ${getWeightColor(metric.weight)} border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="number"
                                            value={metric.family_weight}
                                            onChange={(e) => handleWeightChange(metric.id, 'family_weight', e.target.value)}
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            className={`w-20 px-3 py-2 text-center border rounded-lg text-sm font-medium ${getWeightColor(metric.family_weight)} border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="number"
                                            value={metric.quiet_weight}
                                            onChange={(e) => handleWeightChange(metric.id, 'quiet_weight', e.target.value)}
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            className={`w-20 px-3 py-2 text-center border rounded-lg text-sm font-medium ${getWeightColor(metric.quiet_weight)} border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="number"
                                            value={metric.party_weight}
                                            onChange={(e) => handleWeightChange(metric.id, 'party_weight', e.target.value)}
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            className={`w-20 px-3 py-2 text-center border rounded-lg text-sm font-medium ${getWeightColor(metric.party_weight)} border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500`}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Weight Legend */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">Weight Guide (0-5):</span>
                <span className="flex items-center">
                    <span className="w-3 h-3 rounded bg-purple-100 mr-2"></span>
                    4.0-5.0 Maximum Impact
                </span>
                <span className="flex items-center">
                    <span className="w-3 h-3 rounded bg-green-100 mr-2"></span>
                    2.5-4.0 High Impact
                </span>
                <span className="flex items-center">
                    <span className="w-3 h-3 rounded bg-blue-100 mr-2"></span>
                    1.0-2.5 Medium Impact
                </span>
                <span className="flex items-center">
                    <span className="w-3 h-3 rounded bg-yellow-100 mr-2"></span>
                    0.1-1.0 Low Impact
                </span>
                <span className="flex items-center">
                    <span className="w-3 h-3 rounded bg-gray-100 mr-2"></span>
                    0 Not Counted
                </span>
            </div>

            {/* Actions */}
            {hasChanges && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <p className="text-sm text-orange-600">
                        <Icons.Warning className="w-4 h-4 inline mr-1" />
                        You have unsaved changes
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={processing}
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
                        >
                            {processing ? 'Saving...' : 'Save Weights'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

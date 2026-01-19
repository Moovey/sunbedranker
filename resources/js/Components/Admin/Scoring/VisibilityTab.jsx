import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Icons } from '@/Components/Admin';

export default function VisibilityTab({ weights }) {
    const [localMetrics, setLocalMetrics] = useState(weights);
    const [hasChanges, setHasChanges] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleToggle = (id, field) => {
        setLocalMetrics(prev => prev.map(m => 
            m.id === id ? { ...m, [field]: !m[field] } : m
        ));
        setHasChanges(true);
    };

    const handleSave = () => {
        setProcessing(true);
        router.put(route('admin.scoring.visibility.update'), {
            metrics: localMetrics.map(m => ({
                id: m.id,
                is_active: m.is_active,
                is_visible: m.is_visible,
                is_public: m.is_public,
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
        setLocalMetrics(weights);
        setHasChanges(false);
    };

    const ToggleSwitch = ({ checked, onChange, color = 'orange' }) => {
        const colors = {
            orange: checked ? 'bg-orange-500' : 'bg-gray-200',
            green: checked ? 'bg-green-500' : 'bg-gray-200',
            blue: checked ? 'bg-blue-500' : 'bg-gray-200',
        };

        return (
            <button
                type="button"
                onClick={onChange}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${colors[color]}`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        checked ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
        );
    };

    return (
        <div className="space-y-6">
            {/* Info Box */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start">
                    <Icons.Info className="w-5 h-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-purple-700">
                        <p className="font-medium mb-1">Visibility Settings</p>
                        <ul className="space-y-1">
                            <li><strong>Active:</strong> Metric is used in score calculations</li>
                            <li><strong>Visible:</strong> Metric is shown on hotel detail pages</li>
                            <li><strong>Public:</strong> Metric is shown in public rankings/comparisons</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Visibility Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Metric
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center justify-center">
                                    <Icons.Check className="w-4 h-4 mr-1 text-green-500" />
                                    Active
                                </div>
                                <span className="text-xs font-normal normal-case text-gray-400">
                                    Used in scoring
                                </span>
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center justify-center">
                                    <Icons.Eye className="w-4 h-4 mr-1 text-blue-500" />
                                    Visible
                                </div>
                                <span className="text-xs font-normal normal-case text-gray-400">
                                    On hotel pages
                                </span>
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center justify-center">
                                    <Icons.Globe className="w-4 h-4 mr-1 text-orange-500" />
                                    Public
                                </div>
                                <span className="text-xs font-normal normal-case text-gray-400">
                                    In rankings
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {localMetrics.map((metric) => (
                            <tr key={metric.id} className={!metric.is_active ? 'bg-gray-50' : ''}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                                            metric.is_active ? 'bg-orange-100' : 'bg-gray-100'
                                        }`}>
                                            <Icons.Chart className={`w-5 h-5 ${
                                                metric.is_active ? 'text-orange-500' : 'text-gray-400'
                                            }`} />
                                        </div>
                                        <div className="ml-4">
                                            <div className={`text-sm font-medium ${
                                                metric.is_active ? 'text-gray-900' : 'text-gray-500'
                                            }`}>
                                                {metric.display_name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {metric.criteria_name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center">
                                        <ToggleSwitch
                                            checked={metric.is_active}
                                            onChange={() => handleToggle(metric.id, 'is_active')}
                                            color="green"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center">
                                        <ToggleSwitch
                                            checked={metric.is_visible}
                                            onChange={() => handleToggle(metric.id, 'is_visible')}
                                            color="blue"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center">
                                        <ToggleSwitch
                                            checked={metric.is_public}
                                            onChange={() => handleToggle(metric.id, 'is_public')}
                                            color="orange"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500">Quick actions:</span>
                <button
                    onClick={() => {
                        setLocalMetrics(prev => prev.map(m => ({ ...m, is_active: true })));
                        setHasChanges(true);
                    }}
                    className="text-green-600 hover:underline"
                >
                    Activate All
                </button>
                <button
                    onClick={() => {
                        setLocalMetrics(prev => prev.map(m => ({ ...m, is_visible: true })));
                        setHasChanges(true);
                    }}
                    className="text-blue-600 hover:underline"
                >
                    Show All
                </button>
                <button
                    onClick={() => {
                        setLocalMetrics(prev => prev.map(m => ({ ...m, is_public: true })));
                        setHasChanges(true);
                    }}
                    className="text-orange-600 hover:underline"
                >
                    Make All Public
                </button>
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
                            {processing ? 'Saving...' : 'Save Visibility Settings'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from '@/Components/AdminNav';
import { StatCard, TabButton, Icons } from '@/Components/Admin';
import WeightsTab from '@/Components/Admin/Scoring/WeightsTab';
import VisibilityTab from '@/Components/Admin/Scoring/VisibilityTab';
import BadgesTab from '@/Components/Admin/Scoring/BadgesTab';

export default function ScoringIndex({ weights, badges, stats, availableCriteria }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('weights');

    // Show toast notifications from flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                position: 'top-right',
                autoClose: 3000,
            });
        }
        if (flash?.error) {
            toast.error(flash.error, {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    }, [flash]);

    const handleRecalculateAll = () => {
        if (confirm('This will recalculate scores for all hotels. Continue?')) {
            router.post(route('admin.scoring.recalculate'));
        }
    };

    const handleApplyAllBadges = () => {
        if (confirm('This will apply all active badges to matching hotels. Continue?')) {
            router.post(route('admin.scoring.badges.apply-all'));
        }
    };

    return (
        <>
            <Head title="Scoring Settings" />
            <ToastContainer />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav stats={{ pending_claims: 0 }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Criteria & Scoring Settings</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Control how hotels are ranked — the core of the platform's value
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleRecalculateAll}
                                className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                <Icons.Refresh className="w-4 h-4 mr-2" />
                                Recalculate All Scores
                            </button>
                            <button
                                onClick={handleApplyAllBadges}
                                className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                <Icons.Award className="w-4 h-4 mr-2" />
                                Apply All Badges
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                        <StatCard
                            label="Total Metrics"
                            value={stats.total_metrics}
                            icon={<Icons.Chart className="w-5 h-5" />}
                            color="blue"
                        />
                        <StatCard
                            label="Active Metrics"
                            value={stats.active_metrics}
                            icon={<Icons.Check className="w-5 h-5" />}
                            color="green"
                        />
                        <StatCard
                            label="Visible Metrics"
                            value={stats.visible_metrics}
                            icon={<Icons.Eye className="w-5 h-5" />}
                            color="purple"
                        />
                        <StatCard
                            label="Total Badges"
                            value={stats.total_badges}
                            icon={<Icons.Award className="w-5 h-5" />}
                            color="orange"
                        />
                        <StatCard
                            label="Active Badges"
                            value={stats.active_badges}
                            icon={<Icons.Award className="w-5 h-5" />}
                            color="emerald"
                        />
                        <StatCard
                            label="Hotels with Badges"
                            value={stats.hotels_with_badges}
                            icon={<Icons.Hotel className="w-5 h-5" />}
                            color="cyan"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="border-b border-gray-200">
                            <nav className="flex -mb-px">
                                <TabButton
                                    active={activeTab === 'weights'}
                                    onClick={() => setActiveTab('weights')}
                                >
                                    <Icons.Settings className="w-4 h-4 mr-2" />
                                    Metric Weighting
                                </TabButton>
                                <TabButton
                                    active={activeTab === 'visibility'}
                                    onClick={() => setActiveTab('visibility')}
                                >
                                    <Icons.Eye className="w-4 h-4 mr-2" />
                                    Visibility
                                </TabButton>
                                <TabButton
                                    active={activeTab === 'badges'}
                                    onClick={() => setActiveTab('badges')}
                                >
                                    <Icons.Award className="w-4 h-4 mr-2" />
                                    Badge Rules
                                </TabButton>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                            {activeTab === 'weights' && (
                                <WeightsTab weights={weights} />
                            )}
                            {activeTab === 'visibility' && (
                                <VisibilityTab weights={weights} />
                            )}
                            {activeTab === 'badges' && (
                                <BadgesTab 
                                    badges={badges} 
                                    availableCriteria={availableCriteria}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

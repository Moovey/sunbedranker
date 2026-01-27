import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import HotelierNav from '@/Components/HotelierNav';
import {
    QuickStatCard,
    TabButton,
    OverviewTab,
    ViewsTab,
    ClicksTab,
    ChartIcon,
    EyeIcon,
    LinkIcon,
} from '@/Components/Hotelier/Analytics';

export default function Analytics({ hotel, subscription, analytics }) {
    // Get initial tab from URL query params
    const getInitialTab = () => {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        return ['overview', 'views', 'clicks'].includes(tab) ? tab : 'overview';
    };

    const [activeTab, setActiveTab] = useState(getInitialTab);

    // Update URL when tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        const url = new URL(window.location.href);
        url.searchParams.set('tab', tab);
        window.history.replaceState({}, '', url.toString());
    };

    return (
        <>
            <Head title={`Analytics - ${hotel.name}`} />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <HotelierNav />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                    {/* Inline Header */}
                    <div className="mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <Link
                                href={route('hotelier.dashboard')}
                                className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2">
                                <ChartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                                Analytics
                            </h1>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ml-6 sm:ml-8">
                            <div className="min-w-0">
                                <p className="text-gray-900 font-medium text-sm sm:text-base truncate">{hotel.name}</p>
                                <p className="text-gray-500 text-xs sm:text-sm">{hotel.destination?.name}</p>
                            </div>
                            <Link
                                href={route('hotelier.hotels.manage', hotel.slug)}
                                className="px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium text-xs sm:text-sm transition-colors text-center w-full sm:w-auto flex-shrink-0"
                            >
                                Manage Hotel
                            </Link>
                        </div>
                    </div>

                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <QuickStatCard
                            title="Today"
                            views={analytics.today.views}
                            clicks={analytics.today.clicks}
                            color="orange"
                        />
                        <QuickStatCard
                            title="This Week"
                            views={analytics.weekly.views}
                            clicks={analytics.weekly.clicks}
                            color="blue"
                        />
                        <QuickStatCard
                            title="This Month"
                            views={analytics.monthly.views}
                            clicks={analytics.monthly.clicks}
                            color="green"
                        />
                        <QuickStatCard
                            title="All Time"
                            views={analytics.allTime.views}
                            clicks={analytics.allTime.clicks}
                            color="purple"
                        />
                    </div>

                    {/* Tab Navigation + Content Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="border-b border-gray-200 px-2 sm:px-4 pt-2 sm:pt-4">
                            <div className="flex gap-0.5 sm:gap-1 overflow-x-auto pb-0 scrollbar-hide">
                                <TabButton active={activeTab === 'overview'} onClick={() => handleTabChange('overview')}>
                                    <ChartIcon className="w-4 h-4" />
                                    Overview
                                </TabButton>
                                <TabButton active={activeTab === 'views'} onClick={() => handleTabChange('views')}>
                                    <EyeIcon className="w-4 h-4" />
                                    Profile Views
                                </TabButton>
                                <TabButton active={activeTab === 'clicks'} onClick={() => handleTabChange('clicks')}>
                                    <LinkIcon className="w-4 h-4" />
                                    Booking Clicks
                                </TabButton>
                            </div>
                        </div>
                        <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                            {activeTab === 'overview' && (
                                <OverviewTab analytics={analytics} hotel={hotel} />
                            )}
                            {activeTab === 'views' && (
                                <ViewsTab analytics={analytics} />
                            )}
                            {activeTab === 'clicks' && (
                                <ClicksTab analytics={analytics} hotel={hotel} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

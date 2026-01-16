import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
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
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <>
            <Head title={`Analytics - ${hotel.name}`} />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <HotelierNav />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Inline Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Link
                                href={route('hotelier.dashboard')}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <ChartIcon className="w-6 h-6 text-orange-500" />
                                Analytics
                            </h1>
                        </div>
                        <div className="flex items-center justify-between ml-8">
                            <div>
                                <p className="text-gray-900 font-medium">{hotel.name}</p>
                                <p className="text-gray-500 text-sm">{hotel.destination?.name}</p>
                            </div>
                            <Link
                                href={route('hotelier.hotels.manage', hotel.slug)}
                                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium text-sm transition-colors"
                            >
                                Manage Hotel
                            </Link>
                        </div>
                    </div>

                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
                        <div className="border-b border-gray-200 px-4 pt-4">
                            <div className="flex gap-1 overflow-x-auto pb-0">
                                <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
                                    <ChartIcon className="w-4 h-4" />
                                    Overview
                                </TabButton>
                                <TabButton active={activeTab === 'views'} onClick={() => setActiveTab('views')}>
                                    <EyeIcon className="w-4 h-4" />
                                    Profile Views
                                </TabButton>
                                <TabButton active={activeTab === 'clicks'} onClick={() => setActiveTab('clicks')}>
                                    <LinkIcon className="w-4 h-4" />
                                    Booking Clicks
                                </TabButton>
                            </div>
                        </div>
                        <div className="p-5 sm:p-6">
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

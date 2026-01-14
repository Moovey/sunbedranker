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
            
            <div className="min-h-screen bg-white font-sans">
                <HotelierNav />

                {/* Page Header */}
                <div className="bg-gradient-to-r from-orange-50 to-blue-50 shadow-lg border-b-2 border-orange-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Link
                                        href={route('hotelier.dashboard')}
                                        className="text-gray-500 hover:text-orange-600 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </Link>
                                    <span className="text-gray-400">|</span>
                                    <span className="text-sm text-gray-600 font-semibold">{hotel.destination?.name}</span>
                                </div>
                                <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 flex items-center gap-3">
                                    <ChartIcon className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
                                    Analytics
                                </h1>
                                <p className="text-gray-600 font-semibold mt-1">{hotel.name}</p>
                            </div>
                            <Link
                                href={route('hotelier.hotels.manage', hotel.slug)}
                                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                            >
                                Manage Hotel
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <QuickStatCard
                            title="Today"
                            views={analytics.today.views}
                            clicks={analytics.today.clicks}
                            color="blue"
                        />
                        <QuickStatCard
                            title="This Week"
                            views={analytics.weekly.views}
                            clicks={analytics.weekly.clicks}
                            color="green"
                        />
                        <QuickStatCard
                            title="This Month"
                            views={analytics.monthly.views}
                            clicks={analytics.monthly.clicks}
                            color="purple"
                        />
                        <QuickStatCard
                            title="All Time"
                            views={analytics.allTime.views}
                            clicks={analytics.allTime.clicks}
                            color="orange"
                        />
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
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

                    {/* Tab Content */}
                    <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 sm:p-8">
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
        </>
    );
}

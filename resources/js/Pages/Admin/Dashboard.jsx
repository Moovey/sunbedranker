import { Link, Head } from '@inertiajs/react';
import { useState } from 'react';
import AdminNav from '@/Components/AdminNav';

// Format large numbers with K/M suffixes
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num?.toLocaleString() || '0';
}

export default function AdminDashboard({ stats, recentHotels, pendingClaims, pendingReviews, topPerformingHotels, quickActions, monthlyPerformance }) {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const availableYears = Object.keys(monthlyPerformance || {}).map(Number).sort((a, b) => b - a);
    const yearData = monthlyPerformance?.[selectedYear] || [];
    
    return (
        <>
            <Head title="Admin Dashboard" />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav stats={stats} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Top Stats Row - Compact cards like in image */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                        <Link href="/admin/hotels" className="block">
                            <MiniStatCard
                                icon={
                                    <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                                    </svg>
                                }
                                value={stats.total_hotels}
                                label="HOTELS"
                                bgColor="bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer"
                            />
                        </Link>
                        <Link href="/admin/claims" className="block">
                            <MiniStatCard
                                icon={
                                    <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                    </svg>
                                }
                                value={stats.claimed_hotels || 0}
                                label="CLAIMED"
                                bgColor="bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                            />
                        </Link>
                        <Link href="/admin/claims?tab=subscriptions" className="block">
                            <MiniStatCard
                                icon={
                                    <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                                    </svg>
                                }
                                value={stats.active_subscriptions || 0}
                                label="SUBSCRIPTIONS"
                                bgColor="bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
                            />
                        </Link>
                        <Link href="/admin/users" className="block">
                            <MiniStatCard
                                icon={
                                    <svg className="w-5 h-5 text-cyan-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                    </svg>
                                }
                                value={stats.total_users}
                                label="USERS"
                                bgColor="bg-cyan-50 hover:bg-cyan-100 transition-colors cursor-pointer"
                            />
                        </Link>
                        <Link href="/admin/claims?tab=hoteliers" className="block">
                            <MiniStatCard
                                icon={
                                    <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                }
                                value={stats.hoteliers}
                                label="HOTELIERS"
                                bgColor="bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer"
                            />
                        </Link>
                        <Link href="/admin/content" className="block">
                            <MiniStatCard
                                icon={
                                    <svg className="w-5 h-5 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                    </svg>
                                }
                                value={stats.total_posts || 0}
                                label="CONTENT"
                                bgColor="bg-pink-50 hover:bg-pink-100 transition-colors cursor-pointer"
                            />
                        </Link>
                    </div>

                    {/* Second Row - Conversion Rate style cards + Chart area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Left Column - Two stat cards stacked */}
                        <div className="space-y-6">
                            {/* Conversion Rate style card */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="text-4xl font-bold text-gray-900 mb-1">
                                    {formatNumber(stats.total_clicks || 0)}
                                </div>
                                <div className="text-orange-600 font-semibold text-sm mb-3">Total Clicks</div>
                                <p className="text-gray-500 text-sm">
                                    {formatNumber(stats.clicks_this_month || 0)} clicks this month
                                </p>
                            </div>

                            {/* Order Delivered style card */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="text-4xl font-bold text-gray-900 mb-1">
                                    €{formatNumber(stats.total_revenue || 0)}
                                </div>
                                <div className="text-orange-600 font-semibold text-sm mb-3">Affiliate Revenue</div>
                                <div className="flex justify-between text-sm mt-4">
                                    <div className="text-center">
                                        <div className="font-bold text-gray-900">{stats.premium_tier || 0}</div>
                                        <div className="text-gray-500">Premium</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-gray-900">{stats.enhanced_tier || 0}</div>
                                        <div className="text-gray-500">Enhanced</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-gray-900">{stats.free_tier || 0}</div>
                                        <div className="text-gray-500">Free</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Monthly Performance Chart Area */}
                        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-900">Monthly Performance Report</h3>
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                                        Clicks
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                        Views
                                    </span>
                                    <select 
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                                        className="border border-gray-200 rounded-lg pl-3 pr-8 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M7%207l3%203%203-3%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.25rem_center]"
                                    >
                                        {availableYears.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-baseline gap-4 mb-6">
                                <div>
                                    <span className="text-3xl font-bold text-gray-900">{formatNumber(yearData.reduce((sum, m) => sum + (m.clicks || 0), 0))}</span>
                                    <span className="text-gray-500 ml-2">Clicks</span>
                                </div>
                                <div>
                                    <span className="text-3xl font-bold text-gray-900">{formatNumber(yearData.reduce((sum, m) => sum + (m.views || 0), 0))}</span>
                                    <span className="text-gray-500 ml-2">Views</span>
                                </div>
                            </div>
                            {/* Simple visual chart representation */}
                            <div className="h-32 flex items-end justify-between gap-2">
                                {(() => {
                                    // Calculate max value for scaling
                                    const maxValue = Math.max(
                                        ...((yearData || []).map(m => Math.max(m.clicks || 0, m.views || 0))),
                                        1 // Prevent division by zero
                                    );
                                    
                                    return (yearData || []).map((data, i) => {
                                        const clicksHeight = maxValue > 0 ? ((data.clicks || 0) / maxValue) * 100 : 0;
                                        const viewsHeight = maxValue > 0 ? ((data.views || 0) / maxValue) * 100 : 0;
                                        
                                        return (
                                            <div key={i} className="flex-1 flex flex-col items-center">
                                                <div className="w-full h-24 flex items-end">
                                                    <div className="w-full flex gap-0.5 justify-center items-end h-full">
                                                        {/* Clicks bar (orange) */}
                                                        <div 
                                                            className="w-1/2 bg-orange-500 rounded-t"
                                                            style={{ height: `${Math.max(clicksHeight, data.clicks > 0 ? 8 : 0)}%` }}
                                                            title={`Clicks: ${formatNumber(data.clicks || 0)}`}
                                                        />
                                                        {/* Views bar (green) */}
                                                        <div 
                                                            className="w-1/2 bg-green-500 rounded-t"
                                                            style={{ height: `${Math.max(viewsHeight, data.views > 0 ? 8 : 0)}%` }}
                                                            title={`Views: ${formatNumber(data.views || 0)}`}
                                                        />
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-400 mt-1">
                                                    {data.month}
                                                </span>
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                            {(!yearData || yearData.length === 0) && (
                                <div className="text-center text-gray-400 text-sm mt-2">
                                    No analytics data available yet
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Third Row - Pie Chart + Stats + Feeds */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Subscription Distribution (Pie Chart style) */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-2">Subscription Distribution</h3>
                            <p className="text-gray-500 text-sm mb-6">Breakdown of hotel subscription tiers</p>
                            
                            {/* Simple pie chart visualization */}
                            <div className="flex justify-center mb-6">
                                <div className="relative w-40 h-40">
                                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                        {/* Background circle */}
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="20" />
                                        {/* Premium segment */}
                                        <circle 
                                            cx="50" cy="50" r="40" fill="none" 
                                            stroke="#8B5CF6" strokeWidth="20"
                                            strokeDasharray={`${((stats.premium_tier || 0) / (stats.total_hotels || 1)) * 251.2} 251.2`}
                                        />
                                        {/* Enhanced segment */}
                                        <circle 
                                            cx="50" cy="50" r="40" fill="none" 
                                            stroke="#3B82F6" strokeWidth="20"
                                            strokeDasharray={`${((stats.enhanced_tier || 0) / (stats.total_hotels || 1)) * 251.2} 251.2`}
                                            strokeDashoffset={`-${((stats.premium_tier || 0) / (stats.total_hotels || 1)) * 251.2}`}
                                        />
                                        {/* Free segment */}
                                        <circle 
                                            cx="50" cy="50" r="40" fill="none" 
                                            stroke="#10B981" strokeWidth="20"
                                            strokeDasharray={`${((stats.free_tier || 0) / (stats.total_hotels || 1)) * 251.2} 251.2`}
                                            strokeDashoffset={`-${(((stats.premium_tier || 0) + (stats.enhanced_tier || 0)) / (stats.total_hotels || 1)) * 251.2}`}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-gray-900">{stats.total_hotels}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Legend */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-sm">
                                        <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                                        Premium
                                    </span>
                                    <span className="font-semibold">{stats.premium_tier || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-sm">
                                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                        Enhanced
                                    </span>
                                    <span className="font-semibold">{stats.enhanced_tier || 0}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-sm">
                                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                        Free
                                    </span>
                                    <span className="font-semibold">{stats.free_tier || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Middle Stats Column */}
                        <div className="space-y-4">
                            {/* Total Profit style */}
                            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                <div className="text-gray-500 text-sm mb-1">Page Views</div>
                                <div className="text-3xl font-bold text-gray-900">{formatNumber(stats.views_this_month || 0)}</div>
                            </div>
                            {/* Average Price style */}
                            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                <div className="text-gray-500 text-sm mb-1">Pending Claims</div>
                                <div className="text-3xl font-bold text-gray-900">{stats.pending_claims}</div>
                            </div>
                            {/* Highlighted card */}
                            <div className="bg-orange-500 rounded-xl p-5 shadow-sm text-white">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-orange-100 text-sm mb-1">Pending Reviews</div>
                                        <div className="text-3xl font-bold">{stats.pending_reviews}</div>
                                    </div>
                                    <svg className="w-8 h-8 text-orange-200" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                </div>
                            </div>
                            {/* Product Sold style */}
                            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-gray-500 text-sm mb-1">Active Campaigns</div>
                                        <div className="text-3xl font-bold text-gray-900">{stats.active_campaigns || 0}</div>
                                    </div>
                                    <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Feeds / Activity */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                            <div className="space-y-4 max-h-[360px] overflow-y-auto">
                                {pendingClaims?.map((claim) => (
                                    <div key={claim.id} className="flex items-start gap-3 pb-3 border-b border-gray-100">
                                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-900 font-medium truncate">
                                                New claim: {claim.hotel?.name}
                                            </p>
                                            <p className="text-xs text-gray-500">by {claim.user?.name}</p>
                                        </div>
                                        <span className="text-xs text-gray-400 flex-shrink-0">Pending</span>
                                    </div>
                                ))}
                                {recentHotels?.slice(0, 4).map((hotel) => (
                                    <div key={hotel.id} className="flex items-start gap-3 pb-3 border-b border-gray-100">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-900 font-medium truncate">
                                                Hotel added: {hotel.name}
                                            </p>
                                            <p className="text-xs text-gray-500">{hotel.destination?.name}</p>
                                        </div>
                                        <span className="text-xs text-gray-400 flex-shrink-0">New</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Fourth Row - Table + Quick Links */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Performing Hotels Table */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-900">Top Performing Hotels</h3>
                                <Link href="/admin/hotels" className="text-orange-600 text-sm font-medium hover:text-orange-700">
                                    View all →
                                </Link>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                                        <th className="pb-3 font-medium">Hotel Name</th>
                                        <th className="pb-3 font-medium">Image</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Clicks</th>
                                        <th className="pb-3 font-medium">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topPerformingHotels?.length > 0 ? (
                                        topPerformingHotels.map((hotel) => (
                                            <tr key={hotel.id} className="border-b border-gray-50 hover:bg-gray-50">
                                                <td className="py-3">
                                                    <Link href={`/admin/hotels/${hotel.id}/edit`} className="text-sm font-medium text-gray-900 hover:text-orange-600">
                                                        {hotel.name}
                                                    </Link>
                                                    <p className="text-xs text-gray-500">{hotel.destination?.name}</p>
                                                </td>
                                                <td className="py-3">
                                                    {hotel.main_image ? (
                                                        <img src={hotel.main_image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                                    ) : (
                                                        <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                                                    )}
                                                </td>
                                                <td className="py-3">
                                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="py-3 text-sm font-medium text-gray-900">
                                                    {formatNumber(hotel.click_count)}
                                                </td>
                                                <td className="py-3 text-sm font-medium text-green-600">
                                                    €{formatNumber(hotel.affiliate_revenue || 0)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-8 text-center text-gray-500 text-sm">
                                                No performance data yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Quick Links Grid */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href="/admin/hotels/create"
                                    className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <span className="font-medium text-gray-900">Add Hotel</span>
                                </Link>
                                <Link
                                    href="/admin/claims"
                                    className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors group relative"
                                >
                                    <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                        </svg>
                                    </div>
                                    <span className="font-medium text-gray-900">Claims</span>
                                    {stats.pending_claims > 0 && (
                                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            {stats.pending_claims}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    href="/admin/reviews"
                                    className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors group relative"
                                >
                                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                    </div>
                                    <span className="font-medium text-gray-900">Reviews</span>
                                    {stats.pending_reviews > 0 && (
                                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            {stats.pending_reviews}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    href="/admin/hotels"
                                    className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                                        </svg>
                                    </div>
                                    <span className="font-medium text-gray-900">Hotels</span>
                                </Link>
                                <Link
                                    href="/admin/destinations"
                                    className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                        </svg>
                                    </div>
                                    <span className="font-medium text-gray-900">Destinations</span>
                                </Link>
                                <Link
                                    href="/admin/users"
                                    className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                        </svg>
                                    </div>
                                    <span className="font-medium text-gray-900">Users</span>
                                </Link>
                                <Link
                                    href="/admin/scoring"
                                    className="flex items-center gap-3 p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                                        </svg>
                                    </div>
                                    <span className="font-medium text-gray-900">Scoring</span>
                                </Link>
                                <Link
                                    href="/admin/content"
                                    className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                        </svg>
                                    </div>
                                    <span className="font-medium text-gray-900">Content</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function MiniStatCard({ icon, value, label, bgColor }) {
    return (
        <div className={`${bgColor} rounded-xl p-4 flex items-center gap-3`}>
            <div className="flex-shrink-0">
                {icon}
            </div>
            <div>
                <div className="text-xl font-bold text-gray-900">{value}</div>
                <div className="text-xs text-gray-500 font-medium">{label}</div>
            </div>
        </div>
    );
}

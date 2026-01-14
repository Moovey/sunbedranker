import SummaryCard from './SummaryCard';
import PerformanceChart from './PerformanceChart';
import { ChartIcon, EyeIcon, LinkIcon, PercentIcon } from './Icons';

export default function OverviewTab({ analytics, hotel }) {
    // Build a complete 30-day dataset, filling in zeros for missing days
    const getLast30Days = () => {
        const days = [];
        const today = new Date();
        
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            // Find if we have data for this date
            const existingData = analytics.daily.find(d => d.date === dateStr);
            
            days.push({
                date: dateStr,
                formatted_date: formattedDate,
                views: existingData?.views || 0,
                clicks: existingData?.clicks || 0,
            });
        }
        return days;
    };
    
    const chartData = getLast30Days();
    const ctr = analytics.allTime.views > 0 
        ? ((analytics.allTime.clicks / analytics.allTime.views) * 100).toFixed(1) 
        : 0;
    
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ChartIcon className="w-6 h-6 text-orange-500" />
                    Performance Overview
                </h3>
                <p className="text-gray-600 mb-6">
                    See how guests interact with your hotel profile on Sunbed Ranker.
                </p>
            </div>

            {/* Chart Area */}
            <PerformanceChart data={chartData} />

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SummaryCard
                    icon={<EyeIcon className="w-6 h-6 text-blue-500" />}
                    title="Total Profile Views"
                    value={analytics.allTime.views}
                    description="How many times guests viewed your hotel profile"
                />
                <SummaryCard
                    icon={<LinkIcon className="w-6 h-6 text-green-500" />}
                    title="Total Booking Clicks"
                    value={analytics.allTime.clicks}
                    description="Clicks on booking buttons (affiliate & direct)"
                />
                <SummaryCard
                    icon={<PercentIcon className="w-6 h-6 text-purple-500" />}
                    title="Click-Through Rate"
                    value={`${ctr}%`}
                    description="Percentage of views that resulted in booking clicks"
                />
            </div>
        </div>
    );
}

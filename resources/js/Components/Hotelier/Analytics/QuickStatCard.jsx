export default function QuickStatCard({ title, views, clicks, color }) {
    // Clean, subtle color palette matching admin dashboard
    const colorClasses = {
        orange: {
            bg: 'bg-orange-50',
            icon: 'text-orange-600',
        },
        blue: {
            bg: 'bg-blue-50',
            icon: 'text-blue-600',
        },
        green: {
            bg: 'bg-green-50',
            icon: 'text-green-600',
        },
        purple: {
            bg: 'bg-purple-50',
            icon: 'text-purple-600',
        },
    };

    const colors = colorClasses[color] || colorClasses.orange;
    const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : 0;

    return (
        <div className={`${colors.bg} rounded-xl p-3 sm:p-4`}>
            <div className={`text-xs font-semibold uppercase ${colors.icon} mb-1.5 sm:mb-2`}>{title}</div>
            <div className="space-y-1.5 sm:space-y-2">
                <div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{views.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Views</div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="min-w-0">
                        <div className="text-base sm:text-lg font-semibold text-gray-700">{clicks.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Clicks</div>
                    </div>
                    <div className="text-right ml-auto">
                        <div className={`text-base sm:text-lg font-semibold ${colors.icon}`}>{ctr}%</div>
                        <div className="text-xs text-gray-500">CTR</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function QuickStatCard({ title, views, clicks, color }) {
    // Soft, subtle color palette - less overwhelming
    const colorClasses = {
        orange: {
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            accent: 'text-orange-600',
            text: 'text-gray-700',
        },
        blue: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            accent: 'text-blue-600',
            text: 'text-gray-700',
        },
        green: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            accent: 'text-green-600',
            text: 'text-gray-700',
        },
        purple: {
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            accent: 'text-purple-600',
            text: 'text-gray-700',
        },
    };

    const colors = colorClasses[color] || colorClasses.orange;
    const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : 0;

    return (
        <div className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-4 sm:p-5 shadow-sm`}>
            <div className={`text-xs font-bold uppercase ${colors.accent} mb-2`}>{title}</div>
            <div className="space-y-2">
                <div>
                    <div className="text-2xl sm:text-3xl font-black text-gray-900">{views.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Views</div>
                </div>
                <div className="flex items-center gap-3">
                    <div>
                        <div className={`text-lg font-bold ${colors.text}`}>{clicks.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Clicks</div>
                    </div>
                    <div className="text-right ml-auto">
                        <div className={`text-lg font-bold ${colors.accent}`}>{ctr}%</div>
                        <div className="text-xs text-gray-500">CTR</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

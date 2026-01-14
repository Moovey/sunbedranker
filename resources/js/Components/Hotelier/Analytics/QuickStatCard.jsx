export default function QuickStatCard({ title, views, clicks, color }) {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        purple: 'from-purple-500 to-purple-600',
        orange: 'from-orange-500 to-orange-600',
    };

    const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : 0;

    return (
        <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-4 sm:p-5 text-white shadow-lg`}>
            <div className="text-xs font-bold uppercase opacity-80 mb-2">{title}</div>
            <div className="space-y-2">
                <div>
                    <div className="text-2xl sm:text-3xl font-black">{views.toLocaleString()}</div>
                    <div className="text-xs opacity-80">Views</div>
                </div>
                <div className="flex items-center gap-3">
                    <div>
                        <div className="text-lg font-bold">{clicks.toLocaleString()}</div>
                        <div className="text-xs opacity-80">Clicks</div>
                    </div>
                    <div className="text-right ml-auto">
                        <div className="text-lg font-bold">{ctr}%</div>
                        <div className="text-xs opacity-80">CTR</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

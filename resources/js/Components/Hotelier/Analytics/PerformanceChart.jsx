export default function PerformanceChart({ data }) {
    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4">Last 30 Days</h4>
            <div className="space-y-4">
                {/* Simple bar chart */}
                <div className="flex items-end gap-1 h-40 overflow-x-auto pb-2">
                    {data.map((day, index) => {
                        const maxViews = Math.max(...data.map(d => d.views), 1);
                        const heightPercent = (day.views / maxViews) * 100;
                        const heightPx = Math.max((heightPercent / 100) * 160, 4); // 160px = h-40
                        return (
                            <div
                                key={index}
                                className="flex-shrink-0 w-6 group relative h-full flex items-end"
                            >
                                <div
                                    className={`rounded-t w-full transition-all ${
                                        day.views > 0 
                                            ? 'bg-orange-500 hover:bg-orange-600' 
                                            : 'bg-gray-200'
                                    }`}
                                    style={{ height: `${heightPx}px` }}
                                />
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {day.formatted_date}: {day.views} views
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                    <span>{data[0]?.formatted_date}</span>
                    <span>{data[data.length - 1]?.formatted_date}</span>
                </div>
            </div>
        </div>
    );
}

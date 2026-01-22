export default function DailyBreakdownTable({ data }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Daily Breakdown (Last 14 Days)</h4>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase">Views</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase">Clicks</th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase">CTR</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {data.length > 0 ? (
                            [...data].reverse().slice(0, 14).map((day, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">{day.formatted_date}</td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right font-medium text-gray-900">{day.views}</td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right font-medium text-blue-600">{day.clicks}</td>
                                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right font-medium text-green-600">{day.ctr}%</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-3 sm:px-4 py-6 sm:py-8 text-center text-gray-500 text-xs sm:text-sm">
                                    No data available yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

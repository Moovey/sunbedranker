export default function DailyBreakdownTable({ data }) {
    return (
        <div>
            <h4 className="font-bold text-gray-800 mb-4">Daily Breakdown (Last 30 Days)</h4>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                            <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">Views</th>
                            <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">Clicks</th>
                            <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">CTR</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {data.length > 0 ? (
                            [...data].reverse().slice(0, 14).map((day, index) => (
                                <tr key={index} className="hover:bg-orange-50">
                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{day.formatted_date}</td>
                                    <td className="px-4 py-3 text-sm text-right font-bold text-gray-900">{day.views}</td>
                                    <td className="px-4 py-3 text-sm text-right font-bold text-blue-600">{day.clicks}</td>
                                    <td className="px-4 py-3 text-sm text-right font-bold text-green-600">{day.ctr}%</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
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

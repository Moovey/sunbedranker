// StatCard Component
// Displays a statistic with icon and colored background

export default function StatCard({ label, value, icon, color }) {
    const colorClasses = {
        yellow: 'bg-yellow-50 text-yellow-600',
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
        green: 'bg-green-50 text-green-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        red: 'bg-red-50 text-red-600',
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${colorClasses[color] || colorClasses.blue}`}>
                    {icon}
                </div>
                <div>
                    <div className="text-xl font-bold text-gray-900">{value}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                </div>
            </div>
        </div>
    );
}

export default function ClickBreakdownCard({ title, icon, value, percent, description, color }) {
    // Clean color palette
    const colorClasses = {
        orange: {
            bg: 'bg-orange-50',
            title: 'text-gray-900',
            value: 'text-gray-900',
            progressBg: 'bg-orange-100',
            progressFill: 'bg-orange-500',
            percent: 'text-orange-600',
            description: 'text-gray-500',
        },
        blue: {
            bg: 'bg-blue-50',
            title: 'text-gray-900',
            value: 'text-gray-900',
            progressBg: 'bg-blue-100',
            progressFill: 'bg-blue-500',
            percent: 'text-blue-600',
            description: 'text-gray-500',
        },
        green: {
            bg: 'bg-green-50',
            title: 'text-gray-900',
            value: 'text-gray-900',
            progressBg: 'bg-green-100',
            progressFill: 'bg-green-500',
            percent: 'text-green-600',
            description: 'text-gray-500',
        },
        purple: {
            bg: 'bg-purple-50',
            title: 'text-gray-900',
            value: 'text-gray-900',
            progressBg: 'bg-purple-100',
            progressFill: 'bg-purple-500',
            percent: 'text-purple-600',
            description: 'text-gray-500',
        },
    };

    const colors = colorClasses[color] || colorClasses.blue;

    return (
        <div className={`${colors.bg} rounded-xl p-3 sm:p-4 md:p-5`}>
            <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
                <h4 className={`font-semibold text-xs sm:text-sm ${colors.title}`}>{title}</h4>
                {typeof icon === 'string' ? <span className="text-lg sm:text-xl">{icon}</span> : <span className="[&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6 flex-shrink-0">{icon}</span>}
            </div>
            <div className={`text-2xl sm:text-3xl font-bold ${colors.value} mb-2`}>
                {value.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
                <div className={`flex-1 ${colors.progressBg} rounded-full h-1.5 sm:h-2`}>
                    <div 
                        className={`${colors.progressFill} h-1.5 sm:h-2 rounded-full transition-all`}
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <span className={`text-xs sm:text-sm font-semibold ${colors.percent}`}>{percent}%</span>
            </div>
            <p className={`text-xs ${colors.description} mt-2`}>{description}</p>
        </div>
    );
}

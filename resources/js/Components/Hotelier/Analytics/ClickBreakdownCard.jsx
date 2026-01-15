export default function ClickBreakdownCard({ title, icon, value, percent, description, color }) {
    // Consistent 4-color palette matching homepage (orange, blue, green, purple)
    const colorClasses = {
        orange: {
            bg: 'from-orange-50 to-orange-100',
            border: 'border-orange-200',
            title: 'text-orange-800',
            value: 'text-orange-900',
            progressBg: 'bg-orange-200',
            progressFill: 'bg-orange-600',
            percent: 'text-orange-700',
            description: 'text-orange-600',
        },
        blue: {
            bg: 'from-blue-50 to-blue-100',
            border: 'border-blue-200',
            title: 'text-blue-800',
            value: 'text-blue-900',
            progressBg: 'bg-blue-200',
            progressFill: 'bg-blue-600',
            percent: 'text-blue-700',
            description: 'text-blue-600',
        },
        green: {
            bg: 'from-green-50 to-green-100',
            border: 'border-green-200',
            title: 'text-green-800',
            value: 'text-green-900',
            progressBg: 'bg-green-200',
            progressFill: 'bg-green-600',
            percent: 'text-green-700',
            description: 'text-green-600',
        },
        purple: {
            bg: 'from-purple-50 to-purple-100',
            border: 'border-purple-200',
            title: 'text-purple-800',
            value: 'text-purple-900',
            progressBg: 'bg-purple-200',
            progressFill: 'bg-purple-600',
            percent: 'text-purple-700',
            description: 'text-purple-600',
        },
    };

    const colors = colorClasses[color] || colorClasses.blue;

    return (
        <div className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-6 border-2 ${colors.border}`}>
            <div className="flex items-center justify-between mb-4">
                <h4 className={`font-bold ${colors.title}`}>{title}</h4>
                {typeof icon === 'string' ? <span className="text-2xl">{icon}</span> : icon}
            </div>
            <div className={`text-4xl font-black ${colors.value} mb-2`}>
                {value.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
                <div className={`flex-1 ${colors.progressBg} rounded-full h-2`}>
                    <div 
                        className={`${colors.progressFill} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <span className={`text-sm font-bold ${colors.percent}`}>{percent}%</span>
            </div>
            <p className={`text-xs ${colors.description} mt-2`}>{description}</p>
        </div>
    );
}

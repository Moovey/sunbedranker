export default function InfoBox({ color, title, icon, items }) {
    // Consistent 4-color palette matching homepage (orange, blue, green, purple)
    const colorClasses = {
        orange: {
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            title: 'text-orange-800',
            text: 'text-orange-700',
        },
        blue: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            title: 'text-blue-800',
            text: 'text-blue-700',
        },
        green: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            title: 'text-green-800',
            text: 'text-green-700',
        },
        purple: {
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            title: 'text-purple-800',
            text: 'text-purple-700',
        },
    };

    const colors = colorClasses[color] || colorClasses.blue;

    return (
        <div className={`${colors.bg} rounded-xl p-5 border ${colors.border}`}>
            <h4 className={`font-bold ${colors.title} mb-2 flex items-center gap-2`}>
                {icon}
                {title}
            </h4>
            <ul className={`text-sm ${colors.text} space-y-1`}>
                {items.map((item, index) => (
                    <li key={index}>• {item}</li>
                ))}
            </ul>
        </div>
    );
}

export default function SummaryCard({ icon, title, value, description }) {
    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
                {typeof icon === 'string' ? <span className="text-2xl">{icon}</span> : icon}
                <span className="font-semibold text-gray-700 text-sm">{title}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
                {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
    );
}

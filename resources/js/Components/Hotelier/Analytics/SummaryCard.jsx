export default function SummaryCard({ icon, title, value, description }) {
    return (
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
                {typeof icon === 'string' ? <span className="text-2xl">{icon}</span> : icon}
                <span className="font-bold text-gray-800">{title}</span>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-1">
                {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
    );
}

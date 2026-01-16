export default function PeriodCard({ title, value, icon, highlight = false }) {
    return (
        <div className={`rounded-xl p-4 ${
            highlight 
                ? 'bg-orange-50'
                : 'bg-white border border-gray-100 shadow-sm'
        }`}>
            <div className="flex items-center gap-2 mb-2">
                {typeof icon === 'string' ? <span>{icon}</span> : icon}
                <span className="text-sm font-medium text-gray-600">{title}</span>
            </div>
            <div className={`text-2xl font-bold ${highlight ? 'text-orange-600' : 'text-gray-900'}`}>
                {value.toLocaleString()}
            </div>
        </div>
    );
}

export default function PeriodCard({ title, value, icon, highlight = false }) {
    return (
        <div className={`rounded-xl p-4 border-2 ${
            highlight 
                ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300'
                : 'bg-white border-gray-200'
        }`}>
            <div className="flex items-center gap-2 mb-2">
                {typeof icon === 'string' ? <span>{icon}</span> : icon}
                <span className="text-sm font-bold text-gray-600">{title}</span>
            </div>
            <div className={`text-2xl font-black ${highlight ? 'text-orange-600' : 'text-gray-900'}`}>
                {value.toLocaleString()}
            </div>
        </div>
    );
}

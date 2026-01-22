export default function PeriodCard({ title, value, icon, highlight = false }) {
    return (
        <div className={`rounded-xl p-3 sm:p-4 ${
            highlight 
                ? 'bg-orange-50'
                : 'bg-white border border-gray-100 shadow-sm'
        }`}>
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                {typeof icon === 'string' ? <span>{icon}</span> : <span className="[&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4">{icon}</span>}
                <span className="text-xs sm:text-sm font-medium text-gray-600">{title}</span>
            </div>
            <div className={`text-xl sm:text-2xl font-bold ${highlight ? 'text-orange-600' : 'text-gray-900'}`}>
                {value.toLocaleString()}
            </div>
        </div>
    );
}

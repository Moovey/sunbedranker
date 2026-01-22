export default function SummaryCard({ icon, title, value, description }) {
    return (
        <div className="bg-white rounded-xl p-3 sm:p-4 md:p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                {typeof icon === 'string' ? <span className="text-xl sm:text-2xl">{icon}</span> : <span className="[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">{icon}</span>}
                <span className="font-semibold text-gray-700 text-xs sm:text-sm">{title}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
    );
}

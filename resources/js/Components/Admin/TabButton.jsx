// TabButton Component
// Tab navigation button with optional badge

export default function TabButton({ active, onClick, children, badge }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-all flex items-center gap-2 ${
                active
                    ? 'bg-white text-orange-600 border-t border-l border-r border-gray-200 -mb-px'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
        >
            {children}
            {badge > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-orange-500 text-white rounded-full">
                    {badge}
                </span>
            )}
        </button>
    );
}

export default function TabButton({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-t-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                active
                    ? 'bg-white text-orange-600 border-b-2 border-orange-500 -mb-px'
                    : 'text-gray-500 hover:text-gray-700'
            }`}
        >
            {children}
        </button>
    );
}

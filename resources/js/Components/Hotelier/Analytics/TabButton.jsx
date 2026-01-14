export default function TabButton({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                active
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
            {children}
        </button>
    );
}

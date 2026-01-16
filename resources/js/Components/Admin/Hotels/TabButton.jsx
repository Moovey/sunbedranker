export default function TabButton({ active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                active
                    ? 'bg-white text-orange-600 border border-gray-100 border-b-white -mb-px'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
        >
            {children}
        </button>
    );
}

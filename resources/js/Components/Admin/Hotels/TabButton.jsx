export default function TabButton({ active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
                active
                    ? 'text-neutral-900 border-b-2 border-neutral-900'
                    : 'text-neutral-600 hover:text-neutral-900'
            }`}
        >
            {children}
        </button>
    );
}

export default function TabButton({ active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 ${
                active
                    ? 'bg-white text-orange-600 border border-slate-200 border-b-white -mb-px shadow-[0_-1px_2px_rgba(15,23,42,0.03)]'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/70'
            }`}
        >
            {children}
            {active && (
                <span className="pointer-events-none absolute left-3 right-3 top-0 h-0.5 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400" />
            )}
        </button>
    );
}

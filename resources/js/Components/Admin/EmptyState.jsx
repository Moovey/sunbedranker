// EmptyState Component
// Displays when no data is available

export default function EmptyState({ icon, title, description }) {
    return (
        <div className="p-12 text-center">
            <div className="w-12 h-12 text-gray-300 mx-auto mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
            <p className="text-gray-500 text-sm">{description}</p>
        </div>
    );
}

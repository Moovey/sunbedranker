// StatusBadge Component
// Displays status with appropriate styling

export default function StatusBadge({ status }) {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-700',
        approved: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
        active: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700',
        expired: 'bg-gray-100 text-gray-600',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.pending}`}>
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </span>
    );
}

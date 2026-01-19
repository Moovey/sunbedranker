// Admin Helper Functions
// Reusable utility functions for admin dashboard

/**
 * Format large numbers with K/M suffix
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toLocaleString() || '0';
}

/**
 * Format date string to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

/**
 * Format date with time
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date and time string
 */
export function formatDateTime(dateString) {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Get status badge styling classes
 * @param {string} status - Status value
 * @returns {string} Tailwind CSS classes
 */
export function getStatusClasses(status) {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-700',
        approved: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
        active: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700',
        expired: 'bg-gray-100 text-gray-600',
    };
    return styles[status] || styles.pending;
}

/**
 * Get tier badge styling classes
 * @param {string} tier - Tier value
 * @returns {string} Tailwind CSS classes
 */
export function getTierClasses(tier) {
    const styles = {
        premium: 'bg-purple-100 text-purple-700 border-purple-200',
        enhanced: 'bg-orange-100 text-orange-700 border-orange-200',
        free: 'bg-gray-100 text-gray-600 border-gray-200',
    };
    return styles[tier] || styles.free;
}

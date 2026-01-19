// TierBadge Component
// Displays subscription tier with appropriate styling and icon

import { CrownIcon, StarIcon } from './Icons';

export default function TierBadge({ tier }) {
    const styles = {
        premium: 'bg-purple-100 text-purple-700 border-purple-200',
        enhanced: 'bg-orange-100 text-orange-700 border-orange-200',
        free: 'bg-gray-100 text-gray-600 border-gray-200',
    };

    const icons = {
        premium: <CrownIcon className="w-3 h-3" />,
        enhanced: <StarIcon className="w-3 h-3" />,
        free: null,
    };

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[tier] || styles.free}`}>
            {icons[tier]}
            {tier?.charAt(0).toUpperCase() + tier?.slice(1) || 'Free'}
        </span>
    );
}

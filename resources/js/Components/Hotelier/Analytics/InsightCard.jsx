import { Link } from '@inertiajs/react';

export default function InsightCard({ icon, text, isAction = false, actionLink, actionText }) {
    return (
        <div className="flex items-start gap-3 bg-white rounded-lg p-3 border border-blue-100">
            <span className="text-xl flex-shrink-0">{icon}</span>
            <div className="flex-1">
                <p className="text-sm text-gray-700">{text}</p>
                {isAction && actionLink && (
                    <Link
                        href={actionLink}
                        className="inline-block mt-2 text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                        {actionText} →
                    </Link>
                )}
            </div>
        </div>
    );
}

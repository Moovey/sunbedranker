export default function BadgesTab({ hotel, autoAssignBadges }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-light text-neutral-900">Hotel Badges</h2>
                <button
                    onClick={autoAssignBadges}
                    className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 font-light transition-all duration-300"
                >
                    Auto-Assign Badges
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotel.badges?.map(badge => (
                    <div key={badge.id} className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
                                style={{ backgroundColor: badge.color }}
                            >
                                {badge.icon || '⭐'}
                            </div>
                            <div>
                                <h4 className="font-medium text-neutral-900">{badge.name}</h4>
                                <p className="text-sm text-neutral-600">{badge.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {hotel.badges?.length === 0 && (
                <p className="text-center text-neutral-500 py-8">
                    No badges assigned yet. Click "Auto-Assign Badges" to automatically assign based on criteria.
                </p>
            )}
        </div>
    );
}

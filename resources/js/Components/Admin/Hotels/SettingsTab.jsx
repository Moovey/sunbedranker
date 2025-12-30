export default function SettingsTab({ data, setData, errors }) {
    return (
        <div className="space-y-6">
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 mb-6">Hotel Settings</h2>
            
            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    Subscription Tier
                </label>
                <select
                    value={data.subscription_tier}
                    onChange={e => setData('subscription_tier', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                >
                    <option value="free">Free</option>
                    <option value="enhanced">Enhanced</option>
                    <option value="premium">Premium</option>
                </select>
                {errors.subscription_tier && <p className="mt-1 text-sm text-red-600 font-light">{errors.subscription_tier}</p>}
            </div>

            <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={data.is_active}
                        onChange={e => setData('is_active', e.target.checked)}
                        className="w-5 h-5 rounded border-neutral-300 text-neutral-900 focus:ring-2 focus:ring-blue-500"
                    />
                    <div>
                        <span className="text-sm font-light text-neutral-900 tracking-wide">Active</span>
                        <p className="text-xs text-neutral-500 font-light">Hotel is visible and bookable on the site</p>
                    </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={data.is_verified}
                        onChange={e => setData('is_verified', e.target.checked)}
                        className="w-5 h-5 rounded border-neutral-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <div>
                        <span className="text-sm font-light text-neutral-900 tracking-wide">Verified</span>
                        <p className="text-xs text-neutral-500 font-light">Hotel information has been verified</p>
                    </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={data.is_featured}
                        onChange={e => setData('is_featured', e.target.checked)}
                        className="w-5 h-5 rounded border-neutral-300 text-orange-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <div>
                        <span className="text-sm font-light text-neutral-900 tracking-wide">Featured</span>
                        <p className="text-xs text-neutral-500 font-light">Highlight this hotel in listings and homepage</p>
                    </div>
                </label>
            </div>
        </div>
    );
}

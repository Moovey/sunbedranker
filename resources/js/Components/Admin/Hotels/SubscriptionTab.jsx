export default function SubscriptionTab({ data, setData, updateSubscription }) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-light text-neutral-900 mb-6">Subscription Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Subscription Tier
                    </label>
                    <select
                        value={data.subscription_tier}
                        onChange={e => setData('subscription_tier', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="free">Free</option>
                        <option value="enhanced">Enhanced</option>
                        <option value="premium">Premium</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Subscription Expires At
                    </label>
                    <input
                        type="datetime-local"
                        value={data.subscription_expires_at}
                        onChange={e => setData('subscription_expires_at', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="bg-neutral-50 p-6 rounded-lg">
                <h4 className="text-sm font-medium text-neutral-900 mb-4">Subscription Benefits</h4>
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${data.subscription_tier === 'free' ? 'bg-neutral-400' : data.subscription_tier === 'enhanced' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                        <div>
                            <p className="text-sm font-medium">
                                {data.subscription_tier === 'free' && 'Free Tier'}
                                {data.subscription_tier === 'enhanced' && 'Enhanced Tier'}
                                {data.subscription_tier === 'premium' && 'Premium Tier'}
                            </p>
                            <p className="text-sm text-neutral-600">
                                {data.subscription_tier === 'free' && 'Basic listing with limited features'}
                                {data.subscription_tier === 'enhanced' && 'Featured in search results, priority support'}
                                {data.subscription_tier === 'premium' && 'Top placement, custom branding, analytics'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={updateSubscription}
                    className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
                >
                    Update Subscription
                </button>
            </div>
        </div>
    );
}

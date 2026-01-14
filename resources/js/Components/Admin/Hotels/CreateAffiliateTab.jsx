export default function CreateAffiliateTab({ data, setData, errors }) {
    return (
        <div className="space-y-6">
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 mb-6">Affiliate & Booking Links</h2>
            
            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    Booking.com Affiliate URL
                </label>
                <input
                    type="url"
                    value={data.booking_affiliate_url}
                    onChange={e => setData('booking_affiliate_url', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    placeholder="https://booking.com/..."
                />
                {errors.booking_affiliate_url && <p className="mt-1 text-sm text-red-600 font-light">{errors.booking_affiliate_url}</p>}
            </div>

            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    Expedia Affiliate URL
                </label>
                <input
                    type="url"
                    value={data.expedia_affiliate_url}
                    onChange={e => setData('expedia_affiliate_url', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    placeholder="https://expedia.com/..."
                />
                {errors.expedia_affiliate_url && <p className="mt-1 text-sm text-red-600 font-light">{errors.expedia_affiliate_url}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Affiliate Provider
                    </label>
                    <input
                        type="text"
                        value={data.affiliate_provider}
                        onChange={e => setData('affiliate_provider', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    />
                    {errors.affiliate_provider && <p className="mt-1 text-sm text-red-600 font-light">{errors.affiliate_provider}</p>}
                </div>

                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Affiliate Tracking Code
                    </label>
                    <input
                        type="text"
                        value={data.affiliate_tracking_code}
                        onChange={e => setData('affiliate_tracking_code', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    />
                    {errors.affiliate_tracking_code && <p className="mt-1 text-sm text-red-600 font-light">{errors.affiliate_tracking_code}</p>}
                </div>
            </div>
        </div>
    );
}

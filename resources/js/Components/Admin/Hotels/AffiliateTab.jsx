export default function AffiliateTab({ hotel, data, setData, errors, processing, handleSubmit }) {
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

            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    Direct Booking URL
                </label>
                <input
                    type="url"
                    value={data.direct_booking_url}
                    onChange={e => setData('direct_booking_url', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    placeholder="https://..."
                />
                {errors.direct_booking_url && <p className="mt-1 text-sm text-red-600 font-light">{errors.direct_booking_url}</p>}
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

            <div className="bg-neutral-50 p-4 rounded-lg mt-6">
                <h4 className="text-sm font-medium text-neutral-900 mb-2">Performance Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-neutral-600">Total Clicks</p>
                        <p className="text-2xl font-light text-neutral-900">{hotel.click_count || 0}</p>
                    </div>
                    <div>
                        <p className="text-sm text-neutral-600">Total Revenue</p>
                        <p className="text-2xl font-light text-neutral-900">
                            ${(parseFloat(hotel.affiliate_revenue) || 0).toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 flex justify-end">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={processing}
                    className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 font-light transition-all duration-300 tracking-wide hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}

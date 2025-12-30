export default function ContactLocationTab({ data, setData, errors }) {
    return (
        <div className="space-y-6">
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 mb-6">Contact & Location</h2>
            
            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    Address
                </label>
                <textarea
                    value={data.address}
                    onChange={e => setData('address', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    placeholder="Full address of the hotel..."
                />
                {errors.address && <p className="mt-1 text-sm text-red-600 font-light">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Latitude
                    </label>
                    <input
                        type="text"
                        value={data.latitude}
                        onChange={e => setData('latitude', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                        placeholder="e.g., 5.2334"
                    />
                    {errors.latitude && <p className="mt-1 text-sm text-red-600 font-light">{errors.latitude}</p>}
                </div>

                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Longitude
                    </label>
                    <input
                        type="text"
                        value={data.longitude}
                        onChange={e => setData('longitude', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                        placeholder="e.g., 73.0297"
                    />
                    {errors.longitude && <p className="mt-1 text-sm text-red-600 font-light">{errors.longitude}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Phone
                    </label>
                    <input
                        type="tel"
                        value={data.phone}
                        onChange={e => setData('phone', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600 font-light">{errors.phone}</p>}
                </div>

                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600 font-light">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Website
                    </label>
                    <input
                        type="url"
                        value={data.website}
                        onChange={e => setData('website', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                        placeholder="https://..."
                    />
                    {errors.website && <p className="mt-1 text-sm text-red-600 font-light">{errors.website}</p>}
                </div>
            </div>
        </div>
    );
}

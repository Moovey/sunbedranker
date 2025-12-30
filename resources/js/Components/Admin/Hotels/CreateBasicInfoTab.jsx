export default function CreateBasicInfoTab({ data, setData, errors, destinations }) {
    return (
        <div className="space-y-6">
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 mb-6">Basic Information</h2>
            
            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    Hotel Name *
                </label>
                <input
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600 font-light">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    Destination *
                </label>
                <select
                    value={data.destination_id}
                    onChange={e => setData('destination_id', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    required
                >
                    <option value="">Select a destination</option>
                    {destinations.map(dest => (
                        <option key={dest.id} value={dest.id}>{dest.name}</option>
                    ))}
                </select>
                {errors.destination_id && <p className="mt-1 text-sm text-red-600 font-light">{errors.destination_id}</p>}
            </div>

            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    Description
                </label>
                <textarea
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    placeholder="Describe the hotel, its amenities, and unique features..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-600 font-light">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Star Rating
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.5"
                        value={data.star_rating}
                        onChange={e => setData('star_rating', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    />
                    {errors.star_rating && <p className="mt-1 text-sm text-red-600 font-light">{errors.star_rating}</p>}
                </div>

                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Total Rooms
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={data.total_rooms}
                        onChange={e => setData('total_rooms', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    />
                    {errors.total_rooms && <p className="mt-1 text-sm text-red-600 font-light">{errors.total_rooms}</p>}
                </div>
            </div>
        </div>
    );
}

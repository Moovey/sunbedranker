import { Link } from '@inertiajs/react';

export default function BasicInfoTab({ data, setData, errors, processing, destinations, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Hotel Name *
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Destination *
                    </label>
                    <select
                        value={data.destination_id}
                        onChange={e => setData('destination_id', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Destination</option>
                        {destinations.map(dest => (
                            <option key={dest.id} value={dest.id}>{dest.name}</option>
                        ))}
                    </select>
                    {errors.destination_id && <p className="mt-1 text-sm text-red-600">{errors.destination_id}</p>}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Description
                    </label>
                    <textarea
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        value={data.address}
                        onChange={e => setData('address', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Latitude
                    </label>
                    <input
                        type="text"
                        value={data.latitude}
                        onChange={e => setData('latitude', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 5.2334"
                    />
                    {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Longitude
                    </label>
                    <input
                        type="text"
                        value={data.longitude}
                        onChange={e => setData('longitude', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 73.0297"
                    />
                    {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Star Rating
                    </label>
                    <select
                        value={data.star_rating}
                        onChange={e => setData('star_rating', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Rating</option>
                        {[1, 2, 3, 4, 5].map(rating => (
                            <option key={rating} value={rating}>{rating} Star</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Total Rooms
                    </label>
                    <input
                        type="number"
                        value={data.total_rooms}
                        onChange={e => setData('total_rooms', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone
                    </label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={e => setData('phone', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Website
                    </label>
                    <input
                        type="url"
                        value={data.website}
                        onChange={e => setData('website', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Status Toggles */}
            <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Status Settings</h3>
                <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={e => setData('is_active', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-neutral-700">Active</span>
                    </label>
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.is_verified}
                            onChange={e => setData('is_verified', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-neutral-700">Verified</span>
                    </label>
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.is_featured}
                            onChange={e => setData('is_featured', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-neutral-700">Featured</span>
                    </label>
                </div>
            </div>

            {/* Override Flags */}
            <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Override Settings</h3>
                <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.override_name}
                            onChange={e => setData('override_name', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-neutral-700">Override Name (Don't update from API)</span>
                    </label>
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.override_images}
                            onChange={e => setData('override_images', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-neutral-700">Override Images</span>
                    </label>
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.override_description}
                            onChange={e => setData('override_description', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-neutral-700">Override Description</span>
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-neutral-200">
                <Link
                    href={route('admin.hotels.index')}
                    className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-50"
                >
                    {processing ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}

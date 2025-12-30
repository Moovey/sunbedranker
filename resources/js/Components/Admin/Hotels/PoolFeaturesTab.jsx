import MultiSelectField from './MultiSelectField';

export default function PoolFeaturesTab({ data, setData, errors, processing, handleSubmit }) {
    const poolOverviewOptions = [
        'Sun all day', 'Plenty of shade', 'Sun all day with shaded areas', 'Morning sun, afternoon shade', 
        'Afternoon sun, morning shade', 'Full sun exposure', 'Partially shaded throughout day', 
        'Natural palm tree shade', 'Cabanas and umbrellas available', 'Mix of sun and shade areas'
    ];

    const poolDetailsOptions = [
        'Infinity pool with ocean views', 'Multiple pools including infinity edge', 'Rooftop pool with city views',
        'Lagoon-style pool with swim-up bar', 'Olympic-sized lap pool', 'Temperature-controlled pool year-round',
        'Adults-only pool available', 'Standard outdoor pool'
    ];

    const shadeOptions = [
        'Umbrellas', 'Cabanas', 'Pergolas', 'Natural palm trees', 'Covered areas', 
        'Retractable awnings', 'Shade sails', 'No shade available'
    ];

    const specialFeaturesOptions = [
        'Swim-up bar', 'Infinity edge', 'Waterfall', 'Lazy river', 'Water slides', 
        'Hot tub/Jacuzzi', 'Poolside DJ', 'Beach access', 'Underwater music', 
        'LED lighting', 'Heated pool', 'Saltwater pool', 'Private pool areas', 
        'Poolside cabanas with service'
    ];

    const atmosphereOptions = [
        'Lively and social with DJ and entertainment', 'Upbeat party atmosphere', 'Relaxed and tranquil escape',
        'Romantic and intimate setting', 'Family-friendly and energetic', 'Sophisticated and elegant',
        'Adults-only peaceful retreat', 'Casual and laid-back'
    ];

    const familyFeaturesOptions = [
        'Excellent - Kids pool, splash pad, kids club, babysitting', 
        'Very Good - Kids pool, kids club, family rooms',
        'Good - Kids pool and family-friendly amenities', 
        'Limited - Basic family facilities available',
        'Adults-only - No children facilities'
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 mb-6">Pool & Features</h2>
            
            <MultiSelectField
                label="Pool & Sun Overview (Select all that apply)"
                options={poolOverviewOptions}
                selectedValues={data.pool_overview}
                onChange={(values) => setData('pool_overview', values)}
                customValue={data.pool_overview_other}
                onCustomChange={(value) => setData('pool_overview_other', value)}
                onAdd={() => {}}
                error={errors.pool_overview}
            />

            <MultiSelectField
                label="Pool Details (Select all that apply)"
                options={poolDetailsOptions}
                selectedValues={data.pool_details}
                onChange={(values) => setData('pool_details', values)}
                customValue={data.pool_details_other}
                onCustomChange={(value) => setData('pool_details_other', value)}
                onAdd={() => {}}
                error={errors.pool_details}
            />

            {/* Sun Exposure & Number of Pools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Sun Exposure
                    </label>
                    <select
                        value={data.sun_exposure}
                        onChange={e => setData('sun_exposure', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    >
                        <option value="">Select sun exposure</option>
                        <option value="All day sun">All day sun</option>
                        <option value="Morning sun">Morning sun</option>
                        <option value="Afternoon sun">Afternoon sun</option>
                        <option value="Partial sun">Partial sun</option>
                        <option value="Mostly shaded">Mostly shaded</option>
                    </select>
                    {errors.sun_exposure && <p className="mt-1 text-sm text-red-600 font-light">{errors.sun_exposure}</p>}
                </div>

                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Number of Pools
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={data.number_of_pools}
                        onChange={e => setData('number_of_pools', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                        placeholder="e.g., 3"
                    />
                    {errors.number_of_pools && <p className="mt-1 text-sm text-red-600 font-light">{errors.number_of_pools}</p>}
                </div>
            </div>

            <MultiSelectField
                label="Shade Options (Select all that apply)"
                options={shadeOptions}
                selectedValues={data.shade_options}
                onChange={(values) => setData('shade_options', values)}
                customValue={data.shade_options_other}
                onCustomChange={(value) => setData('shade_options_other', value)}
                onAdd={() => {}}
                error={errors.shade_options}
            />

            <MultiSelectField
                label="Special Features (Select all that apply)"
                options={specialFeaturesOptions}
                selectedValues={data.special_features}
                onChange={(values) => setData('special_features', values)}
                customValue={data.special_features_other}
                onCustomChange={(value) => setData('special_features_other', value)}
                onAdd={() => {}}
                error={errors.special_features}
            />

            <MultiSelectField
                label="Atmosphere & Vibe (Select all that apply)"
                options={atmosphereOptions}
                selectedValues={data.atmosphere_vibe}
                onChange={(values) => setData('atmosphere_vibe', values)}
                customValue={data.atmosphere_vibe_other}
                onCustomChange={(value) => setData('atmosphere_vibe_other', value)}
                onAdd={() => {}}
                error={errors.atmosphere_vibe}
            />

            <MultiSelectField
                label="Family Features (Select all that apply)"
                options={familyFeaturesOptions}
                selectedValues={data.family_features}
                onChange={(values) => setData('family_features', values)}
                customValue={data.family_features_other}
                onCustomChange={(value) => setData('family_features_other', value)}
                onAdd={() => {}}
                error={errors.family_features}
            />

            <div className="flex justify-end pt-6 border-t border-neutral-200">
                <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 font-light transition-all duration-300 tracking-wide hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}

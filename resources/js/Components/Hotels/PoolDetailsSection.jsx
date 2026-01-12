import { MetricCard, FeatureBadge } from './ui';
import { Icons } from './Icons';
import { formatSunExposure, getSunExposureDescription, getSunbedRatioText, hasPoolFeatures } from './utils/hotelHelpers';

// ============================================
// POOL DETAILS METRICS SECTION
// ============================================
export function PoolDetailsMetrics({ poolCriteria }) {
    if (!poolCriteria) return null;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                <Icons.Grid className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                Pool Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
                {/* Sunbed Info */}
                {poolCriteria.sunbed_to_guest_ratio && (
                    <MetricCard
                        icon={<Icons.Sunbed className="w-5 h-5 sm:w-6 sm:h-6" />}
                        label="Sunbed Availability"
                        value={`${poolCriteria.sunbed_to_guest_ratio}:1 ratio`}
                        description={getSunbedRatioText(poolCriteria.sunbed_to_guest_ratio)}
                        highlight={poolCriteria.sunbed_to_guest_ratio >= 0.75}
                    />
                )}

                {/* Sun Exposure */}
                {poolCriteria.sun_exposure && (
                    <MetricCard
                        icon={<Icons.Sun className="w-5 h-5 sm:w-6 sm:h-6" />}
                        label="Sun Exposure"
                        value={formatSunExposure(poolCriteria.sun_exposure)}
                        description={getSunExposureDescription(poolCriteria.sun_exposure)}
                    />
                )}

                {/* Number of Pools */}
                <MetricCard
                    icon={<Icons.ThumbsUp className="w-5 h-5 sm:w-6 sm:h-6" />}
                    label="Number of Pools"
                    value={poolCriteria.number_of_pools || 1}
                />

                {/* Pool Size */}
                {poolCriteria.pool_size_sqm && (
                    <MetricCard
                        icon={<Icons.Resize className="w-5 h-5 sm:w-6 sm:h-6" />}
                        label="Total Pool Size"
                        value={`${poolCriteria.pool_size_sqm} m²`}
                    />
                )}

                {/* Pool Depth */}
                {poolCriteria.max_depth_m && (
                    <MetricCard
                        icon={<Icons.Depth className="w-5 h-5 sm:w-6 sm:h-6" />}
                        label="Maximum Depth"
                        value={`${poolCriteria.max_depth_m} meters`}
                    />
                )}

                {/* Shade Availability */}
                {poolCriteria.has_shade_areas && (
                    <MetricCard
                        icon={<Icons.Flag className="w-5 h-5 sm:w-6 sm:h-6" />}
                        label="Shade Options"
                        value="Available"
                        description="Natural and artificial shade areas"
                    />
                )}
            </div>

            {/* Special Pool Features */}
            {hasPoolFeatures(poolCriteria) && (
                <SpecialPoolFeatures poolCriteria={poolCriteria} />
            )}
        </div>
    );
}

// ============================================
// SPECIAL POOL FEATURES COMPONENT
// ============================================
export function SpecialPoolFeatures({ poolCriteria }) {
    return (
        <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t-2 border-orange-200">
            <h3 className="font-sans font-bold text-gray-900 mb-4 text-base sm:text-lg flex items-center gap-2">
                <Icons.PoolStar className="w-5 h-5 text-orange-500" />
                Special Features
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {poolCriteria.has_infinity_pool && (
                    <FeatureBadge 
                        icon={<Icons.PoolWaves className="w-4 h-4" />} 
                        text="Infinity Pool" 
                        color="bg-blue-100 text-blue-700 border-2 border-blue-300" 
                    />
                )}
                {poolCriteria.has_rooftop_pool && (
                    <FeatureBadge 
                        icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>} 
                        text="Rooftop Pool" 
                        color="bg-purple-100 text-purple-700 border-2 border-purple-300" 
                    />
                )}
                {poolCriteria.has_heated_pool && (
                    <FeatureBadge 
                        icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>} 
                        text="Heated Pool" 
                        color="bg-orange-100 text-orange-700 border-2 border-orange-300" 
                    />
                )}
                {poolCriteria.has_pool_bar && (
                    <FeatureBadge 
                        icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 2l2.01 18.23C5.13 21.23 5.97 22 7 22h10c1.03 0 1.87-.77 1.99-1.77L21 2H3zm9 17c-1.66 0-3-1.34-3-3 0-2 3-5.4 3-5.4s3 3.4 3 5.4c0 1.66-1.34 3-3 3z"/></svg>} 
                        text="Pool Bar" 
                        color="bg-green-100 text-green-700 border-2 border-green-300" 
                    />
                )}
                {poolCriteria.has_lazy_river && (
                    <FeatureBadge 
                        icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16c.58-.45 1.27-.67 2-.67.73 0 1.42.22 2 .67.58-.45 1.27-.67 2-.67.73 0 1.42.22 2 .67.58-.45 1.27-.67 2-.67.73 0 1.42.22 2 .67V14c-.58-.45-1.27-.67-2-.67-.73 0-1.42.22-2 .67-.58-.45-1.27-.67-2-.67-.73 0-1.42.22-2 .67-.58-.45-1.27-.67-2-.67-.73 0-1.42.22-2 .67v2z"/></svg>} 
                        text="Lazy River" 
                        color="bg-cyan-100 text-cyan-700 border-2 border-cyan-300" 
                    />
                )}
                {poolCriteria.has_swim_up_bar && (
                    <FeatureBadge 
                        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 8h6m-5 0a3 3 0 110 6H9l3 7-3-7m1 0h6m-6 0L7 21m5-5h6m2 0l-2-5-2 5m2 0h2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>} 
                        text="Swim-up Bar" 
                        color="bg-teal-50 text-teal-800 border border-teal-200" 
                    />
                )}
            </div>
        </div>
    );
}

// ============================================
// SUNBED AVAILABILITY SECTION
// ============================================
export function SunbedAvailabilitySection({ poolCriteria }) {
    if (!poolCriteria?.sunbed_count && !poolCriteria?.sunbed_to_guest_ratio && !poolCriteria?.sunbed_types) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                <Icons.Sunbed className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                Sunbed Availability
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {poolCriteria.sunbed_count && (
                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <div className="text-2xl font-bold text-amber-700">{poolCriteria.sunbed_count}</div>
                        <div className="text-sm text-gray-700">Total Sunbeds</div>
                    </div>
                )}
                {poolCriteria.sunbed_to_guest_ratio && (
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                        <div className="text-2xl font-bold text-emerald-700">{poolCriteria.sunbed_to_guest_ratio}</div>
                        <div className="text-sm text-gray-700">Sunbed Ratio</div>
                    </div>
                )}
                {poolCriteria.sunbed_types && poolCriteria.sunbed_types.length > 0 && (
                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="text-sm font-semibold text-gray-900 mb-2">Sunbed Types:</div>
                        <div className="flex flex-wrap gap-2">
                            {poolCriteria.sunbed_types.map((type, i) => (
                                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium capitalize">
                                    {type.replace('_', ' ')}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// SUN EXPOSURE SECTION
// ============================================
export function SunExposureSection({ poolCriteria }) {
    if (!poolCriteria?.sun_exposure && (!poolCriteria?.sunny_areas || poolCriteria?.sunny_areas?.length === 0)) {
        return null;
    }

    // Format sunny area labels
    const formatSunnyArea = (area) => {
        return area.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                <Icons.Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                Sun Exposure & Orientation
            </h2>
            
            <div className="space-y-4">
                {/* Sun Exposure Level */}
                {poolCriteria.sun_exposure && (
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="text-sm text-gray-600 mb-1">Sun Exposure</div>
                        <div className="text-lg font-semibold text-yellow-800 capitalize">
                            {poolCriteria.sun_exposure.replace(/_/g, ' ')}
                        </div>
                    </div>
                )}

                {/* Sunny Areas */}
                {poolCriteria.sunny_areas && poolCriteria.sunny_areas.length > 0 && (
                    <div>
                        <div className="text-sm font-semibold text-gray-900 mb-3">Which Areas are Sunny:</div>
                        <div className="flex flex-wrap gap-2">
                            {poolCriteria.sunny_areas.map((area, i) => (
                                <span 
                                    key={i} 
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium border border-amber-200"
                                >
                                    <Icons.Sun className="w-4 h-4" />
                                    {formatSunnyArea(area)}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// POOL SIZE & VARIETY SECTION
// ============================================
export function PoolSizeSection({ poolCriteria }) {
    if (!poolCriteria?.pool_size_category && !poolCriteria?.total_pool_area_sqm && 
        !poolCriteria?.number_of_pools && !poolCriteria?.pool_types) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                <Icons.PoolSize className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                Pool Size & Variety
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {poolCriteria.pool_size_category && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-sm text-gray-600 mb-1">Pool Size</div>
                        <div className="text-lg font-semibold text-blue-700 capitalize">
                            {poolCriteria.pool_size_category.replace('_', ' ')}
                        </div>
                    </div>
                )}
                {poolCriteria.total_pool_area_sqm && (
                    <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                        <div className="text-sm text-gray-600 mb-1">Total Area</div>
                        <div className="text-lg font-semibold text-cyan-700">
                            {poolCriteria.total_pool_area_sqm} m²
                        </div>
                    </div>
                )}
                {poolCriteria.number_of_pools && (
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                        <div className="text-sm text-gray-600 mb-1">Number of Pools</div>
                        <div className="text-lg font-semibold text-indigo-700">
                            {poolCriteria.number_of_pools}
                        </div>
                    </div>
                )}
                {poolCriteria.pool_types && poolCriteria.pool_types.length > 0 && (
                    <div className="md:col-span-3">
                        <div className="text-sm font-semibold text-gray-900 mb-2">Pool Types:</div>
                        <div className="flex flex-wrap gap-2">
                            {poolCriteria.pool_types.map((type, i) => (
                                <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium capitalize">
                                    {type.replace('_', ' ')}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// FACILITIES & AMENITIES SECTION
// ============================================
export function FacilitiesSection({ poolCriteria }) {
    // Check if there's any data to display
    const hasData = poolCriteria?.has_pool_bar || 
                    poolCriteria?.has_waiter_service || 
                    (poolCriteria?.sunbed_types && poolCriteria.sunbed_types.length > 0) ||
                    (poolCriteria?.shade_options && poolCriteria.shade_options.length > 0) ||
                    poolCriteria?.bar_distance ||
                    poolCriteria?.toilet_distance;

    if (!hasData) return null;

    // Format labels for display
    const formatLabel = (value) => {
        if (!value) return '';
        return value.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    // Get distance description
    const getDistanceDescription = (distance) => {
        const descriptions = {
            'poolside': 'Poolside',
            'adjacent': 'Adjacent',
            'close': 'Close (<20m)',
            'moderate': 'Moderate (20-50m)',
            'far': 'Far (50m+)'
        };
        return descriptions[distance] || formatLabel(distance);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                <Icons.Facilities className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                Pool Facilities & Comfort
            </h2>
            
            <div className="space-y-6">
                {/* Sunbed Types */}
                {poolCriteria.sunbed_types && poolCriteria.sunbed_types.length > 0 && (
                    <div>
                        <div className="text-sm font-semibold text-gray-900 mb-3">Sunbed Types:</div>
                        <div className="flex flex-wrap gap-2">
                            {poolCriteria.sunbed_types.map((type, i) => (
                                <span 
                                    key={i} 
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium border border-amber-200"
                                >
                                    <Icons.Sunbed className="w-4 h-4" />
                                    {formatLabel(type)}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Shade Options */}
                {poolCriteria.shade_options && poolCriteria.shade_options.length > 0 && (
                    <div>
                        <div className="text-sm font-semibold text-gray-900 mb-3">Shade Options:</div>
                        <div className="flex flex-wrap gap-2">
                            {poolCriteria.shade_options.map((option, i) => (
                                <span 
                                    key={i} 
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200"
                                >
                                    <Icons.Shade className="w-4 h-4" />
                                    {formatLabel(option)}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Services & Amenities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {poolCriteria.has_pool_bar && (
                        <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                            <Icons.Check className="w-6 h-6 text-emerald-600" />
                            <span className="text-gray-900 font-medium">Pool Bar Available</span>
                        </div>
                    )}
                    {poolCriteria.has_waiter_service && (
                        <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg border border-teal-200">
                            <Icons.Check className="w-6 h-6 text-teal-600" />
                            <span className="text-gray-900 font-medium">Waiter Service</span>
                        </div>
                    )}
                </div>

                {/* Distances */}
                {(poolCriteria.bar_distance || poolCriteria.toilet_distance) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {poolCriteria.bar_distance && (
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="text-sm text-gray-600 mb-1">Distance to Bar</div>
                                <div className="text-lg font-semibold text-blue-700">
                                    {getDistanceDescription(poolCriteria.bar_distance)}
                                </div>
                            </div>
                        )}
                        {poolCriteria.toilet_distance && (
                            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                                <div className="text-sm text-gray-600 mb-1">Distance to Toilets</div>
                                <div className="text-lg font-semibold text-indigo-700">
                                    {getDistanceDescription(poolCriteria.toilet_distance)}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// ATMOSPHERE & VIBE SECTION
// ============================================
export function AtmosphereSection({ poolCriteria }) {
    // Check if there's any data to display
    const hasData = poolCriteria?.atmosphere || 
                    poolCriteria?.music_level || 
                    poolCriteria?.has_entertainment ||
                    (poolCriteria?.entertainment_types && poolCriteria.entertainment_types.length > 0);

    if (!hasData) return null;

    // Format label for display
    const formatLabel = (value) => {
        if (!value) return '';
        return value.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                <Icons.Atmosphere className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
                Noise & Atmosphere
            </h2>
            
            <div className="space-y-6">
                {/* Atmosphere & Music Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {poolCriteria.atmosphere && (
                        <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                            <div className="text-sm text-gray-600 mb-1">Pool Atmosphere/Vibe</div>
                            <div className="text-lg font-semibold text-pink-700 capitalize">
                                {formatLabel(poolCriteria.atmosphere)}
                            </div>
                        </div>
                    )}
                    {poolCriteria.music_level && (
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="text-sm text-gray-600 mb-1">Music Level</div>
                            <div className="text-lg font-semibold text-purple-700 capitalize">
                                {formatLabel(poolCriteria.music_level)}
                            </div>
                        </div>
                    )}
                </div>

                {/* Entertainment Activities */}
                {poolCriteria.has_entertainment && (
                    <div>
                        <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200 mb-4">
                            <Icons.Check className="w-6 h-6 text-orange-600" />
                            <span className="text-gray-900 font-medium">Has Entertainment Activities</span>
                        </div>
                        
                        {/* Entertainment Types */}
                        {poolCriteria.entertainment_types && poolCriteria.entertainment_types.length > 0 && (
                            <div>
                                <div className="text-sm font-semibold text-gray-900 mb-3">Entertainment Types:</div>
                                <div className="flex flex-wrap gap-2">
                                    {poolCriteria.entertainment_types.map((type, i) => (
                                        <span 
                                            key={i} 
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200"
                                        >
                                            <Icons.Music className="w-4 h-4" />
                                            {formatLabel(type)}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// CLEANLINESS & MAINTENANCE SECTION
// ============================================
export function CleanlinessSection({ poolCriteria }) {
    if (!poolCriteria?.cleanliness_rating && !poolCriteria?.sunbed_condition_rating && 
        !poolCriteria?.tiling_condition_rating) {
        return null;
    }

    const StarRating = ({ rating, colorClass }) => (
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < rating ? colorClass : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                <Icons.Cleanliness className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
                Cleanliness & Maintenance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {poolCriteria.cleanliness_rating > 0 && (
                    <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                        <div className="text-sm text-gray-600 mb-2">Cleanliness</div>
                        <StarRating rating={poolCriteria.cleanliness_rating} colorClass="text-teal-600" />
                    </div>
                )}
                {poolCriteria.sunbed_condition_rating > 0 && (
                    <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                        <div className="text-sm text-gray-600 mb-2">Sunbed Condition</div>
                        <StarRating rating={poolCriteria.sunbed_condition_rating} colorClass="text-cyan-600" />
                    </div>
                )}
                {poolCriteria.tiling_condition_rating > 0 && (
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                        <div className="text-sm text-gray-600 mb-2">Tiling Condition</div>
                        <StarRating rating={poolCriteria.tiling_condition_rating} colorClass="text-indigo-600" />
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// ACCESSIBILITY FEATURES SECTION
// ============================================
export function AccessibilitySection({ poolCriteria }) {
    if (!poolCriteria?.has_accessibility_ramp && !poolCriteria?.has_pool_hoist && 
        !poolCriteria?.has_step_free_access && !poolCriteria?.has_elevator_to_rooftop) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                <Icons.Accessibility className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                Accessibility Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {poolCriteria.has_accessibility_ramp && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <Icons.Check className="w-6 h-6 text-blue-600" />
                        <span className="text-gray-900 font-medium">Accessibility Ramp</span>
                    </div>
                )}
                {poolCriteria.has_pool_hoist && (
                    <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                        <Icons.Check className="w-6 h-6 text-indigo-600" />
                        <span className="text-gray-900 font-medium">Pool Hoist</span>
                    </div>
                )}
                {poolCriteria.has_step_free_access && (
                    <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                        <Icons.Check className="w-6 h-6 text-cyan-600" />
                        <span className="text-gray-900 font-medium">Step-Free Access</span>
                    </div>
                )}
                {poolCriteria.has_elevator_to_rooftop && (
                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <Icons.Check className="w-6 h-6 text-purple-600" />
                        <span className="text-gray-900 font-medium">Elevator to Rooftop</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// KIDS & FAMILY FEATURES SECTION
// ============================================
export function KidsFeaturesSection({ poolCriteria }) {
    if (!poolCriteria?.has_kids_pool && !poolCriteria?.has_splash_park && 
        !poolCriteria?.has_waterslide && !poolCriteria?.has_lifeguard) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                <Icons.Kids className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                Kids & Family Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {poolCriteria.has_kids_pool && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                        <Icons.Check className="w-6 h-6 text-green-600" />
                        <span className="text-gray-900 font-medium">Kids Pool</span>
                    </div>
                )}
                {poolCriteria.has_splash_park && (
                    <div className="flex items-center gap-3 p-4 bg-sky-50 rounded-lg border border-sky-200">
                        <Icons.Check className="w-6 h-6 text-sky-600" />
                        <span className="text-gray-900 font-medium">Splash Park</span>
                    </div>
                )}
                {poolCriteria.has_waterslide && (
                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <Icons.Check className="w-6 h-6 text-purple-600" />
                        <span className="text-gray-900 font-medium">Water Slides</span>
                    </div>
                )}
                {poolCriteria.has_lifeguard && (
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                        <Icons.Check className="w-6 h-6 text-emerald-600" />
                        <span className="text-gray-900 font-medium">Lifeguard on Duty</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// LUXURY & PREMIUM FEATURES SECTION
// ============================================
export function LuxuryFeaturesSection({ poolCriteria }) {
    if (!poolCriteria?.has_luxury_cabanas && !poolCriteria?.has_cabana_service && 
        !poolCriteria?.has_heated_pool && !poolCriteria?.has_jacuzzi && !poolCriteria?.has_adult_sun_terrace) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3">
                <Icons.Luxury className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                Luxury & Premium Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {poolCriteria.has_luxury_cabanas && (
                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <Icons.Check className="w-6 h-6 text-amber-600" />
                        <span className="text-gray-900 font-medium">Luxury Cabanas</span>
                    </div>
                )}
                {poolCriteria.has_cabana_service && (
                    <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <Icons.Check className="w-6 h-6 text-yellow-600" />
                        <span className="text-gray-900 font-medium">Cabana Service</span>
                    </div>
                )}
                {poolCriteria.has_heated_pool && (
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <Icons.Check className="w-6 h-6 text-orange-600" />
                        <span className="text-gray-900 font-medium">Heated Pool</span>
                    </div>
                )}
                {poolCriteria.has_jacuzzi && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                        <Icons.Check className="w-6 h-6 text-red-600" />
                        <span className="text-gray-900 font-medium">Jacuzzi</span>
                    </div>
                )}
                {poolCriteria.has_adult_sun_terrace && (
                    <div className="flex items-center gap-3 p-4 bg-rose-50 rounded-lg border border-rose-200">
                        <Icons.Check className="w-6 h-6 text-rose-600" />
                        <span className="text-gray-900 font-medium">Adult Sun Terrace</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PoolDetailsMetrics;

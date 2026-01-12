import { FeatureListItem } from './ui';
import { Icons } from './Icons';

// ============================================
// POOL OVERVIEW SECTION
// ============================================
export function PoolOverviewSection({ poolCriteria }) {
    if (!poolCriteria?.pool_overview || poolCriteria.pool_overview.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                <Icons.PoolStar className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                Pool & Sun Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {poolCriteria.pool_overview.map((item, index) => (
                    <FeatureListItem 
                        key={index} 
                        item={item} 
                        bgColor="bg-gray-50" 
                        borderColor="border-gray-200" 
                        iconColor="text-green-600" 
                    />
                ))}
            </div>
        </div>
    );
}

// ============================================
// POOL DETAILS SECTION (List)
// ============================================
export function PoolDetailsListSection({ poolCriteria }) {
    if (!poolCriteria?.pool_details || poolCriteria.pool_details.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                <Icons.PoolWaves className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                Pool Types & Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {poolCriteria.pool_details.map((item, index) => (
                    <FeatureListItem 
                        key={index} 
                        item={item} 
                        bgColor="bg-blue-50" 
                        borderColor="border-blue-200" 
                        iconColor="text-blue-600" 
                    />
                ))}
            </div>
        </div>
    );
}

// ============================================
// SHADE OPTIONS SECTION
// ============================================
export function ShadeOptionsSection({ poolCriteria }) {
    if (!poolCriteria?.shade_options || poolCriteria.shade_options.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                <Icons.Shade className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                Shade Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {poolCriteria.shade_options.map((item, index) => (
                    <FeatureListItem 
                        key={index} 
                        item={item} 
                        bgColor="bg-purple-50" 
                        borderColor="border-purple-200" 
                        iconColor="text-purple-600" 
                    />
                ))}
            </div>
        </div>
    );
}

// ============================================
// SPECIAL FEATURES LIST SECTION
// ============================================
export function SpecialFeaturesListSection({ poolCriteria }) {
    if (!poolCriteria?.special_features_list || poolCriteria.special_features_list.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                <Icons.PoolStar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                Special Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {poolCriteria.special_features_list.map((item, index) => (
                    <FeatureListItem 
                        key={index} 
                        item={item} 
                        bgColor="bg-amber-50" 
                        borderColor="border-amber-200" 
                        iconColor="text-amber-600" 
                    />
                ))}
            </div>
        </div>
    );
}

// ============================================
// ATMOSPHERE & VIBE SECTION (List)
// ============================================
export function AtmosphereVibeSection({ poolCriteria }) {
    if (!poolCriteria?.atmosphere_vibe || poolCriteria.atmosphere_vibe.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                <Icons.Music className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
                Pool Atmosphere & Vibe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {poolCriteria.atmosphere_vibe.map((item, index) => (
                    <FeatureListItem 
                        key={index} 
                        item={item} 
                        bgColor="bg-pink-50" 
                        borderColor="border-pink-200" 
                        iconColor="text-pink-600" 
                    />
                ))}
            </div>
        </div>
    );
}

// ============================================
// FAMILY FEATURES SECTION (List)
// ============================================
export function FamilyFeaturesListSection({ poolCriteria }) {
    if (!poolCriteria?.family_features || poolCriteria.family_features.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                <Icons.Family className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                Family Friendliness
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {poolCriteria.family_features.map((item, index) => (
                    <FeatureListItem 
                        key={index} 
                        item={item} 
                        bgColor="bg-green-50" 
                        borderColor="border-green-200" 
                        iconColor="text-green-600" 
                    />
                ))}
            </div>
        </div>
    );
}

// ============================================
// FAMILY FEATURES ICONS SECTION
// ============================================
export function FamilyFeaturesIconsSection({ poolCriteria }) {
    if (!poolCriteria?.has_kids_pool && !poolCriteria?.has_splash_area && 
        !poolCriteria?.has_lifeguard && !poolCriteria?.has_waterslide) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
                Family Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {poolCriteria.has_kids_pool && (
                    <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-lg border border-sky-100">
                        <svg className="w-7 h-7 text-sky-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div>
                            <h4 className="font-sans font-semibold text-gray-900 mb-1 text-sm sm:text-base">Kids Pool</h4>
                            <p className="text-xs sm:text-sm text-gray-600 font-sans">Dedicated shallow pool area for children</p>
                        </div>
                    </div>
                )}

                {poolCriteria.has_splash_area && (
                    <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-lg border border-sky-100">
                        <Icons.Gift className="w-7 h-7 text-sky-700 flex-shrink-0" />
                        <div>
                            <h4 className="font-sans font-semibold text-gray-900 mb-1 text-sm sm:text-base">Splash Area</h4>
                            <p className="text-xs sm:text-sm text-gray-600 font-sans">Water play area with fountains and slides</p>
                        </div>
                    </div>
                )}

                {poolCriteria.has_lifeguard && (
                    <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                        <Icons.Shield className="w-7 h-7 text-emerald-700 flex-shrink-0" />
                        <div>
                            <h4 className="font-sans font-semibold text-gray-900 mb-1 text-sm sm:text-base">Lifeguard on Duty</h4>
                            <p className="text-xs sm:text-sm text-gray-600 font-sans">Professional supervision for safety</p>
                        </div>
                    </div>
                )}

                {poolCriteria.has_waterslide && (
                    <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <Icons.Lightning className="w-7 h-7 text-purple-700 flex-shrink-0" />
                        <div>
                            <h4 className="font-sans font-semibold text-gray-900 mb-1 text-sm sm:text-base">Water Slides</h4>
                            <p className="text-xs sm:text-sm text-gray-600 font-sans">Fun slides for all ages</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PoolOverviewSection;

import { SUN_EXPOSURE_MAP, ATMOSPHERE_CONFIG, NOISE_DESCRIPTIONS } from '../config/hotelConstants';

// ============================================
// HOTEL PAGE HELPER FUNCTIONS
// ============================================

export const formatSunExposure = (exposure) => SUN_EXPOSURE_MAP[exposure]?.label || exposure;

export const getSunExposureDescription = (exposure) => SUN_EXPOSURE_MAP[exposure]?.description || '';

export const getAtmosphereIcon = (atmosphere) => ATMOSPHERE_CONFIG[atmosphere]?.icon || '🏊';

export const getAtmosphereDescription = (atmosphere) => ATMOSPHERE_CONFIG[atmosphere]?.description || '';

export const getNoiseDescription = (level) => NOISE_DESCRIPTIONS[level] || '';

export const getSunbedRatioText = (ratio) => {
    if (ratio >= 1.0) return 'Excellent - plenty of sunbeds';
    if (ratio >= 0.75) return 'Very good - usually available';
    if (ratio >= 0.5) return 'Good - may need to arrive early';
    if (ratio >= 0.33) return 'Average - expect competition';
    return 'Limited - arrive very early';
};

export const hasPoolFeatures = (poolCriteria) => {
    if (!poolCriteria) return false;
    return poolCriteria.has_infinity_pool || 
           poolCriteria.has_rooftop_pool || 
           poolCriteria.has_heated_pool || 
           poolCriteria.has_pool_bar || 
           poolCriteria.has_lazy_river || 
           poolCriteria.has_swim_up_bar;
};

export const getSunBadges = (poolCriteria) => {
    const badges = [];
    
    if (poolCriteria.sun_exposure === 'all_day') {
        badges.push({ icon: '☀️', text: 'Sun all day', color: 'bg-amber-100 text-amber-800 border-amber-200' });
    } else if (poolCriteria.sun_exposure === 'afternoon_only') {
        badges.push({ icon: '🌅', text: 'Sun all afternoon', color: 'bg-orange-100 text-orange-800 border-orange-200' });
    } else if (poolCriteria.sun_exposure === 'morning_only') {
        badges.push({ icon: '🌄', text: 'Morning sun', color: 'bg-blue-100 text-blue-800 border-blue-200' });
    }
    
    if (poolCriteria.sunbed_to_guest_ratio >= 0.75) {
        badges.push({ icon: '🏖️', text: 'High sunbed availability', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' });
    }
    
    if (poolCriteria.has_shade_areas) {
        badges.push({ icon: '🌴', text: 'Plenty of shade', color: 'bg-teal-100 text-teal-800 border-teal-200' });
    }
    
    if (poolCriteria.has_infinity_pool) {
        badges.push({ icon: '∞', text: 'Infinity pool', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' });
    }
    
    if (poolCriteria.is_adults_only) {
        badges.push({ icon: '🍸', text: 'Adults only', color: 'bg-purple-100 text-purple-800 border-purple-200' });
    }
    
    if (poolCriteria.noise_level === 'quiet') {
        badges.push({ icon: '🤫', text: 'Peaceful atmosphere', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' });
    }
    
    return badges;
};

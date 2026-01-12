// ============================================
// HOTEL PAGE CONSTANTS
// ============================================

export const SUN_EXPOSURE_MAP = {
    'all_day': { label: 'All Day Sun', description: 'Pool area receives sunshine throughout the day' },
    'afternoon_only': { label: 'Afternoon Only', description: 'Best sun from noon onwards' },
    'morning_only': { label: 'Morning Only', description: 'Morning sunshine, shaded in afternoon' },
    'partial_shade': { label: 'Partial Shade', description: 'Mix of sun and shade throughout the day' },
    'mostly_shaded': { label: 'Mostly Shaded', description: 'Limited direct sunlight' }
};

export const ATMOSPHERE_CONFIG = {
    'lively': { icon: '🎉', description: 'Energetic and social pool environment' },
    'relaxed': { icon: '😌', description: 'Calm and laid-back atmosphere' },
    'quiet': { icon: '🧘', description: 'Peaceful and tranquil setting' },
    'family': { icon: '👨‍👩‍👧‍👦', description: 'Friendly environment for all ages' },
    'romantic': { icon: '💑', description: 'Intimate and serene ambiance' },
    'party': { icon: '🎊', description: 'Fun and festive pool scene' }
};

export const NOISE_DESCRIPTIONS = {
    'quiet': 'Minimal noise, peaceful environment',
    'moderate': 'Some background activity and conversation',
    'lively': 'Active atmosphere with music and socializing',
    'loud': 'High energy with music and entertainment'
};

export const POOL_SIZE_LABELS = {
    'small': 'Small Pool (under 50m²)',
    'medium': 'Medium Pool (50-150m²)',
    'large': 'Large Pool (150-300m²)',
    'very_large': 'Very Large Pool (over 300m²)',
    'resort_style': 'Resort Style (multiple pools, lagoons)'
};

export const TOWEL_POLICY_LABELS = {
    'free': 'Free towels available',
    'deposit': 'Towels with deposit',
    'rental': 'Towel rental available',
    'bring_own': 'Bring your own towels'
};

export const SUNBED_RESERVATION_LABELS = {
    'not_allowed': 'Reserving not allowed',
    'first_come': 'First come, first served',
    'timed_limit': 'Time limit policy',
    'reservation_system': 'Reservation system'
};

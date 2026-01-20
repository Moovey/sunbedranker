import { useState } from 'react';

export default function PoolCriteriaTab({ data, setData, errors }) {
    const [expandedSections, setExpandedSections] = useState({
        sunbed: true,
        sun: true,
        pool: true,
        towel: false,
        facilities: false,
        atmosphere: false,
        cleanliness: false,
        accessibility: false,
        kids: false,
        luxury: false,
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleCheckboxArray = (field, value) => {
        const current = data[field] || [];
        if (current.includes(value)) {
            setData(field, current.filter(item => item !== value));
        } else {
            setData(field, [...current, value]);
        }
    };

    // Calculate sunbed ratio in real-time
    // Formula: sunbed_count / (total_rooms * 2) - assuming 2 guests per room
    const sunbedRatio = data.total_rooms && data.sunbed_count 
        ? (data.sunbed_count / (data.total_rooms * 2)).toFixed(2)
        : null;

    const getSunbedRatioLabel = (ratio) => {
        if (!ratio) return '';
        if (ratio >= 1.0) return '✅ Excellent';
        if (ratio >= 0.75) return '👍 Very Good';
        if (ratio >= 0.5) return '😊 Good';
        if (ratio >= 0.33) return '😐 Average';
        return '⚠️ Limited';
    };

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                    📊 Complete these criteria to calculate your hotel's <strong>Pool & Sun Score</strong> (0-10) 
                    and category scores (Sun Availability, Comfort, Family-Friendly, Peace & Quiet, Party Vibe)
                </p>
            </div>

            {/* 1. SUNBED-TO-GUEST RATIO */}
            <Section 
                title="1. Sunbed-to-Guest Ratio" 
                expanded={expandedSections.sunbed}
                onToggle={() => toggleSection('sunbed')}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Total Sunbeds Available *
                        </label>
                        <input
                            type="number"
                            min="0"
                            value={data.sunbed_count || ''}
                            onChange={e => setData('sunbed_count', e.target.value)}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. 150"
                        />
                        {errors.sunbed_count && <p className="text-red-500 text-sm mt-1">{errors.sunbed_count}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Total Hotel Rooms
                        </label>
                        <input
                            type="number"
                            value={data.total_rooms || ''}
                            disabled
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-50"
                        />
                        <p className="text-xs text-neutral-500 mt-1">From Basic Info tab</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Calculated Ratio
                        </label>
                        <div className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-emerald-50 font-semibold text-emerald-800">
                            {sunbedRatio || '—'}
                        </div>
                        <p className="text-xs text-neutral-600 mt-1 font-medium">
                            {getSunbedRatioLabel(sunbedRatio)}
                        </p>
                    </div>
                </div>
            </Section>

            {/* 2. SUN EXPOSURE & ORIENTATION */}
            <Section 
                title="2. Sun Exposure & Orientation" 
                expanded={expandedSections.sun}
                onToggle={() => toggleSection('sun')}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Sun Exposure *
                        </label>
                        <select
                            value={data.sun_exposure || ''}
                            onChange={e => setData('sun_exposure', e.target.value)}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select sun exposure...</option>
                            <option value="all_day">All Day Sun ☀️</option>
                            <option value="afternoon_only">Afternoon Sun 🌅</option>
                            <option value="morning_only">Morning Sun 🌄</option>
                            <option value="partial_shade">Partial Shade 🌤️</option>
                            <option value="mostly_shaded">Mostly Shaded 🌳</option>
                        </select>
                        {errors.sun_exposure && <p className="text-red-500 text-sm mt-1">{errors.sun_exposure}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Which Areas are Sunny? (Select all that apply)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {['main_pool', 'kids_pool', 'quiet_area', 'rooftop', 'adult_pool', 'terrace'].map(area => (
                                <label key={area} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={(data.sunny_areas || []).includes(area)}
                                        onChange={() => handleCheckboxArray('sunny_areas', area)}
                                        className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm">{area.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* 3. POOL AREA SIZE & VARIETY */}
            <Section 
                title="3. Pool Area Size & Variety" 
                expanded={expandedSections.pool}
                onToggle={() => toggleSection('pool')}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Main Pool Size (m²)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.pool_size_sqm || ''}
                            onChange={e => setData('pool_size_sqm', e.target.value)}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. 250"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Pool Size Category
                        </label>
                        <select
                            value={data.pool_size_category || ''}
                            onChange={e => setData('pool_size_category', e.target.value)}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select size...</option>
                            <option value="small">Small (&lt;100m²)</option>
                            <option value="medium">Medium (100-300m²)</option>
                            <option value="large">Large (300-500m²)</option>
                            <option value="very_large">Very Large (500m²+)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Number of Pools *
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={data.number_of_pools || 1}
                            onChange={e => setData('number_of_pools', e.target.value)}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Pool Types (Select all that apply)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { value: 'infinity', label: 'Infinity Pool' },
                                { value: 'kids', label: 'Kids Pool' },
                                { value: 'adult_only', label: 'Adult-Only Pool' },
                                { value: 'indoor', label: 'Indoor Pool' },
                                { value: 'rooftop', label: 'Rooftop Pool' },
                                { value: 'lagoon', label: 'Lagoon-Style' },
                                { value: 'heated', label: 'Heated Pool' },
                                { value: 'olympic', label: 'Olympic-Size' },
                            ].map(type => (
                                <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={(data.pool_types || []).includes(type.value)}
                                        onChange={() => handleCheckboxArray('pool_types', type.value)}
                                        className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm">{type.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* 4. TOWEL & RESERVATION POLICY */}
            <Section 
                title="4. Towel & Reservation Policy" 
                expanded={expandedSections.towel}
                onToggle={() => toggleSection('towel')}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Towel Reservation Policy
                        </label>
                        <select
                            value={data.towel_reservation_policy || ''}
                            onChange={e => setData('towel_reservation_policy', e.target.value)}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select policy...</option>
                            <option value="enforced">Strictly Enforced 🚫</option>
                            <option value="tolerated">Tolerated 😐</option>
                            <option value="free_for_all">Free-for-All 🤷</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Towel Service Cost
                        </label>
                        <select
                            value={data.towel_service_cost || ''}
                            onChange={e => setData('towel_service_cost', e.target.value)}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select cost...</option>
                            <option value="included">Included ✅</option>
                            <option value="extra_cost">Extra Cost 💰</option>
                            <option value="deposit_required">Deposit Required 🔐</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Pool Opening Hours
                        </label>
                        <input
                            type="text"
                            value={data.pool_opening_hours || ''}
                            onChange={e => setData('pool_opening_hours', e.target.value)}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. 07:00-22:00"
                        />
                    </div>
                </div>
            </Section>

            {/* 5. POOL FACILITIES & COMFORT */}
            <Section 
                title="5. Pool Facilities & Comfort" 
                expanded={expandedSections.facilities}
                onToggle={() => toggleSection('facilities')}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Sunbed Types (Select all that apply)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { value: 'plastic', label: 'Plastic Loungers' },
                                { value: 'cushioned', label: 'Cushioned Beds' },
                                { value: 'cabanas', label: 'Cabanas' },
                                { value: 'bali_beds', label: 'Bali Beds' },
                            ].map(type => (
                                <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={(data.sunbed_types || []).includes(type.value)}
                                        onChange={() => handleCheckboxArray('sunbed_types', type.value)}
                                        className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm">{type.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Shade Options (Select all that apply)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { value: 'umbrellas', label: 'Umbrellas ☂️' },
                                { value: 'pergolas', label: 'Pergolas' },
                                { value: 'cabanas', label: 'Cabanas' },
                                { value: 'natural_trees', label: 'Natural Trees 🌳' },
                            ].map(option => (
                                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={(data.shade_options || []).includes(option.value)}
                                        onChange={() => handleCheckboxArray('shade_options', option.value)}
                                        className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                            <input
                                type="checkbox"
                                checked={data.has_pool_bar || false}
                                onChange={e => setData('has_pool_bar', e.target.checked)}
                                className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium">Pool Bar Available 🍹</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                            <input
                                type="checkbox"
                                checked={data.has_waiter_service || false}
                                onChange={e => setData('has_waiter_service', e.target.checked)}
                                className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium">Waiter Service 🍽️</span>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Distance to Bar
                            </label>
                            <select
                                value={data.bar_distance || ''}
                                onChange={e => setData('bar_distance', e.target.value)}
                                disabled={!data.has_pool_bar}
                                className={`w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 ${!data.has_pool_bar ? 'bg-neutral-100 cursor-not-allowed' : ''}`}
                            >
                                <option value="">Select distance...</option>
                                <option value="poolside">Poolside</option>
                                <option value="close">Close (&lt;20m)</option>
                                <option value="moderate">Moderate (20-50m)</option>
                                <option value="far">Far (50m+)</option>
                            </select>
                            {!data.has_pool_bar && <p className="text-xs text-neutral-500 mt-1">Enable "Pool Bar Available" first</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Distance to Toilets
                            </label>
                            <select
                                value={data.toilet_distance || ''}
                                onChange={e => setData('toilet_distance', e.target.value)}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select distance...</option>
                                <option value="adjacent">Adjacent</option>
                                <option value="close">Close (&lt;15m)</option>
                                <option value="moderate">Moderate (15-30m)</option>
                                <option value="far">Far (30m+)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Section>

            {/* 6. NOISE & ATMOSPHERE */}
            <Section 
                title="6. Noise & Atmosphere" 
                expanded={expandedSections.atmosphere}
                onToggle={() => toggleSection('atmosphere')}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Pool Atmosphere/Vibe
                        </label>
                        <select
                            value={data.atmosphere || ''}
                            onChange={e => setData('atmosphere', e.target.value)}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select atmosphere...</option>
                            <option value="quiet">Quiet & Peaceful 🧘</option>
                            <option value="relaxed">Relaxed 😌</option>
                            <option value="family">Family-Friendly 👨‍👩‍👧‍👦</option>
                            <option value="lively">Lively & Social 🎉</option>
                            <option value="party">Party Atmosphere 🎊</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Music Level
                        </label>
                        <select
                            value={data.music_level || ''}
                            onChange={e => setData('music_level', e.target.value)}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select music level...</option>
                            <option value="none">No Music 🔇</option>
                            <option value="low">Low Background Music 🎵</option>
                            <option value="moderate">Moderate Volume 🎶</option>
                            <option value="loud">Loud Music 🔊</option>
                            <option value="dj">Live DJ 🎧</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center space-x-2 cursor-pointer mb-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                            <input
                                type="checkbox"
                                checked={data.has_entertainment || false}
                                onChange={e => setData('has_entertainment', e.target.checked)}
                                className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium">Has Entertainment Activities</span>
                        </label>

                        {data.has_entertainment && (
                            <div className="ml-6 grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-neutral-50 rounded-lg">
                                {[
                                    { value: 'aqua_gym', label: 'Aqua Gym' },
                                    { value: 'games', label: 'Pool Games' },
                                    { value: 'animation_team', label: 'Animation Team' },
                                    { value: 'live_music', label: 'Live Music' },
                                ].map(type => (
                                    <label key={type.value} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={(data.entertainment_types || []).includes(type.value)}
                                            onChange={() => handleCheckboxArray('entertainment_types', type.value)}
                                            className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm">{type.label}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Section>

            {/* 7. CLEANLINESS & MAINTENANCE */}
            <Section 
                title="7. Cleanliness & Maintenance" 
                expanded={expandedSections.cleanliness}
                onToggle={() => toggleSection('cleanliness')}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Pool Cleanliness Rating (1-5)
                        </label>
                        <select
                            value={data.cleanliness_rating ? Math.round(Number(data.cleanliness_rating)) : ''}
                            onChange={e => setData('cleanliness_rating', parseInt(e.target.value) || '')}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select rating...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Pristine</option>
                        </select>
                        {errors.cleanliness_rating && <p className="text-red-500 text-sm mt-1">{errors.cleanliness_rating}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Sunbed Condition Rating (1-5)
                        </label>
                        <select
                            value={data.sunbed_condition_rating ? Math.round(Number(data.sunbed_condition_rating)) : ''}
                            onChange={e => setData('sunbed_condition_rating', parseInt(e.target.value) || '')}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select rating...</option>
                            <option value="1">1 - Very Old</option>
                            <option value="2">2 - Worn</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Brand New</option>
                        </select>
                        {errors.sunbed_condition_rating && <p className="text-red-500 text-sm mt-1">{errors.sunbed_condition_rating}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Tiling/Grounds Rating (1-5)
                        </label>
                        <select
                            value={data.tiling_condition_rating ? Math.round(Number(data.tiling_condition_rating)) : ''}
                            onChange={e => setData('tiling_condition_rating', parseInt(e.target.value) || '')}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select rating...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                        </select>
                        {errors.tiling_condition_rating && <p className="text-red-500 text-sm mt-1">{errors.tiling_condition_rating}</p>}
                    </div>
                </div>
            </Section>

            {/* 8. ACCESSIBILITY */}
            <Section 
                title="8. Accessibility Features" 
                expanded={expandedSections.accessibility}
                onToggle={() => toggleSection('accessibility')}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                        <input
                            type="checkbox"
                            checked={data.has_accessibility_ramp || false}
                            onChange={e => setData('has_accessibility_ramp', e.target.checked)}
                            className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium">Accessibility Ramp ♿</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                        <input
                            type="checkbox"
                            checked={data.has_pool_hoist || false}
                            onChange={e => setData('has_pool_hoist', e.target.checked)}
                            className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium">Pool Hoist 🏊</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                        <input
                            type="checkbox"
                            checked={data.has_step_free_access || false}
                            onChange={e => setData('has_step_free_access', e.target.checked)}
                            className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium">Step-Free Access</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                        <input
                            type="checkbox"
                            checked={data.has_elevator_to_rooftop || false}
                            onChange={e => setData('has_elevator_to_rooftop', e.target.checked)}
                            className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium">Elevator to Rooftop Pool</span>
                    </label>
                </div>
            </Section>

            {/* 9. KIDS & FAMILY FACILITIES */}
            <Section 
                title="9. Kids & Family Facilities" 
                expanded={expandedSections.kids}
                onToggle={() => toggleSection('kids')}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                            <input
                                type="checkbox"
                                checked={data.has_kids_pool || false}
                                onChange={e => setData('has_kids_pool', e.target.checked)}
                                className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium">Dedicated Kids Pool 👶</span>
                        </label>

                        {data.has_kids_pool && (
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Kids Pool Depth (meters) <span className="text-neutral-400 font-normal">max 2m</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="2"
                                    value={data.kids_pool_depth_m || ''}
                                    onChange={e => setData('kids_pool_depth_m', e.target.value)}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. 0.5"
                                />
                                {errors?.kids_pool_depth_m && (
                                    <p className="mt-1 text-sm text-red-600">{errors.kids_pool_depth_m}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                            <input
                                type="checkbox"
                                checked={data.has_splash_park || false}
                                onChange={e => setData('has_splash_park', e.target.checked)}
                                className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium">Splash Park 💦</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                            <input
                                type="checkbox"
                                checked={data.has_waterslide || false}
                                onChange={e => setData('has_waterslide', e.target.checked)}
                                className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium">Water Slides 🛝</span>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                            <input
                                type="checkbox"
                                checked={data.has_lifeguard || false}
                                onChange={e => setData('has_lifeguard', e.target.checked)}
                                className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium">Lifeguard on Duty 🏊‍♂️</span>
                        </label>

                        {data.has_lifeguard && (
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Lifeguard Hours
                                </label>
                                <input
                                    type="text"
                                    value={data.lifeguard_hours || ''}
                                    onChange={e => setData('lifeguard_hours', e.target.value)}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. 09:00-18:00"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Section>

            {/* 10. EXTRAS & LUXURY TOUCHES */}
            <Section 
                title="10. Extras & Luxury Touches" 
                expanded={expandedSections.luxury}
                onToggle={() => toggleSection('luxury')}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                        <input
                            type="checkbox"
                            checked={data.has_luxury_cabanas || false}
                            onChange={e => setData('has_luxury_cabanas', e.target.checked)}
                            className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium">Luxury Cabanas 🏖️</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                        <input
                            type="checkbox"
                            checked={data.has_cabana_service || false}
                            onChange={e => setData('has_cabana_service', e.target.checked)}
                            className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium">Cabana with Service 🛎️</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                        <input
                            type="checkbox"
                            checked={data.has_heated_pool || false}
                            onChange={e => setData('has_heated_pool', e.target.checked)}
                            className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium">Heated Pool 🌡️</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                        <input
                            type="checkbox"
                            checked={data.has_jacuzzi || false}
                            onChange={e => setData('has_jacuzzi', e.target.checked)}
                            className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium">Jacuzzi / Hot Tub 🛁</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                        <input
                            type="checkbox"
                            checked={data.has_adult_sun_terrace || false}
                            onChange={e => setData('has_adult_sun_terrace', e.target.checked)}
                            className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium">Adult-Only Sun Terrace 🔞</span>
                    </label>
                </div>
            </Section>
        </div>
    );
}

// Collapsible Section Component
function Section({ title, children, expanded, onToggle }) {
    return (
        <div className="border border-neutral-200 rounded-lg overflow-hidden">
            <button
                type="button"
                onClick={onToggle}
                className="w-full px-6 py-4 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-between transition-colors"
            >
                <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
                <svg 
                    className={`w-5 h-5 text-neutral-600 transition-transform ${expanded ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {expanded && (
                <div className="px-6 py-4 bg-white">
                    {children}
                </div>
            )}
        </div>
    );
}

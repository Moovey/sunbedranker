import { Link, Head, useForm, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import HotelierNav from '@/Components/HotelierNav';
import TabButton from '@/Components/Admin/Hotels/TabButton';
import PoolCriteriaTab from '@/Components/Admin/Hotels/PoolCriteriaTab';
import CreateImagesTab from '@/Components/Admin/Hotels/CreateImagesTab';

// ============================================================================
// Constants
// ============================================================================

const TABS = {
    POOL: 'pool',
    IMAGES: 'images',
    DESCRIPTIONS: 'descriptions',
    FAQS: 'faqs',
    ENHANCED: 'enhanced',
};

const TAB_CONFIG = [
    { key: TABS.POOL, label: '🏊 Pool Scoring' },
    { key: TABS.IMAGES, label: '📷 Images' },
    { key: TABS.DESCRIPTIONS, label: '📝 Descriptions' },
    { key: TABS.FAQS, label: '❓ FAQs & Rules' },
    { key: TABS.ENHANCED, label: '⭐ Enhanced Features', requiresEnhanced: true },
];

// ============================================================================
// Helper Functions
// ============================================================================

const getInitialFormData = (hotel) => ({
    main_image: null,
    gallery_images: [],
    pool_description: hotel.pool_description || '',
    amenities_description: hotel.amenities_description || '',
    house_rules: hotel.house_rules || '',
    towel_policy: hotel.towel_policy || '',
    faqs: hotel.faqs || [],
    // Enhanced subscription features
    promotional_banner: hotel.promotional_banner || '',
    special_offer: hotel.special_offer || '',
    special_offer_expires_at: hotel.special_offer_expires_at ? hotel.special_offer_expires_at.split('T')[0] : '',
    video_url: hotel.video_url || '',
    video_360_url: hotel.video_360_url || '',
    direct_booking_url: hotel.direct_booking_url || '',
    show_verified_badge: hotel.show_verified_badge || false,
    ...getPoolCriteriaData(hotel.pool_criteria),
});

const getPoolCriteriaData = (criteria) => ({
    sunbed_count: criteria?.sunbed_count || '',
    sun_exposure: criteria?.sun_exposure || '',
    sunny_areas: criteria?.sunny_areas || [],
    pool_size_sqm: criteria?.pool_size_sqm || '',
    pool_size_category: criteria?.pool_size_category || '',
    number_of_pools: criteria?.number_of_pools || 1,
    pool_types: criteria?.pool_types || [],
    towel_reservation_policy: criteria?.towel_reservation_policy || '',
    towel_service_cost: criteria?.towel_service_cost || '',
    pool_opening_hours: criteria?.pool_opening_hours || '',
    sunbed_types: criteria?.sunbed_types || [],
    shade_options: criteria?.shade_options || [],
    has_pool_bar: criteria?.has_pool_bar || false,
    has_waiter_service: criteria?.has_waiter_service || false,
    bar_distance: criteria?.bar_distance || '',
    toilet_distance: criteria?.toilet_distance || '',
    atmosphere: criteria?.atmosphere || '',
    music_level: criteria?.music_level || '',
    has_entertainment: criteria?.has_entertainment || false,
    entertainment_types: criteria?.entertainment_types || [],
    cleanliness_rating: criteria?.cleanliness_rating || '',
    sunbed_condition_rating: criteria?.sunbed_condition_rating || '',
    tiling_condition_rating: criteria?.tiling_condition_rating || '',
    has_accessibility_ramp: criteria?.has_accessibility_ramp || false,
    has_pool_hoist: criteria?.has_pool_hoist || false,
    has_step_free_access: criteria?.has_step_free_access || false,
    has_elevator_to_rooftop: criteria?.has_elevator_to_rooftop || false,
    has_kids_pool: criteria?.has_kids_pool || false,
    kids_pool_depth_m: criteria?.kids_pool_depth_m || '',
    has_splash_park: criteria?.has_splash_park || false,
    has_waterslide: criteria?.has_waterslide || false,
    has_lifeguard: criteria?.has_lifeguard || false,
    lifeguard_hours: criteria?.lifeguard_hours || '',
    has_luxury_cabanas: criteria?.has_luxury_cabanas || false,
    has_cabana_service: criteria?.has_cabana_service || false,
    has_heated_pool: criteria?.has_heated_pool || false,
    has_jacuzzi: criteria?.has_jacuzzi || false,
    has_adult_sun_terrace: criteria?.has_adult_sun_terrace || false,
});

// ============================================================================
// Sub-Components
// ============================================================================

const StatusBadge = ({ isActive, isVerified }) => (
    <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 flex-wrap">
        {isActive && (
            <span className="flex items-center gap-1.5 text-sm text-green-600 font-bold">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Active
            </span>
        )}
        {isVerified && (
            <span className="flex items-center gap-1.5 text-sm text-blue-600 font-bold">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
                Verified
            </span>
        )}
    </div>
);

const PageHeader = ({ hotel }) => (
    <div className="bg-gradient-to-r from-orange-50 to-blue-50 shadow-lg border-b-2 border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
            <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                <div className="h-1 w-8 sm:w-10 md:w-12 bg-orange-300 rounded-full"></div>
                <svg className="mx-3 sm:mx-4 text-orange-500" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <div className="h-1 w-8 sm:w-10 md:w-12 bg-blue-300 rounded-full"></div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left flex-1">
                    <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">
                        {hotel.name}
                    </h1>
                    <p className="text-gray-600 mt-2 font-semibold">
                        Manage your hotel's pool & amenities information
                    </p>
                    <StatusBadge isActive={hotel.is_active} isVerified={hotel.is_verified} />
                </div>
                <Link
                    href={route('hotels.show', hotel.slug)}
                    target="_blank"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                >
                    View Public Page
                </Link>
            </div>
        </div>
    </div>
);

const InfoBanner = () => (
    <div className="mb-6 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-5 shadow-lg">
        <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <div>
                <h3 className="text-blue-800 font-bold mb-1">What you can edit</h3>
                <p className="text-blue-700 text-sm">
                    As the verified owner of this hotel, you can update pool & sun-related information, upload images, 
                    add rich descriptions of your pool areas & amenities, and manage FAQs & house rules. 
                    Basic hotel details are managed by our admin team.
                </p>
            </div>
        </div>
    </div>
);

const ValidationErrorsBox = ({ errors }) => {
    // Normalize errors - handle both string and array formats
    const normalizedErrors = {};
    Object.entries(errors).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
            normalizedErrors[field] = messages[0];
        } else if (typeof messages === 'string') {
            normalizedErrors[field] = messages;
        } else if (messages && typeof messages === 'object') {
            normalizedErrors[field] = JSON.stringify(messages);
        }
    });
    
    const errorCount = Object.keys(normalizedErrors).length;
    if (errorCount === 0) return null;
    
    return (
        <div className="mb-6 bg-red-50 border-2 border-red-400 rounded-xl p-6 shadow-xl" style={{ animation: 'pulse 2s infinite' }}>
            <style>{`
                @keyframes pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
                    50% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
                }
            `}</style>
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-4 flex-1">
                    <h3 className="text-xl font-bold text-red-800 mb-3">
                        ❌ Validation Failed - {errorCount} error{errorCount > 1 ? 's' : ''} found
                    </h3>
                    <p className="text-red-700 mb-4 font-medium">Please fix the following errors before submitting:</p>
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                        <ul className="space-y-3">
                            {Object.entries(normalizedErrors).map(([field, message]) => (
                                <li key={field} className="flex items-start gap-3 text-red-700">
                                    <span className="text-red-500 font-bold text-lg">•</span>
                                    <span className="text-base">
                                        <span className="font-bold capitalize text-red-800">{field.replace(/_/g, ' ')}:</span>{' '}
                                        <span className="text-red-600">{message}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DescriptionField = ({ title, icon, description, value, onChange, error, colorScheme, rows = 6, placeholder }) => {
    const colors = {
        blue: { bg: 'from-blue-50 to-blue-100', border: 'border-blue-200', title: 'text-blue-800', focus: 'focus:border-blue-500 focus:ring-blue-200' },
        green: { bg: 'from-green-50 to-green-100', border: 'border-green-200', title: 'text-green-800', focus: 'focus:border-green-500 focus:ring-green-200' },
        red: { bg: 'from-red-50 to-red-100', border: 'border-red-200', title: 'text-red-800', focus: 'focus:border-red-500 focus:ring-red-200' },
        purple: { bg: 'from-purple-50 to-purple-100', border: 'border-purple-200', title: 'text-purple-800', focus: 'focus:border-purple-500 focus:ring-purple-200' },
    };
    const scheme = colors[colorScheme];
    
    return (
        <div className={`bg-gradient-to-r ${scheme.bg} rounded-2xl p-6 border-2 ${scheme.border}`}>
            <h3 className={`text-lg font-bold ${scheme.title} mb-4`}>{icon} {title}</h3>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl ${scheme.focus} font-semibold`}
                placeholder={placeholder}
            />
            {error && <p className="mt-2 text-red-600 text-sm font-semibold">{error}</p>}
        </div>
    );
};

const FaqItem = ({ faq, index, onUpdate, onRemove }) => (
    <div className="bg-white rounded-xl p-4 mb-4 border-2 border-gray-200">
        <div className="flex justify-between items-start mb-3">
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-lg text-xs font-bold">
                FAQ #{index + 1}
            </span>
            <button type="button" onClick={onRemove} className="text-red-600 hover:text-red-800 font-bold text-sm">
                ✕ Remove
            </button>
        </div>
        <div className="space-y-3">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Question</label>
                <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => onUpdate(index, 'question', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 font-semibold"
                    placeholder="e.g., What are the pool opening hours?"
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Answer</label>
                <textarea
                    value={faq.answer}
                    onChange={(e) => onUpdate(index, 'answer', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 font-semibold"
                    placeholder="e.g., Our pool is open from 7:00 AM to 10:00 PM daily during summer season."
                />
            </div>
        </div>
    </div>
);

const DescriptionsTab = ({ data, setData, errors }) => (
    <div className="space-y-8">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <span className="text-3xl">📝</span> Rich Descriptions
        </h2>
        <p className="text-gray-600">
            Add detailed descriptions of your pool areas and amenities. These will be displayed on your hotel's public page to help guests understand what makes your property special.
        </p>
        <DescriptionField
            title="Pool Area Description"
            icon="🏊"
            description="Describe your pool areas in detail. What makes them special? Include details about the views, surroundings, and unique features."
            value={data.pool_description}
            onChange={(value) => setData('pool_description', value)}
            error={errors.pool_description}
            colorScheme="blue"
            placeholder="Our stunning infinity pool overlooks the Mediterranean Sea, offering breathtaking sunset views. The main pool area features 50 premium sunbeds with padded cushions..."
        />
        <DescriptionField
            title="Amenities Description"
            icon="🍹"
            description="Describe the amenities and services available at your pool area. Mention any premium services, food & beverage options, and special features."
            value={data.amenities_description}
            onChange={(value) => setData('amenities_description', value)}
            error={errors.amenities_description}
            colorScheme="green"
            placeholder="Our poolside bar serves refreshing cocktails and light Mediterranean cuisine throughout the day. Premium cabanas with dedicated butler service are available for booking..."
        />
    </div>
);

const FaqsTab = ({ data, setData, errors, faqs, onAddFaq, onUpdateFaq, onRemoveFaq }) => (
    <div className="space-y-8">
        <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <span className="text-3xl">❓</span> FAQs & House Rules
        </h2>
        <p className="text-gray-600">
            Add frequently asked questions and pool house rules to help guests know what to expect before they arrive.
        </p>
        <DescriptionField
            title="Pool House Rules"
            icon="🏠"
            description="List the pool rules and guidelines guests should follow. Use bullet points for clarity."
            value={data.house_rules}
            onChange={(value) => setData('house_rules', value)}
            error={errors.house_rules}
            colorScheme="red"
            placeholder="• No diving in shallow areas&#10;• Children must be supervised at all times&#10;• No glass containers near the pool&#10;• Shower before entering the pool&#10;• Pool towels must be returned before checkout"
        />
        <DescriptionField
            title="Towel & Sunbed Policy Details"
            icon="🏖️"
            description="Provide additional details about your towel and sunbed reservation policies."
            value={data.towel_policy}
            onChange={(value) => setData('towel_policy', value)}
            error={errors.towel_policy}
            colorScheme="purple"
            rows={4}
            placeholder="Towels are provided free of charge at the pool. A €10 deposit is required. Sunbeds cannot be reserved before 8am. Unoccupied sunbeds with towels only will be cleared after 30 minutes..."
        />
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
            <h3 className="text-lg font-bold text-orange-800 mb-4">❓ Frequently Asked Questions</h3>
            <p className="text-sm text-gray-600 mb-4">
                Add common questions and answers about your pool area. These help guests find information quickly.
            </p>
            {faqs.map((faq, index) => (
                <FaqItem
                    key={index}
                    faq={faq}
                    index={index}
                    onUpdate={onUpdateFaq}
                    onRemove={() => onRemoveFaq(index)}
                />
            ))}
            <button
                type="button"
                onClick={onAddFaq}
                className="w-full py-3 border-2 border-dashed border-orange-300 rounded-xl text-orange-600 font-bold hover:bg-orange-50 transition-colors"
            >
                + Add FAQ
            </button>
        </div>
    </div>
);

const EnhancedFeaturesTab = ({ data, setData, errors, hasEnhanced }) => {
    if (!hasEnhanced) {
        return (
            <div className="space-y-8">
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-8 text-center">
                    <div className="text-5xl mb-4">⭐</div>
                    <h2 className="text-2xl font-black text-gray-900 mb-3">Enhanced Features</h2>
                    <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                        Upgrade to an Enhanced or Premium subscription to unlock promotional banners, 
                        video content, direct booking links, and the "Verified by Hotel" badge.
                    </p>
                    <Link
                        href={route('hotelier.subscription')}
                        className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Upgrade Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <span className="text-3xl">⭐</span> Enhanced Subscription Features
            </h2>
            <p className="text-gray-600">
                As an Enhanced subscriber, you can add promotional content, videos, and direct booking links to boost your hotel's visibility and conversions.
            </p>

            {/* Promotional Banner & Special Offers */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
                <h3 className="text-lg font-bold text-orange-800 mb-4">🎉 Promotional Banner & Special Offers</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Create eye-catching banners and special offers to attract more guests. Example: "Free cabana with direct booking"
                </p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Promotional Banner Text</label>
                        <input
                            type="text"
                            value={data.promotional_banner}
                            onChange={(e) => setData('promotional_banner', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 font-semibold"
                            placeholder="e.g., Early Bird Special - Book Direct & Save 15%"
                            maxLength={255}
                        />
                        {errors.promotional_banner && <p className="mt-2 text-red-600 text-sm font-semibold">{errors.promotional_banner}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Special Offer Details</label>
                        <textarea
                            value={data.special_offer}
                            onChange={(e) => setData('special_offer', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 font-semibold"
                            placeholder="Describe your special offer in detail. Include terms, conditions, and what's included..."
                            maxLength={1000}
                        />
                        {errors.special_offer && <p className="mt-2 text-red-600 text-sm font-semibold">{errors.special_offer}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Offer Expires On</label>
                        <input
                            type="date"
                            value={data.special_offer_expires_at}
                            onChange={(e) => setData('special_offer_expires_at', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 font-semibold"
                            min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.special_offer_expires_at && <p className="mt-2 text-red-600 text-sm font-semibold">{errors.special_offer_expires_at}</p>}
                    </div>
                </div>
            </div>

            {/* Videos and 360° Content */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-blue-800 mb-4">🎬 Videos & 360° Content</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Add video tours and 360° content to give guests an immersive preview of your pool areas. Use YouTube, Vimeo, or other video hosting URLs.
                </p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Video URL</label>
                        <input
                            type="url"
                            value={data.video_url}
                            onChange={(e) => setData('video_url', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-semibold"
                            placeholder="https://www.youtube.com/watch?v=..."
                        />
                        {errors.video_url && <p className="mt-2 text-red-600 text-sm font-semibold">{errors.video_url}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">360° Virtual Tour URL</label>
                        <input
                            type="url"
                            value={data.video_360_url}
                            onChange={(e) => setData('video_360_url', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-semibold"
                            placeholder="https://my360tour.com/hotel-pool-tour"
                        />
                        {errors.video_360_url && <p className="mt-2 text-red-600 text-sm font-semibold">{errors.video_360_url}</p>}
                    </div>
                </div>
            </div>

            {/* Direct Booking Link */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-800 mb-4">🔗 Direct Booking Link</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Add a link to your direct booking engine. This will be displayed alongside OTA links, encouraging guests to book directly with you.
                </p>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Direct Booking URL</label>
                    <input
                        type="url"
                        value={data.direct_booking_url}
                        onChange={(e) => setData('direct_booking_url', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 font-semibold"
                        placeholder="https://your-hotel.com/book"
                    />
                    {errors.direct_booking_url && <p className="mt-2 text-red-600 text-sm font-semibold">{errors.direct_booking_url}</p>}
                </div>
            </div>

            {/* Verified by Hotel Badge */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-lg font-bold text-purple-800 mb-4">✅ "Verified by Hotel" Badge</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Display a trust badge on your profile indicating that all information has been verified by your hotel. This builds trust with potential guests.
                </p>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={data.show_verified_badge}
                            onChange={(e) => setData('show_verified_badge', e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:bg-purple-500 transition-colors"></div>
                        <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow peer-checked:translate-x-6 transition-transform"></div>
                    </div>
                    <span className="text-gray-700 font-bold group-hover:text-purple-700 transition-colors">
                        Show "Verified by Hotel" badge on my profile
                    </span>
                </label>
                {data.show_verified_badge && (
                    <div className="mt-4 p-3 bg-white rounded-xl border-2 border-purple-200 inline-flex items-center gap-2">
                        <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                        </svg>
                        <span className="text-purple-800 font-bold text-sm">Verified by Hotel</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const FormActions = ({ processing }) => (
    <div className="mt-8 pt-6 border-t-2 border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
        <Link
            href={route('hotelier.claims.index')}
            className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-bold transition-all duration-300 text-center transform hover:scale-105 shadow-md"
        >
            Back to My Hotels
        </Link>
        <button
            type="submit"
            disabled={processing}
            className="px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {processing ? 'Saving...' : 'Save Changes'}
        </button>
    </div>
);

// ============================================================================
// Main Component
// ============================================================================

export default function ManageHotel({ hotel, flash, subscription, errors: serverErrors = {} }) {
    const [activeTab, setActiveTab] = useState(TABS.POOL);
    const [faqs, setFaqs] = useState(hotel.faqs || []);
    const [validationErrors, setValidationErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const { data, setData, errors: formErrors } = useForm(getInitialFormData(hotel));
    const { props } = usePage();
    
    const hasEnhanced = subscription?.hasEnhanced || false;

    // Combine all error sources - server errors, form errors, page props errors, and local state
    const pageErrors = props?.errors || {};
    const allErrors = { 
        ...serverErrors,
        ...pageErrors, 
        ...formErrors,
        ...validationErrors 
    };
    const hasErrors = Object.keys(allErrors).length > 0;

    // Flash message handling - check both direct prop and usePage props
    const flashSuccess = flash?.success || props?.flash?.success;
    const flashError = flash?.error || props?.flash?.error;
    
    useEffect(() => {
        if (flashSuccess) toast.success(flashSuccess);
        if (flashError) toast.error(flashError);
    }, [flashSuccess, flashError]);

    // FAQ management
    const addFaq = useCallback(() => {
        const newFaqs = [...faqs, { question: '', answer: '' }];
        setFaqs(newFaqs);
        setData('faqs', newFaqs);
    }, [faqs, setData]);

    const updateFaq = useCallback((index, field, value) => {
        const newFaqs = [...faqs];
        newFaqs[index][field] = value;
        setFaqs(newFaqs);
        setData('faqs', newFaqs);
    }, [faqs, setData]);

    const removeFaq = useCallback((index) => {
        const newFaqs = faqs.filter((_, i) => i !== index);
        setFaqs(newFaqs);
        setData('faqs', newFaqs);
    }, [faqs, setData]);

    // Form submission - Use router.post directly like Admin Edit does for Laravel Cloud compatibility
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        setValidationErrors({}); // Clear previous errors
        setProcessing(true);
        
        router.post(route('hotelier.hotels.update', hotel.slug), data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (page) => {
                setProcessing(false);
                // Check if there are validation errors in the response
                const responseErrors = page?.props?.errors || {};
                
                if (Object.keys(responseErrors).length > 0) {
                    // Store errors in local state to ensure they display
                    setValidationErrors(responseErrors);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                // Flash message will be handled by useEffect - no need to show toast here
            },
            onError: (errors) => {
                setProcessing(false);
                // Store errors in local state to ensure they display
                setValidationErrors(errors || {});
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    }, [data, hotel.slug]);

    // Render tab content
    const renderTabContent = () => {
        switch (activeTab) {
            case TABS.POOL:
                return <PoolCriteriaTab data={data} setData={setData} errors={allErrors} />;
            case TABS.IMAGES:
                return <CreateImagesTab data={data} setData={setData} errors={allErrors} hotel={hotel} />;
            case TABS.DESCRIPTIONS:
                return <DescriptionsTab data={data} setData={setData} errors={allErrors} />;
            case TABS.FAQS:
                return (
                    <FaqsTab
                        data={data}
                        setData={setData}
                        errors={allErrors}
                        faqs={faqs}
                        onAddFaq={addFaq}
                        onUpdateFaq={updateFaq}
                        onRemoveFaq={removeFaq}
                    />
                );
            case TABS.ENHANCED:
                return (
                    <EnhancedFeaturesTab
                        data={data}
                        setData={setData}
                        errors={allErrors}
                        hasEnhanced={hasEnhanced}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Head title={`Manage ${hotel.name}`} />
            <div className="min-h-screen bg-white font-sans">
                <HotelierNav />
                <PageHeader hotel={hotel} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
                    <InfoBanner />
                    
                    {/* Validation Errors Display - prominent box that's always visible when there are errors */}
                    {hasErrors && <ValidationErrorsBox errors={allErrors} />}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-t-2xl border-b-2 border-orange-200 shadow-lg">
                            <div className="flex gap-2 px-6 pt-5 overflow-x-auto">
                                {TAB_CONFIG.map(({ key, label, requiresEnhanced }) => (
                                    <TabButton 
                                        key={key} 
                                        active={activeTab === key} 
                                        onClick={() => setActiveTab(key)}
                                        className={requiresEnhanced && !hasEnhanced ? 'opacity-75' : ''}
                                    >
                                        {label}
                                        {requiresEnhanced && !hasEnhanced && (
                                            <span className="ml-1 text-xs">🔒</span>
                                        )}
                                    </TabButton>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-b-2xl shadow-xl p-5 sm:p-6 md:p-8 border-2 border-gray-100 border-t-0">
                            {renderTabContent()}
                            <FormActions processing={processing} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

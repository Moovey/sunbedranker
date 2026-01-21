import { Link, Head, useForm, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '@/Components/AdminNav';
import TabButton from '@/Components/Admin/Hotels/TabButton';
import CreateBasicInfoTab from '@/Components/Admin/Hotels/CreateBasicInfoTab';
import ContactLocationTab from '@/Components/Admin/Hotels/ContactLocationTab';
import PoolCriteriaTab from '@/Components/Admin/Hotels/PoolCriteriaTab';
import CreateAffiliateTab from '@/Components/Admin/Hotels/CreateAffiliateTab';
import SettingsTab from '@/Components/Admin/Hotels/SettingsTab';
import CreateImagesTab from '@/Components/Admin/Hotels/CreateImagesTab';
import BadgesTab from '@/Components/Admin/Hotels/BadgesTab';

// Form field groupings for tab switching on validation errors
const TAB_FIELDS = {
    basic: ['name', 'destination_id', 'description', 'star_rating', 'total_rooms'],
    contact: ['address', 'latitude', 'longitude', 'phone', 'email', 'website'],
    images: ['main_image', 'gallery_images'],
    pool: ['sunbed_count', 'sun_exposure', 'pool_size_category', 'pool_size_sqm', 'number_of_pools'],
    affiliate: ['booking_affiliate_url', 'expedia_affiliate_url', 'affiliate_provider', 'affiliate_tracking_code'],
    settings: ['is_active', 'is_verified', 'is_featured', 'subscription_tier'],
};

// Build initial form data from hotel object
const buildFormData = (hotel) => ({
    // Basic Info
    name: hotel.name || '',
    destination_id: hotel.destination_id || '',
    description: hotel.description || '',
    star_rating: hotel.star_rating || '',
    total_rooms: hotel.total_rooms || '',
    
    // Contact & Location
    address: hotel.address || '',
    latitude: hotel.latitude || '',
    longitude: hotel.longitude || '',
    phone: hotel.phone || '',
    email: hotel.email || '',
    website: hotel.website || '',
    
    // Images
    main_image: null,
    gallery_images: [],
    
    // Affiliate Links
    booking_affiliate_url: hotel.booking_affiliate_url || '',
    expedia_affiliate_url: hotel.expedia_affiliate_url || '',
    affiliate_provider: hotel.affiliate_provider || '',
    affiliate_tracking_code: hotel.affiliate_tracking_code || '',
    
    // Settings
    is_active: hotel.is_active || false,
    is_verified: hotel.is_verified || false,
    is_featured: hotel.is_featured || false,
    subscription_tier: hotel.subscription_tier || 'free',
    subscription_expires_at: hotel.subscription_expires_at || '',
    override_name: hotel.override_name || false,
    override_images: hotel.override_images || false,
    override_description: hotel.override_description || false,
    
    // Pool Criteria
    sunbed_count: hotel.pool_criteria?.sunbed_count || '',
    sun_exposure: hotel.pool_criteria?.sun_exposure || '',
    pool_size_category: hotel.pool_criteria?.pool_size_category || '',
    pool_size_sqm: hotel.pool_criteria?.pool_size_sqm || '',
    number_of_pools: hotel.pool_criteria?.number_of_pools || 1,
    pool_types: hotel.pool_criteria?.pool_types || [],
    sunbed_types: hotel.pool_criteria?.sunbed_types || [],
    sunny_areas: hotel.pool_criteria?.sunny_areas || [],
    towel_reservation_policy: hotel.pool_criteria?.towel_reservation_policy || '',
    towel_service_cost: hotel.pool_criteria?.towel_service_cost || '',
    pool_opening_hours: hotel.pool_criteria?.pool_opening_hours || '',
    shade_options: hotel.pool_criteria?.shade_options || [],
    bar_distance: hotel.pool_criteria?.bar_distance || '',
    toilet_distance: hotel.pool_criteria?.toilet_distance || '',
    atmosphere: hotel.pool_criteria?.atmosphere || '',
    music_level: hotel.pool_criteria?.music_level || '',
    entertainment_types: hotel.pool_criteria?.entertainment_types || [],
    cleanliness_rating: hotel.pool_criteria?.cleanliness_rating ? Math.round(Number(hotel.pool_criteria.cleanliness_rating)) : '',
    sunbed_condition_rating: hotel.pool_criteria?.sunbed_condition_rating ? Math.round(Number(hotel.pool_criteria.sunbed_condition_rating)) : '',
    tiling_condition_rating: hotel.pool_criteria?.tiling_condition_rating ? Math.round(Number(hotel.pool_criteria.tiling_condition_rating)) : '',
    lifeguard_hours: hotel.pool_criteria?.lifeguard_hours || '',
    kids_pool_depth_m: hotel.pool_criteria?.kids_pool_depth_m || '',
    
    // Pool Criteria - Boolean flags
    has_pool_bar: hotel.pool_criteria?.has_pool_bar || false,
    has_waiter_service: hotel.pool_criteria?.has_waiter_service || false,
    has_entertainment: hotel.pool_criteria?.has_entertainment || false,
    has_accessibility_ramp: hotel.pool_criteria?.has_accessibility_ramp || false,
    has_pool_hoist: hotel.pool_criteria?.has_pool_hoist || false,
    has_step_free_access: hotel.pool_criteria?.has_step_free_access || false,
    has_elevator_to_rooftop: hotel.pool_criteria?.has_elevator_to_rooftop || false,
    has_kids_pool: hotel.pool_criteria?.has_kids_pool || false,
    has_splash_park: hotel.pool_criteria?.has_splash_park || false,
    has_waterslide: hotel.pool_criteria?.has_waterslide || false,
    has_lifeguard: hotel.pool_criteria?.has_lifeguard || false,
    has_luxury_cabanas: hotel.pool_criteria?.has_luxury_cabanas || false,
    has_cabana_service: hotel.pool_criteria?.has_cabana_service || false,
    has_heated_pool: hotel.pool_criteria?.has_heated_pool || false,
    has_jacuzzi: hotel.pool_criteria?.has_jacuzzi || false,
    has_adult_sun_terrace: hotel.pool_criteria?.has_adult_sun_terrace || false,
});

export default function EditHotel({ hotel, destinations, badges, stats, errors: serverErrors = {}, oldInput = {} }) {
    const [activeTab, setActiveTab] = useState('basic');
    const [validationErrors, setValidationErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const { data, setData, errors: formErrors } = useForm({
        ...buildFormData(hotel),
        ...oldInput, // Restore old input if validation failed
    });
    const { props } = usePage();

    const tabs = ['basic', 'contact', 'images', 'pool', 'affiliate', 'settings', 'badges'];

    // Combine all error sources - server errors, form errors, page props errors, and local state
    const pageErrors = props?.errors || {};
    const allErrors = { 
        ...serverErrors,
        ...pageErrors, 
        ...formErrors,
        ...validationErrors 
    };
    const hasErrors = Object.keys(allErrors).length > 0;

    // Find which tab contains the first error
    const getTabWithError = (errorFields) => {
        for (const [tab, fields] of Object.entries(TAB_FIELDS)) {
            if (errorFields.some(field => fields.includes(field) || field.includes(tab))) {
                return tab;
            }
        }
        return 'basic';
    };

    // Form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors({}); // Clear previous errors
        setProcessing(true);

        // Use router.post with _method for proper PATCH with multipart/form-data
        router.post(route('admin.hotels.update', hotel.id), data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (page) => {
                setProcessing(false);
                const responseErrors = page?.props?.errors || {};
                if (Object.keys(responseErrors).length > 0) {
                    setValidationErrors(responseErrors);
                    const errorKeys = Object.keys(responseErrors);
                    setActiveTab(getTabWithError(errorKeys));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                if (page?.props?.flash?.success) {
                    toast.success(page.props.flash.success);
                }
            },
            onError: (errors) => {
                setProcessing(false);
                setValidationErrors(errors || {});
                const errorKeys = Object.keys(errors || {});
                if (errorKeys.length > 0) {
                    setActiveTab(getTabWithError(errorKeys));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    // Auto-assign badges
    const autoAssignBadges = () => {
        router.post(route('admin.hotels.auto-assign-badges', hotel.id), {}, {
            onSuccess: () => toast.success('Badges auto-assigned successfully!'),
            onError: () => toast.error('Failed to auto-assign badges'),
        });
    };

    return (
        <>
            <Head title={`Edit ${hotel.name}`} />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <AdminNav stats={stats} />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-full sm:w-auto">
                            <div className="flex items-start sm:items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{hotel.name}</h1>
                                <HotelStatusBadges hotel={hotel} />
                            </div>
                            <p className="text-gray-500 text-xs sm:text-sm">Edit hotel details and settings</p>
                        </div>
                        <div className="flex gap-2 flex-wrap w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={autoAssignBadges}
                                className="flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-xs sm:text-sm whitespace-nowrap"
                            >
                                Auto-Assign Badges
                            </button>
                            <Link
                                href={route('hotels.show', hotel.slug)}
                                target="_blank"
                                className="flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 sm:py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors text-xs sm:text-sm whitespace-nowrap text-center"
                            >
                                View Public Page
                            </Link>
                            <Link
                                href={route('admin.hotels.index')}
                                className="w-full sm:w-auto px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-xs sm:text-sm text-center"
                            >
                                ← Back
                            </Link>
                        </div>
                    </div>
                    {/* Validation Errors Display - prominent box that's always visible when there are errors */}
                    {hasErrors && <ValidationErrorsBox errors={allErrors} />}
                    
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Tab Navigation */}
                        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                        {/* Tab Content */}
                        <div className="bg-white rounded-b-xl shadow-sm p-3 sm:p-4 md:p-6 border border-gray-100 border-t-0">
                            <TabContent 
                                activeTab={activeTab}
                                data={data}
                                setData={setData}
                                errors={allErrors}
                                destinations={destinations}
                                hotel={hotel}
                                autoAssignBadges={autoAssignBadges}
                            />

                            {/* Action Buttons - Only show for editable tabs */}
                            {!['badges', 'images'].includes(activeTab) && (
                                <ActionButtons processing={processing} />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

// Sub-components for cleaner code

function HotelStatusBadges({ hotel }) {
    return (
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-full font-medium ${
                hotel.subscription_tier === 'premium' ? 'bg-purple-100 text-purple-700' :
                hotel.subscription_tier === 'enhanced' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-600'
            }`}>
                {hotel.subscription_tier}
            </span>
            {hotel.is_active && (
                <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-green-600 font-medium">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Active
                </span>
            )}
            {hotel.is_verified && (
                <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-blue-600 font-medium">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                    </svg>
                    Verified
                </span>
            )}
            {hotel.is_featured && (
                <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-orange-600 font-medium">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Featured
                </span>
            )}
        </div>
    );
}

function ValidationErrorsBox({ errors }) {
    // Normalize errors - handle both string and array formats
    const normalizedErrors = {};
    Object.entries(errors).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
            normalizedErrors[field] = messages[0]; // Take first error message
        } else if (typeof messages === 'string') {
            normalizedErrors[field] = messages;
        } else if (messages && typeof messages === 'object') {
            normalizedErrors[field] = JSON.stringify(messages);
        }
    });
    
    const errorCount = Object.keys(normalizedErrors).length;
    
    if (errorCount === 0) return null;
    
    return (
        <div className="mb-4 sm:mb-6 bg-red-50 border border-red-300 rounded-xl p-3 sm:p-4 md:p-5 shadow-sm">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3 sm:ml-4 flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-red-800 mb-1.5 sm:mb-2">
                        Validation Failed - {errorCount} error{errorCount > 1 ? 's' : ''} found
                    </h3>
                    <div className="bg-white rounded-lg p-2.5 sm:p-3 md:p-4 border border-red-200">
                        <ul className="space-y-1.5 sm:space-y-2">
                            {Object.entries(normalizedErrors).map(([field, message]) => (
                                <li key={field} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-red-700">
                                    <span className="text-red-500 flex-shrink-0">•</span>
                                    <span className="min-w-0">
                                        <span className="font-medium capitalize text-red-800">{field.replace(/_/g, ' ')}:</span>{' '}
                                        <span className="text-red-600 break-words">{message}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TabNavigation({ activeTab, setActiveTab }) {
    const tabConfig = [
        { id: 'basic', label: 'Basic Info' },
        { id: 'contact', label: 'Contact & Location' },
        { id: 'images', label: 'Images' },
        { id: 'pool', label: 'Pool Scoring' },
        { id: 'affiliate', label: 'Affiliate Links' },
        { id: 'settings', label: 'Settings' },
        { id: 'badges', label: 'Badges' },
    ];

    return (
        <div className="bg-gray-50 rounded-t-xl border border-gray-100 border-b-0 shadow-sm">
            <div className="flex gap-0.5 sm:gap-1 px-2 sm:px-3 md:px-4 pt-3 sm:pt-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {tabConfig.map(tab => (
                    <TabButton 
                        key={tab.id}
                        active={activeTab === tab.id} 
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </TabButton>
                ))}
            </div>
        </div>
    );
}

function TabContent({ activeTab, data, setData, errors, destinations, hotel, autoAssignBadges }) {
    const tabComponents = {
        basic: <CreateBasicInfoTab data={data} setData={setData} errors={errors} destinations={destinations} />,
        contact: <ContactLocationTab data={data} setData={setData} errors={errors} />,
        images: <CreateImagesTab data={data} setData={setData} errors={errors} hotel={hotel} />,
        pool: <PoolCriteriaTab data={data} setData={setData} errors={errors} />,
        affiliate: <CreateAffiliateTab data={data} setData={setData} errors={errors} />,
        settings: <SettingsTab data={data} setData={setData} errors={errors} />,
        badges: <BadgesTab hotel={hotel} autoAssignBadges={autoAssignBadges} />,
    };

    return tabComponents[activeTab] || null;
}

function ActionButtons({ processing }) {
    return (
        <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
            <Link
                href={route('admin.hotels.index')}
                className="px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-center text-xs sm:text-sm"
            >
                Cancel
            </Link>
            <button
                type="submit"
                disabled={processing}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors text-center text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {processing ? 'Updating...' : 'Update Hotel'}
            </button>
        </div>
    );
}

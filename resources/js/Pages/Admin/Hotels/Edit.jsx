import { Link, Head, useForm, router } from '@inertiajs/react';
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
    affiliate: ['booking_affiliate_url', 'expedia_affiliate_url', 'direct_booking_url', 'affiliate_provider', 'affiliate_tracking_code'],
    settings: ['is_active', 'is_verified', 'is_featured', 'subscription_tier'],
};

// Build initial form data from hotel object
const buildFormData = (hotel) => ({
    _method: 'PATCH',
    
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
    direct_booking_url: hotel.direct_booking_url || '',
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
    cleanliness_rating: hotel.pool_criteria?.cleanliness_rating || '',
    sunbed_condition_rating: hotel.pool_criteria?.sunbed_condition_rating || '',
    tiling_condition_rating: hotel.pool_criteria?.tiling_condition_rating || '',
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

export default function EditHotel({ hotel, destinations, badges, stats }) {
    const [activeTab, setActiveTab] = useState('basic');
    const { data, setData, post, processing, errors } = useForm(buildFormData(hotel));

    const tabs = ['basic', 'contact', 'images', 'pool', 'affiliate', 'settings', 'badges'];

    // Find which tab contains the first error
    const getTabWithError = (errorFields) => {
        for (const [tab, fields] of Object.entries(TAB_FIELDS)) {
            if (errorFields.some(field => fields.includes(field) || field.includes(tab))) {
                return tab;
            }
        }
        return 'basic';
    };

    // Handle validation errors - show toast and switch to relevant tab
    const handleValidationErrors = (validationErrors) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const errorFields = Object.keys(validationErrors || {});
        const firstError = Object.values(validationErrors || {})[0];
        const errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
        
        toast.error(errorMessage || 'Please fix the validation errors and try again.');
        setActiveTab(getTabWithError(errorFields));
    };

    // Form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Use transform to add _method to the form data for proper PATCH with multipart
        post(route('admin.hotels.update', hotel.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const serverErrors = page?.props?.errors || {};
                if (Object.keys(serverErrors).length > 0) {
                    handleValidationErrors(serverErrors);
                    return;
                }
                toast.success('Hotel updated successfully!');
            },
            onError: (validationErrors) => {
                handleValidationErrors(validationErrors);
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

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <>
            <Head title={`Edit ${hotel.name}`} />
            
            <div className="min-h-screen bg-white font-sans">
                <AdminNav stats={stats} />
                
                {/* Page Header */}
                <PageHeader hotel={hotel} autoAssignBadges={autoAssignBadges} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                    {/* Validation Errors Display */}
                    {hasErrors && <ValidationErrorsBox errors={errors} />}
                    
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Tab Navigation */}
                        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                        {/* Tab Content */}
                        <div className="bg-white rounded-b-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 md:p-8 border-2 border-gray-100 border-t-0">
                            <TabContent 
                                activeTab={activeTab}
                                data={data}
                                setData={setData}
                                errors={errors}
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
function PageHeader({ hotel, autoAssignBadges }) {
    return (
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
                        <HotelStatusBadges hotel={hotel} />
                    </div>
                    <div className="flex gap-2 sm:gap-3 flex-wrap justify-center sm:justify-end">
                        <button
                            type="button"
                            onClick={autoAssignBadges}
                            className="px-4 py-2 border-2 border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 font-bold transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            Auto-Assign Badges
                        </button>
                        <Link
                            href={route('hotels.show', hotel.slug)}
                            target="_blank"
                            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm whitespace-nowrap"
                        >
                            View Public Page
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HotelStatusBadges({ hotel }) {
    return (
        <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 sm:mt-4 flex-wrap">
            <span className={`px-4 py-2 text-sm rounded-full font-bold border-2 shadow-md ${
                hotel.subscription_tier === 'premium' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-600' :
                hotel.subscription_tier === 'enhanced' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600' :
                'bg-white text-gray-700 border-gray-300'
            }`}>
                {hotel.subscription_tier}
            </span>
            {hotel.is_active && (
                <span className="flex items-center gap-1.5 text-sm text-green-600 font-bold">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Active
                </span>
            )}
            {hotel.is_verified && (
                <span className="flex items-center gap-1.5 text-sm text-blue-600 font-bold">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                    </svg>
                    Verified
                </span>
            )}
            {hotel.is_featured && (
                <span className="flex items-center gap-1.5 text-sm text-orange-600 font-bold">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Featured
                </span>
            )}
        </div>
    );
}

function ValidationErrorsBox({ errors }) {
    return (
        <div className="mb-6 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-2xl p-5 shadow-lg">
            <h3 className="text-red-800 font-bold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                Please fix the following errors:
            </h3>
            <ul className="list-disc list-inside text-red-700 space-y-2">
                {Object.entries(errors).map(([field, messages]) => (
                    <li key={field}>
                        <span className="font-bold capitalize">{field.replace(/_/g, ' ')}:</span>{' '}
                        {Array.isArray(messages) ? messages.join(', ') : messages}
                    </li>
                ))}
            </ul>
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
        <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-t-2xl border-b-2 border-orange-200 shadow-lg">
            <div className="flex gap-2 px-6 pt-5 overflow-x-auto">
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
        <div className="mt-8 pt-6 border-t-2 border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
            <Link
                href={route('admin.hotels.index')}
                className="px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-bold transition-all duration-300 text-center text-sm sm:text-base transform hover:scale-105 shadow-md hover:shadow-lg"
            >
                Cancel
            </Link>
            <button
                type="submit"
                disabled={processing}
                className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
                {processing ? 'Updating...' : 'Update Hotel'}
            </button>
        </div>
    );
}

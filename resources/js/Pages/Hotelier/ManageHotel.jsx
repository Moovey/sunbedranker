import { Link, Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import TabButton from '@/Components/Admin/Hotels/TabButton';
import CreateBasicInfoTab from '@/Components/Admin/Hotels/CreateBasicInfoTab';
import ContactLocationTab from '@/Components/Admin/Hotels/ContactLocationTab';
import PoolCriteriaTab from '@/Components/Admin/Hotels/PoolCriteriaTab';
import CreateAffiliateTab from '@/Components/Admin/Hotels/CreateAffiliateTab';
import SettingsTab from '@/Components/Admin/Hotels/SettingsTab';
import CreateImagesTab from '@/Components/Admin/Hotels/CreateImagesTab';

export default function ManageHotel({ hotel, destinations, badges, flash, auth }) {
    const [activeTab, setActiveTab] = useState('basic');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const { data, setData, post, processing, errors } = useForm({
        name: hotel.name || '',
        destination_id: hotel.destination_id || '',
        description: hotel.description || '',
        address: hotel.address || '',
        latitude: hotel.latitude || '',
        longitude: hotel.longitude || '',
        star_rating: hotel.star_rating || '',
        total_rooms: hotel.total_rooms || '',
        phone: hotel.phone || '',
        email: hotel.email || '',
        website: hotel.website || '',
        booking_affiliate_url: hotel.booking_affiliate_url || '',
        expedia_affiliate_url: hotel.expedia_affiliate_url || '',
        direct_booking_url: hotel.direct_booking_url || '',
        affiliate_provider: hotel.affiliate_provider || '',
        affiliate_tracking_code: hotel.affiliate_tracking_code || '',
        is_active: hotel.is_active || false,
        override_name: hotel.override_name || false,
        override_images: hotel.override_images || false,
        override_description: hotel.override_description || false,
        
        // Images
        main_image: null,
        gallery_images: [],
        
        // Pool Criteria
        sunbed_count: hotel.pool_criteria?.sunbed_count || '',
        sun_exposure: hotel.pool_criteria?.sun_exposure || '',
        sunny_areas: hotel.pool_criteria?.sunny_areas || [],
        pool_size_sqm: hotel.pool_criteria?.pool_size_sqm || '',
        pool_size_category: hotel.pool_criteria?.pool_size_category || '',
        number_of_pools: hotel.pool_criteria?.number_of_pools || 1,
        pool_types: hotel.pool_criteria?.pool_types || [],
        towel_reservation_policy: hotel.pool_criteria?.towel_reservation_policy || '',
        towel_service_cost: hotel.pool_criteria?.towel_service_cost || '',
        pool_opening_hours: hotel.pool_criteria?.pool_opening_hours || '',
        sunbed_types: hotel.pool_criteria?.sunbed_types || [],
        shade_options: hotel.pool_criteria?.shade_options || [],
        has_pool_bar: hotel.pool_criteria?.has_pool_bar || false,
        has_waiter_service: hotel.pool_criteria?.has_waiter_service || false,
        bar_distance: hotel.pool_criteria?.bar_distance || '',
        toilet_distance: hotel.pool_criteria?.toilet_distance || '',
        atmosphere: hotel.pool_criteria?.atmosphere || '',
        music_level: hotel.pool_criteria?.music_level || '',
        has_entertainment: hotel.pool_criteria?.has_entertainment || false,
        entertainment_types: hotel.pool_criteria?.entertainment_types || [],
        cleanliness_rating: hotel.pool_criteria?.cleanliness_rating || '',
        sunbed_condition_rating: hotel.pool_criteria?.sunbed_condition_rating || '',
        tiling_condition_rating: hotel.pool_criteria?.tiling_condition_rating || '',
        has_accessibility_ramp: hotel.pool_criteria?.has_accessibility_ramp || false,
        has_pool_hoist: hotel.pool_criteria?.has_pool_hoist || false,
        has_step_free_access: hotel.pool_criteria?.has_step_free_access || false,
        has_elevator_to_rooftop: hotel.pool_criteria?.has_elevator_to_rooftop || false,
        has_kids_pool: hotel.pool_criteria?.has_kids_pool || false,
        kids_pool_depth_m: hotel.pool_criteria?.kids_pool_depth_m || '',
        has_splash_park: hotel.pool_criteria?.has_splash_park || false,
        has_waterslide: hotel.pool_criteria?.has_waterslide || false,
        has_lifeguard: hotel.pool_criteria?.has_lifeguard || false,
        lifeguard_hours: hotel.pool_criteria?.lifeguard_hours || '',
        has_luxury_cabanas: hotel.pool_criteria?.has_luxury_cabanas || false,
        has_cabana_service: hotel.pool_criteria?.has_cabana_service || false,
        has_heated_pool: hotel.pool_criteria?.has_heated_pool || false,
        has_jacuzzi: hotel.pool_criteria?.has_jacuzzi || false,
        has_adult_sun_terrace: hotel.pool_criteria?.has_adult_sun_terrace || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting data:', data);
        post(route('hotelier.hotels.update', hotel.slug), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Hotel updated successfully with Pool & Sun Score recalculated!');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
                const errorMessages = Object.values(errors).flat();
                errorMessages.forEach(error => {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 4000,
                    });
                });
            },
        });
    };

    return (
        <>
            <Head title={`Manage ${hotel.name}`} />
            
            <div className="min-h-screen bg-white font-sans">
                {/* Header Navigation */}
                <nav className="bg-white border-b-4 border-orange-400 shadow-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-14 sm:h-16">
                            {/* Logo and Brand */}
                            <div className="flex items-center gap-4 sm:gap-8">
                                <Link href="/" className="flex items-center flex-shrink-0">
                                    <span className="text-xl sm:text-2xl font-bold">
                                        <span className="text-red-500">sun</span>
                                        <span className="text-orange-500">bed</span>
                                        <span className="text-blue-500">ranker</span>
                                    </span>
                                    <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-bold text-gray-700 border-l-2 pl-2 sm:pl-3">Hotelier</span>
                                </Link>

                                {/* Desktop Navigation Links */}
                                <div className="hidden md:flex items-center gap-1">
                                    <Link
                                        href={route('hotelier.dashboard')}
                                        className="px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 text-gray-700 hover:bg-orange-50"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route('hotelier.claims.index')}
                                        className="px-3 py-2 rounded-lg text-sm font-bold transition-all duration-300 text-gray-700 hover:bg-orange-50"
                                    >
                                        My Claims
                                    </Link>
                                </div>
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center gap-2 sm:gap-4">
                                {/* Back to Site */}
                                <Link
                                    href="/"
                                    className="hidden sm:block text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300"
                                >
                                    ← Back to Site
                                </Link>

                                {/* User Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                                        className="flex items-center gap-2 px-2 sm:px-3 py-2 border-2 border-gray-300 rounded-lg hover:border-orange-300 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-md">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden sm:block text-sm font-bold text-gray-900">{auth.user.name}</span>
                                        <svg className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {showUserDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-gray-200 py-1 z-50">
                                            <Link
                                                href={route('hotelier.dashboard')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 font-bold transition-colors duration-200"
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 font-bold transition-colors duration-200"
                                            >
                                                Logout
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                
                {/* Page Header */}
                <div className="bg-gradient-to-r from-orange-50 to-blue-50 shadow-lg border-b-2 border-orange-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
                        {/* Decorative accent */}
                        <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                            <div className="h-1 w-8 sm:w-10 md:w-12 bg-orange-300 rounded-full"></div>
                            <svg className="mx-3 sm:mx-4 text-orange-500" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                            </svg>
                            <div className="h-1 w-8 sm:w-10 md:w-12 bg-blue-300 rounded-full"></div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left flex-1">
                                <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900">{hotel.name}</h1>
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
                            </div>
                            <div className="flex gap-2 sm:gap-3 flex-wrap justify-center sm:justify-end">
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
                    {/* Validation Errors Display */}
                    {Object.keys(errors).length > 0 && (
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
                                        <span className="font-bold">{field}:</span> {Array.isArray(messages) ? messages.join(', ') : messages}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        {/* Tabs */}
                        <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-t-2xl border-b-2 border-orange-200 shadow-lg">
                            <div className="flex gap-2 px-6 pt-5 overflow-x-auto">
                                <TabButton active={activeTab === 'basic'} onClick={() => setActiveTab('basic')}>
                                    Basic Info
                                </TabButton>
                                <TabButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')}>
                                    Contact & Location
                                </TabButton>
                                <TabButton active={activeTab === 'images'} onClick={() => setActiveTab('images')}>
                                    Images
                                </TabButton>
                                <TabButton active={activeTab === 'pool'} onClick={() => setActiveTab('pool')}>
                                    Pool Scoring
                                </TabButton>
                                <TabButton active={activeTab === 'affiliate'} onClick={() => setActiveTab('affiliate')}>
                                    Affiliate Links
                                </TabButton>
                                <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
                                    Settings
                                </TabButton>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white rounded-b-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 md:p-8 border-2 border-gray-100 border-t-0">
                            {activeTab === 'basic' && (
                                <CreateBasicInfoTab
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    destinations={destinations}
                                />
                            )}

                            {activeTab === 'contact' && (
                                <ContactLocationTab
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            )}

                            {activeTab === 'images' && (
                                <CreateImagesTab
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    hotel={hotel}
                                />
                            )}

                            {activeTab === 'pool' && (
                                <PoolCriteriaTab
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            )}

                            {activeTab === 'affiliate' && (
                                <CreateAffiliateTab
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            )}

                            {activeTab === 'settings' && (
                                <SettingsTab
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            )}

                            {/* Action Buttons - Only show for non-images tabs */}
                            {activeTab !== 'images' && (
                                <div className="mt-8 pt-6 border-t-2 border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
                                    <Link
                                        href={route('hotelier.claims.index')}
                                        className="px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-bold transition-all duration-300 text-center text-sm sm:text-base transform hover:scale-105 shadow-md hover:shadow-lg"
                                    >
                                        Back to My Claims
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                    >
                                        {processing ? 'Updating...' : 'Update Hotel & Recalculate Scores'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

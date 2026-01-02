import { Link, Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '@/Components/AdminNav';
import TabButton from '@/Components/Admin/Hotels/TabButton';
import CreateBasicInfoTab from '@/Components/Admin/Hotels/CreateBasicInfoTab';
import ContactLocationTab from '@/Components/Admin/Hotels/ContactLocationTab';
import PoolCriteriaTab from '@/Components/Admin/Hotels/PoolCriteriaTab';
import CreateAffiliateTab from '@/Components/Admin/Hotels/CreateAffiliateTab';
import SettingsTab from '@/Components/Admin/Hotels/SettingsTab';
import CreateImagesTab from '@/Components/Admin/Hotels/CreateImagesTab';
import SubscriptionTab from '@/Components/Admin/Hotels/SubscriptionTab';
import BadgesTab from '@/Components/Admin/Hotels/BadgesTab';

export default function EditHotel({ hotel, destinations, badges, flash, stats }) {
    const [activeTab, setActiveTab] = useState('basic');

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const { data, setData, post, patch, processing, errors } = useForm({
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
        is_verified: hotel.is_verified || false,
        is_featured: hotel.is_featured || false,
        subscription_tier: hotel.subscription_tier || 'free',
        subscription_expires_at: hotel.subscription_expires_at || '',
        override_name: hotel.override_name || false,
        override_images: hotel.override_images || false,
        override_description: hotel.override_description || false,
        
        // Images
        main_image: null,
        gallery_images: [],
        
        // ============================================
        // POOL CRITERIA - 10 Core Metrics for Ranking
        // ============================================
        
        // 1. Sunbed-to-Guest Ratio
        sunbed_count: hotel.pool_criteria?.sunbed_count || '',
        
        // 2. Sun Exposure & Orientation
        sun_exposure: hotel.pool_criteria?.sun_exposure || '',
        sunny_areas: hotel.pool_criteria?.sunny_areas || [],
        
        // 3. Pool Area Size & Variety
        pool_size_sqm: hotel.pool_criteria?.pool_size_sqm || '',
        pool_size_category: hotel.pool_criteria?.pool_size_category || '',
        number_of_pools: hotel.pool_criteria?.number_of_pools || 1,
        pool_types: hotel.pool_criteria?.pool_types || [],
        
        // 4. Towel & Reservation Policy
        towel_reservation_policy: hotel.pool_criteria?.towel_reservation_policy || '',
        towel_service_cost: hotel.pool_criteria?.towel_service_cost || '',
        pool_opening_hours: hotel.pool_criteria?.pool_opening_hours || '',
        
        // 5. Pool Facilities & Comfort
        sunbed_types: hotel.pool_criteria?.sunbed_types || [],
        shade_options: hotel.pool_criteria?.shade_options || [],
        has_pool_bar: hotel.pool_criteria?.has_pool_bar || false,
        has_waiter_service: hotel.pool_criteria?.has_waiter_service || false,
        bar_distance: hotel.pool_criteria?.bar_distance || '',
        toilet_distance: hotel.pool_criteria?.toilet_distance || '',
        
        // 6. Noise & Atmosphere
        atmosphere: hotel.pool_criteria?.atmosphere || '',
        music_level: hotel.pool_criteria?.music_level || '',
        has_entertainment: hotel.pool_criteria?.has_entertainment || false,
        entertainment_types: hotel.pool_criteria?.entertainment_types || [],
        
        // 7. Cleanliness & Maintenance
        cleanliness_rating: hotel.pool_criteria?.cleanliness_rating || '',
        sunbed_condition_rating: hotel.pool_criteria?.sunbed_condition_rating || '',
        tiling_condition_rating: hotel.pool_criteria?.tiling_condition_rating || '',
        
        // 8. Accessibility
        has_accessibility_ramp: hotel.pool_criteria?.has_accessibility_ramp || false,
        has_pool_hoist: hotel.pool_criteria?.has_pool_hoist || false,
        has_step_free_access: hotel.pool_criteria?.has_step_free_access || false,
        has_elevator_to_rooftop: hotel.pool_criteria?.has_elevator_to_rooftop || false,
        
        // 9. Kids & Family Facilities
        has_kids_pool: hotel.pool_criteria?.has_kids_pool || false,
        kids_pool_depth_m: hotel.pool_criteria?.kids_pool_depth_m || '',
        has_splash_park: hotel.pool_criteria?.has_splash_park || false,
        has_waterslide: hotel.pool_criteria?.has_waterslide || false,
        has_lifeguard: hotel.pool_criteria?.has_lifeguard || false,
        lifeguard_hours: hotel.pool_criteria?.lifeguard_hours || '',
        
        // 10. Extras & Luxury Touches
        has_luxury_cabanas: hotel.pool_criteria?.has_luxury_cabanas || false,
        has_cabana_service: hotel.pool_criteria?.has_cabana_service || false,
        has_heated_pool: hotel.pool_criteria?.has_heated_pool || false,
        has_jacuzzi: hotel.pool_criteria?.has_jacuzzi || false,
        has_adult_sun_terrace: hotel.pool_criteria?.has_adult_sun_terrace || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting data:', data);
        data._method = 'PATCH';
        post(route('admin.hotels.update', hotel.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Hotel updated successfully with Pool & Sun Score recalculated!');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
                const errorMessages = Object.values(errors).flat();
                toast.error(errorMessages[0] || 'Failed to update hotel. Please check the form.');
            },
        });
    };

    const updateSubscription = async () => {
        router.post(route('admin.hotels.update-subscription', hotel.id), {
            subscription_tier: data.subscription_tier,
            subscription_expires_at: data.subscription_expires_at,
        }, {
            onSuccess: () => toast.success('Subscription updated successfully!'),
            onError: () => toast.error('Failed to update subscription')
        });
    };

    const autoAssignBadges = () => {
        router.post(route('admin.hotels.auto-assign-badges', hotel.id), {}, {
            onSuccess: () => toast.success('Badges auto-assigned successfully!'),
            onError: () => toast.error('Failed to auto-assign badges')
        });
    };

    return (
        <>
            <Head title={`Edit ${hotel.name}`} />
            
            <div className="min-h-screen bg-neutral-50 font-sans-luxury">
                <AdminNav stats={stats} />
                
                {/* Page Header */}
                <div className="bg-white shadow-sm border-b border-neutral-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
                        {/* Decorative accent */}
                        <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                            <div className="h-px w-8 sm:w-10 md:w-12 bg-neutral-300"></div>
                            <svg className="mx-3 sm:mx-4 text-neutral-400" width="16" height="16" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2L11.5 8.5L18 10L11.5 11.5L10 18L8.5 11.5L2 10L8.5 8.5L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                            <div className="h-px w-8 sm:w-10 md:w-12 bg-neutral-300"></div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left flex-1">
                                <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight">{hotel.name}</h1>
                                <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 sm:mt-4 flex-wrap">
                                    <span className={`px-3 py-1 text-xs rounded-full font-light ${
                                        hotel.subscription_tier === 'premium' ? 'bg-purple-100 text-purple-700' :
                                        hotel.subscription_tier === 'enhanced' ? 'bg-blue-100 text-blue-700' :
                                        'bg-neutral-100 text-neutral-600'
                                    }`}>
                                        {hotel.subscription_tier}
                                    </span>
                                    {hotel.is_active && <span className="text-sm text-green-600 font-light">● Active</span>}
                                    {hotel.is_verified && <span className="text-sm text-blue-600 font-light">✓ Verified</span>}
                                    {hotel.is_featured && <span className="text-sm text-orange-600 font-light">⭐ Featured</span>}
                                </div>
                            </div>
                            <div className="flex gap-2 sm:gap-3 flex-wrap justify-center sm:justify-end">
                                <button
                                    onClick={autoAssignBadges}
                                    className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 font-light transition-all duration-300 tracking-wide text-sm"
                                >
                                    Auto-Assign Badges
                                </button>
                                <Link
                                    href={route('hotels.show', hotel.slug)}
                                    target="_blank"
                                    className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 font-light transition-all duration-300 tracking-wide hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] text-sm whitespace-nowrap"
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
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                            <h3 className="text-red-800 font-semibold mb-2">Please fix the following errors:</h3>
                            <ul className="list-disc list-inside text-red-700 space-y-1">
                                {Object.entries(errors).map(([field, messages]) => (
                                    <li key={field}>
                                        <span className="font-medium">{field}:</span> {Array.isArray(messages) ? messages.join(', ') : messages}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        {/* Tabs */}
                        <div className="bg-white rounded-t-xl border-b border-neutral-200 shadow-lg">
                        <div className="flex gap-1 px-6 pt-4 overflow-x-auto">
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
                            <TabButton active={activeTab === 'subscription'} onClick={() => setActiveTab('subscription')}>
                                Subscription
                            </TabButton>
                            <TabButton active={activeTab === 'badges'} onClick={() => setActiveTab('badges')}>
                                Badges
                            </TabButton>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-b-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-5 sm:p-6 md:p-8 border border-neutral-100 border-t-0">
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

                        {activeTab === 'subscription' && (
                            <SubscriptionTab
                                data={data}
                                setData={setData}
                                updateSubscription={updateSubscription}
                            />
                        )}

                        {activeTab === 'badges' && (
                            <BadgesTab
                                hotel={hotel}
                                autoAssignBadges={autoAssignBadges}
                            />
                        )}

                        {/* Action Buttons - Only show for non-subscription/badges tabs */}
                        {!['subscription', 'badges', 'images'].includes(activeTab) && (
                            <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row gap-3 justify-end">
                                <Link
                                    href={route('admin.hotels.index')}
                                    className="px-4 sm:px-6 py-3 sm:py-4 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 font-light transition-all duration-300 text-center tracking-wide text-sm sm:text-base"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 sm:px-6 py-3 sm:py-4 bg-neutral-900 text-white font-light rounded-lg hover:bg-neutral-800 transition-all duration-300 text-center tracking-wide hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
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

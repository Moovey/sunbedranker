import { Link, Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '@/Components/AdminNav';
import TabButton from '@/Components/Admin/Hotels/TabButton';
import CreateBasicInfoTab from '@/Components/Admin/Hotels/CreateBasicInfoTab';
import ContactLocationTab from '@/Components/Admin/Hotels/ContactLocationTab';
import PoolFeaturesTab from '@/Components/Admin/Hotels/PoolFeaturesTab';
import CreateAffiliateTab from '@/Components/Admin/Hotels/CreateAffiliateTab';
import SettingsTab from '@/Components/Admin/Hotels/SettingsTab';

export default function CreateHotel({ destinations, stats }) {
    const [activeTab, setActiveTab] = useState('basic');

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        destination_id: '',
        description: '',
        address: '',
        latitude: '',
        longitude: '',
        star_rating: '',
        total_rooms: '',
        phone: '',
        email: '',
        website: '',
        booking_affiliate_url: '',
        expedia_affiliate_url: '',
        direct_booking_url: '',
        affiliate_provider: '',
        affiliate_tracking_code: '',
        is_active: true,
        is_verified: false,
        is_featured: false,
        subscription_tier: 'free',
        // Pool & Features
        pool_overview: [],
        pool_overview_other: '',
        pool_details: [],
        pool_details_other: '',
        sun_exposure: '',
        number_of_pools: '',
        shade_options: [],
        shade_options_other: '',
        special_features: [],
        special_features_other: '',
        atmosphere_vibe: [],
        atmosphere_vibe_other: '',
        family_features: [],
        family_features_other: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.hotels.store'), {
            onSuccess: () => {
                toast.success('Hotel created successfully!');
            },
            onError: () => {
                toast.error('Failed to create hotel. Please check the form.');
            },
        });
    };

    return (
        <>
            <Head title="Add New Hotel" />
            
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
                        <div className="text-center sm:text-left">
                            <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight">Add New Hotel</h1>
                            <p className="text-neutral-600 mt-2 font-light tracking-wide">Create a new hotel listing</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
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
                                <TabButton active={activeTab === 'pool'} onClick={() => setActiveTab('pool')}>
                                    Pool & Features
                                </TabButton>
                                <TabButton active={activeTab === 'affiliate'} onClick={() => setActiveTab('affiliate')}>
                                    Affiliate Links
                                </TabButton>
                                <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
                                    Settings
                                </TabButton>
                            </div>
                        </div>

                        {/* Form Content */}
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

                            {activeTab === 'pool' && (
                                <PoolFeaturesTab
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    processing={processing}
                                    handleSubmit={handleSubmit}
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

                            {/* Action Buttons */}
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
                                    {processing ? 'Creating...' : 'Create Hotel'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

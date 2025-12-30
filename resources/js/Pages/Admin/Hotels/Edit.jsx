import { Link, Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminNav from '@/Components/AdminNav';
import TabButton from '@/Components/Admin/Hotels/TabButton';
import BasicInfoTab from '@/Components/Admin/Hotels/BasicInfoTab';
import ImagesTab from '@/Components/Admin/Hotels/ImagesTab';
import PoolFeaturesTab from '@/Components/Admin/Hotels/PoolFeaturesTab';
import SubscriptionTab from '@/Components/Admin/Hotels/SubscriptionTab';
import AffiliateTab from '@/Components/Admin/Hotels/AffiliateTab';
import BadgesTab from '@/Components/Admin/Hotels/BadgesTab';

export default function EditHotel({ hotel, destinations, badges, flash, stats }) {
    const [activeTab, setActiveTab] = useState('basic');
    const [uploadingMain, setUploadingMain] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const { data, setData, patch, processing, errors } = useForm({
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
        // Pool & Features
        pool_overview: hotel.pool_criteria?.pool_overview || [],
        pool_overview_other: '',
        pool_details: hotel.pool_criteria?.pool_details || [],
        pool_details_other: '',
        sun_exposure: hotel.pool_criteria?.sun_exposure || '',
        number_of_pools: hotel.pool_criteria?.number_of_pools || '',
        shade_options: hotel.pool_criteria?.shade_options || [],
        shade_options_other: '',
        special_features: hotel.pool_criteria?.special_features_list || [],
        special_features_other: '',
        atmosphere_vibe: hotel.pool_criteria?.atmosphere_vibe || [],
        atmosphere_vibe_other: '',
        family_features: hotel.pool_criteria?.family_features || [],
        family_features_other: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.hotels.update', hotel.id), {
            onSuccess: () => {
                toast.success('Hotel updated successfully!');
            },
            onError: () => {
                toast.error('Failed to update hotel. Please check the form.');
            }
        });
    };

    const handleMainImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploadingMain(true);
        try {
            await axios.post(route('admin.hotels.upload-main-image', hotel.id), formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            router.reload({ only: ['hotel'] });
            toast.success('Main image uploaded successfully!');
        } catch (error) {
            toast.error('Failed to upload image');
        } finally {
            setUploadingMain(false);
        }
    };

    const handleGalleryUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        setUploadingGallery(true);
        try {
            await axios.post(route('admin.hotels.upload-gallery-images', hotel.id), formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            router.reload({ only: ['hotel'] });
            toast.success('Gallery images uploaded successfully!');
        } catch (error) {
            toast.error('Failed to upload images');
        } finally {
            setUploadingGallery(false);
        }
    };

    const deleteGalleryImage = async (imagePath) => {
        if (!confirm('Delete this image?')) return;

        try {
            await axios.delete(route('admin.hotels.delete-gallery-image', hotel.id), {
                data: { image_path: imagePath }
            });
            router.reload({ only: ['hotel'] });
            toast.success('Image deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete image');
        }
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
                    {/* Tabs */}
                    <div className="bg-white rounded-t-xl border-b border-neutral-200">
                        <div className="flex gap-1 px-6 pt-4">
                            <TabButton active={activeTab === 'basic'} onClick={() => setActiveTab('basic')}>
                                Basic Info
                            </TabButton>
                            <TabButton active={activeTab === 'images'} onClick={() => setActiveTab('images')}>
                                Images
                            </TabButton>
                            <TabButton active={activeTab === 'pool'} onClick={() => setActiveTab('pool')}>
                                Pool & Features
                            </TabButton>
                            <TabButton active={activeTab === 'subscription'} onClick={() => setActiveTab('subscription')}>
                                Subscription
                            </TabButton>
                            <TabButton active={activeTab === 'affiliate'} onClick={() => setActiveTab('affiliate')}>
                                Affiliate
                            </TabButton>
                            <TabButton active={activeTab === 'badges'} onClick={() => setActiveTab('badges')}>
                                Badges
                            </TabButton>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-b-xl shadow-lg p-8">
                        {activeTab === 'basic' && (
                            <BasicInfoTab
                                data={data}
                                setData={setData}
                                errors={errors}
                                processing={processing}
                                destinations={destinations}
                                handleSubmit={handleSubmit}
                            />
                        )}

                        {activeTab === 'images' && (
                            <ImagesTab
                                hotel={hotel}
                                uploadingMain={uploadingMain}
                                uploadingGallery={uploadingGallery}
                                handleMainImageUpload={handleMainImageUpload}
                                handleGalleryUpload={handleGalleryUpload}
                                deleteGalleryImage={deleteGalleryImage}
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

                        {activeTab === 'subscription' && (
                            <SubscriptionTab
                                data={data}
                                setData={setData}
                                updateSubscription={updateSubscription}
                            />
                        )}

                        {activeTab === 'affiliate' && (
                            <AffiliateTab
                                hotel={hotel}
                                data={data}
                                setData={setData}
                                errors={errors}
                                processing={processing}
                                handleSubmit={handleSubmit}
                            />
                        )}

                        {activeTab === 'badges' && (
                            <BadgesTab
                                hotel={hotel}
                                autoAssignBadges={autoAssignBadges}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

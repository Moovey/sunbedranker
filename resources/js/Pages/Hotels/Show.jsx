import { Head, router } from '@inertiajs/react';
import { useState, useCallback, useMemo } from 'react';
import Header from '@/Components/Header';

// Import all components from the organized structure
import {
    // Hero Section
    Breadcrumb,
    HeroSection,
    
    // Pool Details Section
    PoolDetailsMetrics,
    SunbedAvailabilitySection,
    SunExposureSection,
    PoolSizeSection,
    FacilitiesSection,
    AtmosphereSection,
    CleanlinessSection,
    AccessibilitySection,
    KidsFeaturesSection,
    LuxuryFeaturesSection,
    
    // Pool Features Section (List-based)
    PoolOverviewSection,
    PoolDetailsListSection,
    ShadeOptionsSection,
    SpecialFeaturesListSection,
    AtmosphereVibeSection,
    FamilyFeaturesListSection,
    FamilyFeaturesIconsSection,
    
    // Hotelier Content Section
    PoolDescriptionSection,
    AmenitiesDescriptionSection,
    HouseRulesSection,
    TowelPolicySection,
    FaqsSection,
    PhotoGallerySection,
    EnhancedProfileSection,
    ReviewsSection,
    
    // Sidebar Components
    Sidebar,
    
    // Similar Hotels
    SimilarHotelsSection,
} from '@/Components/Hotels';

// ============================================
// MAIN COMPONENT
// ============================================

export default function HotelShow({ hotel, similarHotels }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    // Memoized values
    const allImages = useMemo(() => [
        hotel.main_image_url,
        ...(hotel.gallery_images_urls || [])
    ].filter(Boolean), [hotel.main_image_url, hotel.gallery_images_urls]);

    const poolCriteria = hotel.pool_criteria;

    // Memoized handlers
    const handleBookingClick = useCallback((type) => {
        router.get(`/hotels/${hotel.slug}/click?type=${type}`);
    }, [hotel.slug]);

    const toggleFaq = useCallback((index) => {
        setOpenFaqIndex(prev => prev === index ? null : index);
    }, []);

    const handlePrevImage = useCallback(() => {
        setActiveImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1);
    }, [allImages.length]);

    const handleNextImage = useCallback(() => {
        setActiveImageIndex(prev => (prev + 1) % allImages.length);
    }, [allImages.length]);

    return (
        <>
            <Head title={`${hotel.name} - Pool & Sunbed Review`} />
            
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Header />
                
                {/* Breadcrumb Navigation */}
                <Breadcrumb hotel={hotel} />

                {/* Hero Section with Image Gallery, Map & Score */}
                <HeroSection 
                    hotel={hotel}
                    allImages={allImages}
                    activeImageIndex={activeImageIndex}
                    onPrevImage={handlePrevImage}
                    onNextImage={handleNextImage}
                />

                {/* Main Content Area */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
                        
                        {/* Main Content Column */}
                        <div className="lg:col-span-2 space-y-5 sm:space-y-6 lg:space-y-7 xl:space-y-8">
                            
                            {/* Pool Details - Metrics Table */}
                            <PoolDetailsMetrics poolCriteria={poolCriteria} />

                            {/* Pool Overview Features (List-based sections) */}
                            <PoolOverviewSection poolCriteria={poolCriteria} />
                            <PoolDetailsListSection poolCriteria={poolCriteria} />
                            <ShadeOptionsSection poolCriteria={poolCriteria} />
                            <SpecialFeaturesListSection poolCriteria={poolCriteria} />
                            <AtmosphereVibeSection poolCriteria={poolCriteria} />
                            <FamilyFeaturesListSection poolCriteria={poolCriteria} />
                            <FamilyFeaturesIconsSection poolCriteria={poolCriteria} />

                            {/* Comprehensive Pool Criteria Details */}
                            {poolCriteria && (
                                <>
                                    <SunbedAvailabilitySection poolCriteria={poolCriteria} />
                                    <SunExposureSection poolCriteria={poolCriteria} />
                                    <PoolSizeSection poolCriteria={poolCriteria} />
                                    <FacilitiesSection poolCriteria={poolCriteria} />
                                    <AtmosphereSection poolCriteria={poolCriteria} />
                                    <CleanlinessSection poolCriteria={poolCriteria} />
                                    <AccessibilitySection poolCriteria={poolCriteria} />
                                    <KidsFeaturesSection poolCriteria={poolCriteria} />
                                    <LuxuryFeaturesSection poolCriteria={poolCriteria} />
                                </>
                            )}

                            {/* Hotelier-Provided Content Sections */}
                            <PoolDescriptionSection hotel={hotel} />
                            <AmenitiesDescriptionSection hotel={hotel} />
                            <HouseRulesSection hotel={hotel} />
                            <TowelPolicySection hotel={hotel} />
                            <FaqsSection 
                                hotel={hotel} 
                                openFaqIndex={openFaqIndex} 
                                toggleFaq={toggleFaq} 
                            />

                            {/* Photo Gallery */}
                            <PhotoGallerySection 
                                allImages={allImages}
                                activeImageIndex={activeImageIndex}
                                setActiveImageIndex={setActiveImageIndex}
                                hotelName={hotel.name}
                            />

                            {/* Enhanced Profile Content */}
                            <EnhancedProfileSection hotel={hotel} />

                            {/* Reviews Section */}
                            <ReviewsSection hotel={hotel} />
                        </div>

                        {/* Sidebar */}
                        <Sidebar hotel={hotel} onBookingClick={handleBookingClick} />
                    </div>

                    {/* Similar Hotels */}
                    <SimilarHotelsSection 
                        similarHotels={similarHotels} 
                        destinationName={hotel.destination.name} 
                    />
                </div>
            </div>
        </>
    );
}



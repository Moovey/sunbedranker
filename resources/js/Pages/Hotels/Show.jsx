import { Head, router } from '@inertiajs/react';
import { useState, useCallback, useMemo } from 'react';
import { useAppUrl } from '@/hooks/useAppUrl';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

// Import all components from the organized structure
import {
    // Hero Section
    Breadcrumb,
    HeroSection,
    
    // Pool Details Section (Following Pool Criteria Tab Order)
    // 1. Sunbed-to-Guest Ratio
    SunbedAvailabilitySection,
    
    // 2. Sun Exposure & Orientation
    SunExposureSection,
    
    // 3. Pool Area Size & Variety
    PoolSizeSection,
    
    // 4. Towel & Reservation Policy
    TowelReservationSection,
    
    // 5. Pool Facilities & Comfort
    FacilitiesSection,
    
    // 6. Noise & Atmosphere
    AtmosphereSection,
    
    // 7. Cleanliness & Maintenance
    CleanlinessSection,
    
    // 8. Accessibility Features
    AccessibilitySection,
    
    // 9. Kids & Family Facilities
    KidsFeaturesSection,
    
    // 10. Extras & Luxury Touches
    LuxuryFeaturesSection,
    
    // Hotelier Content Section
    PoolDescriptionSection,
    AmenitiesDescriptionSection,
    HouseRulesSection,
    TowelPolicySection,
    FaqsSection,
    PhotoGallerySection,
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
    const appUrl = useAppUrl();

    // Memoized values
    const allImages = useMemo(() => [
        hotel.main_image_url,
        ...(hotel.gallery_images_urls || [])
    ].filter(Boolean), [hotel.main_image_url, hotel.gallery_images_urls]);

    const poolCriteria = hotel.pool_criteria;

    // Memoized handlers
    const handleBookingClick = useCallback((type) => {
        window.location.href = `/hotels/${hotel.slug}/click?type=${type}`;
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
            <Head title={`${hotel.name} - Pool & Sunbed Review`}>
                <meta name="description" content={`Detailed pool and sunbed review of ${hotel.name} in ${hotel.destination?.name || ''}. See sunbed-to-guest ratio, sun exposure, atmosphere ratings, pool facilities, and honest traveler reviews.`} />
                <meta property="og:title" content={`${hotel.name} - Pool & Sunbed Review | Sunbed Ranker`} />
                <meta property="og:description" content={`Detailed pool and sunbed review of ${hotel.name}. See sunbed ratios, sun exposure, atmosphere ratings, and more.`} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`${appUrl}/hotels/${hotel.slug}`} />
                {hotel.main_image_url && <meta property="og:image" content={hotel.main_image_url} />}
                <meta property="og:site_name" content="Sunbed Ranker" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${hotel.name} - Pool & Sunbed Review`} />
                <meta name="twitter:description" content={`Detailed pool review of ${hotel.name}. Sunbed ratios, facilities, and honest reviews.`} />
                {hotel.main_image_url && <meta name="twitter:image" content={hotel.main_image_url} />}
                <link rel="canonical" href={`${appUrl}/hotels/${hotel.slug}`} />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Hotel",
                    "name": hotel.name,
                    "description": `Pool and sunbed review of ${hotel.name}`,
                    "url": `${appUrl}/hotels/${hotel.slug}`,
                    "image": hotel.main_image_url || '',
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": hotel.destination?.name || ''
                    },
                    ...(hotel.overall_score ? { "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": hotel.overall_score,
                        "bestRating": 10,
                        "worstRating": 0,
                        "ratingCount": hotel.review_count || 1
                    }} : {})
                })}</script>
            </Head>
            
            <div className="min-h-screen bg-white">
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
                    onBookingClick={handleBookingClick}
                />

                {/* Main Content Area */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
                        
                        {/* Main Content Column */}
                        <div className="lg:col-span-2 space-y-5 sm:space-y-6 lg:space-y-7 xl:space-y-8">
                            
                            {/* Hotel Overview / About */}
                            {hotel.description && (() => {
                                // Split the Agoda overview into readable paragraphs
                                // The text often has no line breaks - split on topic-shifting sentence patterns
                                const formatDescription = (text) => {
                                    // First fix missing spaces after periods (e.g. "available.The" → "available. The")
                                    let cleaned = text.replace(/\.([A-Z])/g, '. $1');
                                    
                                    // Split into sentences
                                    const sentences = cleaned.match(/[^.!?]+[.!?]+/g) || [cleaned];
                                    
                                    // Group sentences into paragraphs (~2-3 sentences each)
                                    const paragraphs = [];
                                    for (let i = 0; i < sentences.length; i += 3) {
                                        paragraphs.push(sentences.slice(i, i + 3).join('').trim());
                                    }
                                    
                                    return paragraphs;
                                };

                                const paragraphs = formatDescription(hotel.description);

                                return (
                                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
                                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3">
                                            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            About {hotel.name}
                                        </h2>
                                        <div className="space-y-4">
                                            {paragraphs.map((paragraph, index) => (
                                                <p key={index} className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Sunbedranker's Top Tip */}
                            {hotel.top_tip && (
                                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-yellow-300 hover:shadow-xl transition-all duration-300">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3">
                                        <span className="text-2xl sm:text-3xl">🏆</span>
                                        Sunbedranker's Top Tip
                                    </h2>
                                    <div className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line">
                                        {hotel.top_tip}
                                    </div>
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* POOL CRITERIA SECTIONS - Following Admin Tab Order */}
                            {/* ============================================ */}
                            
                            {poolCriteria && (
                                <>
                                    {/* 1. Sunbed-to-Guest Ratio */}
                                    <SunbedAvailabilitySection poolCriteria={poolCriteria} />
                                    
                                    {/* 2. Sun Exposure & Orientation */}
                                    <SunExposureSection poolCriteria={poolCriteria} />
                                    
                                    {/* 3. Pool Area Size & Variety */}
                                    <PoolSizeSection poolCriteria={poolCriteria} />
                                    
                                    {/* 4. Towel & Reservation Policy */}
                                    <TowelReservationSection poolCriteria={poolCriteria} />
                                    
                                    {/* 5. Pool Facilities & Comfort */}
                                    <FacilitiesSection poolCriteria={poolCriteria} />
                                    
                                    {/* 6. Noise & Atmosphere */}
                                    <AtmosphereSection poolCriteria={poolCriteria} />
                                    
                                    {/* 7. Cleanliness & Maintenance */}
                                    <CleanlinessSection poolCriteria={poolCriteria} />
                                    
                                    {/* 8. Accessibility Features */}
                                    <AccessibilitySection poolCriteria={poolCriteria} />
                                    
                                    {/* 9. Kids & Family Facilities */}
                                    <KidsFeaturesSection poolCriteria={poolCriteria} />
                                    
                                    {/* 10. Extras & Luxury Touches */}
                                    <LuxuryFeaturesSection poolCriteria={poolCriteria} />
                                </>
                            )}

                            {/* ============================================ */}
                            {/* HOTELIER-PROVIDED CONTENT SECTIONS */}
                            {/* ============================================ */}
                            
                            {/* Pool Description */}
                            <PoolDescriptionSection hotel={hotel} />
                            
                            {/* Amenities Description */}
                            <AmenitiesDescriptionSection hotel={hotel} />
                            
                            {/* House Rules */}
                            <HouseRulesSection hotel={hotel} />
                            
                            {/* FAQs */}
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

                <Footer />
            </div>
        </>
    );
}



import { Head, router } from '@inertiajs/react';
import { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { useAppUrl } from '@/hooks/useAppUrl';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

// Import above-fold components eagerly
import {
    // Hero Section
    Breadcrumb,
    HeroSection,
    
    // First 3 Pool Details (visible above fold)
    SunbedAvailabilitySection,
    SunExposureSection,
    PoolSizeSection,
    
    // Sidebar (visible above fold)
    Sidebar,
} from '@/Components/Hotels';

// Lazy load below-fold sections to reduce initial JS
const TowelReservationSection = lazy(() => import('@/Components/Hotels/PoolDetailsSection').then(m => ({ default: m.TowelReservationSection })));
const FacilitiesSection = lazy(() => import('@/Components/Hotels/PoolDetailsSection').then(m => ({ default: m.FacilitiesSection })));
const AtmosphereSection = lazy(() => import('@/Components/Hotels/PoolDetailsSection').then(m => ({ default: m.AtmosphereSection })));
const CleanlinessSection = lazy(() => import('@/Components/Hotels/PoolDetailsSection').then(m => ({ default: m.CleanlinessSection })));
const AccessibilitySection = lazy(() => import('@/Components/Hotels/PoolDetailsSection').then(m => ({ default: m.AccessibilitySection })));
const KidsFeaturesSection = lazy(() => import('@/Components/Hotels/PoolDetailsSection').then(m => ({ default: m.KidsFeaturesSection })));
const LuxuryFeaturesSection = lazy(() => import('@/Components/Hotels/PoolDetailsSection').then(m => ({ default: m.LuxuryFeaturesSection })));
const PoolDescriptionSection = lazy(() => import('@/Components/Hotels/HotelierContentSection').then(m => ({ default: m.PoolDescriptionSection })));
const AmenitiesDescriptionSection = lazy(() => import('@/Components/Hotels/HotelierContentSection').then(m => ({ default: m.AmenitiesDescriptionSection })));
const HouseRulesSection = lazy(() => import('@/Components/Hotels/HotelierContentSection').then(m => ({ default: m.HouseRulesSection })));
const FaqsSection = lazy(() => import('@/Components/Hotels/HotelierContentSection').then(m => ({ default: m.FaqsSection })));
const PhotoGallerySection = lazy(() => import('@/Components/Hotels/HotelierContentSection').then(m => ({ default: m.PhotoGallerySection })));
const ReviewsSection = lazy(() => import('@/Components/Hotels/HotelierContentSection').then(m => ({ default: m.ReviewsSection })));
const SimilarHotelsSection = lazy(() => import('@/Components/Hotels/SimilarHotels').then(m => ({ default: m.default })));

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
            
            <div className="min-h-screen bg-slate-50/60">
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
                    setActiveImageIndex={setActiveImageIndex}
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
                                    <section className="relative bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_16px_36px_-16px_rgba(15,23,42,0.12)] transition-shadow duration-300 overflow-hidden">
                                        <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400" />
                                        <div className="p-6 sm:p-7 lg:p-8 xl:p-9">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-600">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                                    Overview
                                                </span>
                                            </div>
                                            <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-slate-900 tracking-tight mb-5">
                                                About {hotel.name}
                                            </h2>
                                            <div className="space-y-4">
                                                {paragraphs.map((paragraph, index) => (
                                                    <p key={index} className="text-slate-600 font-sans text-[15px] sm:text-base leading-[1.75]">
                                                        {paragraph}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                );
                            })()}

                            {/* Sunbedranker's Top Tip */}
                            {hotel.top_tip && (
                                <section className="relative bg-white rounded-2xl ring-1 ring-amber-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(217,119,6,0.18)] hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_16px_36px_-16px_rgba(217,119,6,0.25)] transition-shadow duration-300 overflow-hidden">
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400" />
                                    <div className="p-6 sm:p-7 lg:p-8 xl:p-9">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 ring-1 ring-amber-200/80 text-xl shadow-sm">
                                                🏆
                                            </span>
                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700">Editor's Pick</p>
                                                <h2 className="text-xl sm:text-2xl font-sans font-semibold text-slate-900 tracking-tight">
                                                    Sunbedranker's Top Tip
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="prose prose-slate max-w-none text-slate-700 font-sans text-[15px] sm:text-base leading-[1.75] whitespace-pre-line">
                                            {hotel.top_tip}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* SunbedRanker Review Intelligence */}
                            {hotel.review_intelligence && (
                                <section className="relative bg-white rounded-2xl ring-1 ring-purple-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(147,51,234,0.18)] hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_16px_36px_-16px_rgba(147,51,234,0.25)] transition-shadow duration-300 overflow-hidden">
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400" />
                                    <div className="p-6 sm:p-7 lg:p-8 xl:p-9">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-fuchsia-100 ring-1 ring-purple-200/80 text-xl shadow-sm">
                                                🧠
                                            </span>
                                            <div>
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-purple-700">Review Intelligence</p>
                                                <h2 className="text-xl sm:text-2xl font-sans font-semibold text-slate-900 tracking-tight">
                                                    SunbedRanker Review Intelligence
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="prose prose-slate max-w-none text-slate-700 font-sans text-[15px] sm:text-base leading-[1.75] whitespace-pre-line">
                                            {hotel.review_intelligence}
                                        </div>
                                    </div>
                                </section>
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
                                    
                                    {/* Lazy-loaded below-fold pool sections */}
                                    <Suspense fallback={null}>
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
                                    </Suspense>
                                </>
                            )}

                            {/* ============================================ */}
                            {/* HOTELIER-PROVIDED CONTENT SECTIONS */}
                            {/* ============================================ */}
                            
                            <Suspense fallback={null}>
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
                            </Suspense>
                        </div>

                        {/* Sidebar */}
                        <Sidebar hotel={hotel} onBookingClick={handleBookingClick} />
                    </div>

                    {/* Similar Hotels */}
                    <Suspense fallback={null}>
                        <SimilarHotelsSection 
                            similarHotels={similarHotels} 
                            destinationName={hotel.destination.name} 
                        />
                    </Suspense>
                </div>

                <Footer />
            </div>
        </>
    );
}



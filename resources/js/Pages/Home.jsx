import { Head, usePage } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import {
    PromoBanner,
    HeroSection,
    FeaturedDestinations,
    TopRatedHotels,
    HotelCarouselSection,
    WhyChooseUs,
    LatestPosts,
} from '@/Components/Home';

export default function Home({ 
    featuredDestinations, 
    topRatedHotels, 
    familyFriendlyHotels, 
    quietSunHotels, 
    partyHotels,
    latestPosts 
}) {    
    const { auth } = usePage().props;
    const isHotelier = auth.user?.role === 'hotelier';

    return (
        <>
            <Head title="Find the Best Hotel Pools & Sunbeds">
                <meta name="agd-partner-manual-verification" />
                <meta name="description" content="Sunbed Ranker is the leading independent travel guide for hotel pool and sunbed reviews. Compare hotels by pool quality, sunbed-to-guest ratio, sun exposure, and atmosphere. Expert travel tips, destination guides, and honest reviews to help you find the perfect poolside vacation." />
                <meta property="og:title" content="Sunbed Ranker - Find the Best Hotel Pools & Sunbeds" />
                <meta property="og:description" content="The leading independent travel guide for hotel pool and sunbed reviews. Compare hotels, read expert guides, and find your perfect poolside vacation." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.origin} />
                <meta property="og:image" content={`${window.location.origin}/images/og-default.jpg`} />
                <meta property="og:site_name" content="Sunbed Ranker" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sunbed Ranker - Find the Best Hotel Pools & Sunbeds" />
                <meta name="twitter:description" content="The leading independent travel guide for hotel pool and sunbed reviews. Compare hotels, read expert guides, and find your perfect poolside vacation." />
                <meta name="twitter:image" content={`${window.location.origin}/images/og-default.jpg`} />
                <link rel="canonical" href={window.location.origin} />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Sunbed Ranker",
                    "url": window.location.origin,
                    "description": "The leading independent travel guide for hotel pool and sunbed reviews.",
                    "publisher": {
                        "@type": "Organization",
                        "name": "Sunbed Ranker",
                        "logo": {
                            "@type": "ImageObject",
                            "url": `${window.location.origin}/images/logo.png`
                        }
                    },
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": `${window.location.origin}/search?q={search_term_string}`,
                        "query-input": "required name=search_term_string"
                    }
                })}</script>
            </Head>
            
            <div className="min-h-screen bg-white font-sans">
                <Header />
                
                <main id="main-content">
                    <PromoBanner />
                    
                    <HeroSection />
                    
                    <FeaturedDestinations destinations={featuredDestinations} />
                    
                    <TopRatedHotels 
                        hotels={topRatedHotels} 
                        isHotelier={isHotelier} 
                    />
                    
                    <HotelCarouselSection 
                        hotels={familyFriendlyHotels} 
                        type="family" 
                        isHotelier={isHotelier} 
                    />
                    
                    <HotelCarouselSection 
                        hotels={quietSunHotels} 
                        type="quiet" 
                        isHotelier={isHotelier} 
                    />
                    
                    <HotelCarouselSection 
                        hotels={partyHotels} 
                        type="party" 
                        isHotelier={isHotelier} 
                    />
                    
                    <LatestPosts posts={latestPosts} />
                    
                    <WhyChooseUs />
                </main>

                <Footer />
            </div>
        </>
    );
}

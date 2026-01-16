import { Head, usePage } from '@inertiajs/react';
import Header from '@/Components/Header';
import {
    PromoBanner,
    HeroSection,
    FeaturedDestinations,
    TopRatedHotels,
    HotelCarouselSection,
    WhyChooseUs,
} from '@/Components/Home';

export default function Home({ 
    featuredDestinations, 
    topRatedHotels, 
    familyFriendlyHotels, 
    quietSunHotels, 
    partyHotels 
}) {
    const { auth } = usePage().props;
    const isHotelier = auth.user?.role === 'hotelier';

    return (
        <>
            <Head title="Find the Best Hotel Pools & Sunbeds">
                <meta name="agd-partner-manual-verification" />
            </Head>
            
            <div className="min-h-screen bg-white font-sans">
                <Header />
                
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
                
                <WhyChooseUs />
            </div>
        </>
    );
}

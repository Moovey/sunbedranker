import HotelCarousel from '@/Components/Home/HotelCarousel';

const sectionConfigs = {
    family: {
        title: 'Best for Families',
        subtitle: 'Perfect pools for the whole family',
        bgClass: 'bg-gradient-to-b from-blue-50 to-white',
        iconColor: 'text-blue-500',
        icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    },
    quiet: {
        title: 'Best for Quiet Sun',
        subtitle: 'Peaceful pools for relaxation',
        bgClass: 'bg-white',
        iconColor: 'text-green-500',
        icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z"/>
    },
    party: {
        title: 'Best for Party Pools',
        subtitle: 'Vibrant pools for socializing and fun',
        bgClass: 'bg-gradient-to-b from-purple-50 to-white',
        iconColor: 'text-purple-500',
        icon: <>
            <path d="M2 21h19v-3H2v3zM20 8h-3V4H3c-1.1 0-2 .9-2 2v5h19V8zm-3-3h2v2h-2V5z"/>
            <path d="M12.5 10c1.93 0 3.5-1.57 3.5-3.5S14.43 3 12.5 3 9 4.57 9 6.5 10.57 10 12.5 10z"/>
        </>
    }
};

export default function HotelCarouselSection({ hotels, type, isHotelier = false }) {
    if (!hotels?.length) return null;

    const config = sectionConfigs[type];
    if (!config) return null;

    return (
        <section className={`${config.bgClass} py-12 sm:py-16 md:py-20`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-3">
                    <svg className={`w-10 h-10 sm:w-12 sm:h-12 ${config.iconColor}`} viewBox="0 0 24 24" fill="currentColor">
                        {config.icon}
                    </svg>
                    {config.title}
                </h2>
                <p className="text-center text-gray-600 text-lg mb-8 sm:mb-10 md:mb-12 font-medium">
                    {config.subtitle}
                </p>
                <HotelCarousel 
                    hotels={hotels} 
                    scoreType={type}
                    isHotelier={isHotelier}
                />
            </div>
        </section>
    );
}

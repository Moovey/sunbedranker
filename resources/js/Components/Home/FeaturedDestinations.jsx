import { Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function FeaturedDestinations({ destinations }) {
    if (!destinations?.length) return null;

    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        window.addEventListener('resize', checkScrollButtons);
        return () => window.removeEventListener('resize', checkScrollButtons);
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const cardWidth = 340;
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="bg-gradient-to-b from-white to-blue-50 py-12 sm:py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3 text-center flex items-center justify-center gap-3">
                    <svg className="w-9 h-9 sm:w-11 sm:h-11 text-orange-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Popular Destinations
                </h2>
                <p className="text-center text-slate-500 text-base sm:text-lg mb-8 sm:mb-10 md:mb-12">
                    Find your perfect stay...
                </p>

                <div className="relative group">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-white/95 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 -translate-x-4 sm:-translate-x-6 ${
                            canScrollLeft ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                        aria-label="Scroll left"
                    >
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-white/95 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 translate-x-4 sm:translate-x-6 ${
                            canScrollRight ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                        aria-label="Scroll right"
                    >
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollRef}
                        onScroll={checkScrollButtons}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {destinations.map((destination, index) => (
                            <div key={destination.id} className="flex-shrink-0 w-[280px] sm:w-[320px]">
                                <DestinationCard destination={destination} index={index} />
                            </div>
                        ))}
                    </div>

                    {/* Gradient Fade Effects */}
                    <div className={`absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
                    <div className={`absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-blue-50 to-transparent pointer-events-none transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />
                </div>
            </div>
        </section>
    );
}

function DestinationCard({ destination, index }) {
    return (
        <Link
            href={`/destinations/${destination.slug}`}
            className="group relative overflow-hidden rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-14px_rgba(15,23,42,0.18)] hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_20px_36px_-18px_rgba(15,23,42,0.28)] transition-shadow duration-300"
        >
            <div className="relative overflow-hidden aspect-[4/5]">
                <img
                    src={(destination.image ? (destination.image.startsWith('http') ? destination.image : `/storage/${destination.image}`) : '/images/default-destination.svg').replace(/^http:/, 'https:')}
                    alt={destination.name}
                    width={320}
                    height={400}
                    sizes="(max-width: 640px) 280px, 320px"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    fetchpriority={index === 0 ? "high" : "auto"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.12em] flex items-center gap-1 shadow-sm ring-1 ring-inset ring-black/[0.06]">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                    </svg>
                    POPULAR
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-1 drop-shadow-sm">{destination.name}</h3>
                <p className="text-white/85 font-medium text-sm">
                    {destination.hotel_count} hotels with pool ratings
                </p>
            </div>
        </Link>
    );
}

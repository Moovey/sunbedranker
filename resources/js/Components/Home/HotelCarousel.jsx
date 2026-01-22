import { useState, useEffect, useRef } from 'react';
import HotelCard from '@/Components/Home/HotelCard';

export default function HotelCarousel({ hotels, scoreType = 'overall', isHotelier = false }) {
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
            const cardWidth = 380;
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative group">
            {/* Left Arrow */}
            <button
                onClick={() => scroll('left')}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-white/95 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 -translate-x-4 sm:-translate-x-6 ${
                    canScrollLeft ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                aria-label="Scroll left"
                aria-hidden={!canScrollLeft}
                tabIndex={canScrollLeft ? 0 : -1}
            >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                aria-hidden={!canScrollRight}
                tabIndex={canScrollRight ? 0 : -1}
            >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="flex-shrink-0 w-[320px] sm:w-[360px]">
                        <HotelCard 
                            hotel={hotel} 
                            scoreType={scoreType}
                            isHotelier={isHotelier}
                        />
                    </div>
                ))}
            </div>

            {/* Gradient Fade Effects */}
            <div className={`absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-blue-50 to-transparent pointer-events-none transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-blue-50 to-transparent pointer-events-none transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />
        </div>
    );
}

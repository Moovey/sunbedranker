import { Link } from '@inertiajs/react';
import HotelCard from '@/Components/Home/HotelCard';

export default function TopRatedHotels({ hotels, isHotelier = false }) {
    if (!hotels?.length) return null;

    return (
        <section className="bg-white py-12 sm:py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 md:mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2">
                            Highest Rated Pool Experiences
                        </h2>
                        <p className="text-slate-500 text-base sm:text-lg">
                            Top picks for sun seekers
                        </p>
                    </div>
                    <Link 
                        href="/destinations" 
                        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-tight px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04]"
                    >
                        View all
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
                    {hotels.map((hotel, index) => (
                        <HotelCard 
                            key={hotel.id} 
                            hotel={hotel}
                            isHotelier={isHotelier}
                            priority={index === 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

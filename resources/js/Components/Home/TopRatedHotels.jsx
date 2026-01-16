import { Link } from '@inertiajs/react';
import HotelCard from '@/Components/Home/HotelCard';

export default function TopRatedHotels({ hotels, isHotelier = false }) {
    if (!hotels?.length) return null;

    return (
        <section className="bg-white py-12 sm:py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 md:mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                            Highest Rated Pool Experiences
                        </h2>
                        <p className="text-gray-600 text-lg font-medium">
                            Top picks for sun seekers
                        </p>
                    </div>
                    <Link 
                        href="/destinations" 
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                        View all →
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
                    {hotels.map((hotel) => (
                        <HotelCard 
                            key={hotel.id} 
                            hotel={hotel}
                            isHotelier={isHotelier}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

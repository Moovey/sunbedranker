import { Link } from '@inertiajs/react';

export default function FeaturedDestinations({ destinations }) {
    if (!destinations?.length) return null;

    return (
        <section className="bg-gradient-to-b from-white to-blue-50 py-12 sm:py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
                    Popular Destinations
                </h2>
                <p className="text-center text-gray-600 text-lg mb-8 sm:mb-10 md:mb-12 font-medium">
                    Find your perfect stay...
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                    {destinations.map((destination, index) => (
                        <DestinationCard 
                            key={destination.id} 
                            destination={destination} 
                            index={index} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function DestinationCard({ destination, index }) {
    return (
        <Link
            href={`/destinations/${destination.slug}`}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
            <div className="relative overflow-hidden aspect-[4/5]">
                <img
                    src={destination.image || '/images/default-destination.jpg'}
                    alt={destination.name}
                    width={400}
                    height={500}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    fetchpriority={index === 0 ? "high" : "auto"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                    </svg>
                    POPULAR
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-1">{destination.name}</h3>
                <p className="text-white/90 font-medium text-sm">
                    {destination.hotel_count} hotels with pool ratings
                </p>
            </div>
        </Link>
    );
}

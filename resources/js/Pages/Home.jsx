import { Link, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/Components/Header';

export default function Home({ featuredDestinations, topRatedHotels, familyFriendlyHotels, quietSunHotels }) {
    const [searchData, setSearchData] = useState({
        destination: '',
        checkIn: '',
        checkOut: '',
        poolVibe: '',
        guests: 2
    });
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        
        if (!searchData.destination) {
            alert('Please enter a destination');
            return;
        }

        setIsSearching(true);
        
        // Submit search to backend
        router.get('/search', searchData, {
            onFinish: () => setIsSearching(false)
        });
    };

    return (
        <>
            <Head title="Find the Best Hotel Pools & Sunbeds" />
            
            <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
                <Header />

                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-sky-600 to-blue-700 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold mb-6">
                                Will You Struggle to Get a Sunbed?
                            </h1>
                            <p className="text-xl mb-8 text-sky-100">
                                Compare hotels by pool quality, sunbed availability, and sun exposure.
                                <br />
                                Not just if they have a pool — but how good the pool experience really is.
                            </p>
                            
                            {/* Search Bar */}
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-white rounded-lg shadow-xl p-6">
                                    <form onSubmit={handleSearch}>
                                        <div className="flex gap-4">
                                            {/* Destination */}
                                            <div className="flex-1">
                                                <label className="block text-left text-xs font-semibold text-gray-700 mb-1">
                                                    Where to?
                                                </label>
                                                <input
                                                    type="text"
                                                    value={searchData.destination}
                                                    onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                                                    placeholder="e.g., Tenerife, Marbella, Algarve"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900"
                                                />
                                            </div>

                                            {/* Search Button */}
                                            <div className="flex items-end">
                                                <button
                                                    type="submit"
                                                    disabled={isSearching}
                                                    className="px-12 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                                                >
                                                    {isSearching ? 'Searching...' : 'Search'}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Pool Vibe Filters */}
                                        <div className="mt-6 pt-4 border-t border-gray-200">
                                            <label className="block text-left text-xs font-semibold text-gray-700 mb-3">
                                                Pool Vibe (Optional)
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {[
                                                    { value: 'family', label: '🏊 Best for Families', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
                                                    { value: 'quiet', label: '🧘 Quiet & Relaxing', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
                                                    { value: 'party', label: '🎉 Lively & Social', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
                                                    { value: 'luxury', label: '✨ Luxury Experience', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
                                                    { value: 'adults', label: '🍸 Adults Only', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200' },
                                                ].map((vibe) => (
                                                    <button
                                                        key={vibe.value}
                                                        type="button"
                                                        onClick={() => setSearchData({
                                                            ...searchData, 
                                                            poolVibe: searchData.poolVibe === vibe.value ? '' : vibe.value
                                                        })}
                                                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                                                            searchData.poolVibe === vibe.value 
                                                                ? 'ring-2 ring-sky-500 ' + vibe.color 
                                                                : vibe.color
                                                        }`}
                                                    >
                                                        {vibe.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Destinations */}
                {featuredDestinations?.length > 0 && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Destinations</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {featuredDestinations.map((destination) => (
                                <Link
                                    key={destination.id}
                                    href={`/destinations/${destination.slug}`}
                                    className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition"
                                >
                                    <img
                                        src={destination.image || '/images/default-destination.jpg'}
                                        alt={destination.name}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                                        <p className="text-sky-200">{destination.hotel_count} hotels with pool ratings</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Top Rated Hotels */}
                {topRatedHotels?.length > 0 && (
                    <section className="bg-gray-50 py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">Highest Rated Pool Experiences</h2>
                                <Link href="/destinations" className="text-sky-600 hover:text-sky-700 font-semibold">
                                    View all →
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {topRatedHotels.map((hotel) => (
                                    <HotelCard key={hotel.id} hotel={hotel} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Best for Families */}
                {familyFriendlyHotels?.length > 0 && (
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Best for Families</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {familyFriendlyHotels.map((hotel) => (
                                <HotelCard key={hotel.id} hotel={hotel} scoreType="family" />
                            ))}
                        </div>
                    </section>
                )}

                {/* Quiet Sun */}
                {quietSunHotels?.length > 0 && (
                    <section className="bg-gray-50 py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Best for Quiet Sun</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {quietSunHotels.map((hotel) => (
                                    <HotelCard key={hotel.id} hotel={hotel} scoreType="quiet" />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Key Questions Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        We Answer the Questions That Really Matter
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '🏖️', question: 'Will I struggle to get a sunbed?', answer: 'We show sunbed-to-guest ratios' },
                            { icon: '☀️', question: 'Is the pool sunny all day?', answer: 'Sun exposure times and coverage' },
                            { icon: '🔇', question: 'Is it quiet or noisy?', answer: 'Atmosphere ratings and music levels' },
                            { icon: '👨‍👩‍👧', question: 'Is it good for families?', answer: 'Kids pools, activities, and safety' },
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                                <div className="text-4xl mb-3">{item.icon}</div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.question}</h3>
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

function HotelCard({ hotel, scoreType = 'overall' }) {
    const score = scoreType === 'family' ? hotel.family_score 
                : scoreType === 'quiet' ? hotel.quiet_score
                : hotel.overall_score;

    return (
        <Link
            href={`/hotels/${hotel.slug}`}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
        >
            <div className="relative">
                <img
                    src={hotel.main_image || '/images/default-hotel.jpg'}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                />
                {score && (
                    <div className="absolute top-3 right-3 bg-sky-600 text-white px-3 py-1 rounded-lg font-bold">
                        {score}/10
                    </div>
                )}
                {hotel.is_featured && (
                    <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold">
                        Featured
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{hotel.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{hotel.destination?.name}</p>
                
                {hotel.pool_criteria && (
                    <div className="flex gap-2 text-xs text-gray-600 mb-3">
                        {hotel.pool_criteria.has_infinity_pool && <span className="px-2 py-1 bg-blue-100 rounded">∞ Pool</span>}
                        {hotel.pool_criteria.has_rooftop_pool && <span className="px-2 py-1 bg-blue-100 rounded">Rooftop</span>}
                        {hotel.pool_criteria.is_adults_only && <span className="px-2 py-1 bg-purple-100 rounded">Adults Only</span>}
                    </div>
                )}
                
                {hotel.pool_criteria?.sunbed_to_guest_ratio && (
                    <div className="text-sm text-gray-700">
                        <strong>Sunbed Ratio:</strong> {hotel.pool_criteria.sunbed_to_guest_ratio}:1
                    </div>
                )}
            </div>
        </Link>
    );
}

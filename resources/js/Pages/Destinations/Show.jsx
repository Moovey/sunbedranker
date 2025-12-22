import { useState } from 'react';
import { Link, Head, router } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function DestinationShow({ destination, hotels, filters = {} }) {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        router.get(`/destinations/${destination.slug}`, newFilters, { preserveState: true });
    };

    const clearFilters = () => {
        setLocalFilters({});
        router.get(`/destinations/${destination.slug}`);
    };

    return (
        <>
            <Head title={`${destination.name} - Hotels with Great Pools`} />
            
            <div className="min-h-screen bg-gray-50">
                <Header />
                {/* Header */}
                <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href="/" className="text-sky-200 hover:text-white mb-4 inline-block">
                            ← Back to Home
                        </Link>
                        <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
                        <p className="text-xl text-sky-100">
                            {hotels.total} hotels ranked by pool & sunbed quality
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                                    {Object.keys(localFilters).length > 0 && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-sky-600 hover:text-sky-700"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>

                                {/* Sort */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Sort by
                                    </label>
                                    <select
                                        value={localFilters.sort || 'score'}
                                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                                    >
                                        <option value="score">Overall Score</option>
                                        <option value="family">Best for Families</option>
                                        <option value="quiet">Quietest</option>
                                        <option value="party">Best Party Vibe</option>
                                        <option value="name">Name (A-Z)</option>
                                    </select>
                                </div>

                                {/* Pool Type */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Pool Type
                                    </label>
                                    <select
                                        value={localFilters.pool_type || ''}
                                        onChange={(e) => handleFilterChange('pool_type', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                                    >
                                        <option value="">All Types</option>
                                        <option value="infinity">Infinity Pool</option>
                                        <option value="rooftop">Rooftop Pool</option>
                                        <option value="heated">Heated Pool</option>
                                        <option value="kids">Kids Pool</option>
                                    </select>
                                </div>

                                {/* Atmosphere */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Atmosphere
                                    </label>
                                    <select
                                        value={localFilters.atmosphere || ''}
                                        onChange={(e) => handleFilterChange('atmosphere', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                                    >
                                        <option value="">All Atmospheres</option>
                                        <option value="quiet">Quiet & Relaxing</option>
                                        <option value="family">Family-Friendly</option>
                                        <option value="lively">Lively</option>
                                        <option value="party">Party Vibe</option>
                                    </select>
                                </div>

                                {/* Sunbed Ratio */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Minimum Sunbed Ratio
                                    </label>
                                    <select
                                        value={localFilters.sunbed_ratio || ''}
                                        onChange={(e) => handleFilterChange('sunbed_ratio', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                                    >
                                        <option value="">Any Ratio</option>
                                        <option value="1.0">1:1 (Excellent)</option>
                                        <option value="0.75">3:4 (Very Good)</option>
                                        <option value="0.5">1:2 (Good)</option>
                                        <option value="0.33">1:3 (Average)</option>
                                    </select>
                                </div>

                                {/* Adults Only */}
                                <div className="mb-6">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={localFilters.adults_only || false}
                                            onChange={(e) => handleFilterChange('adults_only', e.target.checked ? '1' : '')}
                                            className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Adults Only</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Hotels Grid */}
                        <div className="lg:col-span-3">
                            {hotels.data.length === 0 ? (
                                <div className="bg-white rounded-lg shadow p-12 text-center">
                                    <p className="text-gray-600">No hotels match your filters.</p>
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 text-sky-600 hover:text-sky-700 font-semibold"
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        {hotels.data.map((hotel) => (
                                            <HotelCard key={hotel.id} hotel={hotel} />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {hotels.links && (
                                        <div className="flex justify-center gap-2">
                                            {hotels.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-4 py-2 rounded-lg ${
                                                        link.active
                                                            ? 'bg-sky-600 text-white'
                                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function HotelCard({ hotel }) {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
            <div className="flex">
                <div className="relative w-1/3">
                    <img
                        src={hotel.main_image || '/images/default-hotel.jpg'}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                    />
                    {hotel.overall_score && (
                        <div className="absolute top-2 right-2 bg-sky-600 text-white px-2 py-1 rounded font-bold text-sm">
                            {hotel.overall_score}/10
                        </div>
                    )}
                </div>
                
                <div className="flex-1 p-4">
                    <Link href={`/hotels/${hotel.slug}`} className="hover:text-sky-600">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{hotel.name}</h3>
                    </Link>
                    
                    {hotel.star_rating && (
                        <div className="text-yellow-500 mb-2">
                            {'⭐'.repeat(hotel.star_rating)}
                        </div>
                    )}

                    {hotel.pool_criteria && (
                        <div className="space-y-2 text-sm">
                            {hotel.pool_criteria.sunbed_to_guest_ratio && (
                                <div className="flex items-center text-gray-700">
                                    <span className="mr-2">🏖️</span>
                                    <strong>Sunbeds:</strong>&nbsp;{hotel.pool_criteria.sunbed_to_guest_ratio}:1
                                </div>
                            )}
                            {hotel.pool_criteria.sun_exposure && (
                                <div className="flex items-center text-gray-700">
                                    <span className="mr-2">☀️</span>
                                    <strong>Sun:</strong>&nbsp;{hotel.pool_criteria.sun_exposure.replace('_', ' ')}
                                </div>
                            )}
                            {hotel.pool_criteria.atmosphere && (
                                <div className="flex items-center text-gray-700">
                                    <span className="mr-2">🎭</span>
                                    <strong>Vibe:</strong>&nbsp;{hotel.pool_criteria.atmosphere}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-3">
                        <Link
                            href={`/hotels/${hotel.slug}`}
                            className="text-sky-600 hover:text-sky-700 font-semibold text-sm"
                        >
                            View Details →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

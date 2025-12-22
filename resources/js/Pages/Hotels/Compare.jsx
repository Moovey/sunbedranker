import { Link, Head } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function HotelCompare({ hotels, auth }) {
    if (!hotels || hotels.length === 0) {
        return (
            <>
                <Head title="Compare Hotels" />
                <div className="min-h-screen bg-gray-50">
                    <Header />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🔍</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Hotels Selected</h2>
                            <p className="text-gray-600 mb-6">
                                Select 2-4 hotels to compare their pool and sunbed features
                            </p>
                            <Link
                                href="/"
                                className="inline-block px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700"
                            >
                                Start Searching
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Compare Hotels - Pool & Sunbed Features" />
            
            <div className="min-h-screen bg-gray-50">
                <Header />
                
                {/* Header */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Compare Hotels</h1>
                                <p className="text-gray-600 mt-1">Side-by-side comparison of pool & sunbed features</p>
                            </div>
                            <Link
                                href="/"
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                ← Back to Search
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Comparison Table */}
                    <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="p-4 text-left font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                                        Feature
                                    </th>
                                    {hotels.map((hotel) => (
                                        <th key={hotel.id} className="p-4 text-center min-w-[250px]">
                                            <div className="space-y-2">
                                                <img
                                                    src={hotel.main_image || '/images/default-hotel.jpg'}
                                                    alt={hotel.name}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                                <Link
                                                    href={`/hotels/${hotel.slug}`}
                                                    className="font-bold text-gray-900 hover:text-sky-600 block"
                                                >
                                                    {hotel.name}
                                                </Link>
                                                {hotel.star_rating && (
                                                    <div className="text-yellow-400">
                                                        {'⭐'.repeat(hotel.star_rating)}
                                                    </div>
                                                )}
                                                <div className="text-sm text-gray-600">{hotel.destination?.name}</div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Overall Score */}
                                <ComparisonRow
                                    label="Overall Pool & Sun Score"
                                    icon="🏆"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.overall_score}
                                    formatValue={(value) => value ? `${value}/10` : '-'}
                                    highlightBest={true}
                                />

                                {/* Family Score */}
                                <ComparisonRow
                                    label="Family Score"
                                    icon="👨‍👩‍👧‍👦"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.family_score}
                                    formatValue={(value) => value ? `${value}/10` : '-'}
                                    highlightBest={true}
                                />

                                {/* Quiet Score */}
                                <ComparisonRow
                                    label="Quiet Sun Score"
                                    icon="🧘"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.quiet_score}
                                    formatValue={(value) => value ? `${value}/10` : '-'}
                                    highlightBest={true}
                                />

                                {/* Party Score */}
                                <ComparisonRow
                                    label="Party Vibe Score"
                                    icon="🎉"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.party_score}
                                    formatValue={(value) => value ? `${value}/10` : '-'}
                                    highlightBest={true}
                                />

                                {/* Section Header - Pool Metrics */}
                                <tr className="bg-gray-100">
                                    <td colSpan={hotels.length + 1} className="p-3 font-bold text-gray-900">
                                        Pool Metrics
                                    </td>
                                </tr>

                                {/* Sunbed Ratio */}
                                <ComparisonRow
                                    label="Sunbed to Guest Ratio"
                                    icon="🏖️"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.sunbed_to_guest_ratio}
                                    formatValue={(value) => value ? `${value}:1` : '-'}
                                    highlightBest={true}
                                />

                                {/* Number of Pools */}
                                <ComparisonRow
                                    label="Number of Pools"
                                    icon="🏊"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.number_of_pools}
                                    formatValue={(value) => value || '-'}
                                    highlightBest={true}
                                />

                                {/* Pool Size */}
                                <ComparisonRow
                                    label="Total Pool Size"
                                    icon="📏"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.pool_size_sqm}
                                    formatValue={(value) => value ? `${value} m²` : '-'}
                                    highlightBest={true}
                                />

                                {/* Sun Exposure */}
                                <ComparisonRow
                                    label="Sun Exposure"
                                    icon="☀️"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.sun_exposure}
                                    formatValue={(value) => value ? formatSunExposure(value) : '-'}
                                />

                                {/* Atmosphere */}
                                <ComparisonRow
                                    label="Atmosphere"
                                    icon="🎭"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.atmosphere}
                                    formatValue={(value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : '-'}
                                />

                                {/* Section Header - Features */}
                                <tr className="bg-gray-100">
                                    <td colSpan={hotels.length + 1} className="p-3 font-bold text-gray-900">
                                        Pool Features
                                    </td>
                                </tr>

                                {/* Infinity Pool */}
                                <ComparisonRow
                                    label="Infinity Pool"
                                    icon="∞"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_infinity_pool}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Rooftop Pool */}
                                <ComparisonRow
                                    label="Rooftop Pool"
                                    icon="🏙️"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_rooftop_pool}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Heated Pool */}
                                <ComparisonRow
                                    label="Heated Pool"
                                    icon="🔥"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_heated_pool}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Pool Bar */}
                                <ComparisonRow
                                    label="Pool Bar"
                                    icon="🍹"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_pool_bar}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Lazy River */}
                                <ComparisonRow
                                    label="Lazy River"
                                    icon="🌊"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_lazy_river}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Section Header - Family Features */}
                                <tr className="bg-gray-100">
                                    <td colSpan={hotels.length + 1} className="p-3 font-bold text-gray-900">
                                        Family & Safety
                                    </td>
                                </tr>

                                {/* Kids Pool */}
                                <ComparisonRow
                                    label="Kids Pool"
                                    icon="🧒"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_kids_pool}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Splash Area */}
                                <ComparisonRow
                                    label="Splash Area"
                                    icon="💦"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_splash_area}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Lifeguard */}
                                <ComparisonRow
                                    label="Lifeguard on Duty"
                                    icon="🛟"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_lifeguard}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Adults Only */}
                                <ComparisonRow
                                    label="Adults Only"
                                    icon="🍸"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.is_adults_only}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Section Header - Comfort */}
                                <tr className="bg-gray-100">
                                    <td colSpan={hotels.length + 1} className="p-3 font-bold text-gray-900">
                                        Comfort & Amenities
                                    </td>
                                </tr>

                                {/* Shade Areas */}
                                <ComparisonRow
                                    label="Shade Areas"
                                    icon="🌴"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_shade_areas}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Towel Service */}
                                <ComparisonRow
                                    label="Towel Service"
                                    icon="🧴"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_towel_service}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />

                                {/* Food Service */}
                                <ComparisonRow
                                    label="Poolside Food Service"
                                    icon="🍽️"
                                    hotels={hotels}
                                    getValue={(hotel) => hotel.pool_criteria?.has_food_service}
                                    formatValue={(value) => <BooleanBadge value={value} />}
                                />
                            </tbody>
                        </table>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {hotels.map((hotel) => (
                            <div key={hotel.id} className="bg-white rounded-lg shadow p-4 text-center">
                                <h3 className="font-semibold text-gray-900 mb-3">{hotel.name}</h3>
                                <div className="space-y-2">
                                    <Link
                                        href={`/hotels/${hotel.slug}`}
                                        className="block w-full px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition"
                                    >
                                        View Details
                                    </Link>
                                    {hotel.booking_affiliate_url && (
                                        <a
                                            href={hotel.booking_affiliate_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
                                        >
                                            Book Now
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

// Comparison Row Component
function ComparisonRow({ label, icon, hotels, getValue, formatValue, highlightBest = false }) {
    const values = hotels.map(getValue);
    const maxValue = highlightBest && values.some(v => typeof v === 'number') 
        ? Math.max(...values.filter(v => typeof v === 'number'))
        : null;

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-700 bg-gray-50 sticky left-0">
                <span className="mr-2">{icon}</span>
                {label}
            </td>
            {hotels.map((hotel, index) => {
                const value = getValue(hotel);
                const isBest = highlightBest && typeof value === 'number' && value === maxValue && maxValue !== null;
                
                return (
                    <td 
                        key={hotel.id} 
                        className={`p-4 text-center ${isBest ? 'bg-green-50 font-bold text-green-900' : ''}`}
                    >
                        {typeof formatValue === 'function' ? formatValue(value) : value || '-'}
                        {isBest && <span className="ml-2">🏆</span>}
                    </td>
                );
            })}
        </tr>
    );
}

// Boolean Badge Component
function BooleanBadge({ value }) {
    if (value === true) {
        return <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">✓ Yes</span>;
    }
    if (value === false) {
        return <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">✗ No</span>;
    }
    return <span className="text-gray-400">-</span>;
}

// Helper Functions
function formatSunExposure(exposure) {
    const map = {
        'all_day': 'All Day',
        'afternoon_only': 'Afternoon Only',
        'morning_only': 'Morning Only',
        'partial_shade': 'Partial Shade',
        'mostly_shaded': 'Mostly Shaded'
    };
    return map[exposure] || exposure;
}

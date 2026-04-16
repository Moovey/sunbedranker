import SeoHead from '@/Components/SeoHead';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function HowWeRate() {
    const criteria = [
        { name: 'Sunbed-to-Guest Ratio', description: 'We calculate the number of available sunbeds relative to room capacity. Hotels with a ratio of 1:1 or better receive top marks.', weight: 'High' },
        { name: 'Sun Exposure & Orientation', description: 'We assess the number of hours of direct sunlight the pool area receives, pool orientation (south-facing is ideal), and availability of shaded areas.', weight: 'High' },
        { name: 'Pool Area Size & Variety', description: 'Total pool area per guest, number of pools, variety (infinity, lap, plunge), and overall design quality.', weight: 'Medium' },
        { name: 'Towel & Reservation Policy', description: 'We evaluate towel availability, reservation policies, and whether the hotel effectively manages "towel wars."', weight: 'Medium' },
        { name: 'Pool Facilities & Comfort', description: 'Quality of sunbed padding, availability of umbrellas, pool bars, changing facilities, and overall comfort level.', weight: 'Medium' },
        { name: 'Noise & Atmosphere', description: 'Music levels, crowd noise, designated quiet zones, and the general ambiance of the pool area.', weight: 'Medium' },
        { name: 'Cleanliness & Maintenance', description: 'Water quality, pool cleaning frequency, sunbed condition, and overall maintenance of the pool area.', weight: 'High' },
        { name: 'Accessibility Features', description: 'Pool entry ramps, accessible changing rooms, sunbed spacing for wheelchair users, and overall inclusivity.', weight: 'Low' },
        { name: 'Kids & Family Facilities', description: 'Children\'s pools, water features, lifeguard presence, family-friendly zones, and child safety measures.', weight: 'Low' },
        { name: 'Extras & Luxury Touches', description: 'Cabanas, private pools, premium sunbeds, VIP areas, and any special poolside amenities.', weight: 'Low' },
    ];

    return (
        <>
            <SeoHead
                title="How We Rate Hotels - Our Scoring Methodology"
                description="Learn how Sunbed Ranker rates and scores hotel pools. Our transparent 10-point scoring system evaluates sunbed ratios, sun exposure, atmosphere, cleanliness, and more."
                path="/how-we-rate"
            />

            <div className="min-h-screen bg-white font-sans">
                <Header />

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">How We Rate Hotels</h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Our transparent scoring methodology ensures fair, consistent, and helpful hotel pool reviews
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Scoring System</h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                            Every hotel on Sunbed Ranker is evaluated using our proprietary 10-point scoring system. Each criterion is assessed independently and weighted based on its impact on the overall pool experience. The final score is a weighted average that gives travelers a clear, at-a-glance understanding of what to expect.
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                            Our scores range from 0 to 10, where 10 represents an exceptional pool experience. We update scores regularly as hotels make improvements or when new information becomes available.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">The 10 Rating Criteria</h2>
                        <div className="space-y-6">
                            {criteria.map((item, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                {index + 1}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            item.weight === 'High' ? 'bg-red-100 text-red-700' :
                                            item.weight === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {item.weight} Weight
                                        </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Sources</h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                            Our reviews combine multiple data sources to ensure accuracy:
                        </p>
                        <ul className="space-y-3">
                            {[
                                'On-site visits and inspections by our review team',
                                'Hotel-provided information verified against guest reports',
                                'Satellite imagery for pool orientation and sun exposure analysis',
                                'Guest reviews and feedback aggregated from multiple platforms',
                                'Regular updates as hotels renovate or change their facilities'
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700 text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-orange-50 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Independence Guarantee</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Hotels cannot pay for higher ratings on Sunbed Ranker. While hotels may claim their listing and provide additional information, our scoring is entirely based on objective criteria. This independence is central to our value as a trusted travel resource.
                        </p>
                    </section>
                </div>

                <Footer />
            </div>
        </>
    );
}

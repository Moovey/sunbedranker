import { Link, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/Components/Header';

export default function HotelShow({ hotel, similarHotels }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const handleBookingClick = (type) => {
        router.get(`/hotels/${hotel.slug}/click?type=${type}`);
    };

    // Get all images (main + gallery)
    const allImages = [
        hotel.main_image,
        ...(hotel.images || [])
    ].filter(Boolean);

    return (
        <>
            <Head title={`${hotel.name} - Pool & Sunbed Review`} />
            
            <div className="min-h-screen bg-gray-50">
                <Header />
                
                {/* Breadcrumb */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="text-sm text-gray-600">
                            <Link href="/" className="hover:text-sky-600">Home</Link>
                            <span className="mx-2">/</span>
                            <Link href={`/destinations/${hotel.destination.slug}`} className="hover:text-sky-600">
                                {hotel.destination.name}
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900">{hotel.name}</span>
                        </div>
                    </div>
                </div>

                {/* Above the Fold - Hero Section */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        {/* Hotel Header */}
                        <div className="mb-6">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                            <div className="flex items-center gap-4 flex-wrap">
                                {hotel.star_rating && (
                                    <div className="flex items-center gap-2">
                                        <div className="text-yellow-400 text-xl">
                                            {'⭐'.repeat(hotel.star_rating)}
                                        </div>
                                        <span className="text-gray-600">{hotel.star_rating} Star Hotel</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-gray-700">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{hotel.destination.name}</span>
                                </div>
                                {hotel.subscription_tier === 'premium' && (
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                        ✓ Verified
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Hero Grid: Image + Map + Score */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                            {/* Main Pool Image */}
                            <div className="lg:col-span-2">
                                <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                                    <img
                                        src={allImages[activeImageIndex] || '/images/default-hotel.jpg'}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {allImages.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => setActiveImageIndex((prev) => prev === 0 ? allImages.length - 1 : prev - 1)}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => setActiveImageIndex((prev) => (prev + 1) % allImages.length)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                                {activeImageIndex + 1} / {allImages.length}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Map & Score Column */}
                            <div className="space-y-4">
                                {/* Google Map */}
                                {hotel.latitude && hotel.longitude && (
                                    <div className="h-48 rounded-lg overflow-hidden shadow-lg">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            style={{ border: 0 }}
                                            src={`https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${hotel.latitude},${hotel.longitude}&zoom=16&maptype=satellite`}
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}

                                {/* Overall Score Card */}
                                {hotel.overall_score && (
                                    <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg shadow-lg p-6 text-white">
                                        <h3 className="text-lg font-semibold mb-2">Pool & Sun Score</h3>
                                        <div className="text-5xl font-bold mb-3">{hotel.overall_score}<span className="text-2xl">/10</span></div>
                                        <div className="space-y-2">
                                            {hotel.family_score && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="opacity-90">Family</span>
                                                    <span className="font-semibold">{hotel.family_score}/10</span>
                                                </div>
                                            )}
                                            {hotel.quiet_score && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="opacity-90">Quiet Sun</span>
                                                    <span className="font-semibold">{hotel.quiet_score}/10</span>
                                                </div>
                                            )}
                                            {hotel.party_score && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="opacity-90">Party Vibe</span>
                                                    <span className="font-semibold">{hotel.party_score}/10</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* Pool & Sun Overview - Badges */}
                            {hotel.pool_criteria && (
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span>🏊</span> Pool & Sun Overview
                                    </h2>
                                    <div className="flex flex-wrap gap-3">
                                        {getSunBadges(hotel.pool_criteria).map((badge, index) => (
                                            <span key={index} className={`px-4 py-2 rounded-full font-medium ${badge.color}`}>
                                                {badge.icon} {badge.text}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Pool Details - Metrics Table */}
                            {hotel.pool_criteria && (
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <span>📊</span> Pool Details
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Sunbed Info */}
                                        {hotel.pool_criteria.sunbed_to_guest_ratio && (
                                            <MetricCard
                                                icon="🏖️"
                                                label="Sunbed Availability"
                                                value={`${hotel.pool_criteria.sunbed_to_guest_ratio}:1 ratio`}
                                                description={getSunbedRatioText(hotel.pool_criteria.sunbed_to_guest_ratio)}
                                                highlight={hotel.pool_criteria.sunbed_to_guest_ratio >= 0.75}
                                            />
                                        )}

                                        {/* Sun Exposure */}
                                        {hotel.pool_criteria.sun_exposure && (
                                            <MetricCard
                                                icon="☀️"
                                                label="Sun Exposure"
                                                value={formatSunExposure(hotel.pool_criteria.sun_exposure)}
                                                description={getSunExposureDescription(hotel.pool_criteria.sun_exposure)}
                                            />
                                        )}

                                        {/* Number of Pools */}
                                        <MetricCard
                                            icon="🏊"
                                            label="Number of Pools"
                                            value={hotel.pool_criteria.number_of_pools || 1}
                                        />

                                        {/* Pool Size */}
                                        {hotel.pool_criteria.pool_size_sqm && (
                                            <MetricCard
                                                icon="📏"
                                                label="Total Pool Size"
                                                value={`${hotel.pool_criteria.pool_size_sqm} m²`}
                                            />
                                        )}

                                        {/* Pool Depth */}
                                        {hotel.pool_criteria.max_depth_m && (
                                            <MetricCard
                                                icon="🌊"
                                                label="Maximum Depth"
                                                value={`${hotel.pool_criteria.max_depth_m} meters`}
                                            />
                                        )}

                                        {/* Shade Availability */}
                                        {hotel.pool_criteria.has_shade_areas && (
                                            <MetricCard
                                                icon="🌴"
                                                label="Shade Options"
                                                value="Available"
                                                description="Natural and artificial shade areas"
                                            />
                                        )}
                                    </div>

                                    {/* Special Pool Features */}
                                    {hasPoolFeatures(hotel.pool_criteria) && (
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Special Features</h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {hotel.pool_criteria.has_infinity_pool && (
                                                    <FeatureBadge icon="∞" text="Infinity Pool" color="bg-blue-100 text-blue-800" />
                                                )}
                                                {hotel.pool_criteria.has_rooftop_pool && (
                                                    <FeatureBadge icon="🏙️" text="Rooftop Pool" color="bg-purple-100 text-purple-800" />
                                                )}
                                                {hotel.pool_criteria.has_heated_pool && (
                                                    <FeatureBadge icon="🔥" text="Heated Pool" color="bg-orange-100 text-orange-800" />
                                                )}
                                                {hotel.pool_criteria.has_pool_bar && (
                                                    <FeatureBadge icon="🍹" text="Pool Bar" color="bg-green-100 text-green-800" />
                                                )}
                                                {hotel.pool_criteria.has_lazy_river && (
                                                    <FeatureBadge icon="🌊" text="Lazy River" color="bg-cyan-100 text-cyan-800" />
                                                )}
                                                {hotel.pool_criteria.has_swim_up_bar && (
                                                    <FeatureBadge icon="🍸" text="Swim-up Bar" color="bg-teal-100 text-teal-800" />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Atmosphere & Vibe */}
                            {hotel.pool_criteria && (
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <span>🎭</span> Atmosphere & Vibe
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {hotel.pool_criteria.atmosphere && (
                                            <div className="flex items-start gap-3">
                                                <div className="text-3xl">{getAtmosphereIcon(hotel.pool_criteria.atmosphere)}</div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">
                                                        {hotel.pool_criteria.atmosphere.charAt(0).toUpperCase() + hotel.pool_criteria.atmosphere.slice(1)} Atmosphere
                                                    </h4>
                                                    <p className="text-sm text-gray-600">{getAtmosphereDescription(hotel.pool_criteria.atmosphere)}</p>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {hotel.pool_criteria.noise_level && (
                                            <div className="flex items-start gap-3">
                                                <div className="text-3xl">🔊</div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">
                                                        {hotel.pool_criteria.noise_level.charAt(0).toUpperCase() + hotel.pool_criteria.noise_level.slice(1)} Noise Level
                                                    </h4>
                                                    <p className="text-sm text-gray-600">{getNoiseDescription(hotel.pool_criteria.noise_level)}</p>
                                                </div>
                                            </div>
                                        )}

                                        {hotel.pool_criteria.is_adults_only && (
                                            <div className="flex items-start gap-3">
                                                <div className="text-3xl">🍸</div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">Adults Only</h4>
                                                    <p className="text-sm text-gray-600">Peaceful environment without children</p>
                                                </div>
                                            </div>
                                        )}

                                        {hotel.pool_criteria.has_music && (
                                            <div className="flex items-start gap-3">
                                                <div className="text-3xl">🎵</div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">Background Music</h4>
                                                    <p className="text-sm text-gray-600">Ambient music enhances the atmosphere</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Family Features */}
                            {hotel.pool_criteria && (hotel.pool_criteria.has_kids_pool || hotel.pool_criteria.has_splash_area || hotel.pool_criteria.has_lifeguard) && (
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <span>👨‍👩‍👧‍👦</span> Family Features
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {hotel.pool_criteria.has_kids_pool && (
                                            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                                                <div className="text-3xl">🧒</div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">Kids Pool</h4>
                                                    <p className="text-sm text-gray-600">Dedicated shallow pool area for children</p>
                                                </div>
                                            </div>
                                        )}

                                        {hotel.pool_criteria.has_splash_area && (
                                            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                                                <div className="text-3xl">💦</div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">Splash Area</h4>
                                                    <p className="text-sm text-gray-600">Water play area with fountains and slides</p>
                                                </div>
                                            </div>
                                        )}

                                        {hotel.pool_criteria.has_lifeguard && (
                                            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                                                <div className="text-3xl">🛟</div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">Lifeguard on Duty</h4>
                                                    <p className="text-sm text-gray-600">Professional supervision for safety</p>
                                                </div>
                                            </div>
                                        )}

                                        {hotel.pool_criteria.has_waterslide && (
                                            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                                                <div className="text-3xl">🎢</div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">Water Slides</h4>
                                                    <p className="text-sm text-gray-600">Fun slides for all ages</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Gallery */}
                            {allImages.length > 1 && (
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <span>📸</span> Photo Gallery
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {allImages.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setActiveImageIndex(index);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className="relative h-40 rounded-lg overflow-hidden hover:opacity-75 transition"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${hotel.name} - ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                {index === activeImageIndex && (
                                                    <div className="absolute inset-0 border-4 border-sky-500 rounded-lg"></div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Enhanced Profile Content */}
                            {(hotel.subscription_tier === 'enhanced' || hotel.subscription_tier === 'premium') && (
                                <>
                                    {/* Description */}
                                    {hotel.description && (
                                        <div className="bg-white rounded-lg shadow-lg p-6">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Hotel</h2>
                                            <div className="prose max-w-none text-gray-700">
                                                {hotel.description}
                                            </div>
                                        </div>
                                    )}

                                    {/* FAQs - Placeholder for future implementation */}
                                    <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">✨ Enhanced Profile</h3>
                                        <p className="text-gray-600">This hotel has an enhanced profile with additional exclusive content, special offers, and verified information.</p>
                                    </div>
                                </>
                            )}

                            {/* Reviews */}
                            {hotel.approved_reviews && hotel.approved_reviews.length > 0 && (
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>
                                    <div className="space-y-6">
                                        {hotel.approved_reviews.map((review) => (
                                            <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="font-semibold text-gray-900">{review.user.name}</div>
                                                    <div className="text-yellow-500">
                                                        {'⭐'.repeat(review.overall_rating)}
                                                    </div>
                                                </div>
                                                {review.title && (
                                                    <h4 className="font-semibold text-gray-800 mb-1">{review.title}</h4>
                                                )}
                                                <p className="text-gray-700">{review.content}</p>
                                                <div className="mt-2 text-sm text-gray-500">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-4 space-y-6">
                                {/* Booking Card */}
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span>💰</span> Check Prices & Book
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        {hotel.booking_affiliate_url && (
                                            <button
                                                onClick={() => handleBookingClick('booking')}
                                                className="w-full px-4 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition flex items-center justify-center gap-2"
                                            >
                                                <span>🏨</span> Check Booking.com
                                            </button>
                                        )}
                                        {hotel.expedia_affiliate_url && (
                                            <button
                                                onClick={() => handleBookingClick('expedia')}
                                                className="w-full px-4 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition flex items-center justify-center gap-2"
                                            >
                                                <span>✈️</span> Check Expedia
                                            </button>
                                        )}
                                        {hotel.direct_booking_url && (
                                            <button
                                                onClick={() => handleBookingClick('direct')}
                                                className="w-full px-4 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
                                            >
                                                <span>🌐</span> Visit Hotel Website
                                            </button>
                                        )}
                                    </div>

                                    <div className="mt-4 text-xs text-gray-500 text-center">
                                        We may earn a commission from bookings made through these links
                                    </div>
                                </div>

                                {/* Promotional Banner for Premium Hotels */}
                                {hotel.subscription_tier === 'premium' && (
                                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg p-6 text-white">
                                        <div className="text-center">
                                            <div className="text-3xl mb-2">🌟</div>
                                            <h3 className="text-xl font-bold mb-2">Special Offer!</h3>
                                            <p className="text-sm mb-4 opacity-90">Book directly and receive exclusive benefits</p>
                                            <button
                                                onClick={() => handleBookingClick('direct')}
                                                className="w-full px-4 py-2 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition"
                                            >
                                                View Offers
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Verification Badge */}
                                {hotel.subscription_tier === 'premium' && (
                                    <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-green-200">
                                        <div className="flex items-center gap-3">
                                            <div className="text-3xl">✓</div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Verified Profile</h4>
                                                <p className="text-sm text-gray-600">Information verified and regularly updated by hotel staff</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Quick Stats */}
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
                                    <div className="space-y-3">
                                        {hotel.total_rooms && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Rooms:</span>
                                                <span className="font-semibold text-gray-900">{hotel.total_rooms}</span>
                                            </div>
                                        )}
                                        {hotel.pool_criteria?.number_of_pools && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Pools:</span>
                                                <span className="font-semibold text-gray-900">{hotel.pool_criteria.number_of_pools}</span>
                                            </div>
                                        )}
                                        {hotel.view_count > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Profile Views:</span>
                                                <span className="font-semibold text-gray-900">{hotel.view_count}</span>
                                            </div>
                                        )}
                                        {hotel.review_count > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Reviews:</span>
                                                <span className="font-semibold text-gray-900">{hotel.review_count}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
                                    <div className="space-y-3 text-sm text-gray-700">
                                        {hotel.address && (
                                            <div className="flex items-start gap-2">
                                                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <div>
                                                    <div className="font-medium text-gray-900 mb-1">Address</div>
                                                    {hotel.address}
                                                </div>
                                            </div>
                                        )}
                                        {hotel.phone && (
                                            <div className="flex items-start gap-2">
                                                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <div>
                                                    <div className="font-medium text-gray-900 mb-1">Phone</div>
                                                    <a href={`tel:${hotel.phone}`} className="text-sky-600 hover:underline">{hotel.phone}</a>
                                                </div>
                                            </div>
                                        )}
                                        {hotel.email && (
                                            <div className="flex items-start gap-2">
                                                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <div>
                                                    <div className="font-medium text-gray-900 mb-1">Email</div>
                                                    <a href={`mailto:${hotel.email}`} className="text-sky-600 hover:underline break-all">
                                                        {hotel.email}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Similar Hotels */}
                    {similarHotels && similarHotels.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Hotels in {hotel.destination.name}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {similarHotels.map((similar) => (
                                    <SimilarHotelCard key={similar.id} hotel={similar} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// Helper Components
function MetricCard({ icon, label, value, description, highlight }) {
    return (
        <div className={`p-4 rounded-lg border-2 ${highlight ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-start gap-3">
                <div className="text-3xl">{icon}</div>
                <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">{label}</div>
                    <div className="text-xl font-bold text-gray-900">{value}</div>
                    {description && (
                        <div className="text-sm text-gray-600 mt-1">{description}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

function FeatureBadge({ icon, text, color }) {
    return (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${color}`}>
            <span className="text-lg">{icon}</span>
            <span className="text-sm font-medium">{text}</span>
        </div>
    );
}

function ScoreBadge({ label, score }) {
    return (
        <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{score}</div>
            <div className="text-xs text-gray-600">{label}</div>
        </div>
    );
}

function DetailItem({ icon, label, value, description }) {
    return (
        <div className="flex items-start">
            <div className="text-2xl mr-3">{icon}</div>
            <div>
                <div className="text-sm text-gray-600">{label}</div>
                <div className="font-semibold text-gray-900">{value}</div>
                {description && (
                    <div className="text-xs text-gray-500 mt-1">{description}</div>
                )}
            </div>
        </div>
    );
}

function Badge({ children, color = 'blue' }) {
    const colors = {
        blue: 'bg-blue-100 text-blue-800',
        purple: 'bg-purple-100 text-purple-800',
        green: 'bg-green-100 text-green-800',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[color]}`}>
            {children}
        </span>
    );
}

function SimilarHotelCard({ hotel }) {
    return (
        <Link href={`/hotels/${hotel.slug}`} className="bg-white rounded-lg shadow hover:shadow-lg transition">
            <img
                src={hotel.main_image || '/images/default-hotel.jpg'}
                alt={hotel.name}
                className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{hotel.name}</h3>
                {hotel.overall_score && (
                    <div className="text-sky-600 font-semibold">
                        {hotel.overall_score}/10
                    </div>
                )}
            </div>
        </Link>
    );
}

// Helper Functions
function getSunbedRatioText(ratio) {
    if (ratio >= 1.0) return 'Excellent - plenty of sunbeds';
    if (ratio >= 0.75) return 'Very good - usually available';
    if (ratio >= 0.5) return 'Good - may need to arrive early';
    if (ratio >= 0.33) return 'Average - expect competition';
    return 'Limited - arrive very early';
}

function getSunBadges(poolCriteria) {
    const badges = [];
    
    if (poolCriteria.sun_exposure === 'all_day') {
        badges.push({ icon: '☀️', text: 'Sun all day', color: 'bg-yellow-100 text-yellow-800' });
    } else if (poolCriteria.sun_exposure === 'afternoon_only') {
        badges.push({ icon: '🌅', text: 'Sun all afternoon', color: 'bg-orange-100 text-orange-800' });
    } else if (poolCriteria.sun_exposure === 'morning_only') {
        badges.push({ icon: '🌄', text: 'Morning sun', color: 'bg-blue-100 text-blue-800' });
    }
    
    if (poolCriteria.sunbed_to_guest_ratio >= 0.75) {
        badges.push({ icon: '🏖️', text: 'High sunbed availability', color: 'bg-green-100 text-green-800' });
    }
    
    if (poolCriteria.has_shade_areas) {
        badges.push({ icon: '🌴', text: 'Plenty of shade', color: 'bg-emerald-100 text-emerald-800' });
    }
    
    if (poolCriteria.has_infinity_pool) {
        badges.push({ icon: '∞', text: 'Infinity pool', color: 'bg-blue-100 text-blue-800' });
    }
    
    if (poolCriteria.is_adults_only) {
        badges.push({ icon: '🍸', text: 'Adults only', color: 'bg-purple-100 text-purple-800' });
    }
    
    if (poolCriteria.noise_level === 'quiet') {
        badges.push({ icon: '🤫', text: 'Peaceful atmosphere', color: 'bg-indigo-100 text-indigo-800' });
    }
    
    return badges;
}

function formatSunExposure(exposure) {
    const map = {
        'all_day': 'All Day Sun',
        'afternoon_only': 'Afternoon Only',
        'morning_only': 'Morning Only',
        'partial_shade': 'Partial Shade',
        'mostly_shaded': 'Mostly Shaded'
    };
    return map[exposure] || exposure;
}

function getSunExposureDescription(exposure) {
    const map = {
        'all_day': 'Pool area receives sunshine throughout the day',
        'afternoon_only': 'Best sun from noon onwards',
        'morning_only': 'Morning sunshine, shaded in afternoon',
        'partial_shade': 'Mix of sun and shade throughout the day',
        'mostly_shaded': 'Limited direct sunlight'
    };
    return map[exposure] || '';
}

function getAtmosphereIcon(atmosphere) {
    const icons = {
        'lively': '🎉',
        'relaxed': '😌',
        'quiet': '🧘',
        'family': '👨‍👩‍👧‍👦',
        'romantic': '💑',
        'party': '🎊'
    };
    return icons[atmosphere] || '🏊';
}

function getAtmosphereDescription(atmosphere) {
    const descriptions = {
        'lively': 'Energetic and social pool environment',
        'relaxed': 'Calm and laid-back atmosphere',
        'quiet': 'Peaceful and tranquil setting',
        'family': 'Friendly environment for all ages',
        'romantic': 'Intimate and serene ambiance',
        'party': 'Fun and festive pool scene'
    };
    return descriptions[atmosphere] || '';
}

function getNoiseDescription(level) {
    const descriptions = {
        'quiet': 'Minimal noise, peaceful environment',
        'moderate': 'Some background activity and conversation',
        'lively': 'Active atmosphere with music and socializing',
        'loud': 'High energy with music and entertainment'
    };
    return descriptions[level] || '';
}

function hasPoolFeatures(poolCriteria) {
    return poolCriteria.has_infinity_pool || 
           poolCriteria.has_rooftop_pool || 
           poolCriteria.has_heated_pool || 
           poolCriteria.has_pool_bar || 
           poolCriteria.has_lazy_river || 
           poolCriteria.has_swim_up_bar;
}

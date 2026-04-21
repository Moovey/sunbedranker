export default function AgodaHotelsSection({ hotels }) {
    if (!hotels || hotels.length === 0) return null;

    return (
        <section className="py-12 sm:py-16 bg-gradient-to-b from-blue-50/70 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-3">
                        Explore More Hotels
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Hotels from our partner Agoda with estimated pool scores based on star rating
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {hotels.map((hotel) => (
                        <AgodaHotelCard key={hotel.id} hotel={hotel} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function AgodaHotelCard({ hotel }) {
    const score = hotel.overall_score;
    const criteria = hotel.pool_criteria;

    return (
        <a
            href={hotel.landing_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl overflow-hidden ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:ring-slate-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_16px_32px_-16px_rgba(15,23,42,0.18)] transition-all duration-300 block"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={(hotel.main_image_url || '/images/default-hotel.jpg').replace(/^http:/, 'https:')}
                    alt={hotel.name}
                    width={400}
                    height={300}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                />
                {/* Estimated badge */}
                <div className="absolute top-2 left-2 bg-blue-500/90 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
                    Estimated
                </div>
                {/* Score badge */}
                {score && (
                    <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm text-gray-900 px-2.5 py-1 rounded-full text-xs font-semibold shadow">
                        {score}/10
                    </div>
                )}
                {/* Star rating */}
                {hotel.star_rating && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-0.5">
                        {Array.from({ length: Math.round(hotel.star_rating) }, (_, i) => (
                            <svg key={i} className="w-3.5 h-3.5 text-yellow-400 drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 line-clamp-1">{hotel.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{hotel.destination?.name}</p>

                {/* Pool criteria badges */}
                {criteria && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {criteria.sunbed_to_guest_ratio && (
                            <span className="px-1.5 py-0.5 bg-orange-50 text-orange-700 text-[10px] font-medium rounded">
                                Sunbed {criteria.sunbed_to_guest_ratio}:1
                            </span>
                        )}
                        {criteria.sun_exposure && (
                            <span className="px-1.5 py-0.5 bg-yellow-50 text-yellow-700 text-[10px] font-medium rounded capitalize">
                                {criteria.sun_exposure.replace(/_/g, ' ')}
                            </span>
                        )}
                        {criteria.atmosphere && (
                            <span className="px-1.5 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-medium rounded capitalize">
                                {criteria.atmosphere}
                            </span>
                        )}
                    </div>
                )}

                {/* Price + book */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    {hotel.price ? (
                        <div>
                            <span className="text-xs text-gray-500">from </span>
                            <span className="text-sm font-bold text-gray-900">
                                {hotel.currency === 'USD' ? '$' : hotel.currency}{Math.round(hotel.price)}
                            </span>
                            <span className="text-[10px] text-gray-500">/night</span>
                        </div>
                    ) : (
                        <span className="text-xs text-gray-400">Check price</span>
                    )}
                    <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                        Book on Agoda
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </span>
                </div>
            </div>
        </a>
    );
}

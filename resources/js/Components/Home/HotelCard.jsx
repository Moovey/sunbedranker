import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function HotelCard({ hotel, scoreType = 'overall', isInCompare = false, onToggleCompare, isHotelier = false, priority = false }) {
    const [showCompareTooltip, setShowCompareTooltip] = useState(false);
    const [showClaimTooltip, setShowClaimTooltip] = useState(false);

    const score = scoreType === 'family' ? hotel.family_score 
                : scoreType === 'quiet' ? hotel.quiet_score
                : scoreType === 'party' ? hotel.party_score
                : hotel.overall_score;

    const canClaim = isHotelier && !hotel.owned_by && !hotel.has_pending_claim;
    const isPremium = hotel.is_premium;

    const handleClaimClick = (e) => {
        e.stopPropagation();
        
        if (hotel.owned_by) {
            toast.error('This hotel has already been claimed by another hotelier.', {
                position: 'top-right',
                autoClose: 4000,
            });
            return;
        }
        
        if (hotel.has_pending_claim) {
            toast.warning('This hotel already has a pending claim under review.', {
                position: 'top-right',
                autoClose: 4000,
            });
            return;
        }
            
        router.visit(`/hotelier/hotels/${hotel.slug}/claim`);
    };

    const cardClasses = isPremium 
        ? "group bg-white overflow-hidden transition-shadow duration-200 hover:shadow-2xl rounded-2xl shadow-xl border-4 border-gradient-to-r from-yellow-400 to-orange-500 relative ring-2 ring-yellow-300"
        : "group bg-white overflow-hidden transition-shadow duration-200 hover:shadow-2xl rounded-2xl shadow-lg border-2 border-gray-100 relative";
    
    const imageAspect = isPremium ? "aspect-[16/10]" : "aspect-[4/3]";

    return (
        <div className={cardClasses}>
            <Link href={`/hotels/${hotel.slug}`} className="block">
                <div className={`relative overflow-hidden ${imageAspect}`}>
                    <img
                        src={hotel.main_image || '/images/default-hotel.jpg'}
                        alt={hotel.name}
                        width={400}
                        height={isPremium ? 250 : 300}
                        loading={priority ? "eager" : "lazy"}
                        decoding={priority ? "sync" : "async"}
                        fetchpriority={priority ? "high" : "auto"}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* Premium Badge */}
                    {!!hotel.is_premium && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 z-10">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                            </svg>
                            PREMIUM
                        </div>
                    )}
                    
                    {/* Score Badge */}
                    {score && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-bold text-base shadow-lg flex items-center gap-1.5">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                            {score}/10
                        </div>
                    )}

                    {/* Claim Status Badges */}
                    {!!hotel.has_pending_claim && (
                        <div className="absolute bottom-3 left-3 right-3 bg-yellow-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                            </svg>
                            Claim under review
                        </div>
                    )}
                    {!!hotel.owned_by && (
                        <div className="absolute bottom-3 left-3 right-3 bg-green-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Verified Owner
                        </div>
                    )}
                </div>

                <div className="p-5 sm:p-6 bg-white">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 font-semibold uppercase tracking-wide flex items-center gap-1">
                        <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {hotel.destination?.name}
                    </p>
                    
                    {/* Pool Info */}
                    {hotel.pool_criteria && (
                        <div className="flex flex-wrap gap-2 text-xs">
                            {/* Sunbed Ratio */}
                            {hotel.pool_criteria.sunbed_to_guest_ratio && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full font-semibold">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                                    </svg>
                                    {hotel.pool_criteria.sunbed_to_guest_ratio}:1
                                </span>
                            )}
                            
                            {/* Sun Exposure */}
                            {hotel.pool_criteria.sun_exposure && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold capitalize">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                                    </svg>
                                    {hotel.pool_criteria.sun_exposure.replace(/_/g, ' ')}
                                </span>
                            )}
                            
                            {/* Pool Atmosphere */}
                            {hotel.pool_criteria.atmosphere && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold capitalize">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                    </svg>
                                    {hotel.pool_criteria.atmosphere}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </Link>
            
            {/* Premium CTA Buttons - Outside of Link to avoid nested <a> tags */}
            {isPremium && hotel.direct_booking_url && (
                <div className="flex gap-2 px-5 sm:px-6 pb-5 sm:pb-6 bg-white">
                    <a 
                        href={route('hotels.click', { hotel: hotel.slug, type: 'direct' })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold text-sm shadow-md hover:from-green-600 hover:to-emerald-700 transition-all"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                        </svg>
                        Book Direct
                    </a>
                </div>
            )}

            {/* Action Buttons */}
            {(onToggleCompare || canClaim) && (
                <div className={`absolute ${isPremium ? 'top-16' : 'top-4'} left-4 flex gap-2 z-10`}>
                    {/* Compare Button */}
                    {onToggleCompare && (
                        <div className="relative">
                            <button
                                onClick={onToggleCompare}
                                onMouseEnter={() => setShowCompareTooltip(true)}
                                onMouseLeave={() => setShowCompareTooltip(false)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 shadow-lg text-sm font-semibold ${
                                    isInCompare 
                                        ? 'bg-neutral-900 text-white' 
                                        : 'bg-white/90 text-neutral-700 hover:bg-white'
                                }`}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    {isInCompare ? (
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    ) : (
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                    )}
                                </svg>
                                Compare
                            </button>
                            {showCompareTooltip && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg whitespace-nowrap z-50 pointer-events-none">
                                    {isInCompare ? 'Remove from comparison' : 'Add to comparison'}
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Claim Hotel Button */}
                    {canClaim && (
                        <div className="relative">
                            <button
                                onClick={handleClaimClick}
                                onMouseEnter={() => setShowClaimTooltip(true)}
                                onMouseLeave={() => setShowClaimTooltip(false)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 shadow-lg bg-orange-500 text-white hover:bg-orange-600 text-sm font-semibold"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                                </svg>
                                Claim Hotel
                            </button>
                            {showClaimTooltip && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg whitespace-nowrap z-50 pointer-events-none">
                                    Claim this hotel
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

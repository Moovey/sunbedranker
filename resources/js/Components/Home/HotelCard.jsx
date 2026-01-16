import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function HotelCard({ hotel, scoreType = 'overall', isInCompare = false, onToggleCompare, isHotelier = false }) {
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
        ? "group bg-white overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-2xl shadow-xl border-4 border-gradient-to-r from-yellow-400 to-orange-500 transform hover:scale-105 relative ring-2 ring-yellow-300"
        : "group bg-white overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-2xl shadow-lg border-2 border-gray-100 transform hover:scale-105 relative";
    
    const imageAspect = isPremium ? "aspect-[16/10]" : "aspect-[4/3]";

    return (
        <div className={cardClasses}>
            <Link href={`/hotels/${hotel.slug}`} className="block">
                <div className={`relative overflow-hidden ${imageAspect}`}>
                    <img
                        src={hotel.main_image || '/images/default-hotel.jpg'}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* Premium Badge */}
                    {hotel.is_premium && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse z-10">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                            </svg>
                            PREMIUM
                        </div>
                    )}
                    
                    {/* Special Offer Badge */}
                    {isPremium && hotel.special_offer && (
                        <div className="absolute top-14 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 z-10">
                            <span>🎉</span>
                            SPECIAL OFFER
                        </div>
                    )}
                    
                    {/* Verified Badge */}
                    {isPremium && hotel.show_verified_badge && (
                        <div className="absolute top-24 left-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 z-10">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            VERIFIED
                        </div>
                    )}
                    
                    {/* Score Badge */}
                    {score && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-bold text-base shadow-lg flex items-center gap-1.5">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                            {score}/10
                        </div>
                    )}

                    {/* Claim Status Badges */}
                    {hotel.has_pending_claim && (
                        <div className="absolute bottom-3 left-3 right-3 bg-yellow-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-semibold text-center">
                            🔒 Claim under review
                        </div>
                    )}
                    {hotel.owned_by && (
                        <div className="absolute bottom-3 left-3 right-3 bg-green-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
                    
                    {/* Pool Features */}
                    {hotel.pool_criteria && (
                        <div className="flex flex-wrap gap-2 text-xs mb-4">
                            {hotel.pool_criteria.has_infinity_pool && (
                                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full font-semibold flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22 6.5c-1.1 0-2.2.3-3 .9-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9s-2.2.3-3 .9c-.8-.6-1.9-.9-3-.9v2c.8 0 1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8s1.6.3 2.2.8l.3.2.3-.2c.6-.5 1.4-.8 2.2-.8V6.5z"/>
                                    </svg>
                                    Infinity Pool
                                </span>
                            )}
                            {hotel.pool_criteria.has_rooftop_pool && (
                                <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full font-semibold flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                                    </svg>
                                    Rooftop
                                </span>
                            )}
                            {hotel.pool_criteria.is_adults_only && (
                                <span className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-full font-semibold flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                    Adults Only
                                </span>
                            )}
                        </div>
                    )}
                    
                    {/* Sunbed Ratio */}
                    {hotel.pool_criteria?.sunbed_to_guest_ratio && (
                        <div className="text-sm text-gray-700 font-semibold bg-orange-50 px-3 py-2 rounded-lg flex items-center gap-2">
                            <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-6.18C11.6 5.84 10.3 5 8.86 5 6.75 5 5.06 6.69 5.06 8.8c0 1.66 1.13 3.1 2.68 3.52L3.94 18H2v3h7v-2.78c0-.38.2-.72.52-.88.79-.4 2.39-1.34 3.48-1.34 1.09 0 2.69.94 3.48 1.34.32.16.52.5.52.88V21h7v-3h-1.94l-3.8-5.68C19.87 11.9 21 10.46 21 8.8 21 6.69 19.31 5 17.2 5c-1.44 0-2.74.84-3.96 2.02L13 7.8V7z"/>
                            </svg>
                            Sunbed Ratio: <span className="text-orange-600">{hotel.pool_criteria.sunbed_to_guest_ratio}:1</span>
                        </div>
                    )}
                    
                    {/* Premium CTA Buttons */}
                    {isPremium && (
                        <div className="flex gap-2 mt-4">
                            <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                View Pool Details
                            </span>
                            {hotel.direct_booking_url && (
                                <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold text-sm shadow-md">
                                    💰 Book Direct
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </Link>

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
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isInCompare ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
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
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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

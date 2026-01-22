import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import HotelierNav from '@/Components/HotelierNav';

export default function SubscriptionCheckout({ plan, redirectTo }) {
    const [showCouponInput, setShowCouponInput] = useState(false);
    
    const { data, setData, post, processing } = useForm({
        period: '1',
        coupon_code: '',
    });

    // Pricing configuration
    const pricing = {
        enhanced: {
            name: 'Enhanced',
            icon: '⭐',
            tagline: 'Verified & Conversion-Focused',
            monthlyPrice: 49,
            periods: {
                '1': { months: 1, discount: 0, label: '1 month' },
                '12': { months: 12, discount: 15, label: '12 months', badge: 'Save 15%' },
                '24': { months: 24, discount: 25, label: '24 months', badge: 'Save 25%' },
                '48': { months: 48, discount: 35, label: '48 months', badge: 'Best Value', freeMonths: 3 },
            },
        },
        premium: {
            name: 'Premium',
            icon: '👑',
            tagline: 'Maximum Visibility & Leads',
            monthlyPrice: 149,
            periods: {
                '1': { months: 1, discount: 0, label: '1 month' },
                '12': { months: 12, discount: 15, label: '12 months', badge: 'Save 15%' },
                '24': { months: 24, discount: 25, label: '24 months', badge: 'Save 25%' },
                '48': { months: 48, discount: 35, label: '48 months', badge: 'Best Value', freeMonths: 3 },
            },
        },
    };

    const currentPlan = pricing[plan];
    const currentPeriod = currentPlan.periods[data.period];
    
    // Calculate pricing
    const originalMonthlyPrice = currentPlan.monthlyPrice;
    const discountedMonthlyPrice = originalMonthlyPrice * (1 - currentPeriod.discount / 100);
    const totalMonths = currentPeriod.months + (currentPeriod.freeMonths || 0);
    const originalTotal = originalMonthlyPrice * currentPeriod.months;
    const discountedTotal = discountedMonthlyPrice * currentPeriod.months;
    const savings = originalTotal - discountedTotal;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('hotelier.subscribe.process', { plan }));
    };

    return (
        <>
            <Head title={`Subscribe to ${currentPlan.name}`} />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <HotelierNav />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                    {/* Header */}
                    <div className="mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <Link
                                href={route('hotelier.subscription')}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Subscribe to {currentPlan.name}</h1>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm ml-6 sm:ml-8">
                            Complete your subscription to unlock all {currentPlan.name} features
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Left Column - Plan Selection */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                {/* Plan Header */}
                                <div className="p-4 sm:p-5 border-b border-gray-100">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <span className="text-xl sm:text-2xl">{currentPlan.icon}</span>
                                        <div>
                                            <h2 className="text-base sm:text-lg font-semibold text-gray-900">{currentPlan.name}</h2>
                                            <p className="text-gray-500 text-xs sm:text-sm">{currentPlan.tagline}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Period Selection */}
                                <div className="p-4 sm:p-5">
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Billing Period</label>
                                    <div className="relative">
                                        <select
                                            value={data.period}
                                            onChange={(e) => setData('period', e.target.value)}
                                            className="w-full sm:w-64 px-2.5 sm:px-3 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm font-medium text-gray-900 appearance-none bg-white cursor-pointer"
                                        >
                                            {Object.entries(currentPlan.periods).map(([key, period]) => (
                                                <option key={key} value={key}>
                                                    {period.label} {period.badge ? `(${period.badge})` : ''}
                                                </option>
                                            ))}
                                        </select>
                                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none sm:right-[calc(100%-15rem+0.75rem)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>

                                    {/* Price Display */}
                                    <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
                                        {currentPeriod.discount > 0 && (
                                            <span className="text-base sm:text-lg text-gray-400 line-through">£{originalMonthlyPrice}</span>
                                        )}
                                        <span className="text-2xl sm:text-3xl font-bold text-gray-900">£{discountedMonthlyPrice.toFixed(0)}</span>
                                        <span className="text-gray-500 text-xs sm:text-sm">/mo</span>
                                    </div>
                                    
                                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1.5 sm:mt-2">
                                        Renews at £{discountedMonthlyPrice.toFixed(0)}/mo. Cancel anytime.
                                    </p>
                                </div>

                                {/* Promotional Banner */}
                                {data.period === '48' && (
                                    <div className="mx-3 sm:mx-5 mb-4 sm:mb-5 bg-green-50 border border-green-100 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs sm:text-sm font-bold text-green-600">%</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 text-xs sm:text-sm">Best Value Deal</p>
                                                <p className="text-[10px] sm:text-xs text-gray-500">48-month plan + 3 months FREE</p>
                                            </div>
                                        </div>
                                        <div className="text-left sm:text-right ml-9 sm:ml-0">
                                            <p className="text-base sm:text-lg font-bold text-green-600">Save £{savings.toFixed(0)}</p>
                                        </div>
                                    </div>
                                )}

                                {data.period !== '48' && currentPeriod.discount > 0 && (
                                    <div className="mx-3 sm:mx-5 mb-4 sm:mb-5 bg-orange-50 border border-orange-100 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs sm:text-sm font-bold text-orange-600">%</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 text-xs sm:text-sm">{currentPeriod.badge}</p>
                                                <p className="text-[10px] sm:text-xs text-gray-500">On {currentPeriod.label} plan</p>
                                            </div>
                                        </div>
                                        <div className="text-left sm:text-right ml-9 sm:ml-0">
                                            <p className="text-base sm:text-lg font-bold text-orange-600">Save £{savings.toFixed(0)}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Info Box */}
                                <div className="mx-3 sm:mx-5 mb-4 sm:mb-5 bg-blue-50 border border-blue-100 rounded-lg p-2.5 sm:p-3">
                                    <p className="text-gray-600 text-[10px] sm:text-xs">
                                        <span className="font-medium">💡 Tip:</span> Choose a longer plan to maximize your savings and secure your hotel's visibility.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-4 sm:top-8">
                                <div className="p-4 sm:p-5 border-b border-gray-100">
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">Order summary</h2>
                                </div>

                                <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                                    {/* Plan Name */}
                                    <div>
                                        <p className="font-medium text-gray-900 text-sm sm:text-base">{currentPlan.name}</p>
                                    </div>

                                    {/* Line Items */}
                                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{currentPeriod.label} plan</span>
                                            <span className="font-medium text-gray-900">£{originalTotal.toFixed(0)}</span>
                                        </div>
                                        
                                        {currentPeriod.discount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Discount ({currentPeriod.discount}% off)</span>
                                                <span className="font-medium">-£{savings.toFixed(0)}</span>
                                            </div>
                                        )}

                                        {currentPeriod.freeMonths && (
                                            <div className="flex justify-between text-green-600">
                                                <span>+ {currentPeriod.freeMonths} months FREE</span>
                                                <span className="font-medium">£0.00</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-gray-100 pt-2.5 sm:pt-3">
                                        <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                                            <span>Taxes</span>
                                            <span>-</span>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Calculated after you provide your billing address</p>
                                    </div>

                                    {/* Total */}
                                    <div className="border-t border-gray-100 pt-2.5 sm:pt-3">
                                        <div className="flex justify-between items-baseline">
                                            <span className="font-semibold text-gray-900 text-sm sm:text-base">Subtotal</span>
                                            <div className="text-right">
                                                {currentPeriod.discount > 0 && (
                                                    <span className="text-xs sm:text-sm text-gray-400 line-through mr-2">£{originalTotal.toFixed(0)}</span>
                                                )}
                                                <span className="text-lg sm:text-xl font-bold text-gray-900">£{discountedTotal.toFixed(0)}</span>
                                            </div>
                                        </div>
                                        {currentPeriod.freeMonths && (
                                            <p className="text-[10px] sm:text-xs text-green-600 mt-1">
                                                Total coverage: {totalMonths} months
                                            </p>
                                        )}
                                    </div>

                                    {/* Coupon Code */}
                                    {showCouponInput ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={data.coupon_code}
                                                onChange={(e) => setData('coupon_code', e.target.value)}
                                                placeholder="Enter coupon code"
                                                className="flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:ring-orange-500 focus:border-orange-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowCouponInput(false);
                                                    setData('coupon_code', '');
                                                }}
                                                className="text-gray-400 hover:text-gray-600 px-2"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setShowCouponInput(true)}
                                            className="text-orange-600 hover:text-orange-700 text-xs sm:text-sm font-medium"
                                        >
                                            Have a coupon code?
                                        </button>
                                    )}

                                    {/* Continue Button */}
                                    <form onSubmit={handleSubmit}>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full py-2 sm:py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            {processing ? 'Processing...' : 'Continue'}
                                        </button>
                                    </form>

                                    {/* Trust Badges */}
                                    <div className="pt-2 sm:pt-3 flex items-center justify-center gap-3 sm:gap-4 text-gray-400">
                                        <div className="flex items-center gap-1 text-[10px] sm:text-xs">
                                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                            Secure
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] sm:text-xs">
                                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            Money-back guarantee
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

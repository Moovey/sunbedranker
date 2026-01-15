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

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    {/* Back Link */}
                    <Link
                        href={route('hotelier.subscription')}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold mb-6 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Plans
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Plan Selection */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
                                {/* Plan Header */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{currentPlan.icon}</span>
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900">{currentPlan.name}</h1>
                                            <p className="text-gray-600 text-sm">{currentPlan.tagline}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Period Selection */}
                                <div className="p-6">
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Period</label>
                                    <div className="relative">
                                        <select
                                            value={data.period}
                                            onChange={(e) => setData('period', e.target.value)}
                                            className="w-full sm:w-72 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-semibold text-gray-900 appearance-none bg-white cursor-pointer"
                                        >
                                            {Object.entries(currentPlan.periods).map(([key, period]) => (
                                                <option key={key} value={key}>
                                                    {period.label} {period.badge ? `(${period.badge})` : ''}
                                                </option>
                                            ))}
                                        </select>
                                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none sm:right-[calc(100%-18rem+1rem)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>

                                    {/* Price Display */}
                                    <div className="mt-4 flex items-baseline gap-2">
                                        {currentPeriod.discount > 0 && (
                                            <span className="text-xl text-gray-400 line-through">£{originalMonthlyPrice}</span>
                                        )}
                                        <span className="text-4xl font-black text-gray-900">£{discountedMonthlyPrice.toFixed(0)}</span>
                                        <span className="text-gray-500">/mo</span>
                                    </div>
                                    
                                    <p className="text-sm text-gray-500 mt-2">
                                        Renews at £{discountedMonthlyPrice.toFixed(0)}/mo. Cancel anytime.
                                    </p>
                                </div>

                                {/* Promotional Banner */}
                                {data.period === '48' && (
                                    <div className="mx-6 mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                <span className="text-lg font-bold text-green-600">%</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-green-800">Best Value Deal</p>
                                                <p className="text-sm text-green-700">48-month plan + 3 months FREE</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-green-700">Save £{savings.toFixed(0)}</p>
                                        </div>
                                    </div>
                                )}

                                {data.period !== '48' && currentPeriod.discount > 0 && (
                                    <div className="mx-6 mb-6 bg-orange-50 border-2 border-orange-200 rounded-xl p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <span className="text-lg font-bold text-orange-600">%</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{currentPeriod.badge}</p>
                                                <p className="text-sm text-gray-600">On {currentPeriod.label} plan</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-black text-orange-600">Save £{savings.toFixed(0)}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Info Box */}
                                <div className="mx-6 mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                                    <p className="text-blue-800 text-sm">
                                        <span className="font-bold">💡 Tip:</span> Choose a longer plan to maximize your savings and secure your hotel's visibility.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden sticky top-8">
                                <div className="p-6 border-b border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900">Order summary</h2>
                                </div>

                                <div className="p-6 space-y-4">
                                    {/* Plan Name */}
                                    <div>
                                        <p className="font-bold text-gray-900">{currentPlan.name}</p>
                                    </div>

                                    {/* Line Items */}
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">{currentPeriod.label} plan</span>
                                            <span className="font-semibold text-gray-900">£{originalTotal.toFixed(0)}</span>
                                        </div>
                                        
                                        {currentPeriod.discount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Discount ({currentPeriod.discount}% off)</span>
                                                <span className="font-semibold">-£{savings.toFixed(0)}</span>
                                            </div>
                                        )}

                                        {currentPeriod.freeMonths && (
                                            <div className="flex justify-between text-green-600">
                                                <span>+ {currentPeriod.freeMonths} months FREE</span>
                                                <span className="font-semibold">£0.00</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>Taxes</span>
                                            <span>-</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">Calculated after you provide your billing address</p>
                                    </div>

                                    {/* Total */}
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-lg font-bold text-gray-900">Subtotal</span>
                                            <div className="text-right">
                                                {currentPeriod.discount > 0 && (
                                                    <span className="text-sm text-gray-400 line-through mr-2">£{originalTotal.toFixed(0)}</span>
                                                )}
                                                <span className="text-2xl font-black text-gray-900">£{discountedTotal.toFixed(0)}</span>
                                            </div>
                                        </div>
                                        {currentPeriod.freeMonths && (
                                            <p className="text-sm text-green-600 mt-1">
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
                                                className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
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
                                            className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                                        >
                                            Have a coupon code?
                                        </button>
                                    )}

                                    {/* Continue Button */}
                                    <form onSubmit={handleSubmit}>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                                        >
                                            {processing ? 'Processing...' : 'Continue'}
                                        </button>
                                    </form>

                                    {/* Trust Badges */}
                                    <div className="pt-4 flex items-center justify-center gap-4 text-gray-400">
                                        <div className="flex items-center gap-1 text-xs">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                            Secure
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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

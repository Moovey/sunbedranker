import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import HotelierNav from '@/Components/HotelierNav';

// Payment Form Component (uses Stripe hooks)
function PaymentForm({ plan, period, orderSummary, clientSecret, billingData, onBack }) {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe not loaded');
            return;
        }

        setProcessing(true);
        setError(null);

        // Confirm the payment using Payment Element
        const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/hotelier`,
            },
            redirect: 'if_required',
        });

        if (stripeError) {
            console.error('Stripe error:', stripeError);
            setError(stripeError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded! Intent ID:', paymentIntent.id);
            // Payment successful - submit to backend to create subscription
            router.post(route('hotelier.subscribe.complete', { plan }), {
                ...billingData,
                payment_method: paymentIntent.payment_method_types?.[0] || 'card',
                period: period,
                payment_intent_id: paymentIntent.id,
            }, {
                preserveScroll: true,
            });
        } else if (paymentIntent) {
            console.log('Payment status:', paymentIntent.status);
            setError(`Payment requires additional action. Please try again.`);
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Choose your payment method:</p>

            {/* Stripe Payment Element - Shows all available payment methods */}
            <div className="rounded-lg sm:rounded-xl overflow-hidden">
                <PaymentElement 
                    onReady={() => setIsReady(true)}
                    options={{
                        layout: {
                            type: 'accordion',
                            defaultCollapsed: false,
                            radios: true,
                            spacedAccordionItems: true,
                        },
                        paymentMethodOrder: ['card', 'google_pay', 'apple_pay', 'klarna', 'link'],
                        business: {
                            name: 'SunbedRanker',
                        },
                    }}
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-100 rounded-lg p-2.5 sm:p-3">
                    <p className="text-red-600 text-xs sm:text-sm">{error}</p>
                </div>
            )}

            {/* Test Card Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5 sm:p-3">
                <p className="text-gray-900 text-xs sm:text-sm font-medium mb-1">🧪 Test Mode</p>
                <p className="text-gray-600 text-[10px] sm:text-xs">Card: <span className="font-mono">4242 4242 4242 4242</span></p>
                <p className="text-gray-600 text-[10px] sm:text-xs">Any future date, any CVC</p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-5">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-2 sm:py-2.5 border border-gray-200 text-gray-700 font-medium text-xs sm:text-sm rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={processing || !stripe || !isReady}
                    className="flex-1 py-2 sm:py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        `Pay £${orderSummary.total.toFixed(0)}`
                    )}
                </button>
            </div>
        </form>
    );
}

// Main Component
export default function SubscriptionPayment({ plan, period, orderSummary, stripeKey, clientSecret, redirectTo }) {
    const [activeStep, setActiveStep] = useState(1);
    const [stripePromise, setStripePromise] = useState(null);

    const { data, setData } = useForm({
        // Billing Address
        first_name: '',
        last_name: '',
        country: 'United Kingdom',
        phone_code: '+44',
        phone_number: '',
        address: '',
        city: '',
        zip_code: '',
    });

    useEffect(() => {
        if (stripeKey) {
            setStripePromise(loadStripe(stripeKey));
        }
    }, [stripeKey]);

    const countries = [
        { code: 'GB', name: 'United Kingdom', phone: '+44' },
        { code: 'US', name: 'United States', phone: '+1' },
        { code: 'PH', name: 'Philippines', phone: '+63' },
        { code: 'ES', name: 'Spain', phone: '+34' },
        { code: 'FR', name: 'France', phone: '+33' },
        { code: 'DE', name: 'Germany', phone: '+49' },
        { code: 'IT', name: 'Italy', phone: '+39' },
        { code: 'PT', name: 'Portugal', phone: '+351' },
        { code: 'GR', name: 'Greece', phone: '+30' },
        { code: 'AU', name: 'Australia', phone: '+61' },
    ];

    const handleCountryChange = (e) => {
        const country = countries.find(c => c.name === e.target.value);
        setData({
            ...data,
            country: e.target.value,
            phone_code: country?.phone || '+44',
        });
    };

    const handleBillingContinue = (e) => {
        e.preventDefault();
        if (!data.first_name || !data.last_name || !data.country || !data.address || !data.city || !data.zip_code) {
            return;
        }
        setActiveStep(2);
    };

    return (
        <>
            <Head title="Complete Your Subscription" />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <HotelierNav />

                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                    {/* Header */}
                    <div className="mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <Link
                                href={route('hotelier.subscribe', { plan })}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Complete Your Subscription</h1>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm ml-6 sm:ml-8">
                            Enter your billing details and payment information
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Left Column - Forms */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                            {/* Step 1: Billing Address */}
                            <div className={`bg-white rounded-lg sm:rounded-xl shadow-sm border ${activeStep === 1 ? 'border-orange-200' : 'border-gray-100'} overflow-hidden`}>
                                <div className="p-4 sm:p-5 border-b border-gray-100">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold ${
                                            activeStep >= 1 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                            1
                                        </span>
                                        <h2 className={`text-base sm:text-lg font-semibold ${activeStep >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>Billing address</h2>
                                    </div>
                                </div>

                                {activeStep === 1 && (
                                    <form onSubmit={handleBillingContinue} className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                                        {/* Name Fields */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">First name</label>
                                                <input
                                                    type="text"
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Last name</label>
                                                <input
                                                    type="text"
                                                    value={data.last_name}
                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Country & Phone */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Country</label>
                                                <select
                                                    value={data.country}
                                                    onChange={handleCountryChange}
                                                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm bg-white"
                                                    required
                                                >
                                                    {countries.map((country) => (
                                                        <option key={country.code} value={country.name}>
                                                            {country.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                                                <div className="flex">
                                                    <span className="inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50 text-gray-500 text-xs sm:text-sm">
                                                        {data.phone_code}
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        value={data.phone_number}
                                                        onChange={(e) => setData('phone_number', e.target.value)}
                                                        placeholder="Phone number"
                                                        className="flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-r-lg focus:ring-orange-500 focus:border-orange-500 text-sm min-w-0"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Address</label>
                                            <input
                                                type="text"
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                                className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                required
                                            />
                                        </div>

                                        {/* City & ZIP */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">City</label>
                                                <input
                                                    type="text"
                                                    value={data.city}
                                                    onChange={(e) => setData('city', e.target.value)}
                                                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">ZIP code</label>
                                                <input
                                                    type="text"
                                                    value={data.zip_code}
                                                    onChange={(e) => setData('zip_code', e.target.value)}
                                                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors"
                                        >
                                            Continue
                                        </button>
                                    </form>
                                )}

                                {activeStep > 1 && (
                                    <div className="p-4 sm:p-5 bg-gray-50">
                                        <div className="flex justify-between items-start sm:items-center gap-3">
                                            <div className="text-xs sm:text-sm text-gray-500 min-w-0">
                                                <p className="font-medium text-gray-900">{data.first_name} {data.last_name}</p>
                                                <p className="truncate">{data.address}, {data.city}, {data.zip_code}</p>
                                                <p>{data.country}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setActiveStep(1)}
                                                className="text-orange-600 hover:text-orange-700 font-medium text-xs sm:text-sm flex-shrink-0"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Step 2: Payment */}
                            <div className={`bg-white rounded-lg sm:rounded-xl shadow-sm border ${activeStep === 2 ? 'border-orange-200' : 'border-gray-100'} overflow-hidden`}>
                                <div className="p-4 sm:p-5 border-b border-gray-100">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold ${
                                            activeStep >= 2 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                            2
                                        </span>
                                        <h2 className={`text-base sm:text-lg font-semibold ${activeStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>Payment</h2>
                                    </div>
                                </div>

                                {activeStep === 2 && stripePromise && clientSecret && (
                                    <Elements 
                                        stripe={stripePromise} 
                                        options={{ 
                                            clientSecret,
                                            appearance: {
                                                theme: 'stripe',
                                                variables: {
                                                    colorPrimary: '#f97316',
                                                    colorBackground: '#ffffff',
                                                    colorText: '#374151',
                                                    colorDanger: '#ef4444',
                                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                                    borderRadius: '8px',
                                                    spacingUnit: '4px',
                                                },
                                                rules: {
                                                    '.Tab': {
                                                        border: '1px solid #e5e7eb',
                                                        boxShadow: 'none',
                                                    },
                                                    '.Tab--selected': {
                                                        border: '1px solid #f97316',
                                                        backgroundColor: '#fff7ed',
                                                    },
                                                    '.Input': {
                                                        border: '1px solid #e5e7eb',
                                                    },
                                                    '.Input:focus': {
                                                        border: '1px solid #f97316',
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        <PaymentForm
                                            plan={plan}
                                            period={period}
                                            orderSummary={orderSummary}
                                            clientSecret={clientSecret}
                                            billingData={data}
                                            onBack={() => setActiveStep(1)}
                                        />
                                    </Elements>
                                )}

                                {activeStep === 2 && (!stripePromise || !clientSecret) && (
                                    <div className="p-4 sm:p-5">
                                        <div className="flex items-center justify-center py-4 sm:py-6">
                                            <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-orange-500" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                            </svg>
                                            <span className="ml-2 sm:ml-3 text-gray-500 text-xs sm:text-sm">Loading payment form...</span>
                                        </div>
                                    </div>
                                )}
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
                                        <p className="font-medium text-gray-900 text-sm sm:text-base">{orderSummary.planName}</p>
                                    </div>

                                    {/* Line Items */}
                                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{orderSummary.periodLabel} plan</span>
                                            <span className="font-medium text-gray-900">£{orderSummary.originalTotal.toFixed(0)}</span>
                                        </div>
                                        
                                        {orderSummary.discount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Discount ({orderSummary.discountPercent}% off)</span>
                                                <span className="font-medium">-£{orderSummary.savings.toFixed(0)}</span>
                                            </div>
                                        )}

                                        {orderSummary.freeMonths > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>+ {orderSummary.freeMonths} months FREE</span>
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
                                                {orderSummary.discount > 0 && (
                                                    <span className="text-xs sm:text-sm text-gray-400 line-through mr-2">£{orderSummary.originalTotal.toFixed(0)}</span>
                                                )}
                                                <span className="text-lg sm:text-xl font-bold text-gray-900">£{orderSummary.total.toFixed(0)}</span>
                                            </div>
                                        </div>
                                        {orderSummary.freeMonths > 0 && (
                                            <p className="text-[10px] sm:text-xs text-green-600 mt-1">
                                                Total coverage: {orderSummary.totalMonths} months
                                            </p>
                                        )}
                                    </div>

                                    {/* Trust Badge */}
                                    <div className="pt-2 sm:pt-3 flex items-center justify-center gap-1.5 sm:gap-2 text-gray-400">
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <span className="text-[10px] sm:text-xs">30-day money-back guarantee</span>
                                    </div>

                                    {/* Powered by Stripe */}
                                    <div className="pt-1.5 sm:pt-2 flex items-center justify-center gap-1.5 sm:gap-2 text-gray-400">
                                        <span className="text-[10px] sm:text-xs">Powered by</span>
                                        <svg className="h-3.5 sm:h-4" viewBox="0 0 60 25" fill="none">
                                            <path d="M59.64 14.28c0-4.82-2.31-8.64-6.79-8.64-4.5 0-7.2 3.82-7.2 8.6 0 5.67 3.21 8.54 7.81 8.54 2.24 0 3.94-.51 5.22-1.22v-3.78c-1.28.64-2.75 1.03-4.61 1.03-1.82 0-3.44-.64-3.65-2.87h9.21c0-.25.01-.98.01-1.66zm-9.3-1.8c0-2.13 1.3-3.02 2.5-3.02 1.17 0 2.39.89 2.39 3.02h-4.89zM38.89 5.64c-1.83 0-3.01.86-3.66 1.46l-.24-1.16h-4.15v22.2l4.72-1v-5.39c.67.49 1.65 1.18 3.28 1.18 3.32 0 6.35-2.67 6.35-8.56-.01-5.39-3.08-8.73-6.3-8.73zm-1.11 13.43c-1.09 0-1.73-.39-2.18-.88v-6.95c.48-.54 1.14-.91 2.18-.91 1.67 0 2.82 1.87 2.82 4.37 0 2.55-1.13 4.37-2.82 4.37zM25.89 4.52l4.72-1.02V0l-4.72 1v3.52zM25.89 5.91h4.72v16.67h-4.72V5.91zM21.1 7.36l-.3-1.45h-4.09v16.67h4.72V11.67c1.12-1.45 3-1.19 3.59-.98V5.91c-.62-.24-2.87-.67-3.92 1.45zM11.47 2.19l-4.61.98-.02 15.27c0 2.82 2.12 4.9 4.94 4.9 1.56 0 2.71-.29 3.34-.63v-3.83c-.6.25-3.59 1.12-3.59-1.69V9.77h3.59V5.91h-3.59l-.06-3.72zM1.22 10.21c0-.67.56-1.12 1.46-1.12 1.3 0 2.94.39 4.24 1.09V5.82C5.46 5.31 4.03 5 2.59 5-.61 5 0 7.87 0 10.52c0 4.16 4.56 3.5 4.56 5.29 0 .79-.69 1.05-1.65 1.05-1.43 0-3.26-.59-4.7-1.38v4.41c1.6.69 3.22.98 4.7.98 3.35 0 5.33-1.66 5.33-4.41-.02-4.49-4.58-3.69-4.58-5.4z" fill="#6772E5"/>
                                        </svg>
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

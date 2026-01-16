import { Head, Link, usePage } from '@inertiajs/react';
import HotelierNav from '@/Components/HotelierNav';

export default function Subscription({ currentTier, redirectTo }) {
    const { auth } = usePage().props;

    const plans = [
        {
            id: 'enhanced',
            name: 'Enhanced',
            tagline: 'Verified & Conversion-Focused',
            price: '£49',
            period: '/month',
            description: 'For hotels that want control, trust, and better conversion.',
            icon: '⭐',
            color: 'orange',
            features: [
                'Claim & manage your hotel profile',
                'Extra photos & gallery control',
                'Rich descriptions (pool areas, sunbed zones, policies)',
                'Promotional banners & special offers (1 active)',
                'Videos and 360° pool content',
                'Direct booking engine link (alongside OTAs)',
                'Profile performance analytics (views, clicks)',
                '"Verified by Hotel" badge',
            ],
            notIncluded: [
                'Priority listing placement',
                'Featured sections placement',
                'Lead capture forms',
                'Advanced analytics & heatmaps',
            ],
        },
        {
            id: 'premium',
            name: 'Premium',
            tagline: 'Maximum Visibility & Leads',
            price: '£149',
            period: '/month',
            description: 'For hotels that want top visibility and direct leads.',
            icon: '👑',
            color: 'blue',
            popular: true,
            features: [
                'Everything in Enhanced, plus:',
                'Priority placement in destination listings',
                'Larger hotel cards & hero images',
                'Featured in "Top Pool Hotels" sections',
                'Multiple promotional placements',
                'Highlighted offers in comparison pages',
                'Lead capture forms ("Request callback", "Ask about cabanas")',
                'Advanced analytics (conversion tracking, click heatmaps)',
                'Date-based interest trends',
                'Future: Newsletter & blog placements',
            ],
            notIncluded: [],
        },
    ];

    return (
        <>
            <Head title="Upgrade Subscription" />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <HotelierNav />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Link
                                href={route('hotelier.dashboard')}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Upgrade Your Subscription</h1>
                        </div>
                        <p className="text-gray-500 text-sm ml-8">
                            Unlock the ability to claim and manage your hotel profiles. Choose the plan that's right for you.
                        </p>
                        {currentTier === 'free' && (
                            <div className="mt-3 ml-8 inline-flex items-center gap-2">
                                <span className="text-sm text-gray-500">Current Plan:</span>
                                <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                    Free Tier
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Why Upgrade Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            Why Upgrade?
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Claim Ownership</p>
                                    <p className="text-xs text-gray-500">Verify you own your hotel</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Edit Profile</p>
                                    <p className="text-xs text-gray-500">Update descriptions & info</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Upload Images</p>
                                    <p className="text-xs text-gray-500">Add stunning photos</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">Analytics</p>
                                    <p className="text-xs text-gray-500">Track your performance</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {plans.map((plan) => (
                            <PricingCard 
                                key={plan.id} 
                                plan={plan} 
                                currentTier={currentTier}
                                redirectTo={redirectTo}
                            />
                        ))}
                    </div>

                    {/* Feature Comparison Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Feature Comparison
                            </h2>
                        </div>
                        <div className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Feature</th>
                                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Free</th>
                                            <th className="px-4 py-3 text-center text-xs font-medium text-orange-600">Enhanced</th>
                                            <th className="px-4 py-3 text-center text-xs font-medium text-blue-600">Premium</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <ComparisonRow feature="Basic profile" free={true} enhanced={true} premium={true} />
                                        <ComparisonRow feature="Claim hotel" free={false} enhanced={true} premium={true} />
                                        <ComparisonRow feature="Extra photos & gallery" free={false} enhanced={true} premium={true} />
                                        <ComparisonRow feature="Videos / 360° content" free={false} enhanced={true} premium={true} />
                                        <ComparisonRow feature="Promotional offers" free={false} enhanced="1 active" premium="Multiple" />
                                        <ComparisonRow feature="Direct booking link" free={false} enhanced={true} premium={true} />
                                        <ComparisonRow feature="Analytics" free={false} enhanced="Basic" premium="Advanced" />
                                        <ComparisonRow feature="Verified badge" free={false} enhanced={true} premium={true} />
                                        <ComparisonRow feature="Priority listing" free={false} enhanced={false} premium={true} />
                                        <ComparisonRow feature="Featured sections" free={false} enhanced={false} premium={true} />
                                        <ComparisonRow feature="Lead capture forms" free={false} enhanced={false} premium={true} />
                                        <ComparisonRow feature="Larger hotel cards" free={false} enhanced={false} premium={true} />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-3">
                            <FAQItem 
                                question="Can I cancel my subscription anytime?"
                                answer="Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period."
                            />
                            <FAQItem 
                                question="What happens to my claimed hotels if I downgrade?"
                                answer="Your claimed hotels remain associated with your account, but you won't be able to edit them until you upgrade again."
                            />
                            <FAQItem 
                                question="Can I upgrade from Enhanced to Premium later?"
                                answer="Absolutely! You can upgrade at any time and you'll only pay the difference for the remaining billing period."
                            />
                            <FAQItem 
                                question="Is there a free trial?"
                                answer="We offer a 14-day money-back guarantee on all paid plans. Try risk-free!"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function PricingCard({ plan, currentTier, redirectTo }) {
    const colorStyles = {
        orange: {
            headerBg: 'bg-orange-500',
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            badge: 'bg-orange-100 text-orange-700',
            button: 'bg-orange-500 hover:bg-orange-600',
            check: 'text-orange-500',
            popular: 'border-orange-300',
            popularBadge: 'bg-orange-500',
        },
        blue: {
            headerBg: 'bg-blue-500',
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            badge: 'bg-blue-100 text-blue-700',
            button: 'bg-blue-500 hover:bg-blue-600',
            check: 'text-blue-500',
            popular: 'border-blue-300',
            popularBadge: 'bg-blue-500',
        },
    };

    const style = colorStyles[plan.color];
    const isCurrentPlan = currentTier === plan.id;

    return (
        <div className={`relative bg-white rounded-xl shadow-sm border ${plan.popular ? style.popular : 'border-gray-100'} overflow-hidden transition-all hover:shadow-md`}>
            {plan.popular && (
                <div className={`absolute top-0 right-0 ${style.popularBadge} text-white px-3 py-1 text-xs font-medium rounded-bl-lg`}>
                    MOST POPULAR
                </div>
            )}
            
            <div className={`${style.headerBg} p-5 text-white`}>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{plan.icon}</span>
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                </div>
                {plan.tagline && (
                    <p className="text-sm text-white/90 mb-1">"{plan.tagline}"</p>
                )}
                <p className="text-xs text-white/80">{plan.description}</p>
            </div>

            <div className="p-5">
                <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-2 mb-5">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <svg className={`w-4 h-4 ${style.check} flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                    ))}
                    {plan.notIncluded.map((feature, index) => (
                        <li key={`not-${index}`} className="flex items-start gap-2 opacity-50">
                            <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-400 text-sm line-through">{feature}</span>
                        </li>
                    ))}
                </ul>

                {isCurrentPlan ? (
                    <button
                        disabled
                        className="w-full py-2.5 px-4 rounded-lg font-medium text-sm text-gray-500 bg-gray-100 cursor-not-allowed"
                    >
                        Current Plan
                    </button>
                ) : (
                    <Link
                        href={route('hotelier.subscribe', { plan: plan.id, redirect: redirectTo })}
                        className={`block w-full py-2.5 px-4 rounded-lg font-medium text-sm text-white ${style.button} text-center transition-colors`}
                    >
                        Choose {plan.name}
                    </Link>
                )}
            </div>
        </div>
    );
}

function FAQItem({ question, answer }) {
    return (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="font-medium text-gray-900 text-sm mb-1">{question}</h3>
            <p className="text-gray-500 text-sm">{answer}</p>
        </div>
    );
}

function ComparisonRow({ feature, free, enhanced, premium }) {
    const renderValue = (value) => {
        if (value === true) {
            return (
                <svg className="w-4 h-4 text-orange-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            );
        }
        if (value === false) {
            return (
                <svg className="w-4 h-4 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            );
        }
        return <span className="text-xs font-medium text-gray-700">{value}</span>;
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors border-b border-gray-50">
            <td className="px-6 py-2.5 text-sm text-gray-900">{feature}</td>
            <td className="px-4 py-2.5 text-center">{renderValue(free)}</td>
            <td className="px-4 py-2.5 text-center bg-orange-50/30">{renderValue(enhanced)}</td>
            <td className="px-4 py-2.5 text-center bg-blue-50/30">{renderValue(premium)}</td>
        </tr>
    );
}

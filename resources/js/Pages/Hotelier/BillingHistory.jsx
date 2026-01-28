import { Head, Link } from '@inertiajs/react';
import HotelierNav from '@/Components/HotelierNav';

export default function BillingHistory({ subscriptions, activeSubscription }) {
    const getStatusBadge = (status, isActive) => {
        if (isActive) {
            return (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                </span>
            );
        }

        const statusStyles = {
            active: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            cancelled: 'bg-gray-100 text-gray-600',
            expired: 'bg-red-100 text-red-800',
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-600'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getTierBadge = (tier) => {
        const tierStyles = {
            enhanced: 'bg-orange-100 text-orange-800 border-orange-200',
            premium: 'bg-blue-100 text-blue-800 border-blue-200',
            free: 'bg-gray-100 text-gray-600 border-gray-200',
        };

        const tierIcons = {
            enhanced: '⭐',
            premium: '👑',
            free: '🆓',
        };

        return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${tierStyles[tier] || 'bg-gray-100 text-gray-600'}`}>
                <span>{tierIcons[tier]}</span>
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
            </span>
        );
    };

    const formatPaymentMethod = (method) => {
        const methods = {
            card: '💳 Card',
            google_pay: '🔵 Google Pay',
            apple_pay: '🍎 Apple Pay',
            klarna: '🟣 Klarna',
            link: '🔗 Link',
        };
        return methods[method] || method;
    };

    return (
        <>
            <Head title="Billing History" />
            
            <div className="min-h-screen bg-gray-50 font-sans">
                <HotelierNav />

                <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                    {/* Page Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <Link
                                href={route('hotelier.subscription')}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Billing History</h1>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base">View your subscription payment history and invoices.</p>
                    </div>

                    {/* Current Subscription Summary */}
                    {activeSubscription && (
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 mb-6 text-white">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <p className="text-blue-100 text-sm">Current Plan</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xl sm:text-2xl font-bold">{activeSubscription.tier_name}</span>
                                        {activeSubscription.tier === 'premium' && <span>👑</span>}
                                        {activeSubscription.tier === 'enhanced' && <span>⭐</span>}
                                    </div>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="text-blue-100 text-sm">Valid Until</p>
                                    <p className="text-lg font-semibold">{activeSubscription.ends_at}</p>
                                    <p className="text-blue-200 text-sm">{activeSubscription.remaining_days} days remaining</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Billing History Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-900">Payment History</h2>
                        </div>

                        {subscriptions.length === 0 ? (
                            <div className="px-4 sm:px-6 py-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No billing history</h3>
                                <p className="text-gray-500 mb-4">You haven't made any subscription purchases yet.</p>
                                <Link
                                    href={route('hotelier.subscription')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    View Plans
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Desktop Table */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-100">
                                            {subscriptions.map((subscription) => (
                                                <tr key={subscription.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{subscription.created_at}</div>
                                                        {subscription.transaction_id && (
                                                            <div className="text-xs text-gray-500 font-mono">#{subscription.transaction_id.slice(-8)}</div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {getTierBadge(subscription.tier)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{subscription.total_months} months</div>
                                                        <div className="text-xs text-gray-500">
                                                            {subscription.starts_at} - {subscription.ends_at}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">£{parseFloat(subscription.total_amount).toFixed(2)}</div>
                                                        {subscription.savings > 0 && (
                                                            <div className="text-xs text-green-600">Saved £{parseFloat(subscription.savings).toFixed(2)}</div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {formatPaymentMethod(subscription.payment_method)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {getStatusBadge(subscription.status, subscription.is_active)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Cards */}
                                <div className="md:hidden divide-y divide-gray-100">
                                    {subscriptions.map((subscription) => (
                                        <div key={subscription.id} className="p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    {getTierBadge(subscription.tier)}
                                                    <p className="text-xs text-gray-500 mt-1">{subscription.created_at}</p>
                                                </div>
                                                {getStatusBadge(subscription.status, subscription.is_active)}
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <p className="text-gray-500 text-xs">Period</p>
                                                    <p className="font-medium">{subscription.total_months} months</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 text-xs">Amount</p>
                                                    <p className="font-medium">£{parseFloat(subscription.total_amount).toFixed(2)}</p>
                                                    {subscription.savings > 0 && (
                                                        <p className="text-xs text-green-600">Saved £{parseFloat(subscription.savings).toFixed(2)}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 text-xs">Valid</p>
                                                    <p className="text-xs">{subscription.starts_at} - {subscription.ends_at}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 text-xs">Payment</p>
                                                    <p className="text-xs">{formatPaymentMethod(subscription.payment_method)}</p>
                                                </div>
                                            </div>
                                            {subscription.transaction_id && (
                                                <p className="text-xs text-gray-400 mt-2 font-mono">Transaction: {subscription.transaction_id.slice(-12)}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Help Section */}
                    <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Billing Questions</p>
                                    <p className="text-sm text-gray-600">Contact us at <a href="mailto:billing@sunbedranker.com" className="text-blue-600 hover:underline">billing@sunbedranker.com</a></p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Invoice Requests</p>
                                    <p className="text-sm text-gray-600">Need an invoice? Request one via email.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

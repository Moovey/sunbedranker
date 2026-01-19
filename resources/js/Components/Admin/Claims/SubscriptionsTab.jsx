// SubscriptionsTab Component
// Displays subscriptions table with management actions

import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';
import TierBadge from '@/Components/Admin/TierBadge';
import StatusBadge from '@/Components/Admin/StatusBadge';
import Pagination from '@/Components/Admin/Pagination';
import EmptyState from '@/Components/Admin/EmptyState';
import { CurrencyIcon } from '@/Components/Admin/Icons';
import { formatDate } from '@/Components/Admin/helpers';

export default function SubscriptionsTab({ subscriptions }) {
    if (subscriptions.data.length === 0) {
        return (
            <EmptyState 
                icon={<CurrencyIcon className="w-12 h-12" />}
                title="No subscriptions found"
                description="There are no subscriptions matching your filters."
            />
        );
    }

    const handleCancel = (subscription) => {
        if (confirm('Are you sure you want to cancel this subscription?')) {
            router.post(route('admin.subscriptions.cancel', subscription.id), {}, {
                preserveScroll: true,
                onSuccess: () => toast.success('Subscription cancelled'),
            });
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {subscriptions.data.map((subscription) => (
                            <tr key={subscription.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-gray-900">{subscription.user?.name}</p>
                                    <p className="text-xs text-gray-500">{subscription.user?.email}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <TierBadge tier={subscription.tier} />
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-gray-900">€{subscription.total_amount}</p>
                                    {subscription.monthly_price > 0 && (
                                        <p className="text-xs text-gray-500">€{subscription.monthly_price}/mo</p>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {subscription.period_months} month{subscription.period_months !== 1 ? 's' : ''}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={subscription.status} />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {subscription.ends_at ? formatDate(subscription.ends_at) : 'Never'}
                                </td>
                                <td className="px-6 py-4">
                                    {subscription.status === 'active' && (
                                        <button
                                            onClick={() => handleCancel(subscription)}
                                            className="text-red-600 hover:text-red-700 font-medium text-sm"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={subscriptions.links} from={subscriptions.from} to={subscriptions.to} total={subscriptions.total} />
        </>
    );
}

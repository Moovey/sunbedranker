// SubscriptionModal Component
// Modal for managing hotelier subscriptions

import { useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';
import Modal from '@/Components/Admin/Modal';

export default function SubscriptionModal({ hotelier, onClose }) {
    const { data, setData, post, processing, errors } = useForm({
        tier: hotelier.subscription_tier || 'enhanced',
        period_months: 12,
        reason: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.hoteliers.update-subscription', hotelier.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Subscription updated successfully');
                onClose();
            },
        });
    };

    return (
        <Modal show={true} title="Manage Subscription" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="space-y-3 sm:space-y-4">
                    <div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                            Update subscription for <strong className="break-words">{hotelier.name}</strong>
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Subscription Tier
                        </label>
                        <select
                            value={data.tier}
                            onChange={(e) => setData('tier', e.target.value)}
                            className="w-full px-2.5 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                            <option value="free">Free</option>
                            <option value="enhanced">Enhanced</option>
                            <option value="premium">Premium</option>
                        </select>
                        {errors.tier && (
                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.tier}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Period (Months)
                        </label>
                        <select
                            value={data.period_months}
                            onChange={(e) => setData('period_months', parseInt(e.target.value))}
                            className="w-full px-2.5 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                            <option value={1}>1 Month</option>
                            <option value={3}>3 Months</option>
                            <option value={6}>6 Months</option>
                            <option value={12}>12 Months</option>
                            <option value={24}>24 Months</option>
                        </select>
                        {errors.period_months && (
                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.period_months}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Reason (optional)
                        </label>
                        <textarea
                            value={data.reason}
                            onChange={(e) => setData('reason', e.target.value)}
                            rows={3}
                            className="w-full px-2.5 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Reason for this change..."
                        />
                        {errors.reason && (
                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.reason}</p>
                        )}
                    </div>
                </div>

                <div className="mt-4 sm:mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-xs sm:text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium text-xs sm:text-sm disabled:opacity-50"
                    >
                        {processing ? 'Updating...' : 'Update Subscription'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

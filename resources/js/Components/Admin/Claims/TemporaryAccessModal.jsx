// TemporaryAccessModal Component
// Modal for granting temporary access to hoteliers

import { useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';
import Modal from '@/Components/Admin/Modal';

export default function TemporaryAccessModal({ hotelier, onClose }) {
    const { data, setData, post, processing, errors } = useForm({
        tier: 'enhanced',
        days: 14,
        reason: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.hoteliers.temporary-access', hotelier.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Temporary access granted');
                onClose();
            },
        });
    };

    return (
        <Modal show={true} title="Grant Temporary Access" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="space-y-3 sm:space-y-4">
                    <div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                            Grant temporary access to <strong className="break-words">{hotelier.name}</strong>
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Access Tier
                        </label>
                        <select
                            value={data.tier}
                            onChange={(e) => setData('tier', e.target.value)}
                            className="w-full px-2.5 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                            <option value="enhanced">Enhanced</option>
                            <option value="premium">Premium</option>
                        </select>
                        {errors.tier && (
                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.tier}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Duration (Days)
                        </label>
                        <select
                            value={data.days}
                            onChange={(e) => setData('days', parseInt(e.target.value))}
                            className="w-full px-2.5 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                            <option value={7}>7 Days</option>
                            <option value={14}>14 Days</option>
                            <option value={30}>30 Days</option>
                            <option value={60}>60 Days</option>
                            <option value={90}>90 Days</option>
                        </select>
                        {errors.days && (
                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.days}</p>
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
                            placeholder="Reason for granting access..."
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
                        className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium text-xs sm:text-sm disabled:opacity-50"
                    >
                        {processing ? 'Granting...' : 'Grant Access'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function HotelierDashboard({ hotels, pendingClaim, recentReviews, stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Hotelier Dashboard
                </h2>
            }
        >
            <Head title="Hotelier Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-sm font-medium text-gray-500">Total Hotels</div>
                            <div className="mt-2 text-3xl font-bold text-gray-900">{stats.total_hotels}</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-sm font-medium text-gray-500">Average Score</div>
                            <div className="mt-2 text-3xl font-bold text-gray-900">
                                {stats.average_score ? stats.average_score.toFixed(1) : 'N/A'}
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-sm font-medium text-gray-500">Total Reviews</div>
                            <div className="mt-2 text-3xl font-bold text-gray-900">{stats.total_reviews}</div>
                        </div>
                    </div>

                    {/* Pending Claim Alert */}
                    {pendingClaim && (
                        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Pending Claim</h3>
                            <p className="text-yellow-700">
                                Your claim for <span className="font-semibold">{pendingClaim.hotel.name}</span> is currently under review.
                            </p>
                        </div>
                    )}

                    {/* Hotels List */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Hotels</h3>
                            {hotels && hotels.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Hotel Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Destination
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Score
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Reviews
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {hotels.map((hotel) => (
                                                <tr key={hotel.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{hotel.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{hotel.destination}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{hotel.score?.toFixed(1) || 'N/A'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{hotel.total_reviews}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route('hotels.show', hotel.slug)}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500">You don't have any hotels yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Reviews */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reviews</h3>
                            {recentReviews && recentReviews.length > 0 ? (
                                <div className="space-y-4">
                                    {recentReviews.map((review) => (
                                        <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium text-gray-900">{review.hotel.name}</p>
                                                    <p className="text-sm text-gray-500">by {review.user.name}</p>
                                                </div>
                                                <div className="text-yellow-500">
                                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                                </div>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No reviews yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import { Link, Head } from '@inertiajs/react';
import AdminNav from '@/Components/AdminNav';

export default function AdminDashboard({ stats, recentHotels, pendingClaims, pendingReviews }) {
    return (
        <>
            <Head title="Admin Dashboard" />
            
            <div className="min-h-screen bg-white font-sans">
                <AdminNav stats={stats} />

                {/* Page Header */}
                <div className="bg-gradient-to-r from-orange-50 to-blue-50 shadow-lg border-b-2 border-orange-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
                        {/* Decorative accent */}
                        <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                            <div className="h-0.5 w-8 sm:w-10 md:w-12 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                            <svg className="mx-3 sm:mx-4 text-orange-500" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <div className="h-0.5 w-8 sm:w-10 md:w-12 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                        </div>
                        <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 text-center">Admin Dashboard</h1>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                        <StatCard
                            title="Total Hotels"
                            value={stats.total_hotels}
                            subtitle={`${stats.active_hotels} active`}
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.84L18 11v8h-2v-6H8v6H6v-8l6-5.16z"/>
                                </svg>
                            }
                        />
                        <StatCard
                            title="Destinations"
                            value={stats.total_destinations}
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                            }
                        />
                        <StatCard
                            title="Pending Claims"
                            value={stats.pending_claims}
                            link="/admin/claims"
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                </svg>
                            }
                        />
                        <StatCard
                            title="Pending Reviews"
                            value={stats.pending_reviews}
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                        <StatCard
                            title="Total Users"
                            value={stats.total_users}
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                                </svg>
                            }
                        />
                        <StatCard
                            title="Hoteliers"
                            value={stats.hoteliers}
                            icon={
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                        {/* Recent Hotels */}
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-5 sm:p-6 md:p-8 border-2 border-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-6 gap-3 sm:gap-0">
                                <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Recent Hotels</h2>
                                <Link 
                                    href="/admin/hotels" 
                                    className="text-orange-600 hover:text-orange-700 font-bold text-sm transition-all duration-300 flex items-center gap-1 transform hover:scale-105"
                                >
                                    View all
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9.29 6.71L13.59 11L9.29 15.29L10.71 16.71L16.41 11L10.71 5.29L9.29 6.71Z"/>
                                    </svg>
                                </Link>
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                {recentHotels?.map((hotel) => (
                                    <Link
                                        key={hotel.id}
                                        href={`/admin/hotels/${hotel.id}/edit`}
                                        className="block p-3 sm:p-4 hover:bg-orange-50 rounded-lg transition-all duration-300 border-2 border-transparent hover:border-orange-200 transform hover:scale-105"
                                    >
                                        <div className="font-semibold text-gray-900 text-base sm:text-lg">{hotel.name}</div>
                                        <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">{hotel.destination.name}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Pending Claims */}
                        {pendingClaims?.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-5 sm:p-6 md:p-8 border-2 border-gray-100">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-6 gap-3 sm:gap-0">
                                    <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Pending Hotel Claims</h2>
                                    <Link 
                                        href="/admin/claims" 
                                        className="text-orange-600 hover:text-orange-700 font-bold text-sm transition-all duration-300 flex items-center gap-1 transform hover:scale-105"
                                    >
                                        View all
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M9.29 6.71L13.59 11L9.29 15.29L10.71 16.71L16.41 11L10.71 5.29L9.29 6.71Z"/>
                                        </svg>
                                    </Link>
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    {pendingClaims.map((claim) => (
                                        <div key={claim.id} className="p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-2 border-yellow-300">
                                            <div className="font-semibold text-gray-900 text-base sm:text-lg">{claim.hotel.name}</div>
                                            <div className="text-xs sm:text-sm text-gray-700 font-medium mt-1">
                                                Claimed by {claim.user.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-5 sm:p-6 md:p-8 border-2 border-gray-100">
                        <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-5 sm:mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                            <Link
                                href="/admin/hotels/create"
                                className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-center hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm sm:text-base shadow-lg"
                            >
                                Add New Hotel
                            </Link>
                            <Link
                                href="/admin/hotels"
                                className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm sm:text-base shadow-lg"
                            >
                                Manage Hotels
                            </Link>
                            <Link
                                href="/admin/claims"
                                className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-center hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm sm:text-base sm:col-span-2 md:col-span-1 shadow-lg"
                            >
                                Review Claims
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function StatCard({ title, value, subtitle, icon, link }) {
    const card = (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-5 sm:p-6 md:p-8 border-2 border-gray-100 group">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1">
                    <div className="text-gray-600 font-bold text-xs sm:text-sm mb-2 sm:mb-3">{title}</div>
                    <div className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">{value}</div>
                    {subtitle && (
                        <div className="text-gray-600 font-semibold text-xs sm:text-sm mt-1 sm:mt-2">{subtitle}</div>
                    )}
                </div>
                <div className="flex-shrink-0 ml-2 transform group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
            </div>
        </div>
    );

    return link ? (
        <Link href={link} className="block hover:scale-105 transition-transform duration-300">
            {card}
        </Link>
    ) : card;
}

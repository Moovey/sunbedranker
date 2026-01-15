import { Link } from '@inertiajs/react';
import PeriodCard from './PeriodCard';
import InfoBox from './InfoBox';
import ClickBreakdownCard from './ClickBreakdownCard';
import { LinkIcon, HotelIcon, MoneyIcon, CalendarIcon, CalendarWeekIcon, CalendarMonthIcon } from './Icons';

export default function ClicksTab({ analytics, hotel }) {
    const totalClicks = analytics.clickBreakdown.affiliate + analytics.clickBreakdown.direct;
    const affiliatePercent = totalClicks > 0 ? Math.round((analytics.clickBreakdown.affiliate / totalClicks) * 100) : 0;
    const directPercent = totalClicks > 0 ? Math.round((analytics.clickBreakdown.direct / totalClicks) * 100) : 0;

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <LinkIcon className="w-6 h-6 text-blue-500" />
                    Booking Link Clicks
                </h3>
                <p className="text-gray-600">
                    See where guests prefer to book and optimize your direct booking strategy.
                </p>
            </div>

            {/* Click Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Affiliate Clicks */}
                <ClickBreakdownCard
                    title="Affiliate / OTA Clicks"
                    icon={<HotelIcon className="w-7 h-7 text-blue-600" />}
                    value={analytics.clickBreakdown.affiliate}
                    percent={affiliatePercent}
                    description="Booking.com, Expedia, etc."
                    color="blue"
                />

                {/* Direct Clicks */}
                <div className={`rounded-2xl p-6 border-2 ${
                    hotel.direct_booking_url 
                        ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
                        : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
                }`}>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className={`font-bold ${hotel.direct_booking_url ? 'text-green-800' : 'text-gray-600'}`}>
                            Direct Booking Clicks
                        </h4>
                        <MoneyIcon className="w-7 h-7 text-green-600" />
                    </div>
                    {hotel.direct_booking_url ? (
                        <>
                            <div className="text-4xl font-black text-green-900 mb-2">
                                {analytics.clickBreakdown.direct.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-green-200 rounded-full h-2">
                                    <div 
                                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${directPercent}%` }}
                                    />
                                </div>
                                <span className="text-sm font-bold text-green-700">{directPercent}%</span>
                            </div>
                            <p className="text-xs text-green-600 mt-2">Your hotel's direct booking</p>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-gray-500 text-sm mb-3">No direct booking URL set</p>
                            <Link
                                href={route('hotelier.hotels.manage', hotel.slug)}
                                className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg font-bold text-sm hover:bg-green-600 transition-colors"
                            >
                                Add Direct Booking URL
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Period Breakdown */}
            <div>
                <h4 className="font-bold text-gray-800 mb-4">Click Trends</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <PeriodCard title="Today" value={analytics.today.clicks} icon={<CalendarIcon className="w-5 h-5 text-gray-500" />} />
                    <PeriodCard title="This Week" value={analytics.weekly.clicks} icon={<CalendarWeekIcon className="w-5 h-5 text-gray-500" />} />
                    <PeriodCard title="This Month" value={analytics.monthly.clicks} icon={<CalendarMonthIcon className="w-5 h-5 text-gray-500" />} />
                    <PeriodCard title="All Time" value={analytics.allTime.clicks} icon={<LinkIcon className="w-5 h-5 text-orange-500" />} highlight />
                </div>
            </div>

            {/* Why Direct Matters */}
            <InfoBox
                color="green"
                title="Why Direct Bookings Matter"
                icon={<MoneyIcon className="w-5 h-5" />}
                items={[
                    "Save 15-25% on OTA commissions",
                    "Build direct guest relationships",
                    "Offer exclusive perks and promotions",
                    'Tip: Add "Book Direct" offers to increase direct clicks!',
                ]}
            />
        </div>
    );
}

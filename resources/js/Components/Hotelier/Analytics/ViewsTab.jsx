import PeriodCard from './PeriodCard';
import DailyBreakdownTable from './DailyBreakdownTable';
import InfoBox from './InfoBox';
import { EyeIcon, CalendarIcon, CalendarWeekIcon, CalendarMonthIcon, ChartIcon, LightbulbIcon } from './Icons';

export default function ViewsTab({ analytics }) {
    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 flex items-center gap-1.5 sm:gap-2">
                    <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                    Profile Views
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                    Track how many times your hotel profile was viewed. Higher visibility leads to more bookings.
                </p>
            </div>

            {/* Period Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <PeriodCard title="Today" value={analytics.today.views} icon={<CalendarIcon className="w-4 h-4 text-gray-400" />} />
                <PeriodCard title="This Week" value={analytics.weekly.views} icon={<CalendarWeekIcon className="w-4 h-4 text-gray-400" />} />
                <PeriodCard title="This Month" value={analytics.monthly.views} icon={<CalendarMonthIcon className="w-4 h-4 text-gray-400" />} />
                <PeriodCard title="All Time" value={analytics.allTime.views} icon={<ChartIcon className="w-4 h-4 text-orange-500" />} highlight />
            </div>

            {/* Daily Breakdown Table */}
            <DailyBreakdownTable data={analytics.daily} />

            {/* Why Views Matter */}
            <InfoBox
                color="orange"
                title="Why Profile Views Matter"
                icon={<LightbulbIcon className="w-4 h-4" />}
                items={[
                    "Measures your hotel's visibility on Sunbed Ranker",
                    "Shows if promotions or upgrades increase exposure",
                    "Helps justify subscription value with real data",
                ]}
            />
        </div>
    );
}

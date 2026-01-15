import PeriodCard from './PeriodCard';
import DailyBreakdownTable from './DailyBreakdownTable';
import InfoBox from './InfoBox';
import { EyeIcon, CalendarIcon, CalendarWeekIcon, CalendarMonthIcon, ChartIcon, LightbulbIcon } from './Icons';

export default function ViewsTab({ analytics }) {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <EyeIcon className="w-6 h-6 text-orange-500" />
                    Profile Views
                </h3>
                <p className="text-gray-600">
                    Track how many times your hotel profile was viewed. Higher visibility leads to more bookings.
                </p>
            </div>

            {/* Period Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <PeriodCard title="Today" value={analytics.today.views} icon={<CalendarIcon className="w-5 h-5 text-gray-500" />} />
                <PeriodCard title="This Week" value={analytics.weekly.views} icon={<CalendarWeekIcon className="w-5 h-5 text-gray-500" />} />
                <PeriodCard title="This Month" value={analytics.monthly.views} icon={<CalendarMonthIcon className="w-5 h-5 text-gray-500" />} />
                <PeriodCard title="All Time" value={analytics.allTime.views} icon={<ChartIcon className="w-5 h-5 text-orange-500" />} highlight />
            </div>

            {/* Daily Breakdown Table */}
            <DailyBreakdownTable data={analytics.daily} />

            {/* Why Views Matter */}
            <InfoBox
                color="orange"
                title="Why Profile Views Matter"
                icon={<LightbulbIcon className="w-5 h-5" />}
                items={[
                    "Measures your hotel's visibility on Sunbed Ranker",
                    "Shows if promotions or upgrades increase exposure",
                    "Helps justify subscription value with real data",
                ]}
            />
        </div>
    );
}

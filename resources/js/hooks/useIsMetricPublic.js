import { usePage } from '@inertiajs/react';

/**
 * Returns a stable helper for checking whether a scoring metric should be
 * shown on public pages. Backed by the `publicMetrics` map shared from
 * `HandleInertiaRequests::share()` (driven by ScoringWeight.is_public).
 *
 * Usage:
 *   const isMetricPublic = useIsMetricPublic();
 *   if (isMetricPublic('sunbed_ratio')) { ... }
 *
 * If the map is missing (e.g. older cached payload), defaults to TRUE so
 * pages don't accidentally hide everything.
 */
export function useIsMetricPublic() {
    const { publicMetrics } = usePage().props;
    return (criteriaName) => {
        if (!publicMetrics || typeof publicMetrics !== 'object') {
            return true;
        }
        return publicMetrics[criteriaName] === true;
    };
}

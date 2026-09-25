import { usePage } from "@inertiajs/react";
function useIsMetricPublic() {
  const { publicMetrics } = usePage().props;
  return (criteriaName) => {
    if (!publicMetrics || typeof publicMetrics !== "object") {
      return true;
    }
    return publicMetrics[criteriaName] === true;
  };
}
export {
  useIsMetricPublic as u
};

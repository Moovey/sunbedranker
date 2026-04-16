import { usePage } from "@inertiajs/react";
function useAppUrl() {
  const { appUrl } = usePage().props;
  return appUrl || (typeof window !== "undefined" ? window.location.origin : "");
}
export {
  useAppUrl as u
};

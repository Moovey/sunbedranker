import { usePage } from '@inertiajs/react';

export function useAppUrl() {
    const { appUrl } = usePage().props;
    return appUrl || (typeof window !== 'undefined' ? window.location.origin : '');
}

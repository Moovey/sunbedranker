import { useEffect, useState } from 'react';
import { CONSENT_ACCEPTED, CONSENT_DECLINED, getStoredConsent, storeConsent } from '@/lib/analytics';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!getStoredConsent()) {
            setIsVisible(true);
        }
    }, []);

    const choose = (choice) => {
        storeConsent(choice);
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
            className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4"
        >
            <div className="mx-auto max-w-4xl rounded-xl bg-white p-4 shadow-lg ring-1 ring-slate-200 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-600">
                        We use cookies to measure site traffic and improve your experience. You can
                        accept or decline analytics cookies &mdash; essential cookies are always on.{' '}
                        <a
                            href="/cookie-policy"
                            className="font-medium text-orange-600 underline hover:text-orange-700"
                        >
                            Cookie policy
                        </a>
                    </p>

                    <div className="flex shrink-0 gap-2">
                        <button
                            type="button"
                            onClick={() => choose(CONSENT_DECLINED)}
                            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition-colors duration-200 hover:bg-slate-50"
                        >
                            Decline
                        </button>
                        <button
                            type="button"
                            onClick={() => choose(CONSENT_ACCEPTED)}
                            className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

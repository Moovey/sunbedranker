export const CONSENT_STORAGE_KEY = 'sbr_cookie_consent';

export const CONSENT_ACCEPTED = 'accepted';
export const CONSENT_DECLINED = 'declined';

export function getStoredConsent() {
    try {
        return window.localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch {
        return null;
    }
}

export function storeConsent(choice) {
    try {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
        // Private browsing or storage disabled — consent simply won't persist.
    }

    if (typeof window.gtag === 'function') {
        const granted = choice === CONSENT_ACCEPTED ? 'granted' : 'denied';

        window.gtag('consent', 'update', {
            ad_storage: granted,
            ad_user_data: granted,
            ad_personalization: granted,
            analytics_storage: granted,
        });
    }
}

export function trackEvent(name, params = {}) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', name, params);
    }

    if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: name, ...params });
    }
}

export function trackAffiliateClick({ hotel, provider }) {
    trackEvent('affiliate_click', {
        provider,
        hotel_id: hotel?.id,
        hotel_slug: hotel?.slug,
        hotel_name: hotel?.name,
        destination: hotel?.destination?.name,
        subscription_tier: hotel?.subscription_tier,
    });
}

export function trackHotelClaim({ hotel }) {
    trackEvent('hotel_claim_submitted', {
        hotel_id: hotel?.id,
        hotel_slug: hotel?.slug,
        hotel_name: hotel?.name,
    });
}

export function trackSignUp({ method = 'email', userType }) {
    trackEvent('sign_up', {
        method,
        user_type: userType,
    });
}

export function trackPurchase({ transactionId, plan, period, value, currency = 'GBP' }) {
    trackEvent('purchase', {
        transaction_id: transactionId,
        currency,
        value,
        items: [
            {
                item_id: `subscription_${plan}`,
                item_name: `${plan} subscription`,
                item_category: 'subscription',
                item_variant: period ? `${period} months` : undefined,
                price: value,
                quantity: 1,
            },
        ],
    });
}

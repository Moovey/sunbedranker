function trackEvent(name, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...params });
  }
}
function trackAffiliateClick({ hotel, provider }) {
  var _a;
  trackEvent("affiliate_click", {
    provider,
    hotel_id: hotel == null ? void 0 : hotel.id,
    hotel_slug: hotel == null ? void 0 : hotel.slug,
    hotel_name: hotel == null ? void 0 : hotel.name,
    destination: (_a = hotel == null ? void 0 : hotel.destination) == null ? void 0 : _a.name,
    subscription_tier: hotel == null ? void 0 : hotel.subscription_tier
  });
}
function trackHotelClaim({ hotel }) {
  trackEvent("hotel_claim_submitted", {
    hotel_id: hotel == null ? void 0 : hotel.id,
    hotel_slug: hotel == null ? void 0 : hotel.slug,
    hotel_name: hotel == null ? void 0 : hotel.name
  });
}
function trackSignUp({ method = "email", userType }) {
  trackEvent("sign_up", {
    method,
    user_type: userType
  });
}
function trackPurchase({ transactionId, plan, period, value, currency = "GBP" }) {
  trackEvent("purchase", {
    transaction_id: transactionId,
    currency,
    value,
    items: [
      {
        item_id: `subscription_${plan}`,
        item_name: `${plan} subscription`,
        item_category: "subscription",
        item_variant: period ? `${period} months` : void 0,
        price: value,
        quantity: 1
      }
    ]
  });
}
export {
  trackHotelClaim as a,
  trackPurchase as b,
  trackAffiliateClick as c,
  trackSignUp as t
};

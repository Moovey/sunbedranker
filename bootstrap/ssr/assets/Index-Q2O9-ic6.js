import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link, router, useForm, Head } from "@inertiajs/react";
import { useState } from "react";
import { A as AdminNav } from "./AdminNav-Dpi9gSoo.js";
import { S as StatCard, T as TabButton } from "./TabButton-kurVP5_k.js";
import { S as StarIcon, C as CrownIcon, D as DocumentIcon, U as UsersIcon, a as CurrencyIcon, M as Modal, b as ClockIcon, E as EyeIcon } from "./Modal--roSw4Ve.js";
import { E as EmptyState, S as StatusBadge, P as Pagination } from "./EmptyState-DFAGVrDk.js";
import { toast } from "react-toastify";
function TierBadge({ tier }) {
  const styles = {
    premium: "bg-purple-100 text-purple-700 border-purple-200",
    enhanced: "bg-orange-100 text-orange-700 border-orange-200",
    free: "bg-gray-100 text-gray-600 border-gray-200"
  };
  const icons = {
    premium: /* @__PURE__ */ jsx(CrownIcon, { className: "w-3 h-3" }),
    enhanced: /* @__PURE__ */ jsx(StarIcon, { className: "w-3 h-3" }),
    free: null
  };
  return /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[tier] || styles.free}`, children: [
    icons[tier],
    (tier == null ? void 0 : tier.charAt(0).toUpperCase()) + (tier == null ? void 0 : tier.slice(1)) || "Free"
  ] });
}
function formatNumber(num) {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return (num == null ? void 0 : num.toLocaleString()) || "0";
}
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function ClaimsTab({ claims }) {
  if (claims.data.length === 0) {
    return /* @__PURE__ */ jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsx(DocumentIcon, {}),
        title: "No claims found",
        description: "There are no hotel claims matching your filters."
      }
    );
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 border-b border-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Hotel" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Claimant" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Contact" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Submitted" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: claims.data.map((claim) => {
        var _a, _b, _c, _d, _e, _f, _g;
        return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition-colors", children: [
          /* @__PURE__ */ jsx("td", { className: "px-3 lg:px-6 py-3 lg:py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 lg:gap-3", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: ((_a = claim.hotel) == null ? void 0 : _a.main_image) || "/images/default-hotel.jpg",
                alt: (_b = claim.hotel) == null ? void 0 : _b.name,
                className: "w-8 h-8 lg:w-10 lg:h-10 rounded-lg object-cover flex-shrink-0"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 truncate max-w-[120px] lg:max-w-[180px]", children: (_c = claim.hotel) == null ? void 0 : _c.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 truncate", children: (_e = (_d = claim.hotel) == null ? void 0 : _d.destination) == null ? void 0 : _e.name })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("td", { className: "px-3 lg:px-6 py-3 lg:py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 truncate max-w-[120px]", children: (_f = claim.user) == null ? void 0 : _f.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 truncate max-w-[120px]", children: (_g = claim.user) == null ? void 0 : _g.email })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "px-3 lg:px-6 py-3 lg:py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-900 truncate max-w-[140px]", children: claim.official_email }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: claim.phone })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-3 lg:px-6 py-3 lg:py-4", children: /* @__PURE__ */ jsx(StatusBadge, { status: claim.status }) }),
          /* @__PURE__ */ jsx("td", { className: "px-3 lg:px-6 py-3 lg:py-4 text-sm text-gray-500", children: formatDate(claim.created_at) }),
          /* @__PURE__ */ jsx("td", { className: "px-3 lg:px-6 py-3 lg:py-4", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.claims.show", claim.id),
              className: "text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors",
              children: "Review"
            }
          ) })
        ] }, claim.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden divide-y divide-gray-100", children: claims.data.map((claim) => {
      var _a, _b, _c, _d, _e, _f, _g;
      return /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4 hover:bg-gray-50 transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: ((_a = claim.hotel) == null ? void 0 : _a.main_image) || "/images/default-hotel.jpg",
              alt: (_b = claim.hotel) == null ? void 0 : _b.name,
              className: "w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 truncate", children: (_c = claim.hotel) == null ? void 0 : _c.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: (_e = (_d = claim.hotel) == null ? void 0 : _d.destination) == null ? void 0 : _e.name })
            ] }),
            /* @__PURE__ */ jsx(StatusBadge, { status: claim.status })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm mb-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Claimant" }),
            /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 truncate", children: (_f = claim.user) == null ? void 0 : _f.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 truncate", children: (_g = claim.user) == null ? void 0 : _g.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Contact" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-900 truncate text-xs sm:text-sm", children: claim.official_email }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: claim.phone })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-gray-100", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
            "Submitted ",
            formatDate(claim.created_at)
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.claims.show", claim.id),
              className: "text-orange-600 hover:text-orange-700 font-medium text-xs sm:text-sm transition-colors",
              children: "Review Claim"
            }
          )
        ] })
      ] }, claim.id);
    }) }),
    /* @__PURE__ */ jsx(Pagination, { links: claims.links, from: claims.from, to: claims.to, total: claims.total })
  ] });
}
function HoteliersTab({ hoteliers, onManageSubscription, onGrantAccess }) {
  if (hoteliers.data.length === 0) {
    return /* @__PURE__ */ jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsx(UsersIcon, { className: "w-12 h-12" }),
        title: "No hoteliers found",
        description: "There are no hoteliers matching your filters."
      }
    );
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-100", children: hoteliers.data.map((hotelier) => /* @__PURE__ */ jsx(
      HotelierCard,
      {
        hotelier,
        onManageSubscription,
        onGrantAccess
      },
      hotelier.id
    )) }),
    /* @__PURE__ */ jsx(Pagination, { links: hoteliers.links, from: hoteliers.from, to: hoteliers.to, total: hoteliers.total })
  ] });
}
function HotelierCard({ hotelier, onManageSubscription, onGrantAccess }) {
  return /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4 md:p-5 lg:p-6 hover:bg-gray-50 transition-colors", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-start justify-between gap-3 sm:gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-base sm:text-lg flex-shrink-0", children: hotelier.name.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1.5 sm:gap-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 text-sm sm:text-base truncate max-w-[180px] sm:max-w-none", children: hotelier.name }),
            /* @__PURE__ */ jsx(TierBadge, { tier: hotelier.subscription_tier })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500 truncate", children: hotelier.email }),
          /* @__PURE__ */ jsxs("p", { className: "text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1", children: [
            "Joined ",
            formatDate(hotelier.created_at)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-2 sm:gap-3 lg:gap-6 bg-gray-50 sm:bg-transparent rounded-lg p-2 sm:p-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm sm:text-base lg:text-lg font-bold text-gray-900", children: hotelier.hotels_count }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] sm:text-xs text-gray-500", children: "Hotels" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm sm:text-base lg:text-lg font-bold text-gray-900", children: formatNumber(hotelier.total_views) }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] sm:text-xs text-gray-500", children: "Views" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm sm:text-base lg:text-lg font-bold text-gray-900", children: formatNumber(hotelier.total_clicks) }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] sm:text-xs text-gray-500", children: "Clicks" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-sm sm:text-base lg:text-lg font-bold text-emerald-600", children: [
            "€",
            formatNumber(hotelier.total_revenue)
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] sm:text-xs text-gray-500", children: "Revenue" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5 sm:gap-2", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.hoteliers.performance", hotelier.id),
            className: "flex-1 sm:flex-none text-center px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap",
            children: "View Details"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onManageSubscription(hotelier),
            className: "flex-1 sm:flex-none px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors whitespace-nowrap",
            children: "Manage Plan"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onGrantAccess(hotelier),
            className: "flex-1 sm:flex-none px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors whitespace-nowrap",
            children: "Grant Access"
          }
        )
      ] })
    ] }),
    hotelier.hotels && hotelier.hotels.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs font-medium text-gray-500 mb-1.5 sm:mb-2", children: "MANAGED HOTELS" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5 sm:gap-2", children: [
        hotelier.hotels.map((hotel) => /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("admin.hotels.edit", hotel.id),
            className: "inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-200 transition-colors",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: hotel.main_image || "/images/default-hotel.jpg",
                  alt: hotel.name,
                  className: "w-4 h-4 sm:w-5 sm:h-5 rounded object-cover flex-shrink-0"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "truncate max-w-[100px] sm:max-w-none", children: hotel.name })
            ]
          },
          hotel.id
        )),
        hotelier.hotels_count > 3 && /* @__PURE__ */ jsxs("span", { className: "px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-500", children: [
          "+",
          hotelier.hotels_count - 3,
          " more"
        ] })
      ] })
    ] }),
    hotelier.active_subscription && /* @__PURE__ */ jsxs("div", { className: "mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-4 text-xs sm:text-sm", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
        /* @__PURE__ */ jsx("strong", { children: "Current Plan:" }),
        " ",
        hotelier.active_subscription.tier_name
      ] }),
      hotelier.active_subscription.ends_at && /* @__PURE__ */ jsxs("span", { className: `${new Date(hotelier.active_subscription.ends_at) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3) ? "text-red-600" : "text-gray-500"}`, children: [
        /* @__PURE__ */ jsx("strong", { children: "Expires:" }),
        " ",
        formatDate(hotelier.active_subscription.ends_at)
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
        /* @__PURE__ */ jsx("strong", { children: "Payment:" }),
        " ",
        hotelier.active_subscription.payment_method || "N/A"
      ] })
    ] })
  ] });
}
function SubscriptionsTab({ subscriptions }) {
  if (subscriptions.data.length === 0) {
    return /* @__PURE__ */ jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsx(CurrencyIcon, { className: "w-12 h-12" }),
        title: "No subscriptions found",
        description: "There are no subscriptions matching your filters."
      }
    );
  }
  const handleCancel = (subscription) => {
    if (confirm("Are you sure you want to cancel this subscription?")) {
      router.post(route("admin.subscriptions.cancel", subscription.id), {}, {
        preserveScroll: true,
        onSuccess: () => toast.success("Subscription cancelled")
      });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 border-b border-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "User" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Plan" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Amount" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Period" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Expires" }),
        /* @__PURE__ */ jsx("th", { className: "px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: subscriptions.data.map((subscription) => {
        var _a, _b;
        return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition-colors", children: [
          /* @__PURE__ */ jsxs("td", { className: "px-3 lg:px-6 py-3 lg:py-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 truncate max-w-[150px]", children: (_a = subscription.user) == null ? void 0 : _a.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 truncate max-w-[150px]", children: (_b = subscription.user) == null ? void 0 : _b.email })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-3 lg:px-6 py-3 lg:py-4", children: /* @__PURE__ */ jsx(TierBadge, { tier: subscription.tier }) }),
          /* @__PURE__ */ jsxs("td", { className: "px-3 lg:px-6 py-3 lg:py-4", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-gray-900", children: [
              "€",
              subscription.total_amount
            ] }),
            subscription.monthly_price > 0 && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
              "€",
              subscription.monthly_price,
              "/mo"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "px-3 lg:px-6 py-3 lg:py-4 text-sm text-gray-700", children: [
            subscription.period_months,
            " mo"
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-3 lg:px-6 py-3 lg:py-4", children: /* @__PURE__ */ jsx(StatusBadge, { status: subscription.status }) }),
          /* @__PURE__ */ jsx("td", { className: "px-3 lg:px-6 py-3 lg:py-4 text-sm text-gray-500", children: subscription.ends_at ? formatDate(subscription.ends_at) : "Never" }),
          /* @__PURE__ */ jsx("td", { className: "px-3 lg:px-6 py-3 lg:py-4", children: subscription.status === "active" && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleCancel(subscription),
              className: "text-red-600 hover:text-red-700 font-medium text-sm",
              children: "Cancel"
            }
          ) })
        ] }, subscription.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden divide-y divide-gray-100", children: subscriptions.data.map((subscription) => {
      var _a, _b;
      return /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4 hover:bg-gray-50 transition-colors", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 truncate", children: (_a = subscription.user) == null ? void 0 : _a.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 truncate", children: (_b = subscription.user) == null ? void 0 : _b.email })
          ] }),
          /* @__PURE__ */ jsx(StatusBadge, { status: subscription.status })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm mb-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Plan" }),
            /* @__PURE__ */ jsx(TierBadge, { tier: subscription.tier })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Amount" }),
            /* @__PURE__ */ jsxs("p", { className: "font-medium text-gray-900", children: [
              "€",
              subscription.total_amount
            ] }),
            subscription.monthly_price > 0 && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
              "€",
              subscription.monthly_price,
              "/mo"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Period" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
              subscription.period_months,
              " month",
              subscription.period_months !== 1 ? "s" : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Expires" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: subscription.ends_at ? formatDate(subscription.ends_at) : "Never" })
          ] })
        ] }),
        subscription.status === "active" && /* @__PURE__ */ jsx("div", { className: "pt-2 border-t border-gray-100", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleCancel(subscription),
            className: "text-red-600 hover:text-red-700 font-medium text-xs sm:text-sm",
            children: "Cancel Subscription"
          }
        ) })
      ] }, subscription.id);
    }) }),
    /* @__PURE__ */ jsx(Pagination, { links: subscriptions.links, from: subscriptions.from, to: subscriptions.to, total: subscriptions.total })
  ] });
}
function SubscriptionModal({ hotelier, onClose }) {
  const { data, setData, post, processing, errors } = useForm({
    tier: hotelier.subscription_tier || "enhanced",
    period_months: 12,
    reason: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.hoteliers.update-subscription", hotelier.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Subscription updated successfully");
        onClose();
      }
    });
  };
  return /* @__PURE__ */ jsx(Modal, { show: true, title: "Manage Subscription", onClose, children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4", children: [
        "Update subscription for ",
        /* @__PURE__ */ jsx("strong", { className: "break-words", children: hotelier.name })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Subscription Tier" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: data.tier,
            onChange: (e) => setData("tier", e.target.value),
            className: "w-full px-2.5 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
            children: [
              /* @__PURE__ */ jsx("option", { value: "free", children: "Free" }),
              /* @__PURE__ */ jsx("option", { value: "enhanced", children: "Enhanced" }),
              /* @__PURE__ */ jsx("option", { value: "premium", children: "Premium" })
            ]
          }
        ),
        errors.tier && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.tier })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Period (Months)" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: data.period_months,
            onChange: (e) => setData("period_months", parseInt(e.target.value)),
            className: "w-full px-2.5 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
            children: [
              /* @__PURE__ */ jsx("option", { value: 1, children: "1 Month" }),
              /* @__PURE__ */ jsx("option", { value: 3, children: "3 Months" }),
              /* @__PURE__ */ jsx("option", { value: 6, children: "6 Months" }),
              /* @__PURE__ */ jsx("option", { value: 12, children: "12 Months" }),
              /* @__PURE__ */ jsx("option", { value: 24, children: "24 Months" })
            ]
          }
        ),
        errors.period_months && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.period_months })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Reason (optional)" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: data.reason,
            onChange: (e) => setData("reason", e.target.value),
            rows: 3,
            className: "w-full px-2.5 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
            placeholder: "Reason for this change..."
          }
        ),
        errors.reason && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.reason })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 sm:mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-xs sm:text-sm",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: "w-full sm:w-auto px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium text-xs sm:text-sm disabled:opacity-50",
          children: processing ? "Updating..." : "Update Subscription"
        }
      )
    ] })
  ] }) });
}
function TemporaryAccessModal({ hotelier, onClose }) {
  const { data, setData, post, processing, errors } = useForm({
    tier: "enhanced",
    days: 14,
    reason: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.hoteliers.temporary-access", hotelier.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Temporary access granted");
        onClose();
      }
    });
  };
  return /* @__PURE__ */ jsx(Modal, { show: true, title: "Grant Temporary Access", onClose, children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4", children: [
        "Grant temporary access to ",
        /* @__PURE__ */ jsx("strong", { className: "break-words", children: hotelier.name })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Access Tier" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: data.tier,
            onChange: (e) => setData("tier", e.target.value),
            className: "w-full px-2.5 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
            children: [
              /* @__PURE__ */ jsx("option", { value: "enhanced", children: "Enhanced" }),
              /* @__PURE__ */ jsx("option", { value: "premium", children: "Premium" })
            ]
          }
        ),
        errors.tier && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.tier })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Duration (Days)" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: data.days,
            onChange: (e) => setData("days", parseInt(e.target.value)),
            className: "w-full px-2.5 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
            children: [
              /* @__PURE__ */ jsx("option", { value: 7, children: "7 Days" }),
              /* @__PURE__ */ jsx("option", { value: 14, children: "14 Days" }),
              /* @__PURE__ */ jsx("option", { value: 30, children: "30 Days" }),
              /* @__PURE__ */ jsx("option", { value: 60, children: "60 Days" }),
              /* @__PURE__ */ jsx("option", { value: 90, children: "90 Days" })
            ]
          }
        ),
        errors.days && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.days })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Reason (optional)" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: data.reason,
            onChange: (e) => setData("reason", e.target.value),
            rows: 3,
            className: "w-full px-2.5 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
            placeholder: "Reason for granting access..."
          }
        ),
        errors.reason && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.reason })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 sm:mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-xs sm:text-sm",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: "w-full sm:w-auto px-3 sm:px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium text-xs sm:text-sm disabled:opacity-50",
          children: processing ? "Granting..." : "Grant Access"
        }
      )
    ] })
  ] }) });
}
function ClaimsIndex({ claims, hoteliers, subscriptions, filters, stats }) {
  const [activeTab, setActiveTab] = useState(filters.tab || "claims");
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [selectedHotelier, setSelectedHotelier] = useState(null);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.get(route("admin.claims.index"), {
      tab,
      status: filters.status,
      search: searchTerm,
      tier: filters.tier
    }, { preserveState: true });
  };
  const handleFilter = (key, value) => {
    router.get(route("admin.claims.index"), {
      tab: activeTab,
      status: key === "status" ? value : filters.status,
      search: key === "search" ? value : searchTerm,
      tier: key === "tier" ? value : filters.tier
    }, { preserveState: true });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    handleFilter("search", searchTerm);
  };
  const clearFilters = () => {
    setSearchTerm("");
    router.get(route("admin.claims.index"), { tab: activeTab }, { preserveState: true });
  };
  const openSubscriptionModal = (hotelier) => {
    setSelectedHotelier(hotelier);
    setShowSubscriptionModal(true);
  };
  const openAccessModal = (hotelier) => {
    setSelectedHotelier(hotelier);
    setShowAccessModal(true);
  };
  const closeModals = () => {
    setShowSubscriptionModal(false);
    setShowAccessModal(false);
    setSelectedHotelier(null);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Hoteliers & Subscriptions" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, { stats: { pending_claims: stats.pending_claims } }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsx(PageHeader, {}),
        /* @__PURE__ */ jsx(StatsGrid, { stats }),
        /* @__PURE__ */ jsx(
          TabsNavigation,
          {
            activeTab,
            onTabChange: handleTabChange,
            pendingCount: stats.pending_claims
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-b-xl shadow-sm border border-gray-100 border-t-0", children: [
          /* @__PURE__ */ jsx(
            FilterBar,
            {
              searchTerm,
              setSearchTerm,
              onSearch: handleSearch,
              onFilter: handleFilter,
              onClear: clearFilters,
              activeTab,
              filters
            }
          ),
          activeTab === "claims" && /* @__PURE__ */ jsx(ClaimsTab, { claims }),
          activeTab === "hoteliers" && /* @__PURE__ */ jsx(
            HoteliersTab,
            {
              hoteliers,
              onManageSubscription: openSubscriptionModal,
              onGrantAccess: openAccessModal
            }
          ),
          activeTab === "subscriptions" && /* @__PURE__ */ jsx(SubscriptionsTab, { subscriptions })
        ] })
      ] })
    ] }),
    showSubscriptionModal && selectedHotelier && /* @__PURE__ */ jsx(
      SubscriptionModal,
      {
        hotelier: selectedHotelier,
        onClose: closeModals
      }
    ),
    showAccessModal && selectedHotelier && /* @__PURE__ */ jsx(
      TemporaryAccessModal,
      {
        hotelier: selectedHotelier,
        onClose: closeModals
      }
    )
  ] });
}
function PageHeader() {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: "Hoteliers & Subscriptions" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm mt-1", children: "Manage hotel claims, hotelier accounts, and subscriptions" })
  ] }) });
}
function StatsGrid({ stats }) {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6", children: [
    /* @__PURE__ */ jsx(
      StatCard,
      {
        label: "Pending Claims",
        value: stats.pending_claims,
        icon: /* @__PURE__ */ jsx(ClockIcon, {}),
        color: "yellow"
      }
    ),
    /* @__PURE__ */ jsx(
      StatCard,
      {
        label: "Total Hoteliers",
        value: stats.total_hoteliers,
        icon: /* @__PURE__ */ jsx(UsersIcon, {}),
        color: "blue"
      }
    ),
    /* @__PURE__ */ jsx(
      StatCard,
      {
        label: "Premium",
        value: stats.premium_tier,
        icon: /* @__PURE__ */ jsx(CrownIcon, {}),
        color: "purple"
      }
    ),
    /* @__PURE__ */ jsx(
      StatCard,
      {
        label: "Enhanced",
        value: stats.enhanced_tier,
        icon: /* @__PURE__ */ jsx(StarIcon, {}),
        color: "orange"
      }
    ),
    /* @__PURE__ */ jsx(
      StatCard,
      {
        label: "Total Views",
        value: formatNumber(stats.total_hotel_views),
        icon: /* @__PURE__ */ jsx(EyeIcon, {}),
        color: "green"
      }
    ),
    /* @__PURE__ */ jsx(
      StatCard,
      {
        label: "Revenue",
        value: `€${formatNumber(stats.total_revenue)}`,
        icon: /* @__PURE__ */ jsx(CurrencyIcon, {}),
        color: "emerald"
      }
    )
  ] });
}
function TabsNavigation({ activeTab, onTabChange, pendingCount }) {
  return /* @__PURE__ */ jsx("div", { className: "bg-gray-50 rounded-t-xl border border-gray-100 border-b-0 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-0.5 sm:gap-1 px-2 sm:px-3 md:px-4 pt-3 sm:pt-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300", children: [
    /* @__PURE__ */ jsx(
      TabButton,
      {
        active: activeTab === "claims",
        onClick: () => onTabChange("claims"),
        badge: pendingCount,
        children: /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm", children: "Hotel Claims" })
      }
    ),
    /* @__PURE__ */ jsx(
      TabButton,
      {
        active: activeTab === "hoteliers",
        onClick: () => onTabChange("hoteliers"),
        children: /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm", children: "Hoteliers" })
      }
    ),
    /* @__PURE__ */ jsx(
      TabButton,
      {
        active: activeTab === "subscriptions",
        onClick: () => onTabChange("subscriptions"),
        children: /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm", children: "Subscriptions" })
      }
    )
  ] }) });
}
function FilterBar({ searchTerm, setSearchTerm, onSearch, onFilter, onClear, activeTab, filters }) {
  return /* @__PURE__ */ jsx("div", { className: "p-3 sm:p-4 border-b border-gray-100", children: /* @__PURE__ */ jsxs("form", { onSubmit: onSearch, className: "flex flex-col sm:flex-row gap-2 sm:gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: searchTerm,
        onChange: (e) => setSearchTerm(e.target.value),
        placeholder: "Search by name, email, or hotel...",
        className: "w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm"
      }
    ) }),
    activeTab === "claims" && /* @__PURE__ */ jsxs(
      "select",
      {
        value: filters.status,
        onChange: (e) => onFilter("status", e.target.value),
        className: "px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm",
        children: [
          /* @__PURE__ */ jsx("option", { value: "pending", children: "Pending" }),
          /* @__PURE__ */ jsx("option", { value: "approved", children: "Approved" }),
          /* @__PURE__ */ jsx("option", { value: "rejected", children: "Rejected" }),
          /* @__PURE__ */ jsx("option", { value: "all", children: "All Status" })
        ]
      }
    ),
    (activeTab === "hoteliers" || activeTab === "subscriptions") && /* @__PURE__ */ jsxs(
      "select",
      {
        value: filters.tier,
        onChange: (e) => onFilter("tier", e.target.value),
        className: "px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm",
        children: [
          /* @__PURE__ */ jsx("option", { value: "all", children: "All Tiers" }),
          /* @__PURE__ */ jsx("option", { value: "free", children: "Free" }),
          /* @__PURE__ */ jsx("option", { value: "enhanced", children: "Enhanced" }),
          /* @__PURE__ */ jsx("option", { value: "premium", children: "Premium" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm font-medium",
          children: "Search"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onClear,
          className: "flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm",
          children: "Clear"
        }
      )
    ] })
  ] }) });
}
export {
  ClaimsIndex as default
};

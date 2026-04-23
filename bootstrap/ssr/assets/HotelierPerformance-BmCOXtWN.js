import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as AdminNav } from "./AdminNav-Dpi9gSoo.js";
import "react";
function HotelierPerformance({ hotelier, hotels, performance, dailyStats, claims }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `${hotelier.name} - Performance` }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.claims.index"), className: "hover:text-gray-700", children: "Hoteliers" }),
          /* @__PURE__ */ jsx("span", { children: "/" }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-900 truncate max-w-[150px] sm:max-w-none", children: hotelier.name })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-4 sm:mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 sm:gap-4 w-full sm:w-auto", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl flex-shrink-0", children: hotelier.name.charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 sm:gap-3", children: [
                /* @__PURE__ */ jsx("h1", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate", children: hotelier.name }),
                /* @__PURE__ */ jsx(TierBadge, { tier: hotelier.subscription_tier })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm sm:text-base truncate", children: hotelier.email }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1", children: [
                "Member since ",
                formatDate(hotelier.created_at)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2 w-full sm:w-auto", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: `mailto:${hotelier.email}`,
              className: "flex-1 sm:flex-none text-center px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors",
              children: "Contact"
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Profile Views",
              value: formatNumber(performance.total_views),
              icon: /* @__PURE__ */ jsx(EyeIcon, {}),
              color: "blue"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Link Clicks",
              value: formatNumber(performance.total_clicks),
              icon: /* @__PURE__ */ jsx(ClickIcon, {}),
              color: "green"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Affiliate Clicks",
              value: formatNumber(performance.total_affiliate_clicks),
              icon: /* @__PURE__ */ jsx(LinkIcon, {}),
              color: "purple"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Revenue",
              value: `€${formatNumber(performance.total_revenue)}`,
              icon: /* @__PURE__ */ jsx(CurrencyIcon, {}),
              color: "emerald"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Avg Score",
              value: performance.average_score ? Number(performance.average_score).toFixed(1) : "N/A",
              icon: /* @__PURE__ */ jsx(StarIcon, {}),
              color: "orange"
            }
          )
        ] }),
        hotelier.active_subscription && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4", children: "Current Subscription" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: "Plan" }),
              /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg font-semibold text-gray-900 capitalize", children: hotelier.active_subscription.tier })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: "Period" }),
              /* @__PURE__ */ jsxs("p", { className: "text-base sm:text-lg font-semibold text-gray-900", children: [
                hotelier.active_subscription.period_months,
                " months"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: "Amount Paid" }),
              /* @__PURE__ */ jsxs("p", { className: "text-base sm:text-lg font-semibold text-gray-900", children: [
                "€",
                hotelier.active_subscription.total_amount
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: "Expires" }),
              /* @__PURE__ */ jsx("p", { className: `text-base sm:text-lg font-semibold ${new Date(hotelier.active_subscription.ends_at) < new Date(Date.now() + 14 * 24 * 60 * 60 * 1e3) ? "text-red-600" : "text-gray-900"}`, children: formatDate(hotelier.active_subscription.ends_at) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4", children: [
            "Managed Hotels (",
            hotels.length,
            ")"
          ] }),
          hotels.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center py-6 sm:py-8 text-sm", children: "No hotels managed yet" }) : /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:gap-4", children: hotels.map((hotel) => {
            var _a;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors gap-3 sm:gap-4",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 sm:gap-4", children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: hotel.main_image || "/images/default-hotel.jpg",
                        alt: hotel.name,
                        className: "w-14 h-10 sm:w-16 sm:h-12 rounded-lg object-cover flex-shrink-0"
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 text-sm sm:text-base truncate", children: hotel.name }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500 truncate", children: (_a = hotel.destination) == null ? void 0 : _a.name })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between sm:justify-end gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-500", children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: formatNumber(hotel.view_count) }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs", children: "Views" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900", children: formatNumber(hotel.click_count) }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs", children: "Clicks" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsx("p", { className: "font-semibold text-orange-600", children: hotel.overall_score ? Number(hotel.overall_score).toFixed(1) : "N/A" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs", children: "Score" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route("admin.hotels.edit", hotel.id),
                        className: "px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors whitespace-nowrap",
                        children: "Edit"
                      }
                    )
                  ] })
                ]
              },
              hotel.id
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4", children: [
            "Claims History (",
            claims.length,
            ")"
          ] }),
          claims.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center py-6 sm:py-8 text-sm", children: "No claims submitted" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "hidden sm:block overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 border-b border-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Hotel" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Status" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Submitted" }),
                /* @__PURE__ */ jsx("th", { className: "px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Actions" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: claims.map((claim) => {
                var _a;
                return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
                  /* @__PURE__ */ jsx("td", { className: "px-3 sm:px-4 py-2 sm:py-3", children: /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm font-medium text-gray-900", children: (_a = claim.hotel) == null ? void 0 : _a.name }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 sm:px-4 py-2 sm:py-3", children: /* @__PURE__ */ jsx(StatusBadge, { status: claim.status }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-500", children: formatDate(claim.created_at) }),
                  /* @__PURE__ */ jsx("td", { className: "px-3 sm:px-4 py-2 sm:py-3", children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("admin.claims.show", claim.id),
                      className: "text-orange-600 hover:text-orange-700 text-xs sm:text-sm font-medium",
                      children: "View"
                    }
                  ) })
                ] }, claim.id);
              }) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "sm:hidden space-y-3", children: claims.map((claim) => {
              var _a;
              return /* @__PURE__ */ jsxs("div", { className: "border border-gray-100 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 truncate flex-1 mr-2", children: (_a = claim.hotel) == null ? void 0 : _a.name }),
                  /* @__PURE__ */ jsx(StatusBadge, { status: claim.status })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500", children: [
                  /* @__PURE__ */ jsx("span", { children: formatDate(claim.created_at) }),
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("admin.claims.show", claim.id),
                      className: "text-orange-600 hover:text-orange-700 font-medium",
                      children: "View"
                    }
                  )
                ] })
              ] }, claim.id);
            }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function StatCard({ label, value, icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    emerald: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600"
  };
  return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: `p-1.5 sm:p-2 rounded-lg ${colors[color]} [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5`, children: icon }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: "text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate", children: value }),
      /* @__PURE__ */ jsx("div", { className: "text-[10px] sm:text-xs text-gray-500 truncate", children: label })
    ] })
  ] }) });
}
function TierBadge({ tier }) {
  const styles = {
    premium: "bg-purple-100 text-purple-700",
    enhanced: "bg-orange-100 text-orange-700",
    free: "bg-gray-100 text-gray-600"
  };
  return /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${styles[tier] || styles.free}`, children: (tier == null ? void 0 : tier.charAt(0).toUpperCase()) + (tier == null ? void 0 : tier.slice(1)) || "Free" });
}
function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700"
  };
  return /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`, children: status.charAt(0).toUpperCase() + status.slice(1) });
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
function EyeIcon() {
  return /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: [
    /* @__PURE__ */ jsx("path", { d: "M10 12a2 2 0 100-4 2 2 0 000 4z" }),
    /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z", clipRule: "evenodd" })
  ] });
}
function ClickIcon() {
  return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.414 1.415l.708-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z", clipRule: "evenodd" }) });
}
function LinkIcon() {
  return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z", clipRule: "evenodd" }) });
}
function CurrencyIcon() {
  return /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: [
    /* @__PURE__ */ jsx("path", { d: "M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" }),
    /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z", clipRule: "evenodd" })
  ] });
}
function StarIcon() {
  return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) });
}
export {
  HotelierPerformance as default
};

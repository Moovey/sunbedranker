import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { H as HotelierNav } from "./HotelierNav-DOR3UniZ.js";
import "react";
function BillingHistory({ subscriptions, activeSubscription }) {
  const getStatusBadge = (status, isActive) => {
    if (isActive) {
      return /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: "Active" });
    }
    const statusStyles = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-gray-100 text-gray-600",
      expired: "bg-red-100 text-red-800"
    };
    return /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-600"}`, children: status.charAt(0).toUpperCase() + status.slice(1) });
  };
  const getTierBadge = (tier) => {
    const tierStyles = {
      enhanced: "bg-orange-100 text-orange-800 border-orange-200",
      premium: "bg-blue-100 text-blue-800 border-blue-200",
      free: "bg-gray-100 text-gray-600 border-gray-200"
    };
    const tierIcons = {
      enhanced: "⭐",
      premium: "👑",
      free: "🆓"
    };
    return /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${tierStyles[tier] || "bg-gray-100 text-gray-600"}`, children: [
      /* @__PURE__ */ jsx("span", { children: tierIcons[tier] }),
      tier.charAt(0).toUpperCase() + tier.slice(1)
    ] });
  };
  const formatPaymentMethod = (method) => {
    const methods = {
      card: "💳 Card",
      google_pay: "🔵 Google Pay",
      apple_pay: "🍎 Apple Pay",
      klarna: "🟣 Klarna",
      link: "🔗 Link"
    };
    return methods[method] || method;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Billing History" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(HotelierNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("hotelier.subscription"),
                className: "text-gray-500 hover:text-gray-700 transition-colors",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" }) })
              }
            ),
            /* @__PURE__ */ jsx("h1", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900", children: "Billing History" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm sm:text-base", children: "View your subscription payment history and invoices." })
        ] }),
        activeSubscription && /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 mb-6 text-white", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-sm", children: "Current Plan" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xl sm:text-2xl font-bold", children: activeSubscription.tier_name }),
              activeSubscription.tier === "premium" && /* @__PURE__ */ jsx("span", { children: "👑" }),
              activeSubscription.tier === "enhanced" && /* @__PURE__ */ jsx("span", { children: "⭐" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-left sm:text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-blue-100 text-sm", children: "Valid Until" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: activeSubscription.ends_at }),
            /* @__PURE__ */ jsxs("p", { className: "text-blue-200 text-sm", children: [
              activeSubscription.remaining_days,
              " days remaining"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "px-4 sm:px-6 py-4 border-b border-gray-100", children: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-gray-900", children: "Payment History" }) }),
          subscriptions.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "px-4 sm:px-6 py-12 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-gray-400", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-1", children: "No billing history" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-4", children: "You haven't made any subscription purchases yet." }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("hotelier.subscription"),
                className: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium",
                children: "View Plans"
              }
            )
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Plan" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Period" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Amount" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Payment" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-100", children: subscriptions.map((subscription) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: subscription.created_at }),
                  subscription.transaction_id && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 font-mono", children: [
                    "#",
                    subscription.transaction_id.slice(-8)
                  ] })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: getTierBadge(subscription.tier) }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-900", children: [
                    subscription.total_months,
                    " months"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
                    subscription.starts_at,
                    " - ",
                    subscription.ends_at
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium text-gray-900", children: [
                    "£",
                    parseFloat(subscription.total_amount).toFixed(2)
                  ] }),
                  subscription.savings > 0 && /* @__PURE__ */ jsxs("div", { className: "text-xs text-green-600", children: [
                    "Saved £",
                    parseFloat(subscription.savings).toFixed(2)
                  ] })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-600", children: formatPaymentMethod(subscription.payment_method) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: getStatusBadge(subscription.status, subscription.is_active) })
              ] }, subscription.id)) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "md:hidden divide-y divide-gray-100", children: subscriptions.map((subscription) => /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  getTierBadge(subscription.tier),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: subscription.created_at })
                ] }),
                getStatusBadge(subscription.status, subscription.is_active)
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs", children: "Period" }),
                  /* @__PURE__ */ jsxs("p", { className: "font-medium", children: [
                    subscription.total_months,
                    " months"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs", children: "Amount" }),
                  /* @__PURE__ */ jsxs("p", { className: "font-medium", children: [
                    "£",
                    parseFloat(subscription.total_amount).toFixed(2)
                  ] }),
                  subscription.savings > 0 && /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-600", children: [
                    "Saved £",
                    parseFloat(subscription.savings).toFixed(2)
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs", children: "Valid" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs", children: [
                    subscription.starts_at,
                    " - ",
                    subscription.ends_at
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs", children: "Payment" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs", children: formatPaymentMethod(subscription.payment_method) })
                ] })
              ] }),
              subscription.transaction_id && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-2 font-mono", children: [
                "Transaction: ",
                subscription.transaction_id.slice(-12)
              ] })
            ] }, subscription.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Need Help?" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-blue-600", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: "Billing Questions" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
                  "Contact us at ",
                  /* @__PURE__ */ jsx("a", { href: "mailto:billing@sunbedranker.com", className: "text-blue-600 hover:underline", children: "billing@sunbedranker.com" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-green-600", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900", children: "Invoice Requests" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Need an invoice? Request one via email." })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  BillingHistory as default
};

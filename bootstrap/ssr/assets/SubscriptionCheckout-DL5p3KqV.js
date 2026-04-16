import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { H as HotelierNav } from "./HotelierNav-DOR3UniZ.js";
function SubscriptionCheckout({ plan, redirectTo }) {
  const [showCouponInput, setShowCouponInput] = useState(false);
  const { data, setData, post, processing } = useForm({
    period: "1",
    coupon_code: ""
  });
  const pricing = {
    enhanced: {
      name: "Enhanced",
      icon: "⭐",
      tagline: "Verified & Conversion-Focused",
      monthlyPrice: 49,
      periods: {
        "1": { months: 1, discount: 0, label: "1 month" },
        "12": { months: 12, discount: 15, label: "12 months", badge: "Save 15%" },
        "24": { months: 24, discount: 25, label: "24 months", badge: "Save 25%" },
        "48": { months: 48, discount: 35, label: "48 months", badge: "Best Value", freeMonths: 3 }
      }
    },
    premium: {
      name: "Premium",
      icon: "👑",
      tagline: "Maximum Visibility & Leads",
      monthlyPrice: 149,
      periods: {
        "1": { months: 1, discount: 0, label: "1 month" },
        "12": { months: 12, discount: 15, label: "12 months", badge: "Save 15%" },
        "24": { months: 24, discount: 25, label: "24 months", badge: "Save 25%" },
        "48": { months: 48, discount: 35, label: "48 months", badge: "Best Value", freeMonths: 3 }
      }
    }
  };
  const currentPlan = pricing[plan];
  const currentPeriod = currentPlan.periods[data.period];
  const originalMonthlyPrice = currentPlan.monthlyPrice;
  const discountedMonthlyPrice = originalMonthlyPrice * (1 - currentPeriod.discount / 100);
  const totalMonths = currentPeriod.months + (currentPeriod.freeMonths || 0);
  const originalTotal = originalMonthlyPrice * currentPeriod.months;
  const discountedTotal = discountedMonthlyPrice * currentPeriod.months;
  const savings = originalTotal - discountedTotal;
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("hotelier.subscribe.process", { plan }));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Subscribe to ${currentPlan.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(HotelierNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("hotelier.subscription"),
                className: "text-gray-500 hover:text-gray-700 transition-colors",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" }) })
              }
            ),
            /* @__PURE__ */ jsxs("h1", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900", children: [
              "Subscribe to ",
              currentPlan.name
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-xs sm:text-sm ml-6 sm:ml-8", children: [
            "Complete your subscription to unlock all ",
            currentPlan.name,
            " features"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6", children: [
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-5 border-b border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xl sm:text-2xl", children: currentPlan.icon }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900", children: currentPlan.name }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm", children: currentPlan.tagline })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-5", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2", children: "Billing Period" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "select",
                  {
                    value: data.period,
                    onChange: (e) => setData("period", e.target.value),
                    className: "w-full sm:w-64 px-2.5 sm:px-3 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm font-medium text-gray-900 appearance-none bg-white cursor-pointer",
                    children: Object.entries(currentPlan.periods).map(([key, period]) => /* @__PURE__ */ jsxs("option", { value: key, children: [
                      period.label,
                      " ",
                      period.badge ? `(${period.badge})` : ""
                    ] }, key))
                  }
                ),
                /* @__PURE__ */ jsx("svg", { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none sm:right-[calc(100%-15rem+0.75rem)]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 sm:mt-4 flex items-baseline gap-2", children: [
                currentPeriod.discount > 0 && /* @__PURE__ */ jsxs("span", { className: "text-base sm:text-lg text-gray-400 line-through", children: [
                  "£",
                  originalMonthlyPrice
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-2xl sm:text-3xl font-bold text-gray-900", children: [
                  "£",
                  discountedMonthlyPrice.toFixed(0)
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-xs sm:text-sm", children: "/mo" })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[10px] sm:text-xs text-gray-500 mt-1.5 sm:mt-2", children: [
                "Renews at £",
                discountedMonthlyPrice.toFixed(0),
                "/mo. Cancel anytime."
              ] })
            ] }),
            data.period === "48" && /* @__PURE__ */ jsxs("div", { className: "mx-3 sm:mx-5 mb-4 sm:mb-5 bg-green-50 border border-green-100 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm font-bold text-green-600", children: "%" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: "Best Value Deal" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500", children: "48-month plan + 3 months FREE" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-left sm:text-right ml-9 sm:ml-0", children: /* @__PURE__ */ jsxs("p", { className: "text-base sm:text-lg font-bold text-green-600", children: [
                "Save £",
                savings.toFixed(0)
              ] }) })
            ] }),
            data.period !== "48" && currentPeriod.discount > 0 && /* @__PURE__ */ jsxs("div", { className: "mx-3 sm:mx-5 mb-4 sm:mb-5 bg-orange-50 border border-orange-100 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm font-bold text-orange-600", children: "%" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: currentPeriod.badge }),
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] sm:text-xs text-gray-500", children: [
                    "On ",
                    currentPeriod.label,
                    " plan"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-left sm:text-right ml-9 sm:ml-0", children: /* @__PURE__ */ jsxs("p", { className: "text-base sm:text-lg font-bold text-orange-600", children: [
                "Save £",
                savings.toFixed(0)
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mx-3 sm:mx-5 mb-4 sm:mb-5 bg-blue-50 border border-blue-100 rounded-lg p-2.5 sm:p-3", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-[10px] sm:text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "💡 Tip:" }),
              " Choose a longer plan to maximize your savings and secure your hotel's visibility."
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-4 sm:top-8", children: [
            /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-5 border-b border-gray-100", children: /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900", children: "Order summary" }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-5 space-y-3 sm:space-y-4", children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 text-sm sm:text-base", children: currentPlan.name }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 sm:space-y-2 text-xs sm:text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                    currentPeriod.label,
                    " plan"
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "font-medium text-gray-900", children: [
                    "£",
                    originalTotal.toFixed(0)
                  ] })
                ] }),
                currentPeriod.discount > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-green-600", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Discount (",
                    currentPeriod.discount,
                    "% off)"
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                    "-£",
                    savings.toFixed(0)
                  ] })
                ] }),
                currentPeriod.freeMonths && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-green-600", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "+ ",
                    currentPeriod.freeMonths,
                    " months FREE"
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "£0.00" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 pt-2.5 sm:pt-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs sm:text-sm text-gray-500", children: [
                  /* @__PURE__ */ jsx("span", { children: "Taxes" }),
                  /* @__PURE__ */ jsx("span", { children: "-" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-400 mt-1", children: "Calculated after you provide your billing address" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 pt-2.5 sm:pt-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-baseline", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900 text-sm sm:text-base", children: "Subtotal" }),
                  /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                    currentPeriod.discount > 0 && /* @__PURE__ */ jsxs("span", { className: "text-xs sm:text-sm text-gray-400 line-through mr-2", children: [
                      "£",
                      originalTotal.toFixed(0)
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "text-lg sm:text-xl font-bold text-gray-900", children: [
                      "£",
                      discountedTotal.toFixed(0)
                    ] })
                  ] })
                ] }),
                currentPeriod.freeMonths && /* @__PURE__ */ jsxs("p", { className: "text-[10px] sm:text-xs text-green-600 mt-1", children: [
                  "Total coverage: ",
                  totalMonths,
                  " months"
                ] })
              ] }),
              showCouponInput ? /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.coupon_code,
                    onChange: (e) => setData("coupon_code", e.target.value),
                    placeholder: "Enter coupon code",
                    className: "flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:ring-orange-500 focus:border-orange-500"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setShowCouponInput(false);
                      setData("coupon_code", "");
                    },
                    className: "text-gray-400 hover:text-gray-600 px-2",
                    children: "✕"
                  }
                )
              ] }) : /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowCouponInput(true),
                  className: "text-orange-600 hover:text-orange-700 text-xs sm:text-sm font-medium",
                  children: "Have a coupon code?"
                }
              ),
              /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "w-full py-2 sm:py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors disabled:opacity-50",
                  children: processing ? "Processing..." : "Continue"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "pt-2 sm:pt-3 flex items-center justify-center gap-3 sm:gap-4 text-gray-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-[10px] sm:text-xs", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 sm:w-3.5 sm:h-3.5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }),
                  "Secure"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-[10px] sm:text-xs", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 sm:w-3.5 sm:h-3.5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z", clipRule: "evenodd" }) }),
                  "Money-back guarantee"
                ] })
              ] })
            ] })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  SubscriptionCheckout as default
};

import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { usePage, Head, Link } from "@inertiajs/react";
import { H as HotelierNav } from "./HotelierNav-DOR3UniZ.js";
import "react";
function HotelierDashboard({ hotels, pendingClaim, recentReviews, stats, subscription }) {
  var _a, _b;
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Hotelier Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(HotelierNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900", children: "Hotelier Dashboard" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1", children: [
              "Welcome back, ",
              auth.user.name
            ] })
          ] }),
          subscription && /* @__PURE__ */ jsxs("span", { className: `self-start sm:self-auto px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full ${subscription.tier === "premium" ? "bg-purple-100 text-purple-700" : subscription.tier === "enhanced" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`, children: [
            ((_a = subscription.tier) == null ? void 0 : _a.charAt(0).toUpperCase()) + ((_b = subscription.tier) == null ? void 0 : _b.slice(1)),
            " Plan"
          ] })
        ] }),
        (subscription == null ? void 0 : subscription.tier) === "free" && /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-6 bg-orange-50 border border-orange-200 rounded-lg sm:rounded-xl p-3 sm:p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 hidden sm:block", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" }) }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1", children: "Upgrade Your Subscription" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-gray-600 mb-2", children: [
              "Upgrade to ",
              /* @__PURE__ */ jsx("span", { className: "font-medium text-blue-600", children: "Enhanced" }),
              " or ",
              /* @__PURE__ */ jsx("span", { className: "font-medium text-purple-600", children: "Premium" }),
              " to claim and manage your hotel profiles."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
                "Claim Ownership"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
                "Edit Profiles"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
                "Upload Images"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/hotelier/upgrade",
              className: "w-full sm:w-auto flex-shrink-0 px-3 sm:px-4 py-2 bg-orange-500 text-white font-medium text-xs sm:text-sm rounded-lg hover:bg-orange-600 transition-colors text-center",
              children: "Upgrade Now"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsx(
            MiniStatCard,
            {
              icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" }) }),
              value: stats.total_hotels,
              label: "HOTELS",
              bgColor: "bg-orange-50"
            }
          ),
          /* @__PURE__ */ jsx(
            MiniStatCard,
            {
              icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-yellow-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" }) }),
              value: stats.average_score ? Number(stats.average_score).toFixed(1) : "N/A",
              label: "AVG SCORE",
              bgColor: "bg-yellow-50"
            }
          ),
          /* @__PURE__ */ jsx(
            MiniStatCard,
            {
              icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-cyan-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" }) }),
              value: stats.total_reviews,
              label: "REVIEWS",
              bgColor: "bg-cyan-50"
            }
          )
        ] }),
        pendingClaim && /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-6 bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl p-3 sm:p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 sm:gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-8 sm:h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z", clipRule: "evenodd" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs sm:text-sm font-semibold text-gray-900 mb-0.5 sm:mb-1", children: "Pending Claim" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-gray-600", children: [
              "Your claim for ",
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: pendingClaim.hotel.name }),
              " is currently under review."
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "xl:col-span-2 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-3 sm:mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 text-sm sm:text-base", children: "My Hotels" }),
              hotels && hotels.length > 0 && /* @__PURE__ */ jsxs("span", { className: "text-xs sm:text-sm text-gray-500", children: [
                hotels.length,
                " total"
              ] })
            ] }),
            hotels && hotels.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "hidden sm:block overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-[10px] sm:text-xs text-gray-500 border-b border-gray-100", children: [
                  /* @__PURE__ */ jsx("th", { className: "pb-2 sm:pb-3 font-medium", children: "Hotel Name" }),
                  /* @__PURE__ */ jsx("th", { className: "pb-2 sm:pb-3 font-medium", children: "Destination" }),
                  /* @__PURE__ */ jsx("th", { className: "pb-2 sm:pb-3 font-medium", children: "Score" }),
                  /* @__PURE__ */ jsx("th", { className: "pb-2 sm:pb-3 font-medium", children: "Reviews" }),
                  /* @__PURE__ */ jsx("th", { className: "pb-2 sm:pb-3 font-medium", children: "Actions" })
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { children: hotels.map((hotel) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-50 hover:bg-gray-50", children: [
                  /* @__PURE__ */ jsx("td", { className: "py-2 sm:py-3", children: /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm font-medium text-gray-900", children: hotel.name }) }),
                  /* @__PURE__ */ jsx("td", { className: "py-2 sm:py-3", children: /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm text-gray-500", children: hotel.destination }) }),
                  /* @__PURE__ */ jsx("td", { className: "py-2 sm:py-3", children: /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm font-medium text-gray-900", children: hotel.score ? Number(hotel.score).toFixed(1) : "N/A" }) }),
                  /* @__PURE__ */ jsx("td", { className: "py-2 sm:py-3", children: /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm text-gray-900", children: hotel.total_reviews }) }),
                  /* @__PURE__ */ jsx("td", { className: "py-2 sm:py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2", children: [
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route("hotels.show", hotel.slug),
                        className: "text-orange-600 hover:text-orange-700 text-xs sm:text-sm font-medium",
                        children: "View"
                      }
                    ),
                    ((subscription == null ? void 0 : subscription.tier) === "premium" || (subscription == null ? void 0 : subscription.tier) === "enhanced") && /* @__PURE__ */ jsxs(
                      Link,
                      {
                        href: route("hotelier.hotels.analytics", hotel.slug),
                        className: "inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-orange-500 text-white rounded text-[10px] sm:text-xs font-medium hover:bg-orange-600 transition-colors",
                        children: [
                          /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5 sm:w-3 sm:h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }),
                          /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Analytics" })
                        ]
                      }
                    )
                  ] }) })
                ] }, hotel.id)) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "sm:hidden space-y-2", children: hotels.map((hotel) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-3 border border-gray-100", children: [
                /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start mb-1.5", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-900 text-sm truncate", children: hotel.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500", children: hotel.destination })
                ] }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-[10px] mb-2", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gray-500 block", children: "Score" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: hotel.score ? Number(hotel.score).toFixed(1) : "N/A" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gray-500 block", children: "Reviews" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: hotel.total_reviews })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("hotels.show", hotel.slug),
                      className: "text-orange-600 hover:text-orange-700 text-[10px] font-medium",
                      children: "View"
                    }
                  ),
                  ((subscription == null ? void 0 : subscription.tier) === "premium" || (subscription == null ? void 0 : subscription.tier) === "enhanced") && /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: route("hotelier.hotels.analytics", hotel.slug),
                      className: "inline-flex items-center gap-1 px-1.5 py-0.5 bg-orange-500 text-white rounded text-[10px] font-medium hover:bg-orange-600 transition-colors",
                      children: [
                        /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }),
                        "Analytics"
                      ]
                    }
                  )
                ] })
              ] }, hotel.id)) })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-6 sm:py-8", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 sm:w-6 sm:h-6 text-gray-400", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" }) }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm", children: "You don't have any hotels yet." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base", children: "Recent Reviews" }),
            recentReviews && recentReviews.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3 sm:space-y-4 max-h-[300px] sm:max-h-[400px] overflow-y-auto", children: recentReviews.map((review) => /* @__PURE__ */ jsxs("div", { className: "pb-3 sm:pb-4 border-b border-gray-100 last:border-b-0 last:pb-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-1.5 sm:mb-2 gap-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm font-medium text-gray-900 truncate", children: review.hotel.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] sm:text-xs text-gray-500", children: [
                    "by ",
                    review.user.name
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-orange-500 flex items-center gap-0.5 flex-shrink-0", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: `w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < review.rating ? "fill-current" : "fill-gray-300"}`,
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
                  },
                  i
                )) })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-sm text-gray-600 line-clamp-2", children: review.comment })
            ] }, review.id)) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-4 sm:py-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1.5 sm:mb-2", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-gray-400", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" }) }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm", children: "No reviews yet." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base", children: "Quick Actions" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3", children: [
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("search"),
                className: "flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-orange-50 rounded-lg sm:rounded-xl hover:bg-orange-100 transition-colors group",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" }) }) }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-[10px] sm:text-sm text-center sm:text-left", children: "Browse Hotels" })
                ]
              }
            ),
            ((subscription == null ? void 0 : subscription.tier) === "premium" || (subscription == null ? void 0 : subscription.tier) === "enhanced") && /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("hotelier.claims.index"),
                className: "flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl hover:bg-green-100 transition-colors group",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4v16m8-8H4" }) }) }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-[10px] sm:text-sm text-center sm:text-left", children: "My Claims" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("hotelier.profile"),
                className: "flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl hover:bg-blue-100 transition-colors group",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" }) }) }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-[10px] sm:text-sm text-center sm:text-left", children: "My Profile" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("hotelier.upgrade"),
                className: "flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-purple-50 rounded-lg sm:rounded-xl hover:bg-purple-100 transition-colors group",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" }) }) }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-[10px] sm:text-sm text-center sm:text-left", children: "Upgrade Plan" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
function MiniStatCard({ icon, value, label, bgColor }) {
  return /* @__PURE__ */ jsxs("div", { className: `${bgColor} rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3`, children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: icon }),
    /* @__PURE__ */ jsxs("div", { className: "text-center sm:text-left", children: [
      /* @__PURE__ */ jsx("div", { className: "text-base sm:text-lg md:text-xl font-bold text-gray-900", children: value }),
      /* @__PURE__ */ jsx("div", { className: "text-[8px] sm:text-[10px] md:text-xs text-gray-500 font-medium", children: label })
    ] })
  ] });
}
export {
  HotelierDashboard as default
};

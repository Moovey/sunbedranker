import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { A as AdminNav } from "./AdminNav-Dpi9gSoo.js";
function formatNumber(num) {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  }
  return (num == null ? void 0 : num.toLocaleString()) || "0";
}
function AdminDashboard({ stats, recentHotels, pendingClaims, pendingReviews, topPerformingHotels, quickActions, monthlyPerformance }) {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const availableYears = Object.keys(monthlyPerformance || {}).map(Number).sort((a, b) => b - a);
  const yearData = (monthlyPerformance == null ? void 0 : monthlyPerformance[selectedYear]) || [];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Admin Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, { stats }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsx(Link, { href: "/admin/hotels", className: "block", children: /* @__PURE__ */ jsx(
            MiniStatCard,
            {
              icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-orange-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" }) }),
              value: stats.total_hotels,
              label: "HOTELS",
              bgColor: "bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer"
            }
          ) }),
          /* @__PURE__ */ jsx(Link, { href: "/admin/claims", className: "block", children: /* @__PURE__ */ jsx(
            MiniStatCard,
            {
              icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-green-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" }) }),
              value: stats.claimed_hotels || 0,
              label: "CLAIMED",
              bgColor: "bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
            }
          ) }),
          /* @__PURE__ */ jsx(Link, { href: "/admin/claims?tab=subscriptions", className: "block", children: /* @__PURE__ */ jsx(
            MiniStatCard,
            {
              icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-purple-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" }) }),
              value: stats.active_subscriptions || 0,
              label: "SUBSCRIPTIONS",
              bgColor: "bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
            }
          ) }),
          /* @__PURE__ */ jsx(Link, { href: "/admin/users", className: "block", children: /* @__PURE__ */ jsx(
            MiniStatCard,
            {
              icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-cyan-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" }) }),
              value: stats.total_users,
              label: "USERS",
              bgColor: "bg-cyan-50 hover:bg-cyan-100 transition-colors cursor-pointer"
            }
          ) }),
          /* @__PURE__ */ jsx(Link, { href: "/admin/claims?tab=hoteliers", className: "block", children: /* @__PURE__ */ jsx(
            MiniStatCard,
            {
              icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-orange-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" }) }),
              value: stats.hoteliers,
              label: "HOTELIERS",
              bgColor: "bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer"
            }
          ) }),
          /* @__PURE__ */ jsx(Link, { href: "/admin/content", className: "block", children: /* @__PURE__ */ jsx(
            MiniStatCard,
            {
              icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-pink-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" }) }),
              value: stats.total_posts || 0,
              label: "CONTENT",
              bgColor: "bg-pink-50 hover:bg-pink-100 transition-colors cursor-pointer"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 md:gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-sm border border-gray-100", children: [
              /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1", children: formatNumber(stats.total_clicks || 0) }),
              /* @__PURE__ */ jsx("div", { className: "text-orange-600 font-semibold text-xs sm:text-sm mb-2 sm:mb-3", children: "Total Clicks" }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-xs sm:text-sm", children: [
                formatNumber(stats.clicks_this_month || 0),
                " clicks this month"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-sm border border-gray-100", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1", children: [
                "€",
                formatNumber(stats.total_revenue || 0)
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-orange-600 font-semibold text-xs sm:text-sm mb-2 sm:mb-3", children: "Affiliate Revenue" }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs sm:text-sm mt-2 sm:mt-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-900", children: stats.premium_tier || 0 }),
                  /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-[10px] sm:text-xs", children: "Premium" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-900", children: stats.enhanced_tier || 0 }),
                  /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-[10px] sm:text-xs", children: "Enhanced" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-900", children: stats.free_tier || 0 }),
                  /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-[10px] sm:text-xs", children: "Free" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-sm border border-gray-100", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 text-sm sm:text-base", children: "Monthly Performance Report" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 text-xs sm:text-sm", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 sm:gap-1.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full" }),
                  "Clicks"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 sm:gap-1.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full" }),
                  "Views"
                ] }),
                /* @__PURE__ */ jsx(
                  "select",
                  {
                    value: selectedYear,
                    onChange: (e) => setSelectedYear(Number(e.target.value)),
                    className: "border border-gray-200 rounded-lg pl-2 sm:pl-3 pr-6 sm:pr-8 py-1 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M7%207l3%203%203-3%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.25rem_center]",
                    children: availableYears.map((year) => /* @__PURE__ */ jsx("option", { value: year, children: year }, year))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900", children: formatNumber(yearData.reduce((sum, m) => sum + (m.clicks || 0), 0)) }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-500 ml-1 sm:ml-2 text-xs sm:text-sm", children: "Clicks" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900", children: formatNumber(yearData.reduce((sum, m) => sum + (m.views || 0), 0)) }),
                /* @__PURE__ */ jsx("span", { className: "text-gray-500 ml-1 sm:ml-2 text-xs sm:text-sm", children: "Views" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-24 sm:h-28 md:h-32 flex items-end justify-between gap-0.5 sm:gap-1 md:gap-2 overflow-x-auto", children: (() => {
              const maxValue = Math.max(
                ...(yearData || []).map((m) => Math.max(m.clicks || 0, m.views || 0)),
                1
                // Prevent division by zero
              );
              return (yearData || []).map((data, i) => {
                const clicksHeight = maxValue > 0 ? (data.clicks || 0) / maxValue * 100 : 0;
                const viewsHeight = maxValue > 0 ? (data.views || 0) / maxValue * 100 : 0;
                return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-full h-24 flex items-end", children: /* @__PURE__ */ jsxs("div", { className: "w-full flex gap-0.5 justify-center items-end h-full", children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "w-1/2 bg-orange-500 rounded-t",
                        style: { height: `${Math.max(clicksHeight, data.clicks > 0 ? 8 : 0)}%` },
                        title: `Clicks: ${formatNumber(data.clicks || 0)}`
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "w-1/2 bg-green-500 rounded-t",
                        style: { height: `${Math.max(viewsHeight, data.views > 0 ? 8 : 0)}%` },
                        title: `Views: ${formatNumber(data.views || 0)}`
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-[8px] sm:text-[10px] md:text-xs text-gray-400 mt-1 truncate", children: data.month })
                ] }, i);
              });
            })() }),
            (!yearData || yearData.length === 0) && /* @__PURE__ */ jsx("div", { className: "text-center text-gray-400 text-sm mt-2", children: "No analytics data available yet" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base", children: "Subscription Distribution" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6", children: "Breakdown of hotel subscription tiers" }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4 sm:mb-6", children: /* @__PURE__ */ jsxs("div", { className: "relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40", children: [
              /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", className: "w-full h-full -rotate-90", children: [
                /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "40", fill: "none", stroke: "#E5E7EB", strokeWidth: "20" }),
                /* @__PURE__ */ jsx(
                  "circle",
                  {
                    cx: "50",
                    cy: "50",
                    r: "40",
                    fill: "none",
                    stroke: "#8B5CF6",
                    strokeWidth: "20",
                    strokeDasharray: `${(stats.premium_tier || 0) / (stats.total_hotels || 1) * 251.2} 251.2`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "circle",
                  {
                    cx: "50",
                    cy: "50",
                    r: "40",
                    fill: "none",
                    stroke: "#3B82F6",
                    strokeWidth: "20",
                    strokeDasharray: `${(stats.enhanced_tier || 0) / (stats.total_hotels || 1) * 251.2} 251.2`,
                    strokeDashoffset: `-${(stats.premium_tier || 0) / (stats.total_hotels || 1) * 251.2}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "circle",
                  {
                    cx: "50",
                    cy: "50",
                    r: "40",
                    fill: "none",
                    stroke: "#10B981",
                    strokeWidth: "20",
                    strokeDasharray: `${(stats.free_tier || 0) / (stats.total_hotels || 1) * 251.2} 251.2`,
                    strokeDashoffset: `-${((stats.premium_tier || 0) + (stats.enhanced_tier || 0)) / (stats.total_hotels || 1) * 251.2}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900", children: stats.total_hotels }) })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 sm:space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded-full" }),
                  "Premium"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm sm:text-base", children: stats.premium_tier || 0 })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full" }),
                  "Enhanced"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm sm:text-base", children: stats.enhanced_tier || 0 })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full" }),
                  "Free"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-sm sm:text-base", children: stats.free_tier || 0 })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-1 gap-2 sm:gap-3 md:gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border border-gray-100", children: [
              /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-xs sm:text-sm mb-1", children: "Page Views" }),
              /* @__PURE__ */ jsx("div", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900", children: formatNumber(stats.views_this_month || 0) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border border-gray-100", children: [
              /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-xs sm:text-sm mb-1", children: "Pending Claims" }),
              /* @__PURE__ */ jsx("div", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900", children: stats.pending_claims })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-orange-500 rounded-xl p-3 sm:p-4 md:p-5 shadow-sm text-white", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-orange-100 text-xs sm:text-sm mb-1", children: "Pending Reviews" }),
                /* @__PURE__ */ jsx("div", { className: "text-xl sm:text-2xl md:text-3xl font-bold", children: stats.pending_reviews })
              ] }),
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-orange-200", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-gray-500 text-xs sm:text-sm mb-1", children: "Active Campaigns" }),
                /* @__PURE__ */ jsx("div", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900", children: stats.active_campaigns || 0 })
              ] }),
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 sm:w-6 sm:h-6 text-gray-400", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100 md:col-span-2 lg:col-span-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base", children: "Recent Activity" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4 max-h-[280px] sm:max-h-[320px] md:max-h-[360px] overflow-y-auto", children: [
              pendingClaims == null ? void 0 : pendingClaims.map((claim) => {
                var _a, _b;
                return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-gray-100", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-6 h-6 sm:w-8 sm:h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 sm:w-4 sm:h-4 text-yellow-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" }) }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-gray-900 font-medium truncate", children: [
                      "New claim: ",
                      (_a = claim.hotel) == null ? void 0 : _a.name
                    ] }),
                    /* @__PURE__ */ jsxs("p", { className: "text-[10px] sm:text-xs text-gray-500", children: [
                      "by ",
                      (_b = claim.user) == null ? void 0 : _b.name
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-xs text-gray-400 flex-shrink-0", children: "Pending" })
                ] }, claim.id);
              }),
              recentHotels == null ? void 0 : recentHotels.slice(0, 4).map((hotel) => {
                var _a;
                return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-gray-100", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 sm:w-4 sm:h-4 text-green-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" }) }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-gray-900 font-medium truncate", children: [
                      "Hotel added: ",
                      hotel.name
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500", children: (_a = hotel.destination) == null ? void 0 : _a.name })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-xs text-gray-400 flex-shrink-0", children: "New" })
                ] }, hotel.id);
              })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-sm border border-gray-100 overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-3 sm:mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 text-sm sm:text-base", children: "Top Performing Hotels" }),
              /* @__PURE__ */ jsx(Link, { href: "/admin/hotels", className: "text-orange-600 text-xs sm:text-sm font-medium hover:text-orange-700", children: "View all →" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[500px]", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-[10px] sm:text-xs text-gray-500 border-b border-gray-100", children: [
                /* @__PURE__ */ jsx("th", { className: "pb-2 sm:pb-3 font-medium", children: "Hotel Name" }),
                /* @__PURE__ */ jsx("th", { className: "pb-2 sm:pb-3 font-medium", children: "Image" }),
                /* @__PURE__ */ jsx("th", { className: "pb-2 sm:pb-3 font-medium", children: "Status" }),
                /* @__PURE__ */ jsx("th", { className: "pb-2 sm:pb-3 font-medium", children: "Clicks" }),
                /* @__PURE__ */ jsx("th", { className: "pb-2 sm:pb-3 font-medium", children: "Revenue" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: (topPerformingHotels == null ? void 0 : topPerformingHotels.length) > 0 ? topPerformingHotels.map((hotel) => {
                var _a;
                return /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-50 hover:bg-gray-50", children: [
                  /* @__PURE__ */ jsxs("td", { className: "py-2 sm:py-3", children: [
                    /* @__PURE__ */ jsx(Link, { href: `/admin/hotels/${hotel.id}/edit`, className: "text-xs sm:text-sm font-medium text-gray-900 hover:text-orange-600", children: hotel.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500", children: (_a = hotel.destination) == null ? void 0 : _a.name })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "py-2 sm:py-3", children: hotel.main_image ? /* @__PURE__ */ jsx("img", { src: hotel.main_image, alt: "", className: "w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg" }) }),
                  /* @__PURE__ */ jsx("td", { className: "py-2 sm:py-3", children: /* @__PURE__ */ jsx("span", { className: "px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-green-100 text-green-700", children: "Active" }) }),
                  /* @__PURE__ */ jsx("td", { className: "py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900", children: formatNumber(hotel.click_count) }),
                  /* @__PURE__ */ jsxs("td", { className: "py-2 sm:py-3 text-xs sm:text-sm font-medium text-green-600", children: [
                    "€",
                    formatNumber(hotel.affiliate_revenue || 0)
                  ] })
                ] }, hotel.id);
              }) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", className: "py-6 sm:py-8 text-center text-gray-500 text-xs sm:text-sm", children: "No performance data yet" }) }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-sm border border-gray-100", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base", children: "Quick Links" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-2 sm:gap-3", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "/admin/hotels/create",
                  className: "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 md:p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors group",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4v16m8-8H4" }) }) }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: "Add Hotel" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "/admin/claims",
                  className: "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 md:p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors group relative",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-yellow-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" }) }) }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: "Claims" }),
                    stats.pending_claims > 0 && /* @__PURE__ */ jsx("span", { className: "absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full", children: stats.pending_claims })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "/admin/reviews",
                  className: "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 md:p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors group relative",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }) }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: "Reviews" }),
                    stats.pending_reviews > 0 && /* @__PURE__ */ jsx("span", { className: "absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full", children: stats.pending_reviews })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "/admin/hotels",
                  className: "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 md:p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" }) }) }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: "Hotels" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "/admin/destinations",
                  className: "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 md:p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" }) }) }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: "Destinations" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "/admin/users",
                  className: "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 md:p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" }) }) }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: "Users" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "/admin/scoring",
                  className: "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 md:p-4 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors group",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" }) }) }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: "Scoring" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "/admin/content",
                  className: "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 md:p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors group",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" }) }) }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: "Content" })
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function MiniStatCard({ icon, value, label, bgColor }) {
  return /* @__PURE__ */ jsxs("div", { className: `${bgColor} rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 flex items-center gap-2 sm:gap-3`, children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5", children: icon }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: "text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate", children: value }),
      /* @__PURE__ */ jsx("div", { className: "text-[9px] sm:text-[10px] md:text-xs text-gray-500 font-medium truncate", children: label })
    ] })
  ] });
}
export {
  AdminDashboard as default
};

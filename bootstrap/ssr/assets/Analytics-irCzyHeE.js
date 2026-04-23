import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link, Head } from "@inertiajs/react";
import { useState } from "react";
import { H as HotelierNav } from "./HotelierNav-CV4guQe6.js";
function QuickStatCard({ title, views, clicks, color }) {
  const colorClasses = {
    orange: {
      bg: "bg-orange-50",
      icon: "text-orange-600"
    },
    blue: {
      bg: "bg-blue-50",
      icon: "text-blue-600"
    },
    green: {
      bg: "bg-green-50",
      icon: "text-green-600"
    },
    purple: {
      bg: "bg-purple-50",
      icon: "text-purple-600"
    }
  };
  const colors = colorClasses[color] || colorClasses.orange;
  const ctr = views > 0 ? (clicks / views * 100).toFixed(1) : 0;
  return /* @__PURE__ */ jsxs("div", { className: `${colors.bg} rounded-xl p-3 sm:p-4`, children: [
    /* @__PURE__ */ jsx("div", { className: `text-xs font-semibold uppercase ${colors.icon} mb-1.5 sm:mb-2`, children: title }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 sm:space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: views.toLocaleString() }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Views" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "text-base sm:text-lg font-semibold text-gray-700", children: clicks.toLocaleString() }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Clicks" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right ml-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: `text-base sm:text-lg font-semibold ${colors.icon}`, children: [
            ctr,
            "%"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "CTR" })
        ] })
      ] })
    ] })
  ] });
}
function TabButton({ active, onClick, children }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      className: `flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-t-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${active ? "bg-white text-orange-600 border-b-2 border-orange-500 -mb-px" : "text-gray-500 hover:text-gray-700"}`,
      children
    }
  );
}
function SummaryCard({ icon, title, value, description }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-3 sm:p-4 md:p-5 border border-gray-100 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2", children: [
      typeof icon === "string" ? /* @__PURE__ */ jsx("span", { className: "text-xl sm:text-2xl", children: icon }) : /* @__PURE__ */ jsx("span", { className: "[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5", children: icon }),
      /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-700 text-xs sm:text-sm", children: title })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-3xl font-bold text-gray-900 mb-1", children: typeof value === "number" ? value.toLocaleString() : value }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: description })
  ] });
}
function PeriodCard({ title, value, icon, highlight = false }) {
  return /* @__PURE__ */ jsxs("div", { className: `rounded-xl p-3 sm:p-4 ${highlight ? "bg-orange-50" : "bg-white border border-gray-100 shadow-sm"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2", children: [
      typeof icon === "string" ? /* @__PURE__ */ jsx("span", { children: icon }) : /* @__PURE__ */ jsx("span", { className: "[&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4", children: icon }),
      /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm font-medium text-gray-600", children: title })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `text-xl sm:text-2xl font-bold ${highlight ? "text-orange-600" : "text-gray-900"}`, children: value.toLocaleString() })
  ] });
}
function PerformanceChart({ data }) {
  var _a, _b;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-3 sm:p-4 md:p-6 border border-gray-100 shadow-sm", children: [
    /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-900 text-sm sm:text-base mb-3 sm:mb-4", children: "Last 30 Days" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-end gap-0.5 sm:gap-1 h-32 sm:h-40 overflow-x-auto pb-2 scrollbar-hide", children: data.map((day, index) => {
        const maxViews = Math.max(...data.map((d) => d.views), 1);
        const heightPercent = day.views / maxViews * 100;
        const heightPx = Math.max(heightPercent / 100 * 160, 4);
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex-shrink-0 w-4 sm:w-5 md:w-6 group relative h-full flex items-end",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `rounded-t w-full transition-all ${day.views > 0 ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-200"}`,
                  style: { height: `${heightPx}px` }
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 hidden sm:block", children: [
                day.formatted_date,
                ": ",
                day.views,
                " views"
              ] })
            ]
          },
          index
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-gray-500", children: [
        /* @__PURE__ */ jsx("span", { children: (_a = data[0]) == null ? void 0 : _a.formatted_date }),
        /* @__PURE__ */ jsx("span", { children: (_b = data[data.length - 1]) == null ? void 0 : _b.formatted_date })
      ] })
    ] })
  ] });
}
function DailyBreakdownTable({ data }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100", children: /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-900 text-sm sm:text-base", children: "Daily Breakdown (Last 14 Days)" }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50", children: [
        /* @__PURE__ */ jsx("th", { className: "px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Date" }),
        /* @__PURE__ */ jsx("th", { className: "px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase", children: "Views" }),
        /* @__PURE__ */ jsx("th", { className: "px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase", children: "Clicks" }),
        /* @__PURE__ */ jsx("th", { className: "px-2 sm:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase", children: "CTR" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: data.length > 0 ? [...data].reverse().slice(0, 14).map((day, index) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900", children: day.formatted_date }),
        /* @__PURE__ */ jsx("td", { className: "px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right font-medium text-gray-900", children: day.views }),
        /* @__PURE__ */ jsx("td", { className: "px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right font-medium text-blue-600", children: day.clicks }),
        /* @__PURE__ */ jsxs("td", { className: "px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right font-medium text-green-600", children: [
          day.ctr,
          "%"
        ] })
      ] }, index)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "px-3 sm:px-4 py-6 sm:py-8 text-center text-gray-500 text-xs sm:text-sm", children: "No data available yet" }) }) })
    ] }) })
  ] });
}
function InfoBox({ color, title, icon, items }) {
  const colorClasses = {
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      title: "text-orange-800",
      text: "text-orange-700"
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      title: "text-blue-800",
      text: "text-blue-700"
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      title: "text-green-800",
      text: "text-green-700"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      title: "text-purple-800",
      text: "text-purple-700"
    }
  };
  const colors = colorClasses[color] || colorClasses.blue;
  return /* @__PURE__ */ jsxs("div", { className: `${colors.bg} rounded-xl p-3 sm:p-4 md:p-5 border ${colors.border}`, children: [
    /* @__PURE__ */ jsxs("h4", { className: `font-bold ${colors.title} mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base`, children: [
      /* @__PURE__ */ jsx("span", { className: "[&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4", children: icon }),
      title
    ] }),
    /* @__PURE__ */ jsx("ul", { className: `text-xs sm:text-sm ${colors.text} space-y-0.5 sm:space-y-1`, children: items.map((item, index) => /* @__PURE__ */ jsxs("li", { children: [
      "• ",
      item
    ] }, index)) })
  ] });
}
function ClickBreakdownCard({ title, icon, value, percent, description, color }) {
  const colorClasses = {
    orange: {
      bg: "bg-orange-50",
      title: "text-gray-900",
      value: "text-gray-900",
      progressBg: "bg-orange-100",
      progressFill: "bg-orange-500",
      percent: "text-orange-600",
      description: "text-gray-500"
    },
    blue: {
      bg: "bg-blue-50",
      title: "text-gray-900",
      value: "text-gray-900",
      progressBg: "bg-blue-100",
      progressFill: "bg-blue-500",
      percent: "text-blue-600",
      description: "text-gray-500"
    },
    green: {
      bg: "bg-green-50",
      title: "text-gray-900",
      value: "text-gray-900",
      progressBg: "bg-green-100",
      progressFill: "bg-green-500",
      percent: "text-green-600",
      description: "text-gray-500"
    },
    purple: {
      bg: "bg-purple-50",
      title: "text-gray-900",
      value: "text-gray-900",
      progressBg: "bg-purple-100",
      progressFill: "bg-purple-500",
      percent: "text-purple-600",
      description: "text-gray-500"
    }
  };
  const colors = colorClasses[color] || colorClasses.blue;
  return /* @__PURE__ */ jsxs("div", { className: `${colors.bg} rounded-xl p-3 sm:p-4 md:p-5`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2 sm:mb-3 gap-2", children: [
      /* @__PURE__ */ jsx("h4", { className: `font-semibold text-xs sm:text-sm ${colors.title}`, children: title }),
      typeof icon === "string" ? /* @__PURE__ */ jsx("span", { className: "text-lg sm:text-xl", children: icon }) : /* @__PURE__ */ jsx("span", { className: "[&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6 flex-shrink-0", children: icon })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `text-2xl sm:text-3xl font-bold ${colors.value} mb-2`, children: value.toLocaleString() }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("div", { className: `flex-1 ${colors.progressBg} rounded-full h-1.5 sm:h-2`, children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `${colors.progressFill} h-1.5 sm:h-2 rounded-full transition-all`,
          style: { width: `${percent}%` }
        }
      ) }),
      /* @__PURE__ */ jsxs("span", { className: `text-xs sm:text-sm font-semibold ${colors.percent}`, children: [
        percent,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: `text-xs ${colors.description} mt-2`, children: description })
  ] });
}
function ChartIcon({ className }) {
  return /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" }) });
}
function EyeIcon({ className }) {
  return /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" }) });
}
function LinkIcon({ className }) {
  return /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" }) });
}
function PercentIcon({ className }) {
  return /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M7.5 11C9.43 11 11 9.43 11 7.5S9.43 4 7.5 4 4 5.57 4 7.5 5.57 11 7.5 11zm0-5C8.33 6 9 6.67 9 7.5S8.33 9 7.5 9 6 8.33 6 7.5 6.67 6 7.5 6zM4.0025 18.5832L18.5902 3.9955l1.4142 1.4143L5.4167 19.9975zM16.5 13c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" }) });
}
function CalendarIcon({ className }) {
  return /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" }) });
}
function CalendarWeekIcon({ className }) {
  return /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm-7-9H7v5h5v-5z" }) });
}
function CalendarMonthIcon({ className }) {
  return /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" }) });
}
function LightbulbIcon({ className }) {
  return /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" }) });
}
function HotelIcon({ className }) {
  return /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" }) });
}
function MoneyIcon({ className }) {
  return /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" }) });
}
function OverviewTab({ analytics, hotel }) {
  const getLast30Days = () => {
    const days = [];
    const today = /* @__PURE__ */ new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const existingData = analytics.daily.find((d) => d.date === dateStr);
      days.push({
        date: dateStr,
        formatted_date: formattedDate,
        views: (existingData == null ? void 0 : existingData.views) || 0,
        clicks: (existingData == null ? void 0 : existingData.clicks) || 0
      });
    }
    return days;
  };
  const chartData = getLast30Days();
  const ctr = analytics.allTime.views > 0 ? (analytics.allTime.clicks / analytics.allTime.views * 100).toFixed(1) : 0;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-1 flex items-center gap-1.5 sm:gap-2", children: [
        /* @__PURE__ */ jsx(ChartIcon, { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-500" }),
        "Performance Overview"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: "See how guests interact with your hotel profile on Sunbed Ranker." })
    ] }),
    /* @__PURE__ */ jsx(PerformanceChart, { data: chartData }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4", children: [
      /* @__PURE__ */ jsx(
        SummaryCard,
        {
          icon: /* @__PURE__ */ jsx(EyeIcon, { className: "w-5 h-5 text-orange-500" }),
          title: "Total Profile Views",
          value: analytics.allTime.views,
          description: "How many times guests viewed your hotel profile"
        }
      ),
      /* @__PURE__ */ jsx(
        SummaryCard,
        {
          icon: /* @__PURE__ */ jsx(LinkIcon, { className: "w-5 h-5 text-blue-500" }),
          title: "Total Booking Clicks",
          value: analytics.allTime.clicks,
          description: "Clicks on booking buttons (affiliate & direct)"
        }
      ),
      /* @__PURE__ */ jsx(
        SummaryCard,
        {
          icon: /* @__PURE__ */ jsx(PercentIcon, { className: "w-5 h-5 text-green-500" }),
          title: "Click-Through Rate",
          value: `${ctr}%`,
          description: "Percentage of views that resulted in booking clicks"
        }
      )
    ] })
  ] });
}
function ViewsTab({ analytics }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-1 flex items-center gap-1.5 sm:gap-2", children: [
        /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-500" }),
        "Profile Views"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: "Track how many times your hotel profile was viewed. Higher visibility leads to more bookings." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4", children: [
      /* @__PURE__ */ jsx(PeriodCard, { title: "Today", value: analytics.today.views, icon: /* @__PURE__ */ jsx(CalendarIcon, { className: "w-4 h-4 text-gray-400" }) }),
      /* @__PURE__ */ jsx(PeriodCard, { title: "This Week", value: analytics.weekly.views, icon: /* @__PURE__ */ jsx(CalendarWeekIcon, { className: "w-4 h-4 text-gray-400" }) }),
      /* @__PURE__ */ jsx(PeriodCard, { title: "This Month", value: analytics.monthly.views, icon: /* @__PURE__ */ jsx(CalendarMonthIcon, { className: "w-4 h-4 text-gray-400" }) }),
      /* @__PURE__ */ jsx(PeriodCard, { title: "All Time", value: analytics.allTime.views, icon: /* @__PURE__ */ jsx(ChartIcon, { className: "w-4 h-4 text-orange-500" }), highlight: true })
    ] }),
    /* @__PURE__ */ jsx(DailyBreakdownTable, { data: analytics.daily }),
    /* @__PURE__ */ jsx(
      InfoBox,
      {
        color: "orange",
        title: "Why Profile Views Matter",
        icon: /* @__PURE__ */ jsx(LightbulbIcon, { className: "w-4 h-4" }),
        items: [
          "Measures your hotel's visibility on Sunbed Ranker",
          "Shows if promotions or upgrades increase exposure",
          "Helps justify subscription value with real data"
        ]
      }
    )
  ] });
}
function ClicksTab({ analytics, hotel }) {
  const totalClicks = analytics.clickBreakdown.affiliate + analytics.clickBreakdown.direct;
  const affiliatePercent = totalClicks > 0 ? Math.round(analytics.clickBreakdown.affiliate / totalClicks * 100) : 0;
  const directPercent = totalClicks > 0 ? Math.round(analytics.clickBreakdown.direct / totalClicks * 100) : 0;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-1 flex items-center gap-1.5 sm:gap-2", children: [
        /* @__PURE__ */ jsx(LinkIcon, { className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-500" }),
        "Booking Link Clicks"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: "See where guests prefer to book and optimize your direct booking strategy." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4", children: [
      /* @__PURE__ */ jsx(
        ClickBreakdownCard,
        {
          title: "Affiliate / OTA Clicks",
          icon: /* @__PURE__ */ jsx(HotelIcon, { className: "w-6 h-6 text-blue-500" }),
          value: analytics.clickBreakdown.affiliate,
          percent: affiliatePercent,
          description: "Booking.com, Expedia, etc.",
          color: "blue"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: `rounded-xl p-3 sm:p-4 md:p-5 ${hotel.direct_booking_url ? "bg-green-50" : "bg-gray-50"}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2 sm:mb-3 gap-2", children: [
          /* @__PURE__ */ jsx("h4", { className: `font-semibold text-xs sm:text-sm ${hotel.direct_booking_url ? "text-gray-900" : "text-gray-600"}`, children: "Direct Booking Clicks" }),
          /* @__PURE__ */ jsx(MoneyIcon, { className: "w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" })
        ] }),
        hotel.direct_booking_url ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-3xl font-bold text-gray-900 mb-2", children: analytics.clickBreakdown.direct.toLocaleString() }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1 bg-green-100 rounded-full h-1.5 sm:h-2", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "bg-green-500 h-1.5 sm:h-2 rounded-full transition-all",
                style: { width: `${directPercent}%` }
              }
            ) }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs sm:text-sm font-semibold text-green-600", children: [
              directPercent,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Your hotel's direct booking" })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-3 sm:py-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3", children: "No direct booking URL set" }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: `${route("hotelier.hotels.manage", hotel.slug)}?tab=enhanced`,
              className: "inline-block px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg font-medium text-xs sm:text-sm hover:bg-green-600 transition-colors",
              children: "Add Direct Booking URL"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-gray-900 text-sm sm:text-base mb-3 sm:mb-4", children: "Click Trends" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsx(PeriodCard, { title: "Today", value: analytics.today.clicks, icon: /* @__PURE__ */ jsx(CalendarIcon, { className: "w-4 h-4 text-gray-400" }) }),
        /* @__PURE__ */ jsx(PeriodCard, { title: "This Week", value: analytics.weekly.clicks, icon: /* @__PURE__ */ jsx(CalendarWeekIcon, { className: "w-4 h-4 text-gray-400" }) }),
        /* @__PURE__ */ jsx(PeriodCard, { title: "This Month", value: analytics.monthly.clicks, icon: /* @__PURE__ */ jsx(CalendarMonthIcon, { className: "w-4 h-4 text-gray-400" }) }),
        /* @__PURE__ */ jsx(PeriodCard, { title: "All Time", value: analytics.allTime.clicks, icon: /* @__PURE__ */ jsx(LinkIcon, { className: "w-4 h-4 text-orange-500" }), highlight: true })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      InfoBox,
      {
        color: "green",
        title: "Why Direct Bookings Matter",
        icon: /* @__PURE__ */ jsx(MoneyIcon, { className: "w-4 h-4" }),
        items: [
          "Save 15-25% on OTA commissions",
          "Build direct guest relationships",
          "Offer exclusive perks and promotions",
          'Tip: Add "Book Direct" offers to increase direct clicks!'
        ]
      }
    )
  ] });
}
function Analytics({ hotel, subscription, analytics }) {
  var _a;
  const getInitialTab = () => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    return ["overview", "views", "clicks"].includes(tab) ? tab : "overview";
  };
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url.toString());
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Analytics - ${hotel.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(HotelierNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("hotelier.dashboard"),
                className: "text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" }) })
              }
            ),
            /* @__PURE__ */ jsxs("h1", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2", children: [
              /* @__PURE__ */ jsx(ChartIcon, { className: "w-5 h-5 sm:w-6 sm:h-6 text-orange-500" }),
              "Analytics"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ml-6 sm:ml-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-medium text-sm sm:text-base truncate", children: hotel.name }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm", children: (_a = hotel.destination) == null ? void 0 : _a.name })
            ] }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("hotelier.hotels.manage", hotel.slug),
                className: "px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium text-xs sm:text-sm transition-colors text-center w-full sm:w-auto flex-shrink-0",
                children: "Manage Hotel"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsx(
            QuickStatCard,
            {
              title: "Today",
              views: analytics.today.views,
              clicks: analytics.today.clicks,
              color: "orange"
            }
          ),
          /* @__PURE__ */ jsx(
            QuickStatCard,
            {
              title: "This Week",
              views: analytics.weekly.views,
              clicks: analytics.weekly.clicks,
              color: "blue"
            }
          ),
          /* @__PURE__ */ jsx(
            QuickStatCard,
            {
              title: "This Month",
              views: analytics.monthly.views,
              clicks: analytics.monthly.clicks,
              color: "green"
            }
          ),
          /* @__PURE__ */ jsx(
            QuickStatCard,
            {
              title: "All Time",
              views: analytics.allTime.views,
              clicks: analytics.allTime.clicks,
              color: "purple"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200 px-2 sm:px-4 pt-2 sm:pt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-0.5 sm:gap-1 overflow-x-auto pb-0 scrollbar-hide", children: [
            /* @__PURE__ */ jsxs(TabButton, { active: activeTab === "overview", onClick: () => handleTabChange("overview"), children: [
              /* @__PURE__ */ jsx(ChartIcon, { className: "w-4 h-4" }),
              "Overview"
            ] }),
            /* @__PURE__ */ jsxs(TabButton, { active: activeTab === "views", onClick: () => handleTabChange("views"), children: [
              /* @__PURE__ */ jsx(EyeIcon, { className: "w-4 h-4" }),
              "Profile Views"
            ] }),
            /* @__PURE__ */ jsxs(TabButton, { active: activeTab === "clicks", onClick: () => handleTabChange("clicks"), children: [
              /* @__PURE__ */ jsx(LinkIcon, { className: "w-4 h-4" }),
              "Booking Clicks"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4 md:p-5 lg:p-6", children: [
            activeTab === "overview" && /* @__PURE__ */ jsx(OverviewTab, { analytics, hotel }),
            activeTab === "views" && /* @__PURE__ */ jsx(ViewsTab, { analytics }),
            activeTab === "clicks" && /* @__PURE__ */ jsx(ClicksTab, { analytics, hotel })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Analytics as default
};

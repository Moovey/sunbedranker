import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { H as Header } from "./Header-IxKzTBec.js";
import { F as Footer } from "./Footer-xQLxAHWv.js";
import { memo } from "react";
function HotelCompare({ hotels, auth }) {
  if (!hotels || hotels.length === 0) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Head, { title: "Compare Hotels" }),
      /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", children: [
        /* @__PURE__ */ jsx(Header, {}),
        /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-6 sm:mb-8", children: /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto text-orange-500", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }) }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-gray-900 mb-3 sm:mb-4 px-4", children: "No Hotels Selected" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base md:text-lg text-gray-700 mb-8 sm:mb-10 md:mb-12 font-sans font-bold px-4", children: "Select 2-4 hotels to compare their pool and sunbed features" }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/",
              className: "inline-block px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-sans font-bold rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base",
              children: "Start Searching"
            }
          )
        ] }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Compare Hotels - Pool & Sunbed Features" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("header", { className: "bg-white border-b-2 border-gray-200 shadow-lg", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full sm:w-auto", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-sans font-black text-gray-900", children: "Compare Hotels" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm md:text-base text-gray-700 mt-1 sm:mt-2 font-sans font-bold", children: "Side-by-side comparison of pool & sunbed features" })
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/",
            className: "w-full sm:w-auto text-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border-2 border-orange-500 bg-white rounded-2xl hover:bg-orange-50 transition-colors duration-200 font-sans text-xs sm:text-sm font-bold text-orange-600 whitespace-nowrap shadow-md hover:shadow-lg flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" }) }),
              "Back to Search"
            ]
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsxs("main", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:hidden mb-4 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-700 font-sans font-bold flex items-center justify-center gap-2 bg-gray-50 p-3 rounded-2xl border-2 border-gray-200", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gray-600", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M6.49 20.13l1.77-1.77 9.9 9.9-1.77 1.77-9.9-9.9zm10.02-10.02l1.77-1.77 9.9 9.9-1.77 1.77-9.9-9.9zM4 12l1.41 1.41L12 6.83l6.59 6.58L20 12l-8-8-8 8z" }) }),
          /* @__PURE__ */ jsx("span", { children: "Swipe left/right to compare all hotels" }),
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gray-600", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden border-2 border-gray-100", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto overflow-y-visible scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-100 -webkit-overflow-scrolling-touch", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[640px] md:min-w-[800px]", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b-2 border-orange-200 bg-white", children: [
            /* @__PURE__ */ jsx("th", { className: "p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 text-left font-sans font-bold text-gray-900 bg-orange-50 sticky left-0 z-10 text-xs sm:text-sm md:text-base shadow-lg min-w-[100px] sm:min-w-[120px] md:min-w-[140px]", children: "Feature" }),
            hotels.map((hotel) => /* @__PURE__ */ jsx(HotelHeaderCell, { hotel }, hotel.id))
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Overall Pool & Sun Score",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
                hotels,
                getValue: (hotel) => hotel.overall_score,
                formatValue: (value) => value ? `${value}/10` : "-",
                highlightBest: true
              }
            ),
            /* @__PURE__ */ jsx(SpecialOffersRow, { hotels }),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Family Score",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63C19.68 7.55 18.92 7 18.06 7h-.12c-.86 0-1.62.55-1.9 1.37L13.5 16H16v6h4zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm1.5 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h2v7h3z" }) }),
                hotels,
                getValue: (hotel) => hotel.family_score,
                formatValue: (value) => value ? `${value}/10` : "-",
                highlightBest: true
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Quiet Sun Score",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm5 0c.83 0 1.5-.67 1.5-1.5S12.83 8 12 8s-1.5.67-1.5 1.5S11.17 11 12 11zm5 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5S16.17 11 17 11zM12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" }) }),
                hotels,
                getValue: (hotel) => hotel.quiet_score,
                formatValue: (value) => value ? `${value}/10` : "-",
                highlightBest: true
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Party Vibe Score",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M7 8c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.76-2.24 5-5 5S7 10.76 7 8zm5-3c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm1 13h-2v-2H9v2H7v2h2v2h2v-2h2v-2zm8-4h-2v2h2v-2zm-2-2h2v-2h-2v2zM4 14H2v2h2v-2zm0-4H2v2h2v-2z" }) }),
                hotels,
                getValue: (hotel) => hotel.party_score,
                formatValue: (value) => value ? `${value}/10` : "-",
                highlightBest: true
              }
            ),
            /* @__PURE__ */ jsx(SectionHeader, { title: "Pool Metrics", color: "blue" }),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Sunbed to Guest Ratio",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 2v2h2V2h4v2h2V2h2v4H6V2h2zm0 6h8v12H8V8zm-5 2v12a2 2 0 002 2h14a2 2 0 002-2V10a2 2 0 00-2-2H5a2 2 0 00-2 2z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.sunbed_to_guest_ratio;
                },
                formatValue: (value) => value ? `${value}:1` : "-",
                highlightBest: true
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Number of Pools",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.number_of_pools;
                },
                formatValue: (value) => value || "-",
                highlightBest: true
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Total Pool Size",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M21 16V8c0-.55-.22-1.05-.59-1.41L14.5 1.59C14.14 1.22 13.64 1 13.09 1H8v6H2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-5l5-5zM13 3.5L18.5 9H13V3.5zM4 21V9h16v4.83L16.83 21H4z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.pool_size_sqm;
                },
                formatValue: (value) => value ? `${value} m²` : "-",
                highlightBest: true
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Sun Exposure",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.sun_exposure;
                },
                formatValue: (value) => value ? formatSunExposure(value) : "-"
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Atmosphere",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.atmosphere;
                },
                formatValue: (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : "-"
              }
            ),
            /* @__PURE__ */ jsx(SectionHeader, { title: "Pool Features", color: "orange" }),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Infinity Pool",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2zM18 9.96c-.2-.63-.69-1.2-1.56-1.72-.87-.52-1.97-.78-3.31-.78-1.34 0-2.44.26-3.31.78-.87.52-1.36 1.09-1.56 1.72h9.74zM2 12h20v2H2v-2z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.has_infinity_pool;
                },
                formatValue: (value) => /* @__PURE__ */ jsx(BooleanBadge, { value })
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Rooftop Pool",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2L4 7v12h2v-6h12v6h2V7l-8-5zm0 2.84L18 8v3H6V8l6-3.16zM10 14v2h4v-2h-4z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.has_rooftop_pool;
                },
                formatValue: (value) => /* @__PURE__ */ jsx(BooleanBadge, { value })
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Heated Pool",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.has_heated_pool;
                },
                formatValue: (value) => /* @__PURE__ */ jsx(BooleanBadge, { value })
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Jacuzzi / Hot Tub",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-purple-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M7 6c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm2.5 2c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm8.49 3.14c.42-.15.8-.39 1.12-.7l1.07 1.07c-.67.66-1.5 1.14-2.45 1.36-.71 4.19-4.23 7.36-8.48 7.36A8.757 8.757 0 010 10.5h2c0 3.72 3.01 6.75 6.75 6.75 2.94 0 5.45-1.89 6.37-4.51-1.92-.14-3.46-1.69-3.59-3.61H9.38C8.62 9.06 8 9.61 8 10.3v1.2H6v-1.2c0-1.76 1.5-3.2 3.38-3.3h5.12c.3-2.08 2.08-3.67 4.25-3.67 2.37 0 4.28 1.89 4.28 4.22 0 1.48-.77 2.78-1.93 3.54l-.11.05z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.has_jacuzzi;
                },
                formatValue: (value) => /* @__PURE__ */ jsx(BooleanBadge, { value })
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Pool Bar",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.has_pool_bar;
                },
                formatValue: (value) => /* @__PURE__ */ jsx(BooleanBadge, { value })
              }
            ),
            /* @__PURE__ */ jsx(SectionHeader, { title: "Family & Safety", color: "blue" }),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Kids Pool",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 5.9c1.16 0 2.1-.94 2.1-2.1S13.16 1.7 12 1.7s-2.1.94-2.1 2.1S10.84 5.9 12 5.9zm8 7.5c-.03 0-.06 0-.08.01L15 13.5v5.5l-2.07-.46c1.11.49 2.41.46 3.5-.07V22h2v-6.23l2.58.58c.36.08.72-.15.8-.51.08-.37-.15-.73-.51-.81L21 15v-.1c.02-.43-.31-.8-.73-.88C20.17 14.01 20.09 14 20 13.5zm-9.98 1l.54 5.5h2.08l.54-5.5c.06-.61-.4-1.13-1-1.13h-.16c-.6 0-1.06.52-1 1.13zM12 8c-1.66 0-3 1.34-3 3 0 1.65 1.34 3 3 3s3-1.35 3-3c0-1.66-1.34-3-3-3z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.has_kids_pool;
                },
                formatValue: (value) => /* @__PURE__ */ jsx(BooleanBadge, { value })
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Waterslide",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-cyan-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M18 4l-2 3h3l-4 5h3l-6 8v-6H9l4-5H9l5-5h4z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.has_waterslide;
                },
                formatValue: (value) => /* @__PURE__ */ jsx(BooleanBadge, { value })
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Lifeguard on Duty",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-red-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.has_lifeguard;
                },
                formatValue: (value) => /* @__PURE__ */ jsx(BooleanBadge, { value })
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Adults Only Area",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-purple-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a, _b;
                  return ((_a = hotel.pool_criteria) == null ? void 0 : _a.is_adults_only) || ((_b = hotel.pool_criteria) == null ? void 0 : _b.has_adult_sun_terrace);
                },
                formatValue: (value) => /* @__PURE__ */ jsx(BooleanBadge, { value })
              }
            ),
            /* @__PURE__ */ jsx(SectionHeader, { title: "Comfort & Service", color: "orange" }),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Luxury Cabanas",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-amber-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 3L2 12h3v8h14v-8h3L12 3zm0 12.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.has_luxury_cabanas;
                },
                formatValue: (value) => /* @__PURE__ */ jsx(BooleanBadge, { value })
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Poolside Waiter Service",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-green-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05l-2.97 1.99-.73-2.88L21.22 3l-2.22 1.5L17.07 0l-1.93 4.17-2.01-1.32 1.49 5.91-2.6 1.73c-.94-1.41-2.62-2.34-4.56-2.09-2.02.26-3.69 1.87-4.01 3.88-.42 2.67 1.56 4.99 4.03 5.29v2.26a4 4 0 01-4 4H2v2h4c3.31 0 6-2.69 6-6v-2.29c.82-.12 1.58-.42 2.24-.85l2.4 5.24 1.42-1.08z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.has_waiter_service;
                },
                formatValue: (value) => /* @__PURE__ */ jsx(BooleanBadge, { value })
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Shade Areas",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-gray-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M14.5 6.92L13 5.77V3.4c0-.26.22-.48.5-.48s.5.21.5.48V4h1v-.6C15 2.07 13.88 1 12.5 1S10 2.07 10 3.4v2.37L8.5 6.92 6 6.07l5.05 15.25c.15.45.55.68.95.68s.8-.23.95-.69L18 6.07l-3.5.85zM13.28 8.5l.76.58.92-.23L13 14.8V8.29l.28.21z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a, _b;
                  return ((_b = (_a = hotel.pool_criteria) == null ? void 0 : _a.shade_options) == null ? void 0 : _b.length) > 0;
                },
                formatValue: (value) => /* @__PURE__ */ jsx(BooleanBadge, { value })
              }
            ),
            /* @__PURE__ */ jsx(
              ComparisonRow,
              {
                label: "Towel Service",
                icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-500", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z" }) }),
                hotels,
                getValue: (hotel) => {
                  var _a;
                  return (_a = hotel.pool_criteria) == null ? void 0 : _a.towel_reservation_policy;
                },
                formatValue: (value) => value ? value === "free" ? "✅ Free" : value === "deposit" ? "💰 Deposit" : value.charAt(0).toUpperCase() + value.slice(1) : "-"
              }
            )
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 sm:mt-10 md:mt-12 lg:mt-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-6 sm:mb-8", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg sm:text-xl md:text-2xl font-sans font-black text-gray-900 mb-2", children: "Ready to Book?" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-600 font-sans", children: "Choose your preferred hotel and start your vacation" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6", children: hotels.map((hotel) => {
            const isPremium = hotel.is_premium || hotel.subscription_tier === "premium";
            const hasDirectBooking = hotel.direct_booking_url;
            const isAgoda = hotel.is_agoda === true;
            const promotions = hotel.promotions && hotel.promotions.length > 0 ? hotel.promotions : hotel.promotional_banner || hotel.special_offer ? [{ promotional_banner: hotel.promotional_banner, special_offer: hotel.special_offer }] : [];
            const activePromo = promotions.find((p) => p.promotional_banner || p.special_offer);
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: `relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 w-full sm:w-[calc(50%-10px)] lg:w-[280px] xl:w-[300px] ${isPremium ? "bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-400" : "bg-white border border-gray-200"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative h-28 sm:h-32 md:h-36 overflow-hidden", children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: hotel.main_image_url || "/images/default-hotel.jpg",
                        alt: hotel.name,
                        width: 300,
                        height: 144,
                        className: "w-full h-full object-cover",
                        loading: "lazy",
                        decoding: "async"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" }),
                    isPremium && /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxs("span", { className: "bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold flex items-center gap-1 shadow-lg", children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" }) }),
                      "Premium"
                    ] }) }),
                    isAgoda && /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx("span", { className: "bg-blue-600 text-white px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold shadow-lg", children: "Estimated" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-3", children: [
                      /* @__PURE__ */ jsx("h3", { className: "font-sans font-bold text-white text-sm sm:text-base line-clamp-1 drop-shadow-lg", children: hotel.name }),
                      hotel.star_rating && /* @__PURE__ */ jsx("div", { className: "flex gap-0.5 mt-1", children: [...Array(typeof hotel.star_rating === "number" ? Math.round(hotel.star_rating) : hotel.star_rating)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 text-yellow-400 fill-current drop-shadow", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4", children: [
                    isPremium && activePromo && /* @__PURE__ */ jsxs("div", { className: "mb-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-bold text-center", children: [
                      "⭐ ",
                      activePromo.promotional_banner || "Special Offer Available"
                    ] }),
                    isAgoda && hotel.price && /* @__PURE__ */ jsxs("div", { className: "mb-3 text-center", children: [
                      /* @__PURE__ */ jsxs("span", { className: "text-lg font-black text-gray-900", children: [
                        hotel.currency,
                        " ",
                        Number(hotel.price).toFixed(0)
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-500 ml-1", children: "/night" })
                    ] }),
                    isAgoda ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2", children: hotel.landing_url && /* @__PURE__ */ jsxs(
                      "a",
                      {
                        href: hotel.landing_url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex items-center justify-center px-2 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-sans font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors duration-200 text-[10px] sm:text-xs gap-1",
                        children: [
                          "Book on Agoda",
                          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
                        ]
                      }
                    ) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                        /* @__PURE__ */ jsxs(
                          Link,
                          {
                            href: `/hotels/${hotel.slug}`,
                            className: "flex items-center justify-center px-2 py-2 sm:py-2.5 font-sans font-bold rounded-lg text-center transition-colors duration-200 text-[10px] sm:text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200",
                            children: [
                              /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 mr-1", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" }) }),
                              "Details"
                            ]
                          }
                        ),
                        isPremium && hasDirectBooking ? /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: route("hotels.click", { hotel: hotel.slug, type: "direct" }),
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "flex items-center justify-center px-2 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-sans font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors duration-200 text-[10px] sm:text-xs",
                            children: "💰 Direct"
                          }
                        ) : hotel.booking_affiliate_url ? /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: route("hotels.click", { hotel: hotel.slug, type: "booking" }),
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "flex items-center justify-center px-2 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-sans font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors duration-200 text-[10px] sm:text-xs",
                            children: "Book Now"
                          }
                        ) : /* @__PURE__ */ jsx("span", { className: "flex items-center justify-center px-2 py-2 sm:py-2.5 bg-gray-50 text-gray-400 font-sans font-bold rounded-lg text-[10px] sm:text-xs border border-gray-100", children: "No Link" })
                      ] }),
                      isPremium && hasDirectBooking && hotel.booking_affiliate_url && /* @__PURE__ */ jsx(
                        "a",
                        {
                          href: hotel.booking_affiliate_url,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className: "block mt-2 text-center text-[9px] sm:text-[10px] text-gray-500 hover:text-orange-600 font-semibold transition-colors",
                          children: "Compare on Booking.com →"
                        }
                      )
                    ] })
                  ] })
                ]
              },
              hotel.id
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
function SpecialOffersRow({ hotels }) {
  const hasAnyPromotions = hotels.some((hotel) => {
    const promotions = hotel.promotions && hotel.promotions.length > 0 ? hotel.promotions : hotel.promotional_banner || hotel.special_offer ? [{ promotional_banner: hotel.promotional_banner, special_offer: hotel.special_offer }] : [];
    return promotions.length > 0 && promotions.some((p) => p.promotional_banner || p.special_offer);
  });
  if (!hasAnyPromotions) return null;
  return /* @__PURE__ */ jsxs("tr", { className: "border-b-2 border-orange-200 bg-orange-50", children: [
    /* @__PURE__ */ jsx("td", { className: "p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 font-sans font-bold text-gray-700 bg-orange-100 sticky left-0 z-10 shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-2.5 md:gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xl", children: "⭐" }),
      /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-xs md:text-sm lg:text-base text-orange-800 font-black", children: "Special Offers" })
    ] }) }),
    hotels.map((hotel) => {
      const isPremium = hotel.is_premium || hotel.subscription_tier === "premium";
      const promotions = hotel.active_promotions && hotel.active_promotions.length > 0 ? hotel.active_promotions : hotel.promotional_banner || hotel.special_offer ? [{ promotional_banner: hotel.promotional_banner, special_offer: hotel.special_offer, special_offer_expires_at: hotel.special_offer_expires_at }] : [];
      const activePromotions = promotions.filter((promo) => {
        return promo.promotional_banner || promo.special_offer;
      });
      if (activePromotions.length === 0) {
        return /* @__PURE__ */ jsx("td", { className: "p-3 sm:p-4 md:p-5 lg:p-6 text-center", children: /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-sans font-bold text-xs sm:text-sm", children: "—" }) }, hotel.id);
      }
      return /* @__PURE__ */ jsx(
        "td",
        {
          className: `p-3 sm:p-4 md:p-5 lg:p-6 text-center ${isPremium ? "bg-orange-50" : ""}`,
          children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            activePromotions.slice(0, 3).map((promo, idx) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: `rounded-lg px-2 py-1.5 text-xs font-bold ${isPremium ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md" : "bg-orange-100 text-orange-800 border border-orange-200"}`,
                children: [
                  isPremium && /* @__PURE__ */ jsx("span", { className: "mr-1", children: "⭐" }),
                  promo.promotional_banner || "Special Offer"
                ]
              },
              idx
            )),
            activePromotions.length > 3 && /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-500 font-semibold", children: [
              "+",
              activePromotions.length - 3,
              " more offers"
            ] })
          ] })
        },
        hotel.id
      );
    })
  ] });
}
function ComparisonRow({ label, icon, hotels, getValue, formatValue, highlightBest = false }) {
  const values = hotels.map(getValue);
  const maxValue = highlightBest && values.some((v) => typeof v === "number") ? Math.max(...values.filter((v) => typeof v === "number")) : null;
  return /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 hover:bg-orange-50 transition-colors duration-200", children: [
    /* @__PURE__ */ jsx("td", { className: "p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 font-sans font-bold text-gray-700 bg-gradient-to-r from-gray-50 to-white sticky left-0 z-10 shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-2.5 md:gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "flex-shrink-0", children: icon }),
      /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-xs md:text-sm lg:text-base", children: label })
    ] }) }),
    hotels.map((hotel, index) => {
      const value = getValue(hotel);
      const isBest = highlightBest && typeof value === "number" && value === maxValue && maxValue !== null;
      return /* @__PURE__ */ jsx(
        "td",
        {
          className: `p-3 sm:p-4 md:p-5 lg:p-6 text-center font-sans text-xs sm:text-sm md:text-base ${isBest ? "bg-orange-50 font-black text-orange-900 border-2 border-orange-300" : "text-gray-700 font-bold"}`,
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1 sm:gap-2", children: [
            typeof formatValue === "function" ? formatValue(value) : value || "-",
            isBest && /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-yellow-500 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) })
          ] })
        },
        hotel.id
      );
    })
  ] });
}
function BooleanBadge({ value }) {
  if (value === true) {
    return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-orange-100 text-orange-800 rounded-full text-[10px] sm:text-xs md:text-sm font-sans font-bold border-2 border-orange-300", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" }) }),
      /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: "Yes" })
    ] });
  }
  if (value === false) {
    return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-gray-100 text-gray-700 rounded-full text-[10px] sm:text-xs md:text-sm font-sans font-bold border-2 border-gray-200", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) }),
      /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: "No" })
    ] });
  }
  return /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-sans font-bold text-xs sm:text-sm", children: "-" });
}
function formatSunExposure(exposure) {
  const map = {
    "all_day": "All Day",
    "afternoon_only": "Afternoon Only",
    "morning_only": "Morning Only",
    "partial_shade": "Partial Shade",
    "mostly_shaded": "Mostly Shaded"
  };
  return map[exposure] || exposure;
}
const HotelHeaderCell = memo(function HotelHeaderCell2({ hotel }) {
  var _a;
  const isPremium = hotel.is_premium || hotel.subscription_tier === "premium";
  const isAgoda = hotel.is_agoda === true;
  return /* @__PURE__ */ jsx("th", { className: `p-2 sm:p-3 md:p-4 lg:p-5 text-center ${isPremium ? "min-w-[150px] sm:min-w-[175px] md:min-w-[220px] lg:min-w-[260px] bg-orange-50" : "min-w-[140px] sm:min-w-[160px] md:min-w-[200px] lg:min-w-[240px]"}`, children: /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 sm:space-y-2 md:space-y-3", children: [
    /* @__PURE__ */ jsx("div", { className: `overflow-hidden rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg w-full aspect-[4/3] ${isPremium ? "border-2 border-orange-400 ring-2 ring-orange-200" : "border-2 border-gray-100"}`, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: hotel.main_image_url || "/images/default-hotel.jpg",
        alt: hotel.name,
        width: 260,
        height: 195,
        className: "w-full h-full object-cover object-center",
        loading: "lazy",
        decoding: "async"
      }
    ) }),
    isAgoda ? /* @__PURE__ */ jsx("span", { className: "font-sans font-bold text-xs sm:text-sm md:text-base text-gray-900 block px-1 sm:px-2 line-clamp-2", children: hotel.name }) : /* @__PURE__ */ jsx(
      Link,
      {
        href: `/hotels/${hotel.slug}`,
        className: `font-sans font-bold text-xs sm:text-sm md:text-base hover:text-orange-600 block transition-colors duration-200 px-1 sm:px-2 line-clamp-2 ${isPremium ? "text-orange-700" : "text-gray-900"}`,
        children: hotel.name
      }
    ),
    hotel.star_rating && /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-0.5", children: [...Array(typeof hotel.star_rating === "number" ? Math.round(hotel.star_rating) : hotel.star_rating)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-yellow-400 fill-current", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "text-[9px] sm:text-[10px] md:text-xs text-gray-700 font-sans font-bold px-1 sm:px-2 flex items-center justify-center gap-1", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-500 flex-shrink-0", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" }) }),
      /* @__PURE__ */ jsx("span", { className: "truncate", children: (_a = hotel.destination) == null ? void 0 : _a.name })
    ] }),
    isAgoda && /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[8px] sm:text-[10px] font-bold border border-blue-200", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-2 h-2 sm:w-3 sm:h-3", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" }) }),
      /* @__PURE__ */ jsx("span", { children: "Estimated Scores" })
    ] }) }),
    isPremium && hotel.show_verified_badge && /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-[8px] sm:text-[10px] font-bold border border-orange-200", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-2 h-2 sm:w-3 sm:h-3", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" }) }),
      /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Verified by Hotel" }),
      /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Verified" })
    ] }) })
  ] }) });
});
const SectionHeader = memo(function SectionHeader2({ title, color }) {
  const bgColor = color === "blue" ? "bg-blue-50 border-blue-200" : "bg-orange-50 border-orange-200";
  const iconColor = color === "blue" ? "text-blue-600" : "text-orange-600";
  return /* @__PURE__ */ jsx("tr", { className: `${bgColor} border-t-2`, children: /* @__PURE__ */ jsx("td", { colSpan: 100, className: "p-2 sm:p-3 md:p-4 font-sans font-black text-gray-900", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx("svg", { className: `w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`, fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
    /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm md:text-base", children: title })
  ] }) }) });
});
const Compare = memo(HotelCompare);
export {
  Compare as default
};

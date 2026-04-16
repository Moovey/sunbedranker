import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link, Head } from "@inertiajs/react";
import { useState, useMemo, useCallback } from "react";
import { u as useAppUrl } from "./useAppUrl-B4l_DIW7.js";
import { H as Header } from "./Header-IxKzTBec.js";
import { F as Footer } from "./Footer-xQLxAHWv.js";
const Icons = {
  ChevronRight: () => /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 text-orange-400", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M9 5l7 7-7 7" }) }),
  ChevronDown: ({ className = "w-5 h-5 text-gray-500" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }),
  Location: ({ className = "w-4 h-4 sm:w-5 sm:h-5 text-orange-500" }) => /* @__PURE__ */ jsx("svg", { className, fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" }) }),
  Star: ({ className = "w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" }) => /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
  Verified: ({ className = "w-3.5 h-3.5" }) => /* @__PURE__ */ jsx("svg", { className, fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
  ChevronLeft: () => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 sm:w-6 sm:h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }),
  ChevronRightNav: () => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 sm:w-6 sm:h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }),
  Pool: ({ className = "w-6 h-6 sm:w-7 sm:h-7 text-blue-600" }) => /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2zM22 16.3c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36s-.78.13-1.15.36c-.47.27-1.09.64-2.2.64v-2c.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36v2zM8.67 12c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.12-.07.26-.15.41-.23L10.48 5C10.26 4.42 9.69 4 9 4H6l3.89 8.4c.26.07.54.1.78.1z" }) }),
  Amenities: ({ className = "w-6 h-6 sm:w-7 sm:h-7 text-green-600" }) => /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M7.5 21H2V9l10-7 10 7v12h-5.5M7.5 21v-6.5a2.5 2.5 0 015 0V21M7.5 21h5" }) }),
  Rules: ({ className = "w-6 h-6 sm:w-7 sm:h-7 text-red-600" }) => /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" }) }),
  Towel: ({ className = "w-6 h-6 sm:w-7 sm:h-7 text-purple-600" }) => /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2V9h-2V7h4v10z" }) }),
  FAQ: ({ className = "w-6 h-6 sm:w-7 sm:h-7 text-orange-500" }) => /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" }) }),
  Gallery: ({ className = "w-5 h-5 sm:w-6 sm:h-6 text-gray-700" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
  Phone: ({ className = "w-4 h-4 sm:w-5 sm:h-5 text-gray-400" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
  Email: ({ className = "w-4 h-4 sm:w-5 sm:h-5 text-gray-400" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
  Address: ({ className = "w-4 h-4 sm:w-5 sm:h-5 text-gray-400" }) => /* @__PURE__ */ jsxs("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
  ] }),
  Website: ({ className = "w-4 h-4 sm:w-5 sm:h-5 text-gray-400" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" }) }),
  Booking: () => /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M3 21h18M9 8h6M9 8V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3M9 8H5a2 2 0 0 0-2 2v11M15 8h4a2 2 0 0 1 2 2v11", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
  Shade: ({ className = "w-5 h-5 sm:w-6 sm:h-6 text-purple-500" }) => /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3.5 19.5L2 21l8-4-6-6-4 8 1.5 1.5zM19 3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2z" }) }),
  Music: ({ className = "w-5 h-5 sm:w-6 sm:h-6 text-pink-500" }) => /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" }) }),
  Sunbed: ({ className = "w-5 h-5 sm:w-6 sm:h-6 text-amber-600" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
  Sun: ({ className = "w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
  Check: ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }),
  Accessibility: ({ className = "w-5 h-5 sm:w-6 sm:h-6 text-blue-600" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
  Kids: ({ className = "w-5 h-5 sm:w-6 sm:h-6 text-green-600" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
  Luxury: ({ className = "w-5 h-5 sm:w-6 sm:h-6 text-amber-600" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
  Cleanliness: ({ className = "w-5 h-5 sm:w-6 sm:h-6 text-teal-600" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
  Atmosphere: ({ className = "w-5 h-5 sm:w-6 sm:h-6 text-pink-600" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
  Facilities: ({ className = "w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.707 2.707 0 003 15.546M12 6.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 3v2.25m0 0l2.25 9.75H9.75L12 5.25z", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
  PoolSize: ({ className = "w-5 h-5 sm:w-6 sm:h-6 text-blue-600" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
  Money: ({ className = "w-5 h-5" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }),
  Plane: ({ className = "w-4 h-4 sm:w-5 sm:h-5" }) => /* @__PURE__ */ jsx("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
};
const FaqItem = ({ question, answer, isOpen, onClick }) => /* @__PURE__ */ jsxs("div", { className: "border-b border-orange-100 last:border-b-0", children: [
  /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      className: "w-full px-4 py-4 flex items-center justify-between bg-white hover:bg-orange-50 transition-colors",
      children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900 text-left", children: question }),
        /* @__PURE__ */ jsx(
          Icons.ChevronDown,
          {
            className: `w-5 h-5 text-orange-500 transform transition-transform ${isOpen ? "rotate-180" : ""}`
          }
        )
      ]
    }
  ),
  isOpen && /* @__PURE__ */ jsx("div", { className: "px-4 py-4 bg-orange-50/50", children: /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: answer }) })
] });
const VerifiedBadge = ({ text = "Verified" }) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full", children: [
  /* @__PURE__ */ jsx(Icons.Verified, { className: "w-3 h-3" }),
  text
] });
function Breadcrumb({ hotel }) {
  return /* @__PURE__ */ jsx("div", { className: "bg-white border-b-2 border-gray-100", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4", children: /* @__PURE__ */ jsxs("nav", { className: "text-xs sm:text-sm lg:text-base text-gray-600 font-sans flex items-center flex-wrap gap-2", children: [
    /* @__PURE__ */ jsx(Link, { href: "/", className: "hover:text-orange-600 transition-colors duration-300 font-semibold", children: "Home" }),
    /* @__PURE__ */ jsx(Icons.ChevronRight, {}),
    /* @__PURE__ */ jsx(Link, { href: `/destinations/${hotel.destination.slug}`, className: "hover:text-orange-600 transition-colors duration-300 font-semibold", children: hotel.destination.name }),
    /* @__PURE__ */ jsx(Icons.ChevronRight, {}),
    /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-bold", children: hotel.name })
  ] }) }) });
}
function HotelHeader({ hotel }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-6 sm:mb-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-gray-900 mb-3 sm:mb-4", children: hotel.name }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 sm:gap-4 flex-wrap", children: [
      hotel.star_rating && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex gap-0.5", children: [...Array(hotel.star_rating)].map((_, i) => /* @__PURE__ */ jsx(Icons.Star, { className: "w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" }, i)) }),
        /* @__PURE__ */ jsxs("span", { className: "text-gray-700 font-sans font-bold text-sm sm:text-base", children: [
          hotel.star_rating,
          " Star Hotel"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600 font-sans font-semibold text-sm sm:text-base", children: [
        /* @__PURE__ */ jsx(Icons.Location, { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-500" }),
        /* @__PURE__ */ jsx("span", { children: hotel.destination.name })
      ] }),
      hotel.subscription_tier === "premium" && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs sm:text-sm font-sans font-bold border border-orange-200", children: [
        /* @__PURE__ */ jsx(Icons.Verified, {}),
        "Verified"
      ] })
    ] })
  ] });
}
function ImageGallery({ allImages, activeImageIndex, hotelName, onPrevImage, onNextImage, isPremium = false }) {
  const heightClass = isPremium ? "h-80 sm:h-96 md:h-[32rem] lg:h-[40rem] xl:h-[48rem]" : "h-64 sm:h-80 md:h-96 lg:h-[28rem]";
  return /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: `relative ${heightClass} rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-100`, children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: allImages[activeImageIndex] || "/images/default-hotel.jpg",
        alt: hotelName,
        className: "w-full h-full object-cover"
      }
    ),
    isPremium && /* @__PURE__ */ jsxs("div", { className: "absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 animate-pulse z-10", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" }) }),
      "PREMIUM"
    ] }),
    allImages.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onPrevImage,
          className: "absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-all duration-300 backdrop-blur-sm",
          "aria-label": "Previous image",
          children: /* @__PURE__ */ jsx(Icons.ChevronLeft, {})
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onNextImage,
          className: "absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/70 transition-all duration-300 backdrop-blur-sm",
          "aria-label": "Next image",
          children: /* @__PURE__ */ jsx(Icons.ChevronRightNav, {})
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/60 text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm font-sans backdrop-blur-sm", children: [
        activeImageIndex + 1,
        " / ",
        allImages.length
      ] })
    ] })
  ] }) });
}
function MapAndScoreColumn({ hotel }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    hotel.latitude && hotel.longitude && /* @__PURE__ */ jsx("div", { className: "h-40 sm:h-48 lg:h-52 xl:h-56 2xl:h-64 rounded-xl overflow-hidden shadow-lg", children: /* @__PURE__ */ jsx(
      "iframe",
      {
        width: "100%",
        height: "100%",
        frameBorder: "0",
        style: { border: 0 },
        src: `https://maps.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=15&output=embed`,
        allowFullScreen: true,
        loading: "lazy",
        referrerPolicy: "no-referrer-when-downgrade"
      }
    ) }),
    hotel.overall_score && /* @__PURE__ */ jsx(ScoreCard, { hotel })
  ] });
}
function ScoreCard({ hotel }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl shadow-2xl p-5 sm:p-6 lg:p-7 xl:p-8 text-white border-2 border-orange-400", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-base sm:text-lg lg:text-xl xl:text-2xl font-sans font-bold mb-3 lg:mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
      "Pool & Sun Score"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-sans font-black mb-4 lg:mb-5", children: [
      hotel.overall_score,
      /* @__PURE__ */ jsx("span", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-orange-200", children: "/10" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2 lg:space-y-3", children: [
      hotel.family_score && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs sm:text-sm lg:text-base xl:text-lg font-sans", children: [
        /* @__PURE__ */ jsx("span", { className: "text-orange-100 font-semibold", children: "Family" }),
        /* @__PURE__ */ jsxs("span", { className: "font-black", children: [
          hotel.family_score,
          "/10"
        ] })
      ] }),
      hotel.quiet_score && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs sm:text-sm font-sans", children: [
        /* @__PURE__ */ jsx("span", { className: "text-orange-100 font-semibold", children: "Quiet Sun" }),
        /* @__PURE__ */ jsxs("span", { className: "font-black", children: [
          hotel.quiet_score,
          "/10"
        ] })
      ] }),
      hotel.party_score && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs sm:text-sm font-sans", children: [
        /* @__PURE__ */ jsx("span", { className: "text-orange-100 font-semibold", children: "Party Vibe" }),
        /* @__PURE__ */ jsxs("span", { className: "font-black", children: [
          hotel.party_score,
          "/10"
        ] })
      ] })
    ] })
  ] });
}
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
};
const isYouTubeUrl = (url) => {
  return url && (url.includes("youtube.com") || url.includes("youtu.be"));
};
function SpecialOfferBanner({ hotel }) {
  const promotions = hotel.active_promotions && hotel.active_promotions.length > 0 ? hotel.active_promotions : hotel.promotional_banner || hotel.special_offer ? [{
    promotional_banner: hotel.promotional_banner,
    special_offer: hotel.special_offer,
    special_offer_expires_at: hotel.special_offer_expires_at
  }] : [];
  const activePromotions = promotions.filter((promo) => {
    return promo.promotional_banner || promo.special_offer;
  });
  if (activePromotions.length === 0) {
    return null;
  }
  if (activePromotions.length === 1) {
    const promo = activePromotions[0];
    return /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-xl mb-4 shadow-md relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-1/2 w-16 h-16 bg-white/10 rounded-full -mb-8" }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex flex-wrap items-center gap-x-4 gap-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🎉" }),
          /* @__PURE__ */ jsx("span", { className: "font-bold text-sm", children: "Special Offer" })
        ] }),
        promo.promotional_banner && /* @__PURE__ */ jsx("span", { className: "bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-sm", children: promo.promotional_banner }),
        promo.special_offer && /* @__PURE__ */ jsx("span", { className: "text-white/90 text-sm", children: promo.special_offer }),
        promo.special_offer_expires_at && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs text-white/80 ml-auto", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
          "Valid until ",
          new Date(promo.special_offer_expires_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mb-4 space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🎉" }),
      /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-800", children: "Current Offers & Promotions" }),
      /* @__PURE__ */ jsxs("span", { className: "bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold", children: [
        activePromotions.length,
        " Active"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: activePromotions.map((promo, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-xl shadow-md relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8" }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex flex-wrap items-center gap-x-4 gap-y-2", children: [
            promo.promotional_banner && /* @__PURE__ */ jsx("span", { className: "bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-sm", children: promo.promotional_banner }),
            promo.special_offer && /* @__PURE__ */ jsx("span", { className: "text-white/90 text-sm", children: promo.special_offer }),
            promo.special_offer_expires_at && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs text-white/80 ml-auto", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
              "Valid until ",
              new Date(promo.special_offer_expires_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
            ] })
          ] })
        ]
      },
      index
    )) })
  ] });
}
function HeroEnhancedFeatures({ hotel, onBookingClick }) {
  const hasVideoContent = hotel.video_url || hotel.video_360_url;
  const hasDirectBooking = hotel.direct_booking_url;
  if (!hasVideoContent && !hasDirectBooking) {
    return null;
  }
  const handleDirectClick = (e) => {
    e.preventDefault();
    if (onBookingClick) {
      onBookingClick("direct");
    }
    window.open(hotel.direct_booking_url, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ jsx("div", { className: "mt-6 sm:mt-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
    hotel.video_url && /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl overflow-hidden shadow-lg", children: isYouTubeUrl(hotel.video_url) && getYouTubeVideoId(hotel.video_url) ? /* @__PURE__ */ jsx("div", { className: "aspect-video", children: /* @__PURE__ */ jsx(
      "iframe",
      {
        src: `https://www.youtube.com/embed/${getYouTubeVideoId(hotel.video_url)}`,
        title: "Pool Video Tour",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true,
        className: "w-full h-full"
      }
    ) }) : /* @__PURE__ */ jsxs(
      "a",
      {
        href: hotel.video_url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex flex-col items-center justify-center p-6 text-white hover:bg-white/10 transition-colors h-full",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-2", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) }) }),
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Watch Video Tour" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-white/80", children: "See our pool area" })
        ]
      }
    ) }),
    hotel.video_360_url && /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl overflow-hidden shadow-lg", children: isYouTubeUrl(hotel.video_360_url) && getYouTubeVideoId(hotel.video_360_url) ? /* @__PURE__ */ jsx("div", { className: "aspect-video", children: /* @__PURE__ */ jsx(
      "iframe",
      {
        src: `https://www.youtube.com/embed/${getYouTubeVideoId(hotel.video_360_url)}`,
        title: "360° Virtual Tour",
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; vr",
        allowFullScreen: true,
        className: "w-full h-full"
      }
    ) }) : /* @__PURE__ */ jsxs(
      "a",
      {
        href: hotel.video_360_url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex flex-col items-center justify-center p-6 text-white hover:bg-white/10 transition-colors h-full",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-2", children: /* @__PURE__ */ jsx("svg", { className: "w-7 h-7", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" }) }) }),
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: "360° Virtual Tour" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-white/80", children: "Explore in immersive 360°" })
        ]
      }
    ) }),
    hasDirectBooking && /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleDirectClick,
        className: "bg-white border-2 border-orange-300 rounded-2xl p-5 shadow-lg flex items-center gap-4 hover:bg-orange-50 transition-all group hover:shadow-xl text-left",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx("svg", { className: "w-7 h-7 text-orange-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold block text-orange-600", children: "Visit Hotel Website" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "Book direct for best rates" })
          ] })
        ]
      }
    )
  ] }) });
}
function HeroSection({ hotel, allImages, activeImageIndex, onPrevImage, onNextImage, onBookingClick }) {
  const isPremium = hotel.is_premium;
  return /* @__PURE__ */ jsx("div", { className: "bg-white border-b border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10", children: [
    /* @__PURE__ */ jsx(HotelHeader, { hotel }),
    /* @__PURE__ */ jsx(SpecialOfferBanner, { hotel }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6", children: [
      /* @__PURE__ */ jsx(
        ImageGallery,
        {
          allImages,
          activeImageIndex,
          hotelName: hotel.name,
          onPrevImage,
          onNextImage,
          isPremium
        }
      ),
      /* @__PURE__ */ jsx(MapAndScoreColumn, { hotel })
    ] }),
    /* @__PURE__ */ jsx(HeroEnhancedFeatures, { hotel, onBookingClick })
  ] }) });
}
function SunbedAvailabilitySection({ poolCriteria }) {
  if (!(poolCriteria == null ? void 0 : poolCriteria.sunbed_count) && !(poolCriteria == null ? void 0 : poolCriteria.sunbed_to_guest_ratio) && !(poolCriteria == null ? void 0 : poolCriteria.sunbed_types)) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Sunbed, { className: "w-5 h-5 sm:w-6 sm:h-6 text-orange-500" }),
      "Sunbed Availability"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      poolCriteria.sunbed_count && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-orange-600", children: poolCriteria.sunbed_count }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-700", children: "Total Sunbeds" })
      ] }),
      poolCriteria.sunbed_to_guest_ratio && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-orange-600", children: poolCriteria.sunbed_to_guest_ratio }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-700", children: "Sunbed Ratio" })
      ] }),
      poolCriteria.sunbed_types && poolCriteria.sunbed_types.length > 0 && /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 lg:col-span-1", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-gray-900 mb-2", children: "Sunbed Types:" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: poolCriteria.sunbed_types.map((type, i) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium capitalize", children: type.replace("_", " ") }, i)) })
      ] })
    ] })
  ] });
}
function SunExposureSection({ poolCriteria }) {
  var _a;
  if (!(poolCriteria == null ? void 0 : poolCriteria.sun_exposure) && (!(poolCriteria == null ? void 0 : poolCriteria.sunny_areas) || ((_a = poolCriteria == null ? void 0 : poolCriteria.sunny_areas) == null ? void 0 : _a.length) === 0)) {
    return null;
  }
  const formatSunnyArea = (area) => {
    return area.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Sun, { className: "w-5 h-5 sm:w-6 sm:h-6 text-orange-500" }),
      "Sun Exposure & Orientation"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      poolCriteria.sun_exposure && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-orange-50 rounded-lg border border-orange-200", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Sun Exposure" }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-orange-600 capitalize", children: poolCriteria.sun_exposure.replace(/_/g, " ") })
      ] }),
      poolCriteria.sunny_areas && poolCriteria.sunny_areas.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Which Areas are Sunny:" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: poolCriteria.sunny_areas.map((area, i) => /* @__PURE__ */ jsxs(
          "span",
          {
            className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium border border-orange-200",
            children: [
              /* @__PURE__ */ jsx(Icons.Sun, { className: "w-4 h-4" }),
              formatSunnyArea(area)
            ]
          },
          i
        )) })
      ] })
    ] })
  ] });
}
function TowelReservationSection({ poolCriteria }) {
  if (!(poolCriteria == null ? void 0 : poolCriteria.towel_reservation_policy) && !(poolCriteria == null ? void 0 : poolCriteria.towel_service_cost) && !(poolCriteria == null ? void 0 : poolCriteria.pool_opening_hours)) {
    return null;
  }
  const policyLabels = {
    "enforced": { label: "Strictly Enforced", icon: "🚫", color: "red" },
    "tolerated": { label: "Tolerated", icon: "😐", color: "yellow" },
    "free_for_all": { label: "Free-for-All", icon: "🤷", color: "green" }
  };
  const costLabels = {
    "included": { label: "Included", icon: "✅", color: "green" },
    "extra_cost": { label: "Extra Cost", icon: "💰", color: "yellow" },
    "deposit_required": { label: "Deposit Required", icon: "🔐", color: "orange" }
  };
  const policy = policyLabels[poolCriteria.towel_reservation_policy];
  const cost = costLabels[poolCriteria.towel_service_cost];
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Towel, { className: "w-5 h-5 sm:w-6 sm:h-6 text-purple-500" }),
      "Towel & Reservation Policy"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      policy && /* @__PURE__ */ jsxs("div", { className: `p-4 bg-${policy.color}-50 rounded-lg border border-${policy.color}-200`, children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Reservation Policy" }),
        /* @__PURE__ */ jsxs("div", { className: `text-lg font-semibold text-${policy.color}-600 flex items-center gap-2`, children: [
          /* @__PURE__ */ jsx("span", { children: policy.icon }),
          policy.label
        ] })
      ] }),
      cost && /* @__PURE__ */ jsxs("div", { className: `p-4 bg-${cost.color}-50 rounded-lg border border-${cost.color}-200`, children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Towel Service" }),
        /* @__PURE__ */ jsxs("div", { className: `text-lg font-semibold text-${cost.color}-600 flex items-center gap-2`, children: [
          /* @__PURE__ */ jsx("span", { children: cost.icon }),
          cost.label
        ] })
      ] }),
      poolCriteria.pool_opening_hours && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Pool Hours" }),
        /* @__PURE__ */ jsxs("div", { className: "text-lg font-semibold text-blue-600 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { children: "🕐" }),
          poolCriteria.pool_opening_hours
        ] })
      ] })
    ] })
  ] });
}
function PoolSizeSection({ poolCriteria }) {
  if (!(poolCriteria == null ? void 0 : poolCriteria.pool_size_category) && !(poolCriteria == null ? void 0 : poolCriteria.pool_size_sqm) && !(poolCriteria == null ? void 0 : poolCriteria.number_of_pools) && !(poolCriteria == null ? void 0 : poolCriteria.pool_types)) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.PoolSize, { className: "w-5 h-5 sm:w-6 sm:h-6 text-blue-500" }),
      "Pool Size & Variety"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      poolCriteria.pool_size_category && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Pool Size" }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-blue-600 capitalize", children: poolCriteria.pool_size_category.replace("_", " ") })
      ] }),
      poolCriteria.pool_size_sqm && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Main Pool Size" }),
        /* @__PURE__ */ jsxs("div", { className: "text-lg font-semibold text-blue-600", children: [
          poolCriteria.pool_size_sqm,
          " m²"
        ] })
      ] }),
      poolCriteria.number_of_pools && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Number of Pools" }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-blue-600", children: poolCriteria.number_of_pools })
      ] }),
      poolCriteria.pool_types && poolCriteria.pool_types.length > 0 && /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-gray-900 mb-2", children: "Pool Types:" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: poolCriteria.pool_types.map((type, i) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium capitalize", children: type.replace("_", " ") }, i)) })
      ] })
    ] })
  ] });
}
function FacilitiesSection({ poolCriteria }) {
  const hasData = (poolCriteria == null ? void 0 : poolCriteria.has_pool_bar) || (poolCriteria == null ? void 0 : poolCriteria.has_waiter_service) || (poolCriteria == null ? void 0 : poolCriteria.sunbed_types) && poolCriteria.sunbed_types.length > 0 || (poolCriteria == null ? void 0 : poolCriteria.shade_options) && poolCriteria.shade_options.length > 0 || (poolCriteria == null ? void 0 : poolCriteria.bar_distance) || (poolCriteria == null ? void 0 : poolCriteria.toilet_distance);
  if (!hasData) return null;
  const formatLabel = (value) => {
    if (!value) return "";
    return value.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };
  const getDistanceDescription = (distance) => {
    const descriptions = {
      "poolside": "Poolside",
      "adjacent": "Adjacent",
      "close": "Close (<20m)",
      "moderate": "Moderate (20-50m)",
      "far": "Far (50m+)"
    };
    return descriptions[distance] || formatLabel(distance);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Facilities, { className: "w-5 h-5 sm:w-6 sm:h-6 text-green-500" }),
      "Pool Facilities & Comfort"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      poolCriteria.sunbed_types && poolCriteria.sunbed_types.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Sunbed Types:" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: poolCriteria.sunbed_types.map((type, i) => /* @__PURE__ */ jsxs(
          "span",
          {
            className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium border border-orange-200",
            children: [
              /* @__PURE__ */ jsx(Icons.Sunbed, { className: "w-4 h-4" }),
              formatLabel(type)
            ]
          },
          i
        )) })
      ] }),
      poolCriteria.shade_options && poolCriteria.shade_options.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Shade Options:" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: poolCriteria.shade_options.map((option, i) => /* @__PURE__ */ jsxs(
          "span",
          {
            className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200",
            children: [
              /* @__PURE__ */ jsx(Icons.Shade, { className: "w-4 h-4" }),
              formatLabel(option)
            ]
          },
          i
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        poolCriteria.has_pool_bar && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200", children: [
          /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-orange-600" }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Pool Bar Available" })
        ] }),
        poolCriteria.has_waiter_service && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200", children: [
          /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-orange-600" }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Waiter Service" })
        ] })
      ] }),
      (poolCriteria.bar_distance || poolCriteria.toilet_distance) && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        poolCriteria.bar_distance && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border border-gray-200", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Distance to Bar" }),
          /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-gray-700", children: getDistanceDescription(poolCriteria.bar_distance) })
        ] }),
        poolCriteria.toilet_distance && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border border-gray-200", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Distance to Toilets" }),
          /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-gray-700", children: getDistanceDescription(poolCriteria.toilet_distance) })
        ] })
      ] })
    ] })
  ] });
}
function AtmosphereSection({ poolCriteria }) {
  const hasData = (poolCriteria == null ? void 0 : poolCriteria.atmosphere) || (poolCriteria == null ? void 0 : poolCriteria.music_level) || (poolCriteria == null ? void 0 : poolCriteria.has_entertainment) || (poolCriteria == null ? void 0 : poolCriteria.entertainment_types) && poolCriteria.entertainment_types.length > 0;
  if (!hasData) return null;
  const formatLabel = (value) => {
    if (!value) return "";
    return value.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Atmosphere, { className: "w-5 h-5 sm:w-6 sm:h-6 text-blue-500" }),
      "Noise & Atmosphere"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        poolCriteria.atmosphere && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Pool Atmosphere/Vibe" }),
          /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-blue-600 capitalize", children: formatLabel(poolCriteria.atmosphere) })
        ] }),
        poolCriteria.music_level && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-1", children: "Music Level" }),
          /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold text-blue-600 capitalize", children: formatLabel(poolCriteria.music_level) })
        ] })
      ] }),
      poolCriteria.has_entertainment && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4", children: [
          /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-blue-600" }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Has Entertainment Activities" })
        ] }),
        poolCriteria.entertainment_types && poolCriteria.entertainment_types.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Entertainment Types:" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: poolCriteria.entertainment_types.map((type, i) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200",
              children: [
                /* @__PURE__ */ jsx(Icons.Music, { className: "w-4 h-4" }),
                formatLabel(type)
              ]
            },
            i
          )) })
        ] })
      ] })
    ] })
  ] });
}
function CleanlinessSection({ poolCriteria }) {
  if (!(poolCriteria == null ? void 0 : poolCriteria.cleanliness_rating) && !(poolCriteria == null ? void 0 : poolCriteria.sunbed_condition_rating) && !(poolCriteria == null ? void 0 : poolCriteria.tiling_condition_rating)) {
    return null;
  }
  const StarRating = ({ rating, colorClass }) => /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: `w-5 h-5 ${i < rating ? colorClass : "text-gray-300"}`, fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }, i)) });
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Cleanliness, { className: "w-5 h-5 sm:w-6 sm:h-6 text-orange-500" }),
      "Cleanliness & Maintenance"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      poolCriteria.cleanliness_rating > 0 && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border border-gray-200", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-2", children: "Cleanliness" }),
        /* @__PURE__ */ jsx(StarRating, { rating: poolCriteria.cleanliness_rating, colorClass: "text-orange-500" })
      ] }),
      poolCriteria.sunbed_condition_rating > 0 && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border border-gray-200", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-2", children: "Sunbed Condition" }),
        /* @__PURE__ */ jsx(StarRating, { rating: poolCriteria.sunbed_condition_rating, colorClass: "text-orange-500" })
      ] }),
      poolCriteria.tiling_condition_rating > 0 && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-gray-50 rounded-lg border border-gray-200", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 mb-2", children: "Tiling Condition" }),
        /* @__PURE__ */ jsx(StarRating, { rating: poolCriteria.tiling_condition_rating, colorClass: "text-orange-500" })
      ] })
    ] })
  ] });
}
function AccessibilitySection({ poolCriteria }) {
  if (!(poolCriteria == null ? void 0 : poolCriteria.has_accessibility_ramp) && !(poolCriteria == null ? void 0 : poolCriteria.has_pool_hoist) && !(poolCriteria == null ? void 0 : poolCriteria.has_step_free_access) && !(poolCriteria == null ? void 0 : poolCriteria.has_elevator_to_rooftop)) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Accessibility, { className: "w-5 h-5 sm:w-6 sm:h-6 text-blue-500" }),
      "Accessibility Features"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      poolCriteria.has_accessibility_ramp && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
        /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-blue-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Accessibility Ramp" })
      ] }),
      poolCriteria.has_pool_hoist && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
        /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-blue-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Pool Hoist" })
      ] }),
      poolCriteria.has_step_free_access && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
        /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-blue-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Step-Free Access" })
      ] }),
      poolCriteria.has_elevator_to_rooftop && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
        /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-blue-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Elevator to Rooftop" })
      ] })
    ] })
  ] });
}
function KidsFeaturesSection({ poolCriteria }) {
  if (!(poolCriteria == null ? void 0 : poolCriteria.has_kids_pool) && !(poolCriteria == null ? void 0 : poolCriteria.has_splash_park) && !(poolCriteria == null ? void 0 : poolCriteria.has_waterslide) && !(poolCriteria == null ? void 0 : poolCriteria.has_lifeguard)) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Kids, { className: "w-5 h-5 sm:w-6 sm:h-6 text-blue-500" }),
      "Kids & Family Features"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      poolCriteria.has_kids_pool && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
        /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-blue-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Kids Pool" })
      ] }),
      poolCriteria.has_splash_park && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
        /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-blue-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Splash Park" })
      ] }),
      poolCriteria.has_waterslide && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
        /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-blue-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Water Slides" })
      ] }),
      poolCriteria.has_lifeguard && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200", children: [
        /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-blue-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Lifeguard on Duty" })
      ] })
    ] })
  ] });
}
function LuxuryFeaturesSection({ poolCriteria }) {
  if (!(poolCriteria == null ? void 0 : poolCriteria.has_luxury_cabanas) && !(poolCriteria == null ? void 0 : poolCriteria.has_cabana_service) && !(poolCriteria == null ? void 0 : poolCriteria.has_heated_pool) && !(poolCriteria == null ? void 0 : poolCriteria.has_jacuzzi) && !(poolCriteria == null ? void 0 : poolCriteria.has_adult_sun_terrace)) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Luxury, { className: "w-5 h-5 sm:w-6 sm:h-6 text-orange-500" }),
      "Luxury & Premium Features"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      poolCriteria.has_luxury_cabanas && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200", children: [
        /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-orange-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Luxury Cabanas" })
      ] }),
      poolCriteria.has_cabana_service && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200", children: [
        /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-orange-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Cabana Service" })
      ] }),
      poolCriteria.has_heated_pool && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200", children: [
        /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-orange-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Heated Pool" })
      ] }),
      poolCriteria.has_jacuzzi && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200", children: [
        /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-orange-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Jacuzzi" })
      ] }),
      poolCriteria.has_adult_sun_terrace && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200", children: [
        /* @__PURE__ */ jsx(Icons.Check, { className: "w-6 h-6 text-orange-600" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", children: "Adult Sun Terrace" })
      ] })
    ] })
  ] });
}
function PoolDescriptionSection({ hotel }) {
  if (!hotel.pool_description) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-blue-200", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Pool, { className: "w-6 h-6 sm:w-7 sm:h-7 text-blue-600" }),
      "About Our Pool Area"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line", children: hotel.pool_description }),
    hotel.is_verified && /* @__PURE__ */ jsx(VerifiedBadge, {})
  ] });
}
function AmenitiesDescriptionSection({ hotel }) {
  if (!hotel.amenities_description) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-green-200", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Amenities, { className: "w-6 h-6 sm:w-7 sm:h-7 text-green-600" }),
      "Pool Amenities & Services"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line", children: hotel.amenities_description }),
    hotel.is_verified && /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-green-200 flex items-center gap-2 text-green-700 text-sm font-semibold", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" }) }),
      "Verified by hotel management"
    ] })
  ] });
}
function HouseRulesSection({ hotel }) {
  if (!hotel.house_rules) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-red-200", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Rules, { className: "w-6 h-6 sm:w-7 sm:h-7 text-red-600" }),
      "Pool House Rules"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line", children: hotel.house_rules })
  ] });
}
function FaqsSection({ hotel, openFaqIndex, toggleFaq }) {
  if (!hotel.faqs || hotel.faqs.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.FAQ, { className: "w-6 h-6 sm:w-7 sm:h-7 text-orange-500" }),
      "Frequently Asked Questions"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "divide-y divide-orange-100 border-t border-orange-200", children: hotel.faqs.map((faq, index) => /* @__PURE__ */ jsx(
      FaqItem,
      {
        question: faq.question,
        answer: faq.answer,
        isOpen: openFaqIndex === index,
        onClick: () => toggleFaq(index)
      },
      index
    )) }),
    hotel.is_verified && /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-4 border-t border-gray-200 flex items-center gap-2 text-blue-600 text-sm font-semibold", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" }) }),
      "Answers provided by hotel management"
    ] })
  ] });
}
function PhotoGallerySection({ allImages, activeImageIndex, setActiveImageIndex, hotelName }) {
  if (allImages.length <= 1) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Gallery, { className: "w-5 h-5 sm:w-6 sm:h-6 text-orange-500" }),
      "Photo Gallery"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6", children: allImages.map((image, index) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          setActiveImageIndex(index);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        className: "relative h-32 sm:h-40 lg:h-44 xl:h-48 2xl:h-52 rounded-lg overflow-hidden hover:opacity-75 transition-all duration-300 group",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: image,
              alt: `${hotelName} - ${index + 1}`,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            }
          ),
          index === activeImageIndex && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border-4 border-gray-900 rounded-lg" })
        ]
      },
      index
    )) })
  ] });
}
function ReviewsSection({ hotel }) {
  if (!hotel.approved_reviews || hotel.approved_reviews.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8", children: "Guest Reviews" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-5 sm:space-y-6", children: hotel.approved_reviews.map((review) => /* @__PURE__ */ jsxs("div", { className: "border-b last:border-0 border-gray-200 pb-5 sm:pb-6 last:pb-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsx("div", { className: "font-sans font-semibold text-gray-900 text-sm sm:text-base", children: review.user.name }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-0.5", children: [...Array(review.overall_rating)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-amber-400 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) })
      ] }),
      review.title && /* @__PURE__ */ jsx("h4", { className: "font-sans font-semibold text-gray-800 mb-1 text-sm sm:text-base", children: review.title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-sans text-xs sm:text-sm mb-2", children: review.content }),
      /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm text-gray-500 font-sans", children: new Date(review.created_at).toLocaleDateString() })
    ] }, review.id)) })
  ] });
}
function BookingCard({ hotel, onBookingClick }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-lg sm:text-xl lg:text-2xl xl:text-3xl font-sans font-bold text-gray-900 mb-4 lg:mb-5 xl:mb-6 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Icons.Money, { className: "w-5 h-5 text-orange-500" }),
      "Check Prices & Book"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2 sm:space-y-3", children: [
      hotel.booking_affiliate_url && /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => onBookingClick("booking"),
          className: "w-full px-4 py-2.5 sm:py-3 lg:py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-sans font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base",
          children: [
            /* @__PURE__ */ jsx(Icons.Booking, {}),
            "Check Booking.com"
          ]
        }
      ),
      hotel.expedia_affiliate_url && /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => onBookingClick("expedia"),
          className: "w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-sans font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base",
          children: [
            /* @__PURE__ */ jsx(Icons.Plane, {}),
            "Check Expedia"
          ]
        }
      ),
      hotel.agoda_hotel_id && /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => onBookingClick("agoda"),
          className: "w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-sans font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" }) }),
            "Check Agoda"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 text-[10px] sm:text-xs text-gray-500 text-center font-sans", children: "We may earn a commission from bookings made through these links" })
  ] });
}
function PromotionalBanner({ hotel, onBookingClick }) {
  if (hotel.subscription_tier !== "premium") return null;
  return /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-5 sm:p-6 text-white", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
    /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-sans font-bold mb-2", children: "Special Offer!" }),
    /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm mb-4 opacity-90 font-sans", children: "Book directly and receive exclusive benefits" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onBookingClick("direct"),
        className: "w-full px-4 py-2 bg-white text-orange-600 font-sans font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-md text-sm",
        children: "View Offers"
      }
    )
  ] }) });
}
const getBadgeIcon = (iconName, color = "currentColor") => {
  const icons = {
    sunbed: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" }) }),
    pool: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2z" }) }),
    sun: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" }) }),
    infinity: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z" }) }),
    toprated: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" }) }),
    family: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" }) }),
    relaxed: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z" }) }),
    lively: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" }) }),
    luxury: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" }) }),
    clean: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z" }) }),
    accessible: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 6h-5.5v10.5h-3V10H5V7h14v3z" }) }),
    verified: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }),
    heated: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" }) }),
    rooftop: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" }) }),
    cabana: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" }) }),
    // Legacy mappings
    star: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" }) }),
    trophy: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" }) }),
    medal: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2z" }) }),
    water: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z" }) }),
    quiet: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z" }) }),
    party: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" }) })
  };
  return icons[iconName] || icons.toprated;
};
function HotelBadgesCard({ hotel }) {
  const badges = hotel.badges || [];
  if (badges.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-base sm:text-lg lg:text-xl xl:text-2xl font-sans font-bold text-gray-900 mb-4 lg:mb-5 xl:mb-6 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
      "Awards & Badges"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: badges.map((badge) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
        style: {
          backgroundColor: `${badge.color}15`,
          color: badge.color,
          border: `1px solid ${badge.color}30`
        },
        title: badge.description || badge.name,
        children: [
          /* @__PURE__ */ jsx("span", { style: { color: badge.color }, children: getBadgeIcon(badge.icon, badge.color) }),
          /* @__PURE__ */ jsx("span", { className: "font-sans", children: badge.name })
        ]
      },
      badge.id
    )) })
  ] });
}
function VerificationBadgeCard({ hotel }) {
  if (hotel.subscription_tier !== "premium") return null;
  return /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg p-4 border-2 border-orange-200 hover:shadow-xl transition-all duration-300", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 sm:w-10 sm:h-10 text-orange-600 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "font-sans font-semibold text-gray-900 text-sm sm:text-base", children: "Verified Profile" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-600 font-sans", children: "Information verified and regularly updated by hotel staff" })
    ] })
  ] }) });
}
function QuickStatsCard({ hotel }) {
  var _a;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-base sm:text-lg lg:text-xl xl:text-2xl font-sans font-bold text-gray-900 mb-4 lg:mb-5 xl:mb-6 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" }) }),
      "Quick Info"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      hotel.total_rooms && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs sm:text-sm font-sans", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Rooms:" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: hotel.total_rooms })
      ] }),
      ((_a = hotel.pool_criteria) == null ? void 0 : _a.number_of_pools) && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs sm:text-sm font-sans", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Pools:" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: hotel.pool_criteria.number_of_pools })
      ] }),
      hotel.view_count > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs sm:text-sm font-sans", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Profile Views:" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: hotel.view_count })
      ] }),
      hotel.review_count > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs sm:text-sm font-sans", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Reviews:" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: hotel.review_count })
      ] })
    ] })
  ] });
}
function ContactInfoCard({ hotel }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-base sm:text-lg lg:text-xl xl:text-2xl font-sans font-bold text-gray-900 mb-4 lg:mb-5 xl:mb-6 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" }) }),
      "Contact"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-xs sm:text-sm text-gray-700 font-sans", children: [
      hotel.address && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(Icons.Address, { className: "w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900 mb-1", children: "Address" }),
          hotel.address
        ] })
      ] }),
      hotel.phone && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(Icons.Phone, { className: "w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900 mb-1", children: "Phone" }),
          /* @__PURE__ */ jsx("a", { href: `tel:${hotel.phone}`, className: "text-gray-900 hover:text-gray-700 transition-colors duration-300", children: hotel.phone })
        ] })
      ] }),
      hotel.email && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(Icons.Email, { className: "w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900 mb-1", children: "Email" }),
          /* @__PURE__ */ jsx("a", { href: `mailto:${hotel.email}`, className: "text-gray-900 hover:text-gray-700 break-all transition-colors duration-300", children: hotel.email })
        ] })
      ] }),
      hotel.website && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(Icons.Website, { className: "w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900 mb-1", children: "Website" }),
          /* @__PURE__ */ jsx("a", { href: hotel.website, target: "_blank", rel: "noopener noreferrer", className: "text-orange-600 hover:text-orange-700 break-all transition-colors duration-300", children: hotel.website.replace(/^https?:\/\//, "") })
        ] })
      ] })
    ] })
  ] });
}
function Sidebar({ hotel, onBookingClick }) {
  return /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-4 lg:top-6 xl:top-8 space-y-5 sm:space-y-6 lg:space-y-7 xl:space-y-8", children: [
    /* @__PURE__ */ jsx(BookingCard, { hotel, onBookingClick }),
    /* @__PURE__ */ jsx(PromotionalBanner, { hotel, onBookingClick }),
    /* @__PURE__ */ jsx(HotelBadgesCard, { hotel }),
    /* @__PURE__ */ jsx(VerificationBadgeCard, { hotel }),
    /* @__PURE__ */ jsx(QuickStatsCard, { hotel }),
    /* @__PURE__ */ jsx(ContactInfoCard, { hotel })
  ] }) });
}
function SimilarHotelCard({ hotel }) {
  var _a;
  const isPremium = hotel.is_premium;
  const cardClasses = isPremium ? "bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border-4 border-yellow-400 hover:border-orange-400 ring-2 ring-yellow-200" : "bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-gray-100 hover:border-orange-200";
  const imageHeight = isPremium ? "h-56 sm:h-64" : "h-40 sm:h-48";
  return /* @__PURE__ */ jsxs(
    Link,
    {
      href: `/hotels/${hotel.slug}`,
      className: cardClasses,
      children: [
        /* @__PURE__ */ jsxs("div", { className: `relative ${imageHeight} overflow-hidden`, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: hotel.main_image_url || "/images/default-hotel.jpg",
              alt: hotel.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            }
          ),
          isPremium && /* @__PURE__ */ jsxs("div", { className: "absolute top-3 left-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center gap-1 animate-pulse z-10", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" }) }),
            "PREMIUM"
          ] }),
          isPremium && hotel.special_offer && /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2.5 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1 z-10", children: "🎉 OFFER" }),
          isPremium && hotel.show_verified_badge && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 left-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-2.5 py-1 rounded-full font-bold text-xs shadow-lg flex items-center gap-1 z-10", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
            "VERIFIED"
          ] }),
          hotel.overall_score && /* @__PURE__ */ jsxs("div", { className: `absolute ${isPremium ? "top-12" : "top-3"} right-3 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-sans font-bold text-sm shadow-lg`, children: [
            hotel.overall_score,
            "/10"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `p-4 ${isPremium ? "bg-gradient-to-b from-yellow-50 to-white" : ""}`, children: [
          /* @__PURE__ */ jsx("h3", { className: `font-sans font-bold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2 group-hover:text-orange-600 transition-colors ${isPremium ? "text-base sm:text-lg" : ""}`, children: hotel.name }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-gray-500 text-xs", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-orange-400", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" }) }),
            /* @__PURE__ */ jsx("span", { className: "font-sans", children: (_a = hotel.destination) == null ? void 0 : _a.name })
          ] }),
          isPremium && /* @__PURE__ */ jsx("div", { className: "mt-3 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-xs shadow-md", children: "View Pool Details →" }) })
        ] })
      ]
    }
  );
}
function SimilarHotelsSection({ similarHotels, destinationName }) {
  if (!similarHotels || similarHotels.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "mt-10 sm:mt-12 lg:mt-14 xl:mt-16", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" }) }),
      "Similar Hotels in ",
      destinationName
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8", children: similarHotels.map((similar) => /* @__PURE__ */ jsx(SimilarHotelCard, { hotel: similar }, similar.id)) })
  ] });
}
function HotelShow({ hotel, similarHotels }) {
  var _a, _b;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const appUrl = useAppUrl();
  const allImages = useMemo(() => [
    hotel.main_image_url,
    ...hotel.gallery_images_urls || []
  ].filter(Boolean), [hotel.main_image_url, hotel.gallery_images_urls]);
  const poolCriteria = hotel.pool_criteria;
  const handleBookingClick = useCallback((type) => {
    window.location.href = `/hotels/${hotel.slug}/click?type=${type}`;
  }, [hotel.slug]);
  const toggleFaq = useCallback((index) => {
    setOpenFaqIndex((prev) => prev === index ? null : index);
  }, []);
  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => prev === 0 ? allImages.length - 1 : prev - 1);
  }, [allImages.length]);
  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { title: `${hotel.name} - Pool & Sunbed Review`, children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: `Detailed pool and sunbed review of ${hotel.name} in ${((_a = hotel.destination) == null ? void 0 : _a.name) || ""}. See sunbed-to-guest ratio, sun exposure, atmosphere ratings, pool facilities, and honest traveler reviews.` }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: `${hotel.name} - Pool & Sunbed Review | Sunbed Ranker` }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: `Detailed pool and sunbed review of ${hotel.name}. See sunbed ratios, sun exposure, atmosphere ratings, and more.` }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "article" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: `${appUrl}/hotels/${hotel.slug}` }),
      hotel.main_image_url && /* @__PURE__ */ jsx("meta", { property: "og:image", content: hotel.main_image_url }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Sunbed Ranker" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: `${hotel.name} - Pool & Sunbed Review` }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: `Detailed pool review of ${hotel.name}. Sunbed ratios, facilities, and honest reviews.` }),
      hotel.main_image_url && /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: hotel.main_image_url }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: `${appUrl}/hotels/${hotel.slug}` }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": hotel.name,
        "description": `Pool and sunbed review of ${hotel.name}`,
        "url": `${appUrl}/hotels/${hotel.slug}`,
        "image": hotel.main_image_url || "",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": ((_b = hotel.destination) == null ? void 0 : _b.name) || ""
        },
        ...hotel.overall_score ? { "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": hotel.overall_score,
          "bestRating": 10,
          "worstRating": 0
        } } : {}
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx(Breadcrumb, { hotel }),
      /* @__PURE__ */ jsx(
        HeroSection,
        {
          hotel,
          allImages,
          activeImageIndex,
          onPrevImage: handlePrevImage,
          onNextImage: handleNextImage,
          onBookingClick: handleBookingClick
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-5 sm:space-y-6 lg:space-y-7 xl:space-y-8", children: [
            poolCriteria && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(SunbedAvailabilitySection, { poolCriteria }),
              /* @__PURE__ */ jsx(SunExposureSection, { poolCriteria }),
              /* @__PURE__ */ jsx(PoolSizeSection, { poolCriteria }),
              /* @__PURE__ */ jsx(TowelReservationSection, { poolCriteria }),
              /* @__PURE__ */ jsx(FacilitiesSection, { poolCriteria }),
              /* @__PURE__ */ jsx(AtmosphereSection, { poolCriteria }),
              /* @__PURE__ */ jsx(CleanlinessSection, { poolCriteria }),
              /* @__PURE__ */ jsx(AccessibilitySection, { poolCriteria }),
              /* @__PURE__ */ jsx(KidsFeaturesSection, { poolCriteria }),
              /* @__PURE__ */ jsx(LuxuryFeaturesSection, { poolCriteria })
            ] }),
            /* @__PURE__ */ jsx(PoolDescriptionSection, { hotel }),
            /* @__PURE__ */ jsx(AmenitiesDescriptionSection, { hotel }),
            /* @__PURE__ */ jsx(HouseRulesSection, { hotel }),
            /* @__PURE__ */ jsx(
              FaqsSection,
              {
                hotel,
                openFaqIndex,
                toggleFaq
              }
            ),
            /* @__PURE__ */ jsx(
              PhotoGallerySection,
              {
                allImages,
                activeImageIndex,
                setActiveImageIndex,
                hotelName: hotel.name
              }
            ),
            /* @__PURE__ */ jsx(ReviewsSection, { hotel })
          ] }),
          /* @__PURE__ */ jsx(Sidebar, { hotel, onBookingClick: handleBookingClick })
        ] }),
        /* @__PURE__ */ jsx(
          SimilarHotelsSection,
          {
            similarHotels,
            destinationName: hotel.destination.name
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  HotelShow as default
};

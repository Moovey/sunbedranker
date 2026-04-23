import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, usePage, router, Head, Link } from "@inertiajs/react";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { H as HotelierNav } from "./HotelierNav-CV4guQe6.js";
import { T as TabButton, C as CreateImagesTab, P as PoolCriteriaTab } from "./CreateImagesTab-C0s9r_iH.js";
import "browser-image-compression";
const TABS = {
  POOL: "pool",
  IMAGES: "images",
  DESCRIPTIONS: "descriptions",
  FAQS: "faqs",
  ENHANCED: "enhanced"
};
const TAB_CONFIG = [
  { key: TABS.POOL, label: "Pool Scoring", icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }) },
  { key: TABS.IMAGES, label: "Images", icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z", clipRule: "evenodd" }) }) },
  { key: TABS.DESCRIPTIONS, label: "Descriptions", icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" }) }) },
  { key: TABS.FAQS, label: "FAQs & Rules", icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" }) }) },
  { key: TABS.ENHANCED, label: "Enhanced Features", icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }), requiresEnhanced: true }
];
const getInitialFormData = (hotel) => ({
  main_image: null,
  gallery_images: [],
  pool_description: hotel.pool_description || "",
  amenities_description: hotel.amenities_description || "",
  house_rules: hotel.house_rules || "",
  towel_policy: hotel.towel_policy || "",
  faqs: hotel.faqs || [],
  // Hotel basic info needed for pool scoring calculations
  total_rooms: hotel.total_rooms || "",
  // Enhanced subscription features
  // Support multiple promotions for premium subscribers
  promotions: hotel.promotions || (hotel.promotional_banner ? [{
    promotional_banner: hotel.promotional_banner || "",
    special_offer: hotel.special_offer || "",
    special_offer_expires_at: hotel.special_offer_expires_at ? hotel.special_offer_expires_at.split("T")[0] : ""
  }] : []),
  video_url: hotel.video_url || "",
  video_360_url: hotel.video_360_url || "",
  direct_booking_url: hotel.direct_booking_url || "",
  show_verified_badge: hotel.show_verified_badge || false,
  ...getPoolCriteriaData(hotel.pool_criteria)
});
const getPoolCriteriaData = (criteria) => ({
  sunbed_count: (criteria == null ? void 0 : criteria.sunbed_count) || "",
  sun_exposure: (criteria == null ? void 0 : criteria.sun_exposure) || "",
  sunny_areas: (criteria == null ? void 0 : criteria.sunny_areas) || [],
  pool_size_sqm: (criteria == null ? void 0 : criteria.pool_size_sqm) || "",
  pool_size_category: (criteria == null ? void 0 : criteria.pool_size_category) || "",
  number_of_pools: (criteria == null ? void 0 : criteria.number_of_pools) || 1,
  pool_types: (criteria == null ? void 0 : criteria.pool_types) || [],
  towel_reservation_policy: (criteria == null ? void 0 : criteria.towel_reservation_policy) || "",
  towel_service_cost: (criteria == null ? void 0 : criteria.towel_service_cost) || "",
  pool_opening_hours: (criteria == null ? void 0 : criteria.pool_opening_hours) || "",
  sunbed_types: (criteria == null ? void 0 : criteria.sunbed_types) || [],
  shade_options: (criteria == null ? void 0 : criteria.shade_options) || [],
  has_pool_bar: (criteria == null ? void 0 : criteria.has_pool_bar) || false,
  has_waiter_service: (criteria == null ? void 0 : criteria.has_waiter_service) || false,
  bar_distance: (criteria == null ? void 0 : criteria.bar_distance) || "",
  toilet_distance: (criteria == null ? void 0 : criteria.toilet_distance) || "",
  atmosphere: (criteria == null ? void 0 : criteria.atmosphere) || "",
  music_level: (criteria == null ? void 0 : criteria.music_level) || "",
  has_entertainment: (criteria == null ? void 0 : criteria.has_entertainment) || false,
  entertainment_types: (criteria == null ? void 0 : criteria.entertainment_types) || [],
  cleanliness_rating: (criteria == null ? void 0 : criteria.cleanliness_rating) ? Math.round(Number(criteria.cleanliness_rating)) : "",
  sunbed_condition_rating: (criteria == null ? void 0 : criteria.sunbed_condition_rating) ? Math.round(Number(criteria.sunbed_condition_rating)) : "",
  tiling_condition_rating: (criteria == null ? void 0 : criteria.tiling_condition_rating) ? Math.round(Number(criteria.tiling_condition_rating)) : "",
  has_accessibility_ramp: (criteria == null ? void 0 : criteria.has_accessibility_ramp) || false,
  has_pool_hoist: (criteria == null ? void 0 : criteria.has_pool_hoist) || false,
  has_step_free_access: (criteria == null ? void 0 : criteria.has_step_free_access) || false,
  has_elevator_to_rooftop: (criteria == null ? void 0 : criteria.has_elevator_to_rooftop) || false,
  has_kids_pool: (criteria == null ? void 0 : criteria.has_kids_pool) || false,
  kids_pool_depth_m: (criteria == null ? void 0 : criteria.kids_pool_depth_m) || "",
  has_splash_park: (criteria == null ? void 0 : criteria.has_splash_park) || false,
  has_waterslide: (criteria == null ? void 0 : criteria.has_waterslide) || false,
  has_lifeguard: (criteria == null ? void 0 : criteria.has_lifeguard) || false,
  lifeguard_hours: (criteria == null ? void 0 : criteria.lifeguard_hours) || "",
  has_luxury_cabanas: (criteria == null ? void 0 : criteria.has_luxury_cabanas) || false,
  has_cabana_service: (criteria == null ? void 0 : criteria.has_cabana_service) || false,
  has_heated_pool: (criteria == null ? void 0 : criteria.has_heated_pool) || false,
  has_jacuzzi: (criteria == null ? void 0 : criteria.has_jacuzzi) || false,
  has_adult_sun_terrace: (criteria == null ? void 0 : criteria.has_adult_sun_terrace) || false
});
const StatusBadge = ({ isActive, isVerified }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
  isActive && /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700", children: "Active" }),
  isVerified && /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700", children: "Verified" })
] });
const InfoBanner = () => /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-6 bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 sm:gap-3", children: [
  /* @__PURE__ */ jsx("div", { className: "w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" }) }) }),
  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-xs sm:text-sm font-semibold text-gray-900 mb-1", children: "What you can edit" }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "As the verified owner, you can update pool & sun-related information, upload images, add descriptions, and manage FAQs & house rules. Basic hotel details are managed by our admin team." })
  ] })
] }) });
const ValidationErrorsBox = ({ errors }) => {
  const normalizedErrors = {};
  Object.entries(errors).forEach(([field, messages]) => {
    if (Array.isArray(messages)) {
      normalizedErrors[field] = messages[0];
    } else if (typeof messages === "string") {
      normalizedErrors[field] = messages;
    } else if (messages && typeof messages === "object") {
      normalizedErrors[field] = JSON.stringify(messages);
    }
  });
  const errorCount = Object.keys(normalizedErrors).length;
  if (errorCount === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: "mb-6 bg-red-50 border border-red-200 rounded-xl p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-red-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-sm font-semibold text-red-800 mb-2", children: [
        errorCount,
        " error",
        errorCount > 1 ? "s" : "",
        " found"
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: Object.entries(normalizedErrors).map(([field, message]) => /* @__PURE__ */ jsxs("li", { className: "text-xs text-red-600", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-medium capitalize", children: [
          field.replace(/_/g, " "),
          ":"
        ] }),
        " ",
        message
      ] }, field)) })
    ] })
  ] }) });
};
const DescriptionField = ({ title, icon, description, value, onChange, error, colorScheme, rows = 6, placeholder }) => {
  const colors = {
    blue: { bg: "bg-blue-50", border: "border-blue-100", title: "text-gray-900", focus: "focus:ring-orange-500 focus:border-orange-500" },
    orange: { bg: "bg-orange-50", border: "border-orange-100", title: "text-gray-900", focus: "focus:ring-orange-500 focus:border-orange-500" },
    gray: { bg: "bg-gray-50", border: "border-gray-100", title: "text-gray-900", focus: "focus:ring-orange-500 focus:border-orange-500" }
  };
  const scheme = colors[colorScheme];
  return /* @__PURE__ */ jsxs("div", { className: `${scheme.bg} rounded-xl p-3 sm:p-4 md:p-5 border ${scheme.border}`, children: [
    /* @__PURE__ */ jsxs("h3", { className: `text-xs sm:text-sm font-semibold ${scheme.title} mb-2 flex items-center gap-1.5 sm:gap-2`, children: [
      icon,
      " ",
      title
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-2 sm:mb-3", children: description }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        value,
        onChange: (e) => onChange(e.target.value),
        rows,
        className: `w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm ${scheme.focus}`,
        placeholder
      }
    ),
    error && /* @__PURE__ */ jsx("p", { className: "mt-2 text-red-600 text-xs", children: error })
  ] });
};
const PromotionItem = ({ promotion, index, onUpdate, onRemove, canRemove }) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-3 sm:p-4 mb-2 sm:mb-3 border border-gray-200", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2 sm:mb-3", children: [
    /* @__PURE__ */ jsxs("span", { className: "px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700", children: [
      "Promotion #",
      index + 1
    ] }),
    canRemove && /* @__PURE__ */ jsx("button", { type: "button", onClick: onRemove, className: "text-red-500 hover:text-red-700 text-xs font-medium", children: "Remove" })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "space-y-2 sm:space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Banner Text" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: promotion.promotional_banner,
          onChange: (e) => onUpdate(index, "promotional_banner", e.target.value),
          className: "w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:ring-orange-500 focus:border-orange-500",
          placeholder: "e.g., Early Bird Special - Book Direct & Save 15%",
          maxLength: 255
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Offer Details" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: promotion.special_offer,
          onChange: (e) => onUpdate(index, "special_offer", e.target.value),
          rows: 2,
          className: "w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:ring-orange-500 focus:border-orange-500",
          placeholder: "Describe your special offer in detail...",
          maxLength: 1e3
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Expires On" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "date",
          value: promotion.special_offer_expires_at,
          onChange: (e) => onUpdate(index, "special_offer_expires_at", e.target.value),
          className: "w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:ring-orange-500 focus:border-orange-500",
          min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        }
      )
    ] })
  ] })
] });
const FaqItem = ({ faq, index, onUpdate, onRemove }) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-3 sm:p-4 mb-2 sm:mb-3 border border-gray-200", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2 sm:mb-3", children: [
    /* @__PURE__ */ jsxs("span", { className: "px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700", children: [
      "FAQ #",
      index + 1
    ] }),
    /* @__PURE__ */ jsx("button", { type: "button", onClick: onRemove, className: "text-red-500 hover:text-red-700 text-xs font-medium", children: "Remove" })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "space-y-2 sm:space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Question" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: faq.question,
          onChange: (e) => onUpdate(index, "question", e.target.value),
          className: "w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:ring-orange-500 focus:border-orange-500",
          placeholder: "e.g., What are the pool opening hours?"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Answer" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: faq.answer,
          onChange: (e) => onUpdate(index, "answer", e.target.value),
          rows: 2,
          className: "w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:ring-orange-500 focus:border-orange-500",
          placeholder: "e.g., Our pool is open from 7:00 AM to 10:00 PM daily."
        }
      )
    ] })
  ] })
] });
const DescriptionsTab = ({ data, setData, errors }) => /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" }) }),
      "Rich Descriptions"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500 mt-1", children: "Add detailed descriptions of your pool areas and amenities." })
  ] }),
  /* @__PURE__ */ jsx(
    DescriptionField,
    {
      title: "Pool Area Description",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-blue-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2zm0-4.5c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36s-.78.13-1.15.36c-.47.27-1.09.64-2.2.64v-2c.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36v2zM8.67 12c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.12-.07.26-.15.41-.23L10.48 5C10.23 4.72 9.85 4.5 9.4 4.5c-.45 0-.83.22-1.08.5L2.5 11.39c.15.08.29.16.41.23.37.22.6.36 1.15.36s.78-.13 1.15-.36c.46-.27 1.08-.64 2.19-.64.56 0 .78.13 1.15.36.08.05.18.1.27.16l1.85-4.91 1.85 4.91c.09-.06.18-.11.27-.16z" }) }),
      description: "Describe your pool areas in detail. What makes them special? Include details about the views, surroundings, and unique features.",
      value: data.pool_description,
      onChange: (value) => setData("pool_description", value),
      error: errors.pool_description,
      colorScheme: "blue",
      placeholder: "Our stunning infinity pool overlooks the Mediterranean Sea, offering breathtaking sunset views. The main pool area features 50 premium sunbeds with padded cushions..."
    }
  ),
  /* @__PURE__ */ jsx(
    DescriptionField,
    {
      title: "Amenities Description",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M7.5 7c.83 0 1.5-.67 1.5-1.5S8.33 4 7.5 4 6 4.67 6 5.5 6.67 7 7.5 7zM11 7c.83 0 1.5-.67 1.5-1.5S11.83 4 11 4s-1.5.67-1.5 1.5S10.17 7 11 7zm3.5 0c.83 0 1.5-.67 1.5-1.5S15.33 4 14.5 4 13 4.67 13 5.5s.67 1.5 1.5 1.5zM18 7c.83 0 1.5-.67 1.5-1.5S18.83 4 18 4s-1.5.67-1.5 1.5S17.17 7 18 7zM3.5 14c.83 0 1.5-.67 1.5-1.5S4.33 11 3.5 11 2 11.67 2 12.5 2.67 14 3.5 14zm3 0c.83 0 1.5-.67 1.5-1.5S7.33 11 6.5 11 5 11.67 5 12.5 5.67 14 6.5 14zm4.5 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm3 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm4 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-11 4c.83 0 1.5-.67 1.5-1.5S7.83 15 7 15s-1.5.67-1.5 1.5S6.17 18 7 18zm4 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm4 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" }) }),
      description: "Describe the amenities and services available at your pool area. Mention any premium services, food & beverage options, and special features.",
      value: data.amenities_description,
      onChange: (value) => setData("amenities_description", value),
      error: errors.amenities_description,
      colorScheme: "orange",
      placeholder: "Our poolside bar serves refreshing cocktails and light Mediterranean cuisine throughout the day. Premium cabanas with dedicated butler service are available for booking..."
    }
  )
] });
const FaqsTab = ({ data, setData, errors, faqs, onAddFaq, onUpdateFaq, onRemoveFaq }) => /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" }) }),
      "FAQs & House Rules"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500 mt-1", children: "Add frequently asked questions and pool house rules." })
  ] }),
  /* @__PURE__ */ jsx(
    DescriptionField,
    {
      title: "Pool House Rules",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gray-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" }) }),
      description: "List the pool rules and guidelines guests should follow. Use bullet points for clarity.",
      value: data.house_rules,
      onChange: (value) => setData("house_rules", value),
      error: errors.house_rules,
      colorScheme: "gray",
      placeholder: "• No diving in shallow areas\n• Children must be supervised at all times\n• No glass containers near the pool\n• Shower before entering the pool\n• Pool towels must be returned before checkout"
    }
  ),
  /* @__PURE__ */ jsx(
    DescriptionField,
    {
      title: "Towel & Sunbed Policy Details",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-blue-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" }) }),
      description: "Provide additional details about your towel and sunbed reservation policies.",
      value: data.towel_policy,
      onChange: (value) => setData("towel_policy", value),
      error: errors.towel_policy,
      colorScheme: "blue",
      rows: 4,
      placeholder: "Towels are provided free of charge at the pool. A €10 deposit is required. Sunbeds cannot be reserved before 8am. Unoccupied sunbeds with towels only will be cleared after 30 minutes..."
    }
  ),
  /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 rounded-xl p-3 sm:p-4 md:p-5 border border-orange-100", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" }) }),
      "Frequently Asked Questions"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-3 sm:mb-4", children: "Add common questions and answers about your pool area." }),
    faqs.map((faq, index) => /* @__PURE__ */ jsx(
      FaqItem,
      {
        faq,
        index,
        onUpdate: onUpdateFaq,
        onRemove: () => onRemoveFaq(index)
      },
      index
    )),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onAddFaq,
        className: "w-full py-2 border border-dashed border-orange-300 rounded-lg text-orange-600 text-xs sm:text-sm font-medium hover:bg-orange-50 transition-colors",
        children: "+ Add FAQ"
      }
    )
  ] })
] });
const EnhancedFeaturesTab = ({ data, setData, errors, hasEnhanced, hasPremium, promotions, onAddPromotion, onUpdatePromotion, onRemovePromotion }) => {
  if (!hasEnhanced) {
    return /* @__PURE__ */ jsx("div", { className: "space-y-4 sm:space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 border border-orange-200 rounded-xl p-5 sm:p-6 md:p-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 sm:w-6 sm:h-6 text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-2", children: "Enhanced Features" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 max-w-md mx-auto", children: "Upgrade to unlock promotional banners, video content, direct booking links, and more." }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("hotelier.subscription"),
          className: "inline-block px-3 sm:px-4 py-2 bg-orange-500 text-white font-medium text-xs sm:text-sm rounded-lg hover:bg-orange-600 transition-colors",
          children: "Upgrade Now"
        }
      )
    ] }) });
  }
  const maxPromotions = hasPremium ? 10 : 1;
  const canAddMore = promotions.length < maxPromotions;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14L2 9.27l6.91-1.01L12 2z" }) }),
        "Enhanced Features"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500 mt-1", children: "Add promotional content, videos, and direct booking links." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 rounded-xl p-3 sm:p-4 md:p-5 border border-orange-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2 sm:mb-3 gap-2", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xs sm:text-sm font-semibold text-gray-900 flex items-center gap-1.5 sm:gap-2", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" }) }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: "Promotions & Offers" })
        ] }),
        hasPremium && /* @__PURE__ */ jsx("span", { className: "px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700 flex-shrink-0", children: "Premium" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mb-3 sm:mb-4", children: [
        "Create banners and special offers to attract more guests.",
        hasPremium && " You can run up to 10 promotions."
      ] }),
      promotions.map((promotion, index) => /* @__PURE__ */ jsx(
        PromotionItem,
        {
          promotion,
          index,
          onUpdate: onUpdatePromotion,
          onRemove: () => onRemovePromotion(index),
          canRemove: promotions.length > 1 || promotion.promotional_banner === "" && promotion.special_offer === ""
        },
        index
      )),
      errors.promotions && /* @__PURE__ */ jsx("p", { className: "mt-2 text-red-600 text-xs", children: errors.promotions }),
      canAddMore ? /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: onAddPromotion,
          className: "w-full py-2 border border-dashed border-orange-300 rounded-lg text-orange-600 text-xs sm:text-sm font-medium hover:bg-orange-50 transition-colors",
          children: [
            "+ Add Promotion ",
            hasPremium && `(${promotions.length}/${maxPromotions})`
          ]
        }
      ) : /* @__PURE__ */ jsx("div", { className: "text-center py-2 text-gray-500 text-xs", children: hasPremium ? `Maximum ${maxPromotions} promotions reached` : /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx(Link, { href: route("hotelier.subscription"), className: "text-orange-600 font-medium hover:underline", children: "Upgrade to Premium" }),
        " for multiple promotions"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-xl p-3 sm:p-4 md:p-5 border border-blue-100", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18 3.99H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 14.01H6V5.99h12v12.01zM9.5 13l2.5 3.01L14.5 13l3.5 4.51H6z" }) }),
        "Videos & 360° Content"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-3 sm:mb-4", children: "Add video tours and 360° content to give guests an immersive preview." }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Video URL" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "url",
              value: data.video_url,
              onChange: (e) => setData("video_url", e.target.value),
              className: "w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:ring-orange-500 focus:border-orange-500",
              placeholder: "https://www.youtube.com/watch?v=..."
            }
          ),
          errors.video_url && /* @__PURE__ */ jsx("p", { className: "mt-1 text-red-600 text-xs", children: errors.video_url })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "360° Virtual Tour URL" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "url",
              value: data.video_360_url,
              onChange: (e) => setData("video_360_url", e.target.value),
              className: "w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:ring-orange-500 focus:border-orange-500",
              placeholder: "https://my360tour.com/hotel-pool-tour"
            }
          ),
          errors.video_360_url && /* @__PURE__ */ jsx("p", { className: "mt-1 text-red-600 text-xs", children: errors.video_360_url })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-3 sm:p-4 md:p-5 border border-gray-100", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" }) }),
        "Direct Booking Link"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-3 sm:mb-4", children: "Add a link to your direct booking engine to encourage direct bookings." }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Direct Booking URL" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            value: data.direct_booking_url,
            onChange: (e) => setData("direct_booking_url", e.target.value),
            className: "w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:ring-orange-500 focus:border-orange-500",
            placeholder: "https://your-hotel.com/book"
          }
        ),
        errors.direct_booking_url && /* @__PURE__ */ jsx("p", { className: "mt-1 text-red-600 text-xs", children: errors.direct_booking_url })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-xl p-3 sm:p-4 md:p-5 border border-blue-100", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" }) }),
        '"Verified by Hotel" Badge'
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-3 sm:mb-4", children: "Display a trust badge on your profile indicating verified information." }),
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 sm:gap-3 cursor-pointer group", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-shrink-0", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: data.show_verified_badge,
              onChange: (e) => setData("show_verified_badge", e.target.checked),
              className: "sr-only peer"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "w-9 h-5 sm:w-10 sm:h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 transition-colors" }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-0.5 top-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm text-gray-700 font-medium", children: 'Show "Verified by Hotel" badge on my profile' })
      ] }),
      data.show_verified_badge && /* @__PURE__ */ jsxs("div", { className: "mt-2 sm:mt-3 p-2 bg-white rounded-lg border border-blue-200 inline-flex items-center gap-1.5 sm:gap-2", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-blue-800 font-medium text-xs", children: "Verified by Hotel" })
      ] })
    ] })
  ] });
};
const FormActions = ({ processing }) => /* @__PURE__ */ jsxs("div", { className: "mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end", children: [
  /* @__PURE__ */ jsx(
    Link,
    {
      href: route("hotelier.claims.index"),
      className: "px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-xs sm:text-sm transition-colors text-center",
      children: "Back to My Hotels"
    }
  ),
  /* @__PURE__ */ jsx(
    "button",
    {
      type: "submit",
      disabled: processing,
      className: "px-3 sm:px-4 py-2 bg-orange-500 text-white font-medium text-xs sm:text-sm rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
      children: processing ? "Saving..." : "Save Changes"
    }
  )
] });
function ManageHotel({ hotel, flash, subscription, errors: serverErrors = {} }) {
  const getInitialTab = () => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    const validTabs = Object.values(TABS);
    return validTabs.includes(tab) ? tab : TABS.POOL;
  };
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [faqs, setFaqs] = useState(hotel.faqs || []);
  const [validationErrors, setValidationErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const { data, setData, errors: formErrors } = useForm(getInitialFormData(hotel));
  const { props } = usePage();
  const hasEnhanced = (subscription == null ? void 0 : subscription.hasEnhanced) || false;
  const hasPremium = (subscription == null ? void 0 : subscription.hasPremium) || false;
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url.toString());
  };
  const [promotions, setPromotions] = useState(() => {
    const initialPromotions = hotel.promotions || (hotel.promotional_banner ? [{
      promotional_banner: hotel.promotional_banner || "",
      special_offer: hotel.special_offer || "",
      special_offer_expires_at: hotel.special_offer_expires_at ? hotel.special_offer_expires_at.split("T")[0] : ""
    }] : [{ promotional_banner: "", special_offer: "", special_offer_expires_at: "" }]);
    return initialPromotions;
  });
  const pageErrors = (props == null ? void 0 : props.errors) || {};
  const allErrors = {
    ...serverErrors,
    ...pageErrors,
    ...formErrors,
    ...validationErrors
  };
  const hasErrors = Object.keys(allErrors).length > 0;
  const addFaq = useCallback(() => {
    const newFaqs = [...faqs, { question: "", answer: "" }];
    setFaqs(newFaqs);
    setData("faqs", newFaqs);
  }, [faqs, setData]);
  const updateFaq = useCallback((index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
    setData("faqs", newFaqs);
  }, [faqs, setData]);
  const removeFaq = useCallback((index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
    setData("faqs", newFaqs);
  }, [faqs, setData]);
  const addPromotion = useCallback(() => {
    const newPromotions = [...promotions, { promotional_banner: "", special_offer: "", special_offer_expires_at: "" }];
    setPromotions(newPromotions);
    setData("promotions", newPromotions);
  }, [promotions, setData]);
  const updatePromotion = useCallback((index, field, value) => {
    const newPromotions = [...promotions];
    newPromotions[index][field] = value;
    setPromotions(newPromotions);
    setData("promotions", newPromotions);
  }, [promotions, setData]);
  const removePromotion = useCallback((index) => {
    const newPromotions = promotions.filter((_, i) => i !== index);
    const finalPromotions = newPromotions.length === 0 ? [{ promotional_banner: "", special_offer: "", special_offer_expires_at: "" }] : newPromotions;
    setPromotions(finalPromotions);
    setData("promotions", finalPromotions);
  }, [promotions, setData]);
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setValidationErrors({});
    setProcessing(true);
    router.post(route("hotelier.hotels.update", hotel.slug), data, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: (page) => {
        var _a, _b, _c;
        setProcessing(false);
        const responseErrors = ((_a = page == null ? void 0 : page.props) == null ? void 0 : _a.errors) || {};
        if (Object.keys(responseErrors).length > 0) {
          setValidationErrors(responseErrors);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        setData((prev) => ({ ...prev, main_image: null, gallery_images: [] }));
        toast.success(((_c = (_b = page == null ? void 0 : page.props) == null ? void 0 : _b.flash) == null ? void 0 : _c.success) || "Hotel updated successfully!");
      },
      onError: (errors) => {
        setProcessing(false);
        setValidationErrors(errors || {});
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  }, [data, hotel.slug]);
  const handleDeleteImage = useCallback((imagePath) => {
    router.delete(route("hotelier.hotels.deleteImage", { hotel: hotel.slug }), {
      data: { image_path: imagePath },
      preserveScroll: true,
      onSuccess: (page) => {
        var _a, _b;
        toast.success(((_b = (_a = page == null ? void 0 : page.props) == null ? void 0 : _a.flash) == null ? void 0 : _b.success) || "Image deleted successfully!");
      }
    });
  }, [hotel.slug]);
  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.POOL:
        return /* @__PURE__ */ jsx(PoolCriteriaTab, { data, setData, errors: allErrors });
      case TABS.IMAGES:
        return /* @__PURE__ */ jsx(CreateImagesTab, { data, setData, errors: allErrors, hotel, onDeleteImage: handleDeleteImage });
      case TABS.DESCRIPTIONS:
        return /* @__PURE__ */ jsx(DescriptionsTab, { data, setData, errors: allErrors });
      case TABS.FAQS:
        return /* @__PURE__ */ jsx(
          FaqsTab,
          {
            data,
            setData,
            errors: allErrors,
            faqs,
            onAddFaq: addFaq,
            onUpdateFaq: updateFaq,
            onRemoveFaq: removeFaq
          }
        );
      case TABS.ENHANCED:
        return /* @__PURE__ */ jsx(
          EnhancedFeaturesTab,
          {
            data,
            setData,
            errors: allErrors,
            hasEnhanced,
            hasPremium,
            promotions,
            onAddPromotion: addPromotion,
            onUpdatePromotion: updatePromotion,
            onRemovePromotion: removePromotion
          }
        );
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Manage ${hotel.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(HotelierNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start sm:items-center gap-2 sm:gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("hotelier.claims.index"),
                className: "text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0 mt-1 sm:mt-0",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" }) })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxs("h1", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate", children: [
                "Manage ",
                hotel.name
              ] }),
              /* @__PURE__ */ jsx(StatusBadge, { status: hotel.claim_status })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm ml-6 sm:ml-8", children: "Update your hotel's pool area information and features" })
        ] }),
        /* @__PURE__ */ jsx(InfoBanner, {}),
        hasErrors && /* @__PURE__ */ jsx(ValidationErrorsBox, { errors: allErrors }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-t-xl border-b border-gray-200 shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "flex gap-0.5 sm:gap-1 px-2 sm:px-4 pt-2 sm:pt-4 overflow-x-auto scrollbar-hide", children: TAB_CONFIG.map(({ key, label, icon, requiresEnhanced }) => /* @__PURE__ */ jsxs(
            TabButton,
            {
              active: activeTab === key,
              onClick: () => handleTabChange(key),
              className: `whitespace-nowrap text-xs sm:text-sm ${requiresEnhanced && !hasEnhanced ? "opacity-75" : ""}`,
              children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 sm:gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "hidden xs:inline [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5", children: icon }),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: label })
                ] }),
                requiresEnhanced && !hasEnhanced && /* @__PURE__ */ jsx("svg", { className: "ml-0.5 sm:ml-1 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" }) })
              ]
            },
            key
          )) }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-b-xl shadow-sm p-3 sm:p-4 md:p-5 lg:p-6 border border-gray-100 border-t-0", children: [
            renderTabContent(),
            /* @__PURE__ */ jsx(FormActions, { processing })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ManageHotel as default
};

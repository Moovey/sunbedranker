import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, usePage, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import "react-toastify";
import { A as AdminNav } from "./AdminNav-CrCSn0RD.js";
import { T as TabButton, P as PoolCriteriaTab, C as CreateImagesTab } from "./CreateImagesTab-DBKaZguG.js";
import { C as CreateAffiliateTab, a as ContactLocationTab, b as CreateBasicInfoTab } from "./CreateAffiliateTab-DeZNWyRP.js";
import "browser-image-compression";
import "react-leaflet";
import "leaflet";
const TAB_FIELDS = {
  basic: ["name", "destination_id", "city_name", "country_code", "description", "star_rating", "total_rooms"],
  contact: ["address", "latitude", "longitude", "phone", "email", "website"],
  images: ["main_image", "gallery_images"],
  pool: ["sunbed_count", "sun_exposure", "pool_size_category", "pool_size_sqm", "number_of_pools"],
  affiliate: ["booking_affiliate_url", "expedia_affiliate_url", "agoda_hotel_id", "affiliate_provider", "affiliate_tracking_code"]
};
const INITIAL_FORM_DATA = {
  // Basic Info
  name: "",
  destination_id: "",
  city_name: "",
  country_code: "",
  description: "",
  star_rating: "",
  total_rooms: "",
  // Contact & Location
  address: "",
  latitude: "",
  longitude: "",
  phone: "",
  email: "",
  website: "",
  // Images
  main_image: null,
  gallery_images: [],
  // Affiliate Links
  booking_affiliate_url: "",
  expedia_affiliate_url: "",
  agoda_hotel_id: "",
  affiliate_provider: "",
  affiliate_tracking_code: "",
  // Pool Criteria - Required
  sunbed_count: "",
  sun_exposure: "",
  pool_size_category: "",
  // Pool Criteria - Optional
  pool_size_sqm: "",
  number_of_pools: 1,
  pool_types: [],
  sunbed_types: [],
  sunny_areas: [],
  towel_reservation_policy: "",
  towel_service_cost: "",
  pool_opening_hours: "",
  shade_options: [],
  bar_distance: "",
  toilet_distance: "",
  atmosphere: "",
  music_level: "",
  entertainment_types: [],
  cleanliness_rating: "",
  sunbed_condition_rating: "",
  tiling_condition_rating: "",
  lifeguard_hours: "",
  kids_pool_depth_m: "",
  // Pool Criteria - Boolean flags
  has_pool_bar: false,
  has_waiter_service: false,
  has_entertainment: false,
  has_accessibility_ramp: false,
  has_pool_hoist: false,
  has_step_free_access: false,
  has_elevator_to_rooftop: false,
  has_kids_pool: false,
  has_splash_park: false,
  has_waterslide: false,
  has_lifeguard: false,
  has_luxury_cabanas: false,
  has_cabana_service: false,
  has_heated_pool: false,
  has_jacuzzi: false,
  has_adult_sun_terrace: false
};
function CreateHotel({ destinations, stats, errors: serverErrors = {}, oldInput = {} }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [validationErrors, setValidationErrors] = useState({});
  const { data, setData, post, processing, errors: formErrors } = useForm({
    ...INITIAL_FORM_DATA,
    ...oldInput
    // Restore old input if validation failed
  });
  const { props } = usePage();
  const tabs = ["basic", "contact", "images", "pool", "affiliate"];
  const pageErrors = (props == null ? void 0 : props.errors) || {};
  const allErrors = {
    ...serverErrors,
    ...pageErrors,
    ...formErrors,
    ...validationErrors
  };
  const hasErrors = Object.keys(allErrors).length > 0;
  const goToNextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };
  const goToPrevTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };
  const getTabWithError = (errorFields) => {
    for (const [tab, fields] of Object.entries(TAB_FIELDS)) {
      if (errorFields.some((field) => fields.includes(field) || field.includes(tab))) {
        return tab;
      }
    }
    return "basic";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors({});
    post(route("admin.hotels.store"), {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: (page) => {
        var _a;
        const responseErrors = ((_a = page == null ? void 0 : page.props) == null ? void 0 : _a.errors) || {};
        if (Object.keys(responseErrors).length > 0) {
          setValidationErrors(responseErrors);
          const errorKeys = Object.keys(responseErrors);
          setActiveTab(getTabWithError(errorKeys));
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      },
      onError: (errors) => {
        setValidationErrors(errors || {});
        const errorKeys = Object.keys(errors || {});
        if (errorKeys.length > 0) {
          setActiveTab(getTabWithError(errorKeys));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    });
  };
  const isLastTab = activeTab === "affiliate";
  const isFirstTab = activeTab === "basic";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Add New Hotel" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, { stats }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: "Add New Hotel" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm mt-1", children: "Create a new hotel listing" })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.hotels.index"),
              className: "inline-flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base",
              children: "← Back to Hotels"
            }
          )
        ] }),
        hasErrors && /* @__PURE__ */ jsx(ValidationErrorsBox, { errors: allErrors }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [
          /* @__PURE__ */ jsx(TabNavigation, { activeTab, setActiveTab }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-b-xl shadow-sm p-3 sm:p-4 md:p-6 border border-gray-100 border-t-0", children: [
            /* @__PURE__ */ jsx(
              TabContent,
              {
                activeTab,
                data,
                setData,
                errors: allErrors,
                destinations
              }
            ),
            /* @__PURE__ */ jsx(
              ActionButtons,
              {
                isFirstTab,
                isLastTab,
                processing,
                onPrevTab: goToPrevTab,
                onNextTab: goToNextTab
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
function ValidationErrorsBox({ errors }) {
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
  return /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-6 bg-red-50 border border-red-300 rounded-xl p-3 sm:p-4 md:p-5 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 sm:h-6 sm:w-6 text-red-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "ml-3 sm:ml-4 flex-1", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-sm sm:text-base font-semibold text-red-800 mb-1.5 sm:mb-2", children: [
        "Validation Failed - ",
        errorCount,
        " error",
        errorCount > 1 ? "s" : "",
        " found"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg p-2.5 sm:p-3 md:p-4 border border-red-200", children: /* @__PURE__ */ jsx("ul", { className: "space-y-1.5 sm:space-y-2", children: Object.entries(normalizedErrors).map(([field, message]) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-red-700", children: [
        /* @__PURE__ */ jsx("span", { className: "text-red-500 flex-shrink-0", children: "•" }),
        /* @__PURE__ */ jsxs("span", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-medium capitalize text-red-800", children: [
            field.replace(/_/g, " "),
            ":"
          ] }),
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-red-600 break-words", children: message })
        ] })
      ] }, field)) }) })
    ] })
  ] }) });
}
function TabNavigation({ activeTab, setActiveTab }) {
  const tabConfig = [
    { id: "basic", label: "Basic Info" },
    { id: "contact", label: "Contact & Location" },
    { id: "images", label: "Images" },
    { id: "pool", label: "Pool Scoring" },
    { id: "affiliate", label: "Affiliate Links" }
  ];
  return /* @__PURE__ */ jsx("div", { className: "bg-gray-50 rounded-t-xl border border-gray-100 border-b-0 shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "flex gap-0.5 sm:gap-1 px-2 sm:px-3 md:px-4 pt-3 sm:pt-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100", children: tabConfig.map((tab) => /* @__PURE__ */ jsx(
    TabButton,
    {
      active: activeTab === tab.id,
      onClick: () => setActiveTab(tab.id),
      children: tab.label
    },
    tab.id
  )) }) });
}
function TabContent({ activeTab, data, setData, errors, destinations }) {
  const tabComponents = {
    basic: /* @__PURE__ */ jsx(CreateBasicInfoTab, { data, setData, errors, destinations }),
    contact: /* @__PURE__ */ jsx(ContactLocationTab, { data, setData, errors }),
    images: /* @__PURE__ */ jsx(CreateImagesTab, { data, setData, errors }),
    pool: /* @__PURE__ */ jsx(PoolCriteriaTab, { data, setData, errors }),
    affiliate: /* @__PURE__ */ jsx(CreateAffiliateTab, { data, setData, errors })
  };
  return tabComponents[activeTab] || null;
}
function ActionButtons({ isFirstTab, isLastTab, processing, onPrevTab, onNextTab }) {
  return /* @__PURE__ */ jsxs("div", { className: "mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between", children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("admin.hotels.index"),
        className: "px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-center text-xs sm:text-sm",
        children: "Cancel"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 sm:gap-3", children: [
      !isFirstTab && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onPrevTab,
          className: "px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-center text-xs sm:text-sm",
          children: "Previous"
        }
      ),
      !isLastTab ? /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onNextTab,
          className: "px-3 sm:px-4 py-2 sm:py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors text-center text-xs sm:text-sm",
          children: "Next"
        }
      ) : /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: "px-3 sm:px-4 py-2 sm:py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors text-center text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed",
          children: processing ? "Creating..." : "Create Hotel"
        }
      )
    ] })
  ] });
}
export {
  CreateHotel as default
};

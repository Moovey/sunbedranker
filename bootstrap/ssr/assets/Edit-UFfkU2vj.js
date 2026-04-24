import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, usePage, Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { A as AdminNav } from "./AdminNav-Dpi9gSoo.js";
import { T as TabButton, C as CreateImagesTab, P as PoolCriteriaTab } from "./CreateImagesTab-BZ8H15It.js";
import { C as CreateAffiliateTab, a as ContactLocationTab, b as CreateBasicInfoTab } from "./CreateAffiliateTab-CZo9L-jr.js";
import "browser-image-compression";
import "react-leaflet";
import "leaflet";
/* empty css                        */
const TAB_FIELDS = {
  basic: ["name", "destination_id", "city_name", "country_code", "description", "top_tip", "review_intelligence", "star_rating", "total_rooms"],
  contact: ["address", "latitude", "longitude", "phone", "email", "website"],
  images: ["main_image", "gallery_images"],
  pool: ["sunbed_count", "sun_exposure", "pool_size_category", "pool_size_sqm", "number_of_pools"],
  affiliate: ["booking_affiliate_url", "expedia_affiliate_url", "agoda_hotel_id", "affiliate_provider", "affiliate_tracking_code"]
};
const buildFormData = (hotel) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M;
  return {
    // Basic Info
    name: hotel.name || "",
    destination_id: hotel.destination_id || "",
    city_name: "",
    country_code: ((_a = hotel.destination) == null ? void 0 : _a.country_code) || "",
    description: hotel.description || "",
    top_tip: hotel.top_tip || "",
    review_intelligence: hotel.review_intelligence || "",
    star_rating: hotel.star_rating || "",
    total_rooms: hotel.total_rooms || "",
    // Contact & Location
    address: hotel.address || "",
    latitude: hotel.latitude || "",
    longitude: hotel.longitude || "",
    phone: hotel.phone || "",
    email: hotel.email || "",
    website: hotel.website || "",
    // Images
    main_image: null,
    gallery_images: [],
    // Videos (one or more). Pre-populated from hotel.videos_resolved which
    // merges the legacy hotel.video_url with the hotel.videos JSON array.
    // We keep the RAW values (paths or URLs as stored) — these get sent back
    // when saving, so removed entries can be deleted from R2 storage.
    videos: Array.isArray(hotel.videos_resolved) ? hotel.videos_resolved.map((v) => v.raw) : Array.isArray(hotel.videos) ? [...hotel.videos] : [],
    video_files: [],
    _video_url_draft: "",
    // Affiliate Links
    booking_affiliate_url: hotel.booking_affiliate_url || "",
    expedia_affiliate_url: hotel.expedia_affiliate_url || "",
    agoda_hotel_id: hotel.agoda_hotel_id || "",
    affiliate_provider: hotel.affiliate_provider || "",
    affiliate_tracking_code: hotel.affiliate_tracking_code || "",
    // Settings
    is_active: hotel.is_active || false,
    is_verified: hotel.is_verified || false,
    is_featured: hotel.is_featured || false,
    subscription_tier: hotel.subscription_tier || "free",
    subscription_expires_at: hotel.subscription_expires_at || "",
    override_name: hotel.override_name || false,
    override_images: hotel.override_images || false,
    override_description: hotel.override_description || false,
    // Pool Criteria
    sunbed_count: ((_b = hotel.pool_criteria) == null ? void 0 : _b.sunbed_count) || "",
    sun_exposure: ((_c = hotel.pool_criteria) == null ? void 0 : _c.sun_exposure) || "",
    pool_size_category: ((_d = hotel.pool_criteria) == null ? void 0 : _d.pool_size_category) || "",
    pool_size_sqm: ((_e = hotel.pool_criteria) == null ? void 0 : _e.pool_size_sqm) || "",
    number_of_pools: ((_f = hotel.pool_criteria) == null ? void 0 : _f.number_of_pools) || 1,
    pool_types: ((_g = hotel.pool_criteria) == null ? void 0 : _g.pool_types) || [],
    sunbed_types: ((_h = hotel.pool_criteria) == null ? void 0 : _h.sunbed_types) || [],
    sunny_areas: ((_i = hotel.pool_criteria) == null ? void 0 : _i.sunny_areas) || [],
    towel_reservation_policy: ((_j = hotel.pool_criteria) == null ? void 0 : _j.towel_reservation_policy) || "",
    towel_service_cost: ((_k = hotel.pool_criteria) == null ? void 0 : _k.towel_service_cost) || "",
    pool_opening_hours: ((_l = hotel.pool_criteria) == null ? void 0 : _l.pool_opening_hours) || "",
    shade_options: ((_m = hotel.pool_criteria) == null ? void 0 : _m.shade_options) || [],
    bar_distance: ((_n = hotel.pool_criteria) == null ? void 0 : _n.bar_distance) || "",
    toilet_distance: ((_o = hotel.pool_criteria) == null ? void 0 : _o.toilet_distance) || "",
    atmosphere: ((_p = hotel.pool_criteria) == null ? void 0 : _p.atmosphere) || "",
    music_level: ((_q = hotel.pool_criteria) == null ? void 0 : _q.music_level) || "",
    entertainment_types: ((_r = hotel.pool_criteria) == null ? void 0 : _r.entertainment_types) || [],
    cleanliness_rating: ((_s = hotel.pool_criteria) == null ? void 0 : _s.cleanliness_rating) ? Math.round(Number(hotel.pool_criteria.cleanliness_rating)) : "",
    sunbed_condition_rating: ((_t = hotel.pool_criteria) == null ? void 0 : _t.sunbed_condition_rating) ? Math.round(Number(hotel.pool_criteria.sunbed_condition_rating)) : "",
    tiling_condition_rating: ((_u = hotel.pool_criteria) == null ? void 0 : _u.tiling_condition_rating) ? Math.round(Number(hotel.pool_criteria.tiling_condition_rating)) : "",
    lifeguard_hours: ((_v = hotel.pool_criteria) == null ? void 0 : _v.lifeguard_hours) || "",
    kids_pool_depth_m: ((_w = hotel.pool_criteria) == null ? void 0 : _w.kids_pool_depth_m) || "",
    // Pool Criteria - Boolean flags
    has_pool_bar: ((_x = hotel.pool_criteria) == null ? void 0 : _x.has_pool_bar) || false,
    has_waiter_service: ((_y = hotel.pool_criteria) == null ? void 0 : _y.has_waiter_service) || false,
    has_entertainment: ((_z = hotel.pool_criteria) == null ? void 0 : _z.has_entertainment) || false,
    has_accessibility_ramp: ((_A = hotel.pool_criteria) == null ? void 0 : _A.has_accessibility_ramp) || false,
    has_pool_hoist: ((_B = hotel.pool_criteria) == null ? void 0 : _B.has_pool_hoist) || false,
    has_step_free_access: ((_C = hotel.pool_criteria) == null ? void 0 : _C.has_step_free_access) || false,
    has_elevator_to_rooftop: ((_D = hotel.pool_criteria) == null ? void 0 : _D.has_elevator_to_rooftop) || false,
    has_kids_pool: ((_E = hotel.pool_criteria) == null ? void 0 : _E.has_kids_pool) || false,
    has_splash_park: ((_F = hotel.pool_criteria) == null ? void 0 : _F.has_splash_park) || false,
    has_waterslide: ((_G = hotel.pool_criteria) == null ? void 0 : _G.has_waterslide) || false,
    has_lifeguard: ((_H = hotel.pool_criteria) == null ? void 0 : _H.has_lifeguard) || false,
    has_luxury_cabanas: ((_I = hotel.pool_criteria) == null ? void 0 : _I.has_luxury_cabanas) || false,
    has_cabana_service: ((_J = hotel.pool_criteria) == null ? void 0 : _J.has_cabana_service) || false,
    has_heated_pool: ((_K = hotel.pool_criteria) == null ? void 0 : _K.has_heated_pool) || false,
    has_jacuzzi: ((_L = hotel.pool_criteria) == null ? void 0 : _L.has_jacuzzi) || false,
    has_adult_sun_terrace: ((_M = hotel.pool_criteria) == null ? void 0 : _M.has_adult_sun_terrace) || false
  };
};
function EditHotel({ hotel, destinations, badges, stats, errors: serverErrors = {}, oldInput = {} }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [validationErrors, setValidationErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const { data, setData, errors: formErrors } = useForm({
    ...buildFormData(hotel),
    ...oldInput
    // Restore old input if validation failed
  });
  const { props } = usePage();
  useEffect(() => {
    var _a;
    if ((_a = props == null ? void 0 : props.flash) == null ? void 0 : _a.success) {
      toast.success(props.flash.success);
    }
  }, []);
  const tabs = ["basic", "contact", "images", "pool", "affiliate"];
  const pageErrors = (props == null ? void 0 : props.errors) || {};
  const allErrors = {
    ...serverErrors,
    ...pageErrors,
    ...formErrors,
    ...validationErrors
  };
  const hasErrors = Object.keys(allErrors).length > 0;
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
    setProcessing(true);
    router.post(route("admin.hotels.update", hotel.id), data, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: (page) => {
        var _a, _b, _c;
        setProcessing(false);
        const responseErrors = ((_a = page == null ? void 0 : page.props) == null ? void 0 : _a.errors) || {};
        if (Object.keys(responseErrors).length > 0) {
          setValidationErrors(responseErrors);
          const errorKeys = Object.keys(responseErrors);
          setActiveTab(getTabWithError(errorKeys));
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        if ((_c = (_b = page == null ? void 0 : page.props) == null ? void 0 : _b.flash) == null ? void 0 : _c.success) {
          toast.success(page.props.flash.success);
        }
      },
      onError: (errors) => {
        setProcessing(false);
        setValidationErrors(errors || {});
        const errorKeys = Object.keys(errors || {});
        if (errorKeys.length > 0) {
          setActiveTab(getTabWithError(errorKeys));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit ${hotel.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, { stats }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full sm:w-auto", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start sm:items-center gap-2 sm:gap-3 mb-1 flex-wrap", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight break-words", children: hotel.name }),
              /* @__PURE__ */ jsx(HotelStatusBadges, { hotel })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs sm:text-sm font-light", children: "Edit hotel details and settings" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap w-full sm:w-auto", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("hotels.show", hotel.slug),
                target: "_blank",
                className: "flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium shadow-sm hover:shadow ring-1 ring-orange-600/10 transition-all text-xs sm:text-sm whitespace-nowrap text-center",
                children: "View Public Page"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("admin.hotels.index"),
                className: "w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 border border-slate-200 bg-white text-slate-700 rounded-lg hover:bg-slate-100 hover:border-slate-300 font-medium shadow-sm transition-all text-xs sm:text-sm text-center",
                children: "← Back"
              }
            )
          ] })
        ] }),
        hasErrors && /* @__PURE__ */ jsx(ValidationErrorsBox, { errors: allErrors }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [
          /* @__PURE__ */ jsx(TabNavigation, { activeTab, setActiveTab }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-b-2xl shadow-sm p-3 sm:p-4 md:p-6 border border-slate-200 border-t-0", children: [
            /* @__PURE__ */ jsx(
              TabContent,
              {
                activeTab,
                data,
                setData,
                errors: allErrors,
                destinations,
                hotel
              }
            ),
            /* @__PURE__ */ jsx(
              ActionButtons,
              {
                isFirstTab: activeTab === "basic",
                isLastTab: activeTab === "affiliate",
                processing,
                onPrevTab: () => {
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
                },
                onNextTab: () => {
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
                },
                alwaysShowSave: true
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
function HotelStatusBadges({ hotel }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2 flex-wrap", children: [
    /* @__PURE__ */ jsx("span", { className: `px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-full font-medium ${hotel.subscription_tier === "premium" ? "bg-purple-100 text-purple-700" : hotel.subscription_tier === "enhanced" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`, children: hotel.subscription_tier }),
    hotel.is_active && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-green-600 font-medium", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5 sm:w-3 sm:h-3", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }),
      "Active"
    ] }),
    hotel.is_verified && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-blue-600 font-medium", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5 sm:w-3 sm:h-3", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" }) }),
      "Verified"
    ] }),
    hotel.is_featured && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-orange-600 font-medium", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5 sm:w-3 sm:h-3", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
      "Featured"
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
  return /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-6 bg-red-50/70 border border-red-200 rounded-2xl p-3 sm:p-4 md:p-5 shadow-sm ring-1 ring-red-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 sm:h-6 sm:w-6 text-red-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "ml-3 sm:ml-4 flex-1", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-sm sm:text-base font-semibold text-red-800 mb-1.5 sm:mb-2 tracking-tight", children: [
        "Validation Failed — ",
        errorCount,
        " error",
        errorCount > 1 ? "s" : "",
        " found"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg p-2.5 sm:p-3 md:p-4 border border-red-200/70", children: /* @__PURE__ */ jsx("ul", { className: "space-y-1.5 sm:space-y-2", children: Object.entries(normalizedErrors).map(([field, message]) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-red-700", children: [
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
    { id: "images", label: "Images & Video" },
    { id: "pool", label: "Pool Scoring" },
    { id: "affiliate", label: "Affiliate Links" }
  ];
  return /* @__PURE__ */ jsx("div", { className: "bg-slate-50/80 backdrop-blur rounded-t-2xl border border-slate-200 border-b-0 shadow-sm", children: /* @__PURE__ */ jsx("div", { className: "flex gap-0.5 sm:gap-1 px-2 sm:px-3 md:px-4 pt-3 sm:pt-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100", children: tabConfig.map((tab) => /* @__PURE__ */ jsx(
    TabButton,
    {
      active: activeTab === tab.id,
      onClick: () => setActiveTab(tab.id),
      children: tab.label
    },
    tab.id
  )) }) });
}
function TabContent({ activeTab, data, setData, errors, destinations, hotel }) {
  const handleDeleteImage = (imagePath) => {
    var _a;
    fetch(route("admin.hotels.delete-gallery-image", { hotel: hotel.id }), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": (_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.content,
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({ image_path: imagePath })
    }).then((res) => res.json()).then((data2) => {
      if (data2.success) {
        toast.success(data2.message || "Image deleted successfully!");
        router.reload({ only: ["hotel"], preserveScroll: true });
      } else {
        toast.error(data2.message || "Failed to delete image.");
      }
    }).catch(() => toast.error("Failed to delete image."));
  };
  const tabComponents = {
    basic: /* @__PURE__ */ jsx(CreateBasicInfoTab, { data, setData, errors, destinations }),
    contact: /* @__PURE__ */ jsx(ContactLocationTab, { data, setData, errors }),
    images: /* @__PURE__ */ jsx(CreateImagesTab, { data, setData, errors, hotel, onDeleteImage: handleDeleteImage, hotelId: hotel.id }),
    pool: /* @__PURE__ */ jsx(PoolCriteriaTab, { data, setData, errors }),
    affiliate: /* @__PURE__ */ jsx(CreateAffiliateTab, { data, setData, errors })
  };
  return tabComponents[activeTab] || null;
}
function ActionButtons({ isFirstTab, isLastTab, processing, onPrevTab, onNextTab, alwaysShowSave = false }) {
  return /* @__PURE__ */ jsxs("div", { className: "mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between", children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("admin.hotels.index"),
        className: "px-3 sm:px-4 py-2 sm:py-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg hover:bg-slate-100 hover:border-slate-300 font-medium shadow-sm transition-all text-center text-xs sm:text-sm",
        children: "Cancel"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 sm:gap-3", children: [
      !isFirstTab && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onPrevTab,
          className: "px-3 sm:px-4 py-2 sm:py-2.5 border border-slate-200 bg-white text-slate-700 rounded-lg hover:bg-slate-100 hover:border-slate-300 font-medium shadow-sm transition-all text-center text-xs sm:text-sm",
          children: "Previous"
        }
      ),
      !isLastTab && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onNextTab,
          className: "px-4 sm:px-5 py-2 sm:py-2.5 bg-white border border-orange-300 text-orange-600 font-medium rounded-lg hover:bg-orange-50 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:ring-offset-2 transition-all text-center text-xs sm:text-sm",
          children: "Next →"
        }
      ),
      (alwaysShowSave || isLastTab) && /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: "px-4 sm:px-5 py-2 sm:py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 shadow-sm hover:shadow ring-1 ring-orange-600/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:ring-offset-2 transition-all text-center text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
          children: processing ? "Updating..." : "Update Hotel"
        }
      )
    ] })
  ] });
}
export {
  EditHotel as default
};

import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { usePage, useForm, Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { A as AdminNav } from "./AdminNav-Dpi9gSoo.js";
const STAR_OPTIONS = [
  { value: "", label: "All Stars" },
  { value: "1", label: "1 Star" },
  { value: "2", label: "2 Stars" },
  { value: "3", label: "3 Stars" },
  { value: "4", label: "4 Stars" },
  { value: "5", label: "5 Stars" }
];
const PROMOTED_OPTIONS = [
  { value: "", label: "All Hotels" },
  { value: "no", label: "Not Promoted" },
  { value: "yes", label: "Promoted" }
];
const PROMOTE_MODE_BADGE = {
  restored: {
    label: "Restored",
    className: "bg-emerald-100 text-emerald-800 border border-emerald-200"
  },
  relinked: {
    label: "Re-linked",
    className: "bg-blue-100 text-blue-800 border border-blue-200"
  },
  promoted: {
    label: "Promoted",
    className: "bg-indigo-100 text-indigo-800 border border-indigo-200"
  }
};
function DirectoryIndex({
  hotels,
  countries,
  accommodationTypes,
  totalCount,
  promotedCount,
  bulkPromoteProgress,
  filters,
  stats
}) {
  var _a;
  const { flash } = usePage().props;
  const promoteBadge = PROMOTE_MODE_BADGE[flash == null ? void 0 : flash.promote_mode] || null;
  useEffect(() => {
    if (flash == null ? void 0 : flash.success) toast.success(flash.success);
    if (flash == null ? void 0 : flash.error) toast.error(flash.error);
  }, [flash]);
  const [filterState, setFilterState] = useState({
    search: filters.search || "",
    country: filters.country || "",
    star_rating: filters.star_rating || "",
    accommodation_type: filters.accommodation_type || "",
    promoted: filters.promoted || ""
  });
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [showBulkPromoteModal, setShowBulkPromoteModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailHotel, setDetailHotel] = useState(null);
  const [liveBulkProgress, setLiveBulkProgress] = useState(bulkPromoteProgress);
  const promoteForm = useForm({});
  const bulkForm = useForm({
    country: filters.country || "",
    star_rating: "",
    accommodation_type: "",
    limit: 500
  });
  const [bulkMatching, setBulkMatching] = useState(null);
  const [bulkPreviewLoading, setBulkPreviewLoading] = useState(false);
  useEffect(() => {
    const isActive = liveBulkProgress && !["idle", "completed", "failed"].includes(liveBulkProgress.status);
    if (!isActive) return;
    const poll = () => {
      fetch(route("admin.directory.bulk-promote.progress"), {
        headers: { "X-Requested-With": "XMLHttpRequest", "Accept": "application/json" },
        credentials: "same-origin"
      }).then((r) => r.json()).then((data) => {
        setLiveBulkProgress(data);
        if (data.status === "completed") {
          toast.success(`Bulk promote done. Created/linked: ${data.created}. Failed: ${data.failed}.`);
          router.reload({ only: ["hotels", "totalCount", "promotedCount"] });
        } else if (data.status === "failed") {
          toast.error("Bulk promote failed: " + (data.message || "Unknown error"));
        }
      }).catch(() => {
      });
    };
    poll();
    const interval = setInterval(poll, 2500);
    return () => clearInterval(interval);
  }, [liveBulkProgress == null ? void 0 : liveBulkProgress.status]);
  useEffect(() => {
    var _a2;
    if (!showBulkPromoteModal || !bulkForm.data.country) {
      setBulkMatching(null);
      return;
    }
    setBulkPreviewLoading(true);
    const token = (_a2 = document.cookie.match(/XSRF-TOKEN=([^;]+)/)) == null ? void 0 : _a2[1];
    const t = setTimeout(() => {
      fetch(route("admin.directory.bulk-promote.preview"), {
        method: "POST",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": token ? decodeURIComponent(token) : ""
        },
        credentials: "same-origin",
        body: JSON.stringify({
          country: bulkForm.data.country,
          star_rating: bulkForm.data.star_rating || null,
          accommodation_type: bulkForm.data.accommodation_type || null
        })
      }).then((r) => r.json()).then((data) => setBulkMatching(data.matching ?? 0)).catch(() => setBulkMatching(null)).finally(() => setBulkPreviewLoading(false));
    }, 350);
    return () => clearTimeout(t);
  }, [showBulkPromoteModal, bulkForm.data.country, bulkForm.data.star_rating, bulkForm.data.accommodation_type]);
  const updateFilter = (key, value) => {
    setFilterState((prev) => ({ ...prev, [key]: value }));
  };
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route("admin.directory.index"), filterState, {
      preserveState: true,
      replace: true
    });
  };
  const clearFilters = () => {
    setFilterState({ search: "", country: "", star_rating: "", accommodation_type: "", promoted: "" });
    router.get(route("admin.directory.index"));
  };
  const openPromoteModal = (hotel) => {
    setSelectedHotel(hotel);
    setShowPromoteModal(true);
  };
  const handlePromote = (e) => {
    e.preventDefault();
    promoteForm.post(route("admin.directory.promote", selectedHotel.id), {
      onSuccess: () => {
        setShowPromoteModal(false);
        setSelectedHotel(null);
      }
    });
  };
  const handleBulkPromote = (e) => {
    e.preventDefault();
    bulkForm.post(route("admin.directory.bulk-promote"), {
      preserveScroll: true,
      onSuccess: () => {
        setShowBulkPromoteModal(false);
        setLiveBulkProgress({ status: "queued", processed: 0, total: 0, created: 0, failed: 0, message: "Bulk promotion queued..." });
      },
      onError: (errors) => {
        if (errors.bulk) toast.error(errors.bulk);
        else if (errors.country) toast.error(errors.country);
        else toast.error("Failed to start bulk promotion.");
      }
    });
  };
  const openDetail = (hotel) => {
    fetch(route("admin.directory.show", hotel.id), {
      headers: { "X-Requested-With": "XMLHttpRequest", "Accept": "application/json" },
      credentials: "same-origin"
    }).then((r) => r.json()).then((data) => {
      setDetailHotel(data);
      setShowDetailModal(true);
    }).catch(() => toast.error("Failed to load hotel details."));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Agoda Hotel Directory" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, { stats }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: "Agoda Hotel Directory" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-xs sm:text-sm mt-1", children: [
              totalCount.toLocaleString(),
              " hotels in directory · ",
              promotedCount.toLocaleString(),
              " promoted to site"
            ] }),
            promoteBadge && /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center px-2.5 py-1 mt-2 text-xs font-semibold rounded-full ${promoteBadge.className}`, children: [
              "Last action: ",
              promoteBadge.label
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-3", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowBulkPromoteModal(true),
              className: "inline-flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm text-sm sm:text-base",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }),
                "Bulk Promote"
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(ImportProgressBanner, { progress: liveBulkProgress, onDismiss: () => {
          var _a2;
          const token = (_a2 = document.cookie.match(/XSRF-TOKEN=([^;]+)/)) == null ? void 0 : _a2[1];
          fetch(route("admin.directory.bulk-promote.dismiss"), {
            method: "DELETE",
            headers: { "X-Requested-With": "XMLHttpRequest", "X-XSRF-TOKEN": token ? decodeURIComponent(token) : "" },
            credentials: "same-origin"
          }).then(() => setLiveBulkProgress(null));
        } }),
        /* @__PURE__ */ jsx(
          FilterSection,
          {
            filterState,
            updateFilter,
            countries,
            accommodationTypes,
            onSearch: handleSearch,
            onClear: clearFilters
          }
        ),
        /* @__PURE__ */ jsx(
          DirectoryTable,
          {
            hotels,
            onPromote: openPromoteModal,
            onViewDetail: openDetail
          }
        )
      ] })
    ] }),
    showPromoteModal && selectedHotel && /* @__PURE__ */ jsx(ModalOverlay, { onClose: () => {
      setShowPromoteModal(false);
      setSelectedHotel(null);
    }, children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 z-10", children: [
      /* @__PURE__ */ jsx(ModalHeader, { title: "Promote to Curated Listing", onClose: () => {
        setShowPromoteModal(false);
        setSelectedHotel(null);
      } }),
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 bg-gray-50 rounded-lg", children: [
        selectedHotel.photo1 && /* @__PURE__ */ jsx("img", { src: selectedHotel.photo1, alt: "", className: "w-12 h-12 rounded-lg object-cover" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900", children: selectedHotel.hotel_name }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
            [selectedHotel.city, selectedHotel.country].filter(Boolean).join(", "),
            selectedHotel.star_rating && ` · ${selectedHotel.star_rating}★`
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-2", children: "This will create a curated hotel entry with estimated pool criteria and scoring." }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mb-4", children: [
        "The destination will be auto-matched from the hotel's city (",
        /* @__PURE__ */ jsx("strong", { children: selectedHotel.city || "Unknown" }),
        ", ",
        selectedHotel.country || "Unknown",
        "). If no matching destination exists, one will be created automatically."
      ] }),
      promoteForm.errors.error && /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-red-600 bg-red-50 p-2 rounded-lg", children: promoteForm.errors.error }),
      /* @__PURE__ */ jsx("form", { onSubmit: handlePromote, children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setShowPromoteModal(false);
              setSelectedHotel(null);
            },
            className: "flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: promoteForm.processing,
            className: "flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50",
            children: promoteForm.processing ? "Promoting..." : "Promote to Site"
          }
        )
      ] }) })
    ] }) }),
    showDetailModal && detailHotel && /* @__PURE__ */ jsx(ModalOverlay, { onClose: () => {
      setShowDetailModal(false);
      setDetailHotel(null);
    }, children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 z-10 max-h-[85vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsx(ModalHeader, { title: detailHotel.hotel_name, onClose: () => {
        setShowDetailModal(false);
        setDetailHotel(null);
      } }),
      detailHotel.photo1 && /* @__PURE__ */ jsx("div", { className: "flex gap-2 mb-4 overflow-x-auto pb-2", children: [detailHotel.photo1, detailHotel.photo2, detailHotel.photo3, detailHotel.photo4, detailHotel.photo5].filter(Boolean).map((url, i) => /* @__PURE__ */ jsx("img", { src: url, alt: "", className: "w-28 h-20 rounded-lg object-cover flex-shrink-0" }, i)) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm mb-4", children: [
        /* @__PURE__ */ jsx(DetailField, { label: "Agoda ID", value: detailHotel.agoda_hotel_id }),
        /* @__PURE__ */ jsx(DetailField, { label: "Star Rating", value: detailHotel.star_rating ? `${detailHotel.star_rating}★` : "N/A" }),
        /* @__PURE__ */ jsx(DetailField, { label: "City", value: detailHotel.city }),
        /* @__PURE__ */ jsx(DetailField, { label: "Country", value: detailHotel.country }),
        /* @__PURE__ */ jsx(DetailField, { label: "Rooms", value: detailHotel.numberrooms }),
        /* @__PURE__ */ jsx(DetailField, { label: "Floors", value: detailHotel.numberfloors }),
        /* @__PURE__ */ jsx(DetailField, { label: "Reviews", value: (_a = detailHotel.number_of_reviews) == null ? void 0 : _a.toLocaleString() }),
        /* @__PURE__ */ jsx(DetailField, { label: "Rating", value: detailHotel.rating_average ? `${detailHotel.rating_average}/10` : "N/A" }),
        /* @__PURE__ */ jsx(DetailField, { label: "Rate From", value: detailHotel.rates_from ? `${detailHotel.rates_currency || "$"}${detailHotel.rates_from}` : "N/A" }),
        /* @__PURE__ */ jsx(DetailField, { label: "Type", value: detailHotel.accommodation_type }),
        /* @__PURE__ */ jsx(DetailField, { label: "Chain", value: detailHotel.chain_name }),
        /* @__PURE__ */ jsx(DetailField, { label: "Brand", value: detailHotel.brand_name }),
        /* @__PURE__ */ jsx(DetailField, { label: "Year Opened", value: detailHotel.yearopened }),
        /* @__PURE__ */ jsx(DetailField, { label: "Year Renovated", value: detailHotel.yearrenovated }),
        /* @__PURE__ */ jsx(DetailField, { label: "Check-in", value: detailHotel.checkin }),
        /* @__PURE__ */ jsx(DetailField, { label: "Check-out", value: detailHotel.checkout })
      ] }),
      detailHotel.addressline1 && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-gray-500 mb-1", children: "Address" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-900", children: [detailHotel.addressline1, detailHotel.addressline2, detailHotel.zipcode].filter(Boolean).join(", ") })
      ] }),
      detailHotel.overview && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-gray-500 mb-1", children: "Overview" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 line-clamp-6", children: detailHotel.overview })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2 border-t border-gray-100", children: [
        !detailHotel.promoted_hotel_id && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setShowDetailModal(false);
              openPromoteModal(detailHotel);
            },
            className: "flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors",
            children: "Promote to Site"
          }
        ),
        detailHotel.promoted_hotel_id && /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.hotels.edit", detailHotel.promoted_hotel_id),
            className: "flex-1 px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors",
            children: "View Curated Listing"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid=${1955707}&hid=${detailHotel.agoda_hotel_id}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex-1 px-4 py-2 text-sm font-medium text-center text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors",
            children: "View on Agoda"
          }
        )
      ] })
    ] }) }),
    showBulkPromoteModal && /* @__PURE__ */ jsx(ModalOverlay, { onClose: () => setShowBulkPromoteModal(false), children: /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6 z-10 max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsx(ModalHeader, { title: "Bulk Promote by Country", onClose: () => setShowBulkPromoteModal(false) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4", children: "Promote all unpromoted hotels matching the filters below into curated listings. This runs in the background — you can leave the page." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleBulkPromote, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Country *" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: bulkForm.data.country,
              onChange: (e) => bulkForm.setData("country", e.target.value),
              required: true,
              className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select a country..." }),
                countries.map((c) => /* @__PURE__ */ jsx("option", { value: c.code, children: c.name || c.code }, c.code))
              ]
            }
          ),
          bulkForm.errors.country && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: bulkForm.errors.country })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Min Stars (optional)" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: bulkForm.data.star_rating,
                onChange: (e) => bulkForm.setData("star_rating", e.target.value),
                className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                children: STAR_OPTIONS.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Type (optional)" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: bulkForm.data.accommodation_type,
                onChange: (e) => bulkForm.setData("accommodation_type", e.target.value),
                className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "All Types" }),
                  accommodationTypes.map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Maximum hotels to promote (1–5000)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: "1",
              max: "5000",
              value: bulkForm.data.limit,
              onChange: (e) => bulkForm.setData("limit", parseInt(e.target.value) || 500),
              className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-gray-500", children: "Hard cap: 5000 per job. Run again to continue if there are more." })
        ] }),
        bulkForm.data.country && /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm", children: [
          bulkPreviewLoading && /* @__PURE__ */ jsx("span", { className: "text-orange-700", children: "Counting matching hotels…" }),
          !bulkPreviewLoading && bulkMatching !== null && /* @__PURE__ */ jsxs("p", { className: "text-orange-800", children: [
            /* @__PURE__ */ jsx("strong", { children: bulkMatching.toLocaleString() }),
            " unpromoted hotels match these filters.",
            bulkMatching > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
              " Up to ",
              /* @__PURE__ */ jsx("strong", { children: Math.min(bulkMatching, bulkForm.data.limit).toLocaleString() }),
              " will be promoted."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800", children: "⚠ Each hotel runs through the same logic as a single promote: matching/creating its destination, generating estimated pool criteria, and calculating scores. Recommended to start with a small limit (e.g. 50) to verify the result." }),
        bulkForm.errors.bulk && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 bg-red-50 p-2 rounded-lg", children: bulkForm.errors.bulk }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowBulkPromoteModal(false),
              className: "flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: bulkForm.processing || !bulkForm.data.country || bulkMatching === 0,
              className: "flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
              children: bulkForm.processing ? "Starting…" : "Start Bulk Promote"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
function ImportProgressBanner({ progress, onDismiss }) {
  if (!progress || progress.status === "idle") return null;
  const configs = {
    queued: {
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-700",
      bar: "bg-blue-500",
      icon: /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5 animate-spin text-blue-500", viewBox: "0 0 24 24", fill: "none", children: [
        /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
        /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
      ] }),
      label: "Queued"
    },
    running: {
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-700",
      bar: "bg-amber-500",
      icon: /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5 animate-spin text-amber-500", viewBox: "0 0 24 24", fill: "none", children: [
        /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
        /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
      ] }),
      label: "Importing"
    },
    completed: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-700",
      bar: "bg-green-500",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-green-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }),
      label: "Completed"
    },
    failed: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-700",
      bar: "bg-red-500",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-red-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" }) }),
      label: "Failed"
    }
  };
  const config = configs[progress.status] || configs.queued;
  const pct = progress.total > 0 ? Math.round(progress.processed / progress.total * 100) : 0;
  const processed = (progress.processed || 0).toLocaleString();
  const total = (progress.total || 0).toLocaleString();
  return /* @__PURE__ */ jsxs("div", { className: `rounded-xl border-2 p-4 sm:p-5 mb-4 sm:mb-6 ${config.bg}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
      config.icon,
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: `text-sm sm:text-base font-semibold ${config.text}`, children: config.label }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            (progress.status === "completed" || progress.status === "failed") && onDismiss && /* @__PURE__ */ jsx("button", { onClick: onDismiss, className: `text-xs px-2 py-0.5 rounded ${config.text} hover:bg-white/50 transition-colors`, children: "Dismiss" }),
            progress.total > 0 && /* @__PURE__ */ jsxs("span", { className: `text-xs sm:text-sm font-bold ${config.text}`, children: [
              pct,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-xs sm:text-sm ${config.text} opacity-80 mt-0.5`, children: progress.message })
      ] })
    ] }),
    (progress.status === "running" || progress.status === "queued") && /* @__PURE__ */ jsx("div", { className: "w-full bg-white/60 rounded-full h-3 mb-2", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `${config.bar} h-3 rounded-full transition-all duration-700 ease-out`,
        style: { width: progress.status === "queued" ? "2%" : `${Math.max(pct, 1)}%` }
      }
    ) }),
    progress.status === "completed" && /* @__PURE__ */ jsx("div", { className: "w-full bg-white/60 rounded-full h-3 mb-2", children: /* @__PURE__ */ jsx("div", { className: "bg-green-500 h-3 rounded-full w-full" }) }),
    progress.total > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("span", { className: `text-xs ${config.text} opacity-70`, children: [
        processed,
        " of ",
        total,
        " hotels processed"
      ] }),
      progress.status === "running" && progress.processed > 0 && progress.processed < progress.total && (() => {
        try {
          const elapsed = (Date.now() - new Date(progress.updated_at).getTime()) / 1e3;
          if (elapsed <= 0) return null;
          const rate = progress.processed / Math.max(elapsed, 1);
          const remaining = Math.round((progress.total - progress.processed) / rate / 60);
          if (remaining <= 0 || !isFinite(remaining)) return null;
          return /* @__PURE__ */ jsxs("span", { className: `text-xs ${config.text} opacity-70`, children: [
            "~",
            remaining,
            " min remaining"
          ] });
        } catch {
          return null;
        }
      })()
    ] })
  ] });
}
function FilterSection({ filterState, updateFilter, countries, accommodationTypes, onSearch, onClear }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base", children: "Filter Directory" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: onSearch, className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5", children: "Search" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: filterState.search,
            onChange: (e) => updateFilter("search", e.target.value),
            placeholder: "Hotel name, city, or ID...",
            className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5", children: "Country" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filterState.country,
            onChange: (e) => updateFilter("country", e.target.value),
            className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "All Countries" }),
              countries.map((c) => /* @__PURE__ */ jsx("option", { value: c.code, children: c.name || c.code }, c.code))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5", children: "Stars" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: filterState.star_rating,
            onChange: (e) => updateFilter("star_rating", e.target.value),
            className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm",
            children: STAR_OPTIONS.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5", children: "Status" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: filterState.promoted,
            onChange: (e) => updateFilter("promoted", e.target.value),
            className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm",
            children: PROMOTED_OPTIONS.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "flex-1 px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors text-sm",
            children: "Search"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClear,
            className: "px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm",
            children: "Clear"
          }
        )
      ] })
    ] })
  ] });
}
function DirectoryTable({ hotels, onPromote, onViewDetail }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 border-b border-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Hotel" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Location" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Rating" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Price" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: hotels.data.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: 6, className: "px-4 py-12 text-center text-gray-500 text-sm", children: [
        "No hotels found. ",
        hotels.total === 0 ? "Upload a CSV to get started." : "Try adjusting your filters."
      ] }) }) : hotels.data.map((hotel) => {
        var _a;
        return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition-colors", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            hotel.photo1 ? /* @__PURE__ */ jsx("img", { src: hotel.photo1, alt: "", className: "w-10 h-10 rounded-lg object-cover flex-shrink-0" }) : /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0" }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => onViewDetail(hotel),
                  className: "text-sm font-medium text-gray-900 hover:text-orange-600 truncate max-w-[220px] block text-left transition-colors",
                  children: hotel.hotel_name
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
                hotel.star_rating ? `${hotel.star_rating}★` : "",
                hotel.accommodation_type ? ` · ${hotel.accommodation_type}` : ""
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900 truncate max-w-[150px]", children: hotel.city || "-" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: hotel.country || hotel.countryisocode || "-" })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: hotel.rating_average ? /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-gray-900", children: [
              hotel.rating_average,
              "/10"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500", children: [
              (_a = hotel.number_of_reviews) == null ? void 0 : _a.toLocaleString(),
              " reviews"
            ] })
          ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "N/A" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: hotel.rates_from ? /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-900", children: [
            hotel.rates_currency || "$",
            hotel.rates_from
          ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "N/A" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: hotel.promoted_hotel_id ? /* @__PURE__ */ jsx("span", { className: "inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700", children: "Promoted" }) : /* @__PURE__ */ jsx("span", { className: "inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-500", children: "Directory" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onViewDetail(hotel),
                className: "text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors",
                children: "View"
              }
            ),
            hotel.promoted_hotel_id ? /* @__PURE__ */ jsx(
              Link,
              {
                href: route("admin.hotels.edit", hotel.promoted_hotel_id),
                className: "text-xs font-medium text-green-600 hover:text-green-700 transition-colors",
                children: "Edit Listing"
              }
            ) : /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onPromote(hotel),
                className: "text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors",
                children: "Promote"
              }
            )
          ] }) })
        ] }, hotel.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden divide-y divide-gray-100", children: hotels.data.length === 0 ? /* @__PURE__ */ jsx("div", { className: "px-4 py-12 text-center text-gray-500 text-sm", children: "No hotels found." }) : hotels.data.map((hotel) => /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4 hover:bg-gray-50 transition-colors", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-2", children: [
        hotel.photo1 ? /* @__PURE__ */ jsx("img", { src: hotel.photo1, alt: "", className: "w-14 h-14 rounded-lg object-cover flex-shrink-0" }) : /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onViewDetail(hotel),
              className: "text-sm font-medium text-gray-900 truncate block text-left",
              children: hotel.hotel_name
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: [hotel.city, hotel.country].filter(Boolean).join(", ") }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            hotel.star_rating && /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
              hotel.star_rating,
              "★"
            ] }),
            hotel.rating_average && /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
              hotel.rating_average,
              "/10"
            ] }),
            hotel.promoted_hotel_id ? /* @__PURE__ */ jsx("span", { className: "px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-green-100 text-green-700", children: "Promoted" }) : /* @__PURE__ */ jsx("span", { className: "px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 text-gray-500", children: "Directory" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pt-2 border-t border-gray-100", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onViewDetail(hotel),
            className: "flex-1 px-3 py-1.5 text-center text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors",
            children: "View Details"
          }
        ),
        hotel.promoted_hotel_id ? /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.hotels.edit", hotel.promoted_hotel_id),
            className: "flex-1 px-3 py-1.5 text-center text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors",
            children: "Edit Listing"
          }
        ) : /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onPromote(hotel),
            className: "flex-1 px-3 py-1.5 text-center text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors",
            children: "Promote"
          }
        )
      ] })
    ] }, hotel.id)) }),
    (hotels.prev_page_url || hotels.next_page_url) && /* @__PURE__ */ jsx("div", { className: "bg-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 sm:gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm text-gray-500", children: hotels.from && hotels.to && /* @__PURE__ */ jsxs(Fragment, { children: [
        "Showing ",
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: hotels.from }),
        " to",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: hotels.to })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        hotels.prev_page_url ? /* @__PURE__ */ jsx(
          Link,
          {
            href: hotels.prev_page_url,
            className: "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors",
            children: "← Previous"
          }
        ) : /* @__PURE__ */ jsx("span", { className: "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium text-gray-400 bg-gray-50", children: "← Previous" }),
        /* @__PURE__ */ jsxs("span", { className: "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium bg-orange-500 text-white", children: [
          "Page ",
          hotels.current_page
        ] }),
        hotels.next_page_url ? /* @__PURE__ */ jsx(
          Link,
          {
            href: hotels.next_page_url,
            className: "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors",
            children: "Next →"
          }
        ) : /* @__PURE__ */ jsx("span", { className: "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium text-gray-400 bg-gray-50", children: "Next →" })
      ] })
    ] }) })
  ] });
}
function DetailField({ label, value }) {
  if (!value) return null;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-gray-500", children: label }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-900", children: value })
  ] });
}
function ModalOverlay({ children, onClose }) {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center min-h-screen px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 transition-opacity", onClick: onClose }),
    children
  ] }) });
}
function ModalHeader({ title, onClose }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900", children: title }),
    /* @__PURE__ */ jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) }) })
  ] });
}
export {
  DirectoryIndex as default
};

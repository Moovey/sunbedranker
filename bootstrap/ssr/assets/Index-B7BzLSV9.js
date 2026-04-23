import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { usePage, useForm, Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { A as AdminNav } from "./AdminNav-Dpi9gSoo.js";
const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" }
];
const CLAIM_STYLES = {
  approved: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",
  unclaimed: "bg-gray-100 text-gray-500"
};
const TABLE_COLUMNS = [
  { key: "hotel", label: "Hotel" },
  { key: "destination", label: "Destination" },
  { key: "score", label: "Score" },
  { key: "claim", label: "Claim Status" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" }
];
function HotelsIndex({ hotels, destinations, countries = [], filters, stats }) {
  const { flash } = usePage().props;
  useEffect(() => {
    if (flash == null ? void 0 : flash.success) toast.success(flash.success);
    if (flash == null ? void 0 : flash.error) toast.error(flash.error);
  }, [flash]);
  const [filterState, setFilterState] = useState({
    search: filters.search || "",
    destination_id: filters.destination_id || "",
    country: filters.country || "",
    status: filters.status || ""
  });
  const [showImportModal, setShowImportModal] = useState(false);
  const importForm = useForm({
    agoda_hotel_id: "",
    destination_id: ""
  });
  const updateFilter = (key, value) => {
    setFilterState((prev) => ({ ...prev, [key]: value }));
  };
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route("admin.hotels.index"), filterState, {
      preserveState: true,
      replace: true
    });
  };
  const clearFilters = () => {
    setFilterState({ search: "", destination_id: "", country: "", status: "" });
    router.get(route("admin.hotels.index"));
  };
  const handleDelete = (hotel) => {
    if (!confirm(`Are you sure you want to delete "${hotel.name}"? This action cannot be undone.`)) {
      return;
    }
    router.delete(route("admin.hotels.destroy", hotel.id), {
      preserveScroll: true,
      onSuccess: () => {
      },
      onError: () => toast.error("Failed to delete hotel. Please try again.")
    });
  };
  const handleImportById = (e) => {
    e.preventDefault();
    importForm.post(route("admin.hotels.import-agoda"), {
      onSuccess: () => {
        setShowImportModal(false);
        importForm.reset();
      },
      onError: () => {
        toast.error(importForm.errors.agoda_hotel_id || "Failed to import hotel.");
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Hotels" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, { stats }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight", children: "Hotel Management" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs sm:text-sm mt-1.5 font-light", children: "Manage all hotels and their details" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setShowImportModal(true),
                className: "inline-flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm hover:shadow ring-1 ring-blue-700/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 transition-all text-sm sm:text-base",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" }) }),
                  "Import from Agoda"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("admin.hotels.create"),
                className: "inline-flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 shadow-sm hover:shadow ring-1 ring-orange-600/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 focus-visible:ring-offset-2 transition-all text-sm sm:text-base",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4v16m8-8H4" }) }),
                  "Add New Hotel"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          FilterSection,
          {
            filterState,
            updateFilter,
            destinations,
            countries,
            onSearch: handleSearch,
            onClear: clearFilters
          }
        ),
        /* @__PURE__ */ jsx(
          HotelTable,
          {
            hotels,
            onDelete: handleDelete
          }
        )
      ] })
    ] }),
    showImportModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center min-h-screen px-4", children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 transition-opacity", onClick: () => {
        setShowImportModal(false);
        importForm.reset();
      } }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 max-w-md w-full p-6 z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-slate-900 tracking-tight", children: "Import Hotel from Agoda" }),
          /* @__PURE__ */ jsx("button", { onClick: () => {
            setShowImportModal(false);
            importForm.reset();
          }, className: "text-slate-400 hover:text-slate-600 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) }) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mb-4", children: [
          "Enter the Agoda Hotel ID to import it. The destination will be auto-detected from the hotel's location. You can find the ID in the hotel's image URLs on agoda.com (e.g. ",
          /* @__PURE__ */ jsxs("code", { className: "text-xs bg-gray-100 px-1 rounded", children: [
            "hotelImages/",
            /* @__PURE__ */ jsx("strong", { children: "81940" }),
            "/..."
          ] }),
          ")."
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleImportById, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Agoda Hotel ID *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: importForm.data.agoda_hotel_id,
                onChange: (e) => importForm.setData("agoda_hotel_id", e.target.value),
                placeholder: "e.g. 81940",
                className: "w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm",
                min: "1",
                required: true
              }
            ),
            importForm.errors.agoda_hotel_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: importForm.errors.agoda_hotel_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
              "Destination ",
              /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-normal", children: "(optional — auto-detected from coordinates)" })
            ] }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: importForm.data.destination_id,
                onChange: (e) => importForm.setData("destination_id", e.target.value),
                className: "w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Auto-detect from location" }),
                  destinations == null ? void 0 : destinations.map((dest) => /* @__PURE__ */ jsx("option", { value: dest.id, children: dest.name }, dest.id))
                ]
              }
            ),
            importForm.errors.destination_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: importForm.errors.destination_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setShowImportModal(false);
                  importForm.reset();
                },
                className: "flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: importForm.processing,
                className: "flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm ring-1 ring-blue-700/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
                children: importForm.processing ? "Importing..." : "Import Hotel"
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function FilterSection({ filterState, updateFilter, destinations, countries = [], onSearch, onClear }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-3 sm:p-4 md:p-6 mb-4 sm:mb-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-semibold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base tracking-tight", children: "Filter Hotels" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: onSearch, className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4", children: [
      /* @__PURE__ */ jsx(
        FilterInput,
        {
          label: "Search",
          type: "text",
          value: filterState.search,
          onChange: (e) => updateFilter("search", e.target.value),
          placeholder: "Hotel name..."
        }
      ),
      /* @__PURE__ */ jsx(
        FilterSelect,
        {
          label: "Country",
          value: filterState.country,
          onChange: (e) => updateFilter("country", e.target.value),
          options: [
            { value: "", label: "All Countries" },
            ...countries.map((c) => ({ value: c.code, label: c.name || c.code }))
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        FilterSelect,
        {
          label: "Destination",
          value: filterState.destination_id,
          onChange: (e) => updateFilter("destination_id", e.target.value),
          options: [
            { value: "", label: "All Destinations" },
            ...destinations.map((dest) => ({ value: dest.id, label: dest.name }))
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        FilterSelect,
        {
          label: "Status",
          value: filterState.status,
          onChange: (e) => updateFilter("status", e.target.value),
          options: STATUS_OPTIONS
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2 sm:col-span-2 lg:col-span-1", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "flex-1 px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium shadow-sm hover:shadow ring-1 ring-orange-600/10 transition-all text-sm sm:text-base",
            children: "Search"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClear,
            className: "px-3 sm:px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg hover:bg-slate-100 hover:border-slate-300 font-medium shadow-sm transition-all text-sm sm:text-base",
            children: "Clear"
          }
        )
      ] })
    ] })
  ] });
}
function FilterInput({ label, ...props }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5", children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ...props,
        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 text-xs sm:text-sm transition-colors"
      }
    )
  ] });
}
function FilterSelect({ label, options, ...props }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5", children: label }),
    /* @__PURE__ */ jsx(
      "select",
      {
        ...props,
        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 text-xs sm:text-sm transition-colors",
        children: options.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
      }
    )
  ] });
}
function HotelTable({ hotels, onDelete }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full", children: [
      /* @__PURE__ */ jsx(TableHeader, {}),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-100", children: hotels.data.length === 0 ? /* @__PURE__ */ jsx(EmptyRow, {}) : hotels.data.map((hotel) => /* @__PURE__ */ jsx(
        HotelRow,
        {
          hotel,
          onDelete
        },
        hotel.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden", children: hotels.data.length === 0 ? /* @__PURE__ */ jsx("div", { className: "px-4 py-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm", children: "No hotels found" }) }) : /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-100", children: hotels.data.map((hotel) => /* @__PURE__ */ jsx(
      MobileHotelCard,
      {
        hotel,
        onDelete
      },
      hotel.id
    )) }) }),
    hotels.links && /* @__PURE__ */ jsx(Pagination, { hotels })
  ] });
}
function getClaimInfo(hotel) {
  var _a, _b, _c, _d, _e;
  const latestClaim = (_a = hotel.claims) == null ? void 0 : _a[0];
  if (hotel.owned_by || (latestClaim == null ? void 0 : latestClaim.status) === "approved") {
    return { label: "Claimed", status: "approved", claim: latestClaim, ownerName: ((_b = latestClaim == null ? void 0 : latestClaim.user) == null ? void 0 : _b.name) || ((_c = hotel.owner) == null ? void 0 : _c.name) || "Owner" };
  }
  if ((latestClaim == null ? void 0 : latestClaim.status) === "pending") {
    return { label: "Pending", status: "pending", claim: latestClaim, ownerName: (_d = latestClaim == null ? void 0 : latestClaim.user) == null ? void 0 : _d.name };
  }
  if ((latestClaim == null ? void 0 : latestClaim.status) === "rejected") {
    return { label: "Rejected", status: "rejected", claim: latestClaim, ownerName: (_e = latestClaim == null ? void 0 : latestClaim.user) == null ? void 0 : _e.name };
  }
  return { label: "Unclaimed", status: "unclaimed", claim: null, ownerName: null };
}
function MobileHotelCard({ hotel, onDelete }) {
  var _a;
  const claimInfo = getClaimInfo(hotel);
  const claimStyle = CLAIM_STYLES[claimInfo.status] || CLAIM_STYLES.unclaimed;
  return /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4 hover:bg-slate-50/70 transition-colors", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
      hotel.main_image_url ? /* @__PURE__ */ jsx(
        "img",
        {
          src: hotel.main_image_url,
          alt: hotel.name,
          className: "w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex-shrink-0" }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-900 truncate", children: hotel.name }),
          hotel.star_rating && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 mt-0.5", children: [
            hotel.star_rating,
            " Star"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-0.5 truncate", children: ((_a = hotel.destination) == null ? void 0 : _a.name) || "-" })
        ] }),
        claimInfo.claim ? /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.claims.show", claimInfo.claim.id),
            className: `px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full flex-shrink-0 hover:opacity-80 transition-opacity ${claimStyle}`,
            children: claimInfo.label
          }
        ) : /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full flex-shrink-0 ${claimStyle}`, children: claimInfo.label })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3 text-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Score:" }),
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: hotel.overall_score ? `${hotel.overall_score}/100` : "N/A" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        hotel.is_active && /* @__PURE__ */ jsx(StatusBadge, { type: "active" }),
        hotel.is_verified && /* @__PURE__ */ jsx(StatusBadge, { type: "verified" }),
        hotel.is_featured && /* @__PURE__ */ jsx(StatusBadge, { type: "featured" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pt-2 border-t border-slate-100", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("admin.hotels.edit", hotel.id),
          className: "flex-1 px-3 py-1.5 text-center text-xs sm:text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 shadow-sm ring-1 ring-orange-600/10 transition-all",
          children: "Edit"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: `/hotels/${hotel.slug}`,
          target: "_blank",
          className: "flex-1 px-3 py-1.5 text-center text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors",
          children: "View"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onDelete(hotel),
          className: "px-3 py-1.5 text-xs sm:text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors",
          children: "Delete"
        }
      )
    ] })
  ] });
}
function TableHeader() {
  return /* @__PURE__ */ jsx("thead", { className: "bg-slate-50/80 border-b border-slate-200", children: /* @__PURE__ */ jsx("tr", { children: TABLE_COLUMNS.map((col) => /* @__PURE__ */ jsx(
    "th",
    {
      className: "px-3 md:px-4 lg:px-6 py-2.5 md:py-3 text-left text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-[0.08em]",
      children: col.label
    },
    col.key
  )) }) });
}
function EmptyRow() {
  return /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: TABLE_COLUMNS.length, className: "px-4 md:px-6 py-8 md:py-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs sm:text-sm", children: "No hotels found" }) }) });
}
function HotelRow({ hotel, onDelete }) {
  var _a;
  return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-slate-50/70 transition-colors", children: [
    /* @__PURE__ */ jsx(HotelInfoCell, { hotel }),
    /* @__PURE__ */ jsx(DestinationCell, { destination: (_a = hotel.destination) == null ? void 0 : _a.name }),
    /* @__PURE__ */ jsx(ScoreCell, { score: hotel.overall_score }),
    /* @__PURE__ */ jsx(ClaimCell, { hotel }),
    /* @__PURE__ */ jsx(StatusCell, { hotel }),
    /* @__PURE__ */ jsx(ActionsCell, { hotel, onDelete })
  ] });
}
function HotelInfoCell({ hotel }) {
  return /* @__PURE__ */ jsx("td", { className: "px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
    hotel.main_image_url ? /* @__PURE__ */ jsx(
      "img",
      {
        src: hotel.main_image_url,
        alt: hotel.name,
        className: "w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover mr-2 md:mr-3"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-lg mr-2 md:mr-3" }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs md:text-sm font-medium text-gray-900 truncate max-w-[120px] lg:max-w-[180px]", children: hotel.name }),
      hotel.star_rating && /* @__PURE__ */ jsxs("div", { className: "text-[10px] md:text-xs text-gray-500", children: [
        hotel.star_rating,
        " Star"
      ] })
    ] })
  ] }) });
}
function DestinationCell({ destination }) {
  return /* @__PURE__ */ jsx("td", { className: "px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-xs md:text-sm text-gray-900 truncate max-w-[100px] lg:max-w-[150px]", children: destination || "-" }) });
}
function ScoreCell({ score }) {
  return /* @__PURE__ */ jsx("td", { className: "px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-xs md:text-sm font-medium text-gray-900", children: score ? `${score}/10` : "N/A" }) });
}
function ClaimCell({ hotel }) {
  const claimInfo = getClaimInfo(hotel);
  const style = CLAIM_STYLES[claimInfo.status] || CLAIM_STYLES.unclaimed;
  return /* @__PURE__ */ jsx("td", { className: "px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
    claimInfo.claim ? /* @__PURE__ */ jsx(
      Link,
      {
        href: route("admin.claims.show", claimInfo.claim.id),
        className: `inline-flex px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-full hover:opacity-80 transition-opacity w-fit ${style}`,
        children: claimInfo.label
      }
    ) : /* @__PURE__ */ jsx("span", { className: `inline-flex px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-full w-fit ${style}`, children: claimInfo.label }),
    claimInfo.ownerName && /* @__PURE__ */ jsx("span", { className: "text-[10px] md:text-xs text-gray-400 truncate max-w-[120px]", children: claimInfo.ownerName })
  ] }) });
}
function StatusCell({ hotel }) {
  return /* @__PURE__ */ jsx("td", { className: "px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 md:gap-1", children: [
    hotel.is_active && /* @__PURE__ */ jsx(StatusBadge, { type: "active" }),
    hotel.is_verified && /* @__PURE__ */ jsx(StatusBadge, { type: "verified" }),
    hotel.is_featured && /* @__PURE__ */ jsx(StatusBadge, { type: "featured" })
  ] }) });
}
function StatusBadge({ type }) {
  const badges = {
    active: {
      color: "text-green-600",
      icon: /* @__PURE__ */ jsx(CheckCircleIcon, {}),
      label: "Active"
    },
    verified: {
      color: "text-blue-600",
      icon: /* @__PURE__ */ jsx(ShieldCheckIcon, {}),
      label: "Verified"
    },
    featured: {
      color: "text-purple-600",
      icon: /* @__PURE__ */ jsx(StarIcon, { className: "w-2.5 h-2.5 md:w-3 md:h-3" }),
      label: "Featured"
    }
  };
  const badge = badges[type];
  return /* @__PURE__ */ jsxs("span", { className: `text-[10px] md:text-xs ${badge.color} font-medium flex items-center gap-0.5 md:gap-1`, children: [
    badge.icon,
    badge.label
  ] });
}
function ActionsCell({ hotel, onDelete }) {
  return /* @__PURE__ */ jsx("td", { className: "px-3 md:px-4 lg:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 md:gap-3", children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("admin.hotels.edit", hotel.id),
        className: "text-orange-600 hover:text-orange-700 font-medium transition-colors",
        children: "Edit"
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: `/hotels/${hotel.slug}`,
        target: "_blank",
        className: "text-slate-600 hover:text-slate-900 font-medium transition-colors",
        children: "View"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onDelete(hotel),
        className: "text-red-600 hover:text-red-700 font-medium transition-colors",
        children: "Delete"
      }
    )
  ] }) });
}
function Pagination({ hotels }) {
  return /* @__PURE__ */ jsx("div", { className: "bg-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t border-slate-200", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4", children: [
    /* @__PURE__ */ jsx(
      PaginationInfo,
      {
        from: hotels.from,
        to: hotels.to,
        total: hotels.total
      }
    ),
    /* @__PURE__ */ jsx(PaginationLinks, { links: hotels.links })
  ] }) });
}
function PaginationInfo({ from, to, total }) {
  return /* @__PURE__ */ jsxs("div", { className: "text-xs sm:text-sm text-slate-500 text-center sm:text-left font-light", children: [
    "Showing ",
    /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-900", children: from }),
    " to",
    " ",
    /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-900", children: to }),
    " of",
    " ",
    /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-900", children: total }),
    " results"
  ] });
}
function PaginationLinks({ links }) {
  return /* @__PURE__ */ jsx("div", { className: "flex gap-0.5 sm:gap-1 flex-wrap justify-center", children: links.map((link, index) => /* @__PURE__ */ jsx(PaginationLink, { link }, index)) });
}
function PaginationLink({ link }) {
  const baseClasses = "px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg font-medium transition-all";
  if (!link.url) {
    return /* @__PURE__ */ jsx(
      "span",
      {
        className: `${baseClasses} text-slate-300`,
        dangerouslySetInnerHTML: { __html: link.label }
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Link,
    {
      href: link.url,
      className: `${baseClasses} ${link.active ? "bg-orange-500 text-white shadow-sm ring-1 ring-orange-600/10" : "text-slate-700 hover:bg-slate-100"}`,
      dangerouslySetInnerHTML: { __html: link.label }
    }
  );
}
function StarIcon({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) });
}
function CheckCircleIcon() {
  return /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5 md:w-3 md:h-3", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) });
}
function ShieldCheckIcon() {
  return /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5 md:w-3 md:h-3", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" }) });
}
export {
  HotelsIndex as default
};

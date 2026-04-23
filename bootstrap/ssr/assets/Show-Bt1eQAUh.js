import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { A as AdminNav } from "./AdminNav-Dpi9gSoo.js";
function ClaimShow({ claim, userClaimHistory, hotelClaimHistory, stats }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  const [showRejectModal, setShowRejectModal] = useState(false);
  const approveForm = useForm({});
  const rejectForm = useForm({
    admin_notes: ""
  });
  const handleApprove = () => {
    if (confirm("Are you sure you want to approve this claim? This will grant hotel ownership to this user.")) {
      approveForm.post(route("admin.claims.approve", claim.id));
    }
  };
  const handleReject = (e) => {
    e.preventDefault();
    rejectForm.post(route("admin.claims.reject", claim.id), {
      onSuccess: () => setShowRejectModal(false)
    });
  };
  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-50 text-yellow-700",
      approved: "bg-green-50 text-green-700",
      rejected: "bg-red-50 text-red-700"
    };
    return /* @__PURE__ */ jsx("span", { className: `px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${styles[status]}`, children: status.charAt(0).toUpperCase() + status.slice(1) });
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const getEmailDomain = () => {
    if (!claim.official_email) return "";
    return claim.official_email.split("@")[1];
  };
  const getHotelDomain = () => {
    var _a2;
    if (!((_a2 = claim.hotel) == null ? void 0 : _a2.website)) return "";
    try {
      const url = new URL(claim.hotel.website.startsWith("http") ? claim.hotel.website : "https://" + claim.hotel.website);
      return url.hostname.replace("www.", "");
    } catch {
      return "";
    }
  };
  const emailDomain = getEmailDomain();
  const hotelDomain = getHotelDomain();
  const domainMatches = emailDomain.toLowerCase() === hotelDomain.toLowerCase();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Review Claim - ${(_a = claim.hotel) == null ? void 0 : _a.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, { stats }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-4", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("admin.claims.index"),
                className: "p-1.5 sm:p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex-shrink-0",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900", children: "Review Claim" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-gray-500 truncate", children: [
                "Claim #",
                claim.id,
                " • ",
                (_b = claim.hotel) == null ? void 0 : _b.name
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "self-start sm:self-auto ml-8 sm:ml-0", children: getStatusBadge(claim.status) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-4 sm:space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4", children: "Hotel Details" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: ((_c = claim.hotel) == null ? void 0 : _c.main_image) || "/images/default-hotel.jpg",
                    alt: (_d = claim.hotel) == null ? void 0 : _d.name,
                    className: "w-full sm:w-20 md:w-24 h-40 sm:h-20 md:h-24 object-cover rounded-lg flex-shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold text-gray-900 truncate", children: (_e = claim.hotel) == null ? void 0 : _e.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm mt-1", children: (_g = (_f = claim.hotel) == null ? void 0 : _f.destination) == null ? void 0 : _g.name }),
                  ((_h = claim.hotel) == null ? void 0 : _h.website) && /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-gray-500 mt-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Website:" }),
                    " ",
                    /* @__PURE__ */ jsx("a", { href: claim.hotel.website, target: "_blank", rel: "noopener noreferrer", className: "text-orange-600 hover:text-orange-700 break-all", children: claim.hotel.website })
                  ] }),
                  ((_i = claim.hotel) == null ? void 0 : _i.email) && /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-gray-500 break-all", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Official Email:" }),
                    " ",
                    claim.hotel.email
                  ] }),
                  ((_j = claim.hotel) == null ? void 0 : _j.phone) && /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-gray-500", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Phone:" }),
                    " ",
                    claim.hotel.phone
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4", children: "Claimant Information" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide", children: "Name" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-900 mt-1", children: (_k = claim.user) == null ? void 0 : _k.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide", children: "Account Email" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-900 mt-1 break-all", children: (_l = claim.user) == null ? void 0 : _l.email })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2 md:col-span-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide", children: "Official Hotel Email" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-900 break-all", children: claim.official_email }),
                    domainMatches ? /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 flex-shrink-0", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) })
                  ] }),
                  !domainMatches && /* @__PURE__ */ jsxs("p", { className: "text-[10px] sm:text-xs text-red-600 mt-1", children: [
                    "⚠️ Domain mismatch! Expected: @",
                    hotelDomain
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide", children: "Phone" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-900 mt-1", children: claim.phone })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide", children: "IP Address" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-900 mt-1", children: claim.ip_address || "N/A" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide", children: "Submitted" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-900 mt-1", children: formatDate(claim.created_at) })
                ] })
              ] }),
              claim.claim_message && /* @__PURE__ */ jsxs("div", { className: "mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide mb-1.5 sm:mb-2", children: "Additional Message" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-900 text-xs sm:text-sm", children: claim.claim_message })
              ] })
            ] }),
            claim.reviewed_at && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4", children: "Review Details" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide", children: "Reviewed By" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-900 mt-1", children: ((_m = claim.reviewer) == null ? void 0 : _m.name) || "N/A" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide", children: "Reviewed At" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-900 mt-1", children: formatDate(claim.reviewed_at) })
                ] })
              ] }),
              claim.admin_notes && /* @__PURE__ */ jsxs("div", { className: "mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide mb-1.5 sm:mb-2", children: "Admin Notes" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-900 text-xs sm:text-sm", children: claim.admin_notes })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
            claim.status === "pending" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4", children: "Actions" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-row sm:flex-col lg:flex-col gap-2 sm:gap-3", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleApprove,
                    disabled: approveForm.processing,
                    className: "flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2",
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
                      /* @__PURE__ */ jsx("span", { className: "truncate", children: approveForm.processing ? "Approving..." : "Approve" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setShowRejectModal(true),
                    className: "flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2",
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }),
                      /* @__PURE__ */ jsx("span", { className: "truncate", children: "Reject" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 rounded-xl border border-orange-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4", children: "Verification Checklist" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2.5 sm:space-y-3", children: [
                /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-2.5 sm:gap-3 cursor-pointer", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox", checked: domainMatches, readOnly: true, className: "mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm text-gray-700", children: "Email domain matches hotel website" })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-2.5 sm:gap-3 cursor-pointer", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox", checked: !!claim.phone, readOnly: true, className: "mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm text-gray-700", children: "Phone number provided" })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-2.5 sm:gap-3 cursor-pointer", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox", checked: !((_n = claim.hotel) == null ? void 0 : _n.owned_by), readOnly: true, className: "mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm text-gray-700", children: "Hotel has no existing owner" })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-2.5 sm:gap-3 cursor-pointer", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox", checked: userClaimHistory.length === 0, readOnly: true, className: "mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm text-gray-700", children: "No suspicious claim history" })
                ] })
              ] })
            ] }),
            userClaimHistory.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4", children: "User's Claim History" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: userClaimHistory.map((historyClaim) => {
                var _a2;
                return /* @__PURE__ */ jsxs("div", { className: "text-xs sm:text-sm p-2.5 sm:p-3 bg-gray-50 rounded-lg", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 truncate", children: (_a2 = historyClaim.hotel) == null ? void 0 : _a2.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-[10px] sm:text-xs mt-1", children: [
                    historyClaim.status,
                    " • ",
                    formatDate(historyClaim.created_at)
                  ] })
                ] }, historyClaim.id);
              }) })
            ] }),
            hotelClaimHistory.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4", children: "Hotel's Claim History" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: hotelClaimHistory.map((historyClaim) => {
                var _a2;
                return /* @__PURE__ */ jsxs("div", { className: "text-xs sm:text-sm p-2.5 sm:p-3 bg-gray-50 rounded-lg", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 truncate", children: (_a2 = historyClaim.user) == null ? void 0 : _a2.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-[10px] sm:text-xs mt-1", children: [
                    historyClaim.status,
                    " • ",
                    formatDate(historyClaim.created_at)
                  ] })
                ] }, historyClaim.id);
              }) })
            ] })
          ] })
        ] })
      ] }),
      showRejectModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm max-w-lg w-full p-4 sm:p-5 md:p-6 max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4", children: "Reject Claim" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleReject, children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 sm:mb-6", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2", children: "Reason for Rejection *" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: rejectForm.data.admin_notes,
                onChange: (e) => rejectForm.setData("admin_notes", e.target.value),
                rows: 4,
                className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none",
                placeholder: "Explain why this claim is being rejected...",
                required: true
              }
            ),
            rejectForm.errors.admin_notes && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2", children: rejectForm.errors.admin_notes })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse sm:flex-row gap-2 sm:gap-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowRejectModal(false),
                className: "flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-xs sm:text-sm",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: rejectForm.processing,
                className: "flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-xs sm:text-sm",
                children: rejectForm.processing ? "Rejecting..." : "Confirm Rejection"
              }
            )
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ClaimShow as default
};

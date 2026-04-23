import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { usePage, Head, Link } from "@inertiajs/react";
import { H as HotelierNav } from "./HotelierNav-CV4guQe6.js";
import "react";
function HotelierClaimsIndex({ claims, subscription }) {
  const { auth } = usePage().props;
  const getStatusBadge = (claim) => {
    if (claim.needs_verification) {
      return /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700", children: "Verify Email" });
    }
    const badges = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700"
    };
    const labels = {
      pending: "Pending Review",
      approved: "Approved",
      rejected: "Rejected"
    };
    return /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${badges[claim.status]}`, children: labels[claim.status] });
  };
  const needsVerificationCount = claims.filter((c) => c.needs_verification).length;
  const pendingCount = claims.filter((c) => c.status === "pending" && !c.needs_verification).length;
  const approvedCount = claims.filter((c) => c.status === "approved").length;
  const rejectedCount = claims.filter((c) => c.status === "rejected").length;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "My Hotel Claims" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(HotelierNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: "My Hotel Claims" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500 mt-1", children: "Track the status of your hotel ownership claims" })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/",
              className: "px-3 sm:px-4 py-2 bg-orange-500 text-white font-medium text-xs sm:text-sm rounded-lg hover:bg-orange-600 transition-colors text-center w-full sm:w-auto",
              children: "Search Hotels"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
          needsVerificationCount > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-600", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg sm:text-xl font-bold text-gray-900", children: needsVerificationCount }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-blue-600 font-medium", children: "VERIFY EMAIL" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-yellow-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg sm:text-xl font-bold text-gray-900", children: pendingCount }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 font-medium", children: "PENDING" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-green-50 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-green-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg sm:text-xl font-bold text-gray-900", children: approvedCount }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 font-medium", children: "APPROVED" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-red-50 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-red-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-lg sm:text-xl font-bold text-gray-900", children: rejectedCount }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 font-medium", children: "REJECTED" })
            ] })
          ] })
        ] }),
        claims.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-12 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-2", children: "No Claims Yet" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6", children: "You haven't submitted any hotel ownership claims yet." }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/",
              className: "inline-block px-3 sm:px-4 py-2 bg-orange-500 text-white font-medium text-xs sm:text-sm rounded-lg hover:bg-orange-600 transition-colors",
              children: "Search for Hotels to Claim"
            }
          )
        ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-6 border-b border-gray-100", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 text-sm sm:text-base", children: "All Claims" }) }),
          /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-100", children: claims.map((claim) => {
            var _a;
            return /* @__PURE__ */ jsx("div", { className: "p-3 sm:p-4 md:p-6 hover:bg-gray-50 transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-3 sm:gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full sm:w-32 lg:w-32 flex-shrink-0", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: claim.hotel.main_image_url || "/images/default-hotel.jpg",
                  alt: claim.hotel.name,
                  className: "w-full h-32 sm:h-24 lg:h-20 object-cover rounded-lg",
                  width: "128",
                  height: "80",
                  loading: "lazy"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start gap-2 mb-2 sm:mb-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-xs sm:text-sm font-semibold text-gray-900 truncate", children: claim.hotel.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: (_a = claim.hotel.destination) == null ? void 0 : _a.name })
                  ] }),
                  getStatusBadge(claim)
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs mb-2 sm:mb-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Email" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-medium truncate", children: claim.official_email })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Phone" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-medium truncate", children: claim.phone })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Submitted" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-medium", children: new Date(claim.created_at).toLocaleDateString() })
                  ] }),
                  claim.reviewed_at && /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Reviewed" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-900 font-medium", children: new Date(claim.reviewed_at).toLocaleDateString() })
                  ] })
                ] }),
                claim.claim_message && /* @__PURE__ */ jsxs("div", { className: "mb-2 sm:mb-3 p-2 sm:p-3 bg-gray-50 rounded-lg", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Your Message" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-700 break-words", children: claim.claim_message })
                ] }),
                claim.admin_notes && /* @__PURE__ */ jsxs("div", { className: "mb-2 sm:mb-3 p-2 sm:p-3 bg-orange-50 rounded-lg", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Admin Notes" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-700 break-words", children: claim.admin_notes })
                ] }),
                claim.needs_verification && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: route("hotelier.claims.verify", claim.id),
                      className: "inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors text-xs",
                      children: [
                        /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 sm:w-3.5 sm:h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
                        "Verify Email"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
                    "Check your inbox at ",
                    claim.official_email
                  ] })
                ] }),
                claim.status === "approved" && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: route("hotelier.hotels.manage", claim.hotel.slug),
                      className: "inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors text-xs",
                      children: [
                        /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 sm:w-3.5 sm:h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }),
                        "Manage"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: `/hotels/${claim.hotel.slug}`,
                      className: "inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-xs",
                      children: [
                        /* @__PURE__ */ jsxs("svg", { className: "w-3 h-3 sm:w-3.5 sm:h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                        ] }),
                        "View"
                      ]
                    }
                  ),
                  ((subscription == null ? void 0 : subscription.tier) === "premium" || (subscription == null ? void 0 : subscription.tier) === "enhanced") && /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: route("hotelier.hotels.analytics", claim.hotel.slug),
                      className: "inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-orange-50 text-orange-600 font-medium rounded-lg hover:bg-orange-100 transition-colors text-xs",
                      children: [
                        /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 sm:w-3.5 sm:h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }),
                        "Analytics"
                      ]
                    }
                  )
                ] })
              ] })
            ] }) }, claim.id);
          }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  HotelierClaimsIndex as default
};

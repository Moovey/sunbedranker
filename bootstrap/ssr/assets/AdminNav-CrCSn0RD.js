import { jsx, jsxs } from "react/jsx-runtime";
import { usePage, Link } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
function AdminNav({ stats }) {
  const { auth, adminStats } = usePage().props;
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [pendingClaims, setPendingClaims] = useState(
    (stats == null ? void 0 : stats.pending_claims) ?? (adminStats == null ? void 0 : adminStats.pending_claims) ?? 0
  );
  const dropdownRef = useRef(null);
  useEffect(() => {
    const poll = () => {
      fetch(route("admin.api.stats.pending-claims"), {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Accept": "application/json"
        },
        credentials: "same-origin"
      }).then((res) => res.ok ? res.json() : null).then((data) => {
        if (data && typeof data.pending_claims === "number") {
          setPendingClaims(data.pending_claims);
        }
      }).catch(() => {
      });
    };
    poll();
    const interval = setInterval(poll, 3e4);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const count = (stats == null ? void 0 : stats.pending_claims) ?? (adminStats == null ? void 0 : adminStats.pending_claims);
    if (typeof count === "number") {
      setPendingClaims(count);
    }
  }, [stats == null ? void 0 : stats.pending_claims, adminStats == null ? void 0 : adminStats.pending_claims]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return /* @__PURE__ */ jsx("nav", { className: "bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 sm:gap-8", children: [
        /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center flex-shrink-0 gap-2 sm:gap-3", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/logo.png",
              alt: "Sunbed Ranker",
              className: "h-10 sm:h-12 md:h-14 w-auto object-contain"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm font-light text-neutral-600 border-l pl-2 sm:pl-3 tracking-wide", children: "Admin" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin",
              className: `px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.dashboard") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
              children: "Dashboard"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin/hotels",
              className: `px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.hotels.*") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
              children: "Hotels"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin/scoring",
              className: `px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.scoring.*") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
              children: "Scoring"
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/admin/claims",
              className: `px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.claims.*") || route().current("admin.hoteliers.*") || route().current("admin.subscriptions.*") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
              children: [
                "Hoteliers",
                pendingClaims > 0 && /* @__PURE__ */ jsx("span", { className: "ml-2 px-2 py-0.5 text-xs font-normal bg-neutral-900 text-white rounded-full", children: pendingClaims })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin/users",
              className: `px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.users.*") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
              children: "Users"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin/destinations",
              className: `px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.destinations.*") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
              children: "Destinations"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/admin/content",
              className: `px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.content.*") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
              children: "Content"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/",
            className: "hidden sm:block text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 font-light transition-colors duration-300",
            children: "← Back to Site"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowUserDropdown(!showUserDropdown),
              className: "flex items-center gap-2 px-2 sm:px-3 py-2 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-all duration-300",
              children: [
                auth.user.profile_picture_url ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: auth.user.profile_picture_url,
                    alt: auth.user.name,
                    className: "w-8 h-8 rounded-full object-cover"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-light", children: auth.user.name.charAt(0).toUpperCase() }),
                /* @__PURE__ */ jsx("span", { className: "hidden sm:block text-sm font-light text-neutral-700 max-w-[100px] truncate", children: auth.user.name }),
                /* @__PURE__ */ jsx("svg", { className: `w-4 h-4 text-neutral-600 transition-transform duration-300 ${showUserDropdown ? "rotate-180" : ""}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
              ]
            }
          ),
          showUserDropdown && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-1 z-50 border border-neutral-100", children: [
            /* @__PURE__ */ jsxs("div", { className: "px-4 py-2 border-b border-neutral-100", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-light text-neutral-900 truncate", children: auth.user.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 font-light truncate", children: auth.user.email })
            ] }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("admin.profile"),
                className: "block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 font-light transition-colors duration-300",
                children: "Profile Settings"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("logout"),
                method: "post",
                as: "button",
                className: "block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-50 font-light transition-colors duration-300",
                children: "Logout"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowMobileMenu(!showMobileMenu),
            className: "md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors duration-300",
            children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: showMobileMenu ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
          }
        )
      ] })
    ] }),
    showMobileMenu && /* @__PURE__ */ jsxs("div", { className: "md:hidden border-t border-neutral-200 py-4 space-y-2", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/admin",
          className: `block px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.dashboard") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
          onClick: () => setShowMobileMenu(false),
          children: "Dashboard"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/admin/hotels",
          className: `block px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.hotels.*") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
          onClick: () => setShowMobileMenu(false),
          children: "Hotels"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/admin/scoring",
          className: `block px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.scoring.*") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
          onClick: () => setShowMobileMenu(false),
          children: "Scoring"
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: "/admin/claims",
          className: `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.claims.*") || route().current("admin.hoteliers.*") || route().current("admin.subscriptions.*") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
          onClick: () => setShowMobileMenu(false),
          children: [
            /* @__PURE__ */ jsx("span", { children: "Hoteliers" }),
            pendingClaims > 0 && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 text-xs font-normal bg-neutral-900 text-white rounded-full", children: pendingClaims })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/admin/users",
          className: `block px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.users.*") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
          onClick: () => setShowMobileMenu(false),
          children: "Users"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/admin/destinations",
          className: `block px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.destinations.*") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
          onClick: () => setShowMobileMenu(false),
          children: "Destinations"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/admin/content",
          className: `block px-3 py-2 rounded-lg text-sm font-light transition-all duration-300 ${route().current("admin.content.*") ? "bg-neutral-100 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`,
          onClick: () => setShowMobileMenu(false),
          children: "Content"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/",
          className: "block sm:hidden px-3 py-2 rounded-lg text-sm font-light text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-all duration-300",
          onClick: () => setShowMobileMenu(false),
          children: "← Back to Site"
        }
      )
    ] })
  ] }) });
}
export {
  AdminNav as A
};

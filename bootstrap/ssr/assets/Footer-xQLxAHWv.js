import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs("footer", { className: "bg-neutral-900 text-neutral-300", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2 lg:col-span-1", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", className: "inline-block mb-4", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/logo.png",
            alt: "Sunbed Ranker",
            className: "h-12 w-auto brightness-0 invert opacity-90"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-400 leading-relaxed mb-4", children: "The leading independent travel resource for hotel pool and sunbed reviews. We help travelers find the perfect poolside experience with expert ratings, detailed guides, and honest comparisons." }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-800 rounded-full text-xs text-neutral-400", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-green-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
          "Independent Reviews"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-white font-semibold text-sm uppercase tracking-wider mb-4", children: "Explore" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("destinations.index"), className: "text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200", children: "Destinations" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("blog.index"), className: "text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200", children: "Travel Guides & Tips" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("compare.index"), className: "text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200", children: "Compare Hotels" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: route("search"), className: "text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200", children: "Search Hotels" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-white font-semibold text-sm uppercase tracking-wider mb-4", children: "Resources" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/about", className: "text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200", children: "About Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/how-we-rate", className: "text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200", children: "How We Rate Hotels" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/editorial-policy", className: "text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200", children: "Editorial Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/contact", className: "text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200", children: "Contact Us" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-white font-semibold text-sm uppercase tracking-wider mb-4", children: "Legal" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", className: "text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200", children: "Privacy Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/terms-of-service", className: "text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200", children: "Terms of Service" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/cookie-policy", className: "text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200", children: "Cookie Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { href: "/affiliate-disclosure", className: "text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200", children: "Affiliate Disclosure" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-neutral-800", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-neutral-500", children: [
        "© ",
        currentYear,
        " Sunbed Ranker. All rights reserved. Independent travel reviews since 2024."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-neutral-500", children: [
        /* @__PURE__ */ jsx("span", { className: "text-neutral-600", children: "Affiliate Disclosure:" }),
        " Some links on this site are affiliate links. We may earn a commission at no extra cost to you."
      ] }) })
    ] }) }) })
  ] });
}
export {
  Footer as F
};

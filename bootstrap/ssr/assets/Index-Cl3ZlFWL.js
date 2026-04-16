import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { S as SeoHead } from "./SeoHead-BbXGBbkp.js";
import { u as useAppUrl } from "./useAppUrl-B4l_DIW7.js";
import { H as Header } from "./Header-IxKzTBec.js";
import { F as Footer } from "./Footer-xQLxAHWv.js";
import "react";
function DestinationsIndex({ destinations }) {
  const items = (destinations == null ? void 0 : destinations.data) || [];
  const appUrl = useAppUrl();
  const grouped = items.reduce((acc, dest) => {
    const country = dest.country || "Other";
    if (!acc[country]) acc[country] = [];
    acc[country].push(dest);
    return acc;
  }, {});
  const countries = Object.entries(grouped);
  const { links } = destinations || {};
  const nextUrl = destinations == null ? void 0 : destinations.next_page_url;
  const prevUrl = destinations == null ? void 0 : destinations.prev_page_url;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SeoHead,
      {
        title: "Travel Destinations | Best Hotel Pools & Sunbed Reviews",
        description: "Explore top travel destinations with the best hotel pools and sunbed experiences. Detailed reviews, pool ratings, and expert travel tips for every destination.",
        path: "/destinations",
        prev: prevUrl,
        next: nextUrl,
        schema: {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Travel Destinations",
          "description": "Explore top travel destinations with the best hotel pools and sunbed experiences worldwide.",
          "url": `${appUrl}/destinations`,
          "publisher": {
            "@type": "Organization",
            "name": "Sunbed Ranker",
            "logo": { "@type": "ImageObject", "url": `${appUrl}/images/logo.png` }
          }
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white font-sans", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4", children: "Explore Destinations" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-white/90 max-w-2xl mx-auto", children: "Discover top-rated hotels with the best pool and sunbed experiences around the world" })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 lg:py-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: countries.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-12", children: countries.map(([country, countryDestinations]) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900", children: country }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-gray-200" }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500 font-medium", children: [
            countryDestinations.length,
            " ",
            countryDestinations.length === 1 ? "destination" : "destinations"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: countryDestinations.map((destination) => /* @__PURE__ */ jsxs(
          Link,
          {
            href: `/destinations/${destination.slug}`,
            className: "group bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:scale-105",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-gray-100", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: destination.image ? destination.image.startsWith("http") ? destination.image : `/storage/${destination.image}` : "/images/default-destination.svg",
                    alt: destination.name,
                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" }),
                /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-gray-900 shadow-lg", children: [
                  destination.active_hotels_count || 0,
                  " ",
                  destination.active_hotels_count === 1 ? "hotel" : "hotels"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2", children: destination.name }),
                destination.description && /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm line-clamp-2", children: destination.description }),
                /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center text-orange-500 font-semibold text-sm", children: [
                  "Explore hotels",
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
                ] })
              ] })
            ]
          },
          destination.id
        )) })
      ] }, country)) }) : (
        /* Empty State */
        /* @__PURE__ */ jsxs("div", { className: "text-center py-20", children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxs("svg", { className: "w-12 h-12 text-orange-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
          ] }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-2", children: "No destinations yet" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Check back soon for exciting new destinations!" }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/",
              className: "inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
                "Back to Home"
              ]
            }
          )
        ] })
      ) }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-b from-orange-50 to-white py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold text-gray-900 mb-4", children: "Can't find your destination?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg mb-8 font-medium", children: "We're constantly adding new destinations. Let us know where you'd like to see next!" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/",
            className: "bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block",
            children: "Back to Home"
          }
        )
      ] }) }),
      links && links.length > 3 && /* @__PURE__ */ jsx("div", { className: "py-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("nav", { className: "flex items-center justify-center gap-1", children: links.map((link, i) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${link.active ? "bg-orange-500 text-white" : link.url ? "text-gray-700 hover:bg-orange-50 hover:text-orange-600" : "text-gray-300 cursor-not-allowed"}`,
          preserveScroll: true,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        i
      )) }) }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  DestinationsIndex as default
};

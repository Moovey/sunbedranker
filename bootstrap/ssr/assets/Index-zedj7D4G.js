import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { S as SeoHead } from "./SeoHead-4uo-hZVI.js";
import { u as useAppUrl } from "./useAppUrl-B4l_DIW7.js";
import { H as Header } from "./Header-nFqKg1Hd.js";
import { F as Footer } from "./Footer-cnkUfBq_.js";
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
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50/60 font-sans", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20 lg:py-24", children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_20%_20%,white,transparent_55%),radial-gradient(circle_at_80%_60%,white,transparent_50%)]" }),
        /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.05]", children: "Explore Destinations" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-white/90 max-w-2xl mx-auto", children: "Discover top-rated hotels with the best pool and sunbed experiences around the world" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 lg:py-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: countries.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-12", children: countries.map(([country, countryDestinations]) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold tracking-tight text-slate-900", children: country }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-slate-200" }),
          /* @__PURE__ */ jsxs("span", { className: "text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500", children: [
            countryDestinations.length,
            " ",
            countryDestinations.length === 1 ? "destination" : "destinations"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: countryDestinations.map((destination) => /* @__PURE__ */ jsxs(
          Link,
          {
            href: `/destinations/${destination.slug}`,
            className: "group bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] overflow-hidden transition-all duration-300 hover:ring-slate-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_18px_36px_-18px_rgba(15,23,42,0.22)] hover:-translate-y-0.5",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-slate-100", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: destination.image ? destination.image.startsWith("http") ? destination.image : `/storage/${destination.image}` : "/images/default-destination.svg",
                    alt: destination.name,
                    className: "w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500",
                    loading: "lazy",
                    width: 400,
                    height: 300,
                    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" }),
                /* @__PURE__ */ jsxs("div", { className: "absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-900 ring-1 ring-inset ring-black/[0.04] shadow-sm", children: [
                  destination.active_hotels_count || 0,
                  " ",
                  destination.active_hotels_count === 1 ? "hotel" : "hotels"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors mb-2", children: destination.name }),
                destination.description && /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm line-clamp-2 leading-relaxed", children: destination.description }),
                /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center text-orange-600 font-semibold text-sm", children: [
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
        /* @__PURE__ */ jsxs("div", { className: "text-center py-20 bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)]", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto mb-6 bg-orange-50 ring-1 ring-inset ring-orange-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxs("svg", { className: "w-10 h-10 text-orange-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
          ] }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold tracking-tight text-slate-900 mb-2", children: "No destinations yet" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 mb-6", children: "Check back soon for exciting new destinations!" }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/",
              className: "inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-tight px-6 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04]",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
                "Back to Home"
              ]
            }
          )
        ] })
      ) }) }),
      links && links.length > 3 && /* @__PURE__ */ jsx("div", { className: "py-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("nav", { className: "flex items-center justify-center gap-1", children: links.map((link, i) => /* @__PURE__ */ jsx(
        Link,
        {
          href: link.url || "#",
          className: `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${link.active ? "bg-orange-500 text-white shadow-sm ring-1 ring-inset ring-black/[0.04]" : link.url ? "text-slate-700 hover:bg-slate-50 ring-1 ring-slate-200 hover:ring-slate-300" : "text-slate-300 cursor-not-allowed"}`,
          preserveScroll: true,
          dangerouslySetInnerHTML: { __html: link.label }
        },
        i
      )) }) }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-b from-orange-50/70 to-slate-50/60 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4", children: "Can't find your destination?" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-lg mb-8", children: "We're constantly adding new destinations. Let us know where you'd like to see next!" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/",
            className: "inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-tight px-8 py-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04]",
            children: "Back to Home"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  DestinationsIndex as default
};

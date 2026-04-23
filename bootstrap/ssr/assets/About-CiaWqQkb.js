import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { S as SeoHead } from "./SeoHead-4uo-hZVI.js";
import { u as useAppUrl } from "./useAppUrl-B4l_DIW7.js";
import { H as Header } from "./Header-nFqKg1Hd.js";
import { F as Footer } from "./Footer-cnkUfBq_.js";
import "react";
function About() {
  const appUrl = useAppUrl();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SeoHead,
      {
        title: "About Us",
        description: "Learn about Sunbed Ranker - the leading independent travel resource for hotel pool and sunbed reviews. Our mission, team, and commitment to honest travel advice.",
        path: "/about",
        schema: {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Sunbed Ranker",
          "description": "The leading independent travel resource for hotel pool and sunbed reviews.",
          "url": `${appUrl}/about`,
          "publisher": {
            "@type": "Organization",
            "name": "Sunbed Ranker",
            "logo": { "@type": "ImageObject", "url": `${appUrl}/images/logo.png` },
            "foundingDate": "2024",
            "description": "Independent travel guide specializing in hotel pool and sunbed reviews."
          }
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50/60 font-sans", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-3 sm:mb-4", children: "About Sunbed Ranker" }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-orange-100/90 max-w-2xl mx-auto", children: "The independent travel guide dedicated to helping you find the perfect poolside experience" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6", children: "Our Mission" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-base sm:text-lg leading-relaxed mb-4", children: "At Sunbed Ranker, we believe that the pool experience can make or break a holiday. That's why we created the world's first dedicated platform for rating and comparing hotel pools and sunbed availability." }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-base sm:text-lg leading-relaxed mb-4", children: "We understand the frustration of arriving at a beautifully marketed resort only to discover overcrowded pools, insufficient sunbeds, and nowhere to relax. Our mission is to eliminate these unpleasant surprises by providing transparent, data-driven reviews of every hotel's poolside experience." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6", children: "What We Do" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-orange-50/60 rounded-2xl ring-1 ring-inset ring-orange-100 p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold tracking-tight text-slate-900 mb-3", children: "Detailed Pool Reviews" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "We evaluate hotels based on 10 specific pool criteria including sunbed-to-guest ratio, sun exposure, atmosphere, cleanliness, and more." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50/60 rounded-2xl ring-1 ring-inset ring-blue-100 p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold tracking-tight text-slate-900 mb-3", children: "Expert Travel Guides" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "Our editorial team publishes original travel guides, destination stories, pool tips, and insider knowledge to help travelers plan better holidays." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-green-50/60 rounded-2xl ring-1 ring-inset ring-green-100 p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold tracking-tight text-slate-900 mb-3", children: "Honest Comparisons" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "Compare hotels side-by-side on the metrics that matter most to sun-seekers: sunbed availability, pool quality, and overall atmosphere." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-purple-50/60 rounded-2xl ring-1 ring-inset ring-purple-100 p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold tracking-tight text-slate-900 mb-3", children: "Destination Insights" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "Discover the best pool destinations worldwide with curated hotel rankings and local travel tips for every type of traveler." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6", children: "Our Story" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-base sm:text-lg leading-relaxed mb-4", children: "Sunbed Ranker was born from a simple but common frustration: booking a luxury hotel with a stunning pool in the photos, only to arrive and find that every sunbed is either reserved with towels at 6 AM or simply doesn't exist in sufficient numbers for the guests." }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-base sm:text-lg leading-relaxed mb-4", children: "We started by developing a unique 10-point scoring system that evaluates every aspect of a hotel's pool area — from sunbed-to-guest ratios and sun exposure hours to noise levels, cleanliness, and family friendliness. Today, we cover hundreds of hotels across popular destinations, and our travel blog is regularly updated with fresh guides, tips, and destination stories." }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-base sm:text-lg leading-relaxed", children: "Our content team includes experienced travelers and hospitality enthusiasts who visit and review pools firsthand, combining on-the-ground insights with data analysis to produce the most reliable pool reviews available anywhere." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6", children: "Our Values" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-white", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold tracking-tight text-slate-900", children: "Independence" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "Our reviews are independent and unbiased. Hotels cannot pay for higher ratings." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-white", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold tracking-tight text-slate-900", children: "Transparency" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "We clearly disclose how we rate hotels and how we earn revenue through affiliate partnerships." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-white", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold tracking-tight text-slate-900", children: "Quality Content" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "We publish only original, well-researched articles and never use AI-generated content without human editorial oversight." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-white", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold tracking-tight text-slate-900", children: "Traveler First" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-700", children: "Everything we do is designed to help real travelers make better-informed decisions about their holidays." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] p-8 sm:p-12 text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-4", children: "Start Exploring" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-base sm:text-lg mb-6", children: "Ready to find your perfect pool? Browse our destinations or read our latest travel guides." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsx(Link, { href: "/destinations", className: "bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-tight px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04]", children: "Browse Destinations" }),
            /* @__PURE__ */ jsx(Link, { href: "/guides", className: "bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold tracking-tight px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 shadow-sm ring-1 ring-slate-200 hover:ring-slate-300", children: "Read Travel Guides" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  About as default
};

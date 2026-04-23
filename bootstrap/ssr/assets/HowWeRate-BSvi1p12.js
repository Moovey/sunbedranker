import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { S as SeoHead } from "./SeoHead-4uo-hZVI.js";
import { H as Header } from "./Header-nFqKg1Hd.js";
import { F as Footer } from "./Footer-cnkUfBq_.js";
import "@inertiajs/react";
import "./useAppUrl-B4l_DIW7.js";
import "react";
function HowWeRate() {
  const criteria = [
    { name: "Sunbed-to-Guest Ratio", description: "We calculate the number of available sunbeds relative to room capacity. Hotels with a ratio of 1:1 or better receive top marks.", weight: "High" },
    { name: "Sun Exposure & Orientation", description: "We assess the number of hours of direct sunlight the pool area receives, pool orientation (south-facing is ideal), and availability of shaded areas.", weight: "High" },
    { name: "Pool Area Size & Variety", description: "Total pool area per guest, number of pools, variety (infinity, lap, plunge), and overall design quality.", weight: "Medium" },
    { name: "Towel & Reservation Policy", description: 'We evaluate towel availability, reservation policies, and whether the hotel effectively manages "towel wars."', weight: "Medium" },
    { name: "Pool Facilities & Comfort", description: "Quality of sunbed padding, availability of umbrellas, pool bars, changing facilities, and overall comfort level.", weight: "Medium" },
    { name: "Noise & Atmosphere", description: "Music levels, crowd noise, designated quiet zones, and the general ambiance of the pool area.", weight: "Medium" },
    { name: "Cleanliness & Maintenance", description: "Water quality, pool cleaning frequency, sunbed condition, and overall maintenance of the pool area.", weight: "High" },
    { name: "Accessibility Features", description: "Pool entry ramps, accessible changing rooms, sunbed spacing for wheelchair users, and overall inclusivity.", weight: "Low" },
    { name: "Kids & Family Facilities", description: "Children's pools, water features, lifeguard presence, family-friendly zones, and child safety measures.", weight: "Low" },
    { name: "Extras & Luxury Touches", description: "Cabanas, private pools, premium sunbeds, VIP areas, and any special poolside amenities.", weight: "Low" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SeoHead,
      {
        title: "How We Rate Hotels - Our Scoring Methodology",
        description: "Learn how Sunbed Ranker rates and scores hotel pools. Our transparent 10-point scoring system evaluates sunbed ratios, sun exposure, atmosphere, cleanliness, and more.",
        path: "/how-we-rate"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50/60 font-sans", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-3 sm:mb-4", children: "How We Rate Hotels" }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-orange-100/90 max-w-2xl mx-auto", children: "Our transparent scoring methodology ensures fair, consistent, and helpful hotel pool reviews" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16", children: [
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6", children: "Our Scoring System" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-base sm:text-lg leading-relaxed mb-4", children: "Every hotel on Sunbed Ranker is evaluated using our proprietary 10-point scoring system. Each criterion is assessed independently and weighted based on its impact on the overall pool experience. The final score is a weighted average that gives travelers a clear, at-a-glance understanding of what to expect." }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-base sm:text-lg leading-relaxed mb-4", children: "Our scores range from 0 to 10, where 10 represents an exceptional pool experience. We update scores regularly as hotels make improvements or when new information becomes available." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6", children: "The 10 Rating Criteria" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: criteria.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/60 rounded-xl ring-1 ring-inset ring-slate-200/70 p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0", children: index + 1 }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold tracking-tight text-slate-900", children: item.name })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: `px-3 py-1 rounded-full text-xs font-bold ${item.weight === "High" ? "bg-red-100 text-red-700" : item.weight === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`, children: [
                item.weight,
                " Weight"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-700 leading-relaxed", children: item.description })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6", children: "Data Sources" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-base sm:text-lg leading-relaxed mb-4", children: "Our reviews combine multiple data sources to ensure accuracy:" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: [
            "On-site visits and inspections by our review team",
            "Hotel-provided information verified against guest reports",
            "Satellite imagery for pool orientation and sun exposure analysis",
            "Guest reviews and feedback aggregated from multiple platforms",
            "Regular updates as hotels renovate or change their facilities"
          ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-orange-500 flex-shrink-0 mt-1", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-slate-700 text-base sm:text-lg", children: item })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "bg-orange-50/60 rounded-2xl ring-1 ring-inset ring-orange-100 p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-4", children: "Independence Guarantee" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-700 text-base sm:text-lg leading-relaxed", children: "Hotels cannot pay for higher ratings on Sunbed Ranker. While hotels may claim their listing and provide additional information, our scoring is entirely based on objective criteria. This independence is central to our value as a trusted travel resource." })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  HowWeRate as default
};

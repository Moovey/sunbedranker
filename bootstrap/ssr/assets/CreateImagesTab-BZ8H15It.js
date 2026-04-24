import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import imageCompression from "browser-image-compression";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";
function TabButton({ active, onClick, children }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: `relative whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 ${active ? "bg-white text-orange-600 border border-slate-200 border-b-white -mb-px shadow-[0_-1px_2px_rgba(15,23,42,0.03)]" : "text-slate-500 hover:text-slate-900 hover:bg-white/70"}`,
      children: [
        children,
        active && /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-3 right-3 top-0 h-0.5 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400" })
      ]
    }
  );
}
function PoolCriteriaTab({ data, setData, errors }) {
  const [expandedSections, setExpandedSections] = useState({
    sunbed: true,
    sun: true,
    pool: true,
    towel: false,
    facilities: false,
    atmosphere: false,
    cleanliness: false,
    accessibility: false,
    kids: false,
    luxury: false
  });
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const handleCheckboxArray = (field, value) => {
    const current = data[field] || [];
    if (current.includes(value)) {
      setData(field, current.filter((item) => item !== value));
    } else {
      setData(field, [...current, value]);
    }
  };
  const sunbedRatio = data.total_rooms && data.sunbed_count ? (data.sunbed_count / (data.total_rooms * 2)).toFixed(2) : null;
  const getSunbedRatioLabel = (ratio) => {
    if (!ratio) return "";
    if (ratio >= 1) return "✅ Excellent";
    if (ratio >= 0.75) return "👍 Very Good";
    if (ratio >= 0.5) return "😊 Good";
    if (ratio >= 0.33) return "😐 Average";
    return "⚠️ Limited";
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-800", children: [
      "📊 Complete these criteria to calculate your hotel's ",
      /* @__PURE__ */ jsx("strong", { children: "Pool & Sun Score" }),
      " (0-10) and category scores (Sun Availability, Comfort, Family-Friendly, Peace & Quiet, Party Vibe)"
    ] }) }),
    /* @__PURE__ */ jsx(
      Section,
      {
        title: "1. Sunbed-to-Guest Ratio",
        expanded: expandedSections.sunbed,
        onToggle: () => toggleSection("sunbed"),
        children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Total Sunbeds Available *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                min: "0",
                value: data.sunbed_count || "",
                onChange: (e) => setData("sunbed_count", e.target.value),
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                placeholder: "e.g. 150"
              }
            ),
            errors.sunbed_count && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.sunbed_count })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Total Hotel Rooms" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.total_rooms || "",
                disabled: true,
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-50"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 mt-1", children: "From Basic Info tab" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Calculated Ratio" }),
            /* @__PURE__ */ jsx("div", { className: "w-full px-4 py-2 border border-neutral-300 rounded-lg bg-emerald-50 font-semibold text-emerald-800", children: sunbedRatio || "—" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-600 mt-1 font-medium", children: getSunbedRatioLabel(sunbedRatio) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Section,
      {
        title: "2. Sun Exposure & Orientation",
        expanded: expandedSections.sun,
        onToggle: () => toggleSection("sun"),
        children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Sun Exposure *" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.sun_exposure || "",
                onChange: (e) => setData("sun_exposure", e.target.value),
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select sun exposure..." }),
                  /* @__PURE__ */ jsx("option", { value: "all_day", children: "All Day Sun ☀️" }),
                  /* @__PURE__ */ jsx("option", { value: "afternoon_only", children: "Afternoon Sun 🌅" }),
                  /* @__PURE__ */ jsx("option", { value: "morning_only", children: "Morning Sun 🌄" }),
                  /* @__PURE__ */ jsx("option", { value: "partial_shade", children: "Partial Shade 🌤️" }),
                  /* @__PURE__ */ jsx("option", { value: "mostly_shaded", children: "Mostly Shaded 🌳" })
                ]
              }
            ),
            errors.sun_exposure && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.sun_exposure })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Which Areas are Sunny? (Select all that apply)" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: ["main_pool", "kids_pool", "quiet_area", "rooftop", "adult_pool", "terrace", "sun_terrace", "garden", "beach_deck"].map((area) => /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: (data.sunny_areas || []).includes(area),
                  onChange: () => handleCheckboxArray("sunny_areas", area),
                  className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: area.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") })
            ] }, area)) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Section,
      {
        title: "3. Pool Area Size & Variety",
        expanded: expandedSections.pool,
        onToggle: () => toggleSection("pool"),
        children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Main Pool Size (m²)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                step: "0.01",
                min: "0",
                value: data.pool_size_sqm || "",
                onChange: (e) => setData("pool_size_sqm", e.target.value),
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                placeholder: "e.g. 250"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Pool Size Category" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.pool_size_category || "",
                onChange: (e) => setData("pool_size_category", e.target.value),
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select size..." }),
                  /* @__PURE__ */ jsx("option", { value: "small", children: "Small (<100m²)" }),
                  /* @__PURE__ */ jsx("option", { value: "medium", children: "Medium (100-300m²)" }),
                  /* @__PURE__ */ jsx("option", { value: "large", children: "Large (300-500m²)" }),
                  /* @__PURE__ */ jsx("option", { value: "very_large", children: "Very Large (500m²+)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Number of Pools *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                min: "1",
                value: data.number_of_pools || 1,
                onChange: (e) => setData("number_of_pools", e.target.value),
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Pool Types (Select all that apply)" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
              { value: "main", label: "Main Pool" },
              { value: "infinity", label: "Infinity Pool" },
              { value: "kids", label: "Kids Pool" },
              { value: "adult_only", label: "Adult-Only Pool" },
              { value: "indoor", label: "Indoor Pool" },
              { value: "rooftop", label: "Rooftop Pool" },
              { value: "lagoon", label: "Lagoon-Style" },
              { value: "heated", label: "Heated Pool" },
              { value: "plunge", label: "Plunge Pool" },
              { value: "olympic", label: "Olympic-Size" }
            ].map((type) => /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: (data.pool_types || []).includes(type.value),
                  onChange: () => handleCheckboxArray("pool_types", type.value),
                  className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: type.label })
            ] }, type.value)) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Section,
      {
        title: "4. Towel & Reservation Policy",
        expanded: expandedSections.towel,
        onToggle: () => toggleSection("towel"),
        children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Towel Reservation Policy" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.towel_reservation_policy || "",
                onChange: (e) => setData("towel_reservation_policy", e.target.value),
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select policy..." }),
                  /* @__PURE__ */ jsx("option", { value: "enforced", children: "Strictly Enforced 🚫" }),
                  /* @__PURE__ */ jsx("option", { value: "tolerated", children: "Tolerated 😐" }),
                  /* @__PURE__ */ jsx("option", { value: "free_for_all", children: "Free-for-All 🤷" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Towel Service Cost" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.towel_service_cost || "",
                onChange: (e) => setData("towel_service_cost", e.target.value),
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select cost..." }),
                  /* @__PURE__ */ jsx("option", { value: "included", children: "Included ✅" }),
                  /* @__PURE__ */ jsx("option", { value: "extra_cost", children: "Extra Cost 💰" }),
                  /* @__PURE__ */ jsx("option", { value: "deposit_required", children: "Deposit Required 🔐" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Pool Opening Hours" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.pool_opening_hours || "",
                onChange: (e) => setData("pool_opening_hours", e.target.value),
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                placeholder: "e.g. 07:00-22:00"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Section,
      {
        title: "5. Pool Facilities & Comfort",
        expanded: expandedSections.facilities,
        onToggle: () => toggleSection("facilities"),
        children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Sunbed Types (Select all that apply)" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
              { value: "plastic", label: "Plastic Loungers" },
              { value: "plastic_with_cushion", label: "Plastic + Cushion" },
              { value: "cushioned", label: "Cushioned Beds" },
              { value: "cabanas", label: "Cabanas" },
              { value: "balinese_beds", label: "Balinese Beds" },
              { value: "bali_beds", label: "Bali Beds" },
              { value: "double_loungers", label: "Double Loungers" },
              { value: "wooden", label: "Wooden Loungers" }
            ].map((type) => /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: (data.sunbed_types || []).includes(type.value),
                  onChange: () => handleCheckboxArray("sunbed_types", type.value),
                  className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: type.label })
            ] }, type.value)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Shade Options (Select all that apply)" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
              { value: "umbrellas", label: "Umbrellas ☂️" },
              { value: "pergolas", label: "Pergolas" },
              { value: "cabanas", label: "Cabanas" },
              { value: "palm_trees", label: "Palm Trees 🌴" },
              { value: "trees", label: "Trees 🌳" },
              { value: "natural_trees", label: "Natural Trees 🌳" }
            ].map((option) => /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: (data.shade_options || []).includes(option.value),
                  onChange: () => handleCheckboxArray("shade_options", option.value),
                  className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: option.label })
            ] }, option.value)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.has_pool_bar || false,
                  onChange: (e) => setData("has_pool_bar", e.target.checked),
                  className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Pool Bar Available 🍹" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.has_waiter_service || false,
                  onChange: (e) => setData("has_waiter_service", e.target.checked),
                  className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Waiter Service 🍽️" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Distance to Bar" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.bar_distance || "",
                  onChange: (e) => setData("bar_distance", e.target.value),
                  disabled: !data.has_pool_bar,
                  className: `w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 ${!data.has_pool_bar ? "bg-neutral-100 cursor-not-allowed" : ""}`,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select distance..." }),
                    /* @__PURE__ */ jsx("option", { value: "poolside", children: "Poolside" }),
                    /* @__PURE__ */ jsx("option", { value: "close", children: "Close (<20m)" }),
                    /* @__PURE__ */ jsx("option", { value: "moderate", children: "Moderate (20-50m)" }),
                    /* @__PURE__ */ jsx("option", { value: "far", children: "Far (50m+)" })
                  ]
                }
              ),
              !data.has_pool_bar && /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 mt-1", children: 'Enable "Pool Bar Available" first' })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Distance to Toilets" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: data.toilet_distance || "",
                  onChange: (e) => setData("toilet_distance", e.target.value),
                  className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select distance..." }),
                    /* @__PURE__ */ jsx("option", { value: "adjacent", children: "Adjacent" }),
                    /* @__PURE__ */ jsx("option", { value: "close", children: "Close (<15m)" }),
                    /* @__PURE__ */ jsx("option", { value: "moderate", children: "Moderate (15-30m)" }),
                    /* @__PURE__ */ jsx("option", { value: "far", children: "Far (30m+)" })
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Section,
      {
        title: "6. Noise & Atmosphere",
        expanded: expandedSections.atmosphere,
        onToggle: () => toggleSection("atmosphere"),
        children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Pool Atmosphere/Vibe" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.atmosphere || "",
                onChange: (e) => setData("atmosphere", e.target.value),
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select atmosphere..." }),
                  /* @__PURE__ */ jsx("option", { value: "quiet", children: "Quiet & Peaceful 🧘" }),
                  /* @__PURE__ */ jsx("option", { value: "relaxed", children: "Relaxed 😌" }),
                  /* @__PURE__ */ jsx("option", { value: "family", children: "Family-Friendly 👨‍👩‍👧‍👦" }),
                  /* @__PURE__ */ jsx("option", { value: "lively", children: "Lively & Social 🎉" }),
                  /* @__PURE__ */ jsx("option", { value: "party", children: "Party Atmosphere 🎊" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Music Level" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.music_level || "",
                onChange: (e) => setData("music_level", e.target.value),
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select music level..." }),
                  /* @__PURE__ */ jsx("option", { value: "none", children: "No Music 🔇" }),
                  /* @__PURE__ */ jsx("option", { value: "low", children: "Low Background Music 🎵" }),
                  /* @__PURE__ */ jsx("option", { value: "moderate", children: "Moderate Volume 🎶" }),
                  /* @__PURE__ */ jsx("option", { value: "loud", children: "Loud Music 🔊" }),
                  /* @__PURE__ */ jsx("option", { value: "dj", children: "Live DJ 🎧" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer mb-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.has_entertainment || false,
                  onChange: (e) => setData("has_entertainment", e.target.checked),
                  className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Has Entertainment Activities" })
            ] }),
            data.has_entertainment && /* @__PURE__ */ jsx("div", { className: "ml-6 grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-neutral-50 rounded-lg", children: [
              { value: "aqua_gym", label: "Aqua Gym" },
              { value: "aqua_aerobics", label: "Aqua Aerobics" },
              { value: "games", label: "Pool Games" },
              { value: "pool_games", label: "Pool Games (Structured)" },
              { value: "animation_team", label: "Animation Team" },
              { value: "live_music", label: "Live Music" },
              { value: "dj", label: "DJ Set" }
            ].map((type) => /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: (data.entertainment_types || []).includes(type.value),
                  onChange: () => handleCheckboxArray("entertainment_types", type.value),
                  className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: type.label })
            ] }, type.value)) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Section,
      {
        title: "7. Cleanliness & Maintenance",
        expanded: expandedSections.cleanliness,
        onToggle: () => toggleSection("cleanliness"),
        children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Pool Cleanliness Rating (1-5)" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.cleanliness_rating ? Math.round(Number(data.cleanliness_rating)) : "",
                onChange: (e) => setData("cleanliness_rating", parseInt(e.target.value) || ""),
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select rating..." }),
                  /* @__PURE__ */ jsx("option", { value: "1", children: "1 - Poor" }),
                  /* @__PURE__ */ jsx("option", { value: "2", children: "2 - Fair" }),
                  /* @__PURE__ */ jsx("option", { value: "3", children: "3 - Good" }),
                  /* @__PURE__ */ jsx("option", { value: "4", children: "4 - Very Good" }),
                  /* @__PURE__ */ jsx("option", { value: "5", children: "5 - Pristine" })
                ]
              }
            ),
            errors.cleanliness_rating && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.cleanliness_rating })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Sunbed Condition Rating (1-5)" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.sunbed_condition_rating ? Math.round(Number(data.sunbed_condition_rating)) : "",
                onChange: (e) => setData("sunbed_condition_rating", parseInt(e.target.value) || ""),
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select rating..." }),
                  /* @__PURE__ */ jsx("option", { value: "1", children: "1 - Very Old" }),
                  /* @__PURE__ */ jsx("option", { value: "2", children: "2 - Worn" }),
                  /* @__PURE__ */ jsx("option", { value: "3", children: "3 - Good" }),
                  /* @__PURE__ */ jsx("option", { value: "4", children: "4 - Very Good" }),
                  /* @__PURE__ */ jsx("option", { value: "5", children: "5 - Brand New" })
                ]
              }
            ),
            errors.sunbed_condition_rating && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.sunbed_condition_rating })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Tiling/Grounds Rating (1-5)" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.tiling_condition_rating ? Math.round(Number(data.tiling_condition_rating)) : "",
                onChange: (e) => setData("tiling_condition_rating", parseInt(e.target.value) || ""),
                className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select rating..." }),
                  /* @__PURE__ */ jsx("option", { value: "1", children: "1 - Poor" }),
                  /* @__PURE__ */ jsx("option", { value: "2", children: "2 - Fair" }),
                  /* @__PURE__ */ jsx("option", { value: "3", children: "3 - Good" }),
                  /* @__PURE__ */ jsx("option", { value: "4", children: "4 - Very Good" }),
                  /* @__PURE__ */ jsx("option", { value: "5", children: "5 - Excellent" })
                ]
              }
            ),
            errors.tiling_condition_rating && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.tiling_condition_rating })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Section,
      {
        title: "8. Accessibility Features",
        expanded: expandedSections.accessibility,
        onToggle: () => toggleSection("accessibility"),
        children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.has_accessibility_ramp || false,
                onChange: (e) => setData("has_accessibility_ramp", e.target.checked),
                className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Accessibility Ramp ♿" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.has_pool_hoist || false,
                onChange: (e) => setData("has_pool_hoist", e.target.checked),
                className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Pool Hoist 🏊" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.has_step_free_access || false,
                onChange: (e) => setData("has_step_free_access", e.target.checked),
                className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Step-Free Access" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.has_elevator_to_rooftop || false,
                onChange: (e) => setData("has_elevator_to_rooftop", e.target.checked),
                className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Elevator to Rooftop Pool" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Section,
      {
        title: "9. Kids & Family Facilities",
        expanded: expandedSections.kids,
        onToggle: () => toggleSection("kids"),
        children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.has_kids_pool || false,
                  onChange: (e) => setData("has_kids_pool", e.target.checked),
                  className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Dedicated Kids Pool 👶" })
            ] }),
            data.has_kids_pool && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: [
                "Kids Pool Depth (meters) ",
                /* @__PURE__ */ jsx("span", { className: "text-neutral-400 font-normal", children: "max 2m" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  step: "0.01",
                  min: "0",
                  max: "2",
                  value: data.kids_pool_depth_m || "",
                  onChange: (e) => setData("kids_pool_depth_m", e.target.value),
                  className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                  placeholder: "e.g. 0.5"
                }
              ),
              (errors == null ? void 0 : errors.kids_pool_depth_m) && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.kids_pool_depth_m })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.has_splash_park || false,
                  onChange: (e) => setData("has_splash_park", e.target.checked),
                  className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Splash Park 💦" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.has_waterslide || false,
                  onChange: (e) => setData("has_waterslide", e.target.checked),
                  className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Water Slides 🛝" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.has_lifeguard || false,
                  onChange: (e) => setData("has_lifeguard", e.target.checked),
                  className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Lifeguard on Duty 🏊‍♂️" })
            ] }),
            data.has_lifeguard && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-2", children: "Lifeguard Hours" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.lifeguard_hours || "",
                  onChange: (e) => setData("lifeguard_hours", e.target.value),
                  className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                  placeholder: "e.g. 09:00-18:00"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      Section,
      {
        title: "10. Extras & Luxury Touches",
        expanded: expandedSections.luxury,
        onToggle: () => toggleSection("luxury"),
        children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.has_luxury_cabanas || false,
                onChange: (e) => setData("has_luxury_cabanas", e.target.checked),
                className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Luxury Cabanas 🏖️" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.has_cabana_service || false,
                onChange: (e) => setData("has_cabana_service", e.target.checked),
                className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Cabana with Service 🛎️" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.has_heated_pool || false,
                onChange: (e) => setData("has_heated_pool", e.target.checked),
                className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Heated Pool 🌡️" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.has_jacuzzi || false,
                onChange: (e) => setData("has_jacuzzi", e.target.checked),
                className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Jacuzzi / Hot Tub 🛁" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.has_adult_sun_terrace || false,
                onChange: (e) => setData("has_adult_sun_terrace", e.target.checked),
                className: "rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Adult-Only Sun Terrace 🔞" })
          ] })
        ] })
      }
    )
  ] });
}
function Section({ title, children, expanded, onToggle }) {
  return /* @__PURE__ */ jsxs("div", { className: "border border-neutral-200 rounded-lg overflow-hidden", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: onToggle,
        className: "w-full px-6 py-4 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-between transition-colors",
        children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-neutral-900", children: title }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: `w-5 h-5 text-neutral-600 transition-transform ${expanded ? "transform rotate-180" : ""}`,
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    expanded && /* @__PURE__ */ jsx("div", { className: "px-6 py-4 bg-white", children })
  ] });
}
const compressionOptions = {
  maxSizeMB: 2,
  maxWidthOrHeight: 1920,
  useWebWorker: true
};
function CreateImagesTab({ data, setData, errors, hotel, onDeleteImage, hotelId, videosRouteName = "admin.hotels.update-videos", videosRouteParam = null }) {
  const [savingVideos, setSavingVideos] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const postVideoUpdate = (videosList, file = null, onProgress = null) => {
    return new Promise((resolve, reject) => {
      var _a;
      const fd = new FormData();
      (videosList || []).forEach((v) => fd.append("videos[]", v));
      if (file) fd.append("video_files[]", file);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", route(videosRouteName, { hotel: videosRouteParam ?? hotelId }));
      xhr.setRequestHeader("X-CSRF-TOKEN", ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.content) || "");
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.withCredentials = true;
      xhr.responseType = "json";
      if (onProgress && xhr.upload) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            onProgress(Math.round(e.loaded / e.total * 100));
          }
        };
      }
      xhr.onload = () => {
        const body = xhr.response || {};
        if (xhr.status >= 200 && xhr.status < 300 && body.success) {
          resolve({ ok: true, body });
        } else {
          resolve({ ok: false, body });
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.ontimeout = () => reject(new Error("Timeout"));
      xhr.send(fd);
    });
  };
  const autoSaveVideos = async (nextVideos, nextFiles = []) => {
    var _a, _b;
    if (!hotelId) return;
    setSavingVideos(true);
    try {
      const initial = await postVideoUpdate(nextVideos);
      if (!initial.ok) {
        toast.error(((_a = initial.body) == null ? void 0 : _a.message) || "Failed to update videos");
        return;
      }
      let canonical = initial.body.videos || nextVideos;
      const files = Array.from(nextFiles || []);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress({
          current: i + 1,
          total: files.length,
          name: file.name,
          percent: 0
        });
        const res = await postVideoUpdate(canonical, file, (percent) => {
          setUploadProgress((prev) => prev && { ...prev, percent });
        });
        if (!res.ok) {
          toast.error(`Failed to upload "${file.name}": ${((_b = res.body) == null ? void 0 : _b.message) || "unknown error"}`);
          continue;
        }
        canonical = res.body.videos || canonical;
      }
      if (files.length > 0) {
        toast.success(`Uploaded ${files.length} video${files.length > 1 ? "s" : ""}`);
      } else {
        toast.success("Videos updated");
      }
      setData((prev) => ({
        ...prev,
        videos: canonical,
        video_files: []
      }));
      router.reload({ only: ["hotel"], preserveScroll: true, preserveState: true });
    } catch (err) {
      toast.error(err.message || "Failed to update videos");
    } finally {
      setSavingVideos(false);
      setUploadProgress(null);
    }
  };
  const [compressing, setCompressing] = useState(false);
  const handleMainImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setCompressing(true);
      try {
        const compressed = await imageCompression(e.target.files[0], compressionOptions);
        setData("main_image", compressed);
      } catch {
        setData("main_image", e.target.files[0]);
      }
      setCompressing(false);
    }
  };
  const handleGalleryChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCompressing(true);
      try {
        const files = Array.from(e.target.files);
        const compressed = await Promise.all(
          files.map((file) => imageCompression(file, compressionOptions).catch(() => file))
        );
        setData("gallery_images", [...data.gallery_images || [], ...compressed]);
      } catch {
        setData("gallery_images", [...data.gallery_images || [], ...Array.from(e.target.files)]);
      }
      setCompressing(false);
    }
  };
  const removeMainImage = () => {
    setData("main_image", null);
  };
  const removeGalleryImage = (index) => {
    const updatedGallery = data.gallery_images.filter((_, i) => i !== index);
    setData("gallery_images", updatedGallery);
  };
  const hasMainImage = data.main_image || hotel && (hotel.main_image_url || hotel.main_image);
  const getMainImageUrl = () => {
    if (data.main_image) {
      return URL.createObjectURL(data.main_image);
    }
    if (hotel && hotel.main_image_url) {
      return hotel.main_image_url;
    }
    if (hotel && hotel.main_image) {
      return hotel.main_image.startsWith("http") ? hotel.main_image : `/storage/${hotel.main_image}`;
    }
    return null;
  };
  const mainImageUrl = getMainImageUrl();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-neutral-900 mb-4", children: "Main Image" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600 mb-4", children: "Upload the primary image for this hotel. This will be displayed as the main photo." }),
      hasMainImage ? /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: mainImageUrl,
              alt: "Main preview",
              className: "w-64 h-40 object-cover rounded-lg border border-neutral-200"
            }
          ),
          data.main_image && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: removeMainImage,
              className: "absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: data.main_image ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-700 font-medium mb-1", children: data.main_image.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-neutral-500", children: [
            (data.main_image.size / 1024 / 1024).toFixed(2),
            " MB"
          ] })
        ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-700", children: "Current main image" }) })
      ] }) : /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            onChange: handleMainImageChange,
            className: "hidden",
            id: "main-image-upload"
          }
        ),
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "main-image-upload",
            className: `px-4 py-2 rounded-lg cursor-pointer inline-block transition-colors ${compressing ? "bg-neutral-400 cursor-wait" : "bg-neutral-900 hover:bg-neutral-800"} text-white`,
            children: compressing ? "Compressing..." : "Upload Main Image"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-500 mt-2", children: "Recommended: 1200x800px. Large images are auto-compressed before upload." })
      ] }),
      errors.main_image && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-sm mt-2", children: errors.main_image })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-neutral-200 pt-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-neutral-900 mb-4", children: "Image Gallery" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600 mb-4", children: "Upload additional images to showcase the hotel's amenities, pools, and facilities." }),
      hotel && (hotel.gallery_images_urls && hotel.gallery_images_urls.length > 0 || hotel.images && hotel.images.length > 0) && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-neutral-700 mb-3", children: "Current Gallery Images" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: (hotel.gallery_images_urls || hotel.images || []).map((imageUrlOrPath, index) => {
          var _a;
          const imageUrl = hotel.gallery_images_urls ? imageUrlOrPath : imageUrlOrPath.startsWith("http") ? imageUrlOrPath : `/storage/${imageUrlOrPath}`;
          const rawPath = (_a = hotel.images) == null ? void 0 : _a[index];
          return /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imageUrl,
                alt: `Gallery image ${index + 1}`,
                className: "w-full h-32 object-cover rounded-lg border border-neutral-200"
              }
            ),
            rawPath && onDeleteImage && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  if (confirm("Are you sure you want to delete this image?")) {
                    onDeleteImage(rawPath);
                  }
                },
                className: "absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs", children: index + 1 })
          ] }, `existing-${index}`);
        }) })
      ] }),
      data.gallery_images && data.gallery_images.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-neutral-700 mb-3", children: "New Images to Upload" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: data.gallery_images.map((image, index) => /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: URL.createObjectURL(image),
              alt: `Gallery preview ${index + 1}`,
              className: "w-full h-32 object-cover rounded-lg border border-neutral-200"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => removeGalleryImage(index),
              className: "absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700",
              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs", children: [
            "New ",
            index + 1
          ] })
        ] }, `new-${index}`)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            multiple: true,
            onChange: handleGalleryChange,
            className: "hidden",
            id: "gallery-upload"
          }
        ),
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "gallery-upload",
            className: `px-4 py-2 rounded-lg cursor-pointer inline-block transition-colors ${compressing ? "bg-neutral-400 cursor-wait" : "bg-neutral-900 hover:bg-neutral-800"} text-white`,
            children: compressing ? "Compressing images..." : data.gallery_images && data.gallery_images.length > 0 ? "Add More Images" : "Upload Gallery Images"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-500 mt-2", children: "You can select multiple images at once. Large images are auto-compressed before upload." })
      ] }),
      errors.gallery_images && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-sm mt-2", children: errors.gallery_images })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-neutral-200 pt-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-neutral-900 mb-2", children: "Pool Videos" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-neutral-600 mb-4", children: [
        "Add one or more short video tours of the pool area. Each entry can be a YouTube / Vimeo / TikTok link ",
        /* @__PURE__ */ jsx("strong", { children: "or" }),
        " an uploaded MP4 file (max 100 MB each). Videos appear on the hotel page below the map."
      ] }),
      uploadProgress && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs font-medium text-orange-900 mb-1", children: [
          /* @__PURE__ */ jsxs("span", { className: "truncate pr-2", children: [
            "Uploading ",
            uploadProgress.current,
            " of ",
            uploadProgress.total,
            ": ",
            uploadProgress.name
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex-shrink-0", children: [
            uploadProgress.percent,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full bg-orange-200 rounded-full h-2 overflow-hidden", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "bg-orange-600 h-full transition-all duration-150",
            style: { width: `${uploadProgress.percent}%` }
          }
        ) })
      ] }),
      (data.videos || []).length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-xs font-medium text-neutral-700 mb-2", children: [
          "Saved videos (",
          data.videos.length,
          ") — click ",
          /* @__PURE__ */ jsx("span", { className: "text-red-600", children: "remove" }),
          " to delete on save:"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: data.videos.map((rawEntry, idx) => {
          var _a;
          const resolved = ((hotel == null ? void 0 : hotel.videos_resolved) || []).find((v) => v.raw === rawEntry);
          const previewUrl = (resolved == null ? void 0 : resolved.url) || rawEntry;
          const isYouTube = /youtube\.com|youtu\.be/.test(previewUrl);
          const isTikTok = /tiktok\.com/.test(previewUrl);
          const isNative = /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(previewUrl);
          const ytId = isYouTube ? (_a = previewUrl.match(/(?:v=|youtu\.be\/|embed\/)([^&?\/\s]{11})/)) == null ? void 0 : _a[1] : null;
          return /* @__PURE__ */ jsxs("div", { className: "relative rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50", children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-video bg-black flex items-center justify-center", children: isYouTube && ytId ? /* @__PURE__ */ jsx(
              "img",
              {
                src: `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`,
                alt: "Video thumbnail",
                className: "w-full h-full object-cover"
              }
            ) : isNative ? /* @__PURE__ */ jsx(
              "video",
              {
                src: previewUrl,
                controls: true,
                preload: "metadata",
                className: "w-full h-full"
              }
            ) : /* @__PURE__ */ jsxs("div", { className: "text-white/80 text-center p-4", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 mx-auto mb-2 opacity-70", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-xs", children: isTikTok ? "TikTok video" : "Video link" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: previewUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex-1 text-xs text-blue-700 hover:underline truncate min-w-0",
                  title: rawEntry,
                  children: rawEntry
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  disabled: savingVideos,
                  onClick: () => {
                    if (!confirm("Remove this video" + (hotelId ? " immediately" : " on save") + "? This cannot be undone.")) return;
                    const next = [...data.videos];
                    next.splice(idx, 1);
                    setData("videos", next);
                    autoSaveVideos(next, data.video_files);
                  },
                  className: "px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded disabled:opacity-50",
                  children: savingVideos ? "Saving…" : "Remove"
                }
              )
            ] })
          ] }, `saved-${idx}`);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-1", children: "Add a video by URL" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "url",
              value: data._video_url_draft || "",
              onChange: (e) => setData("_video_url_draft", e.target.value),
              placeholder: "https://www.youtube.com/watch?v=...",
              className: "flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              disabled: savingVideos,
              onClick: () => {
                const v = (data._video_url_draft || "").trim();
                if (!v) return;
                if (!/^https?:\/\//i.test(v)) {
                  alert("Please enter a valid URL starting with http:// or https://");
                  return;
                }
                if ((data.videos || []).length >= 10) {
                  alert("Maximum 10 videos.");
                  return;
                }
                const nextVideos = [...data.videos || [], v];
                setData((prev) => ({
                  ...prev,
                  videos: nextVideos,
                  _video_url_draft: ""
                }));
                autoSaveVideos(nextVideos, data.video_files);
              },
              className: "px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-sm font-medium whitespace-nowrap disabled:opacity-50",
              children: savingVideos ? "Saving…" : "Add URL"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center text-xs text-neutral-500 my-3", children: "— OR —" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-neutral-700 mb-1", children: "Upload video files (MP4 / MOV / WebM, max 100 MB each)" }),
        (data.video_files || []).length > 0 && /* @__PURE__ */ jsx("div", { className: "mb-3 space-y-2", children: data.video_files.map((file, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-blue-600 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-neutral-900 truncate", children: file.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-neutral-500", children: [
              (file.size / 1024 / 1024).toFixed(1),
              " MB · pending upload"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                const next = [...data.video_files];
                next.splice(idx, 1);
                setData("video_files", next);
              },
              className: "text-red-600 hover:text-red-700 p-1",
              children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          )
        ] }, idx)) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            accept: "video/mp4,video/quicktime,video/webm",
            multiple: true,
            onChange: (e) => {
              const newFiles = Array.from(e.target.files || []);
              if (newFiles.length === 0) return;
              const oversized = newFiles.find((f) => f.size > 100 * 1024 * 1024);
              if (oversized) {
                alert(`"${oversized.name}" is larger than 100 MB.`);
                e.target.value = "";
                return;
              }
              const totalAfter = (data.videos || []).length + (data.video_files || []).length + newFiles.length;
              if (totalAfter > 10) {
                alert("Maximum 10 videos total.");
                e.target.value = "";
                return;
              }
              const nextFiles = [...data.video_files || [], ...newFiles];
              setData("video_files", nextFiles);
              e.target.value = "";
              if (hotelId) {
                autoSaveVideos(data.videos || [], nextFiles);
              }
            },
            className: "hidden",
            id: "video-upload",
            disabled: savingVideos
          }
        ),
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "video-upload",
            className: `px-4 py-2 rounded-lg cursor-pointer inline-block transition-colors text-white text-sm font-medium ${savingVideos ? "bg-neutral-400 cursor-not-allowed" : "bg-neutral-900 hover:bg-neutral-800"}`,
            children: savingVideos ? "Uploading…" : "Choose Video Files"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-500 mt-2", children: "Recommended: MP4 (H.264), 1080p. iPhone .mov files are also accepted." }),
        errors["video_files"] && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-sm mt-1", children: errors["video_files"] }),
        Object.keys(errors).filter((k) => k.startsWith("video_files.")).map((k) => /* @__PURE__ */ jsx("p", { className: "text-red-600 text-sm mt-1", children: errors[k] }, k))
      ] })
    ] })
  ] });
}
export {
  CreateImagesTab as C,
  PoolCriteriaTab as P,
  TabButton as T
};

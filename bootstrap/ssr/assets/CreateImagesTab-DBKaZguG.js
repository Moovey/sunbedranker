import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import imageCompression from "browser-image-compression";
function TabButton({ active, onClick, children }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      className: `px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${active ? "bg-white text-orange-600 border border-gray-100 border-b-white -mb-px" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`,
      children
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
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: ["main_pool", "kids_pool", "quiet_area", "rooftop", "adult_pool", "terrace"].map((area) => /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
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
              { value: "infinity", label: "Infinity Pool" },
              { value: "kids", label: "Kids Pool" },
              { value: "adult_only", label: "Adult-Only Pool" },
              { value: "indoor", label: "Indoor Pool" },
              { value: "rooftop", label: "Rooftop Pool" },
              { value: "lagoon", label: "Lagoon-Style" },
              { value: "heated", label: "Heated Pool" },
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
              { value: "cushioned", label: "Cushioned Beds" },
              { value: "cabanas", label: "Cabanas" },
              { value: "bali_beds", label: "Bali Beds" }
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
              { value: "games", label: "Pool Games" },
              { value: "animation_team", label: "Animation Team" },
              { value: "live_music", label: "Live Music" }
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
function CreateImagesTab({ data, setData, errors, hotel, onDeleteImage }) {
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
    ] })
  ] });
}
export {
  CreateImagesTab as C,
  PoolCriteriaTab as P,
  TabButton as T
};

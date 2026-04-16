import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { router, Link, usePage, Head } from "@inertiajs/react";
import { u as useAppUrl } from "./useAppUrl-B4l_DIW7.js";
import { H as Header } from "./Header-IxKzTBec.js";
import { F as Footer } from "./Footer-xQLxAHWv.js";
import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
function PromoBanner() {
  return /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 px-4 text-center", role: "banner", "aria-label": "Promotional offer", children: /* @__PURE__ */ jsxs("p", { className: "text-sm sm:text-base font-semibold flex items-center justify-center gap-2", children: [
    /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" }) }),
    /* @__PURE__ */ jsx("span", { children: "SPECIAL OFFER: Book now and get exclusive pool access! Limited time only. T&Cs apply." })
  ] }) });
}
const poolVibes = [
  { value: "family", label: "Families", shortLabel: "Family", icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" }) }) },
  { value: "quiet", label: "Quiet", shortLabel: "Quiet", icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }) },
  { value: "party", label: "Social", shortLabel: "Social", icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M7 8h10V6H7v2zm0 4h10v-2H7v2zm0 4h7v-2H7v2zm13.5-10.5v13.09c0 .45-.54.67-.85.35l-2.65-2.65-2.65 2.65c-.31.32-.85.1-.85-.35V5.5c0-.83.67-1.5 1.5-1.5h3.5c.83 0 1.5.67 1.5 1.5z" }) }) },
  { value: "luxury", label: "Luxury", shortLabel: "Luxury", icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }) },
  { value: "adults", label: "Adults Only", shortLabel: "Adults", icon: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" }) }) }
];
const getVibeButtonClasses = (vibe, isActive) => {
  const base = "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border";
  if (isActive) {
    return `${base} bg-orange-500 text-white border-orange-500`;
  }
  return `${base} bg-white text-gray-700 hover:bg-gray-50 border-gray-300`;
};
function HeroSection() {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    poolVibe: "",
    guests: 2
  });
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const fetchSuggestions = useCallback((text) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (text.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      fetch(`/search/autocomplete?q=${encodeURIComponent(text.trim())}`, {
        headers: { "Accept": "application/json" }
      }).then((r) => r.json()).then((data) => {
        setSuggestions(data || []);
        setShowSuggestions((data || []).length > 0);
        setActiveIndex(-1);
      }).catch(() => {
      });
    }, 250);
  }, []);
  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchData({ ...searchData, destination: val });
    fetchSuggestions(val);
  };
  const selectSuggestion = (suggestion) => {
    setSearchData({ ...searchData, destination: suggestion.value });
    setShowSuggestions(false);
    setSuggestions([]);
  };
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => i < suggestions.length - 1 ? i + 1 : 0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => i > 0 ? i - 1 : suggestions.length - 1);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (!searchData.destination) {
      alert("Please enter a destination");
      return;
    }
    setIsSearching(true);
    router.get("/search", searchData, {
      onFinish: () => setIsSearching(false)
    });
  }, [searchData]);
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-[500px] sm:min-h-[550px] lg:min-h-[500px] overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-orange-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-24 -right-24 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100 rounded-full opacity-10 blur-3xl" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative h-full flex items-center justify-center py-10 sm:py-14 md:py-16", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 leading-tight text-gray-900", children: [
        "Will You Struggle to ",
        /* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
        "Get a Sunbed?"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-700 font-medium max-w-2xl mx-auto", children: "Compare hotels by pool quality, sunbed availability, and sun exposure." }),
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-2", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-xl p-5 sm:p-6 lg:p-8 border-2 border-orange-300", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", ref: wrapperRef, children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "destination-input", className: "flex items-center gap-2 text-left text-sm font-semibold text-gray-700 mb-2", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" }) }),
              "Destination"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "destination-input",
                type: "text",
                value: searchData.destination,
                onChange: handleInputChange,
                onKeyDown: handleKeyDown,
                onFocus: () => suggestions.length > 0 && setShowSuggestions(true),
                placeholder: "Where to? (e.g., Canary Islands, Tenerife)",
                className: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 placeholder-gray-400 transition-all duration-200 text-base font-medium",
                autoComplete: "off",
                role: "combobox",
                "aria-expanded": showSuggestions,
                "aria-autocomplete": "list",
                "aria-controls": "destination-suggestions"
              }
            ),
            showSuggestions && suggestions.length > 0 && /* @__PURE__ */ jsx(
              "ul",
              {
                id: "destination-suggestions",
                role: "listbox",
                className: "absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-72 overflow-y-auto",
                children: suggestions.map((s, i) => /* @__PURE__ */ jsxs(
                  "li",
                  {
                    role: "option",
                    "aria-selected": i === activeIndex,
                    className: `flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${i === activeIndex ? "bg-orange-50" : "hover:bg-gray-50"}`,
                    onClick: () => selectSuggestion(s),
                    onMouseEnter: () => setActiveIndex(i),
                    children: [
                      /* @__PURE__ */ jsx("div", { className: `flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${s.type === "region" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"}`, children: s.type === "region" ? /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" }) }) }),
                      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-gray-900 truncate", children: s.label }),
                        s.sublabel && /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 truncate", children: s.sublabel })
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "flex-shrink-0 text-xs font-medium text-gray-400", children: [
                        s.hotel_count,
                        " ",
                        s.hotel_count === 1 ? "hotel" : "hotels"
                      ] })
                    ]
                  },
                  `${s.type}-${s.value}`
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: isSearching,
              "aria-label": isSearching ? "Searching for hotels" : "Search hotels",
              className: "w-full sm:w-auto px-8 py-3 bg-orange-500 text-white font-bold text-base rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
                  /* @__PURE__ */ jsx("path", { d: "M21 21l-4.35-4.35" })
                ] }),
                isSearching ? "Searching..." : "Search"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-5 border-t border-gray-200", children: [
          /* @__PURE__ */ jsx("p", { className: "text-left text-sm font-semibold text-gray-700 mb-3", children: "Find your perfect stay:" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: poolVibes.map((vibe) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSearchData({
                ...searchData,
                poolVibe: searchData.poolVibe === vibe.value ? "" : vibe.value
              }),
              className: getVibeButtonClasses(vibe.value, searchData.poolVibe === vibe.value),
              children: [
                vibe.icon,
                /* @__PURE__ */ jsx("span", { className: "hidden xs:inline sm:inline", children: vibe.label }),
                /* @__PURE__ */ jsx("span", { className: "inline xs:hidden sm:hidden", children: vibe.shortLabel })
              ]
            },
            vibe.value
          )) })
        ] })
      ] }) }) })
    ] }) }) })
  ] });
}
function FeaturedDestinations({ destinations }) {
  if (!(destinations == null ? void 0 : destinations.length)) return null;
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 340;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-b from-white to-blue-50 py-12 sm:py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 sm:w-12 sm:h-12 text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" }) }),
      "Popular Destinations"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 text-lg mb-8 sm:mb-10 md:mb-12 font-medium", children: "Find your perfect stay..." }),
    /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => scroll("left"),
          className: `absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-white/95 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 -translate-x-4 sm:-translate-x-6 ${canScrollLeft ? "opacity-100 visible" : "opacity-0 invisible"}`,
          "aria-label": "Scroll left",
          children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 sm:w-7 sm:h-7 text-gray-700", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M15 19l-7-7 7-7" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => scroll("right"),
          className: `absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-white/95 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 translate-x-4 sm:translate-x-6 ${canScrollRight ? "opacity-100 visible" : "opacity-0 invisible"}`,
          "aria-label": "Scroll right",
          children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 sm:w-7 sm:h-7 text-gray-700", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M9 5l7 7-7 7" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: scrollRef,
          onScroll: checkScrollButtons,
          className: "flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6",
          style: { scrollbarWidth: "none", msOverflowStyle: "none" },
          children: destinations.map((destination, index) => /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-[280px] sm:w-[320px]", children: /* @__PURE__ */ jsx(DestinationCard, { destination, index }) }, destination.id))
        }
      ),
      /* @__PURE__ */ jsx("div", { className: `absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-0"}` }),
      /* @__PURE__ */ jsx("div", { className: `absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-blue-50 to-transparent pointer-events-none transition-opacity ${canScrollRight ? "opacity-100" : "opacity-0"}` })
    ] })
  ] }) });
}
function DestinationCard({ destination, index }) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      href: `/destinations/${destination.slug}`,
      className: "group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden aspect-[4/5]", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: destination.image ? destination.image.startsWith("http") ? destination.image : `/storage/${destination.image}` : "/images/default-destination.svg",
              alt: destination.name,
              width: 400,
              height: 500,
              loading: index < 2 ? "eager" : "lazy",
              decoding: "async",
              fetchpriority: index === 0 ? "high" : "auto",
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" }) }),
            "POPULAR"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold mb-1", children: destination.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-white/90 font-medium text-sm", children: [
            destination.hotel_count,
            " hotels with pool ratings"
          ] })
        ] })
      ]
    }
  );
}
function HotelCard({ hotel, scoreType = "overall", isInCompare = false, onToggleCompare, isHotelier = false, priority = false }) {
  var _a;
  const [showCompareTooltip, setShowCompareTooltip] = useState(false);
  const [showClaimTooltip, setShowClaimTooltip] = useState(false);
  const score = scoreType === "family" ? hotel.family_score : scoreType === "quiet" ? hotel.quiet_score : scoreType === "party" ? hotel.party_score : hotel.overall_score;
  const canClaim = isHotelier && !hotel.owned_by && !hotel.has_pending_claim;
  const isPremium = hotel.is_premium;
  const handleClaimClick = (e) => {
    e.stopPropagation();
    if (hotel.owned_by) {
      toast.error("This hotel has already been claimed by another hotelier.", {
        position: "top-right",
        autoClose: 4e3
      });
      return;
    }
    if (hotel.has_pending_claim) {
      toast.warning("This hotel already has a pending claim under review.", {
        position: "top-right",
        autoClose: 4e3
      });
      return;
    }
    router.visit(`/hotelier/hotels/${hotel.slug}/claim`);
  };
  const cardClasses = isPremium ? "group bg-white overflow-hidden transition-shadow duration-200 hover:shadow-2xl rounded-2xl shadow-xl border-4 border-gradient-to-r from-yellow-400 to-orange-500 relative ring-2 ring-yellow-300" : "group bg-white overflow-hidden transition-shadow duration-200 hover:shadow-2xl rounded-2xl shadow-lg border-2 border-gray-100 relative";
  const imageAspect = isPremium ? "aspect-[16/10]" : "aspect-[4/3]";
  return /* @__PURE__ */ jsxs("div", { className: cardClasses, children: [
    /* @__PURE__ */ jsxs(Link, { href: `/hotels/${hotel.slug}`, className: "block", children: [
      /* @__PURE__ */ jsxs("div", { className: `relative overflow-hidden ${imageAspect}`, children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: hotel.main_image || "/images/default-hotel.jpg",
            alt: hotel.name,
            width: 400,
            height: isPremium ? 250 : 300,
            loading: priority ? "eager" : "lazy",
            decoding: priority ? "sync" : "async",
            fetchpriority: priority ? "high" : "auto",
            className: "w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" }),
        !!hotel.is_premium && /* @__PURE__ */ jsxs("div", { className: "absolute top-4 left-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 z-10", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" }) }),
          "PREMIUM"
        ] }),
        score && /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-bold text-base shadow-lg flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" }) }),
          score,
          "/10"
        ] }),
        !!hotel.has_pending_claim && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 left-3 right-3 bg-yellow-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" }) }),
          "Claim under review"
        ] }),
        !!hotel.owned_by && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 left-3 right-3 bg-green-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }),
          "Verified Owner"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-5 sm:p-6 bg-white", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-gray-900 mb-2", children: hotel.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mb-4 font-semibold uppercase tracking-wide flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" }) }),
          (_a = hotel.destination) == null ? void 0 : _a.name
        ] }),
        hotel.badges && hotel.badges.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5 mb-3", children: [
          hotel.badges.slice(0, 3).map((badge) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
              style: {
                backgroundColor: `${badge.color}15`,
                color: badge.color
              },
              title: badge.description || badge.name,
              children: badge.name
            },
            badge.id
          )),
          hotel.badges.length > 3 && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600", children: [
            "+",
            hotel.badges.length - 3
          ] })
        ] }),
        hotel.pool_criteria && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 text-xs", children: [
          hotel.pool_criteria.sunbed_to_guest_ratio && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full font-semibold", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" }) }),
            hotel.pool_criteria.sunbed_to_guest_ratio,
            ":1"
          ] }),
          hotel.pool_criteria.sun_exposure && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold capitalize", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" }) }),
            hotel.pool_criteria.sun_exposure.replace(/_/g, " ")
          ] }),
          hotel.pool_criteria.atmosphere && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold capitalize", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" }) }),
            hotel.pool_criteria.atmosphere
          ] })
        ] })
      ] })
    ] }),
    isPremium && hotel.direct_booking_url && /* @__PURE__ */ jsx("div", { className: "flex gap-2 px-5 sm:px-6 pb-5 sm:pb-6 bg-white", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: route("hotels.click", { hotel: hotel.slug, type: "direct" }),
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold text-sm shadow-md hover:from-green-600 hover:to-emerald-700 transition-all",
        children: [
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" }) }),
          "Book Direct"
        ]
      }
    ) }),
    (onToggleCompare || canClaim) && /* @__PURE__ */ jsxs("div", { className: `absolute ${isPremium ? "top-16" : "top-4"} left-4 flex gap-2 z-10`, children: [
      onToggleCompare && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: onToggleCompare,
            onMouseEnter: () => setShowCompareTooltip(true),
            onMouseLeave: () => setShowCompareTooltip(false),
            className: `flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 shadow-lg text-sm font-semibold ${isInCompare ? "bg-neutral-900 text-white" : "bg-white/90 text-neutral-700 hover:bg-white"}`,
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: isInCompare ? /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) : /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" }) }),
              "Compare"
            ]
          }
        ),
        showCompareTooltip && /* @__PURE__ */ jsxs("div", { className: "absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg whitespace-nowrap z-50 pointer-events-none", children: [
          isInCompare ? "Remove from comparison" : "Add to comparison",
          /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-900 rotate-45" })
        ] })
      ] }),
      canClaim && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleClaimClick,
            onMouseEnter: () => setShowClaimTooltip(true),
            onMouseLeave: () => setShowClaimTooltip(false),
            className: "flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 shadow-lg bg-orange-500 text-white hover:bg-orange-600 text-sm font-semibold",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" }) }),
              "Claim Hotel"
            ]
          }
        ),
        showClaimTooltip && /* @__PURE__ */ jsxs("div", { className: "absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg whitespace-nowrap z-50 pointer-events-none", children: [
          "Claim this hotel",
          /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-900 rotate-45" })
        ] })
      ] })
    ] })
  ] });
}
function TopRatedHotels({ hotels, isHotelier = false }) {
  if (!(hotels == null ? void 0 : hotels.length)) return null;
  return /* @__PURE__ */ jsx("section", { className: "bg-white py-12 sm:py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 md:mb-12 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2", children: "Highest Rated Pool Experiences" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg font-medium", children: "Top picks for sun seekers" })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/destinations",
          className: "bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg",
          children: "View all →"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10", children: hotels.map((hotel, index) => /* @__PURE__ */ jsx(
      HotelCard,
      {
        hotel,
        isHotelier,
        priority: index < 2
      },
      hotel.id
    )) })
  ] }) });
}
function HotelCarousel({ hotels, scoreType = "overall", isHotelier = false }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 380;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => scroll("left"),
        className: `absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-white/95 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 -translate-x-4 sm:-translate-x-6 ${canScrollLeft ? "opacity-100 visible" : "opacity-0 invisible"}`,
        "aria-label": "Scroll left",
        "aria-hidden": !canScrollLeft,
        tabIndex: canScrollLeft ? 0 : -1,
        children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 sm:w-7 sm:h-7 text-gray-700", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M15 19l-7-7 7-7" }) })
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => scroll("right"),
        className: `absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-white/95 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 translate-x-4 sm:translate-x-6 ${canScrollRight ? "opacity-100 visible" : "opacity-0 invisible"}`,
        "aria-label": "Scroll right",
        "aria-hidden": !canScrollRight,
        tabIndex: canScrollRight ? 0 : -1,
        children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 sm:w-7 sm:h-7 text-gray-700", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.5, d: "M9 5l7 7-7 7" }) })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollRef,
        onScroll: checkScrollButtons,
        className: "flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6",
        style: { scrollbarWidth: "none", msOverflowStyle: "none" },
        children: hotels.map((hotel) => /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-[320px] sm:w-[360px]", children: /* @__PURE__ */ jsx(
          HotelCard,
          {
            hotel,
            scoreType,
            isHotelier
          }
        ) }, hotel.id))
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-blue-50 to-transparent pointer-events-none transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-0"}` }),
    /* @__PURE__ */ jsx("div", { className: `absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-blue-50 to-transparent pointer-events-none transition-opacity ${canScrollRight ? "opacity-100" : "opacity-0"}` })
  ] });
}
const sectionConfigs = {
  family: {
    title: "Best for Families",
    subtitle: "Perfect pools for the whole family",
    bgClass: "bg-gradient-to-b from-blue-50 to-white",
    iconColor: "text-blue-500",
    icon: /* @__PURE__ */ jsx("path", { d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" })
  },
  quiet: {
    title: "Best for Quiet Sun",
    subtitle: "Peaceful pools for relaxation",
    bgClass: "bg-white",
    iconColor: "text-green-500",
    icon: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z" })
  },
  party: {
    title: "Best for Party Pools",
    subtitle: "Vibrant pools for socializing and fun",
    bgClass: "bg-gradient-to-b from-purple-50 to-white",
    iconColor: "text-purple-500",
    icon: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("path", { d: "M2 21h19v-3H2v3zM20 8h-3V4H3c-1.1 0-2 .9-2 2v5h19V8zm-3-3h2v2h-2V5z" }),
      /* @__PURE__ */ jsx("path", { d: "M12.5 10c1.93 0 3.5-1.57 3.5-3.5S14.43 3 12.5 3 9 4.57 9 6.5 10.57 10 12.5 10z" })
    ] })
  }
};
function HotelCarouselSection({ hotels, type, isHotelier = false }) {
  if (!(hotels == null ? void 0 : hotels.length)) return null;
  const config = sectionConfigs[type];
  if (!config) return null;
  return /* @__PURE__ */ jsx("section", { className: `${config.bgClass} py-12 sm:py-16 md:py-20`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx("svg", { className: `w-10 h-10 sm:w-12 sm:h-12 ${config.iconColor}`, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: config.icon }),
      config.title
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 text-lg mb-8 sm:mb-10 md:mb-12 font-medium", children: config.subtitle }),
    /* @__PURE__ */ jsx(
      HotelCarousel,
      {
        hotels,
        scoreType: type,
        isHotelier
      }
    )
  ] }) });
}
const features = [
  {
    icon: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 sm:w-12 sm:h-12 mx-auto text-orange-500", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" }) }),
    question: "Will I struggle to get a sunbed?",
    answer: "We show sunbed-to-guest ratios"
  },
  {
    icon: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 sm:w-12 sm:h-12 mx-auto text-yellow-500", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" }) }),
    question: "Is the pool sunny all day?",
    answer: "Sun exposure times and coverage"
  },
  {
    icon: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 sm:w-12 sm:h-12 mx-auto text-green-500", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z" }) }),
    question: "Is it quiet or noisy?",
    answer: "Atmosphere ratings and music levels"
  },
  {
    icon: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 sm:w-12 sm:h-12 mx-auto text-blue-500", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" }) }),
    question: "Is it good for families?",
    answer: "Kids pools, activities, and safety"
  }
];
function WhyChooseUs() {
  return /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-b from-orange-50 to-white py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center", children: "Get all this included..." }),
    /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600 text-base mb-8 sm:mb-10 font-medium", children: "We answer the questions that really matter" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: features.map((item, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-white rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100",
        children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3", children: item.icon }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-base font-bold mb-2 text-gray-900 text-center", children: item.question }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-xs sm:text-sm text-center font-medium", children: item.answer })
        ]
      },
      index
    )) })
  ] }) });
}
function LatestPosts({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  return /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-gray-900", children: "Pool & Sunbed Guides" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-600", children: "Expert tips and insights for the perfect pool experience" })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("blog.index"),
          className: "hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm",
          children: [
            "View all guides",
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: posts.map((post) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200",
        children: [
          /* @__PURE__ */ jsx(Link, { href: route("blog.show", post.slug), children: /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] overflow-hidden bg-gray-100", children: post.featured_image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: post.featured_image_url,
              alt: post.title,
              width: 400,
              height: 250,
              loading: "lazy",
              decoding: "async",
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-orange-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" }) }) }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
            post.category && /* @__PURE__ */ jsx(
              Link,
              {
                href: route("blog.index", { category: post.category.slug }),
                className: "inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3 transition-colors hover:opacity-80",
                style: {
                  backgroundColor: `${post.category.color}20`,
                  color: post.category.color
                },
                children: post.category.name
              }
            ),
            /* @__PURE__ */ jsx(Link, { href: route("blog.show", post.slug), children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors", children: post.title }) }),
            post.excerpt && /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm line-clamp-2 mb-4", children: post.excerpt }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500", children: [
              /* @__PURE__ */ jsx("span", { children: formatDate(post.published_at) }),
              post.views_count > 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                ] }),
                post.views_count.toLocaleString()
              ] })
            ] })
          ] })
        ]
      },
      post.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 text-center sm:hidden", children: /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("blog.index"),
        className: "inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium",
        children: [
          "View all guides",
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
        ]
      }
    ) })
  ] }) });
}
function AgodaHotelsSection({ hotels }) {
  if (!hotels || hotels.length === 0) return null;
  return /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-gradient-to-b from-blue-50 to-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 sm:mb-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3", children: "Explore More Hotels" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600 max-w-2xl mx-auto", children: "Hotels from our partner Agoda with estimated pool scores based on star rating" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: hotels.map((hotel) => /* @__PURE__ */ jsx(AgodaHotelCard, { hotel }, hotel.id)) })
  ] }) });
}
function AgodaHotelCard({ hotel }) {
  var _a;
  const score = hotel.overall_score;
  const criteria = hotel.pool_criteria;
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: hotel.landing_url || "#",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 block",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] overflow-hidden", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: hotel.main_image_url || "/images/default-hotel.jpg",
              alt: hotel.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-2 bg-blue-500/90 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold", children: "Estimated" }),
          score && /* @__PURE__ */ jsxs("div", { className: "absolute top-2 right-2 bg-white/95 backdrop-blur-sm text-gray-900 px-2.5 py-1 rounded-full text-xs font-semibold shadow", children: [
            score,
            "/10"
          ] }),
          hotel.star_rating && /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 left-2 flex items-center gap-0.5", children: Array.from({ length: Math.round(hotel.star_rating) }, (_, i) => /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-yellow-400 drop-shadow", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm sm:text-base text-gray-900 mb-1 line-clamp-1", children: hotel.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-2", children: (_a = hotel.destination) == null ? void 0 : _a.name }),
          criteria && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 mb-3", children: [
            criteria.sunbed_to_guest_ratio && /* @__PURE__ */ jsxs("span", { className: "px-1.5 py-0.5 bg-orange-50 text-orange-700 text-[10px] font-medium rounded", children: [
              "Sunbed ",
              criteria.sunbed_to_guest_ratio,
              ":1"
            ] }),
            criteria.sun_exposure && /* @__PURE__ */ jsx("span", { className: "px-1.5 py-0.5 bg-yellow-50 text-yellow-700 text-[10px] font-medium rounded capitalize", children: criteria.sun_exposure.replace(/_/g, " ") }),
            criteria.atmosphere && /* @__PURE__ */ jsx("span", { className: "px-1.5 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-medium rounded capitalize", children: criteria.atmosphere })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-gray-100", children: [
            hotel.price ? /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: "from " }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-gray-900", children: [
                hotel.currency === "USD" ? "$" : hotel.currency,
                Math.round(hotel.price)
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-500", children: "/night" })
            ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "Check price" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-1", children: [
              "Book on Agoda",
              /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function Home({
  featuredDestinations,
  topRatedHotels,
  familyFriendlyHotels,
  quietSunHotels,
  partyHotels,
  latestPosts,
  agodaHotels
}) {
  var _a;
  const { auth } = usePage().props;
  const isHotelier = ((_a = auth.user) == null ? void 0 : _a.role) === "hotelier";
  const appUrl = useAppUrl();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { title: "Find the Best Hotel Pools & Sunbeds", children: [
      /* @__PURE__ */ jsx("meta", { name: "agd-partner-manual-verification" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Sunbed Ranker is the leading independent travel guide for hotel pool and sunbed reviews. Compare hotels by pool quality, sunbed-to-guest ratio, sun exposure, and atmosphere. Expert travel tips, destination guides, and honest reviews to help you find the perfect poolside vacation." }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Sunbed Ranker - Find the Best Hotel Pools & Sunbeds" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "The leading independent travel guide for hotel pool and sunbed reviews. Compare hotels, read expert guides, and find your perfect poolside vacation." }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: appUrl }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: `${appUrl}/images/og-default.jpg` }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Sunbed Ranker" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Sunbed Ranker - Find the Best Hotel Pools & Sunbeds" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: "The leading independent travel guide for hotel pool and sunbed reviews. Compare hotels, read expert guides, and find your perfect poolside vacation." }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: `${appUrl}/images/og-default.jpg` }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: appUrl }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Sunbed Ranker",
        "url": appUrl,
        "description": "The leading independent travel guide for hotel pool and sunbed reviews.",
        "publisher": {
          "@type": "Organization",
          "name": "Sunbed Ranker",
          "logo": {
            "@type": "ImageObject",
            "url": `${appUrl}/images/logo.png`
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${appUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white font-sans", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("main", { id: "main-content", children: [
        /* @__PURE__ */ jsx(PromoBanner, {}),
        /* @__PURE__ */ jsx(HeroSection, {}),
        /* @__PURE__ */ jsx(FeaturedDestinations, { destinations: featuredDestinations }),
        /* @__PURE__ */ jsx(
          TopRatedHotels,
          {
            hotels: topRatedHotels,
            isHotelier
          }
        ),
        /* @__PURE__ */ jsx(
          HotelCarouselSection,
          {
            hotels: familyFriendlyHotels,
            type: "family",
            isHotelier
          }
        ),
        /* @__PURE__ */ jsx(
          HotelCarouselSection,
          {
            hotels: quietSunHotels,
            type: "quiet",
            isHotelier
          }
        ),
        /* @__PURE__ */ jsx(
          HotelCarouselSection,
          {
            hotels: partyHotels,
            type: "party",
            isHotelier
          }
        ),
        /* @__PURE__ */ jsx(AgodaHotelsSection, { hotels: agodaHotels }),
        /* @__PURE__ */ jsx(LatestPosts, { posts: latestPosts }),
        /* @__PURE__ */ jsx(WhyChooseUs, {})
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  Home as default
};

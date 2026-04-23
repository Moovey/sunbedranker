import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { H as HotelCard } from "./Home-Cywubr9H.js";
import "@inertiajs/react";
import "./useAppUrl-B4l_DIW7.js";
import "./Header-nFqKg1Hd.js";
import "./Footer-cnkUfBq_.js";
import "react-toastify";
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
    /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3 text-center flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx("svg", { className: `w-9 h-9 sm:w-11 sm:h-11 ${config.iconColor}`, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: config.icon }),
      config.title
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-center text-slate-500 text-base sm:text-lg mb-8 sm:mb-10 md:mb-12", children: config.subtitle }),
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
export {
  HotelCarouselSection as default
};

import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { I as Icons } from "./Show-DZ6aYIPw.js";
import "@inertiajs/react";
import "./useAppUrl-B4l_DIW7.js";
import "./Header-nFqKg1Hd.js";
import "./Footer-cnkUfBq_.js";
const FaqItem = ({ question, answer, isOpen, onClick }) => /* @__PURE__ */ jsxs("div", { className: "border-b border-slate-100 last:border-b-0", children: [
  /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      className: "w-full px-4 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors",
      children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-900 text-left tracking-tight", children: question }),
        /* @__PURE__ */ jsx(
          Icons.ChevronDown,
          {
            className: `w-5 h-5 text-slate-400 transform transition-transform ${isOpen ? "rotate-180 text-orange-500" : ""}`
          }
        )
      ]
    }
  ),
  isOpen && /* @__PURE__ */ jsx("div", { className: "px-4 py-4 bg-slate-50/60", children: /* @__PURE__ */ jsx("p", { className: "text-slate-700 leading-relaxed", children: answer }) })
] });
const VerifiedBadge = ({ text = "Verified" }) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full", children: [
  /* @__PURE__ */ jsx(Icons.Verified, { className: "w-3 h-3" }),
  text
] });
function PoolDescriptionSection({ hotel }) {
  if (!hotel.pool_description) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-blue-200", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Pool, { className: "w-6 h-6 sm:w-7 sm:h-7 text-blue-600" }),
      "About Our Pool Area"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line", children: hotel.pool_description }),
    hotel.is_verified && /* @__PURE__ */ jsx(VerifiedBadge, {})
  ] });
}
function AmenitiesDescriptionSection({ hotel }) {
  if (!hotel.amenities_description) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-green-200", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Amenities, { className: "w-6 h-6 sm:w-7 sm:h-7 text-green-600" }),
      "Pool Amenities & Services"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line", children: hotel.amenities_description }),
    hotel.is_verified && /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-green-200 flex items-center gap-2 text-green-700 text-sm font-semibold", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" }) }),
      "Verified by hotel management"
    ] })
  ] });
}
function HouseRulesSection({ hotel }) {
  if (!hotel.house_rules) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8 border-2 border-red-200", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Rules, { className: "w-6 h-6 sm:w-7 sm:h-7 text-red-600" }),
      "Pool House Rules"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed whitespace-pre-line", children: hotel.house_rules })
  ] });
}
function FaqsSection({ hotel, openFaqIndex, toggleFaq }) {
  if (!hotel.faqs || hotel.faqs.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] p-5 sm:p-6 lg:p-7 xl:p-8", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl font-sans font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.FAQ, { className: "w-6 h-6 sm:w-7 sm:h-7 text-orange-500" }),
      "Frequently Asked Questions"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "divide-y divide-orange-100 border-t border-orange-200", children: hotel.faqs.map((faq, index) => /* @__PURE__ */ jsx(
      FaqItem,
      {
        question: faq.question,
        answer: faq.answer,
        isOpen: openFaqIndex === index,
        onClick: () => toggleFaq(index)
      },
      index
    )) }),
    hotel.is_verified && /* @__PURE__ */ jsxs("div", { className: "mt-5 pt-4 border-t border-gray-200 flex items-center gap-2 text-blue-600 text-sm font-semibold", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" }) }),
      "Answers provided by hotel management"
    ] })
  ] });
}
function PhotoGallerySection({ allImages, activeImageIndex, setActiveImageIndex, hotelName }) {
  if (allImages.length <= 1) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] hover:ring-slate-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_16px_36px_-16px_rgba(15,23,42,0.12)] p-5 sm:p-6 lg:p-7 xl:p-8 transition-all duration-300", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl lg:text-3xl font-sans font-semibold tracking-tight text-slate-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8 flex items-center gap-2 lg:gap-3", children: [
      /* @__PURE__ */ jsx(Icons.Gallery, { className: "w-5 h-5 sm:w-6 sm:h-6 text-orange-500" }),
      "Photo Gallery"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6", children: allImages.map((image, index) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          setActiveImageIndex(index);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        className: "relative h-32 sm:h-40 lg:h-44 xl:h-48 2xl:h-52 rounded-lg overflow-hidden hover:opacity-75 transition-all duration-300 group",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: image,
              alt: `${hotelName} - ${index + 1}`,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
              loading: "lazy",
              width: 300,
              height: 200,
              sizes: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            }
          ),
          index === activeImageIndex && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 border-4 border-gray-900 rounded-lg" })
        ]
      },
      index
    )) })
  ] });
}
function ReviewsSection({ hotel }) {
  if (!hotel.approved_reviews || hotel.approved_reviews.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-lg p-5 sm:p-6 lg:p-7 xl:p-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sans font-semibold text-gray-900 mb-5 sm:mb-6 lg:mb-7 xl:mb-8", children: "Guest Reviews" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-5 sm:space-y-6", children: hotel.approved_reviews.map((review) => /* @__PURE__ */ jsxs("div", { className: "border-b last:border-0 border-gray-200 pb-5 sm:pb-6 last:pb-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsx("div", { className: "font-sans font-semibold text-gray-900 text-sm sm:text-base", children: review.user.name }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-0.5", children: [...Array(review.overall_rating)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-amber-400 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) })
      ] }),
      review.title && /* @__PURE__ */ jsx("h4", { className: "font-sans font-semibold text-gray-800 mb-1 text-sm sm:text-base", children: review.title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-sans text-xs sm:text-sm mb-2", children: review.content }),
      /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm text-gray-500 font-sans", children: new Date(review.created_at).toLocaleDateString() })
    ] }, review.id)) })
  ] });
}
export {
  AmenitiesDescriptionSection,
  FaqsSection,
  HouseRulesSection,
  PhotoGallerySection,
  PoolDescriptionSection,
  ReviewsSection,
  PoolDescriptionSection as default
};

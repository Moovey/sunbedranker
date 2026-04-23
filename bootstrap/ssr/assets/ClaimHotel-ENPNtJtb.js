import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { H as HotelierNav } from "./HotelierNav-CV4guQe6.js";
import { ToastContainer, toast } from "react-toastify";
/* empty css                      */
function ClaimHotel({ hotel }) {
  var _a;
  const { data, setData, post, processing, errors } = useForm({
    official_email: "",
    phone: "",
    claim_message: "",
    hotel_website: ""
  });
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("hotelier.hotels.claim.store", hotel.slug), {
      onSuccess: () => {
        toast.success("Hotel claim submitted successfully! We will review your claim and contact you soon.", {
          position: "top-right",
          autoClose: 5e3
        });
      },
      onError: (errors2) => {
        const errorMessages = Object.values(errors2).flat();
        errorMessages.forEach((error) => {
          toast.error(error, {
            position: "top-right",
            autoClose: 5e3
          });
        });
      }
    });
  };
  const getHotelDomain = () => {
    const website = hotel.website || data.hotel_website;
    if (!website) return "";
    try {
      const url = new URL(website.startsWith("http") ? website : "https://" + website);
      return url.hostname.replace("www.", "");
    } catch {
      return "";
    }
  };
  const hotelDomain = getHotelDomain();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Claim ${hotel.name}` }),
    /* @__PURE__ */ jsx(ToastContainer, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(HotelierNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("hotelier.dashboard"),
                className: "text-gray-500 hover:text-gray-700 transition-colors",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" }) })
              }
            ),
            /* @__PURE__ */ jsx("h1", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900", children: "Claim Hotel Ownership" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-xs sm:text-sm ml-6 sm:ml-8", children: [
            "Verify your ownership of ",
            hotel.name,
            " to manage your hotel profile"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3 sm:gap-4", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: hotel.main_image || "/images/default-hotel.jpg",
              alt: hotel.name,
              className: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 truncate", children: hotel.name }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm mt-1", children: (_a = hotel.destination) == null ? void 0 : _a.name }),
            hotel.website && /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 truncate", children: [
              "Website: ",
              /* @__PURE__ */ jsx("a", { href: hotel.website, target: "_blank", rel: "noopener noreferrer", className: "text-orange-500 hover:underline", children: hotel.website })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border border-blue-100 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 sm:gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 sm:w-4 sm:h-4 text-blue-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", clipRule: "evenodd" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 text-xs sm:text-sm mb-1.5 sm:mb-2", children: "Verification Required" }),
            /* @__PURE__ */ jsxs("ul", { className: "text-[10px] sm:text-xs text-gray-600 space-y-0.5 sm:space-y-1", children: [
              /* @__PURE__ */ jsxs("li", { className: "break-words", children: [
                "• You must use an official email from the hotel's domain",
                hotelDomain && ` (@${hotelDomain})`
              ] }),
              /* @__PURE__ */ jsx("li", { children: "• A verification code will be sent to your official email" }),
              /* @__PURE__ */ jsx("li", { children: "• Our admin team will review your claim within 24-48 hours" }),
              /* @__PURE__ */ jsx("li", { children: "• Only one owner per hotel is allowed" }),
              /* @__PURE__ */ jsx("li", { children: "• False claims will result in account suspension" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 border border-gray-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6", children: "Ownership Verification" }),
          !hotel.website && /* @__PURE__ */ jsxs("div", { className: "mb-4 sm:mb-5", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Hotel Website URL *" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 mb-1.5 sm:mb-2", children: "Provide your hotel's official website so we can verify your email domain" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                value: data.hotel_website,
                onChange: (e) => setData("hotel_website", e.target.value),
                className: "w-full px-2.5 sm:px-3 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm",
                placeholder: "https://www.yourhotel.com",
                required: true
              }
            ),
            errors.hotel_website && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-[10px] sm:text-xs mt-1", children: errors.hotel_website })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4 sm:mb-5", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Official Hotel Email *" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[10px] sm:text-xs text-gray-500 mb-1.5 sm:mb-2", children: [
              "Must be from the hotel's official domain",
              hotelDomain && ` (@${hotelDomain})`
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: data.official_email,
                onChange: (e) => setData("official_email", e.target.value),
                className: "w-full px-2.5 sm:px-3 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm",
                placeholder: `manager@${hotelDomain || "yourhotel.com"}`,
                required: true
              }
            ),
            errors.official_email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-[10px] sm:text-xs mt-1", children: errors.official_email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4 sm:mb-5", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Hotel Contact Phone *" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 mb-1.5 sm:mb-2", children: "Your contact number for verification purposes" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                value: data.phone,
                onChange: (e) => setData("phone", e.target.value),
                className: "w-full px-2.5 sm:px-3 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm",
                placeholder: "+44 20 1234 5678",
                required: true
              }
            ),
            errors.phone && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-[10px] sm:text-xs mt-1", children: errors.phone })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4 sm:mb-5", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Additional Information (Optional)" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 mb-1.5 sm:mb-2", children: "Provide any additional details that verify your ownership" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.claim_message,
                onChange: (e) => setData("claim_message", e.target.value),
                rows: 3,
                className: "w-full px-2.5 sm:px-3 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm resize-none sm:rows-4",
                placeholder: "E.g., Your position at the hotel, how long you've worked there, etc."
              }
            ),
            errors.claim_message && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-[10px] sm:text-xs mt-1", children: errors.claim_message })
          ] }),
          errors.rate_limit && /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-5 bg-red-50 border border-red-200 rounded-lg p-2.5 sm:p-3", children: /* @__PURE__ */ jsx("p", { className: "text-red-600 text-xs sm:text-sm font-medium", children: errors.rate_limit }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "flex-1 px-4 sm:px-6 py-2 sm:py-2.5 bg-orange-500 text-white font-medium text-xs sm:text-sm rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed",
                children: processing ? "Submitting..." : "Submit Claim for Review"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/hotelier/dashboard",
                className: "px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-100 text-gray-700 font-medium text-xs sm:text-sm rounded-lg hover:bg-gray-200 transition-colors text-center",
                children: "Cancel"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-[10px] sm:text-xs text-gray-400 mt-4 sm:mt-5 text-center", children: [
            "By submitting this claim, you confirm that you are an authorized representative of ",
            hotel.name,
            "and that all information provided is accurate. False claims may result in legal action."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 sm:mt-6 bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 border border-gray-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4", children: "What happens next?" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 sm:gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 sm:w-7 sm:h-7 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0", children: "1" }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: "Immediate Review" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500", children: "Your claim is immediately sent to our admin team" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 sm:gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 sm:w-7 sm:h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0", children: "2" }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: "Verification Process" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500", children: "We verify your email domain and contact details" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 sm:gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 sm:w-7 sm:h-7 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0", children: "3" }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: "Decision (24-48 hours)" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500", children: "You'll be notified via email once approved or if we need more information" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 sm:gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 sm:w-7 sm:h-7 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0", children: "4" }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 text-xs sm:text-sm", children: "Start Managing" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500", children: "Once approved, you can edit hotel details, respond to reviews, and more!" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ClaimHotel as default
};

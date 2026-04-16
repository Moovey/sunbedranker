import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { H as HotelierNav } from "./HotelierNav-DOR3UniZ.js";
import { ToastContainer, toast } from "react-toastify";
/* empty css                       */
function VerifyClaim({ claim, email }) {
  var _a;
  const { data, setData, post, processing, errors } = useForm({
    code: ""
  });
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  useEffect(() => {
    var _a2;
    (_a2 = inputRefs.current[0]) == null ? void 0 : _a2.focus();
  }, []);
  const handleDigitChange = (index, value) => {
    var _a2;
    if (value && !/^\d$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setData("code", newDigits.join(""));
    if (value && index < 5) {
      (_a2 = inputRefs.current[index + 1]) == null ? void 0 : _a2.focus();
    }
  };
  const handleKeyDown = (index, e) => {
    var _a2;
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      (_a2 = inputRefs.current[index - 1]) == null ? void 0 : _a2.focus();
    }
  };
  const handlePaste = (e) => {
    var _a2;
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData) {
      const newDigits = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
      setDigits(newDigits);
      setData("code", newDigits.join(""));
      const lastFilledIndex = Math.min(pastedData.length - 1, 5);
      (_a2 = inputRefs.current[lastFilledIndex]) == null ? void 0 : _a2.focus();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("hotelier.claims.verify.submit", claim.id), {
      onSuccess: () => {
        toast.success("Email verified successfully!", {
          position: "top-right",
          autoClose: 3e3
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
  const handleResend = () => {
    post(route("hotelier.claims.resend", claim.id), {
      onSuccess: () => {
        toast.success("A new verification code has been sent!", {
          position: "top-right",
          autoClose: 3e3
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Verify Email" }),
    /* @__PURE__ */ jsx(ToastContainer, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(HotelierNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-lg mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-100", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 sm:w-10 sm:h-10 text-orange-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2", children: "Verify Your Email" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm text-center mb-6", children: "We've sent a 6-digit verification code to" }),
          /* @__PURE__ */ jsx("p", { className: "text-orange-600 font-semibold text-center mb-8", children: email }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Claiming ownership of:" }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900 text-sm sm:text-base", children: (_a = claim.hotel) == null ? void 0 : _a.name })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2 sm:gap-3 mb-6", children: digits.map((digit, index) => /* @__PURE__ */ jsx(
              "input",
              {
                ref: (el) => inputRefs.current[index] = el,
                type: "text",
                inputMode: "numeric",
                maxLength: 1,
                value: digit,
                onChange: (e) => handleDigitChange(index, e.target.value),
                onKeyDown: (e) => handleKeyDown(index, e),
                onPaste: handlePaste,
                className: "w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              },
              index
            )) }),
            errors.code && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm text-center mb-4", children: errors.code }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing || digits.join("").length !== 6,
                className: "w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed",
                children: processing ? "Verifying..." : "Verify Email"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-2", children: "Didn't receive the code?" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: handleResend,
                disabled: processing,
                className: "text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors disabled:text-gray-400",
                children: "Resend Code"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-gray-100 text-center", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: route("hotelier.claims.index"),
              className: "text-gray-500 text-sm hover:text-gray-700 transition-colors",
              children: "← Back to My Claims"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-center text-xs text-gray-400", children: "The verification code will expire in 30 minutes. If you don't see the email, check your spam folder." })
      ] })
    ] })
  ] });
}
export {
  VerifyClaim as default
};

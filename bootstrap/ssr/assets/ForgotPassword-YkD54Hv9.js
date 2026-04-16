import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { H as Header } from "./Header-IxKzTBec.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1e3);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);
  useEffect(() => {
    if (status) {
      setCooldown(60);
    }
  }, [status]);
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white font-sans flex flex-col", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "h-0.5 w-12 bg-gradient-to-r from-orange-500 to-orange-600" }),
          /* @__PURE__ */ jsx("svg", { className: "mx-4 text-orange-500", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
          /* @__PURE__ */ jsx("div", { className: "h-0.5 w-12 bg-gradient-to-r from-blue-500 to-blue-600" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8 sm:p-10", children: [
          /* @__PURE__ */ jsx("h1", { className: "font-sans text-3xl sm:text-4xl font-black text-gray-900 text-center mb-4", children: "Forgot Password" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm text-center mb-8", children: "No problem! Just enter your email address and we'll send you a password reset link." }),
          status && /* @__PURE__ */ jsx("div", { className: "mb-6 px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-lg text-sm font-bold text-green-700", children: status }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-bold text-gray-700 mb-2", children: "Email" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "email",
                  type: "email",
                  name: "email",
                  value: data.email,
                  className: "w-full px-4 py-3 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 rounded-lg font-medium",
                  autoComplete: "username",
                  autoFocus: true,
                  placeholder: "you@example.com",
                  onChange: (e) => setData("email", e.target.value)
                }
              ),
              errors.email && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600 font-semibold", children: errors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 pt-2", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("login"),
                  className: "text-blue-600 hover:text-blue-700 font-bold text-sm transition-all duration-300 transform hover:scale-105",
                  children: "Back to Login"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing || cooldown > 0,
                  className: "w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none shadow-lg",
                  children: processing ? "Sending..." : cooldown > 0 ? `Wait ${cooldown}s` : "Send Reset Link"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t-2 border-gray-200 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700 font-semibold", children: [
            "Don't have an account?",
            " ",
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("register"),
                className: "text-orange-600 hover:text-orange-700 font-bold transition-all duration-300 transform hover:scale-105 inline-block",
                children: "Sign up"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-8 text-center text-xs text-gray-600 font-medium", children: [
          "Remember your password?",
          " ",
          /* @__PURE__ */ jsx(Link, { href: route("login"), className: "text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300", children: "Log in here" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ForgotPassword as default
};

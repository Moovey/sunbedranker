import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { H as Header } from "./Header-nFqKg1Hd.js";
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
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50/60 font-sans flex flex-col", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "h-0.5 w-12 bg-gradient-to-r from-orange-500 to-orange-600" }),
          /* @__PURE__ */ jsx("svg", { className: "mx-4 text-orange-500", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
          /* @__PURE__ */ jsx("div", { className: "h-0.5 w-12 bg-gradient-to-r from-blue-500 to-blue-600" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_24px_48px_-24px_rgba(15,23,42,0.18)] p-8 sm:p-10", children: [
          /* @__PURE__ */ jsx("h1", { className: "font-sans text-2xl sm:text-3xl font-bold tracking-tight leading-[1.1] text-slate-900 text-center mb-3", children: "Forgot Password" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm text-center mb-8", children: "No problem! Just enter your email address and we'll send you a password reset link." }),
          status && /* @__PURE__ */ jsx("div", { className: "mb-6 px-4 py-3 bg-emerald-50/60 ring-1 ring-inset ring-emerald-200 rounded-lg text-sm font-semibold text-emerald-700", children: status }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-2", children: "Email" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "email",
                  type: "email",
                  name: "email",
                  value: data.email,
                  className: "w-full px-3.5 py-2.5 bg-white ring-1 ring-inset ring-slate-200 hover:ring-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 placeholder-slate-400 transition-shadow duration-150 rounded-lg text-sm",
                  autoComplete: "username",
                  autoFocus: true,
                  placeholder: "you@example.com",
                  onChange: (e) => setData("email", e.target.value)
                }
              ),
              errors.email && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-rose-600 font-medium", children: errors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 pt-2", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("login"),
                  className: "text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors duration-150",
                  children: "Back to Login"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing || cooldown > 0,
                  className: "w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-tight rounded-lg shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04] transition-all duration-200 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:hover:shadow-sm",
                  children: processing ? "Sending..." : cooldown > 0 ? `Wait ${cooldown}s` : "Send Reset Link"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-slate-200/70 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-600", children: [
            "Don't have an account?",
            " ",
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("register"),
                className: "text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-150 inline-block",
                children: "Sign up"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-8 text-center text-xs text-slate-500", children: [
          "Remember your password?",
          " ",
          /* @__PURE__ */ jsx(Link, { href: route("login"), className: "text-slate-600 hover:text-slate-900 font-semibold transition-colors duration-150", children: "Log in here" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ForgotPassword as default
};

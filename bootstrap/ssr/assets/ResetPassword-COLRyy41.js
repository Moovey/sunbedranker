import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { H as Header } from "./Header-nFqKg1Hd.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset Password" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50/60 font-sans flex flex-col", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "h-0.5 w-12 bg-gradient-to-r from-orange-500 to-orange-600" }),
          /* @__PURE__ */ jsx("svg", { className: "mx-4 text-orange-500", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
          /* @__PURE__ */ jsx("div", { className: "h-0.5 w-12 bg-gradient-to-r from-blue-500 to-blue-600" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_24px_48px_-24px_rgba(15,23,42,0.18)] p-8 sm:p-10", children: [
          /* @__PURE__ */ jsx("h1", { className: "font-sans text-2xl sm:text-3xl font-bold tracking-tight leading-[1.1] text-slate-900 text-center mb-3", children: "Reset Password" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-sm text-center mb-8", children: "Enter your new password below." }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                name: "email",
                value: data.email,
                autoComplete: "username",
                onChange: (e) => setData("email", e.target.value),
                className: "sr-only",
                tabIndex: -1,
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-2", children: "Email" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "email",
                  type: "email",
                  name: "email_display",
                  value: data.email,
                  className: "w-full px-3.5 py-2.5 ring-1 ring-inset ring-slate-200 bg-slate-50 text-slate-600 rounded-lg text-sm cursor-not-allowed",
                  autoComplete: "username",
                  readOnly: true
                }
              ),
              errors.email && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-rose-600 font-medium", children: errors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-2", children: "New Password" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "password",
                    type: showPassword ? "text" : "password",
                    name: "password",
                    value: data.password,
                    className: "w-full px-3.5 py-2.5 pr-11 bg-white ring-1 ring-inset ring-slate-200 hover:ring-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 placeholder-slate-400 transition-shadow duration-150 rounded-lg text-sm",
                    autoComplete: "new-password",
                    autoFocus: true,
                    placeholder: "••••••••",
                    onChange: (e) => setData("password", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-150",
                    children: showPassword ? /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) }) : /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                    ] })
                  }
                )
              ] }),
              errors.password && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-rose-600 font-medium", children: errors.password })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "password_confirmation", className: "block text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-2", children: "Confirm New Password" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "password_confirmation",
                    type: showPasswordConfirmation ? "text" : "password",
                    name: "password_confirmation",
                    value: data.password_confirmation,
                    className: "w-full px-3.5 py-2.5 pr-11 bg-white ring-1 ring-inset ring-slate-200 hover:ring-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-900 placeholder-slate-400 transition-shadow duration-150 rounded-lg text-sm",
                    autoComplete: "new-password",
                    placeholder: "••••••••",
                    onChange: (e) => setData("password_confirmation", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPasswordConfirmation(!showPasswordConfirmation),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-150",
                    children: showPasswordConfirmation ? /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) }) : /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                    ] })
                  }
                )
              ] }),
              errors.password_confirmation && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-rose-600 font-medium", children: errors.password_confirmation })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "w-full px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-tight rounded-lg shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04] transition-all duration-200 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:hover:shadow-sm",
                children: processing ? "Resetting..." : "Reset Password"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-slate-200/70 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-600", children: [
            "Remember your password?",
            " ",
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("login"),
                className: "text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-150 inline-block",
                children: "Log in"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-8 text-center text-xs text-slate-500", children: [
          "Need help?",
          " ",
          /* @__PURE__ */ jsx(Link, { href: "/", className: "text-slate-600 hover:text-slate-900 font-semibold transition-colors duration-150", children: "Contact Support" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ResetPassword as default
};

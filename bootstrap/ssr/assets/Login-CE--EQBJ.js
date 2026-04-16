import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import "./TextInput-C4qymzAp.js";
import { H as Header } from "./Header-IxKzTBec.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [googleRole, setGoogleRole] = useState("user");
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white font-sans flex flex-col", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "h-0.5 w-12 bg-gradient-to-r from-orange-500 to-orange-600" }),
          /* @__PURE__ */ jsx("svg", { className: "mx-4 text-orange-500", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
          /* @__PURE__ */ jsx("div", { className: "h-0.5 w-12 bg-gradient-to-r from-blue-500 to-blue-600" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8 sm:p-10", children: [
          /* @__PURE__ */ jsx("h1", { className: "font-sans text-3xl sm:text-4xl font-black text-gray-900 text-center mb-8", children: "Log in" }),
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
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-bold text-gray-700 mb-2", children: "Password" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "password",
                    type: showPassword ? "text" : "password",
                    name: "password",
                    value: data.password,
                    className: "w-full px-4 py-3 pr-12 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 placeholder-gray-400 transition-all duration-300 rounded-lg font-medium",
                    autoComplete: "current-password",
                    placeholder: "••••••••",
                    onChange: (e) => setData("password", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200",
                    children: showPassword ? /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) }) : /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                    ] })
                  }
                )
              ] }),
              errors.password && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600 font-semibold", children: errors.password })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "remember",
                  type: "checkbox",
                  name: "remember",
                  checked: data.remember,
                  onChange: (e) => setData("remember", e.target.checked),
                  className: "w-4 h-4 text-orange-500 bg-white border-2 border-orange-300 rounded focus:ring-orange-500 focus:ring-2"
                }
              ),
              /* @__PURE__ */ jsx("label", { htmlFor: "remember", className: "ml-2 text-sm text-gray-700 font-semibold", children: "Remember me" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 pt-2", children: [
              canResetPassword && /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("password.request"),
                  className: "text-blue-600 hover:text-blue-700 font-bold text-sm transition-all duration-300 transform hover:scale-105",
                  children: "Forgot your password?"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none shadow-lg",
                  children: processing ? "Logging in..." : "Log in"
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
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1 border-t border-gray-300" }),
            /* @__PURE__ */ jsx("span", { className: "px-4 text-sm text-gray-500 font-medium", children: "or continue with" }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 border-t border-gray-300" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600 font-medium", children: "I am a:" }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: "googleRole",
                    value: "user",
                    checked: googleRole === "user",
                    onChange: (e) => setGoogleRole(e.target.value),
                    className: "w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm font-semibold text-gray-700", children: "Traveler" })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: "googleRole",
                    value: "hotelier",
                    checked: googleRole === "hotelier",
                    onChange: (e) => setGoogleRole(e.target.value),
                    className: "w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm font-semibold text-gray-700", children: "Hotelier" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: route("auth.google", { role: googleRole }),
                className: "w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 group",
                children: [
                  /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        fill: "#4285F4",
                        d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        fill: "#34A853",
                        d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        fill: "#FBBC05",
                        d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        fill: "#EA4335",
                        d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-semibold group-hover:text-gray-900", children: "Continue with Google" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-8 text-center text-xs text-gray-600 font-medium", children: [
          "By logging in, you agree to our",
          " ",
          /* @__PURE__ */ jsx(Link, { href: "#", className: "text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300", children: "Terms of Service" }),
          " ",
          "and",
          " ",
          /* @__PURE__ */ jsx(Link, { href: "#", className: "text-blue-600 hover:text-blue-700 font-bold transition-colors duration-300", children: "Privacy Policy" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Login as default
};

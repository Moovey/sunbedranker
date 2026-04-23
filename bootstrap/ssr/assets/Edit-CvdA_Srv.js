import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as AdminNav } from "./AdminNav-Dpi9gSoo.js";
import { toast } from "react-toastify";
import "react";
function UsersEdit({ stats, user }) {
  const { data, setData, patch, processing, errors } = useForm({
    name: user.name || "",
    email: user.email || "",
    role: user.role || "user"
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    patch(`/admin/users/${user.id}`, {
      onSuccess: () => {
        toast.success(`User "${data.name}" has been updated successfully!`);
      },
      onError: () => {
        toast.error("Failed to update user. Please check the form and try again.");
      }
    });
  };
  const getRoleBadge = (role) => {
    const badges = {
      admin: "bg-red-50 text-red-700",
      hotelier: "bg-orange-50 text-orange-700",
      user: "bg-gray-50 text-gray-700"
    };
    return badges[role] || badges.user;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit User: ${user.name} - Admin` }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, { stats }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-4", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/admin/users",
                className: "p-1.5 sm:p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex-shrink-0",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900", children: "Edit User" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500 truncate", children: "Update user information and permissions" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: `self-start sm:self-auto ml-8 sm:ml-0 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getRoleBadge(user.role)}`, children: user.role.charAt(0).toUpperCase() + user.role.slice(1) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 sm:space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Full Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "name",
                type: "text",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors",
                required: true
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Email Address" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "email",
                type: "email",
                value: data.email,
                onChange: (e) => setData("email", e.target.value),
                className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors",
                required: true
              }
            ),
            errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "role", className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "User Role" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "role",
                value: data.role,
                onChange: (e) => setData("role", e.target.value),
                className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors",
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "user", children: "User" }),
                  /* @__PURE__ */ jsx("option", { value: "hotelier", children: "Hotelier" }),
                  /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" })
                ]
              }
            ),
            errors.role && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.role }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-[10px] sm:text-xs text-gray-500 leading-relaxed", children: [
              /* @__PURE__ */ jsxs("span", { className: "block sm:inline", children: [
                /* @__PURE__ */ jsx("strong", { children: "User:" }),
                " Regular user with basic access."
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "block sm:inline sm:ml-2", children: [
                /* @__PURE__ */ jsx("strong", { children: "Hotelier:" }),
                " Can claim and manage hotels."
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "block sm:inline sm:ml-2", children: [
                /* @__PURE__ */ jsx("strong", { children: "Admin:" }),
                " Full system access."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-100", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/admin/users",
                className: "w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-xs sm:text-sm transition-colors text-center",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "w-full sm:w-auto px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium text-xs sm:text-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed",
                children: processing ? "Saving..." : "Save Changes"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 sm:mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3", children: "User Information" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide", children: "User ID" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-900 mt-0.5 sm:mt-1", children: user.id })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide", children: "Account Created" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-900 mt-0.5 sm:mt-1", children: new Date(user.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide", children: "Last Updated" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-900 mt-0.5 sm:mt-1", children: new Date(user.updated_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
              }) })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  UsersEdit as default
};

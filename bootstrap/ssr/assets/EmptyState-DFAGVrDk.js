import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    active: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    expired: "bg-gray-100 text-gray-600"
  };
  return /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.pending}`, children: (status == null ? void 0 : status.charAt(0).toUpperCase()) + (status == null ? void 0 : status.slice(1)) });
}
function Pagination({ links, from, to, total }) {
  if (!links || links.length <= 3) return null;
  return /* @__PURE__ */ jsx("div", { className: "bg-white px-6 py-4 border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
      "Showing ",
      /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: from }),
      " to",
      " ",
      /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: to }),
      " of",
      " ",
      /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: total }),
      " results"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-1 flex-wrap justify-center", children: links.map((link, index) => link.url ? /* @__PURE__ */ jsx(
      Link,
      {
        href: link.url,
        className: `px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${link.active ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"}`,
        dangerouslySetInnerHTML: { __html: link.label }
      },
      index
    ) : /* @__PURE__ */ jsx(
      "span",
      {
        className: "px-3 py-1.5 text-sm text-gray-400",
        dangerouslySetInnerHTML: { __html: link.label }
      },
      index
    )) })
  ] }) });
}
function EmptyState({ icon, title, description }) {
  return /* @__PURE__ */ jsxs("div", { className: "p-12 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 text-gray-300 mx-auto mb-4", children: icon }),
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-1", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: description })
  ] });
}
export {
  EmptyState as E,
  Pagination as P,
  StatusBadge as S
};

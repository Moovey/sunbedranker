import { jsx, jsxs } from "react/jsx-runtime";
function StatCard({ label, value, icon, color }) {
  const colorClasses = {
    yellow: "bg-yellow-50 text-yellow-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-green-50 text-green-600",
    emerald: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-600"
  };
  return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl p-4 shadow-sm border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: `p-2 rounded-lg ${colorClasses[color] || colorClasses.blue}`, children: icon }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-gray-900", children: value }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: label })
    ] })
  ] }) });
}
function TabButton({ active, onClick, children, badge }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: `px-4 py-3 text-sm font-medium rounded-t-lg transition-all flex items-center gap-2 ${active ? "bg-white text-orange-600 border-t border-l border-r border-gray-200 -mb-px" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`,
      children: [
        children,
        badge > 0 && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 text-xs font-medium bg-orange-500 text-white rounded-full", children: badge })
      ]
    }
  );
}
export {
  StatCard as S,
  TabButton as T
};

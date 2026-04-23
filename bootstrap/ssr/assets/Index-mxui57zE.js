import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { router, usePage, Head } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
/* empty css                      */
import { A as AdminNav } from "./AdminNav-Dpi9gSoo.js";
import { S as StatCard, T as TabButton } from "./TabButton-kurVP5_k.js";
import { I as Icons, M as Modal } from "./Modal--roSw4Ve.js";
function WeightsTab({ weights }) {
  const [localWeights, setLocalWeights] = useState(weights);
  const [hasChanges, setHasChanges] = useState(false);
  const [processing, setProcessing] = useState(false);
  const handleWeightChange = (id, field, value) => {
    const numValue = parseFloat(value) || 0;
    setLocalWeights((prev) => prev.map(
      (w) => w.id === id ? { ...w, [field]: Math.min(5, Math.max(0, numValue)) } : w
    ));
    setHasChanges(true);
  };
  const handleSave = () => {
    setProcessing(true);
    router.put(route("admin.scoring.weights.update"), {
      weights: localWeights.map((w) => ({
        id: w.id,
        weight: w.weight,
        family_weight: w.family_weight,
        quiet_weight: w.quiet_weight,
        party_weight: w.party_weight
      }))
    }, {
      onSuccess: () => {
        setHasChanges(false);
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };
  const handleReset = () => {
    setLocalWeights(weights);
    setHasChanges(false);
  };
  const getWeightColor = (value) => {
    if (value >= 2) return "text-green-600 bg-green-50";
    if (value >= 1) return "text-blue-600 bg-blue-50";
    if (value > 0) return "text-yellow-600 bg-yellow-50";
    return "text-gray-400 bg-gray-50";
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
      /* @__PURE__ */ jsx(Icons.Info, { className: "w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-blue-700", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium mb-1", children: "How Weighting Works" }),
        /* @__PURE__ */ jsx("p", { children: "Each metric contributes to the final score based on its weight. Higher weights (max 5.0) mean the metric has more impact on the ranking. A weight of 0 means the metric is not counted in that scoring type." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Metric" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
          /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-blue-500 mr-2" }),
          "Overall"
        ] }) }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
          /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-green-500 mr-2" }),
          "Family"
        ] }) }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
          /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-purple-500 mr-2" }),
          "Quiet"
        ] }) }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
          /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-pink-500 mr-2" }),
          "Party"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: localWeights.map((metric) => /* @__PURE__ */ jsxs("tr", { className: !metric.is_active ? "opacity-50" : "", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Icons.Chart, { className: "w-5 h-5 text-gray-500" }) }),
          /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium text-gray-900", children: [
              metric.display_name,
              !metric.is_active && /* @__PURE__ */ jsx("span", { className: "ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded", children: "Inactive" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: metric.description })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: metric.weight,
            onChange: (e) => handleWeightChange(metric.id, "weight", e.target.value),
            min: "0",
            max: "5",
            step: "0.1",
            className: `w-20 px-3 py-2 text-center border rounded-lg text-sm font-medium ${getWeightColor(metric.weight)} border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`
          }
        ) }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: metric.family_weight,
            onChange: (e) => handleWeightChange(metric.id, "family_weight", e.target.value),
            min: "0",
            max: "5",
            step: "0.1",
            className: `w-20 px-3 py-2 text-center border rounded-lg text-sm font-medium ${getWeightColor(metric.family_weight)} border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500`
          }
        ) }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: metric.quiet_weight,
            onChange: (e) => handleWeightChange(metric.id, "quiet_weight", e.target.value),
            min: "0",
            max: "5",
            step: "0.1",
            className: `w-20 px-3 py-2 text-center border rounded-lg text-sm font-medium ${getWeightColor(metric.quiet_weight)} border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`
          }
        ) }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: metric.party_weight,
            onChange: (e) => handleWeightChange(metric.id, "party_weight", e.target.value),
            min: "0",
            max: "5",
            step: "0.1",
            className: `w-20 px-3 py-2 text-center border rounded-lg text-sm font-medium ${getWeightColor(metric.party_weight)} border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500`
          }
        ) }) })
      ] }, metric.id)) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-gray-600", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Weight Guide (0-5):" }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded bg-purple-100 mr-2" }),
        "4.0-5.0 Maximum Impact"
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded bg-green-100 mr-2" }),
        "2.5-4.0 High Impact"
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded bg-blue-100 mr-2" }),
        "1.0-2.5 Medium Impact"
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded bg-yellow-100 mr-2" }),
        "0.1-1.0 Low Impact"
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded bg-gray-100 mr-2" }),
        "0 Not Counted"
      ] })
    ] }),
    hasChanges && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-gray-200", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-orange-600", children: [
        /* @__PURE__ */ jsx(Icons.Warning, { className: "w-4 h-4 inline mr-1" }),
        "You have unsaved changes"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleReset,
            className: "px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors",
            children: "Reset"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSave,
            disabled: processing,
            className: "px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors",
            children: processing ? "Saving..." : "Save Weights"
          }
        )
      ] })
    ] })
  ] });
}
function VisibilityTab({ weights }) {
  const [localMetrics, setLocalMetrics] = useState(weights);
  const [hasChanges, setHasChanges] = useState(false);
  const [processing, setProcessing] = useState(false);
  const handleToggle = (id, field) => {
    setLocalMetrics((prev) => prev.map(
      (m) => m.id === id ? { ...m, [field]: !m[field] } : m
    ));
    setHasChanges(true);
  };
  const handleSave = () => {
    setProcessing(true);
    router.put(route("admin.scoring.visibility.update"), {
      metrics: localMetrics.map((m) => ({
        id: m.id,
        is_active: m.is_active,
        is_visible: m.is_visible,
        is_public: m.is_public
      }))
    }, {
      onSuccess: () => {
        setHasChanges(false);
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };
  const handleReset = () => {
    setLocalMetrics(weights);
    setHasChanges(false);
  };
  const ToggleSwitch = ({ checked, onChange, color = "orange" }) => {
    const colors = {
      orange: checked ? "bg-orange-500" : "bg-gray-200",
      green: checked ? "bg-green-500" : "bg-gray-200",
      blue: checked ? "bg-blue-500" : "bg-gray-200"
    };
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onChange,
        className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${colors[color]}`,
        children: /* @__PURE__ */ jsx(
          "span",
          {
            className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`
          }
        )
      }
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-purple-50 border border-purple-200 rounded-lg p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
      /* @__PURE__ */ jsx(Icons.Info, { className: "w-5 h-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-purple-700", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium mb-1", children: "Visibility Settings" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Active:" }),
            " Metric is used in score calculations"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Visible:" }),
            " Metric is shown on hotel detail pages"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Public:" }),
            " Metric is shown in public rankings/comparisons"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Metric" }),
        /* @__PURE__ */ jsxs("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
            /* @__PURE__ */ jsx(Icons.Check, { className: "w-4 h-4 mr-1 text-green-500" }),
            "Active"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-normal normal-case text-gray-400", children: "Used in scoring" })
        ] }),
        /* @__PURE__ */ jsxs("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
            /* @__PURE__ */ jsx(Icons.Eye, { className: "w-4 h-4 mr-1 text-blue-500" }),
            "Visible"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-normal normal-case text-gray-400", children: "On hotel pages" })
        ] }),
        /* @__PURE__ */ jsxs("th", { className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
            /* @__PURE__ */ jsx(Icons.Globe, { className: "w-4 h-4 mr-1 text-orange-500" }),
            "Public"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-normal normal-case text-gray-400", children: "In rankings" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: localMetrics.map((metric) => /* @__PURE__ */ jsxs("tr", { className: !metric.is_active ? "bg-gray-50" : "", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("div", { className: `flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${metric.is_active ? "bg-orange-100" : "bg-gray-100"}`, children: /* @__PURE__ */ jsx(Icons.Chart, { className: `w-5 h-5 ${metric.is_active ? "text-orange-500" : "text-gray-400"}` }) }),
          /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
            /* @__PURE__ */ jsx("div", { className: `text-sm font-medium ${metric.is_active ? "text-gray-900" : "text-gray-500"}`, children: metric.display_name }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: metric.criteria_name })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
          ToggleSwitch,
          {
            checked: metric.is_active,
            onChange: () => handleToggle(metric.id, "is_active"),
            color: "green"
          }
        ) }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
          ToggleSwitch,
          {
            checked: metric.is_visible,
            onChange: () => handleToggle(metric.id, "is_visible"),
            color: "blue"
          }
        ) }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
          ToggleSwitch,
          {
            checked: metric.is_public,
            onChange: () => handleToggle(metric.id, "is_public"),
            color: "orange"
          }
        ) }) })
      ] }, metric.id)) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm", children: [
      /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Quick actions:" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setLocalMetrics((prev) => prev.map((m) => ({ ...m, is_active: true })));
            setHasChanges(true);
          },
          className: "text-green-600 hover:underline",
          children: "Activate All"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setLocalMetrics((prev) => prev.map((m) => ({ ...m, is_visible: true })));
            setHasChanges(true);
          },
          className: "text-blue-600 hover:underline",
          children: "Show All"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setLocalMetrics((prev) => prev.map((m) => ({ ...m, is_public: true })));
            setHasChanges(true);
          },
          className: "text-orange-600 hover:underline",
          children: "Make All Public"
        }
      )
    ] }),
    hasChanges && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-gray-200", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-orange-600", children: [
        /* @__PURE__ */ jsx(Icons.Warning, { className: "w-4 h-4 inline mr-1" }),
        "You have unsaved changes"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleReset,
            className: "px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors",
            children: "Reset"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSave,
            disabled: processing,
            className: "px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors",
            children: processing ? "Saving..." : "Save Visibility Settings"
          }
        )
      ] })
    ] })
  ] });
}
const BADGE_ICONS = [
  {
    key: "sunbed",
    label: "Sunbed Excellence",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" }) })
  },
  {
    key: "pool",
    label: "Pool Quality",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2z" }) })
  },
  {
    key: "sun",
    label: "Sun Exposure",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" }) })
  },
  {
    key: "infinity",
    label: "Infinity Pool",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z" }) })
  },
  {
    key: "toprated",
    label: "Top Rated",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" }) })
  },
  {
    key: "family",
    label: "Family Friendly",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" }) })
  },
  {
    key: "relaxed",
    label: "Relaxed Vibe",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z" }) })
  },
  {
    key: "lively",
    label: "Lively Atmosphere",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" }) })
  },
  {
    key: "luxury",
    label: "Luxury Experience",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" }) })
  },
  {
    key: "clean",
    label: "Spotless Clean",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z" }) })
  },
  {
    key: "accessible",
    label: "Accessible",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 6h-5.5v10.5h-3V10H5V7h14v3z" }) })
  },
  {
    key: "verified",
    label: "Verified",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) })
  },
  {
    key: "heated",
    label: "Heated Pool",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" }) })
  },
  {
    key: "rooftop",
    label: "Rooftop Pool",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" }) })
  },
  {
    key: "cabana",
    label: "Private Cabanas",
    icon: (color) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" }) })
  }
];
const PRESET_COLORS = [
  "#f97316",
  // orange
  "#ef4444",
  // red
  "#ec4899",
  // pink
  "#8b5cf6",
  // purple
  "#3b82f6",
  // blue
  "#06b6d4",
  // cyan
  "#10b981",
  // green
  "#84cc16",
  // lime
  "#f59e0b",
  // amber
  "#6b7280"
  // gray
];
const OPERATORS = [
  { value: ">", label: "> Greater than" },
  { value: ">=", label: ">= Greater or equal" },
  { value: "<", label: "< Less than" },
  { value: "<=", label: "<= Less or equal" },
  { value: "==", label: "== Equals" },
  { value: "!=", label: "!= Not equals" }
];
function BadgeModal({ show, onClose, badge, availableCriteria }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "star",
    color: "#f97316",
    priority: 50,
    is_active: true,
    criteria: [{ field: "", operator: ">=", value: "" }]
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [previewCount, setPreviewCount] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  useEffect(() => {
    if (badge) {
      setFormData({
        name: badge.name || "",
        description: badge.description || "",
        icon: badge.icon || "star",
        color: badge.color || "#f97316",
        priority: badge.priority || 50,
        is_active: badge.is_active ?? true,
        criteria: Array.isArray(badge.criteria) && badge.criteria.length > 0 ? badge.criteria : [{ field: "", operator: ">=", value: "" }]
      });
    } else {
      setFormData({
        name: "",
        description: "",
        icon: "star",
        color: "#f97316",
        priority: 50,
        is_active: true,
        criteria: [{ field: "", operator: ">=", value: "" }]
      });
    }
    setErrors({});
    setPreviewCount(null);
  }, [badge, show]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    const validCriteria = formData.criteria.filter((c) => c.field && c.value !== "");
    if (validCriteria.length === 0) {
      setErrors({ criteria: "At least one valid criterion is required" });
      setProcessing(false);
      return;
    }
    const data = {
      ...formData,
      criteria: validCriteria
    };
    const url = badge ? route("admin.scoring.badges.update", badge.id) : route("admin.scoring.badges.store");
    const method = badge ? "put" : "post";
    router[method](url, data, {
      onSuccess: () => {
        onClose();
      },
      onError: (errors2) => {
        setErrors(errors2);
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };
  const addCriterion = () => {
    setFormData((prev) => ({
      ...prev,
      criteria: [...prev.criteria, { field: "", operator: ">=", value: "" }]
    }));
  };
  const removeCriterion = (index) => {
    if (formData.criteria.length > 1) {
      setFormData((prev) => ({
        ...prev,
        criteria: prev.criteria.filter((_, i) => i !== index)
      }));
    }
  };
  const updateCriterion = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      criteria: prev.criteria.map(
        (c, i) => i === index ? { ...c, [field]: value } : c
      )
    }));
  };
  const handlePreview = async () => {
    const validCriteria = formData.criteria.filter((c) => c.field && c.value !== "");
    if (validCriteria.length === 0) return;
    setPreviewLoading(true);
    try {
      const response = await fetch(route("admin.scoring.badges.preview"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ criteria: validCriteria })
      });
      const data = await response.json();
      setPreviewCount(data.count);
    } catch (error) {
    } finally {
      setPreviewLoading(false);
    }
  };
  const selectedIcon = BADGE_ICONS.find((i) => i.key === formData.icon);
  return /* @__PURE__ */ jsx(
    Modal,
    {
      show,
      onClose,
      title: badge ? "Edit Badge Rule" : "Create Badge Rule",
      maxWidth: "2xl",
      children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[80vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
              "Badge Name ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.name,
                onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                className: `w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base ${errors.name ? "border-red-500" : "border-gray-300"}`,
                placeholder: "e.g., Never Short of Beds"
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Priority (0-100)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: formData.priority,
                onChange: (e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 }),
                min: "0",
                max: "100",
                className: "w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-gray-500", children: "Higher priority badges show first" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: formData.description,
              onChange: (e) => setFormData({ ...formData, description: e.target.value }),
              rows: 2,
              className: "w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base",
              placeholder: "What this badge represents..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Icon" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 sm:gap-2", children: BADGE_ICONS.map((iconItem) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setFormData({ ...formData, icon: iconItem.key }),
                className: `w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border-2 transition-all ${formData.icon === iconItem.key ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"}`,
                title: iconItem.label,
                children: /* @__PURE__ */ jsx("span", { className: "w-5 h-5 sm:w-6 sm:h-6", style: { color: formData.color }, children: iconItem.icon(formData.icon === iconItem.key ? "#f97316" : "#6b7280") })
              },
              iconItem.key
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Color" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 sm:gap-2", children: PRESET_COLORS.map((color) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setFormData({ ...formData, color }),
                className: `w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all ${formData.color === color ? "border-gray-900 scale-110" : "border-transparent hover:scale-105"}`,
                style: { backgroundColor: color }
              },
              color
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-3 sm:p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-2", children: "Preview:" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                style: { backgroundColor: `${formData.color}20` },
                children: /* @__PURE__ */ jsx("span", { style: { color: formData.color }, children: (selectedIcon == null ? void 0 : selectedIcon.icon(formData.color)) || /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" }) }) })
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium",
                style: { backgroundColor: `${formData.color}20`, color: formData.color },
                children: formData.name || "Badge Name"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700", children: [
              "Rules ",
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: addCriterion,
                className: "text-sm text-orange-500 hover:text-orange-600 font-medium",
                children: "+ Add Rule"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-3", children: "Hotels must match ALL rules to receive this badge (AND logic)" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: formData.criteria.map((criterion, index) => {
            var _a, _b, _c, _d;
            return /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-2", children: [
              index > 0 && /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 sm:w-10 font-medium bg-gray-100 sm:bg-transparent px-2 py-1 sm:p-0 rounded self-start sm:self-auto", children: "AND" }),
              index === 0 && /* @__PURE__ */ jsx("span", { className: "hidden sm:block sm:w-10" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row flex-1 gap-2", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: criterion.field,
                    onChange: (e) => updateCriterion(index, "field", e.target.value),
                    className: "w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Select metric..." }),
                      Object.entries(
                        availableCriteria.reduce((groups, c) => {
                          const group = c.group || "Other";
                          if (!groups[group]) groups[group] = [];
                          groups[group].push(c);
                          return groups;
                        }, {})
                      ).map(([groupName, items]) => /* @__PURE__ */ jsx("optgroup", { label: groupName, children: items.map((c) => /* @__PURE__ */ jsx("option", { value: c.key, children: c.label }, c.key)) }, groupName))
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  !((_b = (_a = availableCriteria.find((c) => c.key === criterion.field)) == null ? void 0 : _a.type) == null ? void 0 : _b.includes("boolean")) && /* @__PURE__ */ jsx(
                    "select",
                    {
                      value: criterion.operator,
                      onChange: (e) => updateCriterion(index, "operator", e.target.value),
                      className: "flex-1 sm:w-32 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                      children: OPERATORS.map((op) => /* @__PURE__ */ jsx("option", { value: op.value, children: op.label }, op.value))
                    }
                  ),
                  ((_c = availableCriteria.find((c) => c.key === criterion.field)) == null ? void 0 : _c.type) === "boolean" ? (
                    // Boolean dropdown
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: criterion.value,
                        onChange: (e) => {
                          updateCriterion(index, "value", e.target.value);
                          updateCriterion(index, "operator", "==");
                        },
                        className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "Select..." }),
                          /* @__PURE__ */ jsx("option", { value: "true", children: "Yes (Has this feature)" }),
                          /* @__PURE__ */ jsx("option", { value: "false", children: "No (Doesn't have)" })
                        ]
                      }
                    )
                  ) : ((_d = availableCriteria.find((c) => c.key === criterion.field)) == null ? void 0 : _d.type) === "decimal" ? (
                    // Decimal input for ratio fields
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        step: "0.01",
                        min: "0",
                        value: criterion.value,
                        onChange: (e) => updateCriterion(index, "value", e.target.value),
                        placeholder: "e.g. 0.5",
                        className: "flex-1 sm:w-24 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      }
                    )
                  ) : (
                    // Integer input for other number fields
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        step: "1",
                        min: "0",
                        value: criterion.value,
                        onChange: (e) => {
                          const val = e.target.value.replace(/[^0-9]/g, "");
                          updateCriterion(index, "value", val);
                        },
                        placeholder: "Value",
                        className: "flex-1 sm:w-24 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      }
                    )
                  ),
                  formData.criteria.length > 1 && /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeCriterion(index),
                      className: "p-2 text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0",
                      children: /* @__PURE__ */ jsx(Icons.Trash, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] })
            ] }, index);
          }) }),
          errors.criteria && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600", children: errors.criteria })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-blue-50 rounded-lg p-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-blue-700", children: [
            /* @__PURE__ */ jsx(Icons.Info, { className: "w-4 h-4 mr-2 flex-shrink-0" }),
            previewCount !== null ? /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: previewCount }),
              " hotels would receive this badge"
            ] }) : /* @__PURE__ */ jsx("span", { children: "Click preview to see how many hotels match" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handlePreview,
              disabled: previewLoading || !formData.criteria.some((c) => c.field && c.value),
              className: "w-full sm:w-auto px-3 py-2 sm:py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors",
              children: previewLoading ? "Loading..." : "Preview"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start sm:items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: "is_active",
              checked: formData.is_active,
              onChange: (e) => setFormData({ ...formData, is_active: e.target.checked }),
              className: "w-4 h-4 mt-0.5 sm:mt-0 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: "is_active", className: "ml-2 text-sm text-gray-700", children: "Badge is active and can be applied to hotels" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-4 border-t", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "w-full sm:w-auto px-4 py-2.5 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors",
              children: processing ? "Saving..." : badge ? "Update Badge" : "Create Badge"
            }
          )
        ] })
      ] })
    }
  );
}
function BadgesTab({ badges, availableCriteria }) {
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [editingBadge, setEditingBadge] = useState(null);
  const [previewingBadge, setPreviewingBadge] = useState(null);
  const [previewResult, setPreviewResult] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const handleCreateBadge = () => {
    setEditingBadge(null);
    setShowBadgeModal(true);
  };
  const handleEditBadge = (badge) => {
    setEditingBadge(badge);
    setShowBadgeModal(true);
  };
  const handleDeleteBadge = (badge) => {
    if (confirm(`Are you sure you want to delete the "${badge.name}" badge?`)) {
      router.delete(route("admin.scoring.badges.destroy", badge.id));
    }
  };
  const handleToggleBadge = (badge) => {
    router.post(route("admin.scoring.badges.toggle", badge.id));
  };
  const handleApplyBadge = (badge) => {
    if (confirm(`Apply "${badge.name}" badge to all matching hotels?`)) {
      router.post(route("admin.scoring.badges.apply", badge.id));
    }
  };
  const handlePreview = async (badge) => {
    setPreviewingBadge(badge.id);
    setPreviewLoading(true);
    try {
      const response = await fetch(route("admin.scoring.badges.preview"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ criteria: badge.criteria })
      });
      const data = await response.json();
      setPreviewResult(data);
    } catch (error) {
    } finally {
      setPreviewLoading(false);
    }
  };
  const closePreview = () => {
    setPreviewingBadge(null);
    setPreviewResult(null);
  };
  const formatCriteria = (criteria) => {
    if (!Array.isArray(criteria)) return "Invalid criteria";
    return criteria.map((c, i) => {
      var _a;
      const criteriaLabel = ((_a = availableCriteria.find((ac) => ac.key === c.field)) == null ? void 0 : _a.label) || c.field;
      return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center mr-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: criteriaLabel }),
        /* @__PURE__ */ jsx("span", { className: "mx-1 text-orange-500 font-mono", children: c.operator }),
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: String(c.value) }),
        i < criteria.length - 1 && /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-400", children: "AND" })
      ] }, i);
    });
  };
  const getBadgeIcon = (iconName, color = "currentColor") => {
    const icons = {
      sunbed: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" }) }),
      pool: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2z" }) }),
      sun: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" }) }),
      infinity: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z" }) }),
      toprated: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" }) }),
      family: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" }) }),
      relaxed: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z" }) }),
      lively: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" }) }),
      luxury: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" }) }),
      clean: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z" }) }),
      accessible: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 6h-5.5v10.5h-3V10H5V7h14v3z" }) }),
      verified: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }),
      heated: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" }) }),
      rooftop: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" }) }),
      cabana: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" }) }),
      // Legacy mappings
      star: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" }) }),
      trophy: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" }) }),
      medal: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2z" }) }),
      water: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z" }) }),
      quiet: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 5c2.33 0 4.32-1.45 5.12-3.5H6.88c.8 2.05 2.79 3.5 5.12 3.5z" }) }),
      party: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: color, children: /* @__PURE__ */ jsx("path", { d: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" }) })
    };
    return icons[iconName] || icons.toprated;
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-orange-50 border border-orange-200 rounded-lg p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
      /* @__PURE__ */ jsx(Icons.Info, { className: "w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-orange-700", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium mb-1", children: "Automatic Badge Rules" }),
        /* @__PURE__ */ jsx("p", { children: 'Create rules to automatically award badges to hotels that meet certain criteria. Badges add credibility and help hotels stand out. When you click "Apply", the badge will be assigned to all hotels matching the rules.' })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleCreateBadge,
        className: "inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors",
        children: [
          /* @__PURE__ */ jsx(Icons.Plus, { className: "w-4 h-4 mr-2" }),
          "Create Badge Rule"
        ]
      }
    ) }),
    badges.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 bg-gray-50 rounded-lg", children: [
      /* @__PURE__ */ jsx(Icons.Award, { className: "w-12 h-12 text-gray-300 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No badges yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-4", children: "Create your first badge rule to reward great hotels." }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleCreateBadge,
          className: "inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors",
          children: [
            /* @__PURE__ */ jsx(Icons.Plus, { className: "w-4 h-4 mr-2" }),
            "Create First Badge"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: badges.map((badge) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `bg-white border rounded-lg p-4 ${badge.is_active ? "border-gray-200" : "border-gray-100 opacity-60"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-12 h-12 rounded-lg flex items-center justify-center",
                  style: { backgroundColor: `${badge.color}20`, color: badge.color },
                  children: getBadgeIcon(badge.icon, badge.color)
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "ml-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900", children: badge.name }),
                  !badge.is_active && /* @__PURE__ */ jsx("span", { className: "ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded", children: "Inactive" }),
                  /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: "ml-2 px-2 py-0.5 text-xs rounded",
                      style: {
                        backgroundColor: `${badge.color}20`,
                        color: badge.color
                      },
                      children: [
                        "Priority: ",
                        badge.priority
                      ]
                    }
                  )
                ] }),
                badge.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: badge.description }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-500 mr-2", children: "Rules:" }),
                  formatCriteria(badge.criteria)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handlePreview(badge),
                  className: "p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
                  title: "Preview matching hotels",
                  children: /* @__PURE__ */ jsx(Icons.Eye, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleApplyBadge(badge),
                  className: "p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors",
                  title: "Apply to matching hotels",
                  children: /* @__PURE__ */ jsx(Icons.Check, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleToggleBadge(badge),
                  className: `p-2 rounded-lg transition-colors ${badge.is_active ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
                  title: badge.is_active ? "Deactivate" : "Activate",
                  children: badge.is_active ? /* @__PURE__ */ jsx(Icons.Pending, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Icons.Refresh, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleEditBadge(badge),
                  className: "p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
                  title: "Edit",
                  children: /* @__PURE__ */ jsx(Icons.Edit, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDeleteBadge(badge),
                  className: "p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors",
                  title: "Delete",
                  children: /* @__PURE__ */ jsx(Icons.Trash, { className: "w-5 h-5" })
                }
              )
            ] })
          ] }),
          previewingBadge === badge.id && /* @__PURE__ */ jsx("div", { className: "mt-4 pt-4 border-t border-gray-100", children: previewLoading ? /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gray-500", children: [
            /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-5 w-5 mr-2", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
              /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
            ] }),
            "Loading preview..."
          ] }) : previewResult ? /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-medium text-gray-900", children: [
                previewResult.count,
                " hotels match this rule"
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: closePreview,
                  className: "text-gray-400 hover:text-gray-600",
                  children: /* @__PURE__ */ jsx(Icons.Close, { className: "w-4 h-4" })
                }
              )
            ] }),
            previewResult.hotels.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
              previewResult.hotels.map((hotel) => /* @__PURE__ */ jsxs(
                "span",
                {
                  className: "px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded",
                  children: [
                    hotel.name,
                    " (",
                    hotel.overall_score,
                    ")"
                  ]
                },
                hotel.id
              )),
              previewResult.count > 10 && /* @__PURE__ */ jsxs("span", { className: "px-2 py-1 text-gray-500 text-sm", children: [
                "+",
                previewResult.count - 10,
                " more"
              ] })
            ] })
          ] }) : null })
        ]
      },
      badge.id
    )) }),
    /* @__PURE__ */ jsx(
      BadgeModal,
      {
        show: showBadgeModal,
        onClose: () => setShowBadgeModal(false),
        badge: editingBadge,
        availableCriteria
      }
    )
  ] });
}
function ScoringIndex({ weights, badges, stats, availableCriteria }) {
  const { flash } = usePage().props;
  const [activeTab, setActiveTab] = useState("weights");
  useEffect(() => {
    if (flash == null ? void 0 : flash.success) {
      toast.success(flash.success, {
        position: "top-right",
        autoClose: 3e3
      });
    }
    if (flash == null ? void 0 : flash.error) {
      toast.error(flash.error, {
        position: "top-right",
        autoClose: 5e3
      });
    }
  }, [flash]);
  const handleRecalculateAll = () => {
    if (confirm("This will recalculate scores for all hotels. Continue?")) {
      router.post(route("admin.scoring.recalculate"));
    }
  };
  const handleApplyAllBadges = () => {
    if (confirm("This will apply all active badges to matching hotels. Continue?")) {
      router.post(route("admin.scoring.badges.apply-all"));
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Scoring Settings" }),
    /* @__PURE__ */ jsx(ToastContainer, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, { stats }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: "Criteria & Scoring Settings" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-gray-500", children: "Control how hotels are ranked — the core of the platform's value" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleRecalculateAll,
                className: "inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors",
                children: [
                  /* @__PURE__ */ jsx(Icons.Refresh, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" }),
                  "Recalculate All Scores"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleApplyAllBadges,
                className: "inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors",
                children: [
                  /* @__PURE__ */ jsx(Icons.Award, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" }),
                  "Apply All Badges"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Total Metrics",
              value: stats.total_metrics,
              icon: /* @__PURE__ */ jsx(Icons.Chart, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              color: "blue"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Active Metrics",
              value: stats.active_metrics,
              icon: /* @__PURE__ */ jsx(Icons.Check, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              color: "green"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Visible Metrics",
              value: stats.visible_metrics,
              icon: /* @__PURE__ */ jsx(Icons.Eye, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              color: "purple"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Total Badges",
              value: stats.total_badges,
              icon: /* @__PURE__ */ jsx(Icons.Award, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              color: "orange"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Active Badges",
              value: stats.active_badges,
              icon: /* @__PURE__ */ jsx(Icons.Award, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              color: "emerald"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Hotels with Badges",
              value: stats.hotels_with_badges,
              icon: /* @__PURE__ */ jsx(Icons.Hotel, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              color: "cyan"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300", children: /* @__PURE__ */ jsxs("nav", { className: "flex -mb-px min-w-max", children: [
            /* @__PURE__ */ jsxs(
              TabButton,
              {
                active: activeTab === "weights",
                onClick: () => setActiveTab("weights"),
                children: [
                  /* @__PURE__ */ jsx(Icons.Settings, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm", children: "Metric Weighting" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              TabButton,
              {
                active: activeTab === "visibility",
                onClick: () => setActiveTab("visibility"),
                children: [
                  /* @__PURE__ */ jsx(Icons.Eye, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm", children: "Visibility" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              TabButton,
              {
                active: activeTab === "badges",
                onClick: () => setActiveTab("badges"),
                children: [
                  /* @__PURE__ */ jsx(Icons.Award, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm", children: "Badge Rules" })
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4 md:p-6", children: [
            activeTab === "weights" && /* @__PURE__ */ jsx(WeightsTab, { weights }),
            activeTab === "visibility" && /* @__PURE__ */ jsx(VisibilityTab, { weights }),
            activeTab === "badges" && /* @__PURE__ */ jsx(
              BadgesTab,
              {
                badges,
                availableCriteria
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ScoringIndex as default
};

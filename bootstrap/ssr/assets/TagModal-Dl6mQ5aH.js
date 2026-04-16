import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { M as Modal, I as Icons } from "./Modal--roSw4Ve.js";
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
function CategoryModal({ show, onClose, category }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#f97316"
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        color: category.color || "#f97316"
      });
    } else {
      setFormData({
        name: "",
        description: "",
        color: "#f97316"
      });
    }
    setErrors({});
  }, [category, show]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    const url = category ? route("admin.content.categories.update", category.id) : route("admin.content.categories.store");
    const method = category ? "put" : "post";
    router[method](url, formData, {
      onSuccess: () => {
        onClose();
        setFormData({ name: "", description: "", color: "#f97316" });
      },
      onError: (errors2) => {
        setErrors(errors2);
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      show,
      onClose,
      title: category ? "Edit Category" : "Create Category",
      maxWidth: "md",
      children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
            "Name ",
            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.name ? "border-red-500" : "border-gray-300"}`,
              placeholder: "e.g., Travel Tips"
            }
          ),
          errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: formData.description,
              onChange: (e) => setFormData({ ...formData, description: e.target.value }),
              rows: 3,
              className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.description ? "border-red-500" : "border-gray-300"}`,
              placeholder: "Brief description of this category..."
            }
          ),
          errors.description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Color" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
            PRESET_COLORS.map((color) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setFormData({ ...formData, color }),
                className: `w-8 h-8 rounded-full border-2 transition-all ${formData.color === color ? "border-gray-900 scale-110" : "border-transparent hover:border-gray-300"}`,
                style: { backgroundColor: color }
              },
              color
            )),
            /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "color",
                value: formData.color,
                onChange: (e) => setFormData({ ...formData, color: e.target.value }),
                className: "w-8 h-8 rounded-full cursor-pointer overflow-hidden"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-2", children: "Preview:" }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
              style: {
                backgroundColor: `${formData.color}20`,
                color: formData.color
              },
              children: formData.name || "Category Name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-4 border-t", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing,
              className: "px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors",
              children: processing ? "Saving..." : category ? "Update Category" : "Create Category"
            }
          )
        ] })
      ] })
    }
  );
}
function TagModal({ show, onClose, tag }) {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    if (tag) {
      setName(tag.name || "");
    } else {
      setName("");
    }
    setErrors({});
  }, [tag, show]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    const url = tag ? route("admin.content.tags.update", tag.id) : route("admin.content.tags.store");
    const method = tag ? "put" : "post";
    router[method](url, { name }, {
      onSuccess: () => {
        onClose();
        setName("");
      },
      onError: (errors2) => {
        setErrors(errors2);
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      show,
      onClose,
      title: tag ? "Edit Tag" : "Create Tag",
      maxWidth: "sm",
      children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
            "Tag Name ",
            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", children: /* @__PURE__ */ jsx(Icons.Tag, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: name,
                onChange: (e) => setName(e.target.value),
                className: `w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.name ? "border-red-500" : "border-gray-300"}`,
                placeholder: "e.g., luxury, budget-friendly"
              }
            )
          ] }),
          errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-2", children: "Preview:" }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700", children: [
            /* @__PURE__ */ jsx(Icons.Tag, { className: "w-4 h-4 mr-1" }),
            name || "tag-name"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 pt-4 border-t", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing || !name.trim(),
              className: "px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors",
              children: processing ? "Saving..." : tag ? "Update Tag" : "Create Tag"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  CategoryModal as C,
  TagModal as T
};

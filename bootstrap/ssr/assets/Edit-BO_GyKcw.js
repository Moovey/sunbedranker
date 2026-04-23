import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { A as AdminNav } from "./AdminNav-Dpi9gSoo.js";
function EditDestination({ destination }) {
  const { data, setData, processing, errors } = useForm({
    name: destination.name || "",
    slug: destination.slug || "",
    country: destination.country || "",
    country_code: destination.country_code || "",
    region: destination.region || "",
    description: destination.description || "",
    latitude: destination.latitude || "",
    longitude: destination.longitude || "",
    is_featured: destination.is_featured || false,
    is_active: destination.is_active ?? true,
    image: null
  });
  const [imagePreview, setImagePreview] = useState(
    destination.image ? destination.image.startsWith("http") ? destination.image : `/storage/${destination.image}` : null
  );
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route("admin.destinations.update", destination.id), {
      ...data,
      _method: "PUT"
    }, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: (page) => {
        var _a, _b;
        if ((_b = (_a = page == null ? void 0 : page.props) == null ? void 0 : _a.flash) == null ? void 0 : _b.success) {
          toast.success(page.props.flash.success);
        }
      },
      onError: () => {
        toast.error("Please fix the validation errors.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };
  const generateSlug = () => {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
    setData("slug", slug);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit ${destination.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: "Edit Destination" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-xs sm:text-sm mt-1", children: [
              "Update details for ",
              destination.name
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.destinations.index"),
              className: "inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm",
              children: "← Back to Destinations"
            }
          )
        ] }),
        Object.keys(errors).length > 0 && /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-6 bg-red-50 border border-red-300 rounded-xl p-3 sm:p-4 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-red-500 flex-shrink-0", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" }) }),
          /* @__PURE__ */ jsxs("div", { className: "ml-3 flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-red-800 mb-1", children: "Validation Failed" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: Object.entries(errors).map(([field, message]) => /* @__PURE__ */ jsxs("li", { className: "text-xs text-red-700", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-medium capitalize", children: [
                field.replace(/_/g, " "),
                ":"
              ] }),
              " ",
              message
            ] }, field)) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-4", children: "Basic Information" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Name *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.name,
                    onChange: (e) => setData("name", e.target.value),
                    className: `w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.name ? "border-red-300" : "border-gray-200"}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Slug *" }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: data.slug,
                      onChange: (e) => setData("slug", e.target.value),
                      className: `flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.slug ? "border-red-300" : "border-gray-200"}`
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: generateSlug,
                      className: "px-3 py-2 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600",
                      children: "Generate"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Country *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.country,
                    onChange: (e) => setData("country", e.target.value),
                    className: `w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.country ? "border-red-300" : "border-gray-200"}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Country Code *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.country_code,
                    onChange: (e) => setData("country_code", e.target.value.toUpperCase()),
                    maxLength: 2,
                    placeholder: "GR",
                    className: `w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 uppercase ${errors.country_code ? "border-red-300" : "border-gray-200"}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Region" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.region,
                    onChange: (e) => setData("region", e.target.value),
                    placeholder: "e.g. Cyclades, Algarve, Balearic Islands",
                    className: "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: data.description,
                    onChange: (e) => setData("description", e.target.value),
                    rows: 4,
                    className: "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                    placeholder: "A brief description of this destination..."
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-4", children: "Location" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Latitude" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    step: "any",
                    value: data.latitude,
                    onChange: (e) => setData("latitude", e.target.value),
                    placeholder: "37.4467",
                    className: `w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.latitude ? "border-red-300" : "border-gray-200"}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Longitude" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    step: "any",
                    value: data.longitude,
                    onChange: (e) => setData("longitude", e.target.value),
                    placeholder: "25.3289",
                    className: `w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.longitude ? "border-red-300" : "border-gray-200"}`
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-4", children: "Image" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full sm:w-48 h-36 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0", children: imagePreview ? /* @__PURE__ */ jsx("img", { src: imagePreview, alt: "Preview", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-orange-50", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 text-orange-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    onChange: handleImageChange,
                    className: "block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 transition-colors"
                  }
                ),
                errors.image && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-600", children: errors.image }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-gray-400", children: "Max 2MB. JPG, PNG, or WebP recommended." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-4", children: "Settings" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: data.is_active,
                    onChange: (e) => setData("is_active", e.target.checked),
                    className: "w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-900", children: "Active" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Visible on the public site" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: data.is_featured,
                    onChange: (e) => setData("is_featured", e.target.checked),
                    className: "w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-900", children: "Featured" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Highlighted on the homepage and destination listings" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900 mb-4", children: "Meta" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-0.5", children: "ID" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-700", children: destination.id })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-0.5", children: "Active Hotels" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-700", children: destination.active_hotels_count ?? "—" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-0.5", children: "Created" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-700", children: new Date(destination.created_at).toLocaleDateString() })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-0.5", children: "Updated" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-700", children: new Date(destination.updated_at).toLocaleDateString() })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("admin.destinations.index"),
                className: "px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-center text-sm",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "px-6 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed",
                children: processing ? "Saving..." : "Save Changes"
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  EditDestination as default
};

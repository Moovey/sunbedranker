import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
/* empty css                      */
import { A as AdminNav } from "./AdminNav-Dpi9gSoo.js";
import { I as Icons } from "./Modal--roSw4Ve.js";
import { C as CategoryModal, T as TagModal } from "./TagModal-Dl6mQ5aH.js";
import { R as RichTextEditor } from "./RichTextEditor-BfcETVi8.js";
import "@tiptap/react";
import "@tiptap/starter-kit";
import "@tiptap/extension-image";
import "@tiptap/extension-link";
import "@tiptap/extension-text-align";
import "@tiptap/extension-underline";
import "@tiptap/extension-placeholder";
function CreatePost({ categories, tags }) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category_id: "",
    tags: [],
    status: "draft",
    published_at: "",
    meta_title: "",
    meta_description: ""
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const removeImage = () => {
    setFeaturedImage(null);
    setImagePreview(null);
  };
  const handleTagToggle = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId) ? prev.tags.filter((id) => id !== tagId) : [...prev.tags, tagId]
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "tags") {
        formData.tags.forEach((tagId) => data.append("tags[]", tagId));
      } else {
        data.append(key, formData[key]);
      }
    });
    if (featuredImage) {
      data.append("featured_image", featuredImage);
    }
    router.post(route("admin.content.posts.store"), data, {
      onError: (errors2) => {
        setErrors(errors2);
        toast.error("Failed to create post. Please check the form.", {
          position: "top-right",
          autoClose: 5e3
        });
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Create Post" }),
    /* @__PURE__ */ jsx(ToastContainer, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4 sm:mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("admin.content.index"),
              className: "inline-flex items-center text-xs sm:text-sm text-gray-500 hover:text-gray-700 mb-1.5 sm:mb-2",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }),
                "Back to Content"
              ]
            }
          ),
          /* @__PURE__ */ jsx("h1", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900", children: "Create New Post" })
        ] }) }),
        /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, className: "space-y-4 sm:space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-4 sm:space-y-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: [
                  "Title ",
                  /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: formData.title,
                    onChange: (e) => {
                      setFormData({
                        ...formData,
                        title: e.target.value,
                        slug: formData.slug || generateSlug(e.target.value)
                      });
                    },
                    className: `w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.title ? "border-red-500" : "border-gray-300"}`,
                    placeholder: "Enter post title..."
                  }
                ),
                errors.title && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.title })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Slug" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm text-gray-500 mr-1.5 sm:mr-2", children: "/blog/" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: formData.slug,
                      onChange: (e) => setFormData({ ...formData, slug: generateSlug(e.target.value) }),
                      className: `flex-1 px-3 sm:px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.slug ? "border-red-500" : "border-gray-300"}`,
                      placeholder: "post-url-slug"
                    }
                  )
                ] }),
                errors.slug && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.slug })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Excerpt" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: formData.excerpt,
                  onChange: (e) => setFormData({ ...formData, excerpt: e.target.value }),
                  rows: 3,
                  maxLength: 500,
                  className: `w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.excerpt ? "border-red-500" : "border-gray-300"}`,
                  placeholder: "Brief summary of the post..."
                }
              ),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-[10px] sm:text-xs text-gray-500", children: [
                formData.excerpt.length,
                "/500 characters"
              ] }),
              errors.excerpt && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.excerpt })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: [
                "Content ",
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                RichTextEditor,
                {
                  content: formData.content,
                  onChange: (html) => setFormData({ ...formData, content: html }),
                  placeholder: "Start writing your blog post...",
                  error: errors.content
                }
              ),
              errors.content && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.content })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4", children: "SEO Settings" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Meta Title" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: formData.meta_title,
                      onChange: (e) => setFormData({ ...formData, meta_title: e.target.value }),
                      maxLength: 60,
                      className: "w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                      placeholder: "Custom title for search engines..."
                    }
                  ),
                  /* @__PURE__ */ jsxs("p", { className: "mt-1 text-[10px] sm:text-xs text-gray-500", children: [
                    formData.meta_title.length,
                    "/60 characters"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Meta Description" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      value: formData.meta_description,
                      onChange: (e) => setFormData({ ...formData, meta_description: e.target.value }),
                      rows: 2,
                      maxLength: 160,
                      className: "w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                      placeholder: "Description for search engine results..."
                    }
                  ),
                  /* @__PURE__ */ jsxs("p", { className: "mt-1 text-[10px] sm:text-xs text-gray-500", children: [
                    formData.meta_description.length,
                    "/160 characters"
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4", children: "Publish" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 sm:space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Status" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      value: formData.status,
                      onChange: (e) => setFormData({ ...formData, status: e.target.value }),
                      className: "w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "draft", children: "Draft" }),
                        /* @__PURE__ */ jsx("option", { value: "published", children: "Published" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: processing,
                    className: "flex-1 px-3 sm:px-4 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors",
                    children: processing ? "Saving..." : formData.status === "published" ? "Publish" : "Save"
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4", children: "Featured Image" }),
              imagePreview ? /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: imagePreview,
                    alt: "Preview",
                    className: "w-full h-32 sm:h-40 object-cover rounded-lg"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: removeImage,
                    className: "absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600",
                    children: /* @__PURE__ */ jsx(Icons.Close, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })
                  }
                )
              ] }) : /* @__PURE__ */ jsxs("label", { className: "flex flex-col items-center justify-center w-full h-32 sm:h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors", children: [
                /* @__PURE__ */ jsx(Icons.Document, { className: "w-8 h-8 sm:w-10 sm:h-10 text-gray-400" }),
                /* @__PURE__ */ jsx("span", { className: "mt-2 text-xs sm:text-sm text-gray-500", children: "Click to upload" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    onChange: handleImageChange,
                    className: "hidden"
                  }
                )
              ] }),
              errors.featured_image && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs sm:text-sm text-red-600", children: errors.featured_image })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3 sm:mb-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-medium text-gray-900", children: "Category" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowCategoryModal(true),
                    className: "text-xs sm:text-sm text-orange-500 hover:text-orange-600 font-medium",
                    children: "+ Add New"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: formData.category_id,
                  onChange: (e) => setFormData({ ...formData, category_id: e.target.value }),
                  className: `w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.category_id ? "border-red-500" : "border-gray-300"}`,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select a category" }),
                    categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
                  ]
                }
              ),
              categories.length === 0 && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs sm:text-sm text-gray-500", children: "No categories available. Create one first." }),
              errors.category_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs sm:text-sm text-red-600", children: errors.category_id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3 sm:mb-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-medium text-gray-900", children: "Tags" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowTagModal(true),
                    className: "text-xs sm:text-sm text-orange-500 hover:text-orange-600 font-medium",
                    children: "+ Add New"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 sm:gap-2", children: tags.map((tag) => /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleTagToggle(tag.id),
                  className: `inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${formData.tags.includes(tag.id) ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                  children: [
                    /* @__PURE__ */ jsx(Icons.Tag, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" }),
                    tag.name
                  ]
                },
                tag.id
              )) }),
              tags.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: "No tags available. Create one first." })
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      CategoryModal,
      {
        show: showCategoryModal,
        onClose: () => setShowCategoryModal(false),
        category: null
      }
    ),
    /* @__PURE__ */ jsx(
      TagModal,
      {
        show: showTagModal,
        onClose: () => setShowTagModal(false),
        tag: null
      }
    )
  ] });
}
export {
  CreatePost as default
};

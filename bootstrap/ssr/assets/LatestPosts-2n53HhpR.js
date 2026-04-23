import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function LatestPosts({ posts }) {
  if (!posts || posts.length === 0) {
    return null;
  }
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  return /* @__PURE__ */ jsx("section", { className: "py-16 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900", children: "Pool & Sunbed Guides" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-500 text-base", children: "Expert tips and insights for the perfect pool experience" })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("blog.index"),
          className: "hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white ring-1 ring-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 hover:ring-slate-300 transition-all font-medium text-sm shadow-sm",
          children: [
            "View all guides",
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: posts.map((post) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: "group bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] overflow-hidden hover:ring-slate-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_16px_32px_-16px_rgba(15,23,42,0.16)] transition-all duration-300",
        children: [
          /* @__PURE__ */ jsx(Link, { href: route("blog.show", post.slug), children: /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] overflow-hidden bg-gray-100", children: post.featured_image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: post.featured_image_url,
              alt: post.title,
              width: 400,
              height: 250,
              loading: "lazy",
              decoding: "async",
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-orange-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" }) }) }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
            post.category && /* @__PURE__ */ jsx(
              Link,
              {
                href: route("blog.index", { category: post.category.slug }),
                className: "inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3 transition-colors hover:opacity-80",
                style: {
                  backgroundColor: `${post.category.color}20`,
                  color: post.category.color
                },
                children: post.category.name
              }
            ),
            /* @__PURE__ */ jsx(Link, { href: route("blog.show", post.slug), children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors", children: post.title }) }),
            post.excerpt && /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm line-clamp-2 mb-4", children: post.excerpt }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500", children: [
              /* @__PURE__ */ jsx("span", { children: formatDate(post.published_at) }),
              post.views_count > 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                ] }),
                post.views_count.toLocaleString()
              ] })
            ] })
          ] })
        ]
      },
      post.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 text-center sm:hidden", children: /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("blog.index"),
        className: "inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium",
        children: [
          "View all guides",
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
        ]
      }
    ) })
  ] }) });
}
export {
  LatestPosts as default
};

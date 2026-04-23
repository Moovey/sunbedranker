import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { u as useAppUrl } from "./useAppUrl-B4l_DIW7.js";
import { S as SeoHead } from "./SeoHead-4uo-hZVI.js";
import { H as Header } from "./Header-nFqKg1Hd.js";
import { F as Footer } from "./Footer-cnkUfBq_.js";
function BlogIndex({ posts, categories, tags, featuredPosts, filters }) {
  const [search, setSearch] = useState(filters.search || "");
  const appUrl = useAppUrl();
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route("blog.index"), { search }, { preserveState: true });
  };
  const clearFilters = () => {
    router.get(route("blog.index"));
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const hasActiveFilters = filters.category || filters.tag || filters.search;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SeoHead,
      {
        title: "Travel Guides, Pool Tips & Hotel Reviews | Sunbed Ranker Blog",
        description: "Expert travel guides, destination tips, pool reviews, and insider knowledge about hotel pools, sunbeds, and the best places to relax in the sun. Updated regularly with fresh travel content.",
        path: "/guides",
        type: "blog",
        prev: posts == null ? void 0 : posts.prev_page_url,
        next: posts == null ? void 0 : posts.next_page_url,
        schema: {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Sunbed Ranker Travel Blog",
          "description": "Expert travel guides, destination tips, and hotel pool reviews.",
          "url": `${appUrl}/guides`,
          "publisher": {
            "@type": "Organization",
            "name": "Sunbed Ranker",
            "logo": { "@type": "ImageObject", "url": `${appUrl}/images/logo.png` }
          }
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50/60 font-sans", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-orange-500 to-orange-600 text-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-[0.14em] font-semibold text-orange-100/90 mb-2 sm:mb-3", children: "Sunbed Ranker Guides" }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] mb-2 sm:mb-3 md:mb-4", children: "Pool & Sunbed Guides" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base md:text-lg lg:text-xl text-orange-100/90 max-w-2xl", children: "Expert tips, destination guides, and insider knowledge to help you find the perfect pool experience." }),
        /* @__PURE__ */ jsx("form", { onSubmit: handleSearch, className: "mt-5 sm:mt-6 md:mt-8 max-w-xl", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search guides...",
              className: "w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 pl-10 sm:pl-12 rounded-lg sm:rounded-xl text-slate-900 placeholder-slate-400 ring-1 ring-inset ring-white/20 shadow-sm focus:ring-2 focus:ring-white/60 focus:outline-none text-sm sm:text-base"
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: "absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 px-2.5 sm:px-4 py-1 sm:py-1.5 bg-slate-900 text-white rounded-md sm:rounded-lg hover:bg-slate-800 transition-colors text-xs sm:text-sm font-semibold tracking-tight ring-1 ring-inset ring-black/[0.04]",
              children: "Search"
            }
          )
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-5 sm:gap-6 md:gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          hasActiveFilters && /* @__PURE__ */ jsxs("div", { className: "mb-4 sm:mb-6 flex flex-wrap items-center gap-1.5 sm:gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm text-slate-500 font-medium", children: "Filtered by:" }),
            filters.category && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs sm:text-sm font-semibold ring-1 ring-inset ring-orange-200", children: [
              "Category: ",
              filters.category,
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("blog.index", { tag: filters.tag, search: filters.search }),
                  className: "ml-0.5 sm:ml-1 hover:text-orange-900",
                  children: "×"
                }
              )
            ] }),
            filters.tag && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-semibold ring-1 ring-inset ring-blue-200", children: [
              "Tag: ",
              filters.tag,
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("blog.index", { category: filters.category, search: filters.search }),
                  className: "ml-0.5 sm:ml-1 hover:text-blue-900",
                  children: "×"
                }
              )
            ] }),
            filters.search && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-slate-50 text-slate-700 rounded-full text-xs sm:text-sm font-semibold ring-1 ring-inset ring-slate-200", children: [
              'Search: "',
              filters.search,
              '"',
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("blog.index", { category: filters.category, tag: filters.tag }),
                  className: "ml-0.5 sm:ml-1 hover:text-slate-900",
                  children: "×"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: clearFilters,
                className: "text-xs sm:text-sm text-slate-500 hover:text-slate-700 underline font-medium",
                children: "Clear all"
              }
            )
          ] }),
          posts.data.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6", children: posts.data.map((post) => /* @__PURE__ */ jsxs(
              "article",
              {
                className: "bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] overflow-hidden hover:ring-slate-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_18px_36px_-18px_rgba(15,23,42,0.22)] transition-all duration-200 group",
                children: [
                  /* @__PURE__ */ jsx(Link, { href: route("blog.show", post.slug), children: /* @__PURE__ */ jsx("div", { className: "aspect-[16/9] overflow-hidden bg-slate-100", children: post.featured_image ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: post.featured_image_url,
                      alt: post.title,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    }
                  ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 sm:w-12 sm:h-12 text-orange-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" }) }) }) }) }),
                  /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4 md:p-5", children: [
                    post.category && /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route("blog.index", { category: post.category.slug }),
                        className: "inline-block px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3 transition-colors ring-1 ring-inset",
                        style: {
                          backgroundColor: `${post.category.color}15`,
                          color: post.category.color,
                          boxShadow: `inset 0 0 0 1px ${post.category.color}33`
                        },
                        children: post.category.name
                      }
                    ),
                    /* @__PURE__ */ jsx(Link, { href: route("blog.show", post.slug), children: /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold tracking-tight text-slate-900 mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors", children: post.title }) }),
                    post.excerpt && /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 leading-relaxed", children: post.excerpt }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[10px] sm:text-xs text-slate-500 font-medium pt-3 border-t border-slate-100", children: [
                      /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: formatDate(post.published_at) }),
                      post.views_count > 0 && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-0.5 sm:gap-1 tabular-nums", children: [
                        /* @__PURE__ */ jsxs("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
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
            posts.last_page > 1 && /* @__PURE__ */ jsx("div", { className: "mt-6 sm:mt-8 flex justify-center", children: /* @__PURE__ */ jsx("nav", { className: "flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center", children: posts.links.map((link, index) => /* @__PURE__ */ jsx(
              Link,
              {
                href: link.url || "#",
                className: `px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 ${link.active ? "bg-orange-500 text-white shadow-sm ring-1 ring-inset ring-black/[0.04]" : link.url ? "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 ring-1 ring-slate-200 hover:ring-slate-300" : "bg-slate-50 text-slate-300 cursor-not-allowed ring-1 ring-slate-200/60"}`,
                dangerouslySetInnerHTML: { __html: link.label }
              },
              index
            )) }) })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-10 sm:py-12 md:py-16 bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] px-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-slate-50 ring-1 ring-inset ring-slate-100 rounded-full flex items-center justify-center mb-3 sm:mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-7 h-7 sm:w-8 sm:h-8 text-slate-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-bold tracking-tight text-slate-900 mb-1.5 sm:mb-2", children: "No guides found" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 mb-3 sm:mb-4 text-sm", children: hasActiveFilters ? "Try adjusting your filters or search terms." : "Check back soon for new content!" }),
            hasActiveFilters && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: clearFilters,
                className: "inline-block px-4 sm:px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 text-sm font-semibold tracking-tight shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04]",
                children: "Clear filters"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "lg:w-72 xl:w-80 space-y-4 sm:space-y-5 md:space-y-6", children: [
          categories.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] p-4 sm:p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-3 sm:mb-4", children: "Categories" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: categories.map((category) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("blog.index", { category: category.slug }),
                className: `flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors text-sm font-medium ${filters.category === category.slug ? "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200" : "hover:bg-slate-50 text-slate-700 hover:text-slate-900"}`,
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 sm:gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full",
                        style: { backgroundColor: category.color }
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm", children: category.name })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-xs text-slate-400 tabular-nums", children: category.posts_count })
                ]
              }
            ) }, category.id)) })
          ] }),
          tags.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] p-4 sm:p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-3 sm:mb-4", children: "Popular Tags" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 sm:gap-2", children: tags.map((tag) => /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("blog.index", { tag: tag.slug }),
                className: `px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 ${filters.tag === tag.slug ? "bg-orange-500 text-white shadow-sm ring-1 ring-inset ring-black/[0.04]" : "bg-slate-50 text-slate-700 hover:bg-slate-100 ring-1 ring-inset ring-slate-200"}`,
                children: [
                  "#",
                  tag.name
                ]
              },
              tag.id
            )) })
          ] }),
          featuredPosts.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] p-4 sm:p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-3 sm:mb-4", children: "Most Popular" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3 sm:space-y-4", children: featuredPosts.map((post, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("blog.show", post.slug),
                className: "flex gap-2 sm:gap-3 group",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-slate-50 rounded-lg text-xs sm:text-sm font-semibold text-slate-500 ring-1 ring-inset ring-slate-200 group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:ring-orange-200 transition-colors tabular-nums", children: index + 1 }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-xs sm:text-sm font-semibold tracking-tight text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors", children: post.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 tabular-nums", children: formatDate(post.published_at) })
                  ] })
                ]
              }
            ) }, post.id)) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  BlogIndex as default
};

import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { u as useAppUrl } from "./useAppUrl-B4l_DIW7.js";
import { H as Header } from "./Header-nFqKg1Hd.js";
import { F as Footer } from "./Footer-cnkUfBq_.js";
import "react";
function BlogShow({ post, relatedPosts, nextPost, previousPost }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const appUrl = useAppUrl();
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const isHtmlContent = (content) => {
    if (!content) return false;
    return /<[a-z][\s\S]*>/i.test(content);
  };
  const renderContent = (content) => {
    if (!content) return "";
    if (isHtmlContent(content)) {
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: "blog-content",
          dangerouslySetInnerHTML: { __html: content }
        }
      );
    }
    const paragraphs = content.split("\n\n").filter((p) => p.trim());
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith("### ")) {
        return /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-10 mb-4", children: paragraph.replace("### ", "") }, index);
      }
      if (paragraph.startsWith("## ")) {
        return /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-12 mb-5", children: paragraph.replace("## ", "") }, index);
      }
      if (paragraph.startsWith("# ")) {
        return /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-12 mb-5", children: paragraph.replace("# ", "") }, index);
      }
      if (paragraph.includes("\n- ")) {
        const items = paragraph.split("\n- ").filter((item) => item.trim());
        return /* @__PURE__ */ jsx("ul", { className: "list-none space-y-3 my-6", children: items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mt-0.5 shadow-sm ring-1 ring-inset ring-black/[0.06]", children: /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-white", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-700 leading-relaxed", children: item.replace(/^- /, "") })
        ] }, i)) }, index);
      }
      return /* @__PURE__ */ jsx("p", { className: "text-slate-700 leading-relaxed text-lg mb-6", children: paragraph }, index);
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { title: ((_a = post.meta) == null ? void 0 : _a.title) || post.title, children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: ((_b = post.meta) == null ? void 0 : _b.description) || post.excerpt }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: ((_c = post.meta) == null ? void 0 : _c.title) || post.title }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: ((_d = post.meta) == null ? void 0 : _d.description) || post.excerpt }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "article" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: `${appUrl}/guides/${post.slug}` }),
      post.featured_image_url && /* @__PURE__ */ jsx("meta", { property: "og:image", content: post.featured_image_url }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Sunbed Ranker" }),
      post.published_at && /* @__PURE__ */ jsx("meta", { property: "article:published_time", content: post.published_at }),
      post.author && /* @__PURE__ */ jsx("meta", { property: "article:author", content: post.author.name }),
      post.category && /* @__PURE__ */ jsx("meta", { property: "article:section", content: post.category.name }),
      (_e = post.tags) == null ? void 0 : _e.map((tag) => /* @__PURE__ */ jsx("meta", { property: "article:tag", content: tag.name }, tag.id)),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: ((_f = post.meta) == null ? void 0 : _f.title) || post.title }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: ((_g = post.meta) == null ? void 0 : _g.description) || post.excerpt }),
      post.featured_image_url && /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: post.featured_image_url }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: `${appUrl}/guides/${post.slug}` }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt || ((_h = post.meta) == null ? void 0 : _h.description),
        "image": post.featured_image_url || "",
        "datePublished": post.published_at,
        "dateModified": post.updated_at || post.published_at,
        "author": {
          "@type": "Person",
          "name": ((_i = post.author) == null ? void 0 : _i.name) || "Sunbed Ranker"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Sunbed Ranker",
          "logo": { "@type": "ImageObject", "url": `${appUrl}/images/logo.png` }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${appUrl}/guides/${post.slug}`
        }
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50/60 font-sans", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("div", { className: "relative", children: post.featured_image ? /* @__PURE__ */ jsxs("div", { className: "relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: post.featured_image_url,
            alt: post.title,
            className: "w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-2 text-sm text-white/80 mb-4", children: [
            /* @__PURE__ */ jsx(Link, { href: route("blog.index"), className: "hover:text-white transition-colors font-medium", children: "Guides" }),
            /* @__PURE__ */ jsx("span", { className: "text-white/50", children: "→" }),
            post.category && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
              Link,
              {
                href: route("blog.index", { category: post.category.slug }),
                className: "hover:text-white transition-colors font-medium",
                children: post.category.name
              }
            ) })
          ] }),
          post.category && /* @__PURE__ */ jsx(
            Link,
            {
              href: route("blog.index", { category: post.category.slug }),
              className: "inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold tracking-tight text-white mb-4 hover:bg-white/25 transition-colors ring-1 ring-inset ring-white/20",
              children: post.category.name
            }
          ),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1]", children: post.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-white/90 text-sm", children: [
            post.author && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              post.author.profile_picture ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: `/storage/${post.author.profile_picture}`,
                  alt: post.author.name,
                  className: "w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold ring-2 ring-white/30", children: post.author.name.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: post.author.name })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "w-1 h-1 bg-white/50 rounded-full" }),
            /* @__PURE__ */ jsx("time", { dateTime: post.published_at, className: "tabular-nums", children: formatDate(post.published_at) }),
            post.views_count > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { className: "w-1 h-1 bg-white/50 rounded-full" }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 tabular-nums", children: [
                /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                ] }),
                post.views_count.toLocaleString(),
                " views"
              ] })
            ] })
          ] })
        ] }) })
      ] }) : (
        /* No Image Hero */
        /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-orange-500 to-orange-600 py-16 sm:py-20 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-2 text-sm text-white/80 mb-4", children: [
            /* @__PURE__ */ jsx(Link, { href: route("blog.index"), className: "hover:text-white transition-colors font-medium", children: "Guides" }),
            /* @__PURE__ */ jsx("span", { className: "text-white/50", children: "→" }),
            post.category && /* @__PURE__ */ jsx(
              Link,
              {
                href: route("blog.index", { category: post.category.slug }),
                className: "hover:text-white transition-colors font-medium",
                children: post.category.name
              }
            )
          ] }),
          post.category && /* @__PURE__ */ jsx("span", { className: "inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold tracking-tight text-white mb-4 ring-1 ring-inset ring-white/20", children: post.category.name }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1]", children: post.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-white/90 text-sm", children: [
            post.author && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white font-semibold ring-1 ring-inset ring-white/20", children: post.author.name.charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: post.author.name })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "w-1 h-1 bg-white/50 rounded-full" }),
            /* @__PURE__ */ jsx("time", { dateTime: post.published_at, className: "tabular-nums", children: formatDate(post.published_at) })
          ] })
        ] }) })
      ) }),
      /* @__PURE__ */ jsx("section", { className: "bg-white py-12 sm:py-16 lg:py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        post.excerpt && /* @__PURE__ */ jsx("div", { className: "bg-orange-50/60 rounded-2xl p-6 sm:p-8 mb-10 ring-1 ring-inset ring-orange-100 border-l-2 border-orange-500", children: /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-slate-800 font-medium leading-relaxed", children: post.excerpt }) }),
        /* @__PURE__ */ jsx("article", { className: "prose-custom", children: renderContent(post.content) }),
        post.tags && post.tags.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-slate-200", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 sm:gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500", children: "Tags" }),
          post.tags.map((tag) => /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("blog.index", { tag: tag.slug }),
              className: "px-3 py-1.5 bg-slate-50 text-slate-700 rounded-full text-xs sm:text-sm font-semibold tracking-tight hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200 ring-1 ring-inset ring-slate-200 hover:ring-orange-200",
              children: [
                "#",
                tag.name
              ]
            },
            tag.id
          ))
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500", children: "Share this guide" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(post.title)}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white text-slate-600 rounded-lg ring-1 ring-slate-200 hover:bg-slate-900 hover:text-white hover:ring-slate-900 transition-all duration-200 shadow-sm",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white text-slate-600 rounded-lg ring-1 ring-slate-200 hover:bg-blue-600 hover:text-white hover:ring-blue-600 transition-all duration-200 shadow-sm",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&title=${encodeURIComponent(post.title)}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white text-slate-600 rounded-lg ring-1 ring-slate-200 hover:bg-blue-700 hover:text-white hover:ring-blue-700 transition-all duration-200 shadow-sm",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                },
                className: "w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white text-slate-600 rounded-lg ring-1 ring-slate-200 hover:bg-orange-500 hover:text-white hover:ring-orange-500 transition-all duration-200 shadow-sm",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) })
              }
            )
          ] })
        ] }) })
      ] }) }),
      (previousPost || nextPost) && /* @__PURE__ */ jsx("section", { className: "bg-slate-50/60 py-10 sm:py-12 md:py-16 border-t border-slate-200/70", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6", children: [
        previousPost ? /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("blog.show", previousPost.slug),
            className: "group bg-white rounded-2xl p-5 sm:p-6 ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:ring-slate-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_18px_36px_-18px_rgba(15,23,42,0.22)] transition-all duration-200",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] font-semibold text-orange-600 mb-2 sm:mb-3", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover:-translate-x-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }),
                "Previous Guide"
              ] }),
              /* @__PURE__ */ jsx("h4", { className: "font-semibold tracking-tight text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors text-base sm:text-lg", children: previousPost.title })
            ]
          }
        ) : /* @__PURE__ */ jsx("div", {}),
        nextPost && /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("blog.show", nextPost.slug),
            className: "group bg-white rounded-2xl p-5 sm:p-6 ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:ring-slate-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_18px_36px_-18px_rgba(15,23,42,0.22)] transition-all duration-200 text-right",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 text-[11px] uppercase tracking-[0.14em] font-semibold text-orange-600 mb-2 sm:mb-3", children: [
                "Next Guide",
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover:translate-x-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
              ] }),
              /* @__PURE__ */ jsx("h4", { className: "font-semibold tracking-tight text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors text-base sm:text-lg", children: nextPost.title })
            ]
          }
        )
      ] }) }) }),
      relatedPosts.length > 0 && /* @__PURE__ */ jsx("section", { className: "bg-white py-10 sm:py-12 md:py-16 lg:py-20 border-t border-slate-200/70", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 gap-3 sm:gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-2", children: "Keep Reading" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-1 sm:mb-2 leading-[1.1]", children: "Related Guides" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm sm:text-base md:text-lg", children: "More tips for your pool experience" })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("blog.index"),
              className: "bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-tight text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04]",
              children: "View all →"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8", children: relatedPosts.map((relatedPost) => /* @__PURE__ */ jsxs(
          "article",
          {
            className: "group bg-white overflow-hidden transition-all duration-200 rounded-2xl ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:ring-slate-300 hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_18px_36px_-18px_rgba(15,23,42,0.22)]",
            children: [
              /* @__PURE__ */ jsx(Link, { href: route("blog.show", relatedPost.slug), className: "block", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden aspect-[16/10]", children: [
                relatedPost.featured_image ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: relatedPost.featured_image_url,
                    alt: relatedPost.title,
                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100", children: /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 text-orange-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" }),
                relatedPost.category && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-tight shadow-sm ring-1 ring-inset ring-black/[0.06]",
                    style: {
                      backgroundColor: relatedPost.category.color,
                      color: "white"
                    },
                    children: relatedPost.category.name
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-5", children: [
                /* @__PURE__ */ jsx(Link, { href: route("blog.show", relatedPost.slug), children: /* @__PURE__ */ jsx("h3", { className: "font-semibold tracking-tight text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors text-base sm:text-lg mb-1.5 sm:mb-2", children: relatedPost.title }) }),
                relatedPost.excerpt && /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 leading-relaxed", children: relatedPost.excerpt }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs sm:text-sm text-slate-500 pt-3 border-t border-slate-100", children: [
                  /* @__PURE__ */ jsx("span", { className: "tabular-nums", children: formatDate(relatedPost.published_at) }),
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("blog.show", relatedPost.slug),
                      className: "text-orange-600 font-semibold hover:text-orange-700 transition-colors",
                      children: "Read more →"
                    }
                  )
                ] })
              ] })
            ]
          },
          relatedPost.id
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-slate-50/60 py-10 sm:py-12 md:py-16 lg:py-20 border-t border-slate-200/70", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-500 mb-3", children: "Start Your Search" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3 sm:mb-4 leading-[1.1]", children: "Ready to find your perfect pool?" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm sm:text-base md:text-lg mb-6 sm:mb-8", children: "Discover top-rated hotels with the best sunbed experiences" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/destinations",
              className: "bg-orange-500 hover:bg-orange-600 text-white font-semibold tracking-tight text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ring-1 ring-inset ring-black/[0.04]",
              children: "Explore Destinations"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("blog.index"),
              className: "bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold tracking-tight text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-all duration-200 shadow-sm ring-1 ring-slate-200 hover:ring-slate-300",
              children: "More Guides"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  BlogShow as default
};

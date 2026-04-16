import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { u as useAppUrl } from "./useAppUrl-B4l_DIW7.js";
function SeoHead({ title, description, path, image, type = "website", schema, noindex = false, prev, next, children }) {
  const appUrl = useAppUrl();
  const fullUrl = `${appUrl}${path}`;
  const ogImage = image || `${appUrl}/images/og-default.jpg`;
  return /* @__PURE__ */ jsxs(Head, { title, children: [
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    noindex && /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: `${title} | Sunbed Ranker` }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: fullUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "Sunbed Ranker" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: `${title} | Sunbed Ranker` }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: fullUrl }),
    prev && /* @__PURE__ */ jsx("link", { rel: "prev", href: prev }),
    next && /* @__PURE__ */ jsx("link", { rel: "next", href: next }),
    schema && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schema) }),
    children
  ] });
}
export {
  SeoHead as S
};

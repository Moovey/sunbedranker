import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, usePage, Head, router } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
/* empty css                      */
import { A as AdminNav } from "./AdminNav-Dpi9gSoo.js";
import { S as StatCard, T as TabButton } from "./TabButton-kurVP5_k.js";
import { I as Icons, M as Modal } from "./Modal--roSw4Ve.js";
import { E as EmptyState, S as StatusBadge, P as Pagination } from "./EmptyState-DFAGVrDk.js";
import { C as CategoryModal, T as TagModal } from "./TagModal-Dl6mQ5aH.js";
function PostsTab({ posts, onDelete, onToggleStatus }) {
  const getStatusColor = (status) => {
    const colors = {
      published: "green",
      draft: "yellow",
      scheduled: "blue"
    };
    return colors[status] || "gray";
  };
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  if (posts.data.length === 0) {
    return /* @__PURE__ */ jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsx(Icons.Document, { className: "w-12 h-12" }),
        title: "No posts found",
        description: "Create your first post to start building your content library"
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Post" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Category" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Author" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Views" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: posts.data.map((post) => {
        var _a;
        return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            post.featured_image ? /* @__PURE__ */ jsx(
              "img",
              {
                src: post.featured_image_url,
                alt: post.title,
                className: "w-12 h-12 rounded-lg object-cover mr-3"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center mr-3", children: /* @__PURE__ */ jsx(Icons.Document, { className: "w-6 h-6 text-gray-400" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900 line-clamp-1", children: post.title }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 line-clamp-1", children: [
                "/",
                post.slug
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: post.category ? /* @__PURE__ */ jsx(
            "span",
            {
              className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
              style: {
                backgroundColor: `${post.category.color}20`,
                color: post.category.color
              },
              children: post.category.name
            }
          ) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-sm", children: "-" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx(StatusBadge, { status: post.status, color: getStatusColor(post.status) }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900", children: ((_a = post.author) == null ? void 0 : _a.name) || "Unknown" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [
            /* @__PURE__ */ jsx(Icons.Eye, { className: "w-4 h-4 mr-1" }),
            (post.views_count || 0).toLocaleString()
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: formatDate(post.published_at || post.created_at) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onToggleStatus(post),
                className: `p-1.5 rounded-lg transition-colors ${post.status === "published" ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"}`,
                title: post.status === "published" ? "Unpublish" : "Publish",
                children: post.status === "published" ? /* @__PURE__ */ jsx(Icons.Pending, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Icons.Check, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("admin.content.posts.edit", post.id),
                className: "p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
                title: "Edit",
                children: /* @__PURE__ */ jsx(Icons.Edit, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onDelete(post),
                className: "p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors",
                title: "Delete",
                children: /* @__PURE__ */ jsx(Icons.Trash, { className: "w-5 h-5" })
              }
            )
          ] }) })
        ] }, post.id);
      }) })
    ] }) }),
    posts.last_page > 1 && /* @__PURE__ */ jsx(
      Pagination,
      {
        currentPage: posts.current_page,
        lastPage: posts.last_page,
        from: posts.from,
        to: posts.to,
        total: posts.total,
        links: posts.links
      }
    )
  ] });
}
function CategoriesTab({ categories, onEdit, onDelete }) {
  if (categories.data.length === 0) {
    return /* @__PURE__ */ jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsx(Icons.Category, { className: "w-12 h-12" }),
        title: "No categories found",
        description: "Create your first category to organize your content"
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: categories.data.map((category) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-lg flex items-center justify-center mr-3",
                  style: { backgroundColor: `${category.color}20` },
                  children: /* @__PURE__ */ jsx(
                    Icons.Category,
                    {
                      className: "w-5 h-5",
                      style: { color: category.color }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900", children: category.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                  "/",
                  category.slug
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => onEdit(category),
                  className: "p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
                  title: "Edit",
                  children: /* @__PURE__ */ jsx(Icons.Edit, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => onDelete(category),
                  className: `p-1.5 rounded-lg transition-colors ${category.posts_count > 0 ? "text-gray-400 cursor-not-allowed" : "text-red-600 hover:bg-red-50"}`,
                  title: category.posts_count > 0 ? "Cannot delete: category has posts" : "Delete",
                  disabled: category.posts_count > 0,
                  children: /* @__PURE__ */ jsx(Icons.Trash, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          category.description && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-gray-600 line-clamp-2", children: category.description }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 pt-3 border-t border-gray-100 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
              category.posts_count || 0,
              " posts"
            ] }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "inline-block w-4 h-4 rounded-full border border-gray-200",
                style: { backgroundColor: category.color },
                title: category.color
              }
            )
          ] })
        ]
      },
      category.id
    )) }),
    categories.last_page > 1 && /* @__PURE__ */ jsx(
      Pagination,
      {
        currentPage: categories.current_page,
        lastPage: categories.last_page,
        from: categories.from,
        to: categories.to,
        total: categories.total,
        links: categories.links
      }
    )
  ] });
}
function TagsTab({ tags, onEdit, onDelete }) {
  if (tags.data.length === 0) {
    return /* @__PURE__ */ jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsx(Icons.Tag, { className: "w-12 h-12" }),
        title: "No tags found",
        description: "Create tags to help categorize and discover your content"
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: tags.data.map((tag) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "inline-flex items-center bg-white border border-gray-200 rounded-full pl-4 pr-2 py-2 hover:shadow-md transition-shadow group",
        children: [
          /* @__PURE__ */ jsx(Icons.Tag, { className: "w-4 h-4 text-orange-500 mr-2" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 mr-1", children: tag.name }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500 mr-2", children: [
            "(",
            tag.posts_count || 0,
            ")"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onEdit(tag),
                className: "p-1 text-blue-600 hover:bg-blue-50 rounded-full transition-colors",
                title: "Edit",
                children: /* @__PURE__ */ jsx(Icons.Edit, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => onDelete(tag),
                className: "p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors",
                title: "Delete",
                children: /* @__PURE__ */ jsx(Icons.Trash, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ]
      },
      tag.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Tag Name" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Slug" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Posts" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: tags.data.map((tag) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(Icons.Tag, { className: "w-4 h-4 text-orange-500 mr-2" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: tag.name })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: tag.slug }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800", children: [
          tag.posts_count || 0,
          " posts"
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onEdit(tag),
              className: "p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
              title: "Edit",
              children: /* @__PURE__ */ jsx(Icons.Edit, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onDelete(tag),
              className: "p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors",
              title: "Delete",
              children: /* @__PURE__ */ jsx(Icons.Trash, { className: "w-5 h-5" })
            }
          )
        ] }) })
      ] }, tag.id)) })
    ] }) }),
    tags.last_page > 1 && /* @__PURE__ */ jsx(
      Pagination,
      {
        currentPage: tags.current_page,
        lastPage: tags.last_page,
        from: tags.from,
        to: tags.to,
        total: tags.total,
        links: tags.links
      }
    )
  ] });
}
function ContentIndex({ posts, categories, tags, allCategories, filters, stats }) {
  var _a, _b;
  const { flash } = usePage().props;
  const [activeTab, setActiveTab] = useState(filters.tab || "posts");
  const [search, setSearch] = useState(filters.search || "");
  const [statusFilter, setStatusFilter] = useState(filters.status || "all");
  const [categoryFilter, setCategoryFilter] = useState(filters.category || "all");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingTag, setEditingTag] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  useEffect(() => {
    if (flash == null ? void 0 : flash.success) {
      toast.success(flash.success, {
        position: "top-right",
        autoClose: 3e3,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
    if (flash == null ? void 0 : flash.error) {
      toast.error(flash.error, {
        position: "top-right",
        autoClose: 5e3
      });
    }
  }, [flash]);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.get(route("admin.content.index"), { tab, search: "" }, { preserveState: true });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route("admin.content.index"), {
      tab: activeTab,
      search,
      status: statusFilter,
      category: categoryFilter
    }, { preserveState: true });
  };
  const handleFilterChange = (newFilters) => {
    router.get(route("admin.content.index"), {
      tab: activeTab,
      search,
      ...newFilters
    }, { preserveState: true });
  };
  const handleCreateCategory = () => {
    setEditingCategory(null);
    setShowCategoryModal(true);
  };
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowCategoryModal(true);
  };
  const handleDeleteCategory = (category) => {
    setDeleteItem({ type: "category", item: category });
    setShowDeleteModal(true);
  };
  const handleCreateTag = () => {
    setEditingTag(null);
    setShowTagModal(true);
  };
  const handleEditTag = (tag) => {
    setEditingTag(tag);
    setShowTagModal(true);
  };
  const handleDeleteTag = (tag) => {
    setDeleteItem({ type: "tag", item: tag });
    setShowDeleteModal(true);
  };
  const handleDeletePost = (post) => {
    setDeleteItem({ type: "post", item: post });
    setShowDeleteModal(true);
  };
  const handleTogglePostStatus = (post) => {
    router.post(route("admin.content.posts.toggle-status", post.id));
  };
  const confirmDelete = () => {
    if (!deleteItem) return;
    const routes = {
      post: "admin.content.posts.destroy",
      category: "admin.content.categories.destroy",
      tag: "admin.content.tags.destroy"
    };
    router.delete(route(routes[deleteItem.type], deleteItem.item.id), {
      onSuccess: () => {
        setShowDeleteModal(false);
        setDeleteItem(null);
      }
    });
  };
  const tabCounts = {
    posts: stats.total_posts,
    categories: stats.total_categories,
    tags: stats.total_tags
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Content & Guides" }),
    /* @__PURE__ */ jsx(ToastContainer, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900", children: "Content & Guides" }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500", children: "Manage blog posts, categories, and tags for SEO and platform authority" })
          ] }),
          activeTab === "posts" && /* @__PURE__ */ jsxs(
            "a",
            {
              href: route("admin.content.posts.create"),
              className: "inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors",
              children: [
                /* @__PURE__ */ jsx(Icons.Plus, { className: "w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" }),
                "New Post"
              ]
            }
          ),
          activeTab === "categories" && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleCreateCategory,
              className: "inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors",
              children: [
                /* @__PURE__ */ jsx(Icons.Plus, { className: "w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" }),
                "New Category"
              ]
            }
          ),
          activeTab === "tags" && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleCreateTag,
              className: "inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors",
              children: [
                /* @__PURE__ */ jsx(Icons.Plus, { className: "w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" }),
                "New Tag"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Total Posts",
              value: stats.total_posts,
              icon: /* @__PURE__ */ jsx(Icons.Document, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              color: "blue"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Published",
              value: stats.published_posts,
              icon: /* @__PURE__ */ jsx(Icons.Check, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              color: "green"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Drafts",
              value: stats.draft_posts,
              icon: /* @__PURE__ */ jsx(Icons.Pending, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              color: "yellow"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Categories",
              value: stats.total_categories,
              icon: /* @__PURE__ */ jsx(Icons.Category, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              color: "purple"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Tags",
              value: stats.total_tags,
              icon: /* @__PURE__ */ jsx(Icons.Tag, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              color: "orange"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Total Views",
              value: stats.total_views.toLocaleString(),
              icon: /* @__PURE__ */ jsx(Icons.Eye, { className: "w-4 h-4 sm:w-5 sm:h-5" }),
              color: "emerald"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100", children: [
          /* @__PURE__ */ jsx("div", { className: "border-b border-gray-200 overflow-x-auto scrollbar-hide", children: /* @__PURE__ */ jsxs("nav", { className: "flex -mb-px min-w-max", children: [
            /* @__PURE__ */ jsx(
              TabButton,
              {
                active: activeTab === "posts",
                onClick: () => handleTabChange("posts"),
                count: tabCounts.posts,
                children: "Posts"
              }
            ),
            /* @__PURE__ */ jsx(
              TabButton,
              {
                active: activeTab === "categories",
                onClick: () => handleTabChange("categories"),
                count: tabCounts.categories,
                children: "Categories"
              }
            ),
            /* @__PURE__ */ jsx(
              TabButton,
              {
                active: activeTab === "tags",
                onClick: () => handleTabChange("tags"),
                count: tabCounts.tags,
                children: "Tags"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "p-3 sm:p-4 border-b border-gray-200", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex flex-col gap-2 sm:gap-3 md:gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
                /* @__PURE__ */ jsx(Icons.Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    placeholder: `Search ${activeTab}...`,
                    className: "w-full pl-9 sm:pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  }
                )
              ] }),
              activeTab === "posts" && /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: statusFilter,
                    onChange: (e) => {
                      setStatusFilter(e.target.value);
                      handleFilterChange({ status: e.target.value, category: categoryFilter });
                    },
                    className: "w-full sm:w-auto px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "all", children: "All Status" }),
                      /* @__PURE__ */ jsx("option", { value: "published", children: "Published" }),
                      /* @__PURE__ */ jsx("option", { value: "draft", children: "Draft" }),
                      /* @__PURE__ */ jsx("option", { value: "scheduled", children: "Scheduled" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: categoryFilter,
                    onChange: (e) => {
                      setCategoryFilter(e.target.value);
                      handleFilterChange({ status: statusFilter, category: e.target.value });
                    },
                    className: "w-full sm:w-auto px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "all", children: "All Categories" }),
                      allCategories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors",
                children: "Search"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4", children: [
            activeTab === "posts" && /* @__PURE__ */ jsx(
              PostsTab,
              {
                posts,
                onDelete: handleDeletePost,
                onToggleStatus: handleTogglePostStatus
              }
            ),
            activeTab === "categories" && /* @__PURE__ */ jsx(
              CategoriesTab,
              {
                categories,
                onEdit: handleEditCategory,
                onDelete: handleDeleteCategory
              }
            ),
            activeTab === "tags" && /* @__PURE__ */ jsx(
              TagsTab,
              {
                tags,
                onEdit: handleEditTag,
                onDelete: handleDeleteTag
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      CategoryModal,
      {
        show: showCategoryModal,
        onClose: () => setShowCategoryModal(false),
        category: editingCategory
      }
    ),
    /* @__PURE__ */ jsx(
      TagModal,
      {
        show: showTagModal,
        onClose: () => setShowTagModal(false),
        tag: editingTag
      }
    ),
    /* @__PURE__ */ jsx(
      Modal,
      {
        show: showDeleteModal,
        onClose: () => setShowDeleteModal(false),
        title: `Delete ${deleteItem == null ? void 0 : deleteItem.type}`,
        maxWidth: "sm",
        children: /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-red-100 rounded-full mb-3 sm:mb-4", children: /* @__PURE__ */ jsx(Icons.Trash, { className: "w-5 h-5 sm:w-6 sm:h-6 text-red-600" }) }),
          /* @__PURE__ */ jsxs("p", { className: "text-center text-sm sm:text-base text-gray-600 mb-4 sm:mb-6", children: [
            "Are you sure you want to delete this ",
            deleteItem == null ? void 0 : deleteItem.type,
            "?",
            (deleteItem == null ? void 0 : deleteItem.type) === "post" && " This action cannot be undone.",
            (deleteItem == null ? void 0 : deleteItem.type) === "category" && ((_a = deleteItem == null ? void 0 : deleteItem.item) == null ? void 0 : _a.posts_count) > 0 && /* @__PURE__ */ jsxs("span", { className: "block mt-2 text-red-600 text-xs sm:text-sm", children: [
              "This category has ",
              deleteItem.item.posts_count,
              " posts and cannot be deleted."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse sm:flex-row justify-center gap-2 sm:gap-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setShowDeleteModal(false),
                className: "w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: confirmDelete,
                disabled: (deleteItem == null ? void 0 : deleteItem.type) === "category" && ((_b = deleteItem == null ? void 0 : deleteItem.item) == null ? void 0 : _b.posts_count) > 0,
                className: "w-full sm:w-auto px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  ContentIndex as default
};

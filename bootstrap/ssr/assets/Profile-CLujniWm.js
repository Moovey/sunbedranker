import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { usePage, useForm, Head, router } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { A as AdminNav } from "./AdminNav-Dpi9gSoo.js";
function AdminProfile({ stats }) {
  const { auth } = usePage().props;
  const user = auth.user;
  const [activeTab, setActiveTab] = useState("profile");
  const [imagePreview, setImagePreview] = useState(user.profile_picture_url);
  const fileInputRef = useRef(null);
  useEffect(() => {
    setImagePreview(user.profile_picture_url);
  }, [user.profile_picture_url]);
  const { data, setData, post, errors, processing, reset } = useForm({
    name: user.name,
    email: user.email,
    profile_picture: null
  });
  const { data: passwordData, setData: setPasswordData, put: updatePassword, errors: passwordErrors, processing: passwordProcessing, reset: resetPassword } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      setData("profile_picture", file);
      const reader = new FileReader();
      reader.onload = (e2) => setImagePreview(e2.target.result);
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    router.delete(route("admin.profile.picture.remove"), {
      onSuccess: () => {
        setImagePreview(null);
        setData("profile_picture", null);
        toast.success("Profile picture removed!");
      },
      onError: () => toast.error("Failed to remove profile picture")
    });
  };
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    post(route("admin.profile.update"), {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: (page) => {
        var _a, _b;
        toast.success("Profile updated successfully!");
        reset("profile_picture");
        if ((_b = (_a = page.props.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.profile_picture_url) {
          setImagePreview(page.props.auth.user.profile_picture_url);
        }
      },
      onError: (errors2) => {
        toast.error("Failed to update profile");
      }
    });
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    updatePassword(route("admin.profile.password"), {
      onSuccess: () => {
        toast.success("Password updated successfully!");
        resetPassword();
      },
      onError: () => toast.error("Failed to update password")
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Admin Profile" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(AdminNav, { stats }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4 sm:mb-5 md:mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900", children: "Admin Profile" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: "Manage your administrator account" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1 space-y-3 sm:space-y-4 md:space-y-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "bg-orange-500 px-4 sm:px-6 py-6 sm:py-8 text-white text-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative inline-block group", children: [
                imagePreview ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: imagePreview,
                    alt: user.name,
                    className: "w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white/30 mx-auto"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold border-4 border-white/30 mx-auto", children: user.name.charAt(0).toUpperCase() }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      var _a;
                      return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                    },
                    className: "absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
                    children: /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" }),
                      /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 13a3 3 0 11-6 0 3 3 0 016 0z" })
                    ] })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg md:text-xl font-semibold mt-3 sm:mt-4 truncate px-2", children: user.name }),
              /* @__PURE__ */ jsx("p", { className: "text-orange-100 text-xs sm:text-sm truncate px-2", children: user.email }),
              /* @__PURE__ */ jsx("span", { className: "inline-block mt-2 px-2.5 sm:px-3 py-1 bg-white/20 rounded-full text-[10px] sm:text-xs font-medium", children: "Administrator" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3 md:gap-4 lg:gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 rounded-xl p-3 sm:p-4 flex flex-col lg:flex-row items-center lg:items-center gap-1 sm:gap-2 lg:gap-3 text-center lg:text-left", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" }) }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-base sm:text-lg md:text-xl font-bold text-gray-900", children: (stats == null ? void 0 : stats.total_hotels) || 0 }),
                  /* @__PURE__ */ jsx("div", { className: "text-[9px] sm:text-[10px] md:text-xs text-gray-500 font-medium", children: "HOTELS" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-cyan-50 rounded-xl p-3 sm:p-4 flex flex-col lg:flex-row items-center lg:items-center gap-1 sm:gap-2 lg:gap-3 text-center lg:text-left", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 flex-shrink-0", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" }) }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-base sm:text-lg md:text-xl font-bold text-gray-900", children: (stats == null ? void 0 : stats.total_users) || 0 }),
                  /* @__PURE__ */ jsx("div", { className: "text-[9px] sm:text-[10px] md:text-xs text-gray-500 font-medium", children: "USERS" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 rounded-xl p-3 sm:p-4 flex flex-col lg:flex-row items-center lg:items-center gap-1 sm:gap-2 lg:gap-3 text-center lg:text-left", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" }) }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-base sm:text-lg md:text-xl font-bold text-gray-900", children: (stats == null ? void 0 : stats.pending_claims) || 0 }),
                  /* @__PURE__ */ jsx("div", { className: "text-[9px] sm:text-[10px] md:text-xs text-gray-500 font-medium whitespace-nowrap", children: "PENDING" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex border-b border-gray-100", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveTab("profile"),
                  className: `flex-1 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 font-medium text-xs sm:text-sm transition-colors ${activeTab === "profile" ? "text-orange-600 border-b-2 border-orange-500 bg-orange-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Profile Information" }),
                    /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Profile" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveTab("password"),
                  className: `flex-1 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 font-medium text-xs sm:text-sm transition-colors ${activeTab === "password" ? "text-orange-600 border-b-2 border-orange-500 bg-orange-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Change Password" }),
                    /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Password" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-5 md:p-6", children: [
              activeTab === "profile" && /* @__PURE__ */ jsxs("form", { onSubmit: handleProfileSubmit, className: "space-y-4 sm:space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-2", children: "Profile Picture" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "relative flex-shrink-0", children: imagePreview ? /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: imagePreview,
                        alt: "Profile preview",
                        className: "w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-200"
                      }
                    ) : /* @__PURE__ */ jsx("div", { className: "w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-semibold text-gray-400 border border-gray-200", children: user.name.charAt(0).toUpperCase() }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-1.5 sm:space-y-2 w-full sm:w-auto", children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          ref: fileInputRef,
                          type: "file",
                          accept: "image/jpeg,image/png,image/jpg,image/gif,image/webp",
                          onChange: handleImageChange,
                          className: "hidden"
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => {
                              var _a;
                              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                            },
                            className: "px-2.5 sm:px-3 py-1.5 bg-orange-50 text-orange-700 font-medium rounded-lg hover:bg-orange-100 transition-colors text-xs sm:text-sm",
                            children: "Upload New Photo"
                          }
                        ),
                        (imagePreview || user.profile_picture_url) && /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: handleRemoveImage,
                            className: "px-2.5 sm:px-3 py-1.5 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors text-xs sm:text-sm",
                            children: "Remove"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500", children: "JPG, PNG, GIF or WEBP. Max 2MB." })
                    ] })
                  ] }),
                  errors.profile_picture && /* @__PURE__ */ jsx("p", { className: "mt-1 text-red-600 text-xs sm:text-sm", children: errors.profile_picture })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Name" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: data.name,
                      onChange: (e) => setData("name", e.target.value),
                      className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-red-600 text-xs sm:text-sm", children: errors.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Email Address" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "email",
                      value: data.email,
                      onChange: (e) => setData("email", e.target.value),
                      className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    }
                  ),
                  errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-red-600 text-xs sm:text-sm", children: errors.email })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Role" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: "Administrator",
                        disabled: true,
                        className: "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Account Created" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
                        disabled: true,
                        className: "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-3 sm:pt-4 border-t border-gray-100", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: processing,
                    className: "w-full sm:w-auto px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 text-sm",
                    children: processing ? "Saving..." : "Update Profile"
                  }
                ) })
              ] }),
              activeTab === "password" && /* @__PURE__ */ jsxs("form", { onSubmit: handlePasswordSubmit, className: "space-y-4 sm:space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Current Password" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "password",
                      value: passwordData.current_password,
                      onChange: (e) => setPasswordData("current_password", e.target.value),
                      className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    }
                  ),
                  passwordErrors.current_password && /* @__PURE__ */ jsx("p", { className: "mt-1 text-red-600 text-xs sm:text-sm", children: passwordErrors.current_password })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "New Password" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "password",
                      value: passwordData.password,
                      onChange: (e) => setPasswordData("password", e.target.value),
                      className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    }
                  ),
                  passwordErrors.password && /* @__PURE__ */ jsx("p", { className: "mt-1 text-red-600 text-xs sm:text-sm", children: passwordErrors.password })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Confirm New Password" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "password",
                      value: passwordData.password_confirmation,
                      onChange: (e) => setPasswordData("password_confirmation", e.target.value),
                      className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-3 sm:pt-4 border-t border-gray-100", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: passwordProcessing,
                    className: "w-full sm:w-auto px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 text-sm",
                    children: passwordProcessing ? "Updating..." : "Update Password"
                  }
                ) })
              ] })
            ] })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminProfile as default
};

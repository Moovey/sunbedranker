import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { usePage, useForm, Head, Link, router } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { H as Header } from "./Header-nFqKg1Hd.js";
function UserProfile({ reviews, savedHotels, isGoogleUser }) {
  const { auth } = usePage().props;
  const user = auth.user;
  const [activeTab, setActiveTab] = useState("profile");
  const [imagePreview, setImagePreview] = useState(user.profile_picture_url);
  const fileInputRef = useRef(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    router.delete(route("user.profile.picture.remove"), {
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
    post(route("user.profile.update"), {
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
    updatePassword(route("user.profile.password"), {
      onSuccess: () => {
        toast.success("Password updated successfully!");
        resetPassword();
      },
      onError: () => toast.error("Failed to update password")
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "My Profile" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4 sm:mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-gray-900", children: "My Profile" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1", children: "Manage your account and view your activity" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1 space-y-6", children: [
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
              /* @__PURE__ */ jsx("h2", { className: "text-lg sm:text-xl font-semibold mt-3 sm:mt-4", children: user.name }),
              /* @__PURE__ */ jsx("p", { className: "text-orange-100 text-xs sm:text-sm truncate max-w-full px-2", children: user.email }),
              /* @__PURE__ */ jsx("span", { className: "inline-block mt-2 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white/20 rounded-full text-[10px] sm:text-xs font-medium", children: "Traveller" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center sm:text-left", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-base sm:text-xl font-bold text-gray-900", children: (reviews == null ? void 0 : reviews.length) || 0 }),
                  /* @__PURE__ */ jsx("div", { className: "text-[9px] sm:text-xs text-gray-500 font-medium", children: "REVIEWS" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-cyan-50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-cyan-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center sm:text-left", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-base sm:text-xl font-bold text-gray-900", children: (savedHotels == null ? void 0 : savedHotels.length) || 0 }),
                  /* @__PURE__ */ jsx("div", { className: "text-[9px] sm:text-xs text-gray-500 font-medium", children: "SAVED" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-green-50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-green-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center sm:text-left", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-base sm:text-xl font-bold text-gray-900", children: new Date(user.created_at).getFullYear() }),
                  /* @__PURE__ */ jsx("div", { className: "text-[9px] sm:text-xs text-gray-500 font-medium", children: "JOINED" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 text-xs sm:text-sm", children: "Quick Links" }) }),
              /* @__PURE__ */ jsxs("div", { className: "p-2 sm:p-3 space-y-0.5 sm:space-y-1", children: [
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("home"),
                    className: "flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-all",
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" }) }),
                      /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700 text-xs sm:text-sm", children: "Home" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("destinations.index"),
                    className: "flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-all",
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" }) }),
                      /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700 text-xs sm:text-sm", children: "Destinations" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("compare.index"),
                    className: "flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-all",
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" }) }),
                      /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700 text-xs sm:text-sm", children: "Compare Hotels" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("logout"),
                    method: "post",
                    as: "button",
                    className: "w-full flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all",
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" }) }),
                      /* @__PURE__ */ jsx("span", { className: "font-medium text-xs sm:text-sm", children: "Log Out" })
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex border-b border-gray-100 overflow-x-auto scrollbar-hide", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setActiveTab("profile"),
                  className: `flex-1 min-w-[100px] px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 font-medium text-[11px] sm:text-xs md:text-sm transition-colors whitespace-nowrap ${activeTab === "profile" ? "text-orange-600 border-b-2 border-orange-500 bg-orange-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`,
                  children: "Profile Info"
                }
              ),
              !isGoogleUser && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setActiveTab("password"),
                  className: `flex-1 min-w-[100px] px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 font-medium text-[11px] sm:text-xs md:text-sm transition-colors whitespace-nowrap ${activeTab === "password" ? "text-orange-600 border-b-2 border-orange-500 bg-orange-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`,
                  children: "Password"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setActiveTab("reviews"),
                  className: `flex-1 min-w-[100px] px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 font-medium text-[11px] sm:text-xs md:text-sm transition-colors whitespace-nowrap ${activeTab === "reviews" ? "text-orange-600 border-b-2 border-orange-500 bg-orange-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`,
                  children: "My Reviews"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-3 sm:p-4 md:p-6", children: [
              activeTab === "profile" && /* @__PURE__ */ jsxs("form", { onSubmit: handleProfileSubmit, className: "space-y-4 sm:space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2", children: "Profile Picture" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 sm:gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "relative flex-shrink-0", children: imagePreview ? /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: imagePreview,
                        alt: "Profile preview",
                        className: "w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-200"
                      }
                    ) : /* @__PURE__ */ jsx("div", { className: "w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-semibold text-gray-400 border border-gray-200", children: user.name.charAt(0).toUpperCase() }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 space-y-1.5 sm:space-y-2", children: [
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
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5 sm:gap-2", children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => {
                              var _a;
                              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                            },
                            className: "px-2 sm:px-3 py-1 sm:py-1.5 bg-orange-50 text-orange-700 font-medium rounded-lg hover:bg-orange-100 transition-colors text-[11px] sm:text-sm",
                            children: "Upload Photo"
                          }
                        ),
                        (imagePreview || user.profile_picture_url) && /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: handleRemoveImage,
                            className: "px-2 sm:px-3 py-1 sm:py-1.5 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors text-[11px] sm:text-sm",
                            children: "Remove"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500", children: "JPG, PNG, GIF or WEBP. Max 2MB." })
                    ] })
                  ] }),
                  errors.profile_picture && /* @__PURE__ */ jsx("p", { className: "mt-1 text-red-600 text-sm", children: errors.profile_picture })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Name" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: data.name,
                      onChange: (e) => setData("name", e.target.value),
                      className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
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
                      className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                    }
                  ),
                  errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-red-600 text-xs sm:text-sm", children: errors.email })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Account Type" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: "Traveller",
                        disabled: true,
                        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Member Since" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
                        disabled: true,
                        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-3 sm:pt-4 border-t border-gray-100", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: processing,
                    className: "w-full sm:w-auto px-3 sm:px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 text-sm",
                    children: processing ? "Saving..." : "Update Profile"
                  }
                ) })
              ] }),
              activeTab === "password" && !isGoogleUser && /* @__PURE__ */ jsxs("form", { onSubmit: handlePasswordSubmit, className: "space-y-4 sm:space-y-5", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    value: user.email,
                    autoComplete: "username",
                    readOnly: true,
                    className: "sr-only",
                    tabIndex: -1,
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Current Password" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: showCurrentPassword ? "text" : "password",
                        value: passwordData.current_password,
                        onChange: (e) => setPasswordData("current_password", e.target.value),
                        autoComplete: "current-password",
                        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowCurrentPassword(!showCurrentPassword),
                        className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors",
                        children: showCurrentPassword ? /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) }) : /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                        ] })
                      }
                    )
                  ] }),
                  passwordErrors.current_password && /* @__PURE__ */ jsx("p", { className: "mt-1 text-red-600 text-xs sm:text-sm", children: passwordErrors.current_password })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "New Password" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: showNewPassword ? "text" : "password",
                        value: passwordData.password,
                        onChange: (e) => setPasswordData("password", e.target.value),
                        autoComplete: "new-password",
                        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowNewPassword(!showNewPassword),
                        className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors",
                        children: showNewPassword ? /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) }) : /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                        ] })
                      }
                    )
                  ] }),
                  passwordErrors.password && /* @__PURE__ */ jsx("p", { className: "mt-1 text-red-600 text-xs sm:text-sm", children: passwordErrors.password })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Confirm New Password" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: showConfirmPassword ? "text" : "password",
                        value: passwordData.password_confirmation,
                        onChange: (e) => setPasswordData("password_confirmation", e.target.value),
                        autoComplete: "new-password",
                        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowConfirmPassword(!showConfirmPassword),
                        className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors",
                        children: showConfirmPassword ? /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) }) : /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                        ] })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "pt-3 sm:pt-4 border-t border-gray-100", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: passwordProcessing,
                    className: "w-full sm:w-auto px-3 sm:px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 text-sm",
                    children: passwordProcessing ? "Updating..." : "Update Password"
                  }
                ) })
              ] }),
              activeTab === "reviews" && /* @__PURE__ */ jsx("div", { children: reviews && reviews.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-2 sm:space-y-3", children: reviews.map((review) => {
                var _a, _b;
                return /* @__PURE__ */ jsx("div", { className: "p-2.5 sm:p-3 rounded-lg border border-gray-100 hover:border-orange-200 transition-all", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2 sm:gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route("hotels.show", (_a = review.hotel) == null ? void 0 : _a.slug),
                        className: "font-medium text-gray-900 hover:text-orange-600 transition-colors text-xs sm:text-sm line-clamp-1",
                        children: (_b = review.hotel) == null ? void 0 : _b.name
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2 mt-1", children: [
                      /* @__PURE__ */ jsx("div", { className: "flex", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
                        "svg",
                        {
                          className: `w-2.5 h-2.5 sm:w-3 sm:h-3 ${star <= review.rating ? "text-orange-500" : "text-gray-300"}`,
                          fill: "currentColor",
                          viewBox: "0 0 24 24",
                          children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
                        },
                        star
                      )) }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-xs text-gray-500", children: new Date(review.created_at).toLocaleDateString() })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1.5 sm:mt-2 text-[11px] sm:text-xs line-clamp-2", children: review.comment })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: `flex-shrink-0 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium ${review.status === "approved" ? "bg-green-100 text-green-700" : review.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`, children: review.status })
                ] }) }, review.id);
              }) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-6 sm:py-8", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm", children: "You haven't written any reviews yet" }),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("destinations.index"),
                    className: "inline-block mt-1.5 sm:mt-2 text-orange-600 font-medium text-xs sm:text-sm hover:text-orange-700",
                    children: "Explore hotels to review →"
                  }
                )
              ] }) })
            ] })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  UserProfile as default
};

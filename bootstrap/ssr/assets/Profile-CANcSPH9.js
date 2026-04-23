import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { usePage, useForm, Head, Link, router } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { H as HotelierNav } from "./HotelierNav-CV4guQe6.js";
function HotelierProfile({ stats, hotels }) {
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
    router.delete(route("hotelier.profile.picture.remove"), {
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
    post(route("hotelier.profile.update"), {
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
    updatePassword(route("hotelier.profile.password"), {
      onSuccess: () => {
        toast.success("Password updated successfully!");
        resetPassword();
      },
      onError: () => toast.error("Failed to update password")
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Hotelier Profile" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(HotelierNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4 sm:mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900", children: "Hotelier Profile" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500", children: "Manage your hotelier account and view your properties" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1 space-y-4 sm:space-y-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "bg-orange-500 px-4 sm:px-6 py-6 sm:py-8 text-white text-center", children: [
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
              /* @__PURE__ */ jsx("span", { className: "inline-block mt-2 px-2 sm:px-3 py-1 bg-white/20 rounded-full text-[10px] sm:text-xs font-medium", children: "Hotelier" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 flex flex-col lg:flex-row items-center lg:items-center gap-1.5 sm:gap-3", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-orange-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-base sm:text-xl font-bold text-gray-900", children: (stats == null ? void 0 : stats.total_hotels) || 0 }),
                  /* @__PURE__ */ jsx("div", { className: "text-[9px] sm:text-xs text-gray-500 font-medium", children: "MY HOTELS" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-cyan-50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 flex flex-col lg:flex-row items-center lg:items-center gap-1.5 sm:gap-3", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-cyan-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-base sm:text-xl font-bold text-gray-900", children: (stats == null ? void 0 : stats.average_score) ? Number(stats.average_score).toFixed(1) : "N/A" }),
                  /* @__PURE__ */ jsx("div", { className: "text-[9px] sm:text-xs text-gray-500 font-medium", children: "AVG SCORE" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 flex flex-col lg:flex-row items-center lg:items-center gap-1.5 sm:gap-3", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5 text-yellow-600", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-base sm:text-xl font-bold text-gray-900", children: (stats == null ? void 0 : stats.total_reviews) || 0 }),
                  /* @__PURE__ */ jsx("div", { className: "text-[9px] sm:text-xs text-gray-500 font-medium", children: "REVIEWS" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 text-xs sm:text-sm", children: "Quick Links" }) }),
              /* @__PURE__ */ jsxs("div", { className: "p-2 sm:p-3 space-y-1", children: [
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("hotelier.dashboard"),
                    className: "flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-all",
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" }) }),
                      /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700 text-xs sm:text-sm", children: "Dashboard" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("hotelier.claims.index"),
                    className: "flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-all",
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" }) }),
                      /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700 text-xs sm:text-sm", children: "My Claims" })
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex border-b border-gray-100", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setActiveTab("profile"),
                    className: `flex-1 px-3 sm:px-6 py-2.5 sm:py-3 font-medium text-xs sm:text-sm transition-colors ${activeTab === "profile" ? "text-orange-600 border-b-2 border-orange-500 bg-orange-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`,
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
                    className: `flex-1 px-3 sm:px-6 py-2.5 sm:py-3 font-medium text-xs sm:text-sm transition-colors ${activeTab === "password" ? "text-orange-600 border-b-2 border-orange-500 bg-orange-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`,
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
                    /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2", children: "Profile Picture" }),
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
                              className: "px-2.5 sm:px-3 py-1 sm:py-1.5 bg-orange-50 text-orange-700 font-medium rounded-lg hover:bg-orange-100 transition-colors text-xs sm:text-sm",
                              children: "Upload New Photo"
                            }
                          ),
                          (imagePreview || user.profile_picture_url) && /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              onClick: handleRemoveImage,
                              className: "px-2.5 sm:px-3 py-1 sm:py-1.5 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors text-xs sm:text-sm",
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
                          value: "Hotelier",
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
                        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
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
                        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
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
                        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
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
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4 sm:mt-6", children: [
              /* @__PURE__ */ jsx("div", { className: "px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100", children: /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 text-sm sm:text-base", children: "My Hotels" }) }),
              /* @__PURE__ */ jsx("div", { className: "p-3 sm:p-4", children: hotels && hotels.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-2 sm:space-y-3", children: hotels.slice(0, 5).map((hotel) => {
                var _a;
                return /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("hotelier.hotels.manage", hotel.slug),
                    className: "block p-2.5 sm:p-3 rounded-lg border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all",
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 sm:gap-3", children: [
                      hotel.main_image_url ? /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: hotel.main_image_url,
                          alt: hotel.name,
                          className: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                        }
                      ) : /* @__PURE__ */ jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 sm:w-6 sm:h-6 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }) }),
                      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 truncate text-xs sm:text-sm", children: hotel.name }),
                        /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-500", children: (_a = hotel.destination) == null ? void 0 : _a.name })
                      ] }),
                      hotel.overall_score && /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm font-bold text-orange-600 flex-shrink-0", children: Number(hotel.overall_score).toFixed(1) })
                    ] })
                  },
                  hotel.id
                );
              }) }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-4 sm:py-6", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 sm:w-10 sm:h-10 text-gray-300 mx-auto mb-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm", children: "No hotels yet" }),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("hotelier.claims.index"),
                    className: "inline-block mt-2 text-orange-600 font-medium text-xs sm:text-sm hover:text-orange-700",
                    children: "Claim a hotel →"
                  }
                )
              ] }) })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  HotelierProfile as default
};

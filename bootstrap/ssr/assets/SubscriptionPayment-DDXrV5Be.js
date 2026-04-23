import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { H as HotelierNav } from "./HotelierNav-CV4guQe6.js";
import { u as useAppUrl } from "./useAppUrl-B4l_DIW7.js";
function PaymentForm({ plan, period, orderSummary, clientSecret, billingData, onBack, appUrl }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const handleSubmit = async (e) => {
    var _a;
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setProcessing(true);
    setError(null);
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${appUrl}/hotelier`
      },
      redirect: "if_required"
    });
    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
      return;
    }
    if (paymentIntent && paymentIntent.status === "succeeded") {
      router.post(route("hotelier.subscribe.complete", { plan }), {
        ...billingData,
        payment_method: ((_a = paymentIntent.payment_method_types) == null ? void 0 : _a[0]) || "card",
        period,
        payment_intent_id: paymentIntent.id
      }, {
        preserveScroll: true
      });
    } else if (paymentIntent) {
      setError(`Payment requires additional action. Please try again.`);
      setProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-4 sm:p-6 space-y-3 sm:space-y-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4", children: "Choose your payment method:" }),
    /* @__PURE__ */ jsx("div", { className: "rounded-lg sm:rounded-xl overflow-hidden", children: /* @__PURE__ */ jsx(
      PaymentElement,
      {
        onReady: () => setIsReady(true),
        options: {
          layout: {
            type: "accordion",
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: true
          },
          paymentMethodOrder: ["card", "google_pay", "apple_pay", "klarna", "link"],
          business: {
            name: "SunbedRanker"
          }
        }
      }
    ) }),
    error && /* @__PURE__ */ jsx("div", { className: "bg-red-50 border border-red-100 rounded-lg p-2.5 sm:p-3", children: /* @__PURE__ */ jsx("p", { className: "text-red-600 text-xs sm:text-sm", children: error }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-100 rounded-lg p-2.5 sm:p-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-900 text-xs sm:text-sm font-medium mb-1", children: "🧪 Test Mode" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-600 text-[10px] sm:text-xs", children: [
        "Card: ",
        /* @__PURE__ */ jsx("span", { className: "font-mono", children: "4242 4242 4242 4242" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-[10px] sm:text-xs", children: "Any future date, any CVC" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-5", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "px-4 py-2 sm:py-2.5 border border-gray-200 text-gray-700 font-medium text-xs sm:text-sm rounded-lg hover:bg-gray-50 transition-colors",
          children: "Back"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing || !stripe || !isReady,
          className: "flex-1 py-2 sm:py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          children: processing ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
              /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
            ] }),
            "Processing..."
          ] }) : `Pay £${orderSummary.total.toFixed(0)}`
        }
      )
    ] })
  ] });
}
function SubscriptionPayment({ plan, period, orderSummary, stripeKey, clientSecret, redirectTo }) {
  const appUrl = useAppUrl();
  const [activeStep, setActiveStep] = useState(1);
  const [stripePromise, setStripePromise] = useState(null);
  const { data, setData } = useForm({
    // Billing Address
    first_name: "",
    last_name: "",
    country: "United Kingdom",
    phone_code: "+44",
    phone_number: "",
    address: "",
    city: "",
    zip_code: ""
  });
  useEffect(() => {
    if (stripeKey) {
      setStripePromise(loadStripe(stripeKey));
    }
  }, [stripeKey]);
  const countries = [
    { code: "GB", name: "United Kingdom", phone: "+44" },
    { code: "US", name: "United States", phone: "+1" },
    { code: "PH", name: "Philippines", phone: "+63" },
    { code: "ES", name: "Spain", phone: "+34" },
    { code: "FR", name: "France", phone: "+33" },
    { code: "DE", name: "Germany", phone: "+49" },
    { code: "IT", name: "Italy", phone: "+39" },
    { code: "PT", name: "Portugal", phone: "+351" },
    { code: "GR", name: "Greece", phone: "+30" },
    { code: "AU", name: "Australia", phone: "+61" }
  ];
  const handleCountryChange = (e) => {
    const country = countries.find((c) => c.name === e.target.value);
    setData({
      ...data,
      country: e.target.value,
      phone_code: (country == null ? void 0 : country.phone) || "+44"
    });
  };
  const handleBillingContinue = (e) => {
    e.preventDefault();
    if (!data.first_name || !data.last_name || !data.country || !data.address || !data.city || !data.zip_code) {
      return;
    }
    setActiveStep(2);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Complete Your Subscription" }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
      /* @__PURE__ */ jsx(HotelierNav, {}),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 sm:mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3 mb-2", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("hotelier.subscribe", { plan }),
                className: "text-gray-500 hover:text-gray-700 transition-colors",
                children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 sm:w-5 sm:h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" }) })
              }
            ),
            /* @__PURE__ */ jsx("h1", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900", children: "Complete Your Subscription" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs sm:text-sm ml-6 sm:ml-8", children: "Enter your billing details and payment information" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-4 sm:space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-lg sm:rounded-xl shadow-sm border ${activeStep === 1 ? "border-orange-200" : "border-gray-100"} overflow-hidden`, children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-5 border-b border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: `w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold ${activeStep >= 1 ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-400"}`, children: "1" }),
                /* @__PURE__ */ jsx("h2", { className: `text-base sm:text-lg font-semibold ${activeStep >= 1 ? "text-gray-900" : "text-gray-400"}`, children: "Billing address" })
              ] }) }),
              activeStep === 1 && /* @__PURE__ */ jsxs("form", { onSubmit: handleBillingContinue, className: "p-4 sm:p-5 space-y-3 sm:space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "First name" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: data.first_name,
                        onChange: (e) => setData("first_name", e.target.value),
                        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Last name" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: data.last_name,
                        onChange: (e) => setData("last_name", e.target.value),
                        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm",
                        required: true
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Country" }),
                    /* @__PURE__ */ jsx(
                      "select",
                      {
                        value: data.country,
                        onChange: handleCountryChange,
                        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm bg-white",
                        required: true,
                        children: countries.map((country) => /* @__PURE__ */ jsx("option", { value: country.name, children: country.name }, country.code))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Phone (optional)" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
                      /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50 text-gray-500 text-xs sm:text-sm", children: data.phone_code }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "tel",
                          value: data.phone_number,
                          onChange: (e) => setData("phone_number", e.target.value),
                          placeholder: "Phone number",
                          className: "flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-r-lg focus:ring-orange-500 focus:border-orange-500 text-sm min-w-0"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "Address" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: data.address,
                      onChange: (e) => setData("address", e.target.value),
                      className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm",
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "City" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: data.city,
                        onChange: (e) => setData("city", e.target.value),
                        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1", children: "ZIP code" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: data.zip_code,
                        onChange: (e) => setData("zip_code", e.target.value),
                        className: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm",
                        required: true
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    className: "w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors",
                    children: "Continue"
                  }
                )
              ] }),
              activeStep > 1 && /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-5 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start sm:items-center gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-xs sm:text-sm text-gray-500 min-w-0", children: [
                  /* @__PURE__ */ jsxs("p", { className: "font-medium text-gray-900", children: [
                    data.first_name,
                    " ",
                    data.last_name
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "truncate", children: [
                    data.address,
                    ", ",
                    data.city,
                    ", ",
                    data.zip_code
                  ] }),
                  /* @__PURE__ */ jsx("p", { children: data.country })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setActiveStep(1),
                    className: "text-orange-600 hover:text-orange-700 font-medium text-xs sm:text-sm flex-shrink-0",
                    children: "Edit"
                  }
                )
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-lg sm:rounded-xl shadow-sm border ${activeStep === 2 ? "border-orange-200" : "border-gray-100"} overflow-hidden`, children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-5 border-b border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: `w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold ${activeStep >= 2 ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-400"}`, children: "2" }),
                /* @__PURE__ */ jsx("h2", { className: `text-base sm:text-lg font-semibold ${activeStep >= 2 ? "text-gray-900" : "text-gray-400"}`, children: "Payment" })
              ] }) }),
              activeStep === 2 && stripePromise && clientSecret && /* @__PURE__ */ jsx(
                Elements,
                {
                  stripe: stripePromise,
                  options: {
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#f97316",
                        colorBackground: "#ffffff",
                        colorText: "#374151",
                        colorDanger: "#ef4444",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        borderRadius: "8px",
                        spacingUnit: "4px"
                      },
                      rules: {
                        ".Tab": {
                          border: "1px solid #e5e7eb",
                          boxShadow: "none"
                        },
                        ".Tab--selected": {
                          border: "1px solid #f97316",
                          backgroundColor: "#fff7ed"
                        },
                        ".Input": {
                          border: "1px solid #e5e7eb"
                        },
                        ".Input:focus": {
                          border: "1px solid #f97316"
                        }
                      }
                    }
                  },
                  children: /* @__PURE__ */ jsx(
                    PaymentForm,
                    {
                      plan,
                      period,
                      orderSummary,
                      clientSecret,
                      billingData: data,
                      onBack: () => setActiveStep(1),
                      appUrl
                    }
                  )
                }
              ),
              activeStep === 2 && (!stripePromise || !clientSecret) && /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center py-4 sm:py-6", children: [
                /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-5 w-5 sm:h-6 sm:w-6 text-orange-500", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
                  /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "ml-2 sm:ml-3 text-gray-500 text-xs sm:text-sm", children: "Loading payment form..." })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-4 sm:top-8", children: [
            /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-5 border-b border-gray-100", children: /* @__PURE__ */ jsx("h2", { className: "text-base sm:text-lg font-semibold text-gray-900", children: "Order summary" }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-5 space-y-3 sm:space-y-4", children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 text-sm sm:text-base", children: orderSummary.planName }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 sm:space-y-2 text-xs sm:text-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
                    orderSummary.periodLabel,
                    " plan"
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "font-medium text-gray-900", children: [
                    "£",
                    orderSummary.originalTotal.toFixed(0)
                  ] })
                ] }),
                orderSummary.discount > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-green-600", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Discount (",
                    orderSummary.discountPercent,
                    "% off)"
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                    "-£",
                    orderSummary.savings.toFixed(0)
                  ] })
                ] }),
                orderSummary.freeMonths > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-green-600", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "+ ",
                    orderSummary.freeMonths,
                    " months FREE"
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "£0.00" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 pt-2.5 sm:pt-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs sm:text-sm text-gray-500", children: [
                  /* @__PURE__ */ jsx("span", { children: "Taxes" }),
                  /* @__PURE__ */ jsx("span", { children: "-" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] sm:text-xs text-gray-400 mt-1", children: "Calculated after you provide your billing address" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 pt-2.5 sm:pt-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-baseline", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900 text-sm sm:text-base", children: "Subtotal" }),
                  /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                    orderSummary.discount > 0 && /* @__PURE__ */ jsxs("span", { className: "text-xs sm:text-sm text-gray-400 line-through mr-2", children: [
                      "£",
                      orderSummary.originalTotal.toFixed(0)
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "text-lg sm:text-xl font-bold text-gray-900", children: [
                      "£",
                      orderSummary.total.toFixed(0)
                    ] })
                  ] })
                ] }),
                orderSummary.freeMonths > 0 && /* @__PURE__ */ jsxs("p", { className: "text-[10px] sm:text-xs text-green-600 mt-1", children: [
                  "Total coverage: ",
                  orderSummary.totalMonths,
                  " months"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-2 sm:pt-3 flex items-center justify-center gap-1.5 sm:gap-2 text-gray-400", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 sm:w-4 sm:h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-xs", children: "30-day money-back guarantee" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-1.5 sm:pt-2 flex items-center justify-center gap-1.5 sm:gap-2 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] sm:text-xs", children: "Powered by" }),
                /* @__PURE__ */ jsx("svg", { className: "h-3.5 sm:h-4", viewBox: "0 0 60 25", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M59.64 14.28c0-4.82-2.31-8.64-6.79-8.64-4.5 0-7.2 3.82-7.2 8.6 0 5.67 3.21 8.54 7.81 8.54 2.24 0 3.94-.51 5.22-1.22v-3.78c-1.28.64-2.75 1.03-4.61 1.03-1.82 0-3.44-.64-3.65-2.87h9.21c0-.25.01-.98.01-1.66zm-9.3-1.8c0-2.13 1.3-3.02 2.5-3.02 1.17 0 2.39.89 2.39 3.02h-4.89zM38.89 5.64c-1.83 0-3.01.86-3.66 1.46l-.24-1.16h-4.15v22.2l4.72-1v-5.39c.67.49 1.65 1.18 3.28 1.18 3.32 0 6.35-2.67 6.35-8.56-.01-5.39-3.08-8.73-6.3-8.73zm-1.11 13.43c-1.09 0-1.73-.39-2.18-.88v-6.95c.48-.54 1.14-.91 2.18-.91 1.67 0 2.82 1.87 2.82 4.37 0 2.55-1.13 4.37-2.82 4.37zM25.89 4.52l4.72-1.02V0l-4.72 1v3.52zM25.89 5.91h4.72v16.67h-4.72V5.91zM21.1 7.36l-.3-1.45h-4.09v16.67h4.72V11.67c1.12-1.45 3-1.19 3.59-.98V5.91c-.62-.24-2.87-.67-3.92 1.45zM11.47 2.19l-4.61.98-.02 15.27c0 2.82 2.12 4.9 4.94 4.9 1.56 0 2.71-.29 3.34-.63v-3.83c-.6.25-3.59 1.12-3.59-1.69V9.77h3.59V5.91h-3.59l-.06-3.72zM1.22 10.21c0-.67.56-1.12 1.46-1.12 1.3 0 2.94.39 4.24 1.09V5.82C5.46 5.31 4.03 5 2.59 5-.61 5 0 7.87 0 10.52c0 4.16 4.56 3.5 4.56 5.29 0 .79-.69 1.05-1.65 1.05-1.43 0-3.26-.59-4.7-1.38v4.41c1.6.69 3.22.98 4.7.98 3.35 0 5.33-1.66 5.33-4.41-.02-4.49-4.58-3.69-4.58-5.4z", fill: "#6772E5" }) })
              ] })
            ] })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  SubscriptionPayment as default
};

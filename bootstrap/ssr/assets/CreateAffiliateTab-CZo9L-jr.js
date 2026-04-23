import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, useMap } from "react-leaflet";
import L from "leaflet";
/* empty css                        */
function CreateBasicInfoTab({ data, setData, errors, destinations }) {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [countriesLoaded, setCountriesLoaded] = useState(false);
  const [cityQuery, setCityQuery] = useState("");
  const [cityResults, setCityResults] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCityLabel, setSelectedCityLabel] = useState("");
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);
  useEffect(() => {
    if (data.destination_id && (destinations == null ? void 0 : destinations.length)) {
      const dest = destinations.find((d) => d.id == data.destination_id);
      if (dest) {
        setSelectedCityLabel(`${dest.name}, ${dest.country || dest.country_code}`);
        if (!data.country_code && dest.country_code) {
          setData("country_code", dest.country_code);
        }
      }
    }
  }, []);
  const loadCountries = useCallback(() => {
    if (countriesLoaded || loadingCountries) return;
    setLoadingCountries(true);
    fetch(route("admin.api.destinations.countries"), {
      headers: { "X-Requested-With": "XMLHttpRequest", "Accept": "application/json" },
      credentials: "same-origin"
    }).then((res) => res.json()).then((data2) => {
      setCountries(data2 || []);
      setCountriesLoaded(true);
    }).catch(() => setCountries([])).finally(() => setLoadingCountries(false));
  }, [countriesLoaded, loadingCountries]);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!data.country_code || cityQuery.length < 2) {
      setCityResults([]);
      setShowDropdown(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      setLoadingCities(true);
      fetch(route("admin.api.destinations.cities") + `?country_code=${encodeURIComponent(data.country_code)}&query=${encodeURIComponent(cityQuery)}`, {
        headers: { "X-Requested-With": "XMLHttpRequest", "Accept": "application/json" },
        credentials: "same-origin"
      }).then((res) => res.json()).then((results) => {
        setCityResults(results || []);
        setShowDropdown(true);
      }).catch(() => setCityResults([])).finally(() => setLoadingCities(false));
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [cityQuery, data.country_code]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleCountryChange = (e) => {
    const code = e.target.value;
    setData("country_code", code);
    setData("city_name", "");
    setData("destination_id", "");
    setCityQuery("");
    setSelectedCityLabel("");
    setCityResults([]);
  };
  const handleCitySelect = (city) => {
    setData("city_name", city.name);
    setSelectedCityLabel(city.state_name ? `${city.name}, ${city.state_name}` : city.name);
    setCityQuery("");
    setShowDropdown(false);
    setData("destination_id", "");
  };
  const handleCityInputChange = (e) => {
    const val = e.target.value;
    setCityQuery(val);
    setSelectedCityLabel("");
    setData("city_name", "");
    setData("destination_id", "");
  };
  const handleExistingDestinationSelect = (e) => {
    const destId = e.target.value;
    if (destId) {
      const dest = destinations.find((d) => d.id == destId);
      if (dest) {
        setData("destination_id", destId);
        setData("city_name", "");
        setData("country_code", dest.country_code || "");
        setSelectedCityLabel(`${dest.name}, ${dest.country || dest.country_code}`);
        setCityQuery("");
      }
    } else {
      setData("destination_id", "");
      setSelectedCityLabel("");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 mb-6", children: "Basic Information" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Hotel Name *" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: data.name,
          onChange: (e) => setData("name", e.target.value),
          className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light",
          required: true
        }
      ),
      errors.name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 tracking-wide", children: "Destination *" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-neutral-400", children: "(search by country & city, or pick existing)" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border border-neutral-200 rounded-lg p-4 space-y-3 bg-neutral-50/50", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-neutral-500 uppercase tracking-wider", children: "Search City" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs text-neutral-500 mb-1", children: "Country" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: data.country_code || "",
                onChange: handleCountryChange,
                onFocus: loadCountries,
                className: "w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light text-sm",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: loadingCountries ? "Loading countries..." : "Select country" }),
                  countries.map((c) => /* @__PURE__ */ jsx("option", { value: c.iso2, children: c.name }, c.iso2))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs text-neutral-500 mb-1", children: "City" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: selectedCityLabel || cityQuery,
                onChange: handleCityInputChange,
                onFocus: () => {
                  if (cityResults.length) setShowDropdown(true);
                },
                placeholder: data.country_code ? "Type city name (min 2 chars)..." : "Select a country first",
                disabled: !data.country_code,
                className: "w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light text-sm disabled:bg-neutral-100 disabled:cursor-not-allowed"
              }
            ),
            loadingCities && /* @__PURE__ */ jsx("div", { className: "absolute right-3 top-8 text-neutral-400", children: /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4 animate-spin", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
              /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })
            ] }) }),
            showDropdown && cityResults.length > 0 && /* @__PURE__ */ jsx("div", { className: "absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-y-auto", children: cityResults.map((city, idx) => /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: "w-full px-3 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between",
                onClick: () => handleCitySelect(city),
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "font-light", children: [
                    city.name,
                    city.state_name && /* @__PURE__ */ jsxs("span", { className: "text-neutral-400 ml-1", children: [
                      "(",
                      city.state_name,
                      ")"
                    ] })
                  ] }),
                  city.latitude && /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-neutral-300", children: [
                    Number(city.latitude).toFixed(2),
                    ", ",
                    Number(city.longitude).toFixed(2)
                  ] })
                ]
              },
              `${city.name}-${idx}`
            )) }),
            showDropdown && cityQuery.length >= 2 && !loadingCities && cityResults.length === 0 && /* @__PURE__ */ jsxs("div", { className: "absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg p-3 text-sm text-neutral-500", children: [
              'No cities found for "',
              cityQuery,
              '"'
            ] })
          ] })
        ] }),
        data.city_name && /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-600 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) }),
          "New destination will be created: ",
          /* @__PURE__ */ jsx("strong", { children: data.city_name }),
          " (",
          data.country_code,
          ")"
        ] })
      ] }),
      destinations && destinations.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border border-neutral-200 rounded-lg p-4 space-y-3 bg-neutral-50/50", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-neutral-500 uppercase tracking-wider", children: "Or Pick Existing Destination" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: data.destination_id || "",
            onChange: handleExistingDestinationSelect,
            className: "w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light text-sm",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "— Select from existing destinations —" }),
              destinations.map((dest) => /* @__PURE__ */ jsxs("option", { value: dest.id, children: [
                dest.name,
                dest.country ? `, ${dest.country}` : ""
              ] }, dest.id))
            ]
          }
        )
      ] }),
      (errors.destination_id || errors.city_name || errors.country_code) && /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        errors.destination_id && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 font-light", children: errors.destination_id }),
        errors.city_name && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 font-light", children: errors.city_name }),
        errors.country_code && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 font-light", children: errors.country_code })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Description" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: data.description,
          onChange: (e) => setData("description", e.target.value),
          rows: 6,
          className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light",
          placeholder: "Describe the hotel, its amenities, and unique features..."
        }
      ),
      errors.description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.description })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "🏆 Sunbedranker's Top Tip" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: data.top_tip,
          onChange: (e) => setData("top_tip", e.target.value),
          rows: 4,
          className: "w-full px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 font-light bg-orange-50",
          placeholder: "Add an insider tip for guests about this hotel's pool area, best sunbed spots, or hidden gems..."
        }
      ),
      errors.top_tip && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.top_tip })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "🧠 SunbedRanker Review Intelligence" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: data.review_intelligence,
          onChange: (e) => setData("review_intelligence", e.target.value),
          rows: 12,
          className: "w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 font-light bg-purple-50 font-mono text-sm",
          placeholder: `🧠 SunbedRanker Review Intelligence Score: 7.6 / 10
📊 Category Breakdown
📍 Location: 9.2 / 10
Prime setting, walking distance to the beach...

👨‍💼 Service & Staff: 8.8 / 10
Friendly, attentive...`
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-neutral-500 font-light", children: "Free-text editorial summary. Emojis and line breaks are preserved on the public page. Max 5000 characters." }),
      errors.review_intelligence && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.review_intelligence })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Star Rating" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            min: "1",
            max: "5",
            step: "0.5",
            value: data.star_rating,
            onChange: (e) => setData("star_rating", e.target.value),
            className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
          }
        ),
        errors.star_rating && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.star_rating })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Total Rooms" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            min: "1",
            value: data.total_rooms,
            onChange: (e) => setData("total_rooms", e.target.value),
            className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
          }
        ),
        errors.total_rooms && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.total_rooms })
      ] })
    ] })
  ] });
}
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
});
function LocationMarker({ position, setPosition, onLocationSelect }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mouseDownTime, setMouseDownTime] = useState(0);
  useMapEvents({
    mousedown: () => {
      setMouseDownTime(Date.now());
      setIsDragging(false);
    },
    dragstart: () => {
      setIsDragging(true);
    },
    click: async (e) => {
      const clickDuration = Date.now() - mouseDownTime;
      if (isDragging || clickDuration > 300) {
        setIsDragging(false);
        return;
      }
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
          { headers: { "Accept-Language": "en" } }
        );
        const data = await response.json();
        const address = data.display_name || "";
        onLocationSelect(lat, lng, address);
      } catch (error) {
        onLocationSelect(lat, lng, "");
      } finally {
        setIsLoading(false);
      }
    }
  });
  if (!position || !isValidLatLng(position[0], position[1])) {
    return null;
  }
  return /* @__PURE__ */ jsx(Marker, { position });
}
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && isValidLatLng(center[0], center[1])) {
      map.setView(center, 15);
    }
  }, [center, map]);
  return null;
}
function isValidLatLng(lat, lng) {
  const latNum = typeof lat === "number" ? lat : parseFloat(lat);
  const lngNum = typeof lng === "number" ? lng : parseFloat(lng);
  return !isNaN(latNum) && !isNaN(lngNum) && latNum >= -90 && latNum <= 90 && lngNum >= -180 && lngNum <= 180;
}
function ContactLocationTab({ data, setData, errors }) {
  const [markerPosition, setMarkerPosition] = useState(() => {
    const lat = parseFloat(data.latitude);
    const lng = parseFloat(data.longitude);
    return isValidLatLng(lat, lng) ? [lat, lng] : null;
  });
  const [isSearching, setIsSearching] = useState(false);
  const defaultCenter = useMemo(() => {
    const lat = parseFloat(data.latitude);
    const lng = parseFloat(data.longitude);
    if (isValidLatLng(lat, lng)) {
      return [lat, lng];
    }
    return [20, 0];
  }, []);
  const defaultZoom = data.latitude && data.longitude ? 15 : 2;
  const handleLocationSelect = (lat, lng, address) => {
    setData("latitude", lat.toFixed(6));
    setData("longitude", lng.toFixed(6));
    if (address) {
      setData("address", address);
    }
  };
  const handleSearchAddress = async () => {
    if (!data.address || data.address.trim().length < 3) return;
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(data.address)}&limit=1`,
        { headers: { "Accept-Language": "en" } }
      );
      const results = await response.json();
      if (results && results.length > 0) {
        const { lat, lon, display_name } = results[0];
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        setMarkerPosition([latNum, lonNum]);
        setData("latitude", latNum.toFixed(6));
        setData("longitude", lonNum.toFixed(6));
        setData("address", display_name);
      }
    } catch (error) {
    } finally {
      setIsSearching(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 mb-6", children: "Contact & Location" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Address" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: data.address,
            onChange: (e) => setData("address", e.target.value),
            rows: 2,
            className: "flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light",
            placeholder: "Full address of the hotel..."
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleSearchAddress,
            disabled: isSearching || !data.address,
            className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium whitespace-nowrap",
            children: isSearching ? "Searching..." : "Find on Map"
          }
        )
      ] }),
      errors.address && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.address })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Latitude" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: data.latitude,
            onChange: (e) => {
              const value = e.target.value;
              setData("latitude", value);
              const lat = parseFloat(value);
              const lng = parseFloat(data.longitude);
              if (isValidLatLng(lat, lng)) {
                setMarkerPosition([lat, lng]);
              }
            },
            className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light",
            placeholder: "e.g., 38.8851"
          }
        ),
        errors.latitude && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.latitude })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Longitude" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: data.longitude,
            onChange: (e) => {
              const value = e.target.value;
              setData("longitude", value);
              const lat = parseFloat(data.latitude);
              const lng = parseFloat(value);
              if (isValidLatLng(lat, lng)) {
                setMarkerPosition([lat, lng]);
              }
            },
            className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light",
            placeholder: "e.g., 1.4082"
          }
        ),
        errors.longitude && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.longitude })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Click on Map to Set Location" }),
      /* @__PURE__ */ jsx("div", { className: "h-80 rounded-lg overflow-hidden border border-neutral-300 bg-neutral-100", children: /* @__PURE__ */ jsxs(
        MapContainer,
        {
          center: defaultCenter,
          zoom: defaultZoom,
          style: { height: "100%", width: "100%" },
          scrollWheelZoom: true,
          children: [
            /* @__PURE__ */ jsx(
              TileLayer,
              {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              }
            ),
            /* @__PURE__ */ jsx(
              LocationMarker,
              {
                position: markerPosition,
                setPosition: setMarkerPosition,
                onLocationSelect: handleLocationSelect
              }
            ),
            /* @__PURE__ */ jsx(MapController, { center: markerPosition })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-neutral-500", children: [
        "💡 ",
        /* @__PURE__ */ jsx("strong", { children: "Tip:" }),
        ' Click anywhere on the map to set location, or type an address and click "Find on Map"'
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Phone" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            value: data.phone,
            onChange: (e) => setData("phone", e.target.value),
            className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
          }
        ),
        errors.phone && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.phone })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
          }
        ),
        errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Website" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            value: data.website,
            onChange: (e) => setData("website", e.target.value),
            className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light",
            placeholder: "https://..."
          }
        ),
        errors.website && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.website })
      ] })
    ] })
  ] });
}
function CreateAffiliateTab({ data, setData, errors }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 mb-6", children: "Affiliate & Booking Links" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Booking.com Affiliate URL" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "url",
          value: data.booking_affiliate_url,
          onChange: (e) => setData("booking_affiliate_url", e.target.value),
          className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light",
          placeholder: "https://booking.com/..."
        }
      ),
      errors.booking_affiliate_url && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.booking_affiliate_url })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Expedia Affiliate URL" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "url",
          value: data.expedia_affiliate_url,
          onChange: (e) => setData("expedia_affiliate_url", e.target.value),
          className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light",
          placeholder: "https://expedia.com/..."
        }
      ),
      errors.expedia_affiliate_url && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.expedia_affiliate_url })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Agoda Hotel ID" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "number",
          value: data.agoda_hotel_id,
          onChange: (e) => setData("agoda_hotel_id", e.target.value),
          className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light",
          placeholder: "e.g. 463019"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-neutral-500", children: "Find hotel IDs on agoda.com — the number in the URL after /hotel/" }),
      errors.agoda_hotel_id && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.agoda_hotel_id })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Affiliate Provider" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: data.affiliate_provider,
            onChange: (e) => setData("affiliate_provider", e.target.value),
            className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
          }
        ),
        errors.affiliate_provider && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.affiliate_provider })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-light text-neutral-700 mb-2 tracking-wide", children: "Affiliate Tracking Code" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: data.affiliate_tracking_code,
            onChange: (e) => setData("affiliate_tracking_code", e.target.value),
            className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
          }
        ),
        errors.affiliate_tracking_code && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600 font-light", children: errors.affiliate_tracking_code })
      ] })
    ] })
  ] });
}
export {
  CreateAffiliateTab as C,
  ContactLocationTab as a,
  CreateBasicInfoTab as b
};

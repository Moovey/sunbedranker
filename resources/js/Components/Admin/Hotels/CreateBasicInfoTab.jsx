import { useState, useEffect, useRef, useCallback } from 'react';

export default function CreateBasicInfoTab({ data, setData, errors, destinations }) {
    const [countries, setCountries] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(false);
    const [countriesLoaded, setCountriesLoaded] = useState(false);

    const [cityQuery, setCityQuery] = useState('');
    const [cityResults, setCityResults] = useState([]);
    const [loadingCities, setLoadingCities] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedCityLabel, setSelectedCityLabel] = useState('');
    
    const dropdownRef = useRef(null);
    const debounceRef = useRef(null);

    // Initialize label from existing destination (for edit mode)
    useEffect(() => {
        if (data.destination_id && destinations?.length) {
            const dest = destinations.find(d => d.id == data.destination_id);
            if (dest) {
                setSelectedCityLabel(`${dest.name}, ${dest.country || dest.country_code}`);
                // Pre-fill country_code if not already set
                if (!data.country_code && dest.country_code) {
                    setData('country_code', dest.country_code);
                }
            }
        }
    }, []);

    // Fetch countries list on first interaction
    const loadCountries = useCallback(() => {
        if (countriesLoaded || loadingCountries) return;
        setLoadingCountries(true);
        fetch(route('admin.api.destinations.countries'), {
            headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' },
            credentials: 'same-origin',
        })
            .then(res => res.json())
            .then(data => {
                setCountries(data || []);
                setCountriesLoaded(true);
            })
            .catch(() => setCountries([]))
            .finally(() => setLoadingCountries(false));
    }, [countriesLoaded, loadingCountries]);

    // Debounced city search
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!data.country_code || cityQuery.length < 2) {
            setCityResults([]);
            setShowDropdown(false);
            return;
        }

        debounceRef.current = setTimeout(() => {
            setLoadingCities(true);
            fetch(route('admin.api.destinations.cities') + `?country_code=${encodeURIComponent(data.country_code)}&query=${encodeURIComponent(cityQuery)}`, {
                headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' },
                credentials: 'same-origin',
            })
                .then(res => res.json())
                .then(results => {
                    setCityResults(results || []);
                    setShowDropdown(true);
                })
                .catch(() => setCityResults([]))
                .finally(() => setLoadingCities(false));
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [cityQuery, data.country_code]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCountryChange = (e) => {
        const code = e.target.value;
        setData('country_code', code);
        // Reset city selection when country changes
        setData('city_name', '');
        setData('destination_id', '');
        setCityQuery('');
        setSelectedCityLabel('');
        setCityResults([]);
    };

    const handleCitySelect = (city) => {
        setData('city_name', city.name);
        setSelectedCityLabel(city.state_name ? `${city.name}, ${city.state_name}` : city.name);
        setCityQuery('');
        setShowDropdown(false);
        // Clear destination_id — backend will resolve it
        setData('destination_id', '');
    };

    const handleCityInputChange = (e) => {
        const val = e.target.value;
        setCityQuery(val);
        setSelectedCityLabel('');
        // Clear previous selection
        setData('city_name', '');
        setData('destination_id', '');
    };

    // Also allow picking from existing destinations
    const handleExistingDestinationSelect = (e) => {
        const destId = e.target.value;
        if (destId) {
            const dest = destinations.find(d => d.id == destId);
            if (dest) {
                setData('destination_id', destId);
                setData('city_name', '');
                setData('country_code', dest.country_code || '');
                setSelectedCityLabel(`${dest.name}, ${dest.country || dest.country_code}`);
                setCityQuery('');
            }
        } else {
            setData('destination_id', '');
            setSelectedCityLabel('');
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 mb-6">Basic Information</h2>
            
            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    Hotel Name *
                </label>
                <input
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600 font-light">{errors.name}</p>}
            </div>

            {/* Destination: City Search */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                    <label className="block text-sm font-light text-neutral-700 tracking-wide">
                        Destination *
                    </label>
                    <span className="text-xs text-neutral-400">(search by country &amp; city, or pick existing)</span>
                </div>

                {/* Option A: Search for new city */}
                <div className="border border-neutral-200 rounded-lg p-4 space-y-3 bg-neutral-50/50">
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Search City</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Country selector */}
                        <div>
                            <label className="block text-xs text-neutral-500 mb-1">Country</label>
                            <select
                                value={data.country_code || ''}
                                onChange={handleCountryChange}
                                onFocus={loadCountries}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light text-sm"
                            >
                                <option value="">{loadingCountries ? 'Loading countries...' : 'Select country'}</option>
                                {countries.map(c => (
                                    <option key={c.iso2} value={c.iso2}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* City search input */}
                        <div className="relative" ref={dropdownRef}>
                            <label className="block text-xs text-neutral-500 mb-1">City</label>
                            <input
                                type="text"
                                value={selectedCityLabel || cityQuery}
                                onChange={handleCityInputChange}
                                onFocus={() => { if (cityResults.length) setShowDropdown(true); }}
                                placeholder={data.country_code ? 'Type city name (min 2 chars)...' : 'Select a country first'}
                                disabled={!data.country_code}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light text-sm disabled:bg-neutral-100 disabled:cursor-not-allowed"
                            />
                            {loadingCities && (
                                <div className="absolute right-3 top-8 text-neutral-400">
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                </div>
                            )}

                            {/* Dropdown results */}
                            {showDropdown && cityResults.length > 0 && (
                                <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                    {cityResults.map((city, idx) => (
                                        <button
                                            key={`${city.name}-${idx}`}
                                            type="button"
                                            className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between"
                                            onClick={() => handleCitySelect(city)}
                                        >
                                            <span className="font-light">
                                                {city.name}
                                                {city.state_name && <span className="text-neutral-400 ml-1">({city.state_name})</span>}
                                            </span>
                                            {city.latitude && (
                                                <span className="text-[10px] text-neutral-300">{Number(city.latitude).toFixed(2)}, {Number(city.longitude).toFixed(2)}</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {showDropdown && cityQuery.length >= 2 && !loadingCities && cityResults.length === 0 && (
                                <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg p-3 text-sm text-neutral-500">
                                    No cities found for "{cityQuery}"
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Show selected city */}
                    {data.city_name && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                            New destination will be created: <strong>{data.city_name}</strong> ({data.country_code})
                        </p>
                    )}
                </div>

                {/* Option B: Pick existing destination */}
                {destinations && destinations.length > 0 && (
                    <div className="border border-neutral-200 rounded-lg p-4 space-y-3 bg-neutral-50/50">
                        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Or Pick Existing Destination</p>
                        <select
                            value={data.destination_id || ''}
                            onChange={handleExistingDestinationSelect}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light text-sm"
                        >
                            <option value="">— Select from existing destinations —</option>
                            {destinations.map(dest => (
                                <option key={dest.id} value={dest.id}>
                                    {dest.name}{dest.country ? `, ${dest.country}` : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Validation errors */}
                {(errors.destination_id || errors.city_name || errors.country_code) && (
                    <div className="space-y-1">
                        {errors.destination_id && <p className="text-sm text-red-600 font-light">{errors.destination_id}</p>}
                        {errors.city_name && <p className="text-sm text-red-600 font-light">{errors.city_name}</p>}
                        {errors.country_code && <p className="text-sm text-red-600 font-light">{errors.country_code}</p>}
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    Description
                </label>
                <textarea
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    placeholder="Describe the hotel, its amenities, and unique features..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-600 font-light">{errors.description}</p>}
            </div>

            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    🏆 Sunbedranker's Top Tip
                </label>
                <textarea
                    value={data.top_tip}
                    onChange={e => setData('top_tip', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 font-light bg-orange-50"
                    placeholder="Add an insider tip for guests about this hotel's pool area, best sunbed spots, or hidden gems..."
                />
                {errors.top_tip && <p className="mt-1 text-sm text-red-600 font-light">{errors.top_tip}</p>}
            </div>

            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    🧠 SunbedRanker Review Intelligence
                </label>
                <textarea
                    value={data.review_intelligence}
                    onChange={e => setData('review_intelligence', e.target.value)}
                    rows={12}
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 font-light bg-purple-50 font-mono text-sm"
                    placeholder={`🧠 SunbedRanker Review Intelligence Score: 7.6 / 10\n📊 Category Breakdown\n📍 Location: 9.2 / 10\nPrime setting, walking distance to the beach...\n\n👨\u200d💼 Service & Staff: 8.8 / 10\nFriendly, attentive...`}
                />
                <p className="mt-1 text-xs text-neutral-500 font-light">Free-text editorial summary. Emojis and line breaks are preserved on the public page. Max 5000 characters.</p>
                {errors.review_intelligence && <p className="mt-1 text-sm text-red-600 font-light">{errors.review_intelligence}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Star Rating
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.5"
                        value={data.star_rating}
                        onChange={e => setData('star_rating', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    />
                    {errors.star_rating && <p className="mt-1 text-sm text-red-600 font-light">{errors.star_rating}</p>}
                </div>

                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Total Rooms
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={data.total_rooms}
                        onChange={e => setData('total_rooms', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    />
                    {errors.total_rooms && <p className="mt-1 text-sm text-red-600 font-light">{errors.total_rooms}</p>}
                </div>
            </div>
        </div>
    );
}

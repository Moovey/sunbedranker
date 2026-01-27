import { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Component to handle map clicks (only on deliberate clicks, not drag)
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
            // Only handle clicks, not drag-end events
            // If dragging occurred or click took too long (>200ms), skip
            const clickDuration = Date.now() - mouseDownTime;
            if (isDragging || clickDuration > 300) {
                setIsDragging(false);
                return;
            }

            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            setIsLoading(true);
            
            // Reverse geocode to get address using Nominatim (free)
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
                    { headers: { 'Accept-Language': 'en' } }
                );
                const data = await response.json();
                const address = data.display_name || '';
                onLocationSelect(lat, lng, address);
            } catch (error) {
                console.error('Geocoding error:', error);
                onLocationSelect(lat, lng, '');
            } finally {
                setIsLoading(false);
            }
        },
    });

    // Only render marker if position is valid
    if (!position || !isValidLatLng(position[0], position[1])) {
        return null;
    }
    return <Marker position={position} />;
}

// Component to recenter map when coordinates change externally
function MapController({ center }) {
    const map = useMap();
    
    useEffect(() => {
        if (center && isValidLatLng(center[0], center[1])) {
            map.setView(center, 15);
        }
    }, [center, map]);
    
    return null;
}

// Helper function to validate latitude and longitude values
function isValidLatLng(lat, lng) {
    const latNum = typeof lat === 'number' ? lat : parseFloat(lat);
    const lngNum = typeof lng === 'number' ? lng : parseFloat(lng);
    return !isNaN(latNum) && !isNaN(lngNum) && 
           latNum >= -90 && latNum <= 90 && 
           lngNum >= -180 && lngNum <= 180;
}

export default function ContactLocationTab({ data, setData, errors }) {
    const [markerPosition, setMarkerPosition] = useState(() => {
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
        return isValidLatLng(lat, lng) ? [lat, lng] : null;
    });
    const [isSearching, setIsSearching] = useState(false);

    // Default center (world view or existing coordinates)
    const defaultCenter = useMemo(() => {
        if (data.latitude && data.longitude) {
            return [parseFloat(data.latitude), parseFloat(data.longitude)];
        }
        return [20, 0]; // Default world center
    }, []);

    const defaultZoom = data.latitude && data.longitude ? 15 : 2;

    // Handle location selection from map click
    const handleLocationSelect = (lat, lng, address) => {
        setData('latitude', lat.toFixed(6));
        setData('longitude', lng.toFixed(6));
        if (address) {
            setData('address', address);
        }
    };

    // Search address and update map
    const handleSearchAddress = async () => {
        if (!data.address || data.address.trim().length < 3) return;
        
        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(data.address)}&limit=1`,
                { headers: { 'Accept-Language': 'en' } }
            );
            const results = await response.json();
            
            if (results && results.length > 0) {
                const { lat, lon, display_name } = results[0];
                const latNum = parseFloat(lat);
                const lonNum = parseFloat(lon);
                
                setMarkerPosition([latNum, lonNum]);
                setData('latitude', latNum.toFixed(6));
                setData('longitude', lonNum.toFixed(6));
                setData('address', display_name);
            }
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-light text-neutral-900 mb-6">Contact & Location</h2>
            
            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    Address
                </label>
                <div className="flex gap-2">
                    <textarea
                        value={data.address}
                        onChange={e => setData('address', e.target.value)}
                        rows={2}
                        className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                        placeholder="Full address of the hotel..."
                    />
                    <button
                        type="button"
                        onClick={handleSearchAddress}
                        disabled={isSearching || !data.address}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium whitespace-nowrap"
                    >
                        {isSearching ? 'Searching...' : 'Find on Map'}
                    </button>
                </div>
                {errors.address && <p className="mt-1 text-sm text-red-600 font-light">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Latitude
                    </label>
                    <input
                        type="text"
                        value={data.latitude}
                        onChange={e => {
                            const value = e.target.value;
                            setData('latitude', value);
                            const lat = parseFloat(value);
                            const lng = parseFloat(data.longitude);
                            if (isValidLatLng(lat, lng)) {
                                setMarkerPosition([lat, lng]);
                            }
                        }}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                        placeholder="e.g., 38.8851"
                    />
                    {errors.latitude && <p className="mt-1 text-sm text-red-600 font-light">{errors.latitude}</p>}
                </div>

                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Longitude
                    </label>
                    <input
                        type="text"
                        value={data.longitude}
                        onChange={e => {
                            const value = e.target.value;
                            setData('longitude', value);
                            const lat = parseFloat(data.latitude);
                            const lng = parseFloat(value);
                            if (isValidLatLng(lat, lng)) {
                                setMarkerPosition([lat, lng]);
                            }
                        }}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                        placeholder="e.g., 1.4082"
                    />
                    {errors.longitude && <p className="mt-1 text-sm text-red-600 font-light">{errors.longitude}</p>}
                </div>
            </div>

            {/* Interactive Map */}
            <div>
                <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                    Click on Map to Set Location
                </label>
                <div className="h-80 rounded-lg overflow-hidden border border-neutral-300 bg-neutral-100">
                    <MapContainer
                        center={defaultCenter}
                        zoom={defaultZoom}
                        style={{ height: '100%', width: '100%' }}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker 
                            position={markerPosition} 
                            setPosition={setMarkerPosition}
                            onLocationSelect={handleLocationSelect}
                        />
                        <MapController center={markerPosition} />
                    </MapContainer>
                </div>
                <p className="mt-2 text-xs text-neutral-500">
                    💡 <strong>Tip:</strong> Click anywhere on the map to set location, or type an address and click "Find on Map"
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Phone
                    </label>
                    <input
                        type="tel"
                        value={data.phone}
                        onChange={e => setData('phone', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600 font-light">{errors.phone}</p>}
                </div>

                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600 font-light">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-light text-neutral-700 mb-2 tracking-wide">
                        Website
                    </label>
                    <input
                        type="url"
                        value={data.website}
                        onChange={e => setData('website', e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-light"
                        placeholder="https://..."
                    />
                    {errors.website && <p className="mt-1 text-sm text-red-600 font-light">{errors.website}</p>}
                </div>
            </div>
        </div>
    );
}

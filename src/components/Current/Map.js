import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import "./Map.css"

const MapLocator = () => {
  const [position, setPosition] = useState([28.6139, 77.2090]); // Default to San Francisco

  useEffect(() => {
    // Use geocoding to get coordinates for a specific location (e.g., San Francisco City Hall)
    const geocoder = new L.Control.Geocoder.Nominatim();
    geocoder.geocode('San Francisco City Hall', (results) => {
      if (results.length > 0) {
        setPosition([results[0].center.lat, results[0].center.lng]);
      }
    });
  }, []);

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={12} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <strong>San Francisco City Hall</strong>
            <br />
            Welcome!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapLocator;

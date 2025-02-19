// src/MapComponent.tsx
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import india from "../../../assets/images/india.png"; // Assuming this is your marker image

interface Props {
  latitude: number;
  longitude: number;
  name: string;
}

const MapComponent: React.FC<Props> = ({ latitude, longitude, name }) => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([latitude, longitude], 4); // Set view to initial latitude and longitude with appropriate zoom level

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.icon({
      iconUrl: india, // Path to your marker image
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
      popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
    });

    // Add marker to the map
    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
    marker.bindPopup(`<b>${name}</b>`).openPopup(); // Open popup with corresponding name

    // Cleanup function to remove the map on component unmount
    return () => {
      map.remove();
    };
  }, [latitude, longitude, name]);

  return <div id="map" style={{ height: "90vh", width: "60%", position: "absolute" }}></div>;
};

export default MapComponent;

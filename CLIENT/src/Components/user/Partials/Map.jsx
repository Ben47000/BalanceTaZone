import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Icône personnalisée pour les marqueurs
const customIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  shadowSize: [41, 41],
});

// Composant réutilisable pour la carte interactive
function Map({ userLocation, events, setEvents }) {
  // Composant pour ajouter un marqueur lors du clic
  function AddMarkerOnClick() {
    useMapEvents({
      click(e) {
        const newEvent = {
          id: Date.now(),
          position: [e.latlng.lat, e.latlng.lng],
          description: "Nouvel événement signalé",
        };
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      },
    });
    return null;
  }

  return (
    <MapContainer
      center={userLocation || [48.8566, 2.3522]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marqueur utilisateur */}
      {userLocation && (
        <Marker position={userLocation} icon={customIcon}>
          <Popup>Vous êtes ici</Popup>
        </Marker>
      )}

      {/* Marqueurs des événements */}
      {events.map((event) => (
        <Marker key={event.id} position={event.position} icon={customIcon}>
          <Popup>{event.description}</Popup>
        </Marker>
      ))}

      {/* Activation de l'ajout de marqueurs */}
      <AddMarkerOnClick />
    </MapContainer>
  );
}

export default Map;

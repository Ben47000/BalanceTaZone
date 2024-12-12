import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Icônes personnalisées pour les marqueurs
const eventIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  shadowSize: [41, 41],
});

const reportIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png", // Icône différente pour les rapports
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  shadowSize: [41, 41],
});

function Map({ userLocation, events, setEvents, reports, setReports }) {
  const [markerType, setMarkerType] = useState("event"); // Etat pour le type de marqueur

  // Composant pour ajouter un marqueur lors du clic
  function AddMarkerOnClick() {
    useMapEvents({
      click(e) {
        const newMarker = {
          id: Date.now(),
          position: [e.latlng.lat, e.latlng.lng],
          description: markerType === "event" ? "Nouvel événement signalé" : "Nouveau rapport signalé",
          type: markerType, // Type de marqueur (event ou report)
        };

        if (markerType === "event") {
          setEvents((prevEvents) => [...prevEvents, newMarker]);
          // Envoyer l'événement au serveur via une API (POST /api/events/create)
        } else {
          setReports((prevReports) => [...prevReports, newMarker]);
          // Envoyer le rapport au serveur via une API (POST /api/reports/create)
        }
      },
    });
    return null;
  }

  return (
    <div>
      <button onClick={() => setMarkerType("event")}>Ajouter un événement</button>
      <button onClick={() => setMarkerType("report")}>Ajouter un rapport</button>

      <MapContainer
        center={userLocation || [48.8566, 2.3522]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }} // correction de la propriété de style
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marqueurs utilisateur */}
        {userLocation && (
          <Marker position={userLocation} icon={eventIcon}>
            <Popup>Vous êtes ici</Popup>
          </Marker>
        )}

        {/* Marqueurs des événements */}
        {Array.isArray(events) && events.map((event) => (
          <Marker key={event.id} position={event.position} icon={eventIcon}>
            <Popup>{event.description}</Popup>
          </Marker>
        ))}

        {/* Marqueurs des rapports */}
        {Array.isArray(reports) && reports.map((report) => (
          <Marker key={report.id} position={report.position} icon={reportIcon}>
            <Popup>{report.description}</Popup>
          </Marker>
        ))}

        {/* Activation de l'ajout de marqueurs */}
        <AddMarkerOnClick />
      </MapContainer>
    </div>
  );
}

export default Map;

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Configuration des icônes
const eventIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  shadowSize: [41, 41],
});

const reportIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  shadowSize: [41, 41],
});

// Composant pour ajouter un marqueur au clic sur la carte
function AddMarkerOnClick({ setNewMarker }) {
  const [marker, setMarker] = useState(null);

  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setMarker([lat, lng]);
      setNewMarker({ position: [lat, lng] });
    },
  });

  return marker ? <Marker position={marker} /> : null;
}

function Map({ events = [], setEvents, reports = [], setReports, isLogged }) {
  const [userLocation, setUserLocation] = useState([48.8566, 2.3522]); // Paris par défaut
  const [isLocationFetched, setIsLocationFetched] = useState(false);
  const [markerType, setMarkerType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newMarker, setNewMarker] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Demander la localisation utilisateur via un bouton
  const requestUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setIsLocationFetched(true);
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error.message);
          setIsLocationFetched(true);
        }
      );
    } else {
      console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
      setIsLocationFetched(true);
    }
  };

  // Gestion du formulaire d'ajout
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!newMarker) {
      setErrorMessage("Vous devez d'abord cliquer sur la carte pour ajouter un marqueur.");
      return;
    }

    const formData = new FormData(event.target);

    if (markerType === "event") {
      const newEvent = {
        name: formData.get("name"),
        description: formData.get("description"),
        eventDate: formData.get("eventDate"),
        location: formData.get("location"),
        position: newMarker.position,
        type: "event",
        user_id: 1,
      };
      setEvents([...events, newEvent]);
    } else if (markerType === "report") {
      const newReport = {
        description: formData.get("description"),
        publishDate: formData.get("publishDate"),
        area_id: formData.get("area_id"),
        category_id: formData.get("category_id"),
        user_id: 1,
        authority_id: formData.get("authority_id"),
        statut: formData.get("statut"),
        position: newMarker.position,
        type: "report",
      };
      setReports([...reports, newReport]);
    }

    setNewMarker(null);
    setShowForm(false);
    setMarkerType(null);
    setErrorMessage("");
  };

  const getIconForType = (type) => {
    if (type === "event") return eventIcon;
    if (type === "report") return reportIcon;
    return null;
  };

  return (
    <div>
      {/* Bouton pour demander la géolocalisation */}
      {!isLocationFetched && (
        <button onClick={requestUserLocation}>Activer la géolocalisation</button>
      )}

      {isLogged && (
        <div className="add-button-container">
          <button onClick={() => { setMarkerType("event"); setShowForm(true); }}>
            Ajouter un événement
          </button>
          <button onClick={() => { setMarkerType("report"); setShowForm(true); }}>
            Ajouter un rapport
          </button>
        </div>
      )}

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <MapContainer center={userLocation} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AddMarkerOnClick setNewMarker={setNewMarker} />

        {/* Affichage des événements */}
        {Array.isArray(events) &&
          events.map((event, index) => (
            event.position && (
              <Marker key={index} position={event.position} icon={getIconForType(event.type)}>
                <Popup>
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                  <p>Date: {event.eventDate || "Non spécifiée"}</p>
                  <button onClick={() => alert(`Participation à l'événement ${event.name}`)}>
                    Participer
                  </button>
                </Popup>
              </Marker>
            )
          ))}

        {/* Affichage des rapports */}
        {Array.isArray(reports) &&
          reports.map((report, index) => (
            report.position && (
              <Marker key={index} position={report.position} icon={getIconForType(report.type)}>
                <Popup>
                  <h3>Rapport</h3>
                  <p>{report.description}</p>
                </Popup>
              </Marker>
            )
          ))}
      </MapContainer>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleFormSubmit}>
            <h3>Ajouter {markerType}</h3>
            {markerType === "event" && (
              <>
                <label>
                  Nom: <input type="text" name="name" required />
                </label>
                <label>
                  Date: <input type="datetime-local" name="eventDate" required />
                </label>
                <label>
                  Localisation: <input type="text" name="location" required />
                </label>
              </>
            )}
            {markerType === "report" && (
              <>
                <label>
                  Description: <textarea name="description" required />
                </label>
                <label>
                  Date de publication: <input type="datetime-local" name="publishDate" required />
                </label>
                <label>
                  Zone: <input type="number" name="area_id" />
                </label>
                <label>
                  Catégorie: <input type="number" name="category_id" />
                </label>
                <label>
                  Autorité: <input type="number" name="authority_id" />
                </label>
                <label>
                  Statut:
                  <select name="statut" required>
                    <option value="Etude en cours">Etude en cours</option>
                    <option value="Intervention en cours">Intervention en cours</option>
                    <option value="Clôturé">Clôturé</option>
                  </select>
                </label>
              </>
            )}
            <button type="submit">Créer</button>
            <button type="button" onClick={() => setShowForm(false)}>Annuler</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Map;

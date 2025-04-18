import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents, addEvent } from "../../store/Slices/events.js";
import { fetchReports, addReport } from "../../store/Slices/reports.js";
import useCloseMenu from "../../Hook/useCloseMenu.jsx";
import WelcomeMessage from "./Partials/WelcomeMessage.jsx";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ✅ Icônes personnalisés
const eventIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const reportIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// ✅ Composant pour capturer les clics et ajouter un marqueur
function AddMarkerOnClick({ setNewMarker }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setNewMarker({ position: [lat, lng] });
    },
  });
  return null;
}

function Home() {
  useCloseMenu();
  const dispatch = useDispatch();

  // ✅ Récupération des données
  const user = useSelector((state) => state.user);
  const events = useSelector((state) => state.events?.userEvents) || [];
  const reports = useSelector((state) => state.reports?.reports) || [];

  // ✅ États de la carte et formulaire
  const [userLocation, setUserLocation] = useState([48.8566, 2.3522]); // Paris par défaut
  const [markerType, setMarkerType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newMarker, setNewMarker] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Activer la géolocalisation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          console.warn("⚠️ Géolocalisation refusée, position par défaut appliquée.");
        }
      );
    }
  }, []);

  // ✅ Charger les événements et rapports
  useEffect(() => {
    if (user?.isLogged && user.id) {
      dispatch(fetchUserEvents(user.id));
      dispatch(fetchReports());
    }
  }, [dispatch, user?.isLogged, user?.id]);

  // ✅ Gestion du formulaire d'ajout
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!newMarker) {
      setErrorMessage("❌ Vous devez cliquer sur la carte pour ajouter un marqueur.");
      return;
    }

    const formData = new FormData(event.target);
    let dataToSend = null;

    if (markerType === "event") {
      dataToSend = {
        name: formData.get("name"),
        description: formData.get("description"),
        date: formData.get("eventDate"),
        location: newMarker.position.join(","), // ✅ Stocké en "lat,lng"
        user_id: user.id,
      };
      try {
        await dispatch(addEvent(dataToSend)).unwrap();
        setSuccessMessage("✅ Événement ajouté avec succès !");
        dispatch(fetchUserEvents(user.id)); // 🔄 Recharge les événements
      } catch (error) {
        setErrorMessage("❌ Erreur lors de l'ajout de l'événement.");
      }
    } else if (markerType === "report") {
      dataToSend = {
        description: formData.get("description"),
        area_id: formData.get("area_id"),
        category_id: formData.get("category_id"),
        user_id: user.id,
        autority_id: formData.get("autority_id"),
        statut: formData.get("statut"),
        position: newMarker.position.join(","), // ✅ Stocké en "lat,lng"
      };
      try {
        await dispatch(addReport(dataToSend)).unwrap();
        setSuccessMessage("✅ Rapport ajouté avec succès !");
        dispatch(fetchReports()); // 🔄 Recharge les rapports
      } catch (error) {
        setErrorMessage("❌ Erreur lors de l'ajout du rapport.");
      }
    }

    setNewMarker(null);
    setShowForm(false);
    setMarkerType(null);
    setErrorMessage("");
  };

  return (
    <main>
      <WelcomeMessage />

      {/* ✅ Messages utilisateur */}
      {errorMessage && <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: "green", textAlign: "center" }}>{successMessage}</div>}

      {/* ✅ Si l'utilisateur n'est pas connecté */}
      {!user?.isLogged && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <h2>Bienvenue sur notre site</h2>
          <p>Veuillez vous connecter pour ajouter des événements et des rapports.</p>
        </div>
      )}

      {/* ✅ Boutons d'ajout */}
      {user?.isLogged && (
        <div className="add-button-container">
          <button onClick={() => { setMarkerType("event"); setShowForm(true); }}>Ajouter un événement</button>
          <button onClick={() => { setMarkerType("report"); setShowForm(true); }}>Ajouter un rapport</button>
        </div>
      )}

      <MapContainer center={userLocation} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AddMarkerOnClick setNewMarker={setNewMarker} />

        {/* ✅ Affichage des événements */}
        {events.map((event, index) => (
          event.location && (
            <Marker key={index} position={event.location.split(",").map(Number)} icon={eventIcon}>
              <Popup>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <button onClick={() => alert(`Participation à ${event.name}`)}>Participer</button>
              </Popup>
            </Marker>
          )
        ))}

        {/* ✅ Affichage des rapports */}
        {reports.map((report, index) => (
          report.position && (
            <Marker key={index} position={report.position.split(",").map(Number)} icon={reportIcon}>
              <Popup>
                <h3>Rapport</h3>
                <p>{report.description}</p>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>

      {/* ✅ Affichage du formulaire d'ajout */}
      {showForm && (
        <div className="form-container">
          <form onSubmit={handleFormSubmit}>
            <h3>Ajouter {markerType === "event" ? "un événement" : "un rapport"}</h3>

            {markerType === "event" && (
              <>
                <label>Nom: <input type="text" name="name" required /></label>
                <label>Date: <input type="datetime-local" name="eventDate" required /></label>
                <label>Description: <textarea name="description" required /></label>
              </>
            )}

            {markerType === "report" && (
              <>
                <label>Description: <textarea name="description" required /></label>
                <label>Zone: <input type="number" name="area_id" required /></label>
                <label>Catégorie: <input type="number" name="category_id" required /></label>
              </>
            )}

            <button type="submit">Créer</button>
            <button type="button" onClick={() => setShowForm(false)}>Annuler</button>
          </form>
        </div>
      )}
    </main>
  );
}

export default Home;

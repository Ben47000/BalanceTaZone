import { useEffect, useState } from "react";
import useCloseMenu from "../Hook/useCloseMenu.jsx";
import Map from "./Partials/Map.jsx";
import WelcomeMessage from "./Partials/WelcomeMessage.jsx";

function Home() {
  useCloseMenu();
  const [events, setEvents] = useState([]); // État pour les événements
  const [reports, setReports] = useState([]); // État pour les reportings
  const [userLocation, setUserLocation] = useState(null);
  const [isLogged, setIsLogged] = useState(true); // Simulez l'état connecté

  // Récupération de la position de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Géolocalisation impossible:", error);
          setUserLocation([48.8566, 2.3522]); // Paris par défaut
        }
      );
    } else {
      console.log("La géolocalisation n'est pas supportée par ce navigateur.");
      setUserLocation([48.8566, 2.3522]); // Paris par défaut
    }
  }, []);

  // Récupération des événements
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/v1/event/list");
        const data = await response.json();
        console.log("Événements récupérés :", data);
        setEvents(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
      }
    };

    const fetchReports = async () => {
      try {
        const response = await fetch("/api/v1/reporting/list");
        const data = await response.json();
        console.log("Reportings récupérés :", data);
        setReports(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des reportings:", error);
      }
    };

    fetchEvents();
    fetchReports();
  }, []);

  return (
    <main>
      <section className="map">
        <WelcomeMessage />
        {userLocation ? (
          <Map
            events={events}
            setEvents={setEvents}
            reports={reports}
            setReports={setReports}
            isLogged={isLogged}
          />
        ) : (
          <p>Chargement de la carte...</p>
        )}
        {events.length === 0 && <p>Aucun événement à afficher.</p>}
        {reports.length === 0 && <p>Aucun reporting à afficher.</p>}
      </section>
    </main>
  );
}

export default Home;

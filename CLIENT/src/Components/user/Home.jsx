import { useEffect, useState } from "react";
import useCloseMenu from "../Hook/useCloseMenu.jsx";
import Map from "./Partials/Map.jsx"

function Home() {
  useCloseMenu();
  const [events, setEvents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // Récupération de la position utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Géolocalisation impossible:", error);
        }
      );
    }
  }, []);

  return (
    <main>
      <section className="map">
        <h2>Carte Interactive</h2>
        <Map userLocation={userLocation} events={events} setEvents={setEvents} />
      </section>
    </main>
  );
}

export default Home;


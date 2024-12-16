import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour rediriger en cas de déconnexion
import useCloseMenu from "../../Hook/useCloseMenu.jsx";
import Map from "./Partials/Map.jsx";
import WelcomeMessage from "./Partials/WelcomeMessage.jsx";

function Home() {
  useCloseMenu(); // Hook personnalisé pour gérer la fermeture des menus

  const [events, setEvents] = useState([]); // État pour stocker les événements
  const [reports, setReports] = useState([]); // État pour stocker les reportings
  const [userLocation, setUserLocation] = useState(null); // Position de l'utilisateur
  const [user, setUser] = useState(null); // Stockage des données utilisateur
  const [isLogged, setIsLogged] = useState(false); // État pour vérifier la connexion
  const [loading, setLoading] = useState(true); // Pour gérer le chargement initial
  const navigate = useNavigate(); // Navigateur pour redirection

  // **Vérification de l'authentification de l'utilisateur**
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/v1/user/check-auth", {
          credentials: "include", // Inclure les cookies pour vérifier la session
        });
        if (response.ok) {
          const { isLogged, user } = await response.json();
          setIsLogged(isLogged); // Met à jour l'état de connexion
          setUser(user); // Stocke les informations utilisateur
        } else {
          console.log("Utilisateur non connecté");
          setIsLogged(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
        setIsLogged(false);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    checkAuth();
  }, []); // Exécuté au chargement

  // **Récupération de la position de l'utilisateur**
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]); // Met à jour la position de l'utilisateur
        },
        (error) => {
          console.error("Géolocalisation impossible :", error);
          setUserLocation([48.8566, 2.3522]); // Position par défaut (Paris)
        }
      );
    } else {
      console.log("La géolocalisation n'est pas supportée par ce navigateur.");
      setUserLocation([48.8566, 2.3522]); // Position par défaut
    }
  }, []); // Exécution au montage du composant

  // **Récupération des événements et reportings**
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsResponse, reportsResponse] = await Promise.all([
          fetch("/api/v1/event/list"),
          fetch("/api/v1/reporting/list"),
        ]);

        if (eventsResponse.ok && reportsResponse.ok) {
          const eventsData = await eventsResponse.json();
          const reportsData = await reportsResponse.json();
          setEvents(eventsData);
          setReports(reportsData);
        } else {
          console.error("Erreur lors de la récupération des données");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des événements et reportings :", error);
      }
    };

    if (isLogged) {
      fetchData(); // Charger les données seulement si l'utilisateur est connecté
    }
  }, [isLogged]); // Dépend de l'état de connexion

  // **Déconnexion de l'utilisateur**
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/v1/user/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsLogged(false);
        setUser(null); // Réinitialiser les données utilisateur
        navigate("/login"); // Redirection vers la page de connexion
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la tentative de déconnexion :", error);
    }
  };

  if (loading) {
    return <p>Chargement...</p>; // Affichage pendant le chargement
  }

  return (
    <main>
      <section className="map">
        {/* Affichage conditionnel pour l'utilisateur non connecté */}
        {!isLogged ? (
          <p>
            Vous n'êtes pas connecté.{" "}
            <a href="/login">Connectez-vous</a> pour accéder à la carte et aux fonctionnalités.
          </p>
        ) : (
          <>
            <WelcomeMessage user={user} onLogout={handleLogout} /> {/* Message de bienvenue avec bouton de déconnexion */}
            
            {/* Affichage conditionnel de la carte */}
            {userLocation ? (
              <Map
                events={events}
                setEvents={setEvents}
                reports={reports}
                setReports={setReports}
                isLogged={isLogged} // Indique si l'utilisateur est connecté
              />
            ) : (
              <p>Chargement de la carte...</p>
            )}

            {/* Affichage des messages si aucun événement ou reporting */}
            {events.length === 0 && <p>Aucun événement à afficher.</p>}
            {reports.length === 0 && <p>Aucun reporting à afficher.</p>}
          </>
        )}
      </section>
    </main>
  );
}

export default Home;

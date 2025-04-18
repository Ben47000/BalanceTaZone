import { useDispatch, useSelector } from "react-redux";
import { fetchUserEvents, deleteEvent } from "../../store/Slices/events";
import { useEffect } from "react";


function Profil() {
  const dispatch = useDispatch();
  const { id, firstname, lastname, email } = useSelector((state) => state.user);
  const userEvents = useSelector((state) => state.events.userEvents);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserEvents(id));
    }
  }, [id, dispatch]);

  // 🔹 Vérification & correction des données reçues
  let flatUserEvents = [];

  if (Array.isArray(userEvents)) {
    flatUserEvents = userEvents.flat(); // Aplatit les tableaux imbriqués s'il y en a
    flatUserEvents = flatUserEvents.filter(event => event && event.id); // Supprime les entrées incorrectes
  }

  return (
    <div className="profil-container">
      <h1 className="profil-title">Bienvenue {firstname} {lastname}</h1>
      <p className="profil-email">📧 Email : {email}</p>

      <h2 className="profil-subtitle">Vos événements</h2>

      {loading && <p className="profil-loading">Chargement des événements...</p>}
      {error && <p className="profil-error">Erreur : {error}</p>}

      {!loading && flatUserEvents.length === 0 ? (
        <p className="profil-no-event">Aucun événement créé.</p>
      ) : (
        <table className="profil-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Date</th>
              <th>Lieu</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flatUserEvents.map((event, index) => {
              const formattedDate = event.date
                ? new Date(event.date).toLocaleString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "📅 Date inconnue";

              return (
                <tr key={`event-${event.id || index}`}>
                  <td>{event.name || "Événement sans nom"}</td>
                  <td>{formattedDate}</td>
                  <td>{event.location || "📍 Lieu inconnu"}</td>
                  <td>{event.description || "ℹ️ Aucune description"}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => dispatch(deleteEvent(event.id))}
                    >
                      🗑️ Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Profil;

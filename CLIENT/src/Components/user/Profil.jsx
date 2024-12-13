import React from "react";
import { useNavigate } from "react-router-dom";

function Profil({ isLogged, user }) {
  const navigate = useNavigate();

  // Redirection si l'utilisateur n'est pas connecté
  React.useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  if (!isLogged) {
    return <div>Redirection en cours...</div>;
  }

  return (
    <div>
      <h1>Bienvenue sur votre profil</h1>
      {user ? (
        <div>
          <p>
            <strong>Nom :</strong> {user.name}
          </p>
          <p>
            <strong>Email :</strong> {user.email}
          </p>
          <p>
            <strong>Inscrit depuis :</strong> {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <button
            onClick={() => {
              // Simuler une déconnexion
              alert("Déconnexion réussie !");
              navigate("/login");
            }}
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <p>Chargement des informations de l'utilisateur...</p>
      )}
    </div>
  );
}

export default Profil;

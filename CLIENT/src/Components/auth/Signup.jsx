import { useState } from "react"; // Gestion des états locaux
import { useNavigate } from "react-router-dom"; // Navigation après l'inscription
import { useDispatch } from "react-redux"; // Gestion des états globaux
import { setMsg } from "../../store/Slices/user"; // Action Redux pour afficher un message
import useCloseMenu from "../Hook/useCloseMenu"; // Hook pour fermer le menu (si nécessaire)

const Signup = () => {
  useCloseMenu(); // Ferme le menu latéral si ouvert
  const navigate = useNavigate(); // Permet de rediriger l'utilisateur
  const dispatch = useDispatch(); // Dispatch Redux pour gérer les états

  // États locaux pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null); // Message d'erreur

  // Gère les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(null); // Réinitialise les erreurs

    try {
      // Envoie des données au backend via l'API
      const response = await fetch("/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Convertit les données en JSON
      });

      // Vérifie si la réponse est au format JSON avant de l'utiliser
      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }

      if (response.ok) {
        const data = await response.json();
        dispatch(setMsg(data.msg)); // Affiche un message de succès
        navigate("/login"); // Redirige vers la page de connexion
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Erreur lors de l'inscription."); // Gère les erreurs spécifiques
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setError("Erreur réseau ou problème serveur."); // Message d'erreur générique
    }
  };

  return (
    <div className="signup-container">
      <h1>Créer un compte</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Affichage des erreurs */}
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;

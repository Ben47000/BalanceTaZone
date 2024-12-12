import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, loginFailed, setMsg } from "../../store/Slices/user"; // Actions Redux pour gérer l'état utilisateur

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Stocker les erreurs locales
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Inclure les cookies de session
      });

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(loginFailed({ error: errorData.msg })); // Dispatch de l'erreur Redux
        setError(errorData.msg); // Stockage de l'erreur locale
      } else {
        const data = await response.json();
        dispatch(
          login({
            user: data.user,
            isLogged: data.isLogged,
          })
        );
        navigate("/"); // Redirige vers une page protégée (ex: tableau de bord)
      }
    } catch (error) {
      console.error("Erreur de connexion :", error.message);
      dispatch(setMsg("Une erreur inattendue est survenue."));
      setError("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  };

  return (
    <main>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Adresse email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Se connecter</button>
      </form>
    </main>
  );
};

export default Login;

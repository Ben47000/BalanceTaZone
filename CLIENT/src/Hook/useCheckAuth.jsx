import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/Slices/user";
import { useNavigate } from "react-router-dom";

function useCheckAuth() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthentication() {
      try {
        const response = await fetch("http://localhost:9000/api/v1/user/check-auth", {
          credentials: "include",
        });

        if (response.status === 401) {
          console.warn("🔴 Utilisateur non connecté");
          dispatch(logout()); // Déconnecter proprement l'utilisateur
          setIsLoading(false);
          return;
        }

        if (!response.ok) {
          console.error(`🛑 Erreur serveur: ${response.status} - ${response.statusText}`);
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        dispatch(login(data));
        console.log("✅ Utilisateur authentifié :", data);
      } catch (error) {
        console.error("⚠️ Erreur de connexion :", error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAuthentication();
  }, [dispatch]);

  return [user, isLoading];
}

export default useCheckAuth;

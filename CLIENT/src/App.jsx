import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import useCheckAuth from "./Hook/useCheckAuth";
import UserRouter from "./Router/UserRouter";
import AdminRouter from "./Router/AdminRouter";

function App() {
  const [user, isLoading] = useCheckAuth();
  const navigate = useNavigate();
  const location = useLocation(); // On récupère l'URL actuelle
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !user.isLogged) {
      // Liste des routes protégées
      const protectedRoutes = ["/profil", "/dashboard"];
      
      // Si l'utilisateur tente d'accéder à une route protégée, on le redirige
      if (protectedRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    }
  }, [isLoading, user.isLogged, navigate, location]);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
      <Routes>
        <Route path="/*" element={user.isLogged ? (user.role === 1 ? <AdminRouter /> : <UserRouter />) : <UserRouter />} />
      </Routes>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../../store/Slices/user";
import { toggleMenu, closeMenu } from "../../../store/Slices/menu";

function Nav() {
  const user = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  // 📏 Gestion de la taille d'écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setIsMobile(false);
        dispatch(closeMenu()); // Fermer le menu burger
      } else {
        setIsMobile(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  // 🚪 Déconnexion de l'utilisateur
  const onClickLogout = async () => {
    const response = await fetch("/api/v1/user/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.status === 200) {
      dispatch(logout());
      navigate("/");
      dispatch(closeMenu()); // 🔴 Fermer le menu après déconnexion
    } else {
      console.error("Erreur lors de la déconnexion :", response.status);
    }
  };

  return (
    <>
      {/* 🔹 Bouton burger en mobile */}
      {isMobile && (
        <button
          className={`burger-button ${menu.isOpen ? "active" : ""}`}
          onClick={() => dispatch(toggleMenu())}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      {/* 🔹 Navigation */}
      <nav className={`nav ${isMobile ? (menu.isOpen ? "burger" : "hidden") : "screen"}`}>
        <NavLink to={"/"} className="nav-link" onClick={() => dispatch(closeMenu())}>
          <FontAwesomeIcon icon={faHome} /> Accueil
        </NavLink>
        <NavLink to={"/contact"} className="nav-link" onClick={() => dispatch(closeMenu())}>
          <FontAwesomeIcon icon={faEnvelope} /> Contact
        </NavLink>

        {user.isLogged ? (
          <>
            <NavLink to={"/profil"} className="nav-link" onClick={() => dispatch(closeMenu())}>
              <FontAwesomeIcon icon={faUser} /> Profil
            </NavLink>
            <button onClick={onClickLogout} className="nav-link logout-btn">
              <FontAwesomeIcon icon={faRightFromBracket} /> Déconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink to={"/login"} className="nav-link" onClick={() => dispatch(closeMenu())}>
              <FontAwesomeIcon icon={faRightToBracket} /> Se connecter
            </NavLink>
            <NavLink to={"/signup"} className="nav-link" onClick={() => dispatch(closeMenu())}>
              <FontAwesomeIcon icon={faUser} /> S'inscrire
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
}

export default Nav;

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
import { toggleMenu } from "../../../store/Slices/menu"; // Importation de l'action toggleMenu

function Nav() {
  const user = useSelector((state) => state.user); // Utilisateur connecté
  const menu = useSelector((state) => state.menu); // État du menu burger
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [type, setType] = useState(
    window.innerWidth > 600 ? "tabletAndMore" : "mobile"
  );

  // Écoute des changements de taille d'écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setType("tabletAndMore");
        dispatch(toggleMenu(false)); // Fermer le menu si on revient sur grand écran
      } else {
        setType("mobile");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  // Gestion de la déconnexion
  const onClickLogout = async () => {
    const response = await fetch("/api/v1/user/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.status === 200) {
      dispatch(logout());
      navigate("/");
    } else {
      console.error("Erreur lors de la déconnexion :", response.status);
    }
  };

  // Gestion de l'ouverture/fermeture du menu burger
  const toggleBurgerMenu = () => {
    dispatch(toggleMenu()); // Toggle de l'état du menu burger
  };

  return (
    <>
      {type === "mobile" && (
        <button
          className={`burger-button ${menu.isOpen ? "active" : ""}`}
          onClick={toggleBurgerMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      <nav
        className={`nav ${type === "mobile" && menu.isOpen ? "burger" : "screen"}`}
      >
        <NavLink to={"/"} className="nav-link">
          <FontAwesomeIcon icon={faHome} /> Accueil
        </NavLink>
        <NavLink to={"/contact"} className="nav-link">
          <FontAwesomeIcon icon={faEnvelope} /> Contact
        </NavLink>

        {user.isLogged ? (
          <>
            <NavLink to={"/profil"} className="nav-link">
              <FontAwesomeIcon icon={faUser} /> Profil
            </NavLink>
            <button onClick={onClickLogout} className="nav-link logout-btn">
              <FontAwesomeIcon icon={faRightFromBracket} /> Déconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink to={"/login"} className="nav-link">
              <FontAwesomeIcon icon={faRightToBracket} /> Se connecter
            </NavLink>
            <NavLink to={"/signup"} className="nav-link">
              <FontAwesomeIcon icon={faUser} /> S'inscrire
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
}

export default Nav;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRightFromBracket,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../../store/Slices/user.js";

function Nav() {
  const user = useSelector((state) => state.user); // Utilisateur connecté
  const menu = useSelector((state) => state.menu); // Menu burger
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [type, setType] = useState(
    window.innerWidth > 600 ? "tabletAndMore" : "mobile"
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setType("tabletAndMore");
        return;
      }
      setType("mobile");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Gestion de la déconnexion
    function onClickLogout() {
      async function fetchLogout() {
          const response = await fetch("/api/v1/user/logout", {
              method: "POST",
              credentials: "include",
          });
  
          if (response.status === 200) {
              const data = await response.json();
  
              dispatch(logout()); // Appel correct à l'action logout
              navigate("/"); // Redirection vers la page d'accueil
          } else {
              console.error("Erreur lors de la déconnexion :", response.status);
          }
      }
      fetchLogout();
  }


  return (
    <>
      {type === "mobile" && (
        <button onClick={() => dispatch(toggleMenu())}></button>
      )}

      <nav
        className={`nav ${
          type === "mobile" && menu.isOpen ? "burger" : "screen"
        }`}
      >
        <NavLink to={"/"}>
          <FontAwesomeIcon icon={faHome} /> Accueil
        </NavLink>

        {user.isLogged ? (
          <>
            <NavLink to={"/dashboard"}>
              <FontAwesomeIcon icon={faUser} /> Profil
            </NavLink>
            <button onClick={onClickLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} /> Déconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <FontAwesomeIcon icon={faRightToBracket} /> Se connecter
            </NavLink>
            <NavLink to={"/signup"}>
              <FontAwesomeIcon icon={faUser} /> S'inscrire
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
}

export default Nav;

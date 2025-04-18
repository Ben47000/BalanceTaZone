import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../store/Slices/user";
import { toggleMenu } from "../../../store/Slices/menu";

function HeaderAdmin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Récupérer les informations de l'utilisateur depuis le store Redux
    const { isLogged, role } = useSelector((state) => state.user);

    function onClickLogout() {
        async function fetchLogout() {
            const response = await fetch("/api/v1/user/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.status === 200) {
                const data = await response.json();
                dispatch(logout()); // Déconnecte dans Redux
                dispatch(toggleMenu());
                navigate("/");
            }
        }
        fetchLogout();
    }

    return (
        <header className="admin">
            <h1>Dashboard</h1>
            {isLogged ? (
                <>
                    <nav>
                        {/* Afficher les liens spécifiques aux administrateurs */}
                        {role === 1 && (
                            <>
                                <Link to="/user">Utilisateurs</Link>
                                <Link to="/event">Événements</Link>
                                <Link to="/report">Reportings</Link>
                                <Link to="/comment">Commentaires</Link>
                            </>
                        )}
                    </nav>

                    <button
                        onClick={onClickLogout}
                        aria-label="Bouton de déconnexion"
                    >
                        <FontAwesomeIcon icon={faPowerOff} />
                    </button>
                </>
            ) : (
                <p>Non connecté</p>
            )}
        </header>
    );
}

export default HeaderAdmin;

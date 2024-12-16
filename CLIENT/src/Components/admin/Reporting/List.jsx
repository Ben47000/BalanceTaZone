import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import AddModal from "./AddModal"; // Assurez-vous que vous avez ce modal pour ajouter un rapport
import UpdateModal from "./UpdateModal"; // Assurez-vous que vous avez ce modal pour mettre à jour un rapport

function Reporting() {
    const [reports, setReports] = useState(null); // State pour stocker les rapports
    const [selectedReport, setSelectedReport] = useState(null); // State pour le rapport sélectionné
    const [toggleAddModal, setToggleAddModal] = useState(false); // State pour afficher/masquer le modal d'ajout
    const [toggleUpdateModal, setToggleUpdateModal] = useState(false); // State pour afficher/masquer le modal de mise à jour

    // Fonction pour récupérer tous les rapports
    async function fetchReports() {
        try {
            const response = await fetch("/api/v1/reporting/list", {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setReports(data); // Mise à jour du state avec les rapports récupérés
            } else {
                console.error("Erreur lors de la récupération des rapports");
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    }

    // Utilisation de useEffect pour charger les rapports lors du chargement du composant
    useEffect(() => {
        fetchReports();
    }, []); // Le tableau vide [] assure que l'appel à l'API ne se fait qu'une seule fois au chargement du composant

    // Fonction pour supprimer un rapport
    async function handleDeleteReport(id) {
        try {
            const response = await fetch(`/api/v1/reporting/delete/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (response.ok) {
                fetchReports(); // Rafraîchir la liste des rapports après suppression
            } else {
                console.error("Erreur lors de la suppression du rapport");
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    }

    if (!reports) return <Loading />; // Affiche un loader tant que les rapports ne sont pas chargés

    return (
        <section>
            <h2>Liste des rapports</h2>
            <button
                className="btn-add"
                onClick={() => setToggleAddModal(!toggleAddModal)}
            >
                <FontAwesomeIcon icon={faPlus} /> Ajouter un rapport
            </button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.description}</td>
                            <td>{report.statut}</td>
                            <td className="cta">
                                <button
                                    className="btn-edit"
                                    onClick={() => {
                                        setSelectedReport(report); // Mettre à jour le rapport sélectionné
                                        setToggleUpdateModal(!toggleUpdateModal); // Afficher le modal de mise à jour
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEdit} /> Modifier
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDeleteReport(report.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} /> Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal d'ajout */}
            {toggleAddModal && (
                <AddModal
                    setToggleAddModal={setToggleAddModal}
                    fetchReports={fetchReports}
                />
            )}

            {/* Modal de mise à jour */}
            {toggleUpdateModal && selectedReport && (
                <UpdateModal
                    report={selectedReport}
                    setToggleUpdateModal={setToggleUpdateModal}
                    fetchReports={fetchReports}
                />
            )}
        </section>
    );
}

export default Reporting;

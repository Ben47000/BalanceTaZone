import { useState } from "react";

function AddModal({ setToggleAddModal, fetchReports }) {
    const [formData, setFormData] = useState({
        description: "",
        area_id: "",
        category_id: "",
        user_id: "",
        autority_id: "",
        statut: "Etude en cours", // Valeur par défaut
    });

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("/api/v1/reporting/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                fetchReports(); // Rafraîchir la liste des rapports
                setToggleAddModal(false); // Fermer le modal
            } else {
                console.error("Erreur lors de la création du rapport");
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    }

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <label>Description:</label>
                <input
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                />
                {/* Ajoutez des champs pour area_id, category_id, etc. */}
                <button type="submit">Ajouter</button>
                <button
                    type="button"
                    onClick={() => setToggleAddModal(false)}
                >
                    Annuler
                </button>
            </form>
        </div>
    );
}

export default AddModal;
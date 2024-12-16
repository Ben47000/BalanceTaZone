import { useState } from "react";

function UpdateModal({ report, setToggleUpdateModal, fetchReports }) {
    const [formData, setFormData] = useState(report);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch(`/api/v1/reporting/update/${report.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                fetchReports(); // Rafraîchir la liste des rapports
                setToggleUpdateModal(false); // Fermer le modal
            } else {
                console.error("Erreur lors de la mise à jour du rapport");
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
                <button type="submit">Mettre à jour</button>
                <button
                    type="button"
                    onClick={() => setToggleUpdateModal(false)}
                >
                    Annuler
                </button>
            </form>
        </div>
    );
}

export default UpdateModal;

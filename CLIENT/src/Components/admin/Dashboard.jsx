import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, fetchUserEvents } from "../../store/Slices/events.js";
import { fetchReports, deleteReport } from "../../store/Slices/reports.js";


function Dashboard() {
  const dispatch = useDispatch();
  const { userEvents, status: eventStatus } = useSelector((state) => state.events);
  const { reports, status: reportStatus } = useSelector((state) => state.reports);
  const { isLogged, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLogged && user?.role === 1) {
      dispatch(fetchUserEvents(user.id));
      dispatch(fetchReports());
    }
  }, [isLogged, user, dispatch]);

  if (!isLogged || user?.role !== 1) {
    return <p className="error-message">⛔ Accès non autorisé.</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>📊 Tableau de bord administrateur</h1>

      <section className="admin-section">
        <h2>📅 Événements</h2>
        {eventStatus === "loading" ? (
          <p>🔄 Chargement des événements...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Date</th>
                <th>Localisation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userEvents?.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{new Date(event.date).toLocaleString()}</td>
                  <td>{event.location}</td>
                  <td>
                    <button className="delete-btn" onClick={() => dispatch(deleteEvent(event.id))}>🗑️ Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="admin-section">
        <h2>📌 Rapports</h2>
        {reportStatus === "loading" ? (
          <p>🔄 Chargement des rapports...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Date de publication</th>
                <th>Zone</th>
                <th>Catégorie</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports?.map((report) => (
                <tr key={report.id}>
                  <td>{report.description}</td>
                  <td>{new Date(report.publishDate).toLocaleString()}</td>
                  <td>{report.area_id}</td>
                  <td>{report.category_id}</td>
                  <td>{report.status}</td>
                  <td>
                    <button className="delete-btn" onClick={() => dispatch(deleteReport(report.id))}>🗑️ Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default Dashboard;

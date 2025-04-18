import { Routes, Route } from "react-router-dom";
import HeaderAdmin from "../Components/admin/Partial/HeaderAdmin";
import Dashboard from "../Components/admin/Dashboard"; // ✅ Vérifie que le fichier est bien placé

function AdminRouter() {
  return (
    <>
      <HeaderAdmin />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default AdminRouter;

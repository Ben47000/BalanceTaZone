import { Routes, Route } from "react-router-dom";

import Header from "../Components/user/Partials/Header.jsx";
import Footer from "../Components/user/Partials/Footer.jsx"
import Home from "../Components/user/Home.jsx";
import Signup from "../Components/auth/Signup.jsx"; // Import du composant Signup
import Login from "../Components/auth/Login.jsx"; // Import du composant Login
import Profil from "../Components/user/Profil.jsx";
import ContactPage from "../Components/user/ContactPage.jsx";
import TermsOfService from "../Components/user/ThermsOfServices.jsx";
function UserRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />}/>
        <Route path="/thermesOfService" element={<TermsOfService />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="*" element={<h1>404 NOT FOUND USER</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default UserRouter;

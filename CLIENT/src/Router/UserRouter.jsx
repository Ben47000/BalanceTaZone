import { Routes, Route } from "react-router-dom";

import Header from "../Components/user/Partials/Header.jsx";
import Home from "../Components/user/Home.jsx";
import Signup from "../Components/auth/Signup.jsx"; // Import du composant Signup
import Login from "../Components/auth/login.jsx"; // Import du composant Login

function UserRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>404 NOT FOUND USER</h1>} />
      </Routes>
    </>
  );
}

export default UserRouter;

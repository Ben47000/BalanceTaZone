import { Routes, Route } from "react-router-dom";

import Header from "../Components/user/Partials/Header.jsx";
import Home from "../Components/user/Home.jsx";

function UserRouter() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="*" element={<h1>404 NOT FOUND USER</h1>}/> 
            </Routes>
        </>
    );
}

export default UserRouter;
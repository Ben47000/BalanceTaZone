import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./Slices/menu";
import userReducer, { login, logout, loginFailed, setMsg, setLoading } from "./Slices/user"; // Importez les actions

const store = configureStore({
  reducer: {
    menu: menuReducer,
    user: userReducer,
  },
});

// Exportez les actions pour un accès global
export { login, logout, loginFailed, setMsg, setLoading };
export default store;

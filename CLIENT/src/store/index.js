import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./Slices/menu";
import eventsReducer from "./Slices/events";
import reportsReducer from "./Slices/reports";
import userReducer, { login, logout, loginFailed, setMsg, setLoading } from "./Slices/user"; // Importez les actions

const store = configureStore({
  reducer: {
    menu: menuReducer,
    user: userReducer,
    events: eventsReducer,
    reports: reportsReducer,
  },
});

// Exportez les actions pour un accès global
export { login, logout, loginFailed, setMsg, setLoading };
export default store;

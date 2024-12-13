import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,               // Identifiant unique de l'utilisateur
  firstname: "",          // Prénom
  lastname: "",           // Nom de famille
  email: "",              // E-mail
  role: 0,                // Rôle (0 = citoyen, 1 = admin)
  isLogged: false,        // Statut de connexion
  authError: null,        // Erreur d'authentification
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      console.log("action.payload", action.payload);
      state.id = action.payload.user.id;
      state.firstname = action.payload.user.firstname;
      state.lastname = action.payload.user.lastname;
      state.email = action.payload.user.email;
      state.role = action.payload.user.role || 0;  // Par défaut, rôle citoyen (0)
      state.isLogged = true;
      state.authError = null; // Réinitialise les erreurs
    },
    loginFailed(state, action) {
      state.authError = action.payload.error;  // Gère les erreurs d'authentification
    },
    logout(state) {
      state.id = null;
      state.firstname = "";
      state.lastname = "";
      state.email = "";
      state.role = 0;
      state.isLogged = false;  // Déconnecte l'utilisateur
      state.authError = null;  // Réinitialise les erreurs
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setMsg(state, action) {
      state.msg = action.payload;
    },
  },
});

export const {
  login,
  loginFailed,
  logout,
  setLoading,
  setMsg,
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null,
  firstname: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).firstname : "",
  lastname: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).lastname : "",
  email: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).email : "",
  role: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : 0,
  isLogged: localStorage.getItem("user") ? true : false,
  authError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.id = action.payload.user.id;
      state.firstname = action.payload.user.firstname;
      state.lastname = action.payload.user.lastname;
      state.email = action.payload.user.email;
      state.role = action.payload.user.role;
      state.isLogged = true;
      state.authError = null;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    setUser(state, action) { // ✅ Correction : Ajout de setUser
      state.id = action.payload.id;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isLogged = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailed(state, action) {
      state.authError = action.payload.error;
    },
    logout(state) {
      state.id = null;
      state.firstname = "";
      state.lastname = "";
      state.email = "";
      state.role = 0;
      state.isLogged = false;
      state.authError = null;
      localStorage.removeItem("user");
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setMsg(state, action) {
      state.msg = action.payload;
    },
  },
});

export const { login, setUser, loginFailed, logout, setLoading, setMsg } = userSlice.actions;
export default userSlice.reducer;

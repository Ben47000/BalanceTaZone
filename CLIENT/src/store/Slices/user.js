import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: "",
	isLogged: false,
	msg: "",
	role: "user", 
	authError: null, 
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login(state, action) {
			console.log("action.payload", action.payload);
			state.username = action.payload.user.username;
			state.isLogged = action.payload.isLogged;
			state.role = action.payload.user.role || "user"; 
			state.authError = null;
		},
		loginFailed(state, action) {
			state.authError = action.payload.error;
		},
		logout(state, action) {
			state.username = "";
			state.isLogged = action.payload.isLogged;
			state.role = "user";
		},
		setLoading(state, action) {
			state.isLoading = action.payload;
		},
		setMsg(state, action) {
			state.msg = action.payload;
		},
		updateField(state, action) {
			state.username = action.payload.username;
		},
	},
});

export const {
	login,
	loginFailed,
	logout,
	updateField,
	setMsg,
	setLoading,
} = userSlice.actions;
export default userSlice.reducer;
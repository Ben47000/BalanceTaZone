import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: "",
	isLogged: false,
	msg: "",
	role: "0", 
	authError: null, 
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login(state, action) {
			console.log("action.payload", action.payload);
			state.firstname = action.payload.user.firstname;
			state.isLogged = action.payload.isLogged;
			state.role = action.payload.user.role || "0"; 
			state.authError = null;
		},
		loginFailed(state, action) {
			state.authError = action.payload.error;
		},
		logout(state) {
			state.username = "";
			state.isLogged = false;  
			state.role = "0";
			state.authError = null;  
		},
		
		setLoading(state, action) {
			state.isLoading = action.payload;
		},
		setMsg(state, action) {
			state.msg = action.payload;
		},
		updateField(state, action) {
			state.firstname = action.payload.username;
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
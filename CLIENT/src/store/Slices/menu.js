import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, // L'état du menu burger
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu: (state, action) => {
      if (typeof action.payload === "boolean") {
        state.isOpen = action.payload; // Si un état est passé, on l'utilise directement
      } else {
        state.isOpen = !state.isOpen; // Sinon, on inverse l'état actuel
      }
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
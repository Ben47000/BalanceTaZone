import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, // L'état du menu burger
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen; // 🔄 Inversion de l'état
    },
    closeMenu: (state) => {
      state.isOpen = false; // ❌ Forcer la fermeture
    },
  },
});

export const { toggleMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;

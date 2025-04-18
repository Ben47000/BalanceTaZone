import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Récupérer les événements de l'utilisateur
export const fetchUserEvents = createAsyncThunk(
  "events/fetchUserEvents",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:9000/api/v1/events/user/${userId}`, { credentials: "include" });

      if (!response.ok) throw new Error("Erreur lors de la récupération des événements");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// 🔹 Ajouter un événement
export const addEvent = createAsyncThunk(
  "events/addEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:9000/api/v1/events/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de l'événement");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Supprimer un événement
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:9000/api/v1/events/delete/${eventId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression de l'événement");

      return eventId; // Retourne l'ID pour pouvoir le retirer du state Redux
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Création du slice Redux
const eventsSlice = createSlice({
  name: "events",
  initialState: {
    userEvents: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // ✅ Permet de modifier `userEvents` sans action asynchrone
    setUserEvents(state, action) {
      state.userEvents = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 Chargement des événements
      .addCase(fetchUserEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userEvents = action.payload;
      })
      .addCase(fetchUserEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 🔄 Ajout d'un événement
      .addCase(addEvent.fulfilled, (state, action) => {
        state.userEvents.push(action.payload); // Ajoute l'événement dans le tableau
      })

      // 🔄 Suppression d'un événement
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.userEvents = state.userEvents.filter(event => event.id !== action.payload);
      });
  },
});

// 🟢 Export des actions (si besoin de `setUserEvents`)
export const { setUserEvents } = eventsSlice.actions;

// 🟢 Export du reducer
export default eventsSlice.reducer;

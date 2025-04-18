import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Récupérer tous les rapports
export const fetchReports = createAsyncThunk(
  "reports/fetchReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:9000/api/v1/reports/list`, { credentials: "include" });

      if (!response.ok) throw new Error("Erreur lors de la récupération des rapports");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Ajouter un rapport
export const addReport = createAsyncThunk(
  "reports/addReport",
  async (reportData, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:9000/api/v1/reports/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reportData),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout du rapport");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Supprimer un rapport
export const deleteReport = createAsyncThunk(
  "reports/deleteReport",
  async (reportId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:9000/api/v1/reports/delete/${reportId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression du rapport");

      return reportId; // Retourne l'ID pour pouvoir le retirer du state Redux
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    reports: [],
    loading: false,
    error: null,
  },
  reducers: {
    // ✅ Permet de modifier `reports` sans action asynchrone
    setReports(state, action) {
      state.reports = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 Chargement des rapports
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔄 Ajout d'un rapport
      .addCase(addReport.fulfilled, (state, action) => {
        state.reports.push(action.payload); // Ajoute le rapport dans le tableau
      })

      // 🔄 Suppression d'un rapport
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.reports = state.reports.filter(report => report.id !== action.payload);
      });
  },
});

// 🟢 Export des actions (si besoin de `setReports`)
export const { setReports } = reportsSlice.actions;

// 🟢 Export du reducer
export default reportsSlice.reducer;

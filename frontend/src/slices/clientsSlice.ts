import { createSlice } from "@reduxjs/toolkit";

interface clientsState {
    items: any[],
}

const initialState: clientsState = {
  items: [],
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    loadClients: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { loadClients } = clientsSlice.actions;
export default clientsSlice.reducer;

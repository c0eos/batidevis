import { createSlice } from "@reduxjs/toolkit";

interface devisState {
    items: any[],
}

const initialState: devisState = {
  items: [],
};

export const devisSlice = createSlice({
  name: "devis",
  initialState,
  reducers: {
    loadDevis: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { loadDevis } = devisSlice.actions;
export default devisSlice.reducer;

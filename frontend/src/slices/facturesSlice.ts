import { createSlice } from "@reduxjs/toolkit";

interface facturesState {
    items: any[],
}

const initialState: facturesState = {
  items: [],
};

export const facturesSlice = createSlice({
  name: "devis",
  initialState,
  reducers: {
    loadFactures: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { loadFactures } = facturesSlice.actions;
export default facturesSlice.reducer;

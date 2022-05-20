import { createSlice } from "@reduxjs/toolkit";

interface acomptesState {
    items: any[],
}

const initialState: acomptesState = {
  items: [],
};

export const acomptesSlice = createSlice({
  name: "acomptes",
  initialState,
  reducers: {
    loadAcomptes: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { loadAcomptes } = acomptesSlice.actions;
export default acomptesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface userState {
  info: any,
  isLoggedIn: boolean,
  token: string | null
}

const initialState: userState = {
  info: {},
  isLoggedIn: false,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.info = action.payload.info;
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.info = initialState.info;
      state.isLoggedIn = initialState.isLoggedIn;
      state.token = initialState.token;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

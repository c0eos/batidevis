import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import clientsReducer from "./slices/clientsSlice";
import devisReducer from "./slices/devisSlice";
import facturesReducer from "./slices/facturesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    clients: clientsReducer,
    devis: devisReducer,
    factures: facturesReducer,
  },
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

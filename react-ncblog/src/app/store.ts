import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import rootReducer from "./features";

let flag = true;
if (process.env.NODE_ENV === 'production') flag = false;

export const store = configureStore({
  // reducer: {
  //   [apiSlice.reducerPath]: apiSlice.reducer,
  //   posts: postsReducer,
  //   auth: authReducer,
  // },
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: flag
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

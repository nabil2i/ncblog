import { configureStore, Middleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api/apiSlice";
import rootReducer from "./features";
import persistStore from "redux-persist/es/persistStore";

let flag = true;
if (process.env.NODE_ENV === 'production') flag = false;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist 'auth' slice
  version: 1,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: {
  //   [apiSlice.reducerPath]: apiSlice.reducer,
  //   posts: postsReducer,
  //   auth: authReducer,
  // },
  reducer: persistedReducer,
  // reducer: rootReducer,
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware as Middleware)
  ),
  devTools: flag
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);

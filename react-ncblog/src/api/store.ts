import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./features"
import { apiSlice } from "./features/apiSlice"

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
 

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

export interface AuthServerResponse {
  success: boolean;
  data: {
    accessToken: string;
  }
  message?: string;
}

export interface AuthErrorResponse {
  data: {
    success: boolean,
    error: {
      code: number,
      message: string,
    }
  },
  status?: number,
}

const initialState = {
  token: null,
  isAuthenticated: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state: AuthState, action: PayloadAction<AuthServerResponse>) => {
      const { data} = action.payload
      state.token = data.accessToken
      state.isAuthenticated = true
    },
    logout: (state: AuthState) => {
      state.token = null
      state.isAuthenticated = false
    }
  }
})

export const { setCredentials, logout } = authSlice.actions

export const selectCurrentToken = (state: RootState) => (state.auth.token)
export const authSatus = (state: RootState) => (state.auth.isAuthenticated)

export default authSlice.reducer

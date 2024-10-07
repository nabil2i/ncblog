
import { apiSlice } from "../../api/apiSlice";
import { AuthServerResponse, setCredentials } from "../auth/authSlice";
import { logout } from './authSlice';

interface LoginCredentials {
  username: string;
  password: string;
}

export interface OAuthData {
  name: string | null;
  email: string  | null;
  photo: string  | null;
}


const extendedAuthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthServerResponse, LoginCredentials>({
      query: (credentials) => ({
        url: 'auth',
        method: 'POST',
        body: {
          ...credentials
        }
      })
    }),
    sendLogout: builder.mutation<AuthServerResponse, object>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          // const { data } = 
          await queryFulfilled;
          // console.log(data);
          dispatch(logout());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState()) // clear cache
          }, 2000)
        } catch (error) {
          // console.log(error)
        }
      }
    }),
    google: builder.mutation<AuthServerResponse, OAuthData>({
      query: (data) => ({
        url: "auth/google",
        method: 'POST',
        body: {
          ...data
        }
      })
    }),
    refresh: builder.mutation<AuthServerResponse, object>({
      query: () => ({
        url: 'auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // console.log(data)
          dispatch(setCredentials(data))
        } catch (err) {
          console.log(err)
        }
      }
    })
  })
})

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useGoogleMutation
} = extendedAuthApiSlice

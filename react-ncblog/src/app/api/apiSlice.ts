import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from '../features/auth/authSlice';
import { showNotification } from "../features/notification/notificationSlice";
import { AuthServerResponse } from './../features/auth/authSlice';
import type { RootState } from './../store';


export const baseUrl = import.meta.env.DEV
  ? import.meta.env.VITE_API_BASE_URL
  : import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    headers.set("Content-Type", 'application/json');
    return headers;
  },
});

const baseQueryWithReauth  = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = (await baseQuery(args, api, extraOptions))
  console.log("result of baseQueryWithReauth: ", result)

  if (result.error?.status === 401) {
    api.dispatch(logout());
    api.dispatch(showNotification({ 
      message: "You have been logged out due to unauthorized access.", 
      type: "error" 
  }));
    return result;
  }

  if (result.error?.status === 403) {
    const refreshResult = (await baseQuery(
      'auth/refresh',
      api,
      extraOptions
    ))
    // console.log(api)
    // console.log(extraOptions)
    // console.log("refreshResult ", refreshResult)

    if (refreshResult?.data) {
      api.dispatch(setCredentials(refreshResult.data as AuthServerResponse));

      result = (await baseQuery(args, api, extraOptions))
    } else {
      if (refreshResult?.error?.status === 403) {
        // if refresh fails, log out the user
        api.dispatch(showNotification({ 
          message: "Your session has expired. Please log in again.", 
          type: "error" 
        }));
        api.dispatch(logout());
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery : baseQueryWithReauth,
  tagTypes: ['DraftPost', 'Post', 'Auth', 'User', 'Comment'],

  endpoints: (builder) => ({
    getStatus: builder.query({
      query: () => ({
        url: `/status`,
        validationStatus: (
          response: { Status: number; },
          result: { isError: boolean; }) => {
            return response.Status === 200 && !result.isError
        },
      }),
    }),
  })
})

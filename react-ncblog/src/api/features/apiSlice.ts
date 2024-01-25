import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface FetchResponse<R> {
//   success: boolean;
//   data: R;
//   message?: string;
// }
// export interface FetchError {
//   success: boolean;
//   error: {
//     code: number;
//     message: string;
//   }
// }

// export interface ArrayData<S> {
//   count: number;
//   current: number;
//   prev: number;
//   next: number;
//   perPage: number;
//   results: S[];
// }

export const baseUrl = import.meta.env.DEV ? import.meta.env.VITE_API_BASE_URL : process.env.API_BASE_URL;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({})
})

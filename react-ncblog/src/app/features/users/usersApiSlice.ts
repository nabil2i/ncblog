import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/query";
import User from "../../../entities/User";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from '../../store';

interface DataUser {
  count: number;
  current: number;
  prev: number | null;
  next: number | null;
  limit: number;
  results: User[];
  stats: {
    totlaItems: number,
    lastMonthItems: number,
  }
}
export interface ServerResponse<R> {
  success: boolean;
  data: R;
  message?: string;
  error?: {
    code: number,
    message: string,
  }
}


const usersAdapter = createEntityAdapter<User>({
  // selectId: (user: User) => user.id,
  // sortComparer: (a: User, b: User) => (
  //   b?.createdAt.localeCompare(a?.createdAt))
});

const initialState = usersAdapter.getInitialState()

export const extendedUsersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: (arg) => ({
        url: '/users',
        params: {
          limit: arg?.limit,
          page: arg?.page
        },
        validationStatus: (
          response: { Status: number; },
          result: { isError: boolean; }) => {
            return response.Status === 200 && !result.isError
          },
        }),
      serializeQueryArgs: ({ queryArgs }) => queryArgs,
      // keepUnusedDataFor: 60,
      transformResponse: (responseData: ServerResponse<DataUser>) => {
        // const normalizedUsers = responseData.data.results.reduce((acc, user) => {
        //   acc[user._id || ''] = { ...user, id: user._id || '' };
        //   return acc;
        // }, {} as Record<string, User>);
        const normalizedUsers = responseData.data.results.map(user => {
          return { ...user, id: user._id };
        });

        const pagination = {
          count: responseData.data.count,
          current: responseData.data.current,
          prev: responseData.data.prev,
          next: responseData.data.next,
          limit: responseData.data.limit,
        };

        const stats = responseData.data.stats
        return { 
          users: usersAdapter.setAll(initialState, normalizedUsers),
          pagination,
          stats
        }
      },
      providesTags: (result) => {
        if (result?.users?.ids) {
          return [
            ...result.users.ids.map(id => ({ type: 'User', id } as TagDescription<"User">)),
            { type: 'User', id: 'LIST' },
          ];
        } else {
          return [{ type: 'User', id: 'LIST' }];
        }
      }
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `users/${id}`,
        validationStatus: (
          response: { Status: number; },
          result: { isError: boolean; }) => {
            return response.Status === 200 && !result.isError
        },
      }),
      providesTags: (id) => [{ type: 'User', id}],
    }),
    addNewUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: 'USER',
        body: {
          ...userData
        }
      }),
      invalidatesTags: [
        { type: 'User', id: "LIST"}
      ]
    }),
    updateUser: builder.mutation({
      query: ({id, ...userData}) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: {
          ...userData
        }
      }),
      invalidatesTags: (arg) => [
        { type: 'User', id: arg.id}
      ]
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
        body: {id}
      }),
      invalidatesTags: (arg) => [
        { type: 'User', id: arg.id}
      ]
    }),
    deleteCurentUser: builder.mutation({
      query: ({id, userId}) => ({
        url: `/users/${id}/${userId}`,
        method: 'DELETE',
        body: {id}
      }),
      invalidatesTags: (arg) => [
        { type: 'User', id: arg.id}
      ]
    }),
  })
})

// return the query return object
export const selectUsersResult = extendedUsersApiSlice.endpoints.getUsers.select('usersList')
export const selectUserResult = (userId: string) => extendedUsersApiSlice.endpoints.getUser.select(userId)

// Memoized selectors
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data?.users // normalized state with ids and entities
)

export const selectUser = createSelector(
  [selectUserResult],
  (user) => user
)

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useDeleteCurentUserMutation,
} = extendedUsersApiSlice

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors((state: RootState) => selectUsersData(state) ?? initialState)

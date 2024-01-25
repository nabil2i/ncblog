import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/query";
import Post, { PostData } from "../../entities/Post";
import { RootState } from '../store';
import { apiSlice } from "./apiSlice";

interface ServerResponse {
  success: boolean;
  data: {
    count: number;
    current: number;
    prev: number | null;
    next: number | null;
    perPage: number;
    results: Post[];
  };
  message?: string;
  error?: {
    code: number,
    message: string,
  }
}

const postsAdapter = createEntityAdapter<Post>({
  // selectId: (post: Post) => post.id,
  // sortComparer: (a: Post, b: Post) => b.createdAt.localeCompare(a.createdAt)
});

const initialState = postsAdapter.getInitialState()

export const extendedPostsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts',
      // validationStatus: (response, result) => {
      //   return response.Status === 200 && !result.isError
      // },
      keepUnusedDataFor: 60,
      transformResponse: (responseData: ServerResponse) => {
        const postsWithIds = responseData.data.results.map(post => {
          return { ...post, id: post._id };
        });
        return postsAdapter.setAll(initialState, postsWithIds)
      },
      // providesTags: ['Post']
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: 'Post', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Post', id: String(id) } as TagDescription<"Post">)) // Convert EntityId to string
          ];
        } else {
          return [{ type: 'Post', id: 'LIST' }];
        }
      }
    }),
    addNewPost: builder.mutation({
      query: (postData: PostData) => ({
        url: "/posts",
        method: 'POST',
        body: {
          ...postData
        }
      }),
      invalidatesTags: [
        { type: 'Post', id: "LIST"}
      ]
    }),
    updatePost: builder.mutation({
      query: (postData: PostData) => ({
        url: "/posts",
        method: 'PATCH',
        body: {
          ...postData
        }
      }),
      invalidatesTags: (arg) => [
        { type: 'Post', id: arg.id}
      ]
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: "/posts",
        method: 'PATCH',
        body: {id}
      }),
      invalidatesTags: (arg) => [
        { type: 'Post', id: arg.id}
      ]
    }),
  })
})

// return the query return object
export const selectPostsResult = extendedPostsApiSlice.endpoints.getPosts.select({})

// Memoized selectors
const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data // normalized state with ids and entities
)

export const { useGetPostsQuery, useAddNewPostMutation, useUpdatePostMutation, useDeletePostMutation } = extendedPostsApiSlice

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors((state: RootState) => selectPostsData(state) ?? initialState)

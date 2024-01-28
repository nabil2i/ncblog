import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/query";
import Post, { PostData } from "../../../entities/Post";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from '../../store';

interface DataPost {
  count: number;
  current: number;
  prev: number | null;
  next: number | null;
  perPage: number;
  results: Post[];
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


const postsAdapter = createEntityAdapter<Post>({
  // selectId: (post: Post) => post.id,
  // sortComparer: (a: Post, b: Post) => (
  //   b?.createdAt.localeCompare(a?.createdAt))
});

const initialState = postsAdapter.getInitialState()

export const extendedPostsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => ({
        url: '/posts',
        validationStatus: (
          response: { Status: number; },
          result: { isError: boolean; }) => {
            return response.Status === 200 && !result.isError
        },
      }),
      // keepUnusedDataFor: 60,
      transformResponse: (responseData: ServerResponse<DataPost>) => {
        const normalizedPosts = responseData.data.results.map(post => {
          return { ...post, id: post._id };
        });

        const pagination = {
          totalCount: responseData.data.count,
          currentPage: responseData.data.current,
          prevPage: responseData.data.prev,
          nextPage: responseData.data.next,
          perPage: responseData.data.perPage,
        };

        return { 
          posts: postsAdapter.setAll(initialState, normalizedPosts),
          pagination
        }
      },
      providesTags: (result) => {
        if (result?.posts?.ids) {
          return [
            { type: 'Post', id: 'LIST' },
            ...result.posts.ids.map(id => ({ type: 'Post', id} as TagDescription<"Post">))
          ];
        } else {
          return [{ type: 'Post', id: 'LIST' }];
        }
      }
    }),
    getPost: builder.query({
      query: (id) => ({
        url: `posts/${id}`,
        validationStatus: (
          response: { Status: number; },
          result: { isError: boolean; }) => {
            return response.Status === 200 && !result.isError
        },
      }),
      providesTags: (id) => [{ type: 'Post', id}],
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
      query: ({id, ...postData}) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: {
          ...postData
        }
      }),
      invalidatesTags: (arg) => [
        { type: 'Post', id: arg.id}
      ]
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        body: {id}
      }),
      invalidatesTags: (arg) => [
        { type: 'Post', id: arg.id}
      ]
    }),
  })
})

// return the query return object
export const selectPostsResult = extendedPostsApiSlice.endpoints.getPosts.select('postsList')
export const selectPostResult = (postId: string) => extendedPostsApiSlice.endpoints.getPost.select(postId)

// Memoized selectors
const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data?.posts // normalized state with ids and entities
)

export const selectPost = createSelector(
  [selectPostResult],
  (post) => post
)

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostQuery
} = extendedPostsApiSlice

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors((state: RootState) => selectPostsData(state) ?? initialState)

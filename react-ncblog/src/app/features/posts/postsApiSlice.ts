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
  limit: number;
  results: Post[];
  stats: {
    totalItems: number,
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


const postsAdapter = createEntityAdapter<Post>({
  // selectId: (post: Post) => post.id,
  // sortComparer: (a: Post, b: Post) => (
  //   b?.createdAt.localeCompare(a?.createdAt))
});

const initialState = postsAdapter.getInitialState()

export const extendedPostsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: (arg) => ({
        url: '/posts',
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
      transformResponse: (responseData: ServerResponse<DataPost>) => {
        const normalizedPosts = responseData.data.results.map(post => {
          return { ...post, id: post._id };
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
          posts: postsAdapter.setAll(initialState, normalizedPosts),
          pagination,
          stats
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
    getCurrentDraftPost: builder.query({
      query: (id) => ({
        url: `posts/${id}/draft`,
        validationStatus: (
          response: { Status: number; },
          result: { isError: boolean; }) => {
            return response.Status === 200 && !result.isError
        },
      }),
      providesTags: (id) => [{ type: 'DraftPost', id}],
    }),
    updatePublishedPost: builder.mutation({
      query: ({id, currentDraftId, ...postData}) => ({
        url: `/posts/${id}/edit`,
        method: 'PATCH',
        body: {
          currentDraftId,
          ...postData
        }
      }),
      // invalidatesTags: (arg) => [
      //   // it's the current draft of the post we need to invalidate
      //   { type: 'DraftPost', id: arg.currentDraftId}
      // ]
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        // body: {id}
      }),
      invalidatesTags: (arg) => [
        { type: 'Post', id: arg.id}
      ]
    }),
    // deleteCurentUserPost: builder.mutation({
    //   query: ({id, userId}) => ({
    //     url: `/posts/${id}/${userId}`,
    //     method: 'DELETE',
    //     body: {id}
    //   }),
    //   invalidatesTags: (arg) => [
    //     { type: 'Post', id: arg.id}
    //   ]
    // }),
    getDraftPosts: builder.query({
      query: (arg) => ({
        url: '/posts/draft',
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
      transformResponse: (responseData: ServerResponse<DataPost>) => {
        const normalizedPosts = responseData.data.results.map(post => {
          return { ...post, id: post._id };
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
          posts: postsAdapter.setAll(initialState, normalizedPosts),
          pagination,
          stats
        }
      },
      providesTags: (result) => {
        if (result?.posts?.ids) {
          return [
            { type: 'DraftPost', id: 'LIST' },
            ...result.posts.ids.map(id => ({ type: 'DraftPost', id} as TagDescription<"DraftPost">))
          ];
        } else {
          return [{ type: 'DraftPost', id: 'LIST' }];
        }
      }
    }),
    createDraftPost: builder.mutation({
      query: (postData: PostData) => ({
        url: "/posts/draft",
        method: 'POST',
        body: {
          ...postData
        }
      }),
      // invalidatesTags:  [
      //   { type: 'DraftPost', id: 'LIST'}
      // ]
    }),
    createDraftFromPost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/draft`,
        method: 'POST',
        // body: {
        //   ...postData
        // }
      }),
      // invalidatesTags:  [
      //   { type: 'DraftPost', id: 'LIST'}
      // ]
    }),
    getDraftPost: builder.query({
      query: (id) => ({
        url: `posts/draft/${id}`,
        validationStatus: (
          response: { Status: number; },
          result: { isError: boolean; }) => {
            return response.Status === 200 && !result.isError
        },
      }),
      providesTags: (id) => [{ type: 'DraftPost', id}],
    }),
    publishDraftPost: builder.mutation({
      query: ({id, ...postData}) => ({
        url: `/posts/draft/${id}/publish`,
        method: 'POST',
        body: {
          ...postData
        }
      }),
      invalidatesTags: [
        { type: 'Post', id: "LIST"}
      ]
    }),
    deleteDraftPost: builder.mutation({
      query: (id) => ({
        url: `/posts/draft/${id}`,
        method: 'DELETE',
        // body: {id}
      }),
      invalidatesTags: (arg) => [
        { type: 'DraftPost', id: arg.id},
        //add more tags to invalidate
      ]
    }),
    updateDraftPost: builder.mutation({
      query: ({id, ...postData}) => ({
        url: `/posts/draft/${id}`,
        method: 'PATCH',
        body: {
          ...postData
        }
      }),
      // invalidatesTags: (arg) => [
      //   { type: 'DraftPost', id: arg.id}
      // ]
    }),

    // addNewPost: builder.mutation({
    //   query: (postData: PostData) => ({
    //     url: "/posts",
    //     method: 'POST',
    //     body: {
    //       ...postData
    //     }
    //   }),
    //   invalidatesTags: [
    //     { type: 'Post', id: "LIST"}
    //   ]
    // }),
    // updatePost: builder.mutation({
    //   query: ({id, ...postData}) => ({
    //     url: `/posts/${id}`,
    //     method: 'PUT',
    //     body: {
    //       ...postData
    //     }
    //   }),
    //   invalidatesTags: (arg) => [
    //     { type: 'Post', id: arg.id}
    //   ]
    // }),
    // deletePost: builder.mutation({
    //   query: (id) => ({
    //     url: `/posts/${id}`,
    //     method: 'DELETE',
    //     body: {id}
    //   }),
    //   invalidatesTags: (arg) => [
    //     { type: 'Post', id: arg.id}
    //   ]
    // }),
    // deleteCurentUserPost: builder.mutation({
    //   query: ({id, userId}) => ({
    //     url: `/posts/${id}/${userId}`,
    //     method: 'DELETE',
    //     body: {id}
    //   }),
    //   invalidatesTags: (arg) => [
    //     { type: 'Post', id: arg.id}
    //   ]
    // }),
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
  useGetPostQuery,
  useGetCurrentDraftPostQuery,
  useGetDraftPostsQuery,
  useGetDraftPostQuery,
  useCreateDraftPostMutation,
  usePublishDraftPostMutation,
  useDeleteDraftPostMutation,
  useUpdateDraftPostMutation,
  useUpdatePublishedPostMutation,
  useDeletePostMutation,
  useCreateDraftFromPostMutation

} = extendedPostsApiSlice

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectTotal: selectTotalPosts
} = postsAdapter.getSelectors((state: RootState) => selectPostsData(state) ?? initialState)

import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { TagDescription } from "@reduxjs/toolkit/query";
import ms from "ms";
import Comment from "../../../entities/Comment";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from '../../store';

interface DataComment {
  count: number;
  current: number;
  prev: number | null;
  next: number | null;
  limit: number;
  results: Comment[];
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


const commentsAdapter = createEntityAdapter<Comment>({
  // selectId: (comment: Comment) => comment.id,
  // sortComparer: (a: Comment, b: Comment) => (
  //   b?.createdAt.localeCompare(a?.createdAt))
});

const initialState = commentsAdapter.getInitialState()

export const extendedCommentsApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getComments: builder.query({
      // query: () => ({
      query: (arg) => ({
        url: `/comments`,
        // url: `/comments?page=${arg.page}`,
        params: {
          limit: arg?.limit,
          // startIndex: arg?.startIndex
          page: arg?.page
        },
        validationStatus: (
          response: { Status: number; },
          result: { isError: boolean; }) => {
            return response.Status === 200 && !result.isError
        },
      }),
      serializeQueryArgs: ({ queryArgs }) => queryArgs,
      // // serializeQueryArgs: ({ queryArgs }) => { // map the cache with the same key
      // //   const newQueryArgs = { ...queryArgs };
      // //   if (newQueryArgs.startIndex) {
      // //     delete newQueryArgs.startIndex;
      // //   }
      // //   if (newQueryArgs.limit) {
      // //     delete newQueryArgs.limit;
      // //   }
      // //   return newQueryArgs;
      // // },
      // merge: (currentCache, newItems) => {
      //   if (currentCache.comments) {
      //     return {
      //       ...currentCache,
      //       ...newItems,
      //       comments: {
      //         ...currentCache.comments,
      //         entities: {
      //           ...currentCache.comments.entities,
      //           ...newItems.comments.entities,
      //         },
      //         ids: [...currentCache.comments.ids, ...newItems.comments.ids],
      //       },
      //     };
      //   }
      //   return newItems;
      // },
      keepUnusedDataFor: ms('24h'),
      transformResponse: (responseData: ServerResponse<DataComment>) => {
        // const normalizedComments = responseData.data.results.reduce((acc, comment) => {
        //   acc[comment._id || ''] = { ...comment, id: comment._id || '' };
        //   return acc;
        // }, {} as Record<string, Comment>);
        const normalizedComments = responseData.data.results.map(comment => {
          return { ...comment, id: comment._id };
        });

        
        // const existingComments = (state: RootState) => state[apiSlice.reducerPath]
        const pagination = {
          count: responseData.data.count,
          current: responseData.data.current,
          prev: responseData.data.prev,
          next: responseData.data.next,
          limit: responseData.data.limit,
        };

        const stats = responseData.data.stats
        return { 
          // comments: commentsAdapter.upsertMany(initialState, normalizedComments),
          comments: commentsAdapter.setAll(initialState, normalizedComments),
          pagination,
          stats
        }
      },
      providesTags: (result) => {
        if (result?.comments?.ids) {
          return [
            ...result.comments.ids.map(id => ({ type: 'Comment', id } as TagDescription<"Comment">)),
            { type: 'Comment', id: 'LIST' },
          ];
        } else {
          return [{ type: 'Comment', id: 'LIST' }];
        }
      }
    }),
    getComment: builder.query({
      query: (id) => ({
        url: `comments/${id}`,
        validationStatus: (
          response: { Status: number; },
          result: { isError: boolean; }) => {
            return response.Status === 200 && !result.isError
        },
      }),
      providesTags: (id) => [{ type: 'Comment', id}],
    }),
    addNewComment: builder.mutation({
      query: (commentData) => ({
        url: "/comments",
        method: 'COMMENT',
        body: {
          ...commentData
        }
      }),
      invalidatesTags: [
        { type: 'Comment', id: "LIST"}
      ]
    }),
    updateComment: builder.mutation({
      query: ({id, ...commentData}) => ({
        url: `/comments/${id}`,
        method: 'PUT',
        body: {
          ...commentData
        }
      }),
      invalidatesTags: (arg) => [
        { type: 'Comment', id: arg.id}
      ]
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
        body: {id}
      }),
      invalidatesTags: (arg) => [
        { type: 'Comment', id: arg.id}
      ]
    }),
    deleteCurentComment: builder.mutation({
      query: ({id, commentId}) => ({
        url: `/comments/${id}/${commentId}`,
        method: 'DELETE',
        body: {id}
      }),
      invalidatesTags: (arg) => [
        { type: 'Comment', id: arg.id}
      ]
    }),
  })
})



// return the query return object
// export const selectCommentsResult = (limit?: number) => (
//   extendedCommentsApiSlice.endpoints.getComments.select({ limit })
// );
// // Memoized selectors
// const selectCommentsData = createSelector(
//   (state: RootState) => state[apiSlice.reducerPath].queries,
//   selectCommentsResult,
//   (apiSliceState, commentsResult) => commentsResult.data?.comments
// );
  
  export const selectCommentsResult = extendedCommentsApiSlice.endpoints.getComments.select('commentsList')
  // Memoized selectors
  const selectCommentsData = createSelector(
    selectCommentsResult,
    (commentsResult) => commentsResult.data?.comments// normalized state with ids and entities
    )
    
export const selectCommentResult = (commentId: string) => (
  extendedCommentsApiSlice.endpoints.getComment.select(commentId)
);
export const selectComment = createSelector(
  [selectCommentResult],
  (comment) => comment
)

export const {
  useGetCommentsQuery,
  useGetCommentQuery,
  useAddNewCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useDeleteCurentCommentMutation,
} = extendedCommentsApiSlice

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds
} = commentsAdapter.getSelectors((state: RootState) => selectCommentsData(state) ?? initialState)

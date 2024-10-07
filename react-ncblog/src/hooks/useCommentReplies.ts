import { ArrayData } from './../services/api-client';

import { useInfiniteQuery } from '@tanstack/react-query';
import ms from 'ms';
import { selectCurrentToken } from '../app/features/auth/authSlice';
import { useAppSelector } from '../app/hooks';
import { PostComment } from '../entities/Post';
import APIClient, { CustomAxiosError, FetchResponse } from '../services/api-client';
import { useCommentRepliesQueryStore } from '../store';
import { CACHE_KEY_COMMENT_REPLIES } from './constants';

interface UseCommentRepliesOptions {
  enabled?: boolean; // New option for enabling/disabling the query
  order: string;
  limit: number;
}

const useCommentReplies = (postId: string, commentId: string, options: UseCommentRepliesOptions) => { 
  const apiClient = new APIClient<PostComment, void>(`/posts/${postId}/comments/${commentId}/replies`)
  const commentRepliesQuery = useCommentRepliesQueryStore(s => s.commentRepliesQuery);
  const token = useAppSelector(selectCurrentToken);
  
  // return useQuery<FetchResponse<ArrayData<PostComment>>, CustomAxiosError>({
  return useInfiniteQuery<FetchResponse<ArrayData<PostComment>>, CustomAxiosError>({
    queryKey: [CACHE_KEY_COMMENT_REPLIES, commentId, commentRepliesQuery],
    queryFn: ({ pageParam = 0 }) => apiClient.getAll({
      params: {
        topParentCommentId: commentRepliesQuery.topParentCommentId,
        limit: options.limit,
        order: options.order,
        // limit: commentRepliesQuery.limit,
        // order: commentRepliesQuery.order,
        startIndex: pageParam
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    }),
    getNextPageParam: (lastPage, allPages) => {
      // Check if there are more replies to load
      const totalReplies = lastPage.data.count;
      const loadedReplies = allPages.flatMap(page => page.data.results).length;

      return loadedReplies < totalReplies ? loadedReplies : undefined;
    },
    // getPreviousPageParam: (firstPage, allPages) => {
      
    // },
    staleTime: ms('24h'),
    keepPreviousData: true,
    enabled: options.enabled,
  });
};

export default useCommentReplies;

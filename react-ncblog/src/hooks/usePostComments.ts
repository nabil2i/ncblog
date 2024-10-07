import { useInfiniteQuery } from '@tanstack/react-query';
import ms from 'ms';
import { selectCurrentToken } from '../app/features/auth/authSlice';
import { useAppSelector } from '../app/hooks';
import { PostComment } from '../entities/Post';
import APIClient, { ArrayData, FetchResponse } from '../services/api-client';
import { usePostCommentQueryStore } from '../store';
import { CACHE_KEY_COMMENTS } from './constants';

const usePostComments = (postId: string) => { 
  const apiClient = new APIClient<PostComment, void>(`/posts/${postId}/comments`)
  const postCommentQuery = usePostCommentQueryStore(s => s.postCommentQuery);
  // console.log("order in hook: ", postCommentQuery.order);

  const token = useAppSelector(selectCurrentToken);
  
  return useInfiniteQuery<FetchResponse<ArrayData<PostComment>>>({
    queryKey: [CACHE_KEY_COMMENTS, postId, postCommentQuery],
    queryFn: ({ pageParam = 0 }) => apiClient.getAll({
      params: {
        // page: postCommentQuery.page,
        limit: postCommentQuery.limit,
        order: postCommentQuery.order,
        startIndex: pageParam,
        // startIndex: postCommentQuery.startIndex,
        
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    }),
    getNextPageParam: (lastPage, allPages) => {
      // Check if there are more comments to load
      const totalComments = lastPage.data.count;
      const loadedComments = allPages.flatMap(page => page.data.results).length;

      return loadedComments < totalComments ? loadedComments : undefined;
    },
    staleTime: ms('24h'),
    keepPreviousData: true,
  });
};

export default usePostComments;

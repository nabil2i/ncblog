import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import APIClient, { FetchResponse } from '../services/api-client';
import { CACHE_KEY_COMMENTS } from './constants';
import { PostComment } from '../entities/Post';

interface CommentsData {
  numberOfComments: number;
  comments: PostComment[]
}

const usePostComments = (slug: string) => { 
  const apiClient = new APIClient<CommentsData, void>(`/posts/${slug}/comments`)
  // const postQuery = usePostQueryStore(s => s.postQuery);
  // const token = useAppSelector(selectCurrentToken);
  
  return useQuery<FetchResponse<CommentsData>>({
    queryKey: [CACHE_KEY_COMMENTS, slug],
    queryFn: () => apiClient.getAllItems({
      params: {
        // page: postQuery.page,
        // search: postQuery.searchText,
        // _start: (postQuery.page - 1) * postQuery.limit,
        // _limit: postQuery.limit,
        // limit: postQuery.limit,
      },
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${token}`,
      //   'Accept': 'application/json'
      // }
    }),
    // getNextPageParam: (lastPage, allPages) => {
    //   return lastPage.next ? allPages.length + 1 : undefined;
    // },
    staleTime: ms('24h'),
    keepPreviousData: true,
  });
};

export default usePostComments;

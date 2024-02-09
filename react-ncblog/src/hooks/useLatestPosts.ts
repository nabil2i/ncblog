import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import { selectCurrentToken } from '../app/features/auth/authSlice';
import { useAppSelector } from '../app/hooks';
import Post from '../entities/Post';
import { ArrayData, FetchResponse } from '../services/api-client';
import postService from "../services/postService";
import { CACHE_KEY_LATEST_POSTS } from './constants';


const useLatestPosts = () => { 
  // const postQuery = usePostQueryStore(s => s.postQuery);
  const token = useAppSelector(selectCurrentToken);
  
  return useQuery<FetchResponse<ArrayData<Post>>>({
    queryKey: [CACHE_KEY_LATEST_POSTS],
    queryFn: () => postService.getAll({
      params: {
        limit: 3,
        // search: postQuery.searchText,
        // _start: (postQuery.page - 1) * postQuery.limit,
        // _limit: postQuery.limit,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    }),
    // getNextPageParam: (lastPage, allPages) => {
    //   return lastPage.next ? allPages.length + 1 : undefined;
    // },
    staleTime: ms('24h'),
    keepPreviousData: true,
  });
};

export default useLatestPosts;

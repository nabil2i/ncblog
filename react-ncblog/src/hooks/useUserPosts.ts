import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import { selectCurrentToken } from '../app/features/auth/authSlice';
import { useAppSelector } from '../app/hooks';
import Post from '../entities/Post';
import { ArrayData, FetchResponse } from '../services/api-client';
import userpostService from "../services/postService";
import { CACHE_KEY_USER_POSTS } from './constants';
import useAuth from './useAuth';

const useUserPosts = () => { 
  // const userPostQuery = useUserPostQueryStore(s => s.postQuery);
  const { _id } = useAuth();

  const token = useAppSelector(selectCurrentToken);
  
  return useQuery<FetchResponse<ArrayData<Post>>>({
    queryKey: [CACHE_KEY_USER_POSTS, _id],
    queryFn: () => userpostService.getAll({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
      // params: {
        // page: userPostQuery.page,
        // search: postQuery.searchText,
        // _start: (postQuery.page - 1) * postQuery.perPage,
        // _limit: postQuery.perPage,
        // perPage: postQuery.perPage,
      // },
    }),
    // getNextPageParam: (lastPage, allPages) => {
    //   return lastPage.next ? allPages.length + 1 : undefined;
    // },
    staleTime: ms('24h'), // 24h
    keepPreviousData: true,
  });
};

export default useUserPosts;
import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import { selectCurrentToken } from '../app/features/auth/authSlice';
import { useAppSelector } from '../app/hooks';
import Post from '../entities/Post';
import { ArrayData, FetchResponse } from '../services/api-client';
import userpostService from "../services/postService";
import { CACHE_KEY_USER_POSTS } from './constants';
import useAuth from './useAuth';
import { useUserPostQueryStore } from '../store';

const useUserPosts = () => { 
  const userPostQuery = useUserPostQueryStore(s => s.userPostQuery);
  const { _id } = useAuth();

  const token = useAppSelector(selectCurrentToken);
  
  return useQuery<FetchResponse<ArrayData<Post>>>({
    queryKey: [CACHE_KEY_USER_POSTS, userPostQuery, _id],
    queryFn: () => userpostService.getAll({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      params: {
        page: userPostQuery.page,
        // search: userPostQuery.searchText,
        // _start: (userPostQuery.page - 1) * userPostQuery.perPage,
        // _limit: userPostQuery.perPage,
        // perPage: userPostQuery.perPage,
      },
    }),
    // getNextPageParam: (lastPage, allPages) => {
    //   return lastPage.next ? allPages.length + 1 : undefined;
    // },
    staleTime: ms('24h'),
    keepPreviousData: true,
  });
};

export default useUserPosts;

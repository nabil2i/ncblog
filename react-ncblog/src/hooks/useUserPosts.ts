import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import { selectCurrentToken } from '../app/features/auth/authSlice';
import { useAppSelector } from '../app/hooks';
import Post from '../entities/Post';
import { ArrayData, FetchResponse } from '../services/api-client';
import postService from "../services/postService";
import { useUserPostQueryStore } from '../store';
import { CACHE_KEY_USER_POSTS } from './constants';
import useAuth from './useAuth';

const useUserPosts = () => { 
  const userPostQuery = useUserPostQueryStore(s => s.userPostQuery);
  const { _id } = useAuth();

  const token = useAppSelector(selectCurrentToken);
  
  return useQuery<FetchResponse<ArrayData<Post>>>({
    queryKey: [CACHE_KEY_USER_POSTS, userPostQuery, _id],
    queryFn: () => postService.getAll({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      params: {
        page: userPostQuery.page,
        authorId: _id,
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

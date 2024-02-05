import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import { selectCurrentToken } from '../app/features/auth/authSlice';
import { useAppSelector } from '../app/hooks';
import Post from '../entities/Post';
import { FetchResponse } from '../services/api-client';
import postService from "../services/postService";
import { useSearchPostQueryStore } from '../store';
import { ArrayData } from './../services/api-client';
import { CACHE_KEY_POSTS } from './constants';


const useSearchPosts = () => { 
  const searchPostQuery = useSearchPostQueryStore(s => s.searchPostQuery);
  const token = useAppSelector(selectCurrentToken);
  
  return useQuery<FetchResponse<ArrayData<Post>>>({
    queryKey: [CACHE_KEY_POSTS, searchPostQuery],
    queryFn: () => postService.getAll({
      params: {
        search: searchPostQuery.searchText,
        authorId: searchPostQuery.authorId,
        page: searchPostQuery.page,
        category: searchPostQuery.category,
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

export default useSearchPosts;

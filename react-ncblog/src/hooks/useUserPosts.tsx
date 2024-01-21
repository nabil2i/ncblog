import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import Post from '../entities/Post';
import { FetchResponse, ArrayData } from '../services/api-client';
import userpostService from "../services/postService";
// import useUserPostQueryStore from '../store';
import { CACHE_KEY_POSTS } from './constants';
import useAuth from '../components/navigationbar/useAuth';

const useUserPosts = () => { 
  // const userPostQuery = useUserPostQueryStore(s => s.postQuery);
  const { state } = useAuth();
  const userId = state.user?._id;
  
  return useQuery<FetchResponse<ArrayData<Post>>>({
    queryKey: [CACHE_KEY_POSTS, userId],
    queryFn: () => userpostService.getAll({
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

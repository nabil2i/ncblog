import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import Post from '../entities/Post';
import { FetchResponse } from '../services/api-client';
// import { PostQuery } from './../App';
import postService from "../services/postService";
// import usePostQueryStore, { useSearchPostQueryStore } from '../store';
import { CACHE_KEY_POSTS } from './constants';
import { useSearchPostQueryStore } from '../store';

// const apiClient = new APIClient<Post>('/posts');
// const usePosts = (postQuery: PostQuery) => useData<Post>(
//   '/posts',
//   {
//     params: {
//       search: postQuery.searchText,
//       page: postQuery?.page,
//       // perPage: postQuery?.perPage
//     },
//   },
//   [ postQuery ]
// );



const useSearchPosts = () => { 
  const searchPostQuery = useSearchPostQueryStore(s => s.searchPostQuery);
  
  return useQuery<FetchResponse<Post>>({
    queryKey: [CACHE_KEY_POSTS, searchPostQuery],
    queryFn: () => postService.getAll({
      params: {
        search: searchPostQuery.searchText,
        // _start: (postQuery.page - 1) * postQuery.perPage,
        // _limit: postQuery.perPage,
        page: searchPostQuery.page,
      },
    }),
    // getNextPageParam: (lastPage, allPages) => {
    //   return lastPage.next ? allPages.length + 1 : undefined;
    // },
    staleTime: ms('24h'), // 24h
    keepPreviousData: true,
  });
};

export default useSearchPosts;

import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import Post from '../entities/Post';
import { FetchResponse, ArrayData } from '../services/api-client';
// import { PostQuery } from './../App';
import postService from "../services/postService";
import usePostQueryStore from '../store';
import { CACHE_KEY_POSTS } from './constants';

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



const usePosts = () => { 
  const postQuery = usePostQueryStore(s => s.postQuery);
  
  return useQuery<FetchResponse<ArrayData<Post>>>({
    queryKey: [CACHE_KEY_POSTS, postQuery],
    queryFn: () => postService.getAll({
      params: {
        page: postQuery.page,
        // search: postQuery.searchText,
        // _start: (postQuery.page - 1) * postQuery.perPage,
        // _limit: postQuery.perPage,
        // perPage: postQuery.perPage,
      },
    }),
    // getNextPageParam: (lastPage, allPages) => {
    //   return lastPage.next ? allPages.length + 1 : undefined;
    // },
    staleTime: ms('24h'), // 24h
    keepPreviousData: true,
  });
};

export default usePosts;

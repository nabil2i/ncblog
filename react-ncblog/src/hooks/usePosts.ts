import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import APIClient, { FetchResponse } from '../services/api-client';
import { PostQuery } from './../App';
import { CACHE_KEY_POSTS } from './constants';

const apiClient = new APIClient<Post>('/posts');
export interface Post {
  _id: number;
  title: string;
  body: string;
  createdAt: Date;
}

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
const usePosts = (postQuery: PostQuery) => {
  return useQuery<FetchResponse<Post>>({
    queryKey: [CACHE_KEY_POSTS, postQuery],
    queryFn: () => apiClient.getAll({
      params: {
        search: postQuery.searchText,
        // _start: (postQuery.page - 1) * postQuery.perPage,
        // _limit: postQuery.perPage,
        page: postQuery.page,
        perPage: postQuery.perPage
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

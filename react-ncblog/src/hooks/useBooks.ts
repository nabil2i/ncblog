import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import { ArrayData, FetchResponse } from '../services/api-client';
// import { PostQuery } from './../App';
import Book from '../entities/Book';
import bookService from '../services/bookService';
import { useBookQueryStore } from '../store';
import { CACHE_KEY_BOOKS } from './constants';

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



const useBooks = () => { 
  const bookQuery = useBookQueryStore(s => s.bookQuery);
  
  return useQuery<FetchResponse<ArrayData<Book>>>({
    queryKey: [CACHE_KEY_BOOKS, bookQuery],
    queryFn: () => bookService.getAll({
      params: {
        page: bookQuery.page,
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

export default useBooks;

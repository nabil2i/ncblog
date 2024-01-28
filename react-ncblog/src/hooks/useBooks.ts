import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import { ArrayData, FetchResponse } from '../services/api-client';
import Book from '../entities/Book';
import bookService from '../services/bookService';
import { useBookQueryStore } from '../store';
import { CACHE_KEY_BOOKS } from './constants';
import { selectCurrentToken } from '../app/features/auth/authSlice';
import { useAppSelector } from '../app/hooks';


const useBooks = () => { 
  const bookQuery = useBookQueryStore(s => s.bookQuery);
  
  const token = useAppSelector(selectCurrentToken);

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
 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
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

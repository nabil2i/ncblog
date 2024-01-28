import { useQuery } from "@tanstack/react-query";
import bookService from "../services/bookService";
import { CACHE_KEY_BOOKS } from "./constants";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";

// const apiClient = new APIClient<Post>('/posts');

const useBook = (id: string) => {
  const token = useAppSelector(selectCurrentToken);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }
  return useQuery({
    queryKey: [CACHE_KEY_BOOKS, id],
    queryFn: () => bookService.get(id, config),
  });
}

export default useBook;

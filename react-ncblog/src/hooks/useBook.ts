import { useQuery } from "@tanstack/react-query";
import bookService from "../services/bookService";
import { CACHE_KEY_BOOKS } from "./constants";

// const apiClient = new APIClient<Post>('/posts');

const useBook = (id: string) =>
  useQuery({
    queryKey: [CACHE_KEY_BOOKS, id],
    queryFn: () => bookService.get(id),
  });

export default useBook;

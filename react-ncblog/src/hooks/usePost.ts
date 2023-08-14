import { useQuery } from "@tanstack/react-query";
import postService from "../services/postService";
import { CACHE_KEY_POSTS } from "./constants";

// const apiClient = new APIClient<Post>('/posts');

const usePost = (id: string) =>
  useQuery({
    queryKey: [CACHE_KEY_POSTS, id],
    queryFn: () => postService.get(id),
  });

export default usePost;

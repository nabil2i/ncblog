import { useQuery } from "@tanstack/react-query";
import postService from "../services/postService";
import { CACHE_KEY_POSTS } from "./constants";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";

// const apiClient = new APIClient<Post>('/posts');

const usePost = (id: string) => {
  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }

  return useQuery({
    queryKey: [CACHE_KEY_POSTS, id],
    queryFn: () => postService.get(id, config),
  });
}

export default usePost;

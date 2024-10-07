import { useQuery } from "@tanstack/react-query";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import postService from "../services/postService";
import { CACHE_KEY_POSTS } from "./constants";
import { FetchResponse } from "../services/api-client";
import Post from "../entities/Post";

// const apiClient = new APIClient<Post>('/posts');

const usePost = (slug: string) => {
  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }

  return useQuery<FetchResponse<Post>>({
    queryKey: [CACHE_KEY_POSTS, slug],
    queryFn: () => postService.get(config, slug),
  });
}

export default usePost;

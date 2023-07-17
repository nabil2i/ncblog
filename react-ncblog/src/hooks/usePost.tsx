import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { CACHE_KEY_POSTS } from "./constants";
import Post from "../entities/Post";

const apiClient = new APIClient<Post>('/posts');

const usePost = (id: string) => useQuery({
  queryKey: [CACHE_KEY_POSTS, id],
  queryFn: () => apiClient.get(id)
})

export default usePost;

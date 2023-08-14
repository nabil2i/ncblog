import { useMutation, useQueryClient } from "@tanstack/react-query";
import Post from "../entities/Post";
import { CACHE_KEY_POSTS } from "./constants";
import APIClient from "../services/api-client";

const useUpdatePost = (id: string,
  onUpdatePost: () => void,
  showToast: () => void,
  showErrorToast: () => void,
  ) => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<Post, Post>(`/posts/${id}`);
  
  return useMutation<Post, Error, Post>({
    mutationFn:  apiClient.put,
    onSuccess: (savedPost, newPost) => {
     onUpdatePost();
      showToast();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })
    },
    onError: (error, newPost, context) => {
      showErrorToast();
    },
  });
}

export default useUpdatePost;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Post from "../entities/Post";
import postService from "../services/postService";
import { CACHE_KEY_POSTS } from "./constants";

const useCreatePost = (
  onCreatePost: () => void,
  showToast: () => void,
  showErrorToast: () => void,
  ) => {
  const queryClient = useQueryClient();
  
  const createPost = useMutation<Post, Error, Post>({
    mutationFn: postService.post,

    onSuccess: (savedPost, newPost) => {
     onCreatePost();
      showToast();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })

    },
    onError: (error, newPost, context) => {
      showErrorToast();
    },
  });

  return createPost;
}

export default useCreatePost;

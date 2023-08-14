import { useMutation, useQueryClient } from "@tanstack/react-query";
import Post from "../entities/Post";
import postService from "../services/postService";
import { CACHE_KEY_POSTS } from "./constants";

const useDeletePost = (
  onDeletePost: () => void,
  showToast: () => void,
  showErrorToast: () => void,
  ) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: postService.delete,

    onSuccess: (savedPost, newPost) => {
     onDeletePost();
      showToast();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })
    },
    onError: (error, newPost, context) => {
      showErrorToast();
    },
  });

}

export default useDeletePost;

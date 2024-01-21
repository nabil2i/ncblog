import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from 'axios';
import Post from "../entities/Post";
import postService from "../services/postService";
import { FetchError, FetchResponse } from './../services/api-client';
import { CACHE_KEY_POSTS } from "./constants";
import { PostFormData } from "../components/admin/posts/PostForm";

const useCreatePost = (
  onCreatePost: () => void,
  showToast: () => void,
  showErrorToast: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  
  const createPost = useMutation<FetchResponse<Post>, AxiosError, PostFormData>({
    mutationFn: postService.post,

    onSuccess: (savedPost, newPost) => {
     onCreatePost();
      showToast();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })

    },
    onError: (error: AxiosError, newPost, context) => {
      const responseData = error.response?.data as FetchError
      const errorMessage = responseData.error.message
      showErrorToast(errorMessage);
    },
  });

  return createPost;
}

export default useCreatePost;

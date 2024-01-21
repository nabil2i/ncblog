import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from 'axios';
import Post from "../entities/Post";
import APIClient, { FetchError } from "../services/api-client";
import { FetchResponse } from './../services/api-client';
import { CACHE_KEY_POSTS } from "./constants";
import { PostFormData } from "../components/admin/posts/PostForm";

const useUpdatePost = (postId: string,
  onUpdatePost: () => void,
  showToast: () => void,
  showErrorToast: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<Post, PostFormData>(`/posts/${postId}`);
  
  return useMutation<FetchResponse<Post>, AxiosError, PostFormData>({
    mutationFn:  apiClient.put,
    onSuccess: (savedPost, newPost) => {
      onUpdatePost();
      showToast();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })
    },
    onError: (error: AxiosError, newPost, context) => {
      const responseData = error.response?.data as FetchError
      const errorMessage = responseData.error.message
      showErrorToast(errorMessage);
    },
  });
}

export default useUpdatePost;

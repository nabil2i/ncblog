import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from 'axios';
import Post from "../entities/Post";
import APIClient from "../services/api-client";
import { FetchResponse } from './../services/api-client';
import { CACHE_KEY_POSTS } from "./constants";

const useUpdatePost = (postId: string,
  onUpdatePost: () => void,
  showToast: () => void,
  showErrorToast: () => void,
  ) => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<Post, Post>(`/posts/${postId}`);
  
  return useMutation<FetchResponse<Post>, AxiosError, Post>({
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

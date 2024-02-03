import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from 'axios';
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import Post, { PostFormData } from "../entities/Post";
import APIClient, { FetchError } from "../services/api-client";
import { FetchResponse } from './../services/api-client';
import { CACHE_KEY_USER_POSTS } from "./constants";

const useUpdateUserPost = (postId: string,
  userId: string,
  onSuccessUpdate: () => void,
  onErrorUpdate: (errorMessage: string) => void,
  ) => {

  const queryClient = useQueryClient();
  const apiClient = new APIClient<Post, PostFormData>(`/posts/${postId}/${userId}`);

  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }
  
  return useMutation<FetchResponse<Post>, AxiosError, PostFormData>({
    mutationFn: (data) => apiClient.put(data, config),
    onSuccess: () => {
      onSuccessUpdate();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER_POSTS] })
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as FetchError
      const errorMessage = responseData.message
      onErrorUpdate(errorMessage);
    },
  });
}

export default useUpdateUserPost;


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from 'axios';
import Post, { PostFormData } from "../entities/Post";
import postService from "../services/postService";
import { FetchError, FetchResponse } from './../services/api-client';
import { CACHE_KEY_POSTS } from "./constants";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";

const useCreatePost = (
  onSuccessCreate: () => void,
  onErrorCreate: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  
  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }
  const createPost = useMutation<FetchResponse<Post>, AxiosError, PostFormData>({
    mutationFn: (data) => postService.post(data, config),

    onSuccess: () => {
     onSuccessCreate();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })

    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as FetchError
      const errorMessage = responseData.message
      onErrorCreate(errorMessage);
    },
  });

  return createPost;
}

export default useCreatePost;

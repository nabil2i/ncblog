import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import { FetchError } from "../services/api-client";
import postService from "../services/postService";
import { CACHE_KEY_USER_POSTS } from "./constants";

const useDeleteUserPost = (
  // onDeletePost: () => void,
  onSuccessDelete: () => void,
  onErrorDelete: (errorMessage: string) => void,
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
  return useMutation({
    mutationFn: ({id, userId} : {id: string, userId?: string}) => postService.delete(id, config, userId),

    onSuccess: () => {
    //  onDeletePost();
      onSuccessDelete();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER_POSTS] })
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as FetchError;
      const errorMessage = responseData.message

      onErrorDelete(errorMessage);
    },
  });

}

export default useDeleteUserPost;

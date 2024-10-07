import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FetchError } from "../services/api-client";
import postService from "../services/postService";
import { CACHE_KEY_POSTS } from "./constants";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";

const useDeletePost = (
  postId: string,
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
    mutationFn: () => postService.deleteItem(config, postId),
    // mutationFn: ({id, userId} : {id: string, userId?: string}) => postService.delete(config, id, userId),

    onSuccess: () => {
    //  onDeletePost();
      onSuccessDelete();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as FetchError;
      const errorMessage = responseData.message

      onErrorDelete(errorMessage);
    },
  });

}

export default useDeletePost;

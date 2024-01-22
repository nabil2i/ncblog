import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FetchError } from "../services/api-client";
import postService from "../services/postService";
import { CACHE_KEY_POSTS } from "./constants";

const useDeletePost = (
  // onDeletePost: () => void,
  onDeleteSuccess: () => void,
  onDeleteError: (errorMessage: string) => void,
  ) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: postService.delete,

    onSuccess: () => {
    //  onDeletePost();
      onDeleteSuccess();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })
    },
    onError: (error: AxiosError) => {
      const responseData = error.response?.data as FetchError;
      const errorMessage = responseData.error.message

      // Handle the error and show an error toast
      onDeleteError(errorMessage);
    },
  });

}

export default useDeletePost;

import { useMutation, useQueryClient } from "@tanstack/react-query"
import APIClient, { FetchResponse } from "../services/api-client";
import Comment, { CommentForm } from "../entities/Comment";
import { AxiosError } from "axios";
import { CACHE_KEY_POSTS } from "./constants";

const useCreateComment = (
  postId: string,
  onCreateComment: () => void,
  ) => {
  const apiClient = new APIClient<Comment, CommentForm>(`/posts/${postId}/comments`);
  const queryClient = useQueryClient();

  const createComment = useMutation<FetchResponse<Comment>, AxiosError, CommentForm>({
    mutationFn: apiClient.post,
    onSuccess: (savedComment, newComment) => {
      // console.log(savedComment.data)
      onCreateComment();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS] })
    },
    onError: (error, newComment, context) => {
      // console.log(error)
    },
  });

  return createComment;
}

export default useCreateComment
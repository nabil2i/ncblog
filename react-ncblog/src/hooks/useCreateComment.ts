import { useMutation, useQueryClient } from "@tanstack/react-query"
import APIClient, { FetchResponse } from "../services/api-client";
import Comment, { CommentForm } from "../entities/Comment";
import { AxiosError } from "axios";
import { CACHE_KEY_COMMENTS, CACHE_KEY_POSTS } from "./constants";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";

const useCreateComment = (
  postId: string,
  onSuccessCreate: () => void,
  ) => {
  const apiClient = new APIClient<Comment, CommentForm>(`/posts/${postId}/comments`);
  const queryClient = useQueryClient();

  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }
  const createComment = useMutation<FetchResponse<Comment>, AxiosError, CommentForm>({
    mutationFn: (data) => apiClient.post(data, config),
    onSuccess: () => {
      onSuccessCreate();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_COMMENTS, postId] })
    },
    onError: () => {
      // console.log(error)
    },
  });

  return createComment;
}

export default useCreateComment

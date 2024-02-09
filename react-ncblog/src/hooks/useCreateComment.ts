import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import Comment, { CommentForm } from "../entities/Comment";
import APIClient, { FetchResponse } from "../services/api-client";
import { CACHE_KEY_COMMENTS } from "./constants";

const useCreateComment = (
  postId: string,
  slug: string,
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
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_COMMENTS, slug]})
    },
    onError: () => {
      // console.log(error)
    },
  });

  return createComment;
}

export default useCreateComment

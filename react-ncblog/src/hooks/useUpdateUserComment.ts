import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import Comment, { CommentForm } from "../entities/Comment";
import APIClient, { FetchResponse } from "../services/api-client";
import { CACHE_KEY_POSTS } from "./constants";

const useUpdateUserComment = (
  postId: string,
  slug: string,
  commentId: string,
  userId: string,
  onSuccessCreate: () => void,
  ) => {
  const apiClient = new APIClient<Comment, CommentForm>(`/posts/${postId}/comments/${commentId}/${userId}`);
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
    mutationFn: (data) => apiClient.put(data, config),
    onSuccess: () => {
      onSuccessCreate();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS, slug]})
    },
    onError: () => {
      // console.log(error)
    },
  });

  return createComment;
}

export default useUpdateUserComment

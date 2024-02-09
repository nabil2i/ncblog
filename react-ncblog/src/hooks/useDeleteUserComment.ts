import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import Comment from "../entities/Comment";
import APIClient, { FetchResponse } from "../services/api-client";
import { CACHE_KEY_COMMENTS } from "./constants";

interface DeleteCommentForm {
  commentId: string;
  commenterId: string;
}

const useDeleteUserComment = (
  postId: string,
  slug: string,
  onSuccessCreate: () => void,
  ) => {
  const apiClient = new APIClient<FetchResponse<Comment>, DeleteCommentForm>(`/posts/${postId}/comments`);
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
    mutationFn: ({ commentId, commenterId}: DeleteCommentForm) => apiClient.delete(commentId, config, commenterId),
    onSuccess: () => {
      onSuccessCreate();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_COMMENTS, slug]})
    },
    onError: () => {
      // console.log(error)
    },
  });
}

export default useDeleteUserComment

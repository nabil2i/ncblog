import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import Comment from "../entities/Comment";
import APIClient, { FetchResponse } from "../services/api-client";
import { CACHE_KEY_COMMENTS } from "./constants";
import { usePostCommentQueryStore } from "../store";

// interface DeleteCommentForm {
//   commentId: string;
//   // commenterId: string;
// }

const useDeleteComment = (
  postId: string,
  commentId: string,
  onSuccessCreate: () => void,
  ) => {
  const apiClient = new APIClient<FetchResponse<Comment>, void>(`/posts/${postId}/comments/${commentId}`);
  const queryClient = useQueryClient();
  const postCommentQuery = usePostCommentQueryStore(s => s.postCommentQuery);

  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }
  return useMutation({
    mutationFn: () => apiClient.delete(config),
    // mutationFn: ({ commentId, commenterId}: DeleteCommentForm) => apiClient.delete(commentId, config, commenterId),
    onSuccess: () => {
      onSuccessCreate();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_COMMENTS, postId, postCommentQuery]})
    },
    onError: () => {
      // console.log(error)
    },
  });
}

export default useDeleteComment

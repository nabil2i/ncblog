import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import { CommentLikeStatus } from "../entities/Comment";
import APIClient, { CustomAxiosError } from "../services/api-client";
import { CACHE_KEY_COMMENT_LIKE_STATUS } from "./constants";

const useLikeUnlikeComment = (
  commentId: string,
  onSuccessLikeUnlikeComment: () => void,
  onErrorLikeUnlikeComment: (errorMessage: string) => void
  ) => {
  const apiClient = new APIClient(`/comments/${commentId}/like`);
  const queryClient = useQueryClient();

  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }
  const likeUnlikeComment = useMutation({
  // const likeUnlikeComment = useMutation<FetchResponse<CommentLikeStatus>, CustomAxiosError, void>({
    mutationFn: () => apiClient.put({}, config),

    // Optimistic update: immediately update like status on the frontend
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite optimistic updates)
      await queryClient.cancelQueries({ queryKey: [commentId, CACHE_KEY_COMMENT_LIKE_STATUS] });

      // Snapshot previous likeCount and status
      const previousData = queryClient.getQueryData<CommentLikeStatus>([commentId, CACHE_KEY_COMMENT_LIKE_STATUS]);

      // Optimistically update the cache
      queryClient.setQueryData([commentId, CACHE_KEY_COMMENT_LIKE_STATUS], (oldData: CommentLikeStatus | undefined) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          likeCount: oldData.hasLiked ? oldData.likeCount - 1 : oldData.likeCount + 1,
          hasLiked: !oldData.hasLiked,
        }
      });

      // Return previous data for rollback on error
      return { previousData };
    },
    // onSuccess: () => {
    //   onSuccessLikeUnlikeComment();
    //   queryClient.invalidateQueries({ queryKey: [commentId, CACHE_KEY_COMMENT_LIKE_STATUS]})
    // },
    onError: (error: CustomAxiosError, _variables, context) => {
      // Roll back to previous data if mutation fails
      queryClient.setQueryData([commentId, CACHE_KEY_COMMENT_LIKE_STATUS], context?.previousData);

      const errorMessage = error.response?.data.data.message
      onErrorLikeUnlikeComment(errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries([commentId, CACHE_KEY_COMMENT_LIKE_STATUS]);
      onSuccessLikeUnlikeComment();
    },
  });

  return likeUnlikeComment;
}

export default useLikeUnlikeComment

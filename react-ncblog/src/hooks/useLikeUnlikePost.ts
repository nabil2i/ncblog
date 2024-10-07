import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import { PostLikeStatus } from "../entities/Post";
import APIClient, { CustomAxiosError } from "../services/api-client";
import { CACHE_KEY_POST_LIKE_STATUS } from "./constants";

const useLikeUnlikePost = (
  postId: string,
  // slug: string,
  // onSuccessLikeUnlikePost: () => void,
  onErrorLikeUnlikePost: (errorMessage: string) => void
  ) => {
  const apiClient = new APIClient(`/posts/${postId}/like`);
  const queryClient = useQueryClient();

  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }
  const likeUnlikePost = useMutation({
  // const likeUnlikePost = useMutation<FetchResponse<PostLikeStatus>, CustomAxiosError, void>({
    mutationFn: () => apiClient.put({}, config),

    // Optimistic update: immediately update like status on the frontend
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite optimistic updates)
      await queryClient.cancelQueries({ queryKey: [postId, CACHE_KEY_POST_LIKE_STATUS] });

      // Snapshot previous likeCount and status
      const previousData = queryClient.getQueryData<PostLikeStatus>([postId, CACHE_KEY_POST_LIKE_STATUS]);

      // Optimistically update the cache
      queryClient.setQueryData([postId, CACHE_KEY_POST_LIKE_STATUS], (oldData: PostLikeStatus | undefined) => {
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
    //   onSuccessLikeUnlikePost();
    //   queryClient.invalidateQueries({ queryKey: [postId, CACHE_KEY_POST_LIKE_STATUS]})
    // },
    onError: (error: CustomAxiosError, _variables, context) => {
      // Roll back to previous data if mutation fails
      queryClient.setQueryData([postId, CACHE_KEY_POST_LIKE_STATUS], context?.previousData);

      const errorMessage = error.response?.data.data.message
      onErrorLikeUnlikePost(errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries([postId, CACHE_KEY_POST_LIKE_STATUS]);
    },
  });

  return likeUnlikePost;
}

export default useLikeUnlikePost

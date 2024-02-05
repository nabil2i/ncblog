import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import APIClient from "../services/api-client";
import { CACHE_KEY_POSTS } from "./constants";

const useLikeComment = (
  commentId: string,
  slug: string,
  onSuccessLikeComment: () => void
  ) => {
  const apiClient = new APIClient(`/comments/like/${commentId}`);
  const queryClient = useQueryClient();
  // console.log("commentId from mutation", commentId)

  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }
  const createComment = useMutation({
    mutationFn: (data) => apiClient.put(data, config),
    onSuccess: () => {
      onSuccessLikeComment();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS, slug]})
    },
    onError: () => {
      // console.log(error)
    },
  });

  return createComment;
}

export default useLikeComment

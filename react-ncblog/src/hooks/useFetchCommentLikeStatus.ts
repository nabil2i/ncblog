import { useQuery } from "@tanstack/react-query";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import { CommentLikeStatus } from "../entities/Comment";
import APIClient, { CustomAxiosError, FetchResponse } from "../services/api-client";
import { CACHE_KEY_COMMENT_LIKE_STATUS } from "./constants";


const useFetchCommentLikeStatus = (
  commentId: string,
  ) => {
  const apiClient = new APIClient<CommentLikeStatus, void>(`/comments/${commentId}/like-status`);

  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }
  // return useQuery({
  return useQuery<FetchResponse<CommentLikeStatus>, CustomAxiosError>({
    queryKey: [commentId, CACHE_KEY_COMMENT_LIKE_STATUS],
    queryFn: () => apiClient.get(config),
    staleTime: 5 * 60 * 1000,
  });
}

export default useFetchCommentLikeStatus

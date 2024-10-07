import { useQuery } from "@tanstack/react-query";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import { PostLikeStatus } from "../entities/Post";
import APIClient, { CustomAxiosError, FetchResponse } from "../services/api-client";
import { CACHE_KEY_POST_LIKE_STATUS } from "./constants";


const useFetchPostLikeStatus = (
  postId: string,
  ) => {
  const apiClient = new APIClient<PostLikeStatus, void>(`/posts/${postId}/like-status`);

  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }
  // return useQuery({
  return useQuery<FetchResponse<PostLikeStatus>, CustomAxiosError>({
    queryKey: [postId, CACHE_KEY_POST_LIKE_STATUS],
    queryFn: () => apiClient.get(config),
    staleTime: 5 * 60 * 1000,
  });
}

export default useFetchPostLikeStatus

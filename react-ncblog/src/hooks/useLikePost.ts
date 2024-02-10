import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import APIClient from "../services/api-client";
import { CACHE_KEY_POSTS } from "./constants";

const useLikePost = (
  postId: string,
  slug: string,
  onSuccessLikePost: () => void
  ) => {
  const apiClient = new APIClient(`/posts/${postId}/like`);
  const queryClient = useQueryClient();
  // console.log("postId from mutation", postId)

  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }
  const createPost = useMutation({
    mutationFn: (data) => apiClient.put(data, config),
    onSuccess: () => {
      onSuccessLikePost();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_POSTS, slug]})
    },
    onError: () => {
      // console.log(error)
    },
  });

  return createPost;
}

export default useLikePost

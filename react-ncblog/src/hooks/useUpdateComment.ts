import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import Comment, { CommentForm } from "../entities/Comment";
import APIClient, { FetchResponse } from "../services/api-client";
import { CACHE_KEY_COMMENTS } from "./constants";
import { usePostCommentQueryStore } from "../store";

const useUpdateComment = (
  postId: string,
  commentId: string,
  // userId: string,
  onSuccessCreate: (comment?: Comment) => void,
  ) => {
  const apiClient = new APIClient<Comment, CommentForm>(`/posts/${postId}/comments/${commentId}`);
  // const apiClient = new APIClient<Comment, CommentForm>(`/posts/${postId}/comments/${commentId}/${userId}`);
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
  const createComment = useMutation<FetchResponse<Comment>, AxiosError, CommentForm>({
    mutationFn: (data) => apiClient.put(data, config),
    onSuccess: (responseData: FetchResponse<Comment>) => {
      onSuccessCreate(responseData.data);
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_COMMENTS, postId, postCommentQuery]})
    },
    onError: () => {
      // console.log(error)
    },
  });

  return createComment;
}

export default useUpdateComment;

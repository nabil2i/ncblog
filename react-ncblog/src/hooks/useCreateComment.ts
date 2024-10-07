import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { selectCurrentToken } from "../app/features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import Comment, { CommentForm } from "../entities/Comment";
import APIClient, { CustomAxiosError, FetchResponse } from "../services/api-client";
import { useCommentRepliesQueryStore, usePostCommentQueryStore } from "../store";
import { CACHE_KEY_COMMENT_REPLIES, CACHE_KEY_COMMENTS } from "./constants";

const useCreateComment = (
  postId: string,
  onSuccessCreate: (newReply?: Comment) => void,
  onErrorCreate: (error: AxiosError) => void
  ) => {
  const apiClient = new APIClient<Comment, CommentForm>(`/posts/${postId}/comments`);
  const queryClient = useQueryClient();
  const postCommentQuery = usePostCommentQueryStore(s => s.postCommentQuery);
  const commentRepliesQuery = useCommentRepliesQueryStore(s => s.commentRepliesQuery);

  const token = useAppSelector(selectCurrentToken);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  }
  const createComment = useMutation<FetchResponse<Comment>, CustomAxiosError, CommentForm>({
    mutationFn: (data) => apiClient.post(data, config),
    onSuccess: (res) => {
      onSuccessCreate(res.data);
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_COMMENTS, postId, postCommentQuery]});
      const topParentCommentId = res.data.topParentCommentId;
  

      if (topParentCommentId) {
        queryClient.invalidateQueries({ queryKey: [CACHE_KEY_COMMENT_REPLIES, topParentCommentId, commentRepliesQuery]});
      }
    },
    onError: (error: CustomAxiosError) => {
      onErrorCreate(error)
      // console.log(error);
    },
  });

  return createComment;
}

export default useCreateComment

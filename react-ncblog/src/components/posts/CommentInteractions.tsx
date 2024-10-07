import { Flex } from "@chakra-ui/react";
import { PostComment } from "../../entities/Post";
import DeleteCommentButton from "./DeleteCommentButton";
import EditCommentButton from "./EditCommentButton";
import ReplyCommentButton from "./ReplyCommentButton";

interface Props {
  comment: PostComment;
  focusCommentId: string;
  postId: string;
  setRealParentCommentId: (value: string) => void;
  setTopParentCommentId: (value: string) => void;
  setIsEditing: (value: boolean) => void;
  setEditedContent: (value: string) => void;
  setFocusCommentId: (value: string) => void;
  setIsReplying: (value: boolean) => void;
  onOpen: () => void;
}

const CommentInteractions = ({
  comment,
  focusCommentId,
  setFocusCommentId,
  setIsEditing,
  postId,
  onOpen,
  setEditedContent,
  setRealParentCommentId,
  setTopParentCommentId,
  setIsReplying
}: Props) => {
  return (
    <>
      <Flex gap={2}>
        <ReplyCommentButton
          setFocusCommentId={setFocusCommentId}
          comment={comment}
          postId={postId}
          onOpen={onOpen}
          setRealParentCommentId={setRealParentCommentId}
          setTopParentCommentId={setTopParentCommentId}
          setIsReplying={setIsReplying}
        />

        <EditCommentButton
          comment={comment}
          setIsEditing={setIsEditing}
          setEditedContent={setEditedContent}
          onOpen={onOpen}
          // setCommentOwnerId={setCommentOwnerId}
          setFocusCommentId={setFocusCommentId}
        />

        <DeleteCommentButton
          comment={comment}
          postId={postId}
          focusCommentId={focusCommentId}
          setFocusCommentId={setFocusCommentId}
        />
      </Flex>
    </>
  );
};

export default CommentInteractions;

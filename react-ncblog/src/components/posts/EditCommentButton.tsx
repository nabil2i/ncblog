import { authSatus } from "../../app/features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import { PostComment } from "../../entities/Post";
import useAuth from "../../hooks/useAuth";
import { CustomButton } from "../common/CustomButton";

interface Props {
  comment: PostComment;
  // isEditing: boolean;
  // setCommentOwnerId: (value: string) => void;
  setIsEditing: (value: boolean) => void;
  setEditedContent: (value: string) => void;
  setFocusCommentId: (value: string) => void;
  onOpen: () => void;
}
const EditCommentButton = ({
  comment,
  setIsEditing,
  // setCommentOwnerId,
  setEditedContent,
  onOpen,
  setFocusCommentId,
}: Props) => {
  const isAuthenticated = useAppSelector(authSatus);
  const { _id, privilegelevel } = useAuth();

  // const toast = useToast();

  const handleEditComment = async (
    commentId: string,
    // ownerId: string,
    content: string
  ) => {
    if (isAuthenticated) {
      setFocusCommentId(commentId);
      // setCommentOwnerId(ownerId);
      setIsEditing(true);
      setEditedContent(content);
    } else {
      onOpen();
    }
  };

  return (
    <>
      {isAuthenticated &&
        (_id === comment?.userId?._id || privilegelevel === "superdmin") && (
          <CustomButton
            color="teal.200"
            onClick={() => {
              handleEditComment(comment._id, comment.text);
              // handleEditComment(comment._id, comment.userId._id, comment.text);
            }}
            text={"Edit"}
          />
        )}
    </>
  );
};

export default EditCommentButton;

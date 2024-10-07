import { authSatus } from "../../app/features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import { PostComment } from "../../entities/Post";
import { CustomButton } from "../common/CustomButton";

interface Props {
  comment: PostComment;
  postId: string;
  setRealParentCommentId: (value: string) => void;
  setTopParentCommentId: (value: string) => void;
  setFocusCommentId: (value: string) => void;
  setIsReplying: (value: boolean) => void;
  onOpen: () => void;
}
const ReplyCommentButton = ({
  comment,
  setTopParentCommentId,
  setRealParentCommentId,
  onOpen,
  setFocusCommentId,
  setIsReplying,
}: Props) => {
  const isAuthenticated = useAppSelector(authSatus);

  const handleReply = (
    theRealParentCommentId: string,
    theTopParentCommentId: string
  ) => {
    if (isAuthenticated) {
      setIsReplying(true);
      setFocusCommentId(comment._id);
      setRealParentCommentId(theRealParentCommentId);
      setTopParentCommentId(theTopParentCommentId);
    } else {
      onOpen();
    }
  };

  return (
    <>
      {isAuthenticated && (
        <CustomButton
          onClick={() => {
            // if replying to a 1st level comment, topParent and realParent are the same for the reply
            if (!comment.topParentCommentId)
              handleReply(comment._id, comment._id);
            // for a reply, topParent and realParent are different
            else handleReply(comment._id, comment.topParentCommentId);
          }}
          text={"Reply"}
        />
      )}
    </>
  );
};

export default ReplyCommentButton;

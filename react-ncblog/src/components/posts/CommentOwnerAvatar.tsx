import { Avatar } from "@chakra-ui/react";
import { PostComment } from "../../entities/Post";

interface Props {
  comment: PostComment;
}

const CommentOwnerAvatar = ({ comment }: Props) => {
  return (
    <Avatar
      src={comment?.userId?.img}
      size={!comment.topParentCommentId ? "lg" : "md"}
      className="cursor-pointer"
      referrerPolicy="no-referrer"
    />
  );
};

export default CommentOwnerAvatar;

import { MenuItem, Spinner } from "@chakra-ui/react";
import Post from "../../entities/Post";

interface Props {
  isSubmittingPost: boolean;
  post?: Post;
}
const UpdatePostAction = ({ isSubmittingPost, post }: Props) => {
  return (
    <MenuItem disabled={isSubmittingPost} type="submit">
      {post ? "Update post" : "Create a post"}
      {isSubmittingPost && <Spinner />}
    </MenuItem>
  );
};

export default UpdatePostAction;

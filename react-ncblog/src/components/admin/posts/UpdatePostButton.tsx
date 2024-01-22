import { Button, Spinner } from "@chakra-ui/react";
import Post from "../../../entities/Post";

interface Props {
  isSubmittingPost: boolean;
  post?: Post;
}
const UpdatePostButton = ({ isSubmittingPost, post }: Props) => {
  return (
    <Button disabled={isSubmittingPost} type="submit" colorScheme="green">
      {post ? "Update post" : "Create a post"}
      {isSubmittingPost && <Spinner />}
    </Button>
  );
};

export default UpdatePostButton;

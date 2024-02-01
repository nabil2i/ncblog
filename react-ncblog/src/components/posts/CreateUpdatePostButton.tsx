import { Button, Spinner } from "@chakra-ui/react";
import Post from "../../entities/Post";

interface Props {
  isSubmittingPost: boolean;
  post?: Post;
}
const CreateUpdatePostButton = ({ isSubmittingPost, post }: Props) => {
  return (
    <Button disabled={isSubmittingPost} size="lg" type="submit" colorScheme="gray">
      {post ? "Update post" : "Create a post"}
      {isSubmittingPost && <Spinner />}
    </Button>
  );
};

export default CreateUpdatePostButton;

import { Button, Link } from "@chakra-ui/react";

const EditPostButton = ({ postId }: { postId: string }) => {
  // console.log("post id in edit button: ", postId)
  return (
    <Link href={`/admin/posts/edit/${postId}`}>
      <Button colorScheme="gray">
        {/* <FaEdit /> */}
        Edit Post
      </Button>
    </Link>
  );
};

export default EditPostButton;

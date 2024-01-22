import { Button, Link } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

const EditPostButton = ({ postId }: { postId: string }) => {
  // console.log("post id in edit button: ", postId)
  return (
    <Link href={`/admin/posts/edit/${postId}`}>
      <Button colorScheme="green">
        <FaEdit />
        Edit
      </Button>
    </Link>
  );
};

export default EditPostButton;

import { Button, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const EditPostButton = ({ postId }: { postId: string }) => {
  // console.log("post id in edit button: ", postId)
  return (
    <Link
      as={NavLink}
      _hover={{ textDecoration: "none" }}
      to={`/dashboard/posts/edit/${postId}`}
    >
      <Button colorScheme="gray">
        {/* <FaEdit /> */}
        Edit Post
      </Button>
    </Link>
  );
};

export default EditPostButton;

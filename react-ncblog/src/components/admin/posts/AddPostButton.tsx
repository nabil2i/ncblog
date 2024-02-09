import { Button, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const AddPostButton = () => {
  // console.log("post id in Add button: ", postId)
  return (
    <Link
      as={NavLink}
      _hover={{ textDecoration: "none" }}
      to={`/dashboard/posts/new`}
    >
      {/* <Link href={`/admin/posts/new`}> */}
      <Button colorScheme="gray">Create a post</Button>
    </Link>
  );
};

export default AddPostButton;

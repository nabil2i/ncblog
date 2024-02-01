import { Button, Link } from "@chakra-ui/react";

const AddPostButton = () => {
  // console.log("post id in Add button: ", postId)
  return (
    <Link href={`/dashboard/posts/new`}>
    {/* <Link href={`/admin/posts/new`}> */}
      <Button colorScheme="gray">Create a post</Button>
    </Link>
  );
};

export default AddPostButton;

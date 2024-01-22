import { Box } from "@chakra-ui/react";
import PostForm from "../components/posts/PostForm";

const AddPostPage = () => {
  return (
    <>
      <Box pt={"80px"}>
        <PostForm />
      </Box>
    </>
  );
};

export default AddPostPage;

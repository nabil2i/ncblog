import { Box } from "@chakra-ui/react";
import PostForm from "../../components/posts/PostForm";
import useTitle from "../../hooks/useTitle";

const AddPostPage = () => {
  useTitle("Nabil Conveys - Write a post");

  return (
    <>
      <Box pt={"80px"} as="section">
        <PostForm />
      </Box>
    </>
  );
};

export default AddPostPage;

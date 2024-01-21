import { Text, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import PostForm from "../components/posts/PostForm";
import usePost from "../hooks/usePost";


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

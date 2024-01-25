import { Text, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import PostForm from "../components/posts/PostForm";

const EditPostPage = () => {
  const { id: postId } = useParams();
  // console.log("post id on edit page: ", postId)
  const { data: payload, error } = usePost(postId as string);
  const post = payload?.data;

  if (error || !post) {
    return (
      <Text py={8} textAlign={"center"}>
        {" "}
        We encountered a problem. Please retry later.
      </Text>
    );
  }

  return (
    <>
      <Box pt={"80px"} as="section">
        <PostForm post={post} />
      </Box>
    </>
  );
};

export default EditPostPage;

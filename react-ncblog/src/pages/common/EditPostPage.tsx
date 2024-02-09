import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import PostForm from "../../components/posts/PostForm";
import usePost from "../../hooks/usePost";
import useTitle from "../../hooks/useTitle";

const EditPostPage = () => {
  const { id: postId } = useParams();
  // console.log("post id on edit page: ", postId)
  const { data: payload, error } = usePost(postId as string);
  const post = payload?.data;

  useTitle("Nabil Conveys - Edit Post");

  if (error) {
    return (
      <Text py={8} textAlign={"center"}>
        {" "}
        We encountered a problem. Please retry later.
      </Text>
    );
  }

  return (
    <>
      <Box pt={"60px"} as="section">
        <PostForm post={post} />
      </Box>
    </>
  );
};

export default EditPostPage;

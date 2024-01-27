import { Box, Flex, Spinner, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import BlogPostDetails from "../components/posts/BlogPostDetails";
import usePost from "../hooks/usePost";

const PostPage = () => {
  const { id } = useParams();
  const { data: payload, isLoading, error } = usePost(id as string);
  // console.log(payload);
  const post = payload?.data;
  // console.log(post)

  if (isLoading)
    return (
      <Box p={10}>
        <VStack marginTop={2}>
          <Spinner />
        </VStack>
      </Box>
    );

  if (error || !post) throw error;

  return (
    <>
      <Box
        w="full"
        mx="auto"
        maxW="800px"
        p={4}>
        <BlogPostDetails post={post} />
      </Box>
    
      {/* <Flex direction="column" mt={8} align="center">
        <Box width="5%" display={{ base: "none", lg: "flex" }}></Box>

        <Box width="90%" maxW="680px">
          <BlogPostDetails post={post} />
        </Box>

        <Box width="5%" display={{ base: "none", lg: "flex" }}></Box>
      </Flex> */}
    </>
  );
};

export default PostPage;

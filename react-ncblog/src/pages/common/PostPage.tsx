import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import BlogPostDetails from "../../components/posts/BlogPostDetails";
import LatestPosts from "../../components/posts/LatestPosts";
import usePost from "../../hooks/usePost";
import useTitle from "../../hooks/useTitle";

const PostPage = () => {
  const { slug } = useParams();
  // const { id } = useParams();
  // const { data: payload, isLoading, error } = usePost(id as string);
  const { data: payload, isLoading, error } = usePost(slug as string);
  // console.log(payload)
  // console.log(payload);
  const post = payload?.data;
  // const post = payload?.data?.results[0];
  // console.log(post)

  useTitle(`${post?.title}` || "Nabil Conveys - Post");

  if (isLoading)
    return (
      <Flex justify="center" align="center" minH="100vh">
        {/* <VStack marginTop={2}> */}
        <Spinner />
        {/* </VStack> */}
      </Flex>
    );

  if (error || !post) throw error;

  return (
    <>
      <Box w="full" mx="auto" maxW="800px" p={4}>
        <BlogPostDetails post={post} />
      </Box>
      <Box w="full" mx="auto" maxW="1440px" p={4}>
        <LatestPosts />
      </Box>
      {/* <Box maxW="4xl" mx="auto" w="full">
        <CallToAction />
      </Box> */}

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

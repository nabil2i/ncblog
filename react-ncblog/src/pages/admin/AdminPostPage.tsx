import { Box, Flex, Grid, GridItem, Spinner, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import DeletePostButton from "../../components/admin/posts/DeletePostButton";
import EditPostButton from "../../components/admin/posts/EditPostButton";
import BlogPostDetails from "../../components/posts/BlogPostDetails";
import Post from "../../entities/Post";
import usePost from "../../hooks/usePost";

const AdminPostPage = () => {
  const { id } = useParams();
  // console.log(id)
  const { data: payload, isLoading, error } = usePost(id as string);
  const post = payload?.data;
  // console.log(post);

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
      {/* <Box
        w="full"
        mx="auto"
        maxW="800px"
        p={4}>

      </Box> */}


      <Grid
        gap={2}
        templateAreas={{ base: `"side" "main"`, lg: `"main side"` }}
        templateColumns={{ base: "1fr", lg: "2f 1fr" }}
      >
        <GridItem area="main" p={4}>
          <BlogPostDetails post={post as Post} />
        </GridItem>

        <GridItem area="side">
          <Flex direction={{ base: "row", lg: "column" }} gap="4">
            <EditPostButton postId={post._id as string} />
            <DeletePostButton postId={post._id as string} />
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

export default AdminPostPage;

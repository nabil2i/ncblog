import { Box, Grid, GridItem, Spinner, VStack } from "@chakra-ui/react";
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
      <Grid
        gap={2}
        templateAreas={{ base: `"side1" "main" "side2"`, lg: `"side1 main side2"` }}
        templateColumns={{ base: "1fr", lg: "1fr 2fr 1fr" }}
      >
        <GridItem area="main" py={4} px={8}>
          <BlogPostDetails post={post} />
        </GridItem>

        {/* <GridItem area="side">
          <Text>Categories</Text>
        </GridItem> */}
      </Grid>
    </>
  );
};

export default PostPage;

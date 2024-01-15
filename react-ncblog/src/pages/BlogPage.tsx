import { Box, Flex, Grid, Text, GridItem, VStack, Center } from "@chakra-ui/react";
import PostGrid from "../components/posts/PostGrid";
import PostHeading from "../components/posts/PostsHeading";
import usePostQueryStore from "../store";
import PageHeading from "../components/common/PageHeading";

const BlogPage = () => {
  const setPage = usePostQueryStore((s) => s.setPage);

  return (
    <Box 
    // mt={{ base: "50px", }}
    >
      <Grid
        templateAreas={{ base: `"main"`}}
        templateColumns={{ base: "1fr"}}
      >
        <GridItem area="main">
          {/* <VStack>
          <Headline></Headline>
          <Hero></Hero>
        </VStack> */}

          <VStack as="section">
            
              {/* <Box> <PostHeading /> </Box> */}
              <PageHeading title={"Posts"}/>
              <PostGrid
                paginate={(page) => {
                  if (page === null) return null;
                  setPage(page);
                }}
              ></PostGrid>

          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
export default BlogPage;

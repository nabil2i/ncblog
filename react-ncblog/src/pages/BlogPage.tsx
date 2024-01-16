import { Box, Grid, GridItem, VStack  } from "@chakra-ui/react";
import PageHeading from "../components/common/PageHeading";
import PostGrid from "../components/posts/PostGrid";
import usePostQueryStore from "../store";

const BlogPage = () => {
  const setPage = usePostQueryStore((s) => s.setPage);

  return (
    <Box
    // mt={{ base: "50px", }}
    >
      <Grid
        templateAreas={{ base: `"main"` }}
        templateColumns={{ base: "1fr" }}
      >
        <GridItem area="main">
          {/* <VStack>
          <Headline></Headline>
          <Hero></Hero>
        </VStack> */}

          <VStack as="section">
            {/* <Box> <PostHeading /> </Box> */}
            <PageHeading title={"Posts"} />
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

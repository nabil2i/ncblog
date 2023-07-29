import { Box, Flex, Grid, GridItem, VStack } from "@chakra-ui/react";
import CategorySelector from "../components/CategorySelector";
import PostGrid from "../components/PostGrid";
import PostHeading from "../components/PostHeading";
import usePostQueryStore from "../store";

const BlogPage = () => {
  const setPage = usePostQueryStore((s) => s.setPage);
  return (
    <Box>

    <Grid
      templateAreas={
        /* `"nav-logo  nav-menu nav-search" "main main aside"` */
        {
          base: `"main"`,
          lg: `"main"`,
          // lg: `"nav" "main"`
        }
      }
      templateColumns={{
        base: "1fr",
        lg: "1fr",
      }}
      >
      <GridItem area="main">
        {/* <VStack>
          <Headline></Headline>
          <Hero></Hero>
        </VStack> */}

        <VStack>
          <Box>
            <PostHeading
            // postQuery={postQuery}
            />
          </Box>

          {/* <Flex>
            <Box>
              <CategorySelector />
            </Box>
          </Flex> */}
        

        <PostGrid
          // postQuery={postQuery}
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

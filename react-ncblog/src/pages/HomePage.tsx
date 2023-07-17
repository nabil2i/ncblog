import { Grid, GridItem, VStack } from "@chakra-ui/react";
import Headline from "../components/Headline";
import Hero from "../components/Hero";
import LatestPosts from "../components/LatestPosts";
import usePostQueryStore from "../store";

const HomePage = () => {
  const setPage = usePostQueryStore((s) => s.setPage);
  return (
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
        <VStack>
          <Headline></Headline>
          <Hero></Hero>
        </VStack>
        <VStack>
          {/* <Box>
            <PostHeading
            // postQuery={postQuery}
            />
          </Box> */}

          {/* <Flex>
            <Box>
              <CategorySelector />
            </Box>
          </Flex> */}
        </VStack>

        {/* <PostGrid
          // postQuery={postQuery}
          paginate={(page) => {
            if (page === null) return null;
            setPage(page);
          }}
        ></PostGrid> */}

        <LatestPosts></LatestPosts>
      </GridItem>

      {/* <GridItem area="headline">
          <Headline></Headline>
        </GridItem>

        <GridItem area="hero">
          
        </GridItem> */}
    </Grid>
  );
};

export default HomePage;

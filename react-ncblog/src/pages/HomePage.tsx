import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
// import Headline from "../components/HeroHeadline";
// import Hero from "../components/HeroImage";
import LatestPosts from "../components/LatestPosts";
import SearchPostGrid from "../components/SearchPostGrid";
import usePostQueryStore from "../store";
import HeroSection from "../components/HeroSection";
// import ModalSearchInput from "../components/ModalSearchInput";

const HomePage = () => {
  const setPage = usePostQueryStore((s) => s.setPage);
  const searchText = usePostQueryStore((s) => s.postQuery.searchText);

  return (
    <Box as="main">
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
          {!searchText && (
            <>
            <Box>
              <HeroSection/>
              <LatestPosts />
            </Box>
            </>
          )}
          {searchText && 
          
          <Box pt={{ base: "50px", lg: "0px"}}>
            <SearchPostGrid paginate={(page) => {
              if (page === null) return null;
              setPage(page);
            }}/>
          </Box>
          }

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
        </GridItem>

        {/* <GridItem area="headline">
          <Headline></Headline>
          </GridItem>
          
          <GridItem area="hero">
          
        </GridItem> */}
      </Grid>
    </Box>
  );
};

export default HomePage;

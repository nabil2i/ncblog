import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import PageHeading from "../components/common/PageHeading";
import PostGrid from "../components/posts/PostGrid";
import usePostQueryStore from "../store";

const BooksPage = () => {
  const setPage = usePostQueryStore((s) => s.setPage);
  
  return (
    <>
      <Box
      // mt={{ base: "50px", }}
      >
        <Grid
          templateAreas={{ base: `"main"` }}
          templateColumns={{ base: "1fr" }}
        >
          <GridItem area="main">
            <VStack as="section">
              <PageHeading title={"Books"} />
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
    </>
  );
};

export default BooksPage;

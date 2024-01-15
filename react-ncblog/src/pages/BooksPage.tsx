import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import PageHeading from "../components/common/PageHeading";

const BooksPage = () => {
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
              {/* <Box> <PostHeading /> </Box> */}
              <PageHeading title={"Books"} />
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default BooksPage;

import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import BookGrid from "../components/books/BookGrid";
import PageHeading from "../components/common/PageHeading";
import { useBookQueryStore } from "../store";

const BooksPage = () => {
  const setPage = useBookQueryStore((s) => s.setPage);

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

              <BookGrid
                paginate={(page) => {
                  if (page === null) return null;
                  setPage(page);
                }}
              ></BookGrid>

              {/* <PostGrid
                paginate={(page) => {
                  if (page === null) return null;
                  setPage(page);
                }}
            ></PostGrid> */}
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default BooksPage;

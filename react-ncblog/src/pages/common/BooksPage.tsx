import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import BookGrid from "../../components/books/BookGrid";
import CallToActionIera from "../../components/common/CallToActionIera";
import PageHeading from "../../components/common/PageHeading";
import useTitle from "../../hooks/useTitle";
import { useBookQueryStore } from "../../store";

const BooksPage = () => {
  const setPage = useBookQueryStore((s) => s.setPage);
  useTitle("Nabil Conveys - Books");

  return (
    <>
      <Box>
        <Grid
          templateAreas={{ base: `"main"` }}
          templateColumns={{ base: "1fr" }}
        >
          <GridItem area="main">
            <VStack as="section">
              <PageHeading title={"Books"} />
              <Box mx="auto" maxW="1440px">
                <BookGrid
                  paginate={(page) => {
                    if (page === null) return null;
                    setPage(page);
                  }}
                />
                <Box m={5} maxW="800px" px={4} mx="auto">
                  <CallToActionIera />
                </Box>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default BooksPage;

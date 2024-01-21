import { Box, Grid, GridItem, Spinner, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useBook from "../hooks/useBook";
import BookDetails from "../components/books/BookDetails";
import PageHeading from "../components/common/PageHeading";

const BookPage = () => {
  const { id } = useParams();
  const { data: payload, isLoading, error } = useBook(id as string);
  // console.log(payload);
  const book = payload?.data;
  // console.log(book)

  if (isLoading)
    return (
      <Box p={10}>
        <VStack marginTop={2}>
          <Spinner />
        </VStack>
      </Box>
    );

  if (error || !book) throw error;

  return (
    <>
    <Grid
        templateAreas={{ base: `"main"` }}
        templateColumns={{ base: "1fr" }}
      >
        <GridItem area="main">
          <Box as="section">
            <PageHeading title={book.title} />
            <Box p={10}>
              <BookDetails book={book} />
            </Box>
          </Box>
        </GridItem>
      </Grid>

    </>
  );
};

export default BookPage;

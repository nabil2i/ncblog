import { Box, Grid, GridItem, Spinner, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import BookDetails from "../../components/books/BookDetails";
import PageHeading from "../../components/common/PageHeading";
import useBook from "../../hooks/useBook";
import useTitle from "../../hooks/useTitle";
import CallToAction from "../../components/common/CallToAction";

const BookPage = () => {
  const { id } = useParams();
  const { data: payload, isLoading, error } = useBook(id as string);
  // console.log(payload);
  const book = payload?.data;
  // console.log(book)
  useTitle("Nabil Conveys - Post");

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
            <Box maxW="1440px" mx="auto">
              <BookDetails book={book} />
              <Box m={5}>
                <CallToAction />
              </Box>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default BookPage;

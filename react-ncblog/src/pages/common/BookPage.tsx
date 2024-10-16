import {
  Box,
  Divider,
  Grid,
  GridItem,
  Spinner,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import BookActions from "../../components/books/BookActions";
import BookDetails from "../../components/books/BookDetails";
import BookImages from "../../components/books/BookImages";
import BookInfo from "../../components/books/BookInfo";
// import CallToActionOneReason from "../../components/common/CallToActionOneReason";
import PageHeading from "../../components/common/PageHeading";
import useBook from "../../hooks/useBook";
import useTitle from "../../hooks/useTitle";

const BookPage = () => {
  const { id } = useParams();
  const { data: payload, isLoading, error } = useBook(id as string);
  // console.log(payload);
  const book = payload?.data;
  // console.log(book)
  useTitle("Nabil Conveys - Post");

  const authorColor = useColorModeValue("gray.600", "gray.200");
  // const { colorMode } = useColorMode();
  const showAuthor = useBreakpointValue({ base: false, lg: true });

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
      <PageHeading title={book.title} />
      <Box p={10}>
        <Grid
          templateAreas={{
            base: `"photo" "actions" "details"`,
            lg: `"photo details actions"`,
          }}
          templateColumns={{ base: "1fr", lg: "300px 1fr 300px" }}
          gap={2}
          as="section"
        >
          <GridItem area="photo" as="article">
            {!showAuthor && (
              <Box
                // fontSize={25}
                // fontWeight={"bold"}
                color={authorColor}
              >
                {book.author.firstname + " " + book.author.lastname}
              </Box>
            )}

            <Box>
              <BookImages />
            </Box>
          </GridItem>

          <GridItem area="details" as="article" gap={4}>
            <Box maxW="1440px" mx="auto" gap={5}>
              <Box mb={5}>
                <BookInfo book={book} />
              </Box>

              <Divider />
              <Box mt={5}>
                <BookDetails book={book} />
              </Box>
            </Box>
          </GridItem>

          <GridItem area="actions" as="article">
            <BookActions book={book} />
          </GridItem>
        </Grid>

        {/* <Box m={5} maxW="800px" px={4} mx="auto">
          <CallToActionOneReason />
        </Box> */}

        {/* <Grid
        templateAreas={{ base: `"main"` }}
        templateColumns={{ base: "1fr" }}
      >
        <GridItem area="main">
          <Box as="section">
            <PageHeading title={book.title} />
            <Box maxW="1440px" mx="auto">
              <BookDetails book={book} />
              <Box m={5} maxW="800px" mx="auto">
                <CallToActionOneReason />
              </Box>
            </Box>
          </Box>
        </GridItem>
      </Grid> */}
      </Box>
    </>
  );
};

export default BookPage;

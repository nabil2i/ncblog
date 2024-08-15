import {
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import Book from "../../entities/Book";
import BookPublicationDate from "../common/CustomDate";

const BookDetails = ({ book }: { book: Book }) => {
  // console.log(post);
  // const { state } = useAuth();
  // const navigate = useNavigate();
  // const authorColor = useColorModeValue("gray.600", "gray.200");
  // const { colorMode } = useColorMode();

  return (
    <>
      <Flex direction={{ base: "column", lg: "column" }} gap={5}>
        <Flex direction="column">
          <Heading as="h4">Product Details</Heading>
          <TableContainer>
            <Table>
              <Tbody>
                <Tr>
                  <Td>Author</Td>
                  <Td>{book.author.firstname + " " + book.author.lastname}</Td>
                </Tr>
                {book.publisher && (
                  <Tr>
                    <Td>Publisher</Td>
                    <Td>{book.publisher}</Td>
                  </Tr>
                )}
                {book.publicationDate && (
                  <Tr>
                    <Td>Publication date</Td>
                    <Td>
                      <BookPublicationDate date={book.publicationDate} />
                    </Td>
                  </Tr>
                )}
                {book.language && (
                  <Tr>
                    <Td>Language</Td>
                    <Td>{book?.language}</Td>
                  </Tr>
                )}
                {book.numberOfPages && (
                  <Tr>
                    <Td>Print length</Td>
                    <Td>{book.numberOfPages + " pages"}</Td>
                  </Tr>
                )}
                {book.size && (
                  <Tr>
                    <Td>File size</Td>
                    <Td>{book.size + " KB"}</Td>
                  </Tr>
                )}
                {book.dimensions && (
                  <Tr>
                    <Td>Dimensions</Td>
                    <Td>{book.dimensions}</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </>
  );
};

export default BookDetails;

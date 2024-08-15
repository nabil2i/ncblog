import { Button, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Book from "../../entities/Book";

const BookActions = ({ book }: { book: Book }) => {
  return (
    <>
      {book.link && (
        <Flex justify="center" align="center" direction="column" gap={5}>
          {/* <Heading as="h2">Download the book</Heading> */}
          <Button
            as={NavLink}
            maxW={"200px"}
            
            to={book.link}
            target="_blank"
            width={"full"}
            colorScheme="teal"
          >
            Download pdf
          </Button>
        </Flex>
      )}
    </>
  );
};

export default BookActions;

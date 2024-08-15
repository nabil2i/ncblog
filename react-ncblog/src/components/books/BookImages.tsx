import { Box, Flex, Image } from "@chakra-ui/react";
import book1 from "../../assets/images/thepurposeoflife.jpg";
// import Book from "../../entities/Book";

// interface Props {
//   book: Book
// }
// const BookImages = ( { book }: Props) => {
const BookImages = () => {
  return (
    <>
      <Box>
        <Flex justify="center" align="center" direction="column">
          <Image
            // objectFit='cover'
            mt={3}
            mb={3}
            src={book1}
            // src={book.img}
            // boxSize="350px"
            height="300px"
            borderRadius="xl"
            objectFit="cover"
            mx="auto"
          />
        </Flex>
      </Box>
    </>
  );
};

export default BookImages;

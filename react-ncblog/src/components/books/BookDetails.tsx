import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
} from "@chakra-ui/react";
import book1 from "../../assets/thepurposeoflife.jpg";
import Book from "../../entities/Book";

const BookDetails = ({ book }: { book: Book }) => {
  // console.log(post);
  // const { state } = useAuth();
  // const navigate = useNavigate();

  return (
    <>
      <Flex direction={{ base: "column", lg: "column" }} gap={5}>
        <Flex justify="center" align="center" direction="column">
          <Image
            // objectFit='cover'
            mt={3}
            mb={3}
            src={book1}
            // src={book.img}
            // boxSize="350px"
            height="600px"
            borderRadius="xl"
            objectFit="cover"
            mx="auto"
          />
        </Flex>

        <Flex justify="center" align="center" direction="column" gap={5}>
          <Heading as="h2">About the book</Heading>
          <Box>{book.about}</Box>
        </Flex>

        {book.link && (
          <Flex justify="center" align="center" direction="column" gap={5}>
            <Heading as="h2">Download the book</Heading>
            <Button
              as={Link}
              href={book.link}
              target="_blank"
              _hover={{ textDecoration: "none" }}
            >
              Click here to download a pdf
            </Button>
          </Flex>
        )}

        <Flex justify="center" align="center" direction="column" gap={5}>
          <Heading as="h2">About the author</Heading>
          <Avatar size="3xl" src={book.author.img} />
          <Box fontSize={25} fontWeight={"bold"}>
            {book.author.firstname + " " + book.author.lastname}
          </Box>
          <Box>{book.author.bio}</Box>
        </Flex>
      </Flex>
    </>
  );
};

export default BookDetails;

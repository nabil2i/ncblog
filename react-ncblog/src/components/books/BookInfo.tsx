import {
  Box,
  Divider,
  Flex,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import Book from "../../entities/Book";

const BookInfo = ({ book }: { book: Book }) => {
  // console.log(post);
  // const { state } = useAuth();
  // const navigate = useNavigate();
  const authorColor = useColorModeValue("gray.600", "gray.200");
  // const { colorMode } = useColorMode();
  const showAuthor = useBreakpointValue({ base: false, lg: true });

  return (
    <>
      <Flex direction={{ base: "column", lg: "column" }} gap={5}>
        <Flex justify="start" align="start" gap={5}>
          {/* <Heading as="h2">About the author</Heading> */}
          {/* <Avatar size="3xl" src={book.author.img} /> */}
          {/* <Text>by</Text> */}
          {showAuthor && (
            <Box
              // fontSize={25}
              // fontWeight={"bold"}
              color={authorColor}
            >
              {book.author.firstname + " " + book.author.lastname}
            </Box>
          )}
          {/* <Box>{book.author.bio}</Box> */}
        </Flex>
        <Divider />
        <Flex justify="center" align="center" direction="column" gap={5}>
          {/* <Heading as="h2">About the book</Heading> */}
          <Box>{book.about}</Box>
        </Flex>
      </Flex>
    </>
  );
};

export default BookInfo;
